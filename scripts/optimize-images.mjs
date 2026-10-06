/**
 * Convertit les images de public/media (png, jpg, gif) en .webp optimisés.
 * À lancer après avoir ajouté de nouvelles images :  npm run images
 * (les fichiers d'origine sont remplacés par leur version .webp).
 */
import { readdir, readFile, stat, unlink } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

sharp.cache(false)

const ROOT = 'public/media'
const MAX_WIDTH = 1600

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

let before = 0
let after = 0
for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) continue
  const out = file.slice(0, -ext.length) + '.webp'
  // Pour un GIF animé, on garde la dernière image (affiche complète)
  const data = await readFile(file)
  const meta = await sharp(data).metadata()
  const input = ext === '.gif' && meta.pages > 1 ? sharp(data, { page: meta.pages - 1 }) : sharp(data)
  await input.resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
  before += (await stat(file)).size
  after += (await stat(out)).size
  await unlink(file)
  console.log('✓', out)
}
console.log(`\n${(before / 1e6).toFixed(1)} Mo → ${(after / 1e6).toFixed(1)} Mo`)
