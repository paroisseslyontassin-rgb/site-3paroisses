import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Adresse du Studio en ligne : https://paroisses3-lyon5-tassin.sanity.studio
  studioHost: 'paroisses3-lyon5-tassin',
  deployment: { appId: 'xw2yk7jz510mx1n0znxzxvdl' },
})
