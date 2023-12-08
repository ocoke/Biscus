export default eventHandler(async (event) => {
    const { keyword, first, repo } = getQuery(event)
    if (!repo) {
      return {
        code: 400,
        data: {
          node: {},
        },
      }
    }
    const resp = await cachedBlogSearch(keyword, Number(first), repo).catch(() => { data: {}})
  
    return {
      code: 200,
      ...resp,
    }
  })