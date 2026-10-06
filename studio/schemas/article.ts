import { defineArrayMember, defineField, defineType } from 'sanity'

export const CATEGORIES = ['Annonces', 'Événement', 'Agenda', 'Prière', 'Journal', 'Vie paroissiale', 'Solidarité', 'Jeunes']

/** Contenu riche d'un article : texte, affiches/photos, boutons */
export const contenuRiche = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Paragraphe', value: 'normal' },
    { title: 'Titre', value: 'h2' },
    { title: 'Sous-titre', value: 'h3' },
    { title: 'Citation', value: 'blockquote' },
  ],
  lists: [
    { title: 'Liste à puces', value: 'bullet' },
    { title: 'Liste numérotée', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Gras', value: 'strong' },
      { title: 'Italique', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Lien',
        fields: [
          defineField({
            name: 'href',
            type: 'url',
            title: 'Adresse',
            description: 'Lien vers un autre site (https://…), une page du site (/horaires) ou un e-mail (mailto:…)',
            validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
          }),
        ],
      },
    ],
  },
})

export const imageBlock = defineArrayMember({
  type: 'image',
  title: 'Image / affiche',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', type: 'string', title: 'Description de l’image', description: 'Pour les personnes malvoyantes (ex. « Affiche de la messe des parvis »)' }),
    defineField({ name: 'legende', type: 'string', title: 'Légende (facultatif)' }),
    defineField({ name: 'lien', type: 'url', title: 'Lien au clic (facultatif)', description: 'Ex. un formulaire d’inscription', validation: (r) => r.uri({ allowRelative: true }) }),
  ],
})

export const boutonBlock = defineArrayMember({
  type: 'object',
  name: 'bouton',
  title: 'Bouton',
  fields: [
    defineField({ name: 'texte', type: 'string', title: 'Texte du bouton', validation: (r) => r.required() }),
    defineField({
      name: 'lien',
      type: 'url',
      title: 'Lien',
      validation: (r) => r.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
    }),
  ],
  preview: { select: { title: 'texte', subtitle: 'lien' }, prepare: ({ title, subtitle }) => ({ title: `Bouton : ${title ?? ''}`, subtitle }) },
})

export const article = defineType({
  name: 'article',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({ name: 'titre', type: 'string', title: 'Titre', validation: (r) => r.required().max(120) }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Adresse de la page',
      description: 'Cliquez sur « Générer » : elle est créée à partir du titre.',
      options: { source: 'titre', maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'datePublication',
      type: 'datetime',
      title: 'Date de publication',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categorie',
      type: 'string',
      title: 'Catégorie',
      options: { list: CATEGORIES, layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image de couverture',
      description: 'Facultatif : sinon c’est la première image du contenu qui sert de vignette.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resume',
      type: 'text',
      rows: 3,
      title: 'Résumé',
      description: 'Une ou deux phrases affichées dans la liste des actualités (facultatif).',
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'contenu',
      type: 'array',
      title: 'Contenu',
      of: [contenuRiche, imageBlock, boutonBlock],
    }),
  ],
  orderings: [{ title: 'Plus récentes', name: 'dateDesc', by: [{ field: 'datePublication', direction: 'desc' }] }],
  preview: {
    select: { title: 'titre', date: 'datePublication', media: 'image', categorie: 'categorie' },
    prepare: ({ title, date, media, categorie }) => ({
      title,
      subtitle: [categorie, date && new Date(date).toLocaleDateString('fr-FR')].filter(Boolean).join(' · '),
      media,
    }),
  },
})
