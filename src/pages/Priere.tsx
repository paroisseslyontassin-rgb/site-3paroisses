import type { ReactNode } from 'react'
import { CalendarClock, FileText, MapPin, Music } from 'lucide-react'
import { Gallery } from '../components/Gallery'
import { Button, Container, ImageCard, InfoContact, PageHero, Section, SectionTitle } from '../components/ui'
import { links } from '../data/site'
import { doc, img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

const booklets = [
  { title: 'Carnet de chants', cover: img('2024/11/Page-de-garde-carnet-de-chants-724x1024.png'), href: doc('2025/09/CARNET-DE-CHANTS.pdf') },
  { title: 'Vivre la messe', cover: img('2024/11/PAGE-DE-GARDE_Vivre-la-messe-724x1024.png'), href: doc('2025/09/Vivre-la-messe.pdf') },
  { title: 'Prière des frères', cover: img('2025/12/page-de-garde-priere-des-freres-724x1024.jpg'), href: doc('2025/12/LETTRE-PRIERE-FRERES-YSP.pdf') },
]

export function Priere() {
  useTitle('Prière')
  return (
    <>
      <PageHero
        eyebrow="Prière"
        title="Pour toutes les grâces"
        intro="Le premier sens de la prière, c’est de maintenir notre relation à Dieu."
        image={img('2024/02/Jesus_art.png')}
      >
        <Button to="/horaires" variant="gold">
          Adoration et chapelet
        </Button>
      </PageHero>
      <Section>
        <SectionTitle eyebrow="Groupes et ressources" title="Prier ensemble" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ImageCard to="/livrets" image={img('2024/11/Page-de-garde-carnet-de-chants-724x1024.png')} imageClassName="aspect-[4/3] [&_img]:object-top" title="Livrets" text="Carnet de chants, livret « Vivre la messe », prière des frères : à télécharger." />
          <ImageCard to="/goutons-la-parole" image={img('2024/06/bible-1024x683.jpg')} title="Goûtons la Parole" text="Rencontres mensuelles de lectio divina : lire et méditer ensemble la Parole de Dieu." />
          <ImageCard to="/si-tu-savais-le-don-de-dieu" image={img('2025/10/1761422906384-768x1024.jpg')} title="Si tu savais le don de Dieu" text="Libre louange et prière, le jeudi à 19h à Notre-Dame du Point-du-Jour." />
          <ImageCard to="/les-veillheureuses" image={img('2026/04/site-internet_IMG-20260326-WA0005_edit_24910713108698.jpg')} title="Les Veill(h)eureuses" text="Une veillée joyeuse et priante, un vendredi par mois à Saint-Joseph." />
          <ImageCard to="/musiciens" image={img('2024/07/IMG_20240706_190113.jpg')} title="Musiciens" text="Chanter, jouer, diriger : mettez vos talents au service de la liturgie." />
          <ImageCard to="/meditation-du-dimanche" image={img('2025/09/Reconstruire-ensemble-la-pierre-dangle-725x1024.png')} imageClassName="aspect-[4/3] [&_img]:object-top" title="Méditation du dimanche" text="Une méditation pour préparer la messe du dimanche, et les lectures du jour." />
        </div>
      </Section>
    </>
  )
}

export function Livrets() {
  useTitle('Livrets')
  return (
    <>
      <PageHero eyebrow="Prière" title="Livrets à télécharger" intro="Des supports pour prier, chanter et vivre pleinement la messe, chez vous ou à l’église." />
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {booklets.map((b) => (
            <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className="group">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <img src={b.cover} alt={`Couverture : ${b.title}`} className="aspect-[724/1024] w-full object-cover" loading="lazy" />
              </div>
              <p className="mt-4 flex items-center gap-2 font-display text-2xl">
                <FileText className="size-5 text-gold" /> {b.title}
              </p>
              <p className="text-sm text-ink-soft">Télécharger le PDF</p>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}

export function Charismatique() {
  useTitle('Si tu savais le don de Dieu')
  const lines = [
    'Le louer car Il est Beau et Grand',
    'Le louer car douce est la louange',
    'Chanter pour Lui de tout notre cœur',
    'Dire les merveilles qu’Il fait dans nos vies',
    'Grandir dans la foi par les témoignages',
    'Demander la prière des frères',
    'Accueillir la Parole',
    'Renouveler nos forces',
    'Recevoir Sa joie jeudi après jeudi',
  ]
  return (
    <>
      <PageHero eyebrow="Groupe de prière" title="« Si tu savais le don de Dieu »" intro="Libre louange et prière." image={img('2024/01/eau.jpg')} />
      <Section>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <div className="mb-10 flex flex-wrap gap-4">
              <Badge icon={<CalendarClock className="size-5" />} label="Le jeudi à 19h00" />
              <Badge icon={<MapPin className="size-5" />} label="Chapelle de semaine, église Notre-Dame du Point-du-Jour" />
            </div>
            <ul className="space-y-1">
              {lines.map((l, i) => (
                <li key={l} className="font-display text-2xl leading-relaxed text-ink sm:text-3xl" style={{ opacity: 1 - i * 0.04 }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <Gallery columns={2} aspect="aspect-[3/4]" images={[{ src: img('2025/10/1761422906384-768x1024.jpg'), alt: 'Groupe Si tu savais le don de Dieu' }]} />
        </div>
      </Section>
    </>
  )
}

export function Goutons() {
  useTitle('Goûtons la Parole')
  return (
    <>
      <PageHero eyebrow="Tous bienvenus !" title="Goûtons la Parole" intro="« Quand deux ou trois sont réunis en mon nom, je suis là au milieu d’eux. »" image={img('2024/06/bible-1024x683.jpg')} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-paroisse">
            <p className="text-xl text-ink">
              Nous vous invitons à rejoindre « Goûtons la Parole » : des <strong>rencontres mensuelles de lectio divina</strong>.
            </p>
            <ul>
              <li>Lire et méditer ensemble la Parole de Dieu en suivant un parcours biblique annuel.</li>
              <li>Prier et contempler avec les sens spirituels : voir, entendre, goûter et sentir, toucher ce que Dieu nous inspire par sa Parole.</li>
            </ul>
            <p>
              Nos rencontres se déroulent de <strong>20h15 à 22h30</strong>, salle paroissiale sous l’église Notre-Dame du Point-du-Jour, 20
              rue des Aqueducs à Lyon 5e.
            </p>
            <p>Pas d’inscription préalable et sans engagement. Ceux qui viennent juste une fois pour découvrir sont les bienvenus !</p>
            <InfoContact email="goutonslaparole@gmail.com" label="Renseignements" />
          </div>
          <Gallery
            columns={2}
            images={[
              { src: img('2025/09/GLP2025-2026_page-0001-724x1024.jpg'), alt: 'Programme Goûtons la Parole (1)' },
              { src: img('2025/09/GLP2025-2026_page-0002-724x1024.jpg'), alt: 'Programme Goûtons la Parole (2)' },
            ]}
          />
        </div>
      </Section>
    </>
  )
}

export function Veillheureuses() {
  useTitle('Les Veill(h)eureuses')
  const rows = [
    ['Quoi', 'Une veillée joyeuse et priante… Comme une pause entre fin de semaine et début de week-end, pour retrouver du calme et peut-être un peu de paix, relire les jours passés, nourrir les jours à venir. Un temps qui aide à vouloir ce qu’on fait, un moment d’ancrage dans la Parole de Dieu, à travers le répertoire pop louange, mais aussi des chants plus intergénérationnels.'],
    ['Pour qui', 'Ouvert aux musicien·nes et chanteur·euses, débutant·es ou non, qu’on soit catho, en recherche, ou qu’on ait envie de découvrir une prière décomplexée.'],
    ['Quand', 'Un vendredi par mois, deux horaires : dès 18h30 pour répéter si l’on veut participer à l’animation ; à 19h pour participer à la veillée joyeuse et priante.'],
    ['Où', 'Dans le narthex de St Jo : église Saint-Joseph, 2 bis avenue de la République, 69160 Tassin-la-Demi-Lune.'],
    ['Qui', 'Proposée et animée par les Gônes à Bosco et… vous, si l’envie vous prend de rejoindre l’équipe pour une soirée ou pour l’année !'],
    ['Infos et calendrier', 'Sur ce site, sur l’appli des 3 paroisses FLASH 3 et sur WhatsApp.'],
  ]
  return (
    <>
      <PageHero
        eyebrow="Une veillée joyeuse et priante"
        title="Les Veill(h)eureuses"
        intro="Un vendredi par mois à Saint-Joseph de la Demi-Lune : une pause pour retrouver du calme, relire les jours passés et nourrir les jours à venir."
        image={img('2026/04/site-internet_IMG-20260326-WA0005_edit_24910713108698-1.jpg')}
      />
      <Section>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <dl className="divide-y divide-line rounded-3xl border border-line bg-white">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-2 p-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-display text-xl text-gold">{k}</dt>
                <dd className="leading-relaxed text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-6">
            <Gallery
              columns={2}
              aspect="aspect-auto"
              images={[
                { src: img('2026/04/site-internet_IMG-20260326-WA0005_edit_24910713108698-1.jpg'), alt: 'Les Veill(h)eureuses' },
                { src: img('2026/04/veillheureuse-texte-pr-site-internet-1-723x1024.jpg'), alt: 'Présentation et QR code WhatsApp' },
              ]}
            />
            <InfoContact label="Contact" />
          </div>
        </div>
      </Section>
    </>
  )
}

export function Musiciens() {
  useTitle('Musiciens')
  return (
    <>
      <PageHero eyebrow="Musique liturgique" title="Musiciens, chanteurs, animateurs" image={img('2024/07/IMG_20240706_190113.jpg')}>
        <Button to={links.musiciens} variant="gold">
          Je m’inscris
        </Button>
      </PageHero>
      <section className="py-20 sm:py-28">
        <Container className="max-w-4xl text-center">
          <Music className="mx-auto size-10 text-gold" />
          <blockquote className="mt-8 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
            « Chanter, jouer, composer, diriger, faire de la musique dans l’Église sont parmi les plus belles choses pour la gloire de Dieu :
            c’est un privilège, un cadeau de Dieu pour exprimer un art musical et participer à la réalisation des mystères divins. Une belle
            et bonne musique est un instrument privilégié pour aborder le transcendant et aide souvent à comprendre un message. »
          </blockquote>
          <p className="mt-6 text-sm font-semibold tracking-widest text-gold uppercase">Pape François</p>
          <Button to={links.musiciens} className="mt-10">
            Cliquer ici pour s’inscrire
          </Button>
        </Container>
      </section>
    </>
  )
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">
      <span className="text-gold">{icon}</span>
      {label}
    </span>
  )
}

