/**
 * Chemin d'une image du dossier public/media.
 * Les images d'origine ont été converties en .webp : on peut donc écrire
 * le nom d'origine (ex. "2024/06/Bapteme.png"), l'extension est remplacée.
 */
export function img(path: string) {
  return `/media/${path.replace(/\.(png|jpe?g|gif)$/i, '.webp')}`
}

/** Chemin d'un document PDF du dossier public/media. */
export function doc(path: string) {
  return `/media/${path}`
}
