import { frFRLocale } from '@sanity/locale-fr-fr'
import { defineConfig } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'
import { alerte } from './schemas/alerte'
import { article } from './schemas/article'
import { horaires } from './schemas/horaires'

/** Documents uniques : on ne peut ni en créer d'autres, ni les supprimer */
const SINGLETONS = ['alerte', 'horaires']

const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenus du site')
    .items([
      S.listItem().title('Alerte importante').id('alerte').icon(() => '📢').child(S.document().schemaType('alerte').documentId('alerte').title('Alerte importante')),
      S.listItem().title('Horaires des messes').id('horaires').icon(() => '🕰️').child(S.document().schemaType('horaires').documentId('horaires').title('Horaires des messes')),
      S.divider(),
      S.documentTypeListItem('article').title('Actualités').icon(() => '📰'),
    ])

export default defineConfig({
  name: 'default',
  title: '3 Paroisses – Administration',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure }), frFRLocale()],
  schema: {
    types: [article, alerte, horaires],
    // Pas de « Créer une alerte / des horaires » dans le menu de création
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
})
