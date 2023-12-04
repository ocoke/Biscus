export default defineNuxtPlugin((nuxtApp) => {
  const { githubToken } = useAppConfig().biscus
  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    // `client` can be used to differentiate logic on a per-client basis.
    // apply apollo client token
    token.value = useRuntimeConfig().public.githubToken || githubToken
    console.log(token.value)
  })
})