import { eventHandler } from 'h3'
import type { CollectionInfo } from '@nuxt/content'
import { collectionsInfo, loadDatabaseDump } from '../../utils/internal/app.server'

export default eventHandler(async () => {
  const dump: string = await loadDatabaseDump()
  const collections = collectionsInfo

  return {
    collections: Object.fromEntries(
      Object.entries(collections)
        .map(([name, meta]) => [name, { jsonFields: (meta as CollectionInfo).jsonFields }]),
    ),
    dump,
  }
})