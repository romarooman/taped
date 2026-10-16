import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDirectory = path.resolve("src/images");
const minimumSize = 100 * 1024;

const dryRun = process.argv.includes("--dry-run");
async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? listImages(file) : entry.isFile() ? [file] : [];
  }));
  return files.flat();
}
const files = await listImages(imagesDirectory);

for (const file of files) {
  if (path.extname(file).toLowerCase() !== ".png") continue;

  const source = file;
  const { size: originalSize } = await stat(source);

  if (originalSize < minimumSize) continue;

  const destination = path.join(
    path.dirname(source),
    `${path.basename(file, path.extname(file))}.webp`,
  );

  try {
    await stat(destination);
    console.log(`Skip existing: ${path.relative(imagesDirectory, destination)}`);
    continue;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (dryRun) {
    console.log(`Would create: ${path.relative(imagesDirectory, destination)}`);
    continue;
  }

  await sharp(source)
    .webp({ quality: 82, alphaQuality: 100, smartSubsample: true, effort: 6 })
    .toFile(destination);

  const { size: optimizedSize } = await stat(destination);
  const reduction = Math.round((1 - optimizedSize / originalSize) * 100);

  console.log(
    `${file}: ${(originalSize / 1024).toFixed(0)} KB -> ${(optimizedSize / 1024).toFixed(0)} KB (-${reduction}%)`,
  );
}
