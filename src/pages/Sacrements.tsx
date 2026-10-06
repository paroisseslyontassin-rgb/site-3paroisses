import { Droplets, Mail } from 'lucide-react'
import { ActionList, Button, Eyebrow, ImageCard, InfoContact, PageHero, Section, SectionTitle, TwoCols } from '../components/ui'
import { links, site } from '../data/site'
import { img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

const enoria = (id: string) => `https://public.enoria.app/pubinsc/gp/${id}/open`

/* ------------------------------------------------------------------ */
/* Vue d'ensemble                                                      */
/* ------------------------------------------------------------------ */

const sacraments = [
  { to: '/bapteme', title: 'Le baptême', image: img('2024/01/Bapteme.png'), text: 'À chaque baptême, Dieu lui-même dit : « Cet enfant est mon enfant bien-aimé ! »' },
  { to: '/communion', title: 'La communion', image: img('2024/02/communion.png'), text: 'C’est la source et le sommet de toute vie chrétienne : recevoir le corps du Christ sous l’apparence du pain consacré au cours de l’Eucharistie.' },
  { to: '/confirmation', title: 'La confirmation', image: img('2024/02/confirmation.png'), text: 'Elle nous fait entrer pleinement dans la grâce de l’Esprit et nous rend témoins de son action en nous pour la vraie vie.' },
  { to: '/onction-des-malades', title: 'La guérison', image: img('2024/06/photo-vase-repare-1024x683.jpg'), text: 'Une force spirituelle donnée à ceux qui souffrent de maladies graves, et pour les préparer à faire face à la mort.' },
  { to: '/penitence-et-reconciliation', title: 'Pénitence et réconciliation', image: img('2024/06/photo-confession-1024x768.jpg'), text: 'C’est seulement si nous nous laissons réconcilier en Jésus avec le Père et avec nos frères que nous pouvons être vraiment dans la paix.' },
  { to: '/mariage', title: 'Le mariage', image: img('2025/08/Sans-titre-A4-paysage-1.png'), text: 'Un engagement sacré entre un homme et une femme devant Dieu, pour une vie heureuse en tout.' },
  { to: '/ordination', title: 'L’ordination', image: img('2024/01/Ordination.png'), text: 'On reçoit la grâce et l’autorité spirituelle nécessaires pour exercer les fonctions de prêtre, diacre ou évêque.' },
]

export function Sacrements() {
  useTitle('Sacrements')
  return (
    <>
      <PageHero
        eyebrow="Demander un sacrement"
        title="7 sacrements pour le bonheur"
        intro="Par les sacrements, Dieu nous fait entrer en relation avec Lui, dans son alliance."
        image={img('2024/01/eau.jpg')}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sacraments.map((s) => (
            <ImageCard key={s.to} {...s} />
          ))}
          <div className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white">
            <div>
              <h3 className="text-2xl">Profession de foi</h3>
              <p className="mt-3 text-white/75">Profession de foi préparée à l’Institution des Minimes.</p>
            </div>
            <Button to={links.professionFoi} variant="gold" className="mt-8 self-start">
              Je demande la profession de foi
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Baptême                                                             */
/* ------------------------------------------------------------------ */

export function Bapteme() {
  useTitle('Baptême')
  return (
    <>
      <PageHero
        eyebrow="Devenir chrétien"
        title="Le baptême"
        intro="Le baptême nous plonge dans la mort et la résurrection avec le Christ. C’est un rite de passage."
        image={img('2024/06/Bapteme.png')}
      >
        <Button to="#demander" variant="gold">
          Demander le baptême
        </Button>
        <Button to="#certificat" variant="ghost">
          Certificat de baptême
        </Button>
      </PageHero>

      <Section>
        <TwoCols
          main={
            <div className="prose-paroisse">
              <h3 className="!mt-0">Qu’est-ce que le baptême ?</h3>
              <p>Le baptême fait partie des sacrements de l’initiation chrétienne.</p>
              <p>
                C’est le sacrement de la naissance à la vie chrétienne : marqué du signe de la croix, plongé dans l’eau, le nouveau baptisé
                renaît à une vie nouvelle. L’onction avec le Saint Chrême lui donne son nom de chrétien et dit sa mission. Devenu chrétien,
                le nouveau baptisé peut vivre selon l’Esprit de Dieu.
              </p>
              <h3>Les signes du sacrement</h3>
              <h4>L’eau</h4>
              <p>Baptisé dans la foi de l’Église au Christ mort et ressuscité, la profession de foi est intimement liée au rite de l’eau.</p>
              <h4>Les paroles</h4>
              <blockquote>« Je te baptise au nom du Père, et du Fils, et du Saint-Esprit. »</blockquote>
              <h4>Le parrain et la marraine</h4>
              <p>
                Chaque baptisé est accompagné par un parrain ou une marraine, ou les deux à la fois. Ils s’engagent à accompagner ce nouveau
                chrétien durant les différentes étapes de la vie chrétienne.
              </p>
            </div>
          }
          aside={
            <div id="demander" className="scroll-mt-28 space-y-6">
              <ActionList
                title="Demander le baptême"
                items={[
                  { label: 'Enfants de 0 à 4 ans', hint: 'Sur l’ensemble paroissial ou à l’extérieur (avec l’autorisation du curé)', to: links.bapteme },
                  { label: 'Enfants de 5 à 11 ans', to: links.bapteme },
                  { label: 'Jeune scolarisé aux Minimes', to: enoria('943b2829922f583') },
                  { label: 'Jeune scolarisé au Lycée Don Bosco', to: enoria('e2ff3791fc454b6') },
                  { label: 'Jeune scolarisé au Sacré-Cœur', to: enoria('7436b16fe066558') },
                  { label: 'Adultes : catéchuménat', hint: 'Demande de sacrement', to: enoria('299c0a171772af2') },
                ]}
              />
              <p className="px-2 text-sm text-ink-soft">
                Pour les jeunes de plus de 11 ans, contactez-nous par mail :{' '}
                <a href={`mailto:${site.email}`} className="font-medium text-ndpj hover:underline">
                  {site.email}
                </a>
              </p>
              <InfoContact />
            </div>
          }
        />
      </Section>

      <Section id="certificat" className="scroll-mt-20 bg-white">
        <SectionTitle
          eyebrow="Démarches"
          title="Demande de certificat de baptême"
          intro="Des rencontres de préparation vous sont proposées en fonction de l’âge. Pour un certificat, merci de faire votre demande à l’avance."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gold-soft/60 p-5">
                <p className="font-display text-3xl">2 semaines</p>
                <p className="mt-1 text-sm text-ink-soft">au moins avant de venir le récupérer, en période scolaire</p>
              </div>
              <div className="rounded-2xl bg-gold-soft/60 p-5">
                <p className="font-display text-3xl">3 semaines</p>
                <p className="mt-1 text-sm text-ink-soft">au moins avant de venir le récupérer, pendant les vacances scolaires</p>
              </div>
            </div>
            <div className="rounded-3xl border border-line p-6">
              <h3 className="text-xl">Deux possibilités pour récupérer votre certificat</h3>
              <ol className="mt-4 space-y-4 text-sm text-ink-soft">
                <li>
                  <strong className="text-ink">1. À l’accueil de la paroisse Notre-Dame du Point-du-Jour</strong>, durant les horaires
                  d’ouverture : 20 rue des Aqueducs, Lyon 5e.
                </li>
                <li>
                  <strong className="text-ink">2. Par courrier</strong>, à adresser à la paroisse Notre-Dame du Point-du-Jour, 20 rue des
                  Aqueducs, Lyon 5e, avec :
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>une enveloppe timbrée libellée à votre adresse ;</li>
                    <li>l’état civil complet pour retrouver l’acte (nom, prénoms, date et lieu de naissance) ;</li>
                    <li>les noms et prénoms des parents et leur domicile à l’époque (adresse complète) ;</li>
                    <li>la date et le lieu du baptême ;</li>
                    <li>le nom et l’adresse très lisibles du demandeur.</li>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="rounded-2xl border-l-4 border-anne bg-anne/5 p-5 text-sm text-ink-soft">
              <p>
                <strong className="text-ink">Attention :</strong> aucun envoi de certificat de baptême ne sera fait par mail.
              </p>
              <p className="mt-2">
                Pour un certificat en vue d’un <strong className="text-ink">mariage</strong>, indiquez à la paroisse en charge de la
                préparation du dossier votre date et lieu de baptême : elle prendra directement contact avec nous.
              </p>
            </div>
          </div>
          <CertificateForm />
        </div>
      </Section>
    </>
  )
}

/** Formulaire qui prépare un e-mail au secrétariat (aucune donnée n'est stockée sur le site) */
function CertificateForm() {
  const fields = [
    ['nom', 'Nom de naissance', 'text'],
    ['prenoms', 'Prénoms', 'text'],
    ['email', 'Adresse e-mail', 'email'],
    ['tel', 'Téléphone', 'tel'],
    ['naissance', 'Date de naissance', 'date'],
    ['date', 'Date du baptême', 'date'],
    ['eglise', 'Église où le baptême a été célébré', 'text'],
  ] as const

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      ...fields.map(([name, label]) => `${label} : ${data.get(name) ?? ''}`),
      '',
      `Motif : ${data.get('motif') ?? ''}`,
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Demande de certificat de baptême')}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-cream p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-2xl">
        <Droplets className="size-6 text-ndpj" /> Formulaire de demande
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Tous les champs sont obligatoires. Précisez votre motif, notamment s’il s’agit d’une demande de baptême, de première communion ou
        de confirmation, et le nom de l’établissement scolaire qui le demande. Nous vous informerons, de préférence par e-mail, lorsque le
        certificat sera prêt.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <label key={name} className={name === 'eglise' ? 'sm:col-span-2' : undefined}>
            <span className="mb-1.5 block text-sm font-medium">{label}</span>
            <input
              name={name}
              type={type}
              required
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-ndpj"
            />
          </label>
        ))}
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium">Motif de la demande</span>
          <textarea name="motif" required rows={4} className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-ndpj" />
        </label>
      </div>
      <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90">
        <Mail className="size-4" /> Préparer l’e-mail de demande
      </button>
      <p className="mt-3 text-xs text-ink-soft">Votre messagerie s’ouvrira avec la demande pré-remplie, il ne vous restera qu’à l’envoyer.</p>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* Mariage                                                             */
