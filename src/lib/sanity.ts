import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/react'
import { useEffect, useState } from 'react'

/**
 * Connexion à Sanity, où l'équipe écrit les actualités, l'alerte et les horaires.
 * L'identifiant du projet se règle dans le fichier .env (VITE_SANITY_PROJECT_ID).
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'

export const sanityConfigured = Boolean(projectId)

const client = createClient({
  projectId: projectId || 'non-configure',
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
})

const builder = createImageUrlBuilder({ projectId: projectId || 'non-configure', dataset })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImage = { asset?: { _ref?: string }; alt?: string; legende?: string; lien?: string; [key: string]: any }

export const imageUrl = (image: SanityImage, width = 1200) => builder.image(image).width(width).fit('max').auto('format').url()

/* ------------------------------------------------------------------ */
/* Actualités                                                          */
/* ------------------------------------------------------------------ */

export type Article = {
  id: string
  slug: string
  title: string
  date: string
  updated: string
  category?: string
  excerpt: string
  cover?: string
  body: PortableTextBlock[]
}

type RawArticle = {
  _id: string
  _updatedAt: string
  titre: string
  slug: string
  datePublication: string
  categorie?: string
  resume?: string
  texte?: string
  couverture?: SanityImage
  contenu?: PortableTextBlock[]
}

const FILTER = `_type == "article" && defined(slug.current) && datePublication <= now()`
const FIELDS = `_id, _updatedAt, titre, "slug": slug.current, datePublication, categorie, resume,
  "texte": pt::text(contenu), "couverture": coalesce(image, contenu[_type == "image"][0])`

function toArticle(raw: RawArticle): Article {
  let excerpt = raw.resume?.trim() || (raw.texte ?? '').replace(/\s+/g, ' ').trim()
  if (excerpt.toLowerCase().startsWith(raw.titre.toLowerCase())) excerpt = excerpt.slice(raw.titre.length).replace(/^[\s!.:–-]+/, '')
  if (!raw.resume && excerpt.length > 220) excerpt = excerpt.slice(0, 220).replace(/\s\S*$/, '') + '…'
  return {
    id: raw._id,
    slug: raw.slug,
    title: raw.titre,
    date: raw.datePublication,
    updated: raw._updatedAt,
    category: raw.categorie,
    excerpt,
    cover: raw.couverture?.asset ? imageUrl(raw.couverture, 900) : undefined,
    body: raw.contenu ?? [],
  }
}

export async function fetchArticles(page = 1, perPage = 12) {
  if (!sanityConfigured) return { articles: [] as Article[], totalPages: 0 }
  const start = (page - 1) * perPage
  const res = await client.fetch<{ items: RawArticle[]; total: number }>(
    `{ "items": *[${FILTER}] | order(datePublication desc) [$start...$end] { ${FIELDS} }, "total": count(*[${FILTER}]) }`,
    { start, end: start + perPage },
  )
  return { articles: res.items.map(toArticle), totalPages: Math.ceil(res.total / perPage) }
}

export async function fetchArticle(slug: string) {
  if (!sanityConfigured) return null
  const raw = await client.fetch<RawArticle | null>(`*[${FILTER} && slug.current == $slug][0] { ${FIELDS}, contenu }`, { slug })
  return raw ? toArticle(raw) : null
}

/* ------------------------------------------------------------------ */
/* Alerte et horaires (documents uniques)                              */
/* ------------------------------------------------------------------ */

export type RawAlert = { _updatedAt: string; active?: boolean; message?: string; dateFin?: string; details?: PortableTextBlock[] }

export async function fetchAlert() {
  if (!sanityConfigured) return null
  return client.fetch<RawAlert | null>(`*[_id == "alerte"][0] { _updatedAt, active, message, dateFin, details }`)
}

export type RawSlot = { jour?: string; heure?: string; activite?: string; remarque?: string }
type RawChurch = { messes?: RawSlot[]; prieres?: RawSlot[] }
export type RawSchedule = { _updatedAt: string; sainteAnne?: RawChurch; notreDame?: RawChurch; saintJoseph?: RawChurch }

export async function fetchSchedule() {
  if (!sanityConfigured) return null
  return client.fetch<RawSchedule | null>(`*[_id == "horaires"][0]`)
}

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

type AsyncState<T> = { data?: T; error?: Error; loading: boolean }

/** Cache des requêtes pendant la visite (évite de recharger en changeant de page) */
const cache = new Map<string, Promise<unknown>>()

/** Charge une donnée asynchrone une seule fois par `key` */
export function useAsync<T>(load: () => Promise<T>, key: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T> & { key?: string }>({ loading: true })
  useEffect(() => {
    let alive = true
    if (!cache.has(key)) {
      cache.set(
        key,
        load().catch((err) => {
          cache.delete(key)
          throw err
        }),
      )
    }
    ;(cache.get(key) as Promise<T>).then(
      (data) => alive && setState({ data, loading: false, key }),
      (error: Error) => alive && setState({ error, loading: false, key }),
    )
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return state.key === key ? state : { loading: true }
}
