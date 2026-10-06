import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { redirects } from './data/site'
import { DonBosco, QuiSommesNous } from './pages/About'
import Contact from './pages/Contact'
import Donner from './pages/Donner'
import Home from './pages/Home'
import Horaires from './pages/Horaires'
import { Confidentialite, MentionsLegales } from './pages/Legal'
import { Entraide, Formation, Missions, PastoraleJeunes } from './pages/Missions'
import { Actualites, Infolettres, PostPage } from './pages/News'
import Annonce from './pages/Annonce'
import NotFound from './pages/NotFound'
import { Charismatique, Goutons, Livrets, Musiciens, Priere, Veillheureuses } from './pages/Priere'
import { Bapteme, Communion, Confirmation, Funerailles, Mariage, Onction, Ordination, Penitence, Sacrements } from './pages/Sacrements'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="qui-sommes-nous" element={<QuiSommesNous />} />
        <Route path="don-bosco" element={<DonBosco />} />
        <Route path="horaires" element={<Horaires />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donner" element={<Donner />} />

        <Route path="sacrements" element={<Sacrements />} />
        <Route path="bapteme" element={<Bapteme />} />
        <Route path="mariage" element={<Mariage />} />
        <Route path="communion" element={<Communion />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="penitence-et-reconciliation" element={<Penitence />} />
        <Route path="onction-des-malades" element={<Onction />} />
        <Route path="ordination" element={<Ordination />} />
        <Route path="funerailles" element={<Funerailles />} />

        <Route path="priere" element={<Priere />} />
        <Route path="livrets" element={<Livrets />} />
        <Route path="si-tu-savais-le-don-de-dieu" element={<Charismatique />} />
        <Route path="goutons-la-parole" element={<Goutons />} />
        <Route path="les-veillheureuses" element={<Veillheureuses />} />
        <Route path="musiciens" element={<Musiciens />} />

        <Route path="missions" element={<Missions />} />
        <Route path="formation" element={<Formation />} />
        <Route path="entraide" element={<Entraide />} />
        <Route path="pastorale-des-jeunes" element={<PastoraleJeunes />} />

        <Route path="actualites" element={<Actualites />} />
        <Route path="infolettres" element={<Infolettres />} />
        <Route path="annonce-importante" element={<Annonce />} />
        <Route path="mentions-legales" element={<MentionsLegales />} />
        <Route path="politique-de-confidentialite" element={<Confidentialite />} />

        {/* Anciennes adresses WordPress */}
        {Object.entries(redirects).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        {/* Articles d'actualité : /la-messe-des-parvis, /celebrations, … */}
        <Route path=":slug" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
