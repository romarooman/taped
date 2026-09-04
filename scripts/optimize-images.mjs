import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDirectory = path.resolve("src/images");
const minimumSize = 100 * 1024;

const files = await readdir(imagesDirectory);

for (const file of files) {
  if (path.extname(file).toLowerCase() !== ".png") continue;

  const source = path.join(imagesDirectory, file);
  const { size: originalSize } = await stat(source);

  if (originalSize < minimumSize) continue;

  const destination = path.join(
    imagesDirectory,
    `${path.basename(file, path.extname(file))}.webp`,
  );

  await sharp(source)
    .webp({ quality: 82, alphaQuality: 100, smartSubsample: true, effort: 6 })
    .toFile(destination);

  const { size: optimizedSize } = await stat(destination);
  const reduction = Math.round((1 - optimizedSize / originalSize) * 100);

  console.log(
    `${file}: ${(originalSize / 1024).toFixed(0)} KB -> ${(optimizedSize / 1024).toFixed(0)} KB (-${reduction}%)`,
  );
}
