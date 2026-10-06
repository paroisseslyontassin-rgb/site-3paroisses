import type { ReactNode } from 'react'
import { CalendarDays, HandHeart, Info, MapPin, Phone } from 'lucide-react'
import { Gallery } from '../components/Gallery'
import { Button, PageHero, Section } from '../components/ui'
import { tel, type Slot } from '../data/site'
import { formatDate } from '../lib/sanity'
import { AlertNotice } from '../components/Alert'
import { useAlert } from '../lib/alert'
import { useParishes } from '../lib/schedule'
import { img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

export default function Horaires() {
  useTitle('Horaires')
  const { parishes, updated } = useParishes()
  const alert = useAlert()
  return (
    <>
      <PageHero
        eyebrow="Horaires des célébrations"
        title="Messes, adoration et prière"
        intro="« Dieu, ton Père, t’accueille tel que tu es ! » Retrouvez les horaires de nos trois églises."
      >
        <Button to="/celebrations" variant="gold">
          Célébrations & annonces de la semaine
        </Button>
      </PageHero>

      <Section>
        {alert && (
          <div className="mb-10">
            <AlertNotice alert={alert} />
          </div>
        )}
        <div className="space-y-10">
          {parishes.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
                <div className={`${p.bg} relative p-8 text-white sm:p-10`}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-white/75 uppercase">Paroisse</p>
                  <h2 className="mt-2 text-3xl font-medium sm:text-4xl">{p.name}</h2>
                  <p className="mt-4 flex items-start gap-2 text-white/90">
                    <MapPin className="mt-0.5 size-5 shrink-0" />
                    <a href={p.maps} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {p.address}, {p.city}
                    </a>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-white/90">
                    <Phone className="size-5 shrink-0" />
                    <a href={tel(p.phone)} className="hover:underline">
                      {p.phone}
                    </a>
                  </p>
                </div>
                <img src={p.photo} alt={`Église ${p.name}`} className="h-56 w-full object-cover md:h-full" loading="lazy" />
              </div>
              <div className="grid gap-10 p-8 sm:p-10 md:grid-cols-2">
                <SlotList title="Messes" icon={<CalendarDays className="size-5" />} slots={p.masses} color={p.text} />
                <SlotList title="Prière" icon={<HandHeart className="size-5" />} slots={p.prayer} color={p.text} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex gap-4 rounded-3xl border border-line bg-white p-6 text-sm text-ink-soft sm:p-8">
          <Info className="mt-0.5 size-6 shrink-0 text-gold" />
          <div className="space-y-2">
            <p>
              <strong className="text-ink">Vacances scolaires estivales :</strong> du premier jour des vacances d’été au dernier jour des
              vacances d’été.
            </p>
            <p>
              <strong className="text-ink">Vacances scolaires :</strong> toutes les vacances sauf l’été.
            </p>
            <p className="text-xs">{updated ? `Horaires mis à jour le ${formatDate(updated)}.` : 'Horaires : édition du 28 août 2026.'}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="mb-8 text-3xl font-medium">Les affiches à télécharger</h2>
        <Gallery
          columns={3}
          aspect="aspect-auto"
          images={[
            { src: img('2025/09/27082026_Horaires-des-celebrations-rentree_canva.png'), alt: 'Horaires des célébrations' },
            { src: img('2024/10/512a694a87384d7a980f236606f7dffccmQtXV5IAULCh9lk-0-724x1024.jpg'), alt: 'Affiche des horaires' },
          ]}
        />
      </Section>
    </>
  )
}

function SlotList({ title, icon, slots, color }: { title: string; icon: ReactNode; slots: Slot[]; color: string }) {
  return (
    <div>
      <h3 className={`flex items-center gap-2 border-b border-line pb-3 font-sans text-sm font-semibold tracking-widest uppercase ${color}`}>
        {icon} {title}
      </h3>
      <ul className="divide-y divide-dashed divide-line">
        {slots.map((s) => (
          <li key={s.day + s.time + s.label} className="grid grid-cols-[6.5rem_4.5rem_1fr] items-baseline gap-2 py-3">
            <span className="text-sm font-semibold tracking-wide text-ink uppercase">{s.day}</span>
            <span className={`font-display text-2xl ${color}`}>{s.time}</span>
            <span className="text-sm text-ink-soft">
              {s.label && <span className="block font-medium text-ink">{s.label}</span>}
              {s.note && <span className="block text-xs">{s.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
