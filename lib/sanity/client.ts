import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2026-06-24',
  useCdn: true,
})
