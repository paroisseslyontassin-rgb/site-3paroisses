import { parishes as defaultParishes, type Parish, type Slot } from '../data/site'
import { fetchSchedule, useAsync, type RawSchedule, type RawSlot } from './sanity'

/**
 * Horaires des messes et temps de prière.
 * Ils sont modifiés dans le Studio Sanity → « Horaires des messes ».
 * Tant que ce document n'existe pas, le site garde les horaires de src/data/site.ts.
 */

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

const KEYS: Record<Parish['id'], keyof Omit<RawSchedule, '_updatedAt'>> = {
  anne: 'sainteAnne',
  ndpj: 'notreDame',
  joseph: 'saintJoseph',
}

const toSlot = (s: RawSlot): Slot | null =>
  s.jour && s.heure ? { day: s.jour, time: s.heure.replace(/\s/g, ''), label: s.activite || undefined, note: s.remarque || undefined } : null

export function toParishes(raw: RawSchedule | null): Parish[] | null {
  if (!raw) return null
  const result = defaultParishes.map((p) => {
    const church = raw[KEYS[p.id]]
    return {
      ...p,
      masses: (church?.messes ?? []).map(toSlot).filter((s): s is Slot => s !== null),
      prayer: (church?.prieres ?? []).map(toSlot).filter((s): s is Slot => s !== null),
    }
  })
  return result.some((p) => p.masses.length > 0) ? result : null
}

/** Horaires à jour (Sanity) avec repli sur les horaires par défaut */
export function useParishes(): { parishes: Parish[]; updated?: string } {
  const { data } = useAsync(fetchSchedule, 'schedule')
  const parsed = data ? toParishes(data) : null
  return parsed ? { parishes: parsed, updated: data!._updatedAt } : { parishes: defaultParishes }
}

const dayIndex = (d: string) => DAYS.indexOf(d.toLowerCase())
const minutes = (t: string) => {
  const [h, m = '0'] = t.toLowerCase().split('h')
  return Number(h) * 60 + Number(m || 0)
}

/** Messes du samedi et du dimanche, dans l'ordre chronologique */
export function weekendMasses(parishes: Parish[]) {
  return parishes
    .flatMap((p) => p.masses.filter((m) => dayIndex(m.day) >= 5).map((m) => ({ ...m, parish: p })))
    .sort((a, b) => dayIndex(a.day) - dayIndex(b.day) || minutes(a.time) - minutes(b.time))
}
