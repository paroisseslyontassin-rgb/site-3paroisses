import { frFRLocale } from '@sanity/locale-fr-fr'
import { defineConfig } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'
import { alerte } from './schemas/alerte'
import { article } from './schemas/article'
import { equipe } from './schemas/equipe'
import { horaires } from './schemas/horaires'

/** Documents uniques : on ne peut ni en créer d'autres, ni les supprimer */
const SINGLETONS = ['alerte', 'horaires', 'equipe']

const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenus du site')
    .items([
      S.listItem().title('Alerte importante').id('alerte').icon(() => '📢').child(S.document().schemaType('alerte').documentId('alerte').title('Alerte importante')),
      S.listItem().title('Horaires des messes').id('horaires').icon(() => '🕰️').child(S.document().schemaType('horaires').documentId('horaires').title('Horaires des messes')),
      S.listItem().title('Équipe').id('equipe').icon(() => '👥').child(S.document().schemaType('equipe').documentId('equipe').title('Équipe')),
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
    types: [article, alerte, horaires, equipe],
  },
  document: {
    // Pas de « Créer une alerte / des horaires / une équipe » dans le menu de création
    newDocumentOptions: (options, { creationContext }) =>
      creationContext.type === 'global' ? options.filter(({ templateId }) => !SINGLETONS.includes(templateId)) : options,
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
})
