export const cachedBlogList = cachedFunction(async (repo: string, first: number, category: string) => {
    const token = useRuntimeConfig().githubToken
    const query = `
    query {
        repository(owner: "${repo.split('/')[0]}", name: "${repo.split('/')[1]}") {
          discussions(first: ${first}, categoryId: "${category}") {
            nodes {
              title
              url
              id
              bodyText
              category {
                name
                id
              }
              createdAt
            }
          }
        }
      }
    `
    
    let resp = await $fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            query,
        })
    })

    return resp
  }, {
    maxAge: useAppConfig().biscus.cacheMaxAge || 60 * 60,
    name: 'BlogList',
    getKey: (repo: string, first: number, category: string) => `${repo}-${category}-${first}`
  })
  