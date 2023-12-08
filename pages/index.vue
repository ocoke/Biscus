<template>
  <Title>{{ name }}</Title>
  <Meta
    name="description"
    :content="description"
  />
  <div class="fst-screen">
    <div class="container lg:pl-8">
      <h1 class="text-5xl font-bold">
        {{ banner.title }}
      </h1>
      <blockquote class="text-xl mt-3">
        {{ banner.subtitle }}
      </blockquote>
    </div>
  </div>
  <div class="second container m-auto flexs">
    <h2 class="sc-title">
      📝 Recent Blogs
    </h2>
    <div
      v-if="pending"
      class="page-card-radius animate-pulse"
      v-for="i in 6"
    >
    <div class="link-text z-20">
      <div class="text-2xl font-bold bg-slate-200 dark:bg-slate-700 h-5 rounded" style="width: 70%;"></div>

      <div class="my-2 bg-slate-200 dark:bg-slate-700 h-9 rounded"></div>
      <div class="my-2 bg-slate-200 dark:bg-slate-700 h-3 rounded"></div>
      </div>
    </div>
    <div
      v-for="item in data.repository.discussions.nodes"
      v-if="data && data.repository"
      v-show="!pending"
      class="page-card-radius"
    >
      <div class="link-text z-20">
        <NuxtLink :to="('/blog/' + item.id)">
          <h3 class="text-2xl font-bold">
            {{ item.title }}
          </h3>
        </NuxtLink>
        <p class="my-2">
          {{ desc(item.bodyText) }}
        </p>
        <p class="my-2">
          Published in <NuxtLink :to="('/search?q=category:' + item.category.name)">
            <code>{{ item.category.name }}</code>
          </NuxtLink> on
          <code>{{ dateFormat(item.createdAt) }}</code>.
        </p>
      </div>
    </div>
    <div v-else>
      <div class="page-card-radius">
        We're sorry but we can't fetch the data.
      </div>
    </div>
  </div>
</template>
<script setup>
const { banner, categoryId, name, description, repository } = useAppConfig().biscus
// const headers = useRequestHeaders(['cookie'])
const { pending, data: resp, } = await useFetch(`/api/list`, {
  lazy: true,
  query: {
    category: categoryId,
    repo: repository,
    first: 6,
  },
})
let data = ref();
if (resp.value) {
  data.value = resp.value.data
}
watch(resp, (d) => {
  console.log(d)
  data.value = d.data
})
const desc = (text) => {
  if (text.includes('[desc_end]')) {
    return text.split('[desc_end]')[0]
  } else {
    text = text.slice(0, 200)
    if (text.endsWith(' ')) {
      return text.slice(0, 199) + '...'
    } else {
      return text + '...'
    }
  }
}
const dateFormat = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>
<style scoped>
.fst-screen .container {
  padding-top: 6rem;
  padding-bottom: 4rem;
  margin: 0 auto;
}

.fst-screen blockquote {
  border-left: 0.3rem solid black;
  padding-left: 0.7rem;
  margin-left: 0.3rem;
  line-height: 1.5;
}

.dark .fst-screen blockquote {
  border-left: 0.3rem solid white;
  opacity: .8;
}

html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.link-text code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
}
</style>
 
<style>
article.index {
  border-top: 2px rgb(55 65 81 / var(--tw-border-opacity)) solid;
}
</style>