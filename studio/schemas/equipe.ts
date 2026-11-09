import { defineArrayMember, defineField, defineType } from 'sanity'

const personne = (avecRole: boolean) =>
  defineArrayMember({
    type: 'object',
    name: avecRole ? 'pretre' : 'diacre',
    title: avecRole ? 'Prêtre ou frère' : 'Diacre',
    fields: [
      defineField({ name: 'prenom', type: 'string', title: 'Prénom', validation: (r) => r.required() }),
      defineField({ name: 'nom', type: 'string', title: 'Nom', validation: (r) => r.required() }),
      ...(avecRole
        ? [defineField({ name: 'role', type: 'string', title: 'Rôle', description: 'Ex. « Prêtre, curé de l’ensemble paroissial »', validation: (r) => r.required() })]
        : []),
      defineField({
        name: 'email',
        type: 'string',
        title: 'E-mail (facultatif)',
        description: 'Si rempli, un lien « Écrire » apparaît sur le site.',
        validation: (r) => r.email().error('Adresse e-mail invalide'),
      }),
    ],
    preview: {
      select: { prenom: 'prenom', nom: 'nom', role: 'role', email: 'email' },
      prepare: ({ prenom, nom, role, email }) => ({ title: `${prenom ?? ''} ${nom ?? ''}`.trim(), subtitle: [role, email].filter(Boolean).join(' · ') }),
    },
  })

/** Équipe actuelle : pré-remplit le formulaire la première fois qu'on l'ouvre */
const pretres = [
  { prenom: 'Vincent', nom: 'Grodziski', role: "Prêtre, curé de l'ensemble paroissial", email: 'v.grodziski@lyon.catholique.fr' },
  { prenom: 'Christian', nom: 'Tshala Wika', role: "Prêtre, vicaire de l'ensemble paroissial", email: 'tshibikufa2@gmail.com' },
  { prenom: 'Joa', nom: 'Shamukeke', role: "Prêtre assistant de l'ensemble paroissial" },
  { prenom: 'Benjamin', nom: 'Dewitte', role: 'Frère salésien de Don Bosco', email: 'b.dewitte@lyon.catholique.fr' },
  { prenom: 'Francis', nom: 'Gallot', role: 'Frère salésien de Don Bosco' },
]
const diacres = [
  { prenom: 'Arnaud', nom: 'Gazagnes', email: 'arnaud.gazagnes@orange.fr' },
  { prenom: 'Jean-Baptiste', nom: 'Hibon', email: 'diacre@hibon.net' },
  { prenom: 'Yves', nom: 'Rémond', email: 'yves-remond@wanadoo.fr' },
  { prenom: 'Gérard', nom: 'Bourtoul' },
]

/** Prêtres, frères et diacres (document unique) */
export const equipe = defineType({
  name: 'equipe',
  title: 'Équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'pretres',
      type: 'array',
      title: 'Prêtres et frères',
      description: 'Glisser-déposer pour changer l’ordre d’affichage sur le site.',
      of: [personne(true)],
    }),
    defineField({
      name: 'diacres',
      type: 'array',
      title: 'Diacres',
      description: 'Glisser-déposer pour changer l’ordre d’affichage sur le site.',
      of: [personne(false)],
    }),
  ],
  initialValue: {
    pretres: pretres.map((p, i) => ({ _key: `pretre${i}`, _type: 'pretre', ...p })),
    diacres: diacres.map((d, i) => ({ _key: `diacre${i}`, _type: 'diacre', ...d })),
  },
  preview: { prepare: () => ({ title: 'Équipe' }) },
})
