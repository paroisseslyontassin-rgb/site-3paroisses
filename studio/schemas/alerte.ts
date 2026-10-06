import { defineField, defineType } from 'sanity'
import { boutonBlock, contenuRiche, imageBlock } from './article'

/** Alerte importante : bandeau rouge en haut du site (document unique) */
export const alerte = defineType({
  name: 'alerte',
  title: 'Alerte importante',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Afficher l’alerte sur le site',
      description: 'Décochez puis « Publier » pour retirer le bandeau.',
      initialValue: false,
    }),
    defineField({
      name: 'message',
      type: 'string',
      title: 'Message du bandeau',
      description: 'Court et clair. Ex. « Dimanche 11 octobre : une seule messe à 11h à Notre-Dame du Point-du-Jour »',
      validation: (r) =>
        r.max(180).custom((value, ctx) => ((ctx.document as { active?: boolean })?.active && !value ? 'Le message est obligatoire quand l’alerte est affichée.' : true)),
    }),
    defineField({
      name: 'dateFin',
      type: 'date',
      title: 'Afficher jusqu’au (inclus)',
      description: 'Facultatif : l’alerte disparaît toute seule après ce jour.',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Détails (facultatif)',
      description: 'Si vous écrivez des détails, un lien « En savoir plus » apparaît dans le bandeau.',
      of: [contenuRiche, imageBlock, boutonBlock],
    }),
  ],
  preview: {
    select: { active: 'active', message: 'message' },
    prepare: ({ active, message }) => ({ title: message || 'Alerte importante', subtitle: active ? '🔴 Affichée sur le site' : 'Masquée' }),
  },
})
