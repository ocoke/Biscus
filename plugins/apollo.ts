export default defineNuxtPlugin((nuxtApp) => {
  const { githubToken } = useAppConfig().biscus
  nuxtApp.hook('apollo:auth', ({ , token }) => {
    // `client` can be used to differentiate logic on a per-client basis.
  
    // apply apollo client token
    token.value = githubToken
  })
})