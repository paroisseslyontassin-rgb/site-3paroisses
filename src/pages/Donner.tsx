import { ArrowUpRight, Banknote, Church, Coins, FileText, HandCoins, Mail } from 'lucide-react'
import { Gallery } from '../components/Gallery'
import { Button, Container, Eyebrow, PageHero, Section, SectionTitle } from '../components/ui'
import { links } from '../data/site'
import { doc, img } from '../lib/media'
import { useTitle } from '../lib/useTitle'

const ways = [
  { icon: Coins, title: 'La quête dominicale', text: 'L’offrande naturelle de chaque dimanche, ou la quête prélevée.', href: '#quete' },
  { icon: Church, title: 'L’offrande de messe', text: 'Confier une intention de prière lors d’une messe.', href: '#offrande' },
  { icon: Banknote, title: 'La souscription annuelle', text: 'Pour les travaux : éclairage, sonorisation, chauffage…', href: '#souscription' },
  { icon: HandCoins, title: 'Le denier de l’Église', text: 'La participation de chaque chrétien à la vie du diocèse.', href: '#denier' },
]

export default function Donner() {
  useTitle('Donner')
  return (
    <>
      <PageHero
        eyebrow="Faire un don"
        title="Donner, une nécessité pour l’Église et un devoir pour nous !"
        intro="Une des responsabilités de tout chrétien est de donner à l’Église les moyens de continuer sa mission. Aujourd’hui nos trois communautés prennent au sérieux cette responsabilité : cela nous permet d’envisager des travaux bien nécessaires pour garantir la survie des bâtiments qui nous ont été confiés. Merci de nous rejoindre !"
        image={img('2024/06/photo-plante-pousse-scaled.jpg')}
      >
        <Button to={links.donnons} variant="gold">
          Don sécurisé en ligne
        </Button>
      </PageHero>

      <section className="border-b border-line bg-white">
        <Container className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {ways.map(({ icon: Icon, title, text, href }) => (
            <a key={title} href={href} className="group bg-white p-7 transition-colors hover:bg-cream">
              <Icon className="size-7 text-gold" />
              <p className="mt-4 font-display text-xl">{title}</p>
              <p className="mt-2 text-sm text-ink-soft">{text}</p>
            </a>
          ))}
        </Container>
      </section>

      <Section id="quete" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-paroisse">
            <Eyebrow>Chaque dimanche</Eyebrow>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">L’offrande naturelle de la quête dominicale</h2>
            <p>
              Une analyse de nos comptes montre que <strong>7 € par fidèle, chaque semaine</strong>, sont nécessaires pour couvrir les
              charges courantes. Vous pouvez déposer votre offrande dans les paniers mis à disposition lors des célébrations.
            </p>
            <p>
              En choisissant la <strong>quête prélevée</strong>, vous décidez du montant prélevé sur votre compte chaque mois et vous
              recevez une attestation fiscale déductible de votre impôt. Vous recevez des jetons pour symboliser votre offrande lors de la
              quête.
            </p>
            <p>
              Votre don ira, selon votre choix, à la paroisse Notre-Dame du Point-du-Jour, Sainte-Anne de Ménival ou Saint-Joseph de la
              Demi-Lune.
            </p>
            <div className="pt-2">
              <Button to={links.quetePrelevee}>Je donne à la quête prélevée</Button>
            </div>
          </div>
          <Gallery
            columns={2}
            aspect="aspect-[3/4]"
            images={[
              { src: img('2024/12/interieur_quete-prelevee-1024x724.jpg'), alt: 'Dépliant quête prélevée (intérieur)' },
              { src: img('2024/12/interieur_verso-1-724x1024.jpg'), alt: 'Dépliant quête prélevée (verso)' },
            ]}
          />
        </div>
      </Section>

      <Section id="offrande" className="scroll-mt-20 bg-white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          <a href={links.intentionMesse} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-3xl shadow-xl">
            <img src={img('2024/11/ADALO_affiche-intentions-de-messe-723x1024.png')} alt="Affiche : demande d’intention de messe" className="w-full" loading="lazy" />
          </a>
          <div className="prose-paroisse">
            <Eyebrow>Prier pour un proche</Eyebrow>
            <h2 className="text-3xl font-medium text-ink sm:text-4xl">L’offrande de messe</h2>
            <p>
              Faites votre demande d’intention de messe grâce au formulaire en ligne, au moins 15 jours avant durant les périodes scolaires.
              Durant les vacances scolaires, tous souhaits d’intentions ou informations à rajouter sont à demander directement au célébrant.
            </p>
            <p>
              Vous pouvez déposer votre chèque d’offrande dans la boîte aux lettres de la paroisse : Notre-Dame du Point-du-Jour (20 rue des
              Aqueducs, Lyon 5), Saint-Joseph de la Demi-Lune (2 bis avenue de la République, Tassin) ou Sainte-Anne de Ménival (43 avenue de
              Ménival, Lyon 5).
            </p>
            <div className="pt-2">
              <Button to={links.intentionMesse} variant="gold">
                Demander une intention de messe
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="souscription" className="scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-line bg-white p-8 sm:p-10">
            <Eyebrow>Pour nos bâtiments</Eyebrow>
            <h2 className="text-3xl font-medium">La souscription annuelle</h2>
            <div className="prose-paroisse mt-6">
              <p>
                Cette souscription sert à financer les travaux nécessaires au bon fonctionnement de notre mission (éclairage, sonorisation,
                chauffage, bureautique…). L’expérience montre que nos besoins tournent autour de <strong>50 000 € par an</strong>, soit{' '}
                <strong>80 € par fidèle</strong>.
              </p>
              <p>
                Merci de déposer un chèque dans l’une des boîtes aux lettres de nos églises ou de l’envoyer par la poste, en inscrivant au
                dos : « SOUSCRIPTION » et le nom de la paroisse à qui vous destinez votre don.
              </p>
              <p>
                Chèque à l’ordre de : <strong>Association Diocésaine de Lyon</strong>. Les dons pourront bénéficier du reçu fiscal.
              </p>
              <p>Avec nos chaleureux remerciements pour votre participation.</p>
            </div>
          </div>
          <div id="denier" className="scroll-mt-28 rounded-[2rem] bg-ink p-8 text-white sm:p-10">
            <Eyebrow>Pour le diocèse</Eyebrow>
            <h2 className="text-3xl font-medium">Le denier de l’Église</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/80">
              <p>
                Le denier n’est pas un don mais la participation des chrétiens à la vie de l’Église diocésaine. Il permet au diocèse de
                rémunérer chaque mois les prêtres en activité, de verser les compléments de retraite des prêtres âgés et de financer les
                études des séminaristes ou la formation des diacres. Il assure également un salaire aux laïcs embauchés par le diocèse
                (animation pastorale, accueil, gestion, administration…).
              </p>
              <p>Le denier est mutualisé au niveau du diocèse : vos versements ne vont pas directement à la paroisse. Ils ouvrent droit à une attestation fiscale.</p>
              <p className="flex items-start gap-2 text-sm">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                Par chèque : Association Diocésaine de Lyon / Service donateurs, 6 avenue Adolphe Max, 69321 Lyon cedex 05
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={links.denier} variant="gold">
                Donner au denier
              </Button>
            </div>
            <a href={links.denier} target="_blank" rel="noopener noreferrer" className="mt-8 block overflow-hidden rounded-2xl">
              <img src={img('2025/10/banniere-denier-2025-1024x310.jpg')} alt="Bannière du denier de l’Église" className="w-full" loading="lazy" />
            </a>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionTitle eyebrow="Aller plus loin" title="Un engagement plus fort" />
        <div className="grid gap-6 md:grid-cols-2">
          <a href={links.credofunding} target="_blank" rel="noopener noreferrer" className="group rounded-3xl border border-line bg-cream p-8 transition-colors hover:border-gold">
            <p className="flex items-center justify-between font-display text-2xl">
              CredoFunding <ArrowUpRight className="size-5 text-gold" />
            </p>
            <p className="mt-3 text-ink-soft">
              Pour un don plus conséquent, selon l’intérêt que vous portez au développement de nos trois paroisses, vous pouvez choisir un
              versement via CredoFunding (application mise en œuvre par le diocèse). Choisir la paroisse « Lyon 05 – Paroisse Ens. ND PDJ
              Ste Anne St Joseph ».
            </p>
          </a>
          <a href={doc('2024/11/LIVRET-CONSEIL-PAROISSIAL-POUR-LES-AFFAIRES-ECONOMIQUES.pdf')} target="_blank" rel="noopener noreferrer" className="group rounded-3xl border border-line bg-cream p-8 transition-colors hover:border-gold">
            <p className="flex items-center justify-between font-display text-2xl">
              Conseil paroissial des affaires économiques <FileText className="size-5 shrink-0 text-gold" />
            </p>
            <p className="mt-3 text-ink-soft">Découvrez le livret de présentation du conseil paroissial pour les affaires économiques (PDF).</p>
          </a>
        </div>
        <div className="mt-10 max-w-sm">
          <Gallery images={[{ src: img('2024/12/Ressources-Lyon2018-724x1024.jpg'), alt: 'Les ressources de l’Église à Lyon' }]} columns={2} />
        </div>
      </Section>
    </>
  )
}
