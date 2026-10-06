import { defineArrayMember, defineField, defineType } from 'sanity'

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const creneau = (avecActivite: boolean) =>
  defineArrayMember({
    type: 'object',
    name: avecActivite ? 'creneauPriere' : 'creneauMesse',
    title: avecActivite ? 'Temps de prière' : 'Messe',
    fields: [
      defineField({ name: 'jour', type: 'string', title: 'Jour', options: { list: JOURS }, validation: (r) => r.required() }),
      defineField({
        name: 'heure',
        type: 'string',
        title: 'Heure',
        description: 'Format 18h00, 9h30…',
        validation: (r) => r.required().regex(/^\d{1,2}h\d{2}$/, { name: 'heure', invert: false }).error('Écrire l’heure comme 18h00 ou 9h30'),
      }),
      ...(avecActivite ? [defineField({ name: 'activite', type: 'string', title: 'Activité', description: 'Adoration, Chapelet, Groupe de prière…' })] : []),
      defineField({ name: 'remarque', type: 'string', title: 'Remarque (facultatif)', description: 'Ex. « 18h30 pendant les vacances scolaires estivales »' }),
    ],
    preview: {
      select: { jour: 'jour', heure: 'heure', activite: 'activite', remarque: 'remarque' },
      prepare: ({ jour, heure, activite, remarque }) => ({ title: `${jour ?? ''} ${heure ?? ''}${activite ? ` – ${activite}` : ''}`, subtitle: remarque }),
    },
  })

const eglise = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({ name: 'messes', type: 'array', title: 'Messes', of: [creneau(false)] }),
      defineField({ name: 'prieres', type: 'array', title: 'Prière (adoration, chapelet…)', of: [creneau(true)] }),
    ],
  })

/** Horaires des trois églises (document unique) */
export const horaires = defineType({
  name: 'horaires',
  title: 'Horaires des messes',
  type: 'document',
  fields: [
    eglise('sainteAnne', 'Sainte-Anne de Ménival'),
    eglise('notreDame', 'Notre-Dame du Point-du-Jour'),
    eglise('saintJoseph', 'Saint-Joseph de la Demi-Lune'),
  ],
  preview: { prepare: () => ({ title: 'Horaires des messes' }) },
})
