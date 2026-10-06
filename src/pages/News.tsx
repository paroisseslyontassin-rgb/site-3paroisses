import { AlertCircle, ArrowLeft, ArrowRight, CalendarDays, Mail, Newspaper } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NewsletterForm } from '../components/NewsletterForm'
import { Container, PageHero, Section, cx } from '../components/ui'
import { RichContent } from '../components/RichContent'
import { fetchArticle, fetchArticles, formatDate, useAsync, type Article } from '../lib/sanity'
import { useTitle } from '../lib/useTitle'
import NotFound from './NotFound'

const PER_PAGE = 12

export function Actualites() {
  useTitle('Actualités')
  const [pages, setPages] = useState(1)
  return (
    <>
      <PageHero eyebrow="Actualités" title="Toute l’actualité" intro="Annonces, rencontres, méditations et journal paroissial : la vie de nos trois communautés." />
      <Section>
        <div className="space-y-8">
          {Array.from({ length: pages }, (_, i) => (
            <PostsPage key={i} page={i + 1} first={i === 0} onMore={i === pages - 1 ? () => setPages((p) => p + 1) : undefined} />
          ))}
        </div>
      </Section>
    </>
  )
}

/** Une « page » de 12 articles ; le bouton « Voir plus » charge la suivante */
function PostsPage({ page, first, onMore }: { page: number; first: boolean; onMore?: () => void }) {
  const { data, error, loading } = useAsync(() => fetchArticles(page, PER_PAGE), `articles-${page}`)
  if (loading) return <PostsSkeleton count={4} />
  if (error || !data) return <LoadError />
  const [head, ...rest] = first ? data.articles : [undefined, ...data.articles]
  return (
    <>
      {head && <FeaturedPost post={head} />}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((p) => p && <PostCard key={p.id} post={p} />)}
      </div>
      {onMore && page < data.totalPages && (
        <div className="text-center">
          <button type="button" onClick={onMore} className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold hover:border-ink/40">
            Voir plus d’actualités
          </button>
        </div>
      )}
    </>
  )
}

function FeaturedPost({ post }: { post: Article }) {
  return (
    <Link
      to={`/${post.slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm transition-shadow hover:shadow-xl md:grid-cols-[1fr_1.2fr]"
    >
      <Cover post={post} className="aspect-[4/3] md:aspect-auto md:min-h-[24rem]" />
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <Meta post={post} />
        <h2 className="mt-4 text-3xl font-medium sm:text-4xl">{post.title}</h2>
        {post.excerpt && <p className="mt-4 line-clamp-4 text-lg text-ink-soft">{post.excerpt}</p>}
        <span className="mt-8 inline-flex items-center gap-2 font-semibold">
          Lire la suite <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export function PostCard({ post }: { post: Article }) {
  return (
    <Link
      to={`/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <Cover post={post} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-3 text-xl font-medium">{post.title}</h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-soft">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

/** Image de couverture : image mise en avant ou première image de l'article, sinon un motif */
function Cover({ post, className }: { post: Article; className?: string }) {
  return (
    <div className={cx('relative overflow-hidden bg-sand', className)}>
      {post.cover ? (
        <img src={post.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-end bg-ink bg-[radial-gradient(circle_at_top_right,rgba(184,137,59,0.45),transparent_60%)] p-6">
          <Newspaper className="size-10 text-gold-soft/70" />
        </div>
      )}
    </div>
  )
}

function Meta({ post }: { post: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider uppercase">
      {post.category && <span className="rounded-full bg-gold-soft px-3 py-1 text-gold">{post.category}</span>}
      <span className="text-ink-soft">{formatDate(post.date)}</span>
    </p>
  )
}

export function PostsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={cx('grid gap-6 sm:grid-cols-2', count >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')} aria-label="Chargement des actualités">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-line bg-white">
          <div className="aspect-[4/3] bg-sand" />
          <div className="space-y-3 p-6">
            <div className="h-3 w-24 rounded bg-sand" />
            <div className="h-5 w-3/4 rounded bg-sand" />
            <div className="h-3 w-full rounded bg-sand" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function LoadError() {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-line bg-white p-6 text-ink-soft">
      <AlertCircle className="mt-0.5 size-6 shrink-0 text-anne" />
      <p>
        Les actualités n’ont pas pu être chargées. Vérifiez votre connexion et rechargez la page, ou{' '}
        <Link to="/contact" className="font-semibold text-ndpj hover:underline">
          contactez-nous
        </Link>
        .
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Article                                                             */
/* ------------------------------------------------------------------ */

export function PostPage() {
  const { slug = '' } = useParams()
  const { data: post, error, loading } = useAsync(() => fetchArticle(slug), `article-${slug}`)
  useTitle(post?.title)

  if (!loading && !error && !post) return <NotFound />

  return (
    <>
      <header className="border-b border-line bg-white">
        <Container className="py-12 sm:py-16">
          <Link to="/actualites" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4" /> Toute l’actualité
          </Link>
          {post ? (
            <>
              {post.category && <p className="mt-8 text-xs font-semibold tracking-widest text-gold uppercase">{post.category}</p>}
              <h1 className="mt-6 text-4xl font-medium sm:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="mt-6 text-sm text-ink-soft">
                <CalendarDays className="mr-1.5 inline size-4 align-[-3px]" />Publié le {formatDate(post.date)}
              </p>
            </>
          ) : (
            <div className="mt-8 h-12 w-2/3 animate-pulse rounded-xl bg-sand" />
          )}
        </Container>
      </header>
      <Section className="!pt-12">
        {error && <LoadError />}
        {loading && (
          <div className="max-w-3xl animate-pulse space-y-4">
            <div className="h-4 w-full rounded bg-sand" />
            <div className="h-4 w-5/6 rounded bg-sand" />
            <div className="aspect-[3/4] w-full max-w-sm rounded-2xl bg-sand" />
          </div>
        )}
        {post && <RichContent value={post.body} />}
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Infolettres                                                         */
/* ------------------------------------------------------------------ */

export function Infolettres() {
  useTitle('Recevoir les infolettres')
  return (
    <>
      <PageHero eyebrow="Infolettres" title="Recevoir les infolettres" intro="Inscrivez-vous à notre infolettre pour suivre nos actualités." />
      <Section>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-line bg-white p-8 shadow-sm sm:p-10">
          <span className="grid size-14 place-items-center rounded-2xl bg-gold-soft text-gold">
            <Mail className="size-7" />
          </span>
          <h2 className="mt-6 text-3xl font-medium">Restons en lien</h2>
          <p className="mt-2 mb-8 text-ink-soft">Renseignez votre prénom, votre nom et votre adresse e-mail. Vous pourrez vous désinscrire à tout moment.</p>
          <NewsletterForm />
        </div>
      </Section>
    </>
  )
}
