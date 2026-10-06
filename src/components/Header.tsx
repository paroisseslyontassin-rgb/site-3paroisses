import { ChevronDown, Heart, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, site, tel, type NavGroup } from '../data/site'
import { Container, cx } from './ui'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMobileOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      {/* Barre supérieure */}
      <div className="hidden bg-ink text-xs text-white/80 md:block">
        <Container className="flex h-9 items-center justify-between">
          <p>Ensemble paroissial confié aux Salésiens de Don Bosco · Lyon 5e – Tassin-la-Demi-Lune</p>
          <div className="flex items-center gap-5">
            <a href={tel(site.phone)} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" /> {site.email}
            </a>
          </div>
        </Container>
      </div>

      <header
        className={cx(
          'sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow',
          scrolled ? 'border-line shadow-[0_8px_30px_-12px_rgba(20,33,61,0.15)]' : 'border-transparent',
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <Link to="/" className="shrink-0" aria-label="Accueil – 3 Paroisses Lyon 5 Tassin">
            <img src={site.logo} alt="Ensemble paroissial Saint-Joseph, Notre-Dame du Point-du-Jour, Sainte-Anne" className="h-12 w-auto sm:h-16" />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
            {navigation.map((group) => (
              <DesktopItem key={group.label} group={group} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/donner"
              className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold/90 sm:inline-flex"
            >
              <Heart className="size-4" /> Donner
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-cream xl:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  )
}

function DesktopItem({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()
  const active = group.to === pathname || group.children?.some((c) => c.to === pathname)

  useEffect(() => setOpen(false), [pathname])

  const base = cx(
    'relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors',
    active ? 'text-ink' : 'text-ink-soft hover:text-ink',
  )
  const underline = active && <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold" />

  if (!group.children) {
    return (
      <NavLink to={group.to!} className={base}>
        {group.label}
        {underline}
      </NavLink>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        window.clearTimeout(timer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        timer.current = window.setTimeout(() => setOpen(false), 120)
      }}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button type="button" className={base} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {group.label}
        <ChevronDown className={cx('size-4 transition-transform', open && 'rotate-180')} />
        {underline}
      </button>
      {open && (
        <div className="absolute top-full left-1/2 z-50 w-[22rem] -translate-x-1/2 pt-3">
          <div className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-ink/10 [animation-duration:250ms]">
            {group.to && !group.children.some((c) => c.to === group.to) && (
              <Link to={group.to} className="mb-1 block rounded-xl bg-cream px-4 py-3 text-sm font-semibold text-ink hover:bg-sand">
                Tout voir : {group.label}
              </Link>
            )}
            {group.children.map((child) => (
              <Link
                key={child.to + child.label}
                to={child.to}
                className={cx(
                  'block rounded-xl px-4 py-2.5 transition-colors hover:bg-cream',
                  pathname === child.to && 'bg-cream',
                )}
              >
                <span className="block text-sm font-semibold text-ink">{child.label}</span>
                {child.description && <span className="block text-xs text-ink-soft">{child.description}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex h-20 items-center justify-between border-b border-line px-5">
          <img src={site.logo} alt="" className="h-11 w-auto" />
          <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-cream" aria-label="Fermer le menu">
            <X className="size-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation mobile">
          <Link to="/" className="block rounded-xl px-4 py-3 font-semibold text-ink hover:bg-cream">
            Accueil
          </Link>
          {navigation.map((group) =>
            group.children ? (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => setExpanded((e) => (e === group.label ? null : group.label))}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-ink hover:bg-cream"
                  aria-expanded={expanded === group.label}
                >
                  {group.label}
                  <ChevronDown className={cx('size-5 transition-transform', expanded === group.label && 'rotate-180')} />
                </button>
                {expanded === group.label && (
                  <div className="mb-2 ml-4 border-l-2 border-gold-soft pl-2">
                    {group.to && !group.children.some((c) => c.to === group.to) && (
                      <Link to={group.to} className="block rounded-lg px-4 py-2 text-sm font-medium text-ink hover:bg-cream">
                        Tout voir
                      </Link>
                    )}
                    {group.children.map((child) => (
                      <Link key={child.to + child.label} to={child.to} className="block rounded-lg px-4 py-2 text-sm text-ink-soft hover:bg-cream hover:text-ink">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={group.label} to={group.to!} className="block rounded-xl px-4 py-3 font-semibold text-ink hover:bg-cream">
                {group.label}
              </Link>
            ),
          )}
        </nav>
        <div className="space-y-3 border-t border-line p-5">
          <Link to="/donner" className="flex items-center justify-center gap-2 rounded-full bg-gold py-3 font-semibold text-white">
            <Heart className="size-4" /> Faire un don
          </Link>
          <a href={tel(site.phone)} className="flex items-center justify-center gap-2 rounded-full border border-line py-3 font-semibold text-ink">
            <Phone className="size-4" /> {site.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
