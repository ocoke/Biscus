export const cachedBlogPost = cachedFunction(async (id: string) => {
    const token = useRuntimeConfig().githubToken
    const query = `
        query {
            node(id: "${id}") {
                ... on Discussion {
                    title
                    bodyText
                    bodyHTML
                    id
                    category {
                        name
                        id
                    }
                    createdAt
                    lastEditedAt
                    resourcePath
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
    getKey: (id: string) => id
  })
  