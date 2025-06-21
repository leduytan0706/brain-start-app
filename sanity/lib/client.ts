import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// for fetching data through queries
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn =  true - cache content for 60s and then revalidate after every 60s - ISR
  // useCdn = false - always get new data from source instead of caching
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
