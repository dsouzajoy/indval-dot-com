#!/usr/bin/env node
/**
 * Works out the next release version from the conventional commits made since
 * the last `v*` tag, and writes the release notes for those commits.
 *
 * Bump rules:
 *   - `type!: ...` in the subject, or `BREAKING CHANGE:` in the body -> major
 *   - `feat: ...`                                                    -> minor
 *   - anything else (including plain, non-conventional subjects)     -> patch
 *
 * Outputs (written to $GITHUB_OUTPUT when running in Actions, and echoed):
 *   last_tag, has_changes, bump, version, tag
 * Release notes are written to release-notes.md.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const FIELD = '\u001f'; // unit separator, safe inside commit text
const RECORD = '\u001e'; // record separator

const run = (cmd, quiet = false) =>
  execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', quiet ? 'ignore' : 'inherit'] }).trim();

let lastTag = '';
try {
  lastTag = run("git describe --tags --abbrev=0 --match 'v[0-9]*'", true);
} catch {
  lastTag = ''; // no releases yet, so every commit counts
}

const range = lastTag ? `${lastTag}..HEAD` : '';
const raw = run(`git log --no-merges --format=%h%x1f%s%x1f%b%x1e ${range}`.trim());

const commits = raw
  .split(RECORD)
  .map((record) => record.trim())
  .filter(Boolean)
  .map((record) => {
    const [hash, subject, body = ''] = record.split(FIELD);
    return { hash, subject: subject.trim(), body: body.trim() };
  })
  // The bot's own bump commits are noise in the changelog.
  .filter((c) => !c.subject.startsWith('chore(release):'));

const CONVENTIONAL = /^(\w+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/;

const parse = (commit) => {
  const match = CONVENTIONAL.exec(commit.subject);
  const breaking = Boolean(match?.[3]) || /^BREAKING[ -]CHANGE:/m.test(commit.body);
  return {
    ...commit,
    type: match ? match[1].toLowerCase() : null,
    scope: match?.[2] ?? null,
    description: match ? match[4] : commit.subject,
    breaking,
  };
};

const parsed = commits.map(parse);

let bump = 'patch';
if (parsed.some((c) => c.breaking)) {
  bump = 'major';
} else if (parsed.some((c) => c.type === 'feat' || c.type === 'feature')) {
  bump = 'minor';
}

const base = lastTag ? lastTag.replace(/^v/, '') : JSON.parse(readFileSync('package.json', 'utf8')).version;
const [major, minor, patch] = base.split('.').map((n) => Number.parseInt(n, 10) || 0);
const next =
  bump === 'major' ? `${major + 1}.0.0` : bump === 'minor' ? `${major}.${minor + 1}.0` : `${major}.${minor}.${patch + 1}`;

// --- release notes -----------------------------------------------------------

const HEADINGS = {
  feat: 'Features',
  feature: 'Features',
  fix: 'Bug Fixes',
  perf: 'Performance',
  refactor: 'Refactoring',
  docs: 'Documentation',
  style: 'Styling',
  test: 'Tests',
  build: 'Build',
  ci: 'CI',
  chore: 'Chores',
  revert: 'Reverts',
};
const ORDER = ['Features', 'Bug Fixes', 'Performance', 'Refactoring', 'Documentation', 'Styling', 'Tests', 'Build', 'CI', 'Chores', 'Reverts', 'Other Changes'];

const groups = new Map();
for (const commit of parsed) {
  const heading = HEADINGS[commit.type] ?? 'Other Changes';
  if (!groups.has(heading)) groups.set(heading, []);
  const scope = commit.scope ? `**${commit.scope}:** ` : '';
  groups.get(heading).push(`- ${scope}${commit.description} (${commit.hash})`);
}

const breaking = parsed.filter((c) => c.breaking);
const lines = [];
if (breaking.length) {
  lines.push('### ⚠ BREAKING CHANGES', '');
  for (const commit of breaking) lines.push(`- ${commit.description} (${commit.hash})`);
  lines.push('');
}
for (const heading of ORDER) {
  if (!groups.has(heading)) continue;
  lines.push(`### ${heading}`, '', ...groups.get(heading), '');
}
if (!lines.length) lines.push('_No changes._', '');

const server = process.env.GITHUB_SERVER_URL ?? 'https://github.com';
const repo = process.env.GITHUB_REPOSITORY;
if (repo && lastTag) {
  lines.push(`**Full changelog**: ${server}/${repo}/compare/${lastTag}...v${next}`, '');
}
lines.push('The production build (`DEPLOY_TARGET=prod`) is attached below as a zip.');

writeFileSync('release-notes.md', lines.join('\n') + '\n');

// --- outputs -----------------------------------------------------------------

const outputs = {
  last_tag: lastTag,
  has_changes: String(parsed.length > 0),
  bump,
  version: next,
  tag: `v${next}`,
};

for (const [key, value] of Object.entries(outputs)) {
  console.log(`${key}=${value}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}
