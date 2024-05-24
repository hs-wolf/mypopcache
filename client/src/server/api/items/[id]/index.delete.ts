import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const client = await serverSupabaseClient(event)

  const { data } = await client
    .from('items')
    .delete()
    .eq('id', id)

  return id
})
