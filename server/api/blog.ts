export default eventHandler(async (event) => {
  const { id } = getQuery(event)
  // const token = useRuntimeConfig().githubToken
  if (!id) {
    return {
      code: 400,
      data: {
        node: {},
      },
    }
  }
  
  const resp = await cachedBlogPost(id).catch(() => { data: {}})


  return {
    code: 200,
    ...resp,
  }
})