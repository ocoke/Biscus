<template>
  <Title>Search - {{ name }}</Title>
  <Meta
    name="description"
    content="Search the content in {{ name }}"
  />
    <div class="fst-screen">
        <div class="container lg:pl-8">
            <h1 class="text-5xl font-bold">🔍 Search</h1>
            <blockquote class="text-xl mt-3">Search the content in {{ name }}</blockquote>
        <form action="" method="get" class="search">   
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="search" @input="keywordInputSearch" v-model="keywordInput" name="q" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="Search" required>
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>
        <div class="results">
            <div class="filterGroup page-card-radius">
              <p v-show="_resp_data.length == 0 && (searchKeyword || keywordInput)">There isn't any results.</p>
              <p v-show="_resp_data.length == 0 && !searchKeyword">Type the keyword and click "search" to start searching.</p>
              <p v-show="_resp_data.length == 1">There is only 1 result.</p>
              <p v-if="loading">Loading...</p>
              <p v-if="_resp_data.length > 1">There are {{ _resp_data.length }} results</p>
            </div>
            <div v-if="_resp_data" v-for="item in searchResp(_resp_data, keywordInput)" class="page-card-radius">
                <NuxtLink :to="'/blog/' + item.id"><h3 class="text-2xl font-bold" v-html="item.title"></h3></NuxtLink>
                <p class="my-2" v-html="item.bodyDesc"></p>
            </div>
            <div
              v-if="loading"
              class="page-card-radius animate-pulse"
              v-for="i in 2"
            >
            <div class="link-text z-20">
              <div class="text-2xl font-bold bg-slate-200 dark:bg-slate-700 h-5 rounded" style="width: 70%;"></div>

              <div class="my-2 bg-slate-200 dark:bg-slate-700 h-10 rounded"></div>
              </div>
            </div>
          
          
          </div>
            
        </div>
    </div>
  </template>
  
  <style scoped>
    .fst-screen {
      display: flex;
      min-width: 100%;
      min-height: 100%;
      padding-top: 30px;
      margin-top: -72px;
  }
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
  html, body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .link-text code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(175,184,193,0.2);
    border-radius: 6px;
  }
  .search-input {
    border-style: none;
    background-color: rgba(175,184,193,0.2);
    padding: 7px 10px;
    border-radius: 6px 0 0 6px;
    width: 80%;
  }
  .dark .search-input {
    background-color: rgba(175, 184, 193, 0.1);
  }
  .search {
    width: 100%;
    max-width: 600px;
    margin: 30px auto 15px auto;
  }
  .search-btn {
    padding: 7px 10px;
    border-radius: 0 6px 6px 0;
    @apply bg-blue-500 text-white;
    width: 20%;
  }
  .search-input:focus {
    outline: none;
  }

  .results {
    max-width: 600px;
    margin: 0 auto;
    padding: 6px;
  }

  .filterGroup button {
    margin-right: 1rem;
    margin-top: .5rem;
    @apply bg-blue-50 dark:bg-blue-950;
    padding: 5px 10px;
    border-radius: 6px;
  }
  .filterGroup {
    margin-bottom: 1rem;
  }
  .filterGroup p {
    margin-bottom: .5rem;
  }
  
  </style>
  <style>
    article.index {
      border-top: 2px rgb(55 65 81 / var(--tw-border-opacity)) solid;
    }
    .page-card {
      @apply border-2 border-gray-700 p-6 h-full relative transition duration-300 hover:shadow-lg overflow-hidden flex flex-col justify-between my-4;
      cursor: pointer;
    }
    span.highlight {
        @apply bg-yellow-300;
    }
    .dark span.highlight {
        @apply bg-yellow-700;
    }
  </style>
  
