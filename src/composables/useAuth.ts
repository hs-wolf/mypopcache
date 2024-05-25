export default {
  loaded () {
    return useState<boolean>('useAuthLoaded', () => false)
  },
  user () {
    // TODO: Need to find a way to set the supabase User type.
    return useState<any | null>('useAuthUser', () => null)
  }
}
