import { PageHero, Section } from '../components/ui'
import { site } from '../data/site'
import { useTitle } from '../lib/useTitle'

const publisher = 'Ensemble paroissial « 3 paroisses Lyon 5 – Tassin-la-Demi-Lune »'

export function MentionsLegales() {
  useTitle('Mentions légales')
  return (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <Section>
        <div className="prose-paroisse max-w-3xl">
          <h3 className="!mt-0">Responsable éditorial</h3>
          <p>
            {publisher}
            <br />
            {site.address}
            <br />
            Téléphone : {site.phone}
            <br />
            E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <h3>Hébergement</h3>
          <p>one.com – 59100 Roubaix</p>
          <h3>Droits d’auteur</h3>
          <p>
            Ce site est protégé par la loi du 1er juillet 1998 sur la protection juridique des bases de données. Sont interdites toutes
            extractions et réutilisations de la totalité ou d’une partie substantielle, sur le plan qualitatif ou quantitatif, du contenu du
            site. Les éléments relatifs à la forme du site ainsi que les textes et œuvres présentés sont protégés par le régime du droit
            d’auteur. La reproduction et l’utilisation de ces textes et œuvres, autres qu’à une fin de consultation de nature privée, sont
            interdites. Toute demande d’autorisation doit être adressée à : <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <h3>Conception, réalisation</h3>
          <ul>
            <li>Site antérieur : Thibault Jaillard et Laurent Joyet</li>
            <li>Ancien site : Nicolas Peronon</li>
            <li>Site actuel : Joa</li>
            <li>Newsletter et édito de la newsletter : Jean-Baptiste Hibon</li>
            <li>Informations, administration du site : Alexandra Albert</li>
          </ul>
          <p>
            Merci à eux et à toutes les équipes ! Nous remercions toutes les personnes qui nous ont fourni des supports visuels pour alimenter
            ce site pour le besoin de l’évangélisation.
          </p>
          <h3>Respect de la vie privée</h3>
          <p>
            La navigation sur ce site est susceptible d’installer des cookies sur l’ordinateur de l’utilisateur. Un cookie ne permet pas
            d’identifier l’utilisateur ; il enregistre des informations sur la navigation d’un ordinateur. Cela facilite la navigation et permet
            de mesurer la fréquentation. Le refus d’installation peut rendre l’accès à certains services impossible.
          </p>
          <p>
            Les e-mailings effectués par le service de la communication peuvent faire l’objet d’un suivi d’ouverture et de clic permettant une
            désinscription des adresses réputées inactives. Le service de la communication n’effectue ni prêt, ni vente, ni échange des
            adresses électroniques inscrites aux newsletters.
          </p>
          <h3>Données à caractère personnel</h3>
          <p>
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée le 20 juin 2018 et au Règlement (UE) 2016/679 du 27
            avril 2016, vous bénéficiez d’un droit d’accès, de rectification de vos données, d’opposition et de limitation à un traitement,
            d’un droit à l’oubli et à la portabilité des informations qui vous concernent. Vous pouvez exercer vos droits en écrivant à :{' '}
            {publisher}, {site.address}, ou par e-mail à <a href={`mailto:${site.email}`}>{site.email}</a>. Merci de joindre une photocopie de
            votre pièce d’identité en cours de validité.
          </p>
        </div>
      </Section>
    </>
  )
}

export function Confidentialite() {
  useTitle('Politique de confidentialité')
  return (
    <>
      <PageHero eyebrow="Informations" title="Politique de confidentialité" />
      <Section>
        <div className="prose-paroisse max-w-3xl">
          <h3 className="!mt-0">Conditions d’utilisation du site</h3>
          <p>L’utilisation de ce site web est soumise à certaines obligations légales.</p>
          <p>
            Ce site web, y compris et sans être limitatif, toute information, déclaration et tout logo ou dessin, ou les produits et services
            qu’il contient, sont présentés sans aucune garantie, expresse ou implicite, y compris la garantie que tous les produits ou services
            sont disponibles, sont de qualité marchande, sont appropriés à un usage particulier, peuvent être utilisés sans contrefaire les
            droits d’un tiers ou que l’information fournie est complète, exacte ou actualisée. L’{publisher.charAt(0).toLowerCase() + publisher.slice(1)} peut, à
            sa discrétion, revoir le site web et effectuer des changements ou suppressions à tout moment sans communication préalable.
          </p>
          <p>
            Dans la limite des lois, l’ensemble paroissial décline toute responsabilité pour des dommages résultant directement ou
            indirectement de l’utilisation du site web, y compris et sans être limitatif, dommages directs, indirects et tout dommage causé
            par les expectatives qui auraient pu être générées par le site.
          </p>
          <p>
            Plusieurs éléments (y compris et sans être limitatif marques, dessins, logos ou matériel protégé par des droits d’auteur) montrés
            sur ce site web sont protégés par la propriété intellectuelle. Ce site web est réservé à un usage personnel et non commercial et il
            est interdit de copier, modifier ou diffuser sous quelque forme que ce soit le contenu de ce site web à un tiers sans l’accord
            écrit, préalable et exprès de l’ensemble paroissial.
          </p>
        </div>
      </Section>
    </>
  )
}
