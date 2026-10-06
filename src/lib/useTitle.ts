import { useEffect } from 'react'

/** Met à jour le titre de l'onglet du navigateur */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} – 3 Paroisses Lyon 5 – Tassin` : '3 Paroisses Lyon 5 – Tassin'
  }, [title])
}
