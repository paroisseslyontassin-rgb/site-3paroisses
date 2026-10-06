import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cx } from './ui'

export type GalleryImage = { src: string; alt?: string; href?: string }

/**
 * Grille d'affiches / photos. Un clic ouvre la visionneuse plein écran
 * (flèches du clavier, Échap pour fermer). Si `href` est fourni, l'image
 * renvoie directement vers ce lien (formulaire, PDF…).
 */
export function Gallery({
  images,
  columns = 3,
  aspect = 'aspect-[724/1024]',
}: {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  aspect?: string
}) {
  const [index, setIndex] = useState<number | null>(null)
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]

  return (
    <>
      <ul className={cx('grid grid-cols-1 gap-6', cols)}>
        {images.map((image, i) => {
          const inner = (
            <>
              <img
                src={image.src}
                alt={image.alt ?? ''}
                loading="lazy"
                className={cx('w-full bg-sand object-cover transition-transform duration-500 group-hover:scale-[1.02]', aspect)}
              />
              <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </>
          )
          const cls =
            'group relative block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-ink/5'
          return (
            <li key={image.src + i}>
              {image.href ? (
                <a href={image.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button type="button" onClick={() => setIndex(i)} className={cls} aria-label={`Agrandir ${image.alt ?? 'l’image'}`}>
                  {inner}
                </button>
              )}
            </li>
          )
        })}
      </ul>
      {index !== null && <Lightbox images={images} start={index} onClose={() => setIndex(null)} />}
    </>
  )
}

/** Visionneuse plein écran */
export function Lightbox({ images, start, onClose }: { images: GalleryImage[]; start: number; onClose: () => void }) {
  const [index, setIndex] = useState(start)
  const move = useCallback((delta: number) => setIndex((i) => (i + delta + images.length) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, move])

  const navBtn = 'absolute grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20'
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <img
        src={images[index].src}
        alt={images[index].alt ?? ''}
        className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button type="button" onClick={onClose} className={cx(navBtn, 'top-4 right-4')} aria-label="Fermer">
        <X className="size-6" />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              move(-1)
            }}
            className={cx(navBtn, 'left-3')}
            aria-label="Image précédente"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              move(1)
            }}
            className={cx(navBtn, 'right-3')}
            aria-label="Image suivante"
          >
            <ChevronRight className="size-6" />
          </button>
          <p className="absolute bottom-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  )
}
