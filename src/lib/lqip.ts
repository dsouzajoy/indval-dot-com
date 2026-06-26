import sharp from 'sharp';
import path from 'path';

export async function getLQIP(srcRelative: string): Promise<string> {
  const abs = path.resolve(process.cwd(), srcRelative);
  const buf = await sharp(abs).resize(20).jpeg({ quality: 40 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}
