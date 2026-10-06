import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Button, PageHero, Section, SectionTitle } from '../components/ui'
import { clergy, deacons, parishes, site, tel } from '../data/site'
import { useTitle } from '../lib/useTitle'

export default function Contact() {
  useTitle('Contact')
  const priests = clergy.filter((c) => c.email)
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nous contacter"
        intro="Une question, une demande de sacrement, un rendez-vous avec un prêtre ? L’accueil paroissial est là pour vous."
      >
        <Button to={`mailto:${site.email}`} variant="gold">
          Écrire au secrétariat
        </Button>
        <Button to={tel(site.phone)} variant="ghost">
          {site.phone}
        </Button>
      </PageHero>

      <Section>
        <SectionTitle eyebrow="Accueil" title="Nos trois accueils paroissiaux" />
        <div className="grid gap-6 lg:grid-cols-3">
          {parishes.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className={`${p.bg} px-6 py-5 text-white`}>
                <p className="text-xs font-semibold tracking-widest text-white/75 uppercase">Église</p>
                <h3 className="text-2xl font-medium">{p.name}</h3>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 text-sm">
                <a href={p.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-ndpj">
                  <MapPin className={`mt-0.5 size-5 shrink-0 ${p.text}`} />
                  <span>
                    {p.address}
                    <br />
                    {p.city}
                  </span>
                </a>
                <a href={tel(p.phone)} className="flex items-center gap-3 hover:text-ndpj">
                  <Phone className={`size-5 shrink-0 ${p.text}`} /> {p.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-ndpj">
                  <Mail className={`size-5 shrink-0 ${p.text}`} /> {site.email}
                </a>
                {p.reception && (
                  <div className="mt-2 rounded-2xl bg-cream p-4">
                    <p className="mb-2 flex items-center gap-2 font-semibold">
                      <Clock className="size-4" /> Accueil par les laïcs
                    </p>
                    <ul className="space-y-1.5 text-ink-soft">
                      {p.reception.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.id === 'ndpj' && (
                  <p className="text-xs text-ink-soft">
                    Durant les vacances scolaires, les horaires sont susceptibles d’être modifiés : merci de téléphoner au {site.phone} avant
                    de vous déplacer.
                  </p>
                )}
              </div>
              <iframe
                title={`Plan d’accès – ${p.name}`}
                className="h-56 w-full border-t border-line"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${p.lng - 0.006}%2C${p.lat - 0.003}%2C${p.lng + 0.006}%2C${p.lat + 0.003}&layer=mapnik&marker=${p.lat}%2C${p.lng}`}
              />
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-cream p-7">
            <h3 className="text-2xl">Prêtres</h3>
            <ul className="mt-5 space-y-4 text-sm">
              {priests.map((p) => (
                <li key={p.last}>
                  <p className="font-semibold">
                    {p.first} {p.last}
                  </p>
                  <a href={`mailto:${p.email}`} className="break-all text-ndpj hover:underline">
                    {p.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-cream p-7">
            <h3 className="text-2xl">Diacres</h3>
            <ul className="mt-5 space-y-4 text-sm">
              {deacons.map((d) => (
                <li key={d.name}>
                  <p className="font-semibold">{d.name}</p>
                  {d.email && (
                    <a href={`mailto:${d.email}`} className="break-all text-ndpj hover:underline">
                      {d.email}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink p-7 text-white">
            <h3 className="text-2xl">Secrétariat paroissial</h3>
            <p className="mt-5 font-semibold">{site.secretary}</p>
            <a href={`mailto:${site.email}`} className="text-sm break-all text-gold-soft hover:underline">
              {site.email}
            </a>
            <p className="mt-2 text-sm text-white/75">{site.phone}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 rounded-[2rem] border border-line bg-white p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="prose-paroisse">
            <h2 className="text-3xl font-medium text-ink">Demande d’utilisation des salles paroissiales</h2>
            <p>
              La paroisse est heureuse de pouvoir mettre ses salles au service de la vie locale et des rencontres fraternelles. Nos locaux
              sont destinés en priorité aux activités paroissiales et aux initiatives en lien avec notre mission. Toutefois, certaines
              demandes extérieures peuvent être étudiées avec attention, selon la nature du projet et les disponibilités.
            </p>
            <p>
              Si vous souhaitez organiser une rencontre, une réunion ou un événement compatible avec l’esprit des lieux, adressez-nous une
              demande. Chaque demande est examinée avec bienveillance. Une convention d’utilisation pourra être établie et une
              participation aux frais de fonctionnement pourra être proposée.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Button to={`mailto:${site.email}?subject=Demande%20d%27utilisation%20d%27une%20salle%20paroissiale`} variant="gold">
              Faire une demande de salle
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
