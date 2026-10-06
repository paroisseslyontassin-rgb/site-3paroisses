import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to) || to.endsWith('.pdf')

/** Lien interne (React Router) ou externe (nouvel onglet) selon l'adresse */
export function SmartLink({ to, className, children, ...rest }: { to: string; className?: string; children: ReactNode; 'aria-label'?: string }) {
  if (isExternal(to)) {
    const newTab = !to.startsWith('mailto:') && !to.startsWith('tel:')
    return (
      <a href={to} className={className} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  )
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Section({ className, children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className={cx('py-16 sm:py-24', className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx('mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase', className)}>
      <span className="h-px w-8 bg-current" aria-hidden />
      {children}
    </p>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  center,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <div className={cx('mb-10 max-w-3xl sm:mb-14', center && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className={center ? 'justify-center' : undefined}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  )
}

type ButtonProps = {
  to: string
  children: ReactNode
  variant?: 'primary' | 'gold' | 'outline' | 'light' | 'ghost'
  className?: string
  icon?: boolean
}

export function Button({ to, children, variant = 'primary', className, icon = true }: ButtonProps) {
  const styles = {
    primary: 'bg-ink text-white hover:bg-ink/90 shadow-sm',
    gold: 'bg-gold text-white hover:bg-gold/90 shadow-sm',
    outline: 'border border-ink/15 bg-white text-ink hover:border-ink/40',
    light: 'bg-white text-ink hover:bg-cream shadow-sm',
    ghost: 'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm',
  }[variant]
  const Icon = isExternal(to) ? ArrowUpRight : ArrowRight
  return (
    <SmartLink
      to={to}
      className={cx(
        'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200',
        styles,
        className,
      )}
    >
      {children}
      {icon && <Icon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </SmartLink>
  )
}

/** Bandeau de titre en haut de chaque page */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  image?: string
  children?: ReactNode
}) {
  return (
    <header className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
        </>
      )}
      {!image && (
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(184,137,59,0.25),transparent_55%)]"
          aria-hidden
        />
      )}
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-medium sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
      <TriStripe />
    </header>
  )
}

/** Liseré aux trois couleurs des paroisses */
export function TriStripe({ className }: { className?: string }) {
  return (
    <div className={cx('flex h-1.5', className)} aria-hidden>
      <span className="flex-1 bg-joseph" />
      <span className="flex-1 bg-ndpj" />
      <span className="flex-1 bg-anne" />
    </div>
  )
}

/** Liste de liens d'inscription / démarches */
export function ActionList({ title, items }: { title?: string; items: { label: string; to: string; hint?: string }[] }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
      {title && <h3 className="mb-5 text-2xl text-ink">{title}</h3>}
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li key={item.label + item.to}>
            <SmartLink
              to={item.to}
              className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:text-ndpj"
            >
              <span>
                <span className="font-semibold">{item.label}</span>
                {item.hint && <span className="mt-0.5 block text-sm text-ink-soft">{item.hint}</span>}
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream transition-colors group-hover:bg-ndpj group-hover:text-white">
                {isExternal(item.to) ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Encart « Plus d'info » vers le secrétariat */
export function InfoContact({ email = site.email, label = `${site.secretary}, secrétaire paroissiale` }: { email?: string; label?: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-gold-soft/60 p-5 text-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-gold">
        <Mail className="size-5" />
      </span>
      <div>
        <p className="font-semibold text-ink">Plus d’informations</p>
        <p className="text-ink-soft">
          {label} :{' '}
          <a href={`mailto:${email}`} className="font-medium break-all text-ndpj hover:underline">
            {email}
          </a>
        </p>
      </div>
    </div>
  )
}

/** Carte illustrée avec lien */
export function ImageCard({
  to,
  image,
  title,
  text,
  eyebrow,
  className,
  imageClassName,
}: {
  to: string
  image: string
  title: string
  text?: string
  eyebrow?: string
  className?: string
  imageClassName?: string
}) {
  return (
    <SmartLink
      to={to}
      className={cx(
        'group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5',
        className,
      )}
    >
      <div className={cx('aspect-[4/3] overflow-hidden bg-sand', imageClassName)}>
        <img
          src={image}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {eyebrow && <p className="mb-2 text-xs font-semibold tracking-widest text-gold uppercase">{eyebrow}</p>}
        <h3 className="text-xl font-medium text-ink sm:text-2xl">{title}</h3>
        {text && <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{text}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          En savoir plus
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </SmartLink>
  )
}

/** Mise en page deux colonnes : texte + colonne latérale */
export function TwoCols({ main, aside }: { main: ReactNode; aside: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
      <div>{main}</div>
      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">{aside}</aside>
    </div>
  )
}

export { cx }
