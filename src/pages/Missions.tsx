import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Gallery } from '../components/Gallery'
import { ActionList, Button, Container, Eyebrow, ImageCard, InfoContact, PageHero, Section, SectionTitle, cx } from '../components/ui'
import { links } from '../data/site'
import { img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

const enoria = (id: string) => `https://public.enoria.app/pubinsc/gp/${id}/open`

/* ------------------------------------------------------------------ */
/* Missions                                                            */
/* ------------------------------------------------------------------ */

export function Missions() {
  useTitle('Missions')
  return (
    <>
      <PageHero
        eyebrow="Nos missions"
        title="Annoncer la Bonne Nouvelle du Christ"
        intro="Témoigner que Jésus, le Christ, est « le Chemin, la Vérité et la Vie » (Jn 14, 6) dans le monde, s’ouvrir à la relation aux autres, dans un esprit de dialogue et de partage."
        image={img('2025/08/Tv49-CylBuvX.jpeg')}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ImageCard to="/sacrements" image={img('2024/01/eau.jpg')} eyebrow="Sacrements" title="Entrer dans l’alliance" text="Par les sacrements, Dieu nous fait entrer en relation avec Lui, dans son alliance." />
          <ImageCard to="/priere" image={img('2025/08/2-1.png')} eyebrow="Prière" title="Rester en relation avec Dieu" text="Le premier sens de la prière, c’est de maintenir notre relation à Dieu." />
          <ImageCard to="/formation" image={img('2025/08/2-2.png')} eyebrow="Formation – Évangélisation" title="La formation intégrale" text="Du Christ évangélisateur à l’Église évangélisatrice : notre mission, c’est la formation intégrale." />
          <ImageCard to="/entraide" image={img('2024/02/Jeunes_Maeline.png')} eyebrow="Entraide" title="Solidarité" text="Elle est essentielle à nos vies individuelles et pour la société." />
          <ImageCard to="/pastorale-des-jeunes" image={img('2025/08/Tv49-CylBuvX-1.jpeg')} eyebrow="Pastorale des jeunes" title="« Qu’ils se sentent aimés »" text="Éveil à la foi, KT XXL, aumônerie, camps d’été, scoutisme… avec la pédagogie de Don Bosco." />
          <ImageCard to="/donner" image={img('2024/07/photo-plante-pousse-1-scaled.jpg')} eyebrow="Faire un don" title="Soutenir la mission" text="L’Église vit des dons. Merci d’offrir à l’Église." />
        </div>
      </Section>
      <Section className="bg-white">
        <SectionTitle eyebrow="Organisation" title="Les groupes de l’ensemble paroissial" intro="Cliquez sur une affiche pour l’agrandir." />
        <Gallery
          columns={3}
          aspect="aspect-auto"
          images={[
            { src: img('2024/10/d0fdc9ed04004422e72c39c430f3c757kAiMgbXGmeQUPQRJ-0.jpg'), alt: 'Évangéliser et célébrer' },
            { src: img('2024/10/d0fdc9ed04004422e72c39c430f3c757kAiMgbXGmeQUPQRJ-1.jpg'), alt: 'Solidarité et rencontre avec le monde' },
            { src: img('2024/10/d0fdc9ed04004422e72c39c430f3c757kAiMgbXGmeQUPQRJ-2.jpg'), alt: 'Administration et fonctionnement des bâtiments' },
          ]}
        />
        <div className="mt-8 grid gap-3 text-center text-sm font-semibold sm:grid-cols-3">
          <p>Évangéliser et célébrer</p>
          <p>Solidarité et rencontre avec le monde</p>
          <p>Administration et fonctionnement des bâtiments</p>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl">Profession de foi</h2>
            <p className="mt-2 text-white/75">Profession de foi préparée à l’Institution des Minimes.</p>
          </div>
          <Button to={links.professionFoi} variant="gold">
            Je demande la profession de foi
          </Button>
        </div>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Formation                                                           */
/* ------------------------------------------------------------------ */

type Org = { name: string; body: ReactNode; address?: string[]; phone?: string; email?: string; link?: [string, string] }

const formations: Org[] = [
  {
    name: 'Groupe Bible',
    body: (
      <>
        <p>
          Nous proposons une lecture des différents livres de la Bible (Premier et Nouveau Testament) à partir de dossiers donnés aux
          participants en début d’année. Il ne s’agit pas de cours mais de travail personnel (environ 1h30 par dossier) que nous partageons
          mensuellement, en grand groupe ou en petits groupes locaux, en alternance.
        </p>
        <p>
          <strong>Programme :</strong> depuis le démarrage, nous avons étudié la Genèse, l’Exode, les livres de la Sagesse, les Psaumes, les
          Prophètes, les quatre Évangiles, les Actes des Apôtres, l’Apocalypse, quelques portraits de femmes dans la Bible, ainsi qu’un
          parcours sur l’Esprit Saint et un sur la fraternité dans la Bible.
        </p>
      </>
    ),
  },
  {
    name: 'Le Valdocco',
    body: <p>Des équipes éducatives au plus près des enjeux des quartiers prioritaires et de la protection de l’enfant.</p>,
    address: ['Siège social : 18 rue du Nivernais, 95100 Argenteuil', 'Siège administratif : 14 rue Roger Radisson, 69005 Lyon'],
    phone: '04 72 57 18 64',
    email: 'assistance.formation@levaldocco.fr',
  },
  {
    name: 'Université Catholique de Lyon – UCLy',
    body: (
      <>
        <p>
          Le Pôle Théologie et Sciences religieuses de l’UCLy combine un enseignement de pointe en théologie catholique et des formations
          pratiques qui répondent aux réalités de l’Église et de la société.
        </p>
        <p>À la rentrée 2026, l’UCLy inaugure une nouvelle faculté ecclésiastique de sciences sociales, avec deux nouvelles formations :</p>
        <ul>
          <li>
            une licence canonique (niveau master) dédiée aux vulnérabilités, avec une approche pluridisciplinaire (ethnologie, anthropologie,
            psychologie…) et trois thématiques : santé, interculturalité-migration, fait religieux ;
          </li>
          <li>un doctorat canonique de sciences sociales : psychologie, ethnologie, sociologie, histoire et sciences de l’éducation.</li>
        </ul>
      </>
    ),
    address: ['Campus Saint-Paul, 10 place des Archives, 69002 Lyon', 'Campus Carnot, 23 place Carnot, 69002 Lyon'],
    phone: '04 72 32 50 12',
  },
  {
    name: 'Le Châtelard',
    body: (
      <p>
        Centre spirituel jésuite : un lieu au calme où chacun peut écouter la Parole de Dieu, trouver le silence, un accompagnement, une
        formation, une communauté priante, un accueil fraternel et respectueux du point où il en est.
      </p>
    ),
    address: ['41 route du Bruissin, 69340 Francheville'],
    phone: '04 72 16 22 33',
    email: 'accueil@chatelard-sj.org',
  },
  {
    name: 'Familya',
    body: <p>Lieu ressources dédié à la relation à tous les âges de la vie.</p>,
    phone: '04 72 40 98 00',
    email: 'accueil@familya-lyon.fr',
  },
]

export function Formation() {
  useTitle('Formation')
  return (
    <>
      <PageHero
        eyebrow="Formation – Évangélisation"
        title="Notre mission, c’est la formation intégrale"
        intro="Du Christ évangélisateur à l’Église évangélisatrice : se former pour mieux comprendre, mieux vivre et mieux annoncer sa foi."
        image={img('2025/08/2-2.png')}
      >
        <Button to="https://lyon.catholique.fr/service_diocesain/formations/" variant="gold">
          L’offre de formation du diocèse
        </Button>
      </PageHero>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {formations.map((o) => (
            <OrgCard key={o.name} org={o} />
          ))}
          <div className="overflow-hidden rounded-3xl border border-line bg-white">
            <Gallery columns={2} aspect="aspect-[1024/724]" images={[{ src: img('2025/10/FLAME-WE-1024x724.jpg'), alt: 'Week-end FLAME' }]} />
          </div>
        </div>
      </Section>
    </>
  )
}

function OrgCard({ org, className }: { org: Org; className?: string }) {
  return (
    <article className={cx('flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-8', className)}>
      <h3 className="text-2xl">{org.name}</h3>
      <div className="prose-paroisse mt-4 flex-1 text-base">{org.body}</div>
      {(org.address || org.phone || org.email || org.link) && (
        <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-ink-soft">
          {org.address?.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {a}
            </li>
          ))}
          {org.phone && (
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" /> {org.phone}
            </li>
          )}
          {org.email && (
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${org.email}`} className="break-all text-ndpj hover:underline">
                {org.email}
              </a>
            </li>
          )}
          {org.link && (
            <li className="flex items-center gap-2">
              <ArrowUpRight className="size-4 shrink-0 text-gold" />
              <a href={org.link[1]} target="_blank" rel="noopener noreferrer" className="text-ndpj hover:underline">
                {org.link[0]}
              </a>
            </li>
          )}
        </ul>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Entraide                                                            */
/* ------------------------------------------------------------------ */

const valdoccoText = (
  <>
    <p>
      L’association Le Valdocco a été fondée en 1995, sur « La Dalle » à Argenteuil (Val-d’Oise), dans une cité traumatisée par la
      violence des émeutes urbaines du début des années 90. Elle est née de la rencontre entre un collectif d’habitants, inquiets pour le
      devenir de leurs enfants, et des Salésiens de Don Bosco, désireux de réexpérimenter le modèle de leur fondateur dans la réalité
      contemporaine de la banlieue. En 2005, elle ouvre une antenne sur le Grand Lyon, dans le 5e arrondissement tout d’abord, puis, à la
      demande des municipalités, à Vaulx-en-Velin et à Tassin-la-Demi-Lune. Suivent Nice en 2012, Lille en 2015 et Marseille en 2019.
    </p>
    <p>L’association met en place des structures socio-éducatives de prévention destinées :</p>
    <ul>
      <li>à prévenir la marginalisation et la délinquance par l’idée d’une éducation pour tous, pour permettre l’émancipation et la citoyenneté ;</li>
      <li>à prévenir l’échec scolaire par un accompagnement éducatif individuel et collectif ;</li>
      <li>
        à prévenir les ruptures de liens et de parcours entre les personnes et les institutions, mais aussi au sein de la famille, par des
        actions de médiation autour de l’expression et du soutien à la parentalité.
      </li>
    </ul>
    <p>Ainsi que des structures pour l’accueil de jeunes dépendant de l’Aide Sociale à l’Enfance :</p>
    <ul>
      <li>deux services d’Accueil Éducatif de Jour, pour des adolescents en situation de décrochage et en grande vulnérabilité, à Argenteuil (ADOVAL) et Lyon (Laurenfance) ;</li>
      <li>un internat pour adolescents garçons, le « foyer Laurenfance », habilité ASE et Protection Judiciaire de la Jeunesse, à Tassin-la-Demi-Lune.</li>
    </ul>
    <p>
      Et des lieux d’accueil pour jeunes majeurs en errance : Motiv’action pour une remobilisation, et Evajeunes à Lyon pour l’hébergement et
      l’accompagnement d’une trentaine de jeunes venant de l’Aide Sociale à l’Enfance, parfois ex-mineurs isolés.
    </p>
    <p>
      Depuis son origine, le Valdocco travaille avec des bénévoles : ateliers, animation, accompagnement scolaire. Attaché à la pédagogie de
      Don Bosco, il l’actualise dans ses pratiques et la diffuse par Valdocco Formation, qui dispense des formations continues aux
      établissements scolaires et d’action sociale.
    </p>
  </>
)

export function Entraide() {
  useTitle('Entraide')
  return (
    <>
      <PageHero
        eyebrow="Entraide"
        title="Solidarité et rencontre avec le monde"
        intro="L’entraide est essentielle à nos vies individuelles et pour la société. De nombreuses associations agissent près de chez vous : rejoignez-les !"
        image={img('2024/02/Jeunes_Maeline.png')}
      />

      <nav className="sticky top-20 z-30 border-b border-line bg-cream/95 backdrop-blur" aria-label="Associations">
        <Container className="flex gap-2 overflow-x-auto py-3 text-sm whitespace-nowrap">
          {[
            ['Urgence sociale', 'urgence'],
            ['Chrétiens à l’écoute', 'ecoute'],
            ['APAAM', 'apaam'],
            ['CCFD-Terre Solidaire', 'ccfd'],
            ['Foi & Lumière', 'foi-lumiere'],
            ['Le Valdocco', 'valdocco'],
            ['Saint-Vincent-de-Paul', 'ssvp'],
            ['Soli Cité', 'soli-cite'],
            ['Lyon-Cathédrale', 'cathedrale'],
          ].map(([l, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-line bg-white px-4 py-1.5 font-medium hover:border-gold">
              {l}
            </a>
          ))}
        </Container>
      </nav>

      <Section>
        <div className="space-y-20">
          <Block id="urgence" title="Guide de l’urgence sociale" poster={{ src: img('2026/06/page-de-garde-guide-de-lurgence-sociale-1-724x1024.jpg'), href: 'https://www.lyon.fr/sites/lyonfr/files/content/documents/2026-02/Guide_Urgence_Sociale_2026_CCAS_Lyon_planches.pdf' }}>
            <p>Le guide de l’urgence sociale 2026, édité par le CCAS de la Ville de Lyon.</p>
            <Button to="https://www.lyon.fr/sites/lyonfr/files/content/documents/2026-02/Guide_Urgence_Sociale_2026_CCAS_Lyon_planches.pdf" variant="outline">
              Consulter le guide (PDF)
            </Button>
          </Block>

          <Block id="ecoute" title="Chrétiens à l’écoute" poster={{ src: img('2026/04/CHRETIEN-A-LECOUTE-1024x724.jpg') }} landscape />

          <Block id="apaam" eyebrow="Association Passerelle pour l’Accueil et l’Accompagnement des Migrants" title="APAAM" poster={{ src: img('2024/07/1-1-724x1024.png') }} extra={[img('2024/07/2-724x1024.png')]}>
            <p>
              Le projet de l’APAAM est construit à partir des axes indiqués par le pape François dans son message pour la Journée mondiale du
              migrant et du réfugié de janvier 2018 : « Accueillir, protéger, promouvoir, intégrer ». Ses trois objectifs sont donc :
              accueillir, accompagner, intégrer et autonomiser.
            </p>
            <p>
              Ancrée à Tassin et Lyon 5e, notre association souhaite que chaque migrant ait une vie digne et décente. Chaque personne est
              suivie par un couple de référents qui l’accompagne dans sa vie quotidienne : suivi administratif, aide aux devoirs pour les
              enfants, appui financier, recherche de logement… Mais c’est aussi, bien sûr, une relation fraternelle qui s’établit.
            </p>
            <p>
              Nous sommes une quinzaine de bénévoles de profils différents, pour la plupart paroissiens des paroisses salésiennes ou de
              Saint-Claude. Nous vivons des dons et organisons régulièrement des événements pour récolter des fonds ou partager des moments
              conviviaux avec les familles.
            </p>
            <div className="rounded-2xl bg-gold-soft/60 p-5 text-sm">
              <p className="font-semibold text-ink">L’APAAM a besoin de vous !</p>
              <p className="mt-1">
                Nous cherchons des référents pour accompagner des jeunes et des familles dans les démarches de la vie quotidienne et les
                épauler dans leur intégration. Contactez Armelle de Boisse au 06 63 90 44 45 ou{' '}
                <a href="mailto:armelledeboisse@gmail.com">armelledeboisse@gmail.com</a>.
              </p>
            </div>
            <p className="text-sm">
              Plus d’informations : <a href="mailto:apaam-lyon@gmail.com">apaam-lyon@gmail.com</a> · Président : Denis Legros, 06 63 22 19 47
            </p>
          </Block>

          <Block id="ccfd" title="CCFD-Terre Solidaire – équipe locale Lyon 5e – Tassin" poster={{ src: img('2026/06/d6a95597-b942-490e-b808-efa0b7ad97b9-768x1024.jpg') }} logo={img('2024/07/Nouveau-logo-du-CCFD-Terre-Solidaire-1_m.jpg')}>
            <p>
              Le CCFD-Terre Solidaire est une association catholique nationale qui œuvre pour faire reculer la faim dans le monde en faisant
              advenir le droit, la justice, la paix et la fraternité. C’est notre foi en Christ et son message d’Amour universel qui nous
              motive.
            </p>
            <p>
              L’équipe locale comprend 10 membres permanents et une douzaine de sympathisants, en lien avec les équipes diocésaines et
              régionales. Nous nous réunissons environ une fois par mois autour d’un thème pour réfléchir et agir, et sommes parfois appelés
              à témoigner en église, dans des écoles, des lycées ou sur les parvis.
            </p>
            <p>
              Les bénévoles et salariés seront heureux de vous recevoir dans leur nouvel espace associatif, 41 rue Paul Verlaine à
              Villeurbanne.
            </p>
            <p className="text-sm">
              <strong>Rejoignez-nous !</strong> Équipe locale : 06 45 85 17 19 ·{' '}
              <a href="https://ccfd-terresolidaire.org/j-agis" target="_blank" rel="noopener noreferrer">
                ccfd-terresolidaire.org/j-agis
              </a>
            </p>
          </Block>

          <Block id="foi-lumiere" title="Foi & Lumière" poster={{ src: img('2025/06/FOI-ET-LUMIERE-724x1024.jpg') }} />

          <Block id="valdocco" title="Le Valdocco" poster={{ src: img('2024/07/image-3.png') }} landscape>
            {valdoccoText}
          </Block>

          <Block id="ssvp" title="Société de Saint-Vincent-de-Paul" poster={{ src: img('2024/07/solitude-1-725x1024.jpg') }}>
            <p>
              À Tassin, nous sommes la seule association à faire de l’aide alimentaire : toutes les deux semaines, nous servons une
              cinquantaine de familles, soit à peu près 140 personnes. La plupart nous sont adressées par les assistantes sociales de la
              commune.
            </p>
            <p>Avec ses 18 bénévoles, la Société de Saint-Vincent-de-Paul de Tassin pourra continuer à respecter sa devise grâce à vos dons :</p>
            <blockquote>« Aimer, partager, servir »</blockquote>
            <p className="text-sm">Contact : Coralie Desmarescaux</p>
          </Block>

          <Block id="soli-cite" title="Soli Cité" poster={{ src: img('2024/07/VERSION-FINALISEE-ACCEPTEE_Tract-Soli-cite-3-730x1024.jpg') }} />

          <Block id="cathedrale" title="Lyon-Cathédrale" poster={{ src: img('2025/10/info-724x1024.jpg') }} />
        </div>
      </Section>
    </>
  )
}

function Block({
  id,
  eyebrow,
  title,
  poster,
  extra = [],
  logo,
  landscape,
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  poster: { src: string; href?: string }
  extra?: string[]
  logo?: string
  landscape?: boolean
  children?: ReactNode
}) {
  const images = [{ src: poster.src, alt: title, href: poster.href }, ...extra.map((src) => ({ src, alt: title }))]
  if (!children) {
    return (
      <article id={id} className="scroll-mt-40">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mb-8 text-3xl font-medium sm:text-4xl">{title}</h2>
        <div className={landscape ? 'max-w-3xl' : 'max-w-sm'}>
          <Gallery columns={2} aspect="aspect-auto" images={images} />
        </div>
      </article>
    )
  }
  return (
    <article id={id} className="grid grid-cols-1 scroll-mt-40 items-start gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
      <div>
        {logo && <img src={logo} alt="" className="mb-6 h-14 w-auto" loading="lazy" />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-3xl font-medium sm:text-4xl">{title}</h2>
        <div className="prose-paroisse mt-6">{children}</div>
      </div>
      <div className="space-y-4">
        <Gallery columns={2} aspect="aspect-auto" images={images} />
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Pastorale des jeunes                                                */
/* ------------------------------------------------------------------ */

const schools = [
  ['Institution Notre-Dame des Minimes', '65 rue des Aqueducs, 69005 Lyon', '04 37 41 13 13', 'https://www.lesminimes-lyon.org'],
  ['École Notre-Dame du Point-du-Jour', '7 place Bénédict Tessier, 69005 Lyon', '04 78 25 16 64', 'https://www.ndpj.fr'],
  ['École Vincent Serre', '13 avenue de la République, 69160 Tassin-la-Demi-Lune', 'secretariat.ecolevincentserre@gmail.com', 'https://www.ecolevincentserre.com'],
  ['École Saint-Charles de Tassin', '7 promenade des Tuileries, 69160 Tassin-la-Demi-Lune', 'secretariat@saintcharlestassin.fr', ''],
]

const camps = [
  ['Déclic', '11–13 ans', 'Découvrir la vie de camp, l’autonomie et SE découvrir. Aller à la rencontre de l’autre et de soi-même par des jeux, veillées, balades, l’organisation de la vie quotidienne et la proximité de la nature. Vivre 14 jours avec des jeunes du même âge est un premier pas vers l’autonomie !'],
  ['Horizon', '13–15 ans', 'Participer ensemble à une action solidaire, dépasser notre ligne d’horizon en s’ouvrant au monde qui nous entoure. Ces jeunes deviendront acteurs de leur temps de vacances, mais également acteurs pour les autres.'],
  ['Sac’ado', '13–16 ans', 'Partir avec son sac à dos sur les sentiers, vivre une aventure de groupe et le plaisir de la randonnée en pleine nature : balades, grandes marches et quelques jours de bivouac. Sans oublier les jeux, la détente et les rencontres…'],
  ['Cré’action', '15–17 ans', 'Construire les activités des vacances : agir, jouer, relire ses expériences, respecter des règles construites ensemble, évaluer et valoriser ses actions, échanger ses compétences, persévérer, dépasser ses limites.'],
]

export function PastoraleJeunes() {
  useTitle('Pastorale des jeunes')
  return (
    <>
      <PageHero
        eyebrow="Pastorale des jeunes"
        title="« Qu’ils se sentent aimés »"
        intro="Le charisme de saint Jean Bosco se déploie dans une attention continue aux enfants et aux jeunes. Un groupe de jeunes adultes, le Phare Ouest, coordonne un panel de propositions et garantit la cohérence de l’ensemble."
        image={img('2024/07/IMG_20240706_190113.jpg')}
      />

      <nav className="sticky top-20 z-30 border-b border-line bg-cream/95 backdrop-blur" aria-label="Propositions">
        <Container className="flex gap-2 overflow-x-auto py-3 text-sm whitespace-nowrap">
          {[
            ['Écoles', 'ecoles'],
            ['Éveil à la foi', 'eveil'],
            ['KT XXL', 'kt'],
            ['Coin des jeunes', 'coin'],
            ['Oratorio', 'oratorio'],
            ['Aumônerie', 'aumonerie'],
            ['Lycéens', 'lycees'],
            ['MSJ', 'msj'],
            ['Camps d’été', 'camps'],
            ['Campobosco', 'campobosco'],
            ['Scoutisme', 'scouts'],
          ].map(([l, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-line bg-white px-4 py-1.5 font-medium hover:border-gold">
              {l}
            </a>
          ))}
        </Container>
      </nav>

      {/* Écoles */}
      <Section id="ecoles" className="scroll-mt-32">
        <SectionTitle eyebrow="3 – 12 ans" title="Présence dans les écoles catholiques" intro="La communauté salésienne accompagne les établissements catholiques d’enseignement : primaires et collèges." />
        <div className="grid gap-5 sm:grid-cols-2">
          {schools.map(([name, address, contact, url]) => (
            <div key={name} className="rounded-3xl border border-line bg-white p-6">
              <p className="font-display text-xl">{name}</p>
              <p className="mt-2 text-sm text-ink-soft">{address}</p>
              <p className="mt-1 text-sm break-all text-ink-soft">{contact.includes('@') ? <a className="text-ndpj hover:underline" href={`mailto:${contact}`}>{contact}</a> : contact}</p>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ndpj hover:underline">
                  {url.replace('https://', '')} <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Éveil à la foi */}
      <Section id="eveil" className="scroll-mt-32 bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>3 – 6 ans</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">L’éveil à la foi</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              L’éveil à la foi permet aux enfants de 3 à 6 ans de découvrir Jésus et de nourrir leur foi autour d’un thème en lien avec
              l’année liturgique. Chaque rencontre se déroule autour de quatre dimensions :
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {['Une expérience de vie', 'Une annonce de la Parole', 'Un temps de prière', 'Une activité manuelle'].map((d) => (
                <p key={d} className="rounded-2xl bg-cream px-4 py-3 text-sm font-semibold">
                  {d}
                </p>
              ))}
            </div>
            <Button to={enoria('1b4e69ab49e6658')} variant="gold" className="mt-8">
              Je demande l’éveil à la foi
            </Button>
          </div>
          <img src={img('2025/08/SLIDER-SITE-eveil-a-la-foi-1024x358.png')} alt="Éveil à la foi" className="w-full rounded-3xl shadow-lg" loading="lazy" />
        </div>
      </Section>

      {/* KT XXL */}
      <Section id="kt" className="scroll-mt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div>
            <Eyebrow>Catéchisme</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">Le catéchisme version « XXL »</h2>
            <div className="prose-paroisse mt-6">
              <p>
                Votre enfant désire participer à un parcours de catéchèse ? Vous souhaitez lui donner l’occasion de faire ce pas en plus dans
                la foi ? Nous sommes à votre disposition pour trouver le parcours qui lui conviendra le mieux.
              </p>
              <p>
                Le « KT XXL » est un <strong>rendez-vous mensuel, pour toute la famille</strong>, où chacun chemine à la rencontre de Jésus
                et cherche à mieux le connaître. Une centaine d’enfants y viennent de divers horizons : du quartier, d’écoles privées ou
                publiques, connaissant plus ou moins Jésus.
              </p>
              <h3>À chacun son parcours</h3>
              <ul>
                <li><strong>Éveil à la foi (3-6 ans)</strong> : la découverte de Jésus dans notre vie.</li>
                <li><strong>KT Découverte (CP)</strong> : découvrir comment Jésus est entré dans notre monde et à quel point Il est notre ami.</li>
                <li><strong>KT Parcours (CE1-CM2)</strong> : approfondir la relation avec Jésus, en apprenant de ses rencontres, et comment Il est présent à nos côtés.</li>
                <li>
                  <strong>KT 1re Communion (CE2-CM2)</strong> : accompagner les enfants qui cheminent vers la Table eucharistique. Un
                  parrainage de prière est coordonné avec le Service de l’Évangile auprès des Malades (SEM).
                </li>
                <li><strong>Préparation au baptême</strong> pour les enfants d’âge scolaire.</li>
              </ul>
              <p>
                Pour les parents, des temps d’enseignement et d’échanges sont prévus avec des intervenants. C’est l’occasion de faire
                connaissance et de cheminer ensemble, en toute fraternité. La convivialité est de mise : merci aux coopérateurs salésiens et
                paroissiens qui servent le goûter à la fin des rencontres !
              </p>
              <p>
                Merci à la superbe équipe qui encadre toute cette troupe : prêtres, une vingtaine de catéchistes, secrétaire, coopérateurs
                salésiens, diacres, animateurs liturgiques, parents en binôme et paroissiens. Le « KT XXL », ce sont des chemins, des
                rencontres qui nous font grandir et avancer par la relation que nous créons entre nous et avec Jésus.
              </p>
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-40 lg:self-start">
            <ActionList
              title="Inscriptions KT XXL"
              items={[
                { label: 'KT Découverte', hint: 'CP', to: enoria('e532fbc6d8aca0a') },
                { label: 'KT Parcours', hint: 'CE1 – CM2', to: enoria('de7d8c54cd664e5') },
                { label: 'KT Baptême', hint: 'Enfants d’âge scolaire', to: links.bapteme },
                { label: 'KT Première des communions', hint: 'CE2 – CM2', to: enoria('98f3a9b44d622e3') },
              ]}
            />
            <InfoContact email="ktparoisses@gmail.com" label="Catéchèse" />
          </aside>
        </div>
        <div className="mt-12">
          <Gallery
            columns={2}
            aspect="aspect-auto"
            images={[
              { src: img('2026/09/livret-familles-2-1024x737.jpg'), alt: 'Livret familles (1)' },
              { src: img('2026/09/livret-familles-1-1024x724.jpg'), alt: 'Livret familles (2)' },
            ]}
          />
          <img src={img('2025/08/SLIDER-SITE5-1024x358.jpg')} alt="" className="mt-6 w-full rounded-3xl" loading="lazy" />
        </div>
      </Section>

      {/* Coin des jeunes / Oratorio */}
      <Section className="bg-white">
        <div className="grid gap-6 md:grid-cols-2">
          <Card id="coin" eyebrow="À partir de 7 ans" title="Le coin des jeunes" email="paroissendpj69@lyon.catholique.fr">
            Un groupe de jeunes accompagné par les sœurs salésiennes anime une fois par mois des rencontres destinées aux enfants du quartier
            de Ménival (Lyon 5e).
          </Card>
          <Card id="oratorio" eyebrow="6 – 13 ans" title="Oratorio" email="dorias2004@gmail.com" image={img('2025/08/KUMPdia-TujH.jpg')}>
            Centre de loisirs salésien où les enfants peuvent découvrir leurs talents, apprendre à vivre avec leurs différences, prendre
            confiance.
          </Card>
          <div id="aumonerie" className="scroll-mt-40 overflow-hidden rounded-3xl border border-line bg-cream md:row-span-2">
            <div className="p-7">
              <Eyebrow>Collégiens et lycéens</Eyebrow>
              <h3 className="text-2xl">Aumônerie</h3>
              <a href="https://www.egliselyonouest.fr/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ndpj hover:underline">
                egliselyonouest.fr <ArrowUpRight className="size-4" />
              </a>
            </div>
            <a href="https://www.egliselyonouest.fr/" target="_blank" rel="noopener noreferrer">
              <img src={img('2025/09/flyer-A5-2025-724x1024.jpg')} alt="Flyer de l’aumônerie" className="w-full" loading="lazy" />
            </a>
          </div>
          <Card id="lycees" eyebrow="Lycéens" title="Bosco Jeunes Lycées" email="paroissendpj69@lyon.catholique.fr">
            L’objectif est de partir de l’éducatif et du culturel pour promouvoir un engagement en animation. Les jeunes viennent des Minimes,
            de Pressins et du Lycée Don Bosco. Nous favorisons la rencontre avec des témoins qui ouvrent à la relecture de vie. La prière se
            vit à partir de la Parole de Dieu, et le jeu reste une dynamique pédagogique de base. Certains peuvent préparer leur
            confirmation.
          </Card>
          <Card id="msj" eyebrow="17 ans et +" title="Le Mouvement Salésien des Jeunes" email="paroissendpj69@lyon.catholique.fr" image={img('2025/08/MSJ17-Presentation-sdb.jpeg')}>
            Le MSJ rassemble toutes les réalités salésiennes (paroissiales, scolaires, sociales) où les jeunes de plus de 17 ans sont présents.
          </Card>
        </div>
      </Section>

      {/* Camps d'été */}
      <Section id="camps" className="scroll-mt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <Eyebrow>11 – 17 ans · Juillet</Eyebrow>
            <h2 className="text-3xl font-medium sm:text-4xl">Camps Inter-Jeunes (CIJE) : ensemble pour des vacances autrement !</h2>
            <div className="prose-paroisse mt-6">
              <p>
                Depuis 1985, notre association propose aux jeunes de 11 à 17 ans de vivre ensemble des vacances dans l’amitié, la détente et
                la découverte d’une région. Nos camps durent 14 jours en juillet et se déroulent chaque année dans un lieu différent. Les
                campeurs dorment sous la tente et sont répartis en quatre groupes de 26 jeunes maximum, autour d’un QG d’une dizaine de
                bénévoles (matériel, intendance, coordination pédagogique et vie spirituelle).
              </p>
              <p>
                Membres de la famille salésienne, les CIJE se réfèrent à la pédagogie de Don Bosco et à son système préventif : confiance,
                relation éducative, accompagnement, bienveillance. Nous voulons aider les jeunes à grandir en favorisant l’autonomie et la
                responsabilité. Ce temps de vacances proche de la nature est un excellent support pour s’ouvrir aux autres, cultiver des
                amitiés, apprendre à se connaître et échanger sur ses projets d’avenir.
              </p>
              <p>
                La foi chrétienne anime notre approche spirituelle. Les Camps Inter-Jeunes accueillent des jeunes et des animateurs de toutes
                religions ou non croyants, dans un respect mutuel.
              </p>
            </div>
          </div>
          <img src={img('2024/07/image-2.png')} alt="Camps Inter-Jeunes" className="w-full rounded-3xl shadow-lg lg:sticky lg:top-40" loading="lazy" />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {camps.map(([name, age, text]) => (
            <div key={name} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-xs font-semibold tracking-widest text-gold uppercase">{age}</p>
              <p className="mt-1 font-display text-2xl">{name}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <InfoContact />
        </div>
      </Section>

      {/* Campobosco */}
      <section id="campobosco" className="relative isolate scroll-mt-32 overflow-hidden bg-ink py-20 text-white sm:py-28">
        <img src={img('2025/08/campo.jpg')} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-transparent" aria-hidden />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>14 – 25 ans · Fin août</Eyebrow>
            <h2 className="text-4xl font-medium sm:text-5xl">Campobosco</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Le camp incontournable de spiritualité salésienne : 4 jours toniques pour vivre un R.A.P. (Réflexion, Activités, Prière). À la
              veille de la rentrée, un temps fort en famille salésienne pour se ressourcer et recharger les batteries : sports, ateliers
              créatifs, musique, danse… et bien d’autres.
            </p>
            <Button to="https://campobosco.fr/" variant="gold" className="mt-8">
              Plus d’infos
            </Button>
          </div>
        </Container>
      </section>

      {/* Valdocco + Scouts */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-line bg-white p-7 sm:p-8">
            <img src={img('2024/07/image-3.png')} alt="Le Valdocco" className="mb-6 h-40 w-full rounded-2xl object-cover" loading="lazy" />
            <h3 className="text-2xl">Le Valdocco</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Fondée en 1995 à Argenteuil par des habitants et des Salésiens de Don Bosco, l’association met en place des structures
              socio-éducatives de prévention et d’accueil pour les jeunes, à Lyon 5e, Vaulx-en-Velin et Tassin-la-Demi-Lune notamment.
            </p>
            <Button to="/entraide#valdocco" variant="outline" className="mt-6">
              Découvrir le Valdocco
            </Button>
          </article>
          <article id="scouts" className="grid grid-cols-1 scroll-mt-40 gap-6 rounded-3xl border border-line bg-white p-7 sm:grid-cols-[1fr_180px] sm:p-8">
            <div>
              <h3 className="text-2xl">Scoutisme</h3>
              <blockquote className="mt-4 font-display text-xl text-ink italic">« Transformer le monde en se transformant »</blockquote>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Telle pourrait être la devise actualisée des Scouts et Guides de France. Deux groupes existent sur notre ensemble paroissial :
                <strong className="text-ink"> Lyon 5</strong> et <strong className="text-ink">Tassin-la-Demi-Lune</strong>.
              </p>
            </div>
            <Gallery columns={2} aspect="aspect-auto" images={[{ src: img('2025/10/Affiche-SGDF-724x1024.jpg'), alt: 'Affiche des Scouts et Guides de France' }]} />
          </article>
        </div>
      </Section>
    </>
  )
}

function Card({ id, eyebrow, title, email, image, children }: { id: string; eyebrow: string; title: string; email: string; image?: string; children: ReactNode }) {
  return (
    <article id={id} className="flex scroll-mt-40 flex-col overflow-hidden rounded-3xl border border-line bg-cream">
      {image && <img src={image} alt="" className="h-48 w-full object-cover" loading="lazy" />}
      <div className="flex flex-1 flex-col p-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{children}</p>
        <a href={`mailto:${email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold break-all text-ndpj hover:underline">
          <Mail className="size-4 shrink-0" /> {email}
        </a>
      </div>
    </article>
  )
}