<script setup>
  const { name, repository } = useAppConfig().biscus
  let _resp_data = ref([])
  let loading = ref(false)
  const search = async (searchKeyword) => {
    if (searchKeyword) {
        console.log('func search(): ' + searchKeyword)
        loading = true
        let rsp = await $fetch(`/api/search?keyword=${searchKeyword}&first=100&repo=${repository}`)
        rsp = rsp.data
        // console.log(rsp)
        loading = false
        if (rsp && rsp.search && rsp.search.edges) {
            return rsp.search.edges
        } else {
            return []
        }
    } else {
      return []
    }
  }
  const searchKeyword = useRoute().query.q
  let data = []
  if (searchKeyword) {
    _resp_data.value = (await search(searchKeyword))
  }
  let keywordInput = searchKeyword


  const keywordInputSearch = async() => {
    // location.search = '?q=' + keywordInput
    navigateTo(('/search?q=') + keywordInput)
    _resp_data.value = await search(keywordInput)
  }
  function escapeText(text) {
        text = text.replace(/[<>&"]/g, function (c) {
            return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]
        })
        text = text.replace(/\r?\n/g, " ")
        text = text.replace(/((\s|&nbsp;)*\r?\n){1,}/g, "\r\n\r\n")
        text = text.replace(/^((\s|&nbsp;)*\r?\n)+/g, "")
        text = text.replace(/((\s|&nbsp;)*\r?\n)+$/g, "")
        return text
    }
  const searchResp = (data, keyword) => {
    let resp = []
    if (!keyword) {
        return []
    }
    for (let i of data) {
        let bodyDesc = escapeText(i.node.bodyText)
        let resultDesc = (bodyDesc).slice(0, 200) + '...'
        if (bodyDesc.includes('[desc_end]')) {
            resultDesc = bodyDesc.split('[desc_end]')[0]
            bodyDesc = bodyDesc.split('[desc_end]')[1]
        }
        if (resultDesc.match(new RegExp(keyword, 'i'))) {
            // console.log(keyword)
            let firstKw = resultDesc.toString().match(new RegExp(keyword, 'i'))
            let rawKey = keyword;
            if (firstKw) {
              rawKey = firstKw[0]
            }
            if (!firstKw) {
                return []
            } else {
                firstKw = firstKw.index
            }
            let sliceStart = firstKw - 50
            let sliceEnd = firstKw + 50
            if (sliceStart <= 0) {
                sliceStart = 0
            }
            if (sliceEnd >= resultDesc.length) {
                sliceEnd = resultDesc.length
            }
            // console.log(sliceStart, sliceEnd)
            resultDesc = '...' + resultDesc.slice(sliceStart, sliceEnd)
            resultDesc = resultDesc.replace(new RegExp(keyword, 'gi'), '<span class="highlight">' + rawKey + '</span>')
            // console.log(resultDesc)
        }
        if (i.node.bodyText.match(new RegExp(keyword, 'i'))) {
            let firstKw = bodyDesc.toString().match(new RegExp(keyword, 'i'))
            let rawKey = keyword;
            if (firstKw) {
              rawKey = firstKw[0]
            }
            if (!firstKw) {
                return []
            } else {
                firstKw = firstKw.index
            }
            // console.log(rawKey)
            let sliceStart = firstKw - 100
            let sliceEnd = firstKw + 100
            if (sliceStart <= 0) {
                sliceStart = 0
            }
            if (sliceEnd >= bodyDesc.length) {
                sliceEnd = bodyDesc.length
            }
            bodyDesc = '...' + bodyDesc.slice(sliceStart, sliceEnd) + '...'
            bodyDesc = bodyDesc.replace(new RegExp(keyword, 'gi'), '<span class="highlight">' + rawKey + '</span>')
        } else {
            bodyDesc = ''
        }
        let titleHighlight = i.node.title
        if (i.node.title.match(new RegExp(keyword, 'i'))) {
            let rawKey = i.node.title.match(new RegExp(keyword, 'i'))[0]
            titleHighlight = i.node.title.replace(new RegExp(keyword, 'gi'), '<span class="highlight">' + rawKey + '</span>')
        }
        resp.push({
            title: titleHighlight,
            id: i.node.id,
            bodyDesc: resultDesc + bodyDesc,
        })
    }
    // console.log(resp)
    return resp
  }
  const filterSearch = (keyword) => {
    keywordInput = 'category:'+keyword+' ';
    keywordInputSearch()
  }
  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString()
  }
</script>