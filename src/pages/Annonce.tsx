import { Megaphone } from 'lucide-react'
import { Button, Container, Section } from '../components/ui'
import { RichContent } from '../components/RichContent'
import { useAlert } from '../lib/alert'
import { formatDate } from '../lib/sanity'
import { useTitle } from '../lib/useTitle'

/** Détails de l'alerte importante (page /annonce-importante) */
export default function Annonce() {
  const alert = useAlert()
  useTitle('Annonce importante')
  return (
    <>
      <header className="bg-anne text-white">
        <Container className="py-14 sm:py-20">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
            <Megaphone className="size-4" /> Annonce importante
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-medium sm:text-5xl">{alert ? alert.message : 'Aucune annonce en cours'}</h1>
          {alert?.end && <p className="mt-4 text-white/80">Jusqu’au {formatDate(alert.end.toISOString())}</p>}
        </Container>
      </header>
      <Section className="!pt-12">
        {alert?.hasDetails && <RichContent value={alert.details} />}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/horaires">Voir les horaires habituels</Button>
          <Button to="/" variant="outline">
            Retour à l’accueil
          </Button>
        </div>
      </Section>
    </>
  )
}
