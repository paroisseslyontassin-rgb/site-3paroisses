import { Send } from 'lucide-react'
import { links } from '../data/site'
import { cx } from './ui'

/**
 * Formulaire d'inscription à l'infolettre.
 * Il envoie directement au formulaire Brevo déjà utilisé par la paroisse
 * (la confirmation Brevo s'ouvre dans un nouvel onglet).
 */
export function NewsletterForm({ compact }: { compact?: boolean }) {
  const field = cx(
    'w-full rounded-full border px-5 py-3 text-sm outline-none transition-colors',
    compact
      ? 'border-white/15 bg-white/10 text-white placeholder:text-white/50 focus:border-gold'
      : 'border-line bg-white text-ink placeholder:text-ink-soft/60 focus:border-ndpj',
  )
  return (
    <form method="POST" action={links.newsletterForm} target="_blank" className={cx('grid gap-3', compact ? 'sm:grid-cols-[1fr_1fr_1.4fr_auto] lg:min-w-[42rem]' : 'sm:grid-cols-2')}>
      <label className="sr-only" htmlFor={`prenom-${compact}`}>Prénom</label>
      <input id={`prenom-${compact}`} name="PRENOM" placeholder="Prénom" className={field} autoComplete="given-name" />
      <label className="sr-only" htmlFor={`nom-${compact}`}>Nom</label>
      <input id={`nom-${compact}`} name="NOM" placeholder="Nom" className={field} autoComplete="family-name" />
      <label className="sr-only" htmlFor={`email-${compact}`}>Adresse e-mail</label>
      <input
        id={`email-${compact}`}
        name="EMAIL"
        type="email"
        required
        placeholder="Votre adresse e-mail"
        className={cx(field, !compact && 'sm:col-span-2')}
        autoComplete="email"
      />
      {/* Champs techniques attendus par Brevo */}
      <input type="text" name="email_address_check" defaultValue="" className="hidden" tabIndex={-1} aria-hidden />
      <input type="hidden" name="locale" value="fr" />
      <button
        type="submit"
        className={cx(
          'inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/90',
          !compact && 'sm:col-span-2',
        )}
      >
        <Send className="size-4" /> S’inscrire
      </button>
    </form>
  )
}
