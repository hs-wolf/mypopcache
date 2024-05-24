import { serverSupabaseClient } from '#supabase/server'
import { EditableItem } from '~/types'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const body: EditableItem = await readBody(event)

  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('items')
    .update(body)
    .eq('id', id)
    .select()

  return data
})
