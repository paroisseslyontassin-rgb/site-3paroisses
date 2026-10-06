import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { AlertBar } from './Alert'
import { Header } from './Header'

export function Layout() {
  const { pathname, hash } = useLocation()

  // Remonte en haut de page à chaque changement de page (sauf ancre)
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Aller au contenu
      </a>
      <AlertBar />
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
