export const clientAuthHeader = () => ({
  Authorization: `Bearer ${useSupabaseSession().value?.access_token}`
})

export const apiErrorHandler = (error: any) => {
  const finalError = createError({
    statusCode: error.statusCode || 500,
    statusMessage: error.statusMessage || 'Internal Server Error',
    data: error.data || { message: 'An unexpected error occurred.' }
  })
  // eslint-disable-next-line no-console
  console.log(finalError)
  throw finalError
}
