import { serverSupabaseClient } from '#supabase/server'
import { EditableItem } from '~/types'

export default eventHandler(async (event) => {
  const body: EditableItem = await readBody(event)

  console.log('event:', event)
  console.log('headers:', event.headers)

  const client = await serverSupabaseClient(event)

  const { data, error, status } = await client
    .from('items')
    .insert(body)
    .select()

  console.log('data:', data)
  console.log('error:', error)
  console.log('status:', status)

  return data
})
