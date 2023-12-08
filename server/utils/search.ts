export const cachedBlogSearch = cachedFunction(async (keyword: string, first: number, repo: string) => {
    const token = useRuntimeConfig().githubToken
    const query = `
    query {
        search(query: "repo:${repo} ${keyword}", type: DISCUSSION, first: ${first}) {
            edges {
                node {
                    ... on Discussion {
                        id
                        title
                        resourcePath
                        bodyText
                    }
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
    name: 'BlogPost',
    getKey: (keyword: string, first: number, repo: string) => `${keyword}-${repo}-${first}`
  })
  