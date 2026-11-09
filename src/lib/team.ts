import { clergy as defaultClergy, deacons as defaultDeacons } from '../data/site'
import { fetchTeam, useAsync, type RawPerson } from './sanity'

/**
 * Prêtres, frères et diacres.
 * Ils sont modifiés dans le Studio Sanity → « Équipe ».
 * Tant que ce document n'est pas publié (ou si une liste est vide), le site garde l'équipe de src/data/site.ts.
 */
export type Priest = { first: string; last: string; role: string; email?: string }
export type Deacon = { name: string; email?: string }

const clean = (s?: string) => s?.trim() || undefined

const toPriest = (p: RawPerson): Priest | null =>
  p.prenom && p.nom ? { first: p.prenom.trim(), last: p.nom.trim(), role: clean(p.role) ?? '', email: clean(p.email) } : null

const toDeacon = (d: RawPerson): Deacon | null => (d.prenom && d.nom ? { name: `${d.prenom.trim()} ${d.nom.trim()}`, email: clean(d.email) } : null)

export function useTeam(): { clergy: Priest[]; deacons: Deacon[] } {
  const { data } = useAsync(fetchTeam, 'team')
  const clergy = (data?.pretres ?? []).map(toPriest).filter((p): p is Priest => p !== null)
  const deacons = (data?.diacres ?? []).map(toDeacon).filter((d): d is Deacon => d !== null)
  return {
    clergy: clergy.length ? clergy : defaultClergy,
    deacons: deacons.length ? deacons : defaultDeacons,
  }
}
