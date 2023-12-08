# Biscus

> 🗒️ Biscus is a Nuxt theme, that can use GitHub Discussions as your blog.

## Features

- Clean design and good layout for every size of screen.
- Use GitHub Discussions to store the posts of your blog. No need for a backend.
- Enable [Giscus](https://github.com/giscus/giscus) by default, get connect with your reader.
- Good layout and design for showing contents and content.
- Support searching from GitHub Discussions.
- Support Light / Dark Theme.


## Getting Started

We provide a template that you can quickly start using Biscus.

Before you start, you'll need a GitHub Token without any scopes. Because GitHub GraphQL API requires a token to send requests.

1. Click [New personal access token (classic)](https://github.com/settings/tokens/new).
2. Set Expiration to `no expiration` or other times you want.
3. Make sure that you don't select any scopes. Then, this token only has public access.
4. Click `Generate`, and copy the token down.

![image](https://github.com/ocoke/Biscus/assets/71591824/e666fe6c-df54-4251-ac47-77b8ef70b66a)


### Starting from the template

1. You'll need to fork or [use the template to create a new repository](https://github.com/new?template_name=Biscus&template_owner=ocoke). **Remember to select `Include all branches`.**
2. After creating the new repository, you can change to the `template` branch or make it default.
![image](https://github.com/ocoke/biscus-preview/assets/71591824/c530eeba-4816-4abd-95b0-2d6408dfcc9e)
3. Then, you can edit the `app.config.ts` in the main directory.

```ts
export default defineAppConfig({
  biscus: {
    // name of the blog
    name: 'My Project',
    // description of the blog
    description: 'This is my project',
    // the id of the discussions category
    categoryId: 'DIC_kwDOKWmCx84CZh1q',
    // repository of the blog
    repository: 'ocoke/Biscus',
    // the id of the repository
    repositoryId: 'R_kgDOKWmCxw=',
    // the banner of the blog
    banner: {
      title: 'This is Biscus!',
      subtitle: 'hi, this is biscus'
    },
    // the navigation bar of the blog
    nav: {
      title: 'My Project',
      home: '/',
      links: [
        {
          name: 'Home',
          href: '/'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    },
  }
})    
```

4. Set Environment Variable `NUXT_GITHUB_TOKEN` to a GitHub Token without any scopes:

```env
NUXT_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```



### Starting from an existing project

Biscus is a Nuxt theme, you can add it to your existing project.

> [!WARNING]
> There may be conflicts with your existing project or dependencies.


1. Install Biscus via Yarn / NPM or other package managers.

```bash
yarn add biscus
```

2. Edit `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['biscus'],
})
```

3. Edit `app.config.ts`:

```ts
export default defineAppConfig({
  biscus: {
    // name of the blog
    name: 'My Project',
    // description of the blog
    description: 'This is my project',
    // the id of the discussions category
    categoryId: 'DIC_kwDOKWmCx84CZh1q',
    // repository of the blog
    repository: 'ocoke/Biscus',
    // the id of the repository
    repositoryId: 'R_kgDOKWmCxw=',
    // the banner of the blog
    banner: {
      title: 'This is Biscus!',
      subtitle: 'hi, this is biscus'
    },
    // the navigation bar of the blog
    nav: {
      title: 'My Project',
      home: '/',
      links: [
        {
          name: 'Home',
          href: '/'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    },
  }
})    
```

4. Set Environment Variable `NUXT_GITHUB_TOKEN` to a GitHub Token without any scopes:

```env
NUXT_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```