import { ArrowRight, Megaphone, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert, type SiteAlert } from '../lib/alert'
import { Container, cx } from './ui'

const DISMISS_KEY = 'alerte-fermee'

function readDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY)
  } catch {
    return null
  }
}

/** Bandeau d'alerte en haut de toutes les pages (le visiteur peut le fermer) */
export function AlertBar() {
  const alert = useAlert()
  const [dismissed, setDismissed] = useState(readDismissed)
  if (!alert || dismissed === alert.id) return null

  function close() {
    setDismissed(alert!.id)
    try {
      localStorage.setItem(DISMISS_KEY, alert!.id)
    } catch {
      /* navigation privée : le bandeau reviendra à la prochaine visite */
    }
  }

  return (
    <div role="region" aria-label="Annonce importante" className="relative bg-anne text-white">
      <Container className="flex items-center gap-3 py-3 pr-12 sm:gap-4">
        <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white/15">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2.5s]" aria-hidden />
          <Megaphone className="relative size-4" />
        </span>
        <p className="min-w-0 flex-1 text-sm leading-snug sm:text-[0.95rem]">
          <span className="mr-2 font-bold tracking-wider uppercase">Important</span>
          <span className="font-medium">{alert.message}</span>
          {alert.hasDetails && (
            <Link to="/annonce-importante" className="ml-2 inline-flex items-center gap-1 font-semibold whitespace-nowrap underline underline-offset-4 hover:no-underline">
              En savoir plus <ArrowRight className="size-3.5" />
            </Link>
          )}
        </p>
      </Container>
      <button
        type="button"
        onClick={close}
        className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full hover:bg-white/15 sm:right-4"
        aria-label="Fermer l’annonce"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}

/** Rappel de l'alerte à côté des horaires (accueil, page Horaires) */
export function AlertNotice({ alert, variant = 'light' }: { alert: SiteAlert | null; variant?: 'light' | 'dark' }) {
  if (!alert) return null
  return (
    <div
      className={cx(
        'flex items-start gap-3 rounded-2xl border-l-4 border-anne p-4 text-sm',
        variant === 'dark' ? 'bg-white text-ink shadow-lg' : 'bg-anne/5 text-ink',
      )}
    >
      <Megaphone className="mt-0.5 size-5 shrink-0 text-anne" />
      <p>
        <span className="block text-xs font-bold tracking-wider text-anne uppercase">Changement important</span>
        <span className="font-semibold">{alert.message}</span>
        {alert.hasDetails && (
          <Link to="/annonce-importante" className="mt-1 flex items-center gap-1 font-semibold text-anne hover:underline">
            En savoir plus <ArrowRight className="size-3.5" />
          </Link>
        )}
      </p>
    </div>
  )
}