/* ------------------------------------------------------------------ */

export function Mariage() {
  useTitle('Mariage')
  const points = [
    ['Sacramentel', 'Pour nous, le mariage n’est pas seulement un contrat social ou juridique, mais un sacrement, c’est-à-dire un signe efficace de la grâce de Dieu : une alliance entre l’homme, la femme et Dieu.'],
    ['Engagement à vie', 'Le mariage est un engagement libre et indissoluble. Les époux s’engagent à vivre ensemble dans l’amour et la fidélité, à se soutenir dans les bons et les mauvais moments, dans la santé et la maladie.'],
    ['Compréhension du mariage', 'Les principaux buts du mariage catholique sont l’union des époux, l’éducation des enfants, ainsi que le soutien mutuel dans la vie conjugale.'],
    ['Préparation au mariage', 'Avant de se marier, les couples suivent une préparation : rencontres pastorales, lecture de la Bible, échanges sur le mariage et la famille. Des couples accompagnateurs cheminent avec vous jusqu’à la cérémonie.'],
    ['La vie familiale', 'Le mariage est considéré comme la cellule de base de la société et de l’Église. Les familles sont encouragées à vivre leur foi ensemble.'],
  ]
  return (
    <>
      <PageHero eyebrow="Sacrement de mariage" title="Le mariage" intro="Un engagement sacré entre un homme et une femme devant Dieu. Le mariage est une manifestation visible de la grâce de Dieu." image={img('2025/08/Sans-titre-A4-paysage.png')}>
        <Button to={links.mariage} variant="gold">
          Je demande le mariage
        </Button>
      </PageHero>
      <Section>
        <TwoCols
          main={
            <ol className="space-y-5">
              {points.map(([title, text], i) => (
                <li key={title} className="flex gap-5 rounded-3xl border border-line bg-white p-6">
                  <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          }
          aside={
            <>
              <ActionList title="Demander le mariage à l’Église" items={[{ label: 'Je demande le mariage', hint: 'Formulaire en ligne', to: links.mariage }]} />
              <InfoContact />
            </>
          }
        />
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Communion                                                           */
/* ------------------------------------------------------------------ */

export function Communion() {
  useTitle('Communion')
  return (
    <>
      <PageHero eyebrow="Pour votre bonheur sans fin" title="Le sacrement de communion" image={img('2024/02/communion.png')} intro="La communion crée une relation personnelle au Christ." />
      <Section>
        <TwoCols
          main={
            <div className="prose-paroisse">
              <p>
                La première communion, c’est, comme son nom l’indique, recevoir pour la première fois le corps du Christ sous forme d’hostie
                consacrée par le prêtre. La communion crée une relation personnelle au Christ. Pour communier, deux conditions sont
                nécessaires : <strong>être baptisé</strong> et <strong>vouloir vivre en amitié avec le Christ</strong>, selon son Évangile et
                dans toute sa vie.
              </p>
              <h3>Comment faire ?</h3>
              <p>
                Si vous souhaitez que vous ou votre enfant fasse sa première communion, rapprochez-vous de votre paroisse. Les enfants sont
                préparés à ce sacrement dans le cadre du catéchisme, bien souvent dans leur année de CM1 mais pas uniquement. L’enfant y
                apprend à connaître la vie de Jésus et découvre une première approche de la messe. Ce doit être une démarche personnelle,
                mais ses parents et ses catéchistes peuvent l’y aider.
              </p>
              <p>Pour les adultes, la démarche se fait en lien avec la paroisse et le service diocésain du catéchuménat.</p>
            </div>
          }
          aside={
            <>
              <ActionList
                title="Demander la première des communions"
                items={[
                  { label: 'Préparée avec le KT XXL', to: enoria('98f3a9b44d622e3') },
                  { label: 'Préparée aux Minimes', to: enoria('8eb6466d3ff3e25') },
                  { label: 'Préparée au Lycée Don Bosco', to: enoria('c2a622a37372ee9') },
                  { label: 'Préparée au Sacré-Cœur', to: enoria('13162dbd9581086') },
                ]}
              />
              <InfoContact />
            </>
          }
        />
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Confirmation                                                        */
/* ------------------------------------------------------------------ */

export function Confirmation() {
  useTitle('Confirmation')
  return (
    <>
      <PageHero eyebrow="Recevoir l’Esprit" title="Le sacrement de confirmation" image={img('2024/02/confirmation.png')} intro="Il est nécessaire de recevoir le don de l’Esprit Saint pour une vie meilleure dans le Christ." />
      <Section>
        <TwoCols
          main={
            <div className="prose-paroisse">
              <p>
                Le sacrement de la confirmation nous confère le don de l’Esprit Saint et renforce notre foi, notre relation avec Dieu et
                notre engagement dans l’Église.
              </p>
              <h3>Qu’est-ce que le sacrement de la confirmation ?</h3>
              <p>
                La confirmation est le sacrement consistant à oindre d’huile sainte une personne baptisée afin qu’elle reçoive le don du
                Saint-Esprit. Alors que, par le baptême, le baptisé meurt et ressuscite avec le Christ, le confirmé est empli du Saint-Esprit
                comme l’ont été les Apôtres le jour de la Pentecôte avec Marie.
              </p>
            </div>
          }
          aside={
            <>
              <ActionList
                title="Demander la confirmation"
                items={[
                  { label: 'Préparée aux Minimes', to: enoria('53408a23ea401c7') },
                  { label: 'Préparée au Lycée Don Bosco', to: enoria('cab7b25ad1f0e53') },
                ]}
              />
              <InfoContact />
            </>
          }
        />
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Pénitence et réconciliation                                         */
/* ------------------------------------------------------------------ */

export function Penitence() {
  useTitle('Pénitence et réconciliation')
  return (
    <>
      <PageHero eyebrow="Retrouver votre joie" title="Le sacrement du pardon" image={img('2024/06/photo-confession-1024x768.jpg')} intro="Aussi appelé sacrement de pénitence et de réconciliation, ou sacrement de confession : le signe de l’amour infini de Dieu." />
      <Section>
        <TwoCols
          main={
            <div className="prose-paroisse">
              <p>
                Le pardon de Dieu est toujours possible, si nous faisons une démarche vraiment sincère. En se reconnaissant pécheur, nous
                croyons que l’Amour infini de Dieu est toujours le plus fort. Le dialogue avec un prêtre est le signe efficace de la
                réconciliation avec Dieu et avec nos frères.
              </p>
              <h3>Pourquoi ne pas demander directement pardon à Dieu ?</h3>
              <p>C’est Jésus lui-même qui institue ce sacrement :</p>
              <blockquote>« Ceux à qui vous pardonnerez leurs péchés seront pardonnés ; ceux à qui vous ne les pardonnerez pas ne seront pas pardonnés. » (Jn 20, 19-23)</blockquote>
              <p>
                Se confesser devant un prêtre est une façon de remettre ma vie entre les mains et le cœur d’un autre, qui, à cet instant, agit
                au nom et pour le compte de Jésus. C’est une façon d’être concret et authentique : se mettre face à la réalité en regardant
                une autre personne, et non soi-même reflété dans un miroir.
              </p>
              <h3>Qu’est-ce que le péché ?</h3>
              <p>
                Le péché est une offense faite à Dieu : « Contre toi, toi seul, j’ai péché. Ce qui est mal à tes yeux, je l’ai fait » (Ps 51,
                6). Le péché se dresse contre l’amour de Dieu pour nous, et en détourne nos cœurs. <em>Catéchisme de l’Église catholique (§
                1849, 1850).</em>
              </p>
            </div>
          }
          aside={
            <div className="rounded-3xl bg-ink p-7 text-white">
              <Eyebrow>Quand se confesser ?</Eyebrow>
              <p className="leading-relaxed text-white/80">
                L’Église demande aux chrétiens de se confesser au moins une fois par an, avant Pâques. On peut le faire régulièrement : avant
                chaque grande fête, une fois par mois, à un rythme déterminé avec un accompagnateur, ou simplement quand vous en sentez le
                besoin.
              </p>
              <p className="mt-4 leading-relaxed text-white/80">
                Il vous suffit de <strong className="text-white">prendre rendez-vous avec un prêtre</strong>. Vous pouvez aussi le faire juste
                avant une célébration eucharistique.
              </p>
              <Button to="/contact" variant="gold" className="mt-6">
                Contacter un prêtre
              </Button>
            </div>
          }
        />
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Onction des malades                                                 */
/* ------------------------------------------------------------------ */

export function Onction() {
  useTitle('Onction des malades')
  return (
    <>
      <PageHero eyebrow="Pour votre force physique et intérieure" title="Le sacrement de guérison" image={img('2024/06/photo-vase-repare-1024x683.jpg')} intro="L’onction des malades est le signe de la tendresse et de la miséricorde de Dieu pour les personnes gravement malades." />
      <Section>
        <TwoCols
          main={
            <div className="prose-paroisse">
              <p>
                Par l’onction, le Christ vient vers le malade pour l’apaiser, lui rendre confiance, lui pardonner ses faiblesses et le
                fortifier moralement face à la maladie.
              </p>
              <blockquote>
                « L’un de vous est malade ? Qu’il appelle les Anciens en fonction dans l’Église : ils prieront sur lui après lui avoir fait une
                onction d’huile au nom du Seigneur. Cette prière inspirée par la foi sauvera le malade : le Seigneur le relèvera et, s’il a
                commis des péchés, il recevra le pardon. » (Jc 5, 14-15)
              </blockquote>
              <h3>Les effets de ce sacrement</h3>
              <ul>
                <li>l’union du malade à la passion du Christ, pour son bien et pour celui de toute l’Église ;</li>
                <li>le réconfort, la paix et le courage pour supporter chrétiennement les souffrances de la maladie ou de la vieillesse ;</li>
                <li>le pardon des péchés si le malade n’a pas pu l’obtenir par le sacrement de la pénitence ;</li>
                <li>le rétablissement de la santé, si cela convient au salut spirituel ;</li>
                <li>la préparation au passage à la vie éternelle pour ceux qui sont sur le point de quitter cette vie.</li>
              </ul>
              <h3>Qui peut recevoir et administrer ce sacrement ?</h3>
              <p>Le chrétien peut recevoir le sacrement des malades chaque fois qu’il est atteint d’une grave maladie.</p>
              <p>
                Seuls les prêtres (presbytres et évêques) peuvent donner le sacrement de l’onction des malades ; ils emploient pour cela de
                l’huile bénie par l’évêque ou, au besoin, par le prêtre célébrant lui-même.
              </p>
            </div>
          }
          aside={
            <>
              <div className="rounded-3xl border border-line bg-white p-7">
                <h3 className="text-2xl">Offrir votre disponibilité pour assister les malades</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Régulièrement, des fidèles des trois paroisses apportent la communion aux malades ou aux personnes isolées, chez elles ou
                  dans les EHPAD du quartier. L’équipe a le souci de proposer régulièrement le sacrement des malades (la divine douceur) comme
                  un élan pour la vie.
                </p>
              </div>
              <InfoContact />
            </>
          }
        />
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Ordination                                                          */
/* ------------------------------------------------------------------ */

export function Ordination() {
  useTitle('Ordination')
  const degrees = [
    ['Le diaconat', 'Les diacres sont ordonnés pour servir la communauté et assister les prêtres.'],
    ['Le sacerdoce', 'Les prêtres sont ordonnés pour célébrer les sacrements et enseigner la foi.'],
    ['L’épiscopat', 'Les évêques ont l’autorité dans leur diocèse et peuvent ordonner de nouveaux prêtres et diacres.'],
  ]
  return (
    <>
      <PageHero eyebrow="Sacrement de l’Ordre" title="L’ordination" image={img('2024/01/Ordination.png')} intro="On est appelé par Dieu au sacrement de l’ordre. Aucun homme chrétien ne peut s’arroger cette charge." />
      <Section>
        <div className="prose-paroisse max-w-3xl">
          <p>
            Le sacrement de l’ordre est l’un des sept sacrements de l’Église catholique ; il est également reconnu dans d’autres traditions
            chrétiennes, comme l’Église orthodoxe. Ce sacrement confère à une personne la grâce et l’autorité spirituelle nécessaires pour
            exercer les fonctions du clergé, notamment comme prêtre, diacre ou évêque.
          </p>
        </div>
        <h3 className="mt-12 mb-6 text-2xl">Trois degrés du sacrement</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {degrees.map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-line bg-white p-6">
              <p className="font-display text-2xl">{t}</p>
              <p className="mt-2 text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-8 rounded-[2rem] bg-ink p-8 text-white sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h3 className="text-3xl">Discernement et prière</h3>
            <p className="mt-4 leading-relaxed text-white/80">
              La première étape consiste à discerner si l’appel à devenir diacre ou religieux est authentique et provient de Dieu. Cela
              implique souvent un temps de prière et de réflexion personnelle, ainsi que des échanges avec un directeur spirituel ou un prêtre
              pour aider à discerner cet appel. Si vous êtes intéressé par ce parcours, n’hésitez pas à prendre contact avec la paroisse ou le
              diocèse.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button to="/contact" variant="gold">
              Contacter la paroisse
            </Button>
            <Button to={links.diocese} variant="ghost">
              Diocèse de Lyon
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Funérailles                                                         */
/* ------------------------------------------------------------------ */

export function Funerailles() {
  useTitle('Funérailles')
  return (
    <>
      <PageHero eyebrow="Funérailles" title="« Je suis la résurrection et la vie »" image={img('2025/08/1-1.png')} intro="Pour vous accompagner dans la célébration des funérailles, des équipes sont disponibles à la paroisse." />
      <Section>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-8">
            <span className="grid size-12 place-items-center rounded-full bg-gold-soft font-display text-xl text-gold">1</span>
            <h2 className="mt-5 text-2xl">Contactez d’abord les pompes funèbres</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Merci de prendre d’abord contact avec le service des pompes funèbres, qui fixera avec la paroisse le jour et l’heure de
              l’inhumation.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-8">
            <span className="grid size-12 place-items-center rounded-full bg-gold-soft font-display text-xl text-gold">2</span>
            <h2 className="mt-5 text-2xl">Des équipes vous accompagnent</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Pour vous accompagner dans la célébration des funérailles, des équipes sont disponibles à la paroisse.
            </p>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-white md:col-span-2 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gold-soft uppercase">Espace professionnels</p>
              <p className="mt-2 font-display text-2xl">Demande de funérailles par les pompes funèbres</p>
            </div>
            <Button to={links.funerailles} variant="gold" className="shrink-0">
              Accéder au formulaire
            </Button>
          </div>
          <div className="md:col-span-2">
            <InfoContact />
          </div>
        </div>
      </Section>
    </>
  )
}
