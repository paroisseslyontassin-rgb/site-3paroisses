import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Clock, Flame, Mail, MapPin, Megaphone, Newspaper, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Container, Eyebrow, ImageCard, Section, SectionTitle, SmartLink, TriStripe } from '../components/ui'
import { links } from '../data/site'
import { AlertNotice } from '../components/Alert'
import { useAlert } from '../lib/alert'
import { useParishes, weekendMasses } from '../lib/schedule'
import { fetchArticles, useAsync } from '../lib/sanity'
import { LoadError, PostCard, PostsSkeleton } from './News'
import { doc, img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

const quickLinks = [
  { label: 'Célébrations & annonces', text: 'Annonces de la semaine', to: '/celebrations', icon: Megaphone },
  { label: 'Rencontres', text: 'Agenda des communautés', to: '/rencontre-avec-cesare-baldi', icon: Users },
  { label: 'Intention de messe', text: 'Confier une intention', to: links.intentionMesse, icon: Flame },
  { label: 'Méditation du dimanche', text: 'Méditation et lectures', to: '/meditation-du-dimanche', icon: BookOpen },
  { label: 'Actualités', text: 'Toute la vie paroissiale', to: '/actualites', icon: Newspaper },
  { label: 'Infolettres', text: 'Recevoir les nouvelles', to: '/infolettres', icon: Mail },
]

export default function Home() {
  useTitle()
  const { parishes } = useParishes()
  const alert = useAlert()
  return (
    <>
      {/* ---------- Héros ---------- */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img
          src="/media/image_fond.webp"
          srcSet="/media/image_fond-960.webp 960w, /media/image_fond.webp 1920w"
          sizes="100vw"
          alt="Crèche entourée de lumignons allumés dans l’église"
          className="absolute inset-0 -z-20 size-full object-cover object-[center_40%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/5" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" aria-hidden />

        <Container className="grid grid-cols-1 items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:py-14">
          <div className="animate-fade-up">
            <Eyebrow>Bienvenue</Eyebrow>
            <h1 className="text-[2.2rem] leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              La joie de célébrer Dieu <em className="font-normal text-gold-soft">à chaque étape</em> de la Vie
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Sainte-Anne de Ménival, Notre-Dame du Point-du-Jour et Saint-Joseph de la Demi-Lune : trois paroisses, une même
              communauté, portée par les Salésiens de Don Bosco.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/horaires" variant="gold">
                Horaires des messes
              </Button>
              <Button to="/sacrements" variant="ghost">
                Demander un sacrement
              </Button>
            </div>
          </div>

          {/* Carte des messes du week-end */}
          <div className="animate-fade-up rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl [animation-delay:150ms] sm:p-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold tracking-widest text-gold-soft uppercase">
                <Clock className="size-4" /> Messes du week-end
              </p>
            </div>
            {alert && (
              <div className="mt-4">
                <AlertNotice alert={alert} variant="dark" />
              </div>
            )}
            <ul className="mt-4 space-y-2">
              {weekendMasses(parishes).map((m) => {
                const p = m.parish
                return (
                  <li key={m.day + m.time + p.id} className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-3 py-2 sm:gap-4 sm:px-4">
                    <span className="w-16 shrink-0 text-[0.7rem] font-semibold tracking-wider text-white/60 uppercase sm:w-20 sm:text-xs">{m.day}</span>
                    <span className="w-14 shrink-0 font-display text-xl text-white sm:w-16 sm:text-2xl">{m.time}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="size-2 shrink-0 rounded-full" style={{ background: p.color }} />
                        <span className="truncate">{p.name}</span>
                      </span>
                      {m.note && (
                        <span className="block truncate text-xs text-white/55" title={m.note}>
                          {m.note}
                        </span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
            <Link to="/horaires" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-soft hover:text-white">
              Messes en semaine, adoration, chapelet <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
        <TriStripe />
      </section>

      {/* ---------- Accès rapides ---------- */}
      <section className="relative z-10 -mt-px bg-white">
        <Container className="grid grid-cols-2 divide-line border-b border-line sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {quickLinks.map(({ label, text, to, icon: Icon }) => (
            <SmartLink key={label} to={to} className="group flex flex-col gap-3 px-3 py-7 transition-colors hover:bg-cream sm:px-5">
              <span className="grid size-11 place-items-center rounded-2xl bg-gold-soft text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm leading-snug font-semibold text-ink">{label}</span>
                <span className="block text-xs text-ink-soft">{text}</span>
              </span>
            </SmartLink>
          ))}
        </Container>
      </section>

      {/* ---------- Nos trois églises ---------- */}
      <Section>
        <SectionTitle
          eyebrow="Nos trois églises"
          title="Une communauté, trois clochers"
          intro="Lyon 5e et Tassin-la-Demi-Lune : retrouvez l’église la plus proche de chez vous, ses horaires et son accueil."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {parishes.map((p) => (
            <article key={p.id} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-ink/5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.photo} alt={`Église ${p.name}`} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className={`absolute inset-x-0 bottom-0 h-1.5 ${p.bg}`} />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium">{p.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                  <MapPin className={`mt-0.5 size-4 shrink-0 ${p.text}`} />
                  {p.address}, {p.city}
                </p>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm">
                  {p.masses.map((m) => (
                    <li key={m.day + m.time} className="flex gap-3">
                      <span className="w-20 shrink-0 text-ink-soft">{m.day}</span>
                      <span className="font-semibold">{m.time}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  <Link to={`/horaires#${p.id}`} className={`inline-flex items-center gap-1 ${p.text} hover:underline`}>
                    Tous les horaires <ArrowRight className="size-4" />
                  </Link>
                  <a href={p.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
                    Itinéraire <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- Étapes de la vie ---------- */}
      <Section className="bg-sand/60">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="À chaque étape de la vie"
            title="L’Église vous accompagne"
            intro="Naissance, engagement, deuil : des équipes sont là pour vous accueillir et préparer avec vous ces moments essentiels."
            className="mb-0 sm:mb-0"
          />
          <Button to="/sacrements" variant="outline" className="shrink-0">
            Les 7 sacrements
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ImageCard
            to="/bapteme"
            image={img('2024/06/Bapteme.png')}
            eyebrow="Sacrement"
            title="Baptême"
            text="À chaque baptême, Dieu lui-même dit : « Cet enfant est mon enfant bien-aimé ! » Retrouvez ici les renseignements pour demander le baptême."
          />
          <ImageCard
            to="/mariage"
            image={img('2025/08/Sans-titre-A4-paysage.png')}
            eyebrow="Sacrement"
            title="Mariage"
            text="Célébrer son mariage, c’est rendre « célèbre » l’Amour de Dieu dans nos vies d’hommes et de femmes."
          />
          <ImageCard
            to="/funerailles"
            image={img('2025/08/1-1.png')}
            eyebrow="Accompagnement"
            title="Funérailles"
            text="Jésus nous dit : « Je suis la résurrection et la vie ». Prenez d’abord contact avec les pompes funèbres, qui fixeront avec la paroisse le jour et l’heure."
          />
        </div>
      </Section>

      {/* ---------- Dernières actualités ---------- */}
      <LatestNews />

      {/* ---------- Ressources ---------- */}
      <Section>
        <SectionTitle eyebrow="Ressources" title="Rester en lien avec la paroisse" />
        <div className="grid gap-6 lg:grid-cols-2">
          <a
            href={links.appliFlash}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-ink p-8 text-white sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,137,59,0.35),transparent_60%)]" aria-hidden />
            <img src={img('2025/09/GIF_noir.gif')} alt="QR code de l’application Flash 3" loading="lazy" className="relative mb-6 w-40 rounded-2xl bg-white sm:mb-0" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-widest text-gold-soft uppercase">Application</p>
              <h3 className="mt-2 text-3xl">Appli Flash 3</h3>
              <p className="mt-3 text-white/75">Recevez les informations des trois paroisses directement sur votre téléphone. Cliquez ou flashez le QR code.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-gold-soft group-hover:text-white">
                Ouvrir l’application <ArrowUpRight className="size-4" />
              </span>
            </div>
          </a>
          <div className="grid gap-6 sm:grid-cols-2">
            <ResourceTile to={doc('2025/09/Vivre-la-messe.pdf')} image={img('2024/11/PAGE-DE-GARDE_Vivre-la-messe-724x1024.png')} title="Vivre la messe" label="Livret PDF" position="object-[center_35%]" />
            <ResourceTile to="/passerelle" image={img('2024/06/Passerelle-1-1024x824.png')} title="La Passerelle" label="Journal paroissial" position="object-bottom" />
            <ResourceTile to={links.intentionMesse} image={img('2025/08/Sans-titre-945-x-761-px-1.gif')} title="Intention de messe" label="Formulaire en ligne" position="object-bottom" />
            <ResourceTile to="/actualites" image={img('2024/06/Actualite-1024x824.png')} title="Toute l’actualité" label="Actualités" position="object-bottom" />
          </div>
        </div>
      </Section>

      {/* ---------- Éditorial ---------- */}
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <div className="relative">
              <img
                src={img('2025/08/campo.jpg')}
                alt="Des jeunes réunis en plein air lors d’un camp"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
              />
              <Link
                to="/pastorale-des-jeunes"
                className="absolute -bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-lg hover:bg-cream"
              >
                Pastorale des jeunes <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <article>
            <Eyebrow>Éditorial</Eyebrow>
            <h2 className="text-4xl font-medium sm:text-5xl">« Présence réelle »</h2>
            <div className="prose-paroisse mt-8">
              <p>
                Dans un éditorial du quotidien <em>La Croix</em> revenant sur l’ultra-violence de certains ados, Isabelle de Gaulmyn
                rappelait le besoin de la « présence réelle » d’animateurs et d’autres adultes auprès des jeunes. Le dixième
                successeur de Don Bosco, le cardinal Angel Artime, utilise une expression similaire en osant parler du « sacrement
                salésien de la présence ». Il souligne que le premier appel des salésiens de Don Bosco est celui d’être une présence
                joyeuse et libre au milieu des jeunes. Ceux-ci sont le « véritable lieu théologique » dans la pédagogie et la
                spiritualité salésiennes.
              </p>
              <p>
                Oui, merci à tous ces animateurs, éducateurs, enseignants, et autres adultes qui « perdent » leur temps auprès de ces
                jeunes avec confiance, humilité et persévérance : souvent dans la discrétion et la fidélité de chaque jour, ils font
                grandir le Royaume de Dieu !
              </p>
              <blockquote>Un arbre qui tombe fait tellement de bruit… Mais n’oublions pas cette merveilleuse forêt de jeunes qui poussent en silence.</blockquote>
              <p>
                Cette ultra-violence reste à dénoncer ! Mais ces jeunes élèvent le monde de leur enthousiasme, de leur vitalité, de
                leur créativité, de leur fraternité. Ils sont le visage, le regard, le cœur, le corps du Christ. « Quand t’avons-nous
                vu… ? » « Ce que vous avez fait au plus petit d’entre les miens, c’est à moi que vous l’avez fait. »
              </p>
              <p>
                À travers un peu de sport, une activité ludique, une poignée de main ou un mot à l’oreille, les adultes présents
                auprès des jeunes leur permettent souvent de faire reculer la violence et gagner la Vie.
              </p>
              <p className="text-sm">Source : SDB.</p>
            </div>
          </article>
        </Container>
      </section>

      {/* ---------- Don ---------- */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28">
        <img src={img('2024/07/photo-plante-pousse-1024x683.jpg')} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden />
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Soutenir la paroisse</Eyebrow>
            <h2 className="text-4xl font-medium sm:text-5xl">L’Église vit des dons. Merci d’offrir à l’Église.</h2>
            <p className="mt-6 text-lg text-white/80">
              Quête, offrande de messe, souscription annuelle, denier : chaque geste permet à nos trois communautés de poursuivre leur
              mission et d’entretenir les bâtiments qui nous sont confiés.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/donner" variant="gold">
                Faire un don
              </Button>
              <Button to={links.denier} variant="ghost">
                Le denier de l’Église
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Bandeau prochaines rencontres ---------- */}
      <Section className="bg-cream">
        <div className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-line bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_auto]">
          <div className="flex gap-5">
            <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold sm:grid">
              <CalendarDays className="size-7" />
            </span>
            <div>
              <h2 className="text-3xl font-medium">Envie de nous rejoindre ?</h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Groupes de prière, catéchèse, entraide, musique, formation… Il y a une place pour chacun dans nos communautés.
                Découvrez nos missions ou écrivez-nous.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/missions">Nos missions</Button>
            <Button to="/contact" variant="outline">
              Nous contacter
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}

function ResourceTile({ to, image, title, label, position = 'object-center' }: { to: string; image: string; title: string; label: string; position?: string }) {
  return (
    <SmartLink to={to} className="group relative flex min-h-48 overflow-hidden rounded-3xl bg-ink">
      <img src={image} alt="" loading="lazy" className={`absolute inset-0 size-full object-cover ${position} opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60`} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden />
      <div className="relative mt-auto p-5 text-white">
        <p className="text-xs font-semibold tracking-widest text-gold-soft uppercase">{label}</p>
        <p className="mt-1 flex items-center gap-1.5 font-display text-xl">
          {title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </SmartLink>
  )
}

/** Les 3 derniers articles publiés dans WordPress */
function LatestNews() {
  const { data, error, loading } = useAsync(() => fetchArticles(1, 12), 'articles-1')
  return (
    <Section>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle eyebrow="Actualités" title="Les dernières nouvelles" className="mb-0 sm:mb-0" />
        <Button to="/actualites" variant="outline" className="shrink-0">
          Toute l’actualité
        </Button>
      </div>
      <div className="mt-12">
        {loading && <PostsSkeleton count={3} />}
        {error && <LoadError />}
        {data && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.articles.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
