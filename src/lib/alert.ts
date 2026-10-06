import type { PortableTextBlock } from '@portabletext/react'
import { useEffect, useState } from 'react'
import { fetchAlert, type RawAlert } from './sanity'

/**
 * Alerte importante (ex. « Dimanche : une seule messe à 11h à Notre-Dame »).
 * Gérée dans le Studio Sanity → « Alerte importante » :
 *  - case « Afficher l'alerte » cochée + message ;
 *  - détails facultatifs (lien « En savoir plus ») ;
 *  - date de fin facultative : l'alerte disparaît après ce jour.
 */
export type SiteAlert = {
  /** Change à chaque modification (pour réafficher une alerte que le visiteur avait fermée) */
  id: string
  message: string
  details: PortableTextBlock[]
  hasDetails: boolean
  end?: Date
}

export function toAlert(raw: RawAlert | null, now = new Date()): SiteAlert | null {
  const message = raw?.message?.trim()
  if (!raw?.active || !message) return null
  const end = raw.dateFin ? new Date(`${raw.dateFin}T23:59:59`) : undefined
  if (end && now > end) return null
  const details = raw.details ?? []
  return { id: `${raw._updatedAt}-${message}`, message, details, hasDetails: details.length > 0, end }
}

/** Vérifie de nouveau l'alerte toutes les 2 minutes et quand on revient sur l'onglet */
const REFRESH_MS = 2 * 60 * 1000

let shared: RawAlert | null = null
let lastFetch = 0
let pending: Promise<RawAlert | null> | null = null
const listeners = new Set<(raw: RawAlert | null) => void>()

function refresh(force = false) {
  if (pending || (!force && Date.now() - lastFetch < 15_000)) return
  pending = fetchAlert()
    .then((raw) => {
      shared = raw
      lastFetch = Date.now()
      listeners.forEach((l) => l(raw))
      return raw
    })
    .catch(() => shared)
    .finally(() => (pending = null))
}

export function useAlert(): SiteAlert | null {
  const [raw, setRaw] = useState<RawAlert | null>(shared)
  useEffect(() => {
    listeners.add(setRaw)
    refresh(lastFetch === 0)
    const onFocus = () => document.visibilityState === 'visible' && refresh()
    const timer = window.setInterval(() => refresh(true), REFRESH_MS)
    document.addEventListener('visibilitychange', onFocus)
    window.addEventListener('focus', onFocus)
    return () => {
      listeners.delete(setRaw)
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onFocus)
      window.removeEventListener('focus', onFocus)
    }
  }, [])
  return toAlert(raw)
}
