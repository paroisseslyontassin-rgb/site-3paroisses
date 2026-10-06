import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { parishes, site, tel } from '../data/site'
import { NewsletterForm } from './NewsletterForm'
import { Container, TriStripe } from './ui'

const columns = [
  {
    title: 'La paroisse',
    links: [
      ['Qui sommes-nous', '/qui-sommes-nous'],
      ['Don Bosco', '/don-bosco'],
      ['Horaires', '/horaires'],
      ['Contact', '/contact'],
      ['Faire un don', '/donner'],
    ],
  },
  {
    title: 'Vivre sa foi',
    links: [
      ['Demander un sacrement', '/sacrements'],
      ['Funérailles', '/funerailles'],
      ['Prière', '/priere'],
      ['Pastorale des jeunes', '/pastorale-des-jeunes'],
      ['Entraide', '/entraide'],
    ],
  },
  {
    title: 'Actualités',
    links: [
      ['Toute l’actualité', '/actualites'],
      ['Célébrations & annonces', '/celebrations'],
      ['Rencontres', '/rencontre-avec-cesare-baldi'],
      ['Méditation du dimanche', '/meditation-du-dimanche'],
      ['Passerelle', '/passerelle'],
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <TriStripe />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="inline-block rounded-2xl bg-white p-3">
              <img src={site.logo} alt="Ensemble paroissial" className="h-14 w-auto" />
            </div>
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-white">{site.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={tel(site.phone)} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-gold" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                  <Mail className="size-4 shrink-0 text-gold" /> {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-sm font-semibold tracking-widest text-white uppercase">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-3">
          {parishes.map((p) => (
            <a key={p.id} href={p.maps} target="_blank" rel="noopener noreferrer" className="group flex gap-3 text-sm">
              <MapPin className="mt-0.5 size-5 shrink-0" style={{ color: p.color }} />
              <span>
                <span className="block font-semibold text-white group-hover:underline">{p.name}</span>
                {p.address}, {p.city}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white/5 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-6 lg:mb-0">
            <h3 className="text-2xl text-white">Recevoir les infolettres</h3>
            <p className="mt-1 text-sm">Suivez la vie des trois paroisses, chaque semaine dans votre boîte mail.</p>
          </div>
          <NewsletterForm compact />
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>By Joashams © {new Date().getFullYear()} Ensemble paroissial « 3 paroisses Lyon 5 – Tassin-la-Demi-Lune »</p>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="hover:text-white">
              Politique de confidentialité
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
