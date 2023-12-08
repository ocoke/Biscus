export default defineAppConfig({
  biscus: {
    // name of the blog
    name: 'My Project',
    // description of the blog
    description: 'This is my project',
    // a github token without any scope, used to fetch data from github
    githubToken: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
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
          name: 'Search',
          href: '/search'
        }
      ]
    },
  },
  cacheMaxAge: 60 * 60,
})