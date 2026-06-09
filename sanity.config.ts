'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure, singletonTypes} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    // Presentation tool — opens a live preview panel inside Studio.
    // previewUrl points to the Next.js site so editors can see changes
    // instantly on the real page before publishing.
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // Hide singleton types from the global "New document" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => !singletonTypes.has(item.templateId))
      }
      return prev
    },
    // Prevent duplicate singleton documents via the action menu
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },
})
