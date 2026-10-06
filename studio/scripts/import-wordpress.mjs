/**
 * Import unique : recopie les articles WordPress (textes, affiches, PDF) dans Sanity,
 * et crée les documents « Horaires des messes » et « Alerte importante ».
 *
 *   npm run import-essai       → convertit sans rien envoyer (vérification)
 *   npm run import-wordpress   → importe pour de vrai (après « npx sanity login »)
 *
 * Il faut dans studio/.env : SANITY_STUDIO_PROJECT_ID.
 * Sans connexion « npx sanity login », on peut aussi mettre un jeton « Editor » dans studio/.env.local
 * (SANITY_WRITE_TOKEN=…, créé dans sanity.io/manage → API → Tokens) et lancer « node scripts/import-wordpress.mjs ».
 * Le script peut être relancé sans créer de doublons.
 */
import { createClient } from '@sanity/client'
import { htmlToBlocks, randomKey } from '@portabletext/block-tools'
import { Schema } from '@sanity/schema'
import { existsSync } from 'node:fs'
import { JSDOM } from 'jsdom'

for (const f of ['.env', '.env.local']) if (existsSync(f)) process.loadEnvFile(f)

const ESSAI = process.argv.includes('--essai')
const WP = 'https://3paroisses-lyon5-tassin.eu'
const SKIP = ['recevoir-les-infolettres']

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
let client = null
if (!ESSAI) {
  if (token) {
    client = createClient({ projectId, dataset: process.env.SANITY_STUDIO_DATASET || 'production', apiVersion: '2025-01-01', token, useCdn: false })
  } else {
    // Lancé avec « npm run import-wordpress » : on utilise la connexion de « npx sanity login »
    try {
      const { getCliClient } = await import('sanity/cli')
      client = getCliClient({ apiVersion: '2025-01-01' })
    } catch {
      console.error('❌ Connectez-vous d’abord avec « npx sanity login », puis lancez « npm run import-wordpress ».')
      process.exit(1)
    }
  }
}

/* ------------------------------------------------------------------ */
/* Schéma minimal du texte riche (identique à schemas/article.ts)      */
/* ------------------------------------------------------------------ */

const blockType = Schema.compile({
  name: 'import',
  types: [
    {
      name: 'article',
      type: 'document',
      fields: [
        {
          name: 'contenu',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{ value: 'normal' }, { value: 'h2' }, { value: 'h3' }, { value: 'blockquote' }],
              lists: [{ value: 'bullet' }, { value: 'number' }],
              marks: {
                decorators: [{ value: 'strong' }, { value: 'em' }],
                annotations: [{ name: 'link', type: 'object', fields: [{ name: 'href', type: 'url' }] }],
              },
            },
          ],
        },
      ],
    },
  ],
})
  .get('article')
  .fields.find((f) => f.name === 'contenu').type

/* ------------------------------------------------------------------ */
/* Fichiers (images, PDF) : téléchargés depuis WordPress → Sanity      */
/* ------------------------------------------------------------------ */

const uploads = new Map()
async function upload(kind, url) {
  if (!uploads.has(url)) {
    uploads.set(
      url,
      (async () => {
        if (ESSAI) return { _id: kind === 'image' ? `image-essai${uploads.size}-724x1024-jpg` : `file-essai${uploads.size}-pdf`, url, source: url }
        const res = await fetch(encodeURI(decodeURI(url)), { headers: { 'User-Agent': 'Mozilla/5.0' } })
        if (!res.ok) throw new Error(`${res.status} ${url}`)
        const filename = decodeURIComponent(url.split('/').pop())
        const asset = await client.assets.upload(kind, Buffer.from(await res.arrayBuffer()), { filename })
        process.stdout.write(kind === 'image' ? '🖼' : '📄')
        return asset
      })(),
    )
  }
  return uploads.get(url)
}

