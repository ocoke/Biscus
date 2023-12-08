export default eventHandler(async (event) => {
	const { repo, first, category } = getQuery(event)
  // const token = useRuntimeConfig().githubToken
  if (!repo || !first || !category) {
    return {
      code: 400,
      data: {
        repository: {},
      },
    }
  }
  const resp = await cachedBlogList(repo, Number(first), category).catch(() => { data: {}})
  return {
    code: 200,
    ...resp,
  }
})