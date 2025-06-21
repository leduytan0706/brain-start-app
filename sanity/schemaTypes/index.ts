import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './startup'
import { playlist } from './playlist'


// Dinh nghia schema cho noi dung
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist],
}
