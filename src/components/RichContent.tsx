import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { imageUrl, type SanityImage } from '../lib/sanity'
import { Lightbox, type GalleryImage } from './Gallery'

type ImageGroup = { _type: 'imageGroup'; _key: string; images: SanityImage[] }

/** Les images qui se suivent sont regroupées en grille d'affiches */
function groupImages(blocks: PortableTextBlock[]) {
  const out: (PortableTextBlock | ImageGroup)[] = []
  for (const block of blocks) {
    const last = out[out.length - 1]
    if (block._type === 'image') {
      if (last?._type === 'imageGroup') (last as ImageGroup).images.push(block as SanityImage)
      else if (last?._type === 'image') out[out.length - 1] = { _type: 'imageGroup', _key: `g-${last._key}`, images: [last as SanityImage, block as SanityImage] }
      else out.push(block)
    } else out.push(block)
  }
  return out
}

const isInternal = (href = '') => href.startsWith('/') && !href.startsWith('//')

/**
 * Affiche le contenu d'un article écrit dans Sanity, avec le style du site.
 * Un clic sur une image l'ouvre en plein écran (sauf si elle a un lien).
 */
export function RichContent({ value }: { value: PortableTextBlock[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const blocks = useMemo(() => groupImages(value ?? []), [value])

  // Toutes les images cliquables, dans l'ordre, pour la visionneuse
  const zoomable = useMemo(() => {
    const list: SanityImage[] = []
    for (const b of blocks) {
      if (b._type === 'image') list.push(b as SanityImage)
      if (b._type === 'imageGroup') list.push(...(b as ImageGroup).images)
    }
    return list.filter((i) => i.asset && !i.lien)
  }, [blocks])
  const lightboxImages: GalleryImage[] = zoomable.map((i) => ({ src: imageUrl(i, 1800), alt: i.alt }))

  const Figure = ({ image }: { image: SanityImage }) => {
    if (!image.asset) return null
    const img = <img src={imageUrl(image, 1200)} alt={image.alt ?? ''} loading="lazy" />
    return (
      <figure>
        {image.lien ? (
          isInternal(image.lien) ? (
            <Link to={image.lien}>{img}</Link>
          ) : (
            <a href={image.lien} target="_blank" rel="noopener noreferrer">
              {img}
            </a>
          )
        ) : (
          <button type="button" className="block w-full" onClick={() => setOpen(zoomable.indexOf(image))} aria-label={`Agrandir ${image.alt ?? 'l’image'}`}>
            {img}
          </button>
        )}
        {image.legende && <figcaption>{image.legende}</figcaption>}
      </figure>
    )
  }

  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => <Figure image={value} />,
      imageGroup: ({ value }) => (
        <div className="wp-poster-grid">
          {(value as ImageGroup).images.map((img) => (
            <Figure key={img._key} image={img} />
          ))}
        </div>
      ),
      bouton: ({ value }) => {
        const { texte, lien } = value as { texte?: string; lien?: string }
        if (!lien) return null
        const cls = 'kb-button not-prose inline-flex items-center gap-2'
        return (
          <div className="kb-buttons-wrap">
            {isInternal(lien) ? (
              <Link to={lien} className={cls}>
                {texte} <ArrowRight className="size-4" />
              </Link>
            ) : (
              <a href={lien} className={cls} target={lien.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {texte} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        )
      },
    },
    marks: {
      link: ({ value, children }) => {
        const href = (value as { href?: string })?.href ?? ''
        return isInternal(href) ? (
          <Link to={href}>{children}</Link>
        ) : (
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            {children}
          </a>
        )
      },
    },
  }

  return (
    <>
      <div className="wp-content prose-paroisse">
        <PortableText value={blocks as PortableTextBlock[]} components={components} />
      </div>
      {open !== null && open >= 0 && <Lightbox images={lightboxImages} start={open} onClose={() => setOpen(null)} />}
    </>
  )
}
