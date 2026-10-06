import { ArrowUpRight, Mail } from 'lucide-react'
import { Gallery } from '../components/Gallery'
import { Button, Container, Eyebrow, PageHero, Section, SectionTitle } from '../components/ui'
import { clergy, communities, deacons, site } from '../data/site'
import { img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

export function QuiSommesNous() {
  useTitle('Qui sommes-nous ?')
  return (
    <>
      <PageHero
        eyebrow="Qui sommes-nous ?"
        title="Une communauté chrétienne catholique sur trois paroisses"
        intro="Sous le feu de l’Esprit Saint, nous ouvrons nos portes à toute personne qui demande un service : la célébration des sacrements, la formation des chrétiens, l’aide aux plus pauvres…"
        image={img('2023/12/photo3paroisses-1.png')}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="prose-paroisse">
            <Eyebrow>Notre histoire</Eyebrow>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">Confiées aux Salésiens de Don Bosco depuis 2004</h2>
            <p>
              Les trois paroisses <strong>Sainte-Anne de Ménival</strong>, <strong>Saint-Joseph de la Demi-Lune</strong> et{' '}
              <strong>Notre-Dame du Point-du-Jour</strong> ont été confiées par l’archevêque Mgr Philippe Barbarin aux Pères
              Salésiens de Don Bosco en septembre 2004, en accord avec leurs provinciaux.
            </p>
            <p>
              Actuellement, l’ensemble des paroisses est porté par la communauté <strong>Dominique Savio – Tassin</strong> des
              Salésiens de Don Bosco, qui a pour mission d’annoncer et célébrer la Parole, témoigner de l’Évangile en éduquant selon
              la pédagogie et la spiritualité de Don Bosco, avec une priorité pour la pastorale des jeunes et les jeunes les plus en
              difficulté.
            </p>
            <div className="not-prose pt-4">
              <Button to="/don-bosco">Qui est Don Bosco ?</Button>
            </div>
          </div>
          <img src={img('2024/06/photo-abeilles-1024x722.jpg')} alt="Abeilles sur une ruche, image de la vie communautaire" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" loading="lazy" />
        </div>
      </Section>

      <Section className="bg-white">
        <SectionTitle eyebrow="La communauté salésienne" title="Les membres de la communauté des Salésiens de Don Bosco" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {clergy.map((p) => (
            <div key={p.last} className="flex flex-col rounded-3xl border border-line bg-cream p-6">
              <span className="grid size-14 place-items-center rounded-full bg-ink font-display text-xl text-white">
                {p.first[0]}
                {p.last[0]}
              </span>
              <p className="mt-5 font-display text-2xl leading-tight">
                {p.first}
                <span className="block text-lg tracking-wide uppercase">{p.last}</span>
              </p>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{p.role}</p>
              {p.email && (
                <a href={`mailto:${p.email}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ndpj hover:underline">
                  <Mail className="size-4" /> Écrire
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Gallery
            columns={2}
            images={[
              { src: img('2025/02/Diapositive1-1-724x1024.jpg'), alt: 'Présentation de la communauté (1)' },
              { src: img('2025/02/Diapositive2-724x1024.jpg'), alt: 'Présentation de la communauté (2)' },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionTitle eyebrow="Ils nous accompagnent" title="Différentes communautés religieuses" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {communities.map((c) => (
                <li key={c.name} className="rounded-2xl border border-line bg-white p-5">
                  <p className="font-semibold">{c.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                  <p className="mt-2 text-sm font-medium break-all text-ndpj">
                    {c.contact.includes('@') ? <a href={`mailto:${c.contact}`}>{c.contact}</a> : c.contact}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <h3 className="text-2xl">Diacres</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {deacons.map((d) => (
                  <li key={d.name}>
                    <span className="font-semibold">{d.name}</span>
                    {d.email && (
                      <a href={`mailto:${d.email}`} className="block text-white/70 hover:text-white">
                        {d.email}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7">
              <h3 className="text-2xl">Secrétariat</h3>
              <p className="mt-3 text-sm text-ink-soft">{site.secretary}, secrétaire paroissiale</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-sm font-medium break-all text-ndpj hover:underline">
                {site.email}
              </a>
            </div>
            <a
              href={img('2025/12/Presentation-pour-le-site.jpg')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-gold-soft/60 p-6 font-semibold hover:bg-gold-soft"
            >
              Conseil pastoral et Équipe d’Animation Pastorale
              <ArrowUpRight className="size-5 shrink-0" />
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}

const family = [
  ['Salésiens de Don Bosco (SDB)', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/salesiens-de-don-bosco/', 'En 1859, la « Société de Saint François de Sales » voit le jour : ce sont les Salésiens de Don Bosco.'],
  ['Sœurs Salésiennes de Don Bosco (FMA)', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/filles-de-maria-auxiliatrice/', 'En 1872, avec Marie-Dominique Mazzarello, Don Bosco fonde la Congrégation des Filles de Marie-Auxiliatrice, appelées aujourd’hui Sœurs Salésiennes de Don Bosco.'],
  ['Salésiens coopérateurs', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/salesiens-cooperateurs/', 'Attentif à ce que « toute personne vivant dans sa propre famille puisse appartenir à sa société », Don Bosco qualifie en 1876 de « coopérateurs » ceux qui s’associent à une œuvre au service des jeunes.'],
  ['Anciennes et Anciens de Don Bosco', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/anciens-eleves-et-amis-de-don-bosco/', 'À partir de 1870, il crée des associations d’anciens élèves de ses maisons, pour leur faire partager la mission d’éducation.'],
  ['Volontaires de Don Bosco (VDB)', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/volontaires-de-don-bosco-2/', 'En 1917, la famille salésienne accueille les Volontaires de Don Bosco, institut séculier féminin.'],
  ['Mouvement Salésien des Jeunes (MSJ)', 'https://www.don-bosco.net/membres-de-la-famille-salesienne/mouvement-salesien-des-jeunes/', 'Il rassemble les jeunes de toutes les réalités salésiennes.'],
]

export function DonBosco() {
  useTitle('Don Bosco')
  return (
    <>
      <PageHero
        eyebrow="La spiritualité de Don Bosco"
        title="Qui est Don Bosco ?"
        intro="« Père et maître de la jeunesse » : un prêtre turinois qui a consacré toute sa vie aux enfants et aux adolescents."
      />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="prose-paroisse">
            <p>
              Jean Bosco est né en 1815 près de Turin. Issu d’une modeste famille paysanne, il perd son père très tôt. Élevé par sa
              mère, Maman Marguerite, il se sent appelé, tout jeune, à consacrer sa vie aux enfants et aux adolescents. Pour y parvenir
              il doit étudier dans des conditions difficiles. Il devient prêtre en 1841 et découvre la misère des jeunes dans les
              faubourgs de Turin.
            </p>
            <p>
              Il parvient à rassembler nombre d’entre eux et fonde son premier Oratoire dans le quartier du Valdocco, à la fois lieu de
              loisirs et d’évangélisation, école professionnelle et secondaire. Ensemble ils vivent une démarche éducative originale
              basée sur la confiance, une bienveillance réciproque, qualifiée par Don Bosco de « préventive ».
            </p>
            <h3>Un « système » éducatif appelé « préventif »</h3>
            <p>
              Don Bosco suscite parmi les jeunes dont il a la charge des responsables qui s’enthousiasment pour sa pédagogie. En 1859,
              avec dix-sept d’entre eux, il crée la Société des Salésiens (SDB), constituée de religieux prêtres et laïcs. Don Bosco les
              appelle ainsi en souvenir de saint François de Sales dont il admirait la bonté et l’intelligence. Il ouvre avec eux, à ses
              frais, à Turin, l’Oratoire Saint-François-de-Sales, dont les activités vont sans cesse s’élargir : cours du soir en 1844,
              foyer d’apprentis en 1847, école secondaire et camps de vacances en 1848, et une collection de revues catholiques dont le
              tirage atteignit 18 000 exemplaires.
            </p>
            <p>
              Son système éducatif développe l’idée, alors assez neuve, que l’éducation professionnelle permet de donner des repères
              sociaux aux jeunes qui les ont perdus. Une autre intuition de Don Bosco est de réhabiliter l’affectivité dans la relation
              éducative (<em>amorevolezza</em>), à une époque où la tendance était de tout rationaliser. Partant du principe qu’il y a de
              l’affectif dans chaque relation, y compris d’autorité, il propose d’apprendre à la gérer plutôt que la nier. Enfin, il
              appuie son « système » éducatif sur un triptyque : <strong>la paroisse, l’école, la famille</strong>.
            </p>
            <h3>Le réseau salésien</h3>
            <p>
              Le mouvement initié par Don Bosco s’est élargi. Nombreuses sont les personnes qui se mettent au service des jeunes pour leur
              permettre une véritable insertion sociale : dans des{' '}
              <a href="https://www.don-bosco.net/reseaux-don-bosco/les-ecoles-salesiennes-de-don-bosco/" target="_blank" rel="noopener noreferrer">
                établissements scolaires
              </a>
              , des{' '}
              <a href="https://www.don-bosco.net/reseaux-don-bosco/don-bosco-action-sociale/" target="_blank" rel="noopener noreferrer">
                établissements d’action sociale
              </a>
              , des centres de jeunes, des paroisses. La mission salésienne veut faire de tous ses partenaires des « signes et des
              porteurs de l’amour de Dieu », dans le respect des convictions de chacun.
            </p>
            <h3>Don Bosco, aujourd’hui</h3>
            <p>
              Don Bosco est déclaré saint en 1934. Jean-Paul II le proclame « Père et maître de la jeunesse » en 1988. Aujourd’hui, les
              Salésiens sont plus de 15 000 dans 138 pays et les Salésiennes de Don Bosco 14 000 dans 93 nations.
            </p>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <a href="https://www.don-bosco.net/figures-salesiennes/biographiedb/" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-3xl shadow-xl">
              <img src={img('2024/06/photo-don-bosco-724x1024.jpg')} alt="Don Bosco" className="w-full" loading="lazy" />
            </a>
            <Button to="https://www.don-bosco.net/figures-salesiennes/biographiedb/" variant="outline" className="w-full">
              Biographie complète
            </Button>
          </aside>
        </div>
      </Section>
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="Fondateur" title="La famille salésienne" intro="Don Bosco a été l’initiateur d’un vaste mouvement au service des jeunes." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {family.map(([name, href, text]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group rounded-3xl border border-line bg-cream p-6 transition-colors hover:border-gold">
                <p className="flex items-start justify-between gap-3 font-display text-xl">
                  {name}
                  <ArrowUpRight className="size-5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
