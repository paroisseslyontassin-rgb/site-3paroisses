import { Button, Container } from '../components/ui'
import { useTitle } from '../lib/useTitle'

export default function NotFound() {
  useTitle('Page introuvable')
  return (
    <Container className="py-28 text-center sm:py-40">
      <p className="font-display text-8xl text-gold">404</p>
      <h1 className="mt-6 text-4xl font-medium">Cette page est introuvable</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">Elle a peut-être été déplacée lors de la refonte du site. Revenez à l’accueil ou consultez les horaires.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button to="/">Retour à l’accueil</Button>
        <Button to="/horaires" variant="outline">
          Horaires des messes
        </Button>
      </div>
    </Container>
  )
}