/** Lien WordPress → lien du nouveau site (ou fichier recopié dans Sanity) */
async function rewriteHref(href) {
  if (!href) return href
  const m = href.match(/^https?:\/\/(?:www-static\.|www\.)?3paroisses-lyon5-tassin\.eu(\/[^?#]*)?/)
  if (!m) return href
  const path = m[1] || '/'
  if (path.startsWith('/wp-content/')) {
    if (/\.(jpe?g|png|gif|webp)$/i.test(path)) return null // image : géré à part
    return (await upload('file', href)).url
  }
  return path.replace(/\/$/, '') || '/'
}

/* ------------------------------------------------------------------ */
/* Conversion d'un article                                             */
/* ------------------------------------------------------------------ */

const decode = (html) => new JSDOM(`<p>${html}</p>`).window.document.body.textContent.trim()

/** « LA MESSE DES PARVIS » → « La messe des parvis » */
function tameCaps(title) {
  const letters = title.replace(/[^\p{L}]/gu, '')
  if (letters.length < 4 || letters !== letters.toUpperCase()) return title
  const lower = title.toLocaleLowerCase('fr')
  return lower.charAt(0).toLocaleUpperCase('fr') + lower.slice(1)
}

/** Taille d'origine plutôt que la miniature (…-724x1024.jpg → ….jpg) quand elle existe */
const largestSrc = (img) => {
  const set = (img.getAttribute('srcset') || '').split(',').map((s) => s.trim().split(/\s+/))
  const best = set.filter(([, w]) => w?.endsWith('w')).sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0]
  return best?.[0] || img.getAttribute('src')
}

/**
 * « Méditation du dimanche » empile toutes les semaines de l'année (la plus récente en premier) :
 * on ne garde que la semaine en cours, jusqu'aux images de la semaine précédente.
 */
function keepLatestWeek(doc) {
  let seenReadings = false
  for (const el of [...doc.body.children]) {
    const isReadings = /^h1$/i.test(el.tagName) && /lectures de la messe/i.test(el.textContent)
    if (seenReadings && (isReadings || el.querySelector('img') || el.tagName === 'IMG')) {
      let next = el
      while (next) {
        const after = next.nextElementSibling
        next.remove()
        next = after
      }
      return
    }
    if (isReadings) seenReadings = true
  }
}

async function convert(html, slug) {
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  if (slug === 'meditation-du-dimanche') keepLatestWeek(doc)
  doc.querySelectorAll('style, script, form, noscript, input, button').forEach((el) => el.remove())
  doc.querySelectorAll('h1').forEach((h) => (h.outerHTML = `<h2>${h.innerHTML}</h2>`))
  doc.querySelectorAll('h4, h5, h6').forEach((h) => (h.outerHTML = `<h3>${h.innerHTML}</h3>`))
  doc.querySelectorAll('table').forEach((t) => {
    t.outerHTML = [...t.querySelectorAll('td, th')].map((c) => `<p>${c.innerHTML}</p>`).join('')
  })
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = await rewriteHref(a.getAttribute('href'))
    if (href) a.setAttribute('href', href)
  }

  const blocks = []
  const pushHtml = (fragment) => {
    if (!fragment.trim()) return
    const converted = htmlToBlocks(fragment, blockType, { parseHtml: (h) => new JSDOM(h).window.document })
    blocks.push(...converted.filter((b) => b._type !== 'block' || b.children?.some((c) => c.text?.trim())))
  }

  for (const el of [...doc.body.children]) {
    const imgs = [...el.querySelectorAll('img'), ...(el.tagName === 'IMG' ? [el] : [])]
    const buttons = [...el.querySelectorAll('a.kb-button, a.wp-block-button__link')]
    if (buttons.length) {
      for (const b of buttons) blocks.push({ _type: 'bouton', _key: randomKey(12), texte: b.textContent.trim(), lien: b.getAttribute('href') })
      continue
    }
    if (imgs.length) {
      for (const img of imgs) {
        const src = largestSrc(img)
        if (!src || src.startsWith('data:')) continue
        const asset = await upload('image', src.startsWith('http') ? src : WP + src)
        const link = img.closest('a')?.getAttribute('href')
        blocks.push({
          _type: 'image',
          _key: randomKey(12),
          asset: { _type: 'reference', _ref: asset._id },
          ...(img.alt ? { alt: img.alt } : {}),
          ...(link && !/\.(jpe?g|png|gif|webp)$/i.test(link) ? { lien: link } : {}),
        })
      }
      // Texte éventuel autour des images (ex. légende)
      el.querySelectorAll('img').forEach((i) => i.remove())
      const caption = el.textContent.trim()
      if (caption) pushHtml(`<p>${caption}</p>`)
      continue
    }
    pushHtml(el.outerHTML)
  }
  return blocks
}

/* ------------------------------------------------------------------ */
/* Horaires et alerte (valeurs de l'affiche du 28 août 2026)           */
/* ------------------------------------------------------------------ */

const slot = (jour, heure, remarque, activite) => ({ _key: randomKey(12), jour, heure, ...(activite ? { activite } : {}), ...(remarque ? { remarque } : {}) })
const horaires = {
  _id: 'horaires',
  _type: 'horaires',
  sainteAnne: {
    messes: [slot('Dimanche', '9h30'), slot('Mercredi', '8h00', '8h30 pendant les vacances scolaires')],
    prieres: [slot('Mercredi', '17h30', "d'octobre à début juillet", 'Chapelet')],
  },
  notreDame: {
    messes: [slot('Dimanche', '11h00'), slot('Mardi', '12h15', '8h30 pendant les vacances scolaires estivales')],
    prieres: [
      slot('Mardi', '8h00', '', 'Adoration'),
      slot('Jeudi', '17h45', 'hors vacances scolaires', 'Adoration'),
      slot('Jeudi', '19h00', '', 'Groupe de prière'),
      slot('Dimanche', '16h30', '17h30 de Pâques à la Toussaint', 'Chapelet'),
    ],
  },
  saintJoseph: {
    messes: [
      slot('Samedi', '18h00', '18h30 pendant les vacances scolaires estivales'),
      slot('Dimanche', '10h30', 'pas de messe pendant les vacances scolaires estivales'),
      slot('Jeudi', '18h00', "à l'oratoire de la communauté (8h30 pendant les vacances scolaires estivales)"),
    ],
    prieres: [slot('Vendredi', '17h30', '', 'Chapelet')],
  },
}

/* ------------------------------------------------------------------ */
/* Lancement                                                           */
/* ------------------------------------------------------------------ */

const res = await fetch(`${WP}/wp-json/wp/v2/posts?per_page=100&_fields=slug,date_gmt,title,content`, { headers: { 'User-Agent': 'Mozilla/5.0' } })
const posts = (await res.json()).filter((p) => !SKIP.includes(p.slug))
console.log(`${posts.length} articles WordPress trouvés${ESSAI ? ' (mode essai : rien n’est envoyé)' : ''}\n`)

const docs = []
for (const p of posts) {
  const contenu = await convert(p.content.rendered, p.slug)
  const titre = tameCaps(decode(p.title.rendered))
  docs.push({
    _id: `article-${p.slug}`,
    _type: 'article',
    titre,
    slug: { _type: 'slug', current: p.slug },
    datePublication: new Date(p.date_gmt + 'Z').toISOString(),
    contenu,
  })
  const count = (t) => contenu.filter((b) => b._type === t).length
  console.log(`✓ ${titre}  — ${count('block')} paragraphes, ${count('image')} images, ${count('bouton')} boutons`)
}

if (ESSAI) {
  console.log('\nExemple de contenu converti (premier article avec du texte) :')
  const sample = docs.find((d) => d.contenu.some((b) => b._type === 'block'))
  console.log(JSON.stringify(sample.contenu.slice(0, 4), null, 1).slice(0, 2500))
  console.log(`\nFichiers qui seraient recopiés : ${[...uploads.keys()].length}`)
  // Jeu de données d'essai (sert aux tests du site sans projet Sanity)
  const { writeFileSync } = await import('node:fs')
  const assets = await Promise.all([...uploads.values()])
  writeFileSync('essai-import.json', JSON.stringify({ docs: [...docs, horaires, { _id: 'alerte', _type: 'alerte', active: false }], assets }, null, 1))
  console.log('Données d’essai écrites dans studio/essai-import.json')
} else {
  const tx = client.transaction()
  docs.forEach((d) => tx.createOrReplace(d))
  tx.createOrReplace(horaires)
  tx.createIfNotExists({ _id: 'alerte', _type: 'alerte', active: false })
  await tx.commit()
  console.log(`\n✅ ${docs.length} articles, les horaires et l’alerte sont dans Sanity.`)
}
