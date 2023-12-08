<script setup>
import '~/assets/css/github-markdown.css'
import Giscus from '@giscus/vue'
const { name, repositoryId, repository } = useAppConfig().biscus
const route = useRoute()
const id = route.params.id

// const { data: resp, } = (await useFetch(`/api/blog?id=${id}`,))
// const data = resp.value.data

const { pending, data: resp, } = await useFetch(`/api/blog`, {
  lazy: true,
  query: {
    id,
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
const mainContent = (text) => {
  if (text.includes('[desc_end]')) {
    text = text.split('`[desc_end]`')[1]
  }
  // console.log(text)
  text = marked.parse(text)
  // console.log(text)
  return text
}
const dateFormat = (date) => {
  return new Date(date).toLocaleDateString()
}
const htmlProcess = (html) => {
  if (html.includes('<code class="notranslate">[desc_end]</code><br>')) {
    return html.split('<code class="notranslate">[desc_end]</code><br>')[1]
  } else if (html.includes('<code class="notranslate">[desc_end]</code></p>')) {
    return html.split('<code class="notranslate">[desc_end]</code></p>')[1]
  } else {
    return html
  }
    
}
</script>
<template>
  <div
    v-if="data && data.node && data.node.resourcePath.startsWith(`/${repository}/discussions/`)"
    class="container"
  >
    <article>
      <Title>{{ data.node.title }} - {{ name }}</Title>
      <h1 class="text-5xl font-bold title dark:text-gray-200">
        {{ data.node.title }}
      </h1>
      <blockquote class="text-xl mt-3 heading">
        <p><b>Published in <code>{{ data.node.category.name }}</code> on <code>{{ dateFormat(data.node.createdAt) }}</code><span v-show="data.node.lastEditedAt">, last edited on <code>{{ dateFormat(data.node.lastEditedAt) }}</code></span>.</b></p>
      </blockquote>
      <blockquote
        v-show="data.node.bodyText.includes('[desc_end]')"
        class="text-xl mt-3 heading"
      >
        <Meta
          name="description"
          :content="desc(data.node.bodyText).split('\n')[0]"
        />
        <p>
          {{ desc(data.node.bodyText) }}
        </p>
      </blockquote>
      <!-- {{ data.node }} -->
            
      <div
        id="marked-content"
        class="content markdown-body articleContent"
        v-html="htmlProcess(data.node.bodyHTML)"
      ></div>
      <ClientOnly>
        <Giscus
          id="comments"
          :repo="repository"
          :repo-id="repositoryId"
          mapping="number"
          :term="data.node.resourcePath.replace('/' + repository + '/discussions/','')"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          :theme="$colorMode.value"
          lang="en"
          loading="lazy"
        />
      </ClientOnly>
    </article>
  </div>
  <div
    v-else-if="pending"
    class="container"
  >
  <article class="animate-pulse">
      <div class="text-5xl font-bold title dark:text-gray-200 bg-slate-200 dark:bg-slate-700 rounded h-14" style="width: 70%;">
      </div>
      <blockquote class="text-xl mt-3 bg-slate-200 dark:bg-slate-700 rounded h-10">
      </blockquote>
      <div
        class="mt-6 h-96 bg-slate-200 dark:bg-slate-700 rounded"
      ></div>
    </article>
  </div>
  <div
    v-else
    class="container"
  >
    <article>
      <h1 class="text-5xl font-bold title dark:text-gray-200">
        Page Unavailable
      </h1>
      <blockquote class="text-xl mt-3 heading">
        <p>We're sorry but we can't fetch the page you're visiting for.</p>
      </blockquote>
    </article>
  </div>
</template>

<style>
article h1.title {
    line-height: 1.3;
}

article .content {
    border-top: 1px solid #eee;
}
.container {
    margin: 0 auto;
}

article div.dot {
    width: .8rem;
}

.content {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
}
.dot-block.p-info .dot {
    width: .3rem;
}
blockquote.heading {
    border-left: 0.3rem solid black;
    padding-left: 0.7rem;
    margin-left: 0.3rem;
    line-height: 1.5;
}
.dark blockquote.heading {
    border-left: 0.3rem solid white;
    opacity: .8;
}
blockquote.heading code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(175,184,193,0.2);
    border-radius: 6px;
  }
.content {
    padding-top: 30px;
    margin-top: 30px;
    padding-left: 6px;
    padding-right: 6px;
    padding-bottom: 30px;
}
.content.markdown-body {
    background-color: transparent;
    line-height: 1.75;
}
</style>
