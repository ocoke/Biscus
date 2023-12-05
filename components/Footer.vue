<script setup>
const data = useAppConfig().biscus
</script>


<template>
  <footer class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="border-t border-slate-900/5 py-10">
      <p class="mt-5 text-center text-sm leading-6 text-slate-500">
        <b>© {{ new Date().getFullYear() }} {{ data.name }}</b>
        <br>Powered by <a href="https://github.com/ocoke/Biscus">Biscus</a>.
      </p>
      <!-- 
      <div class="mt-5 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
        <a href="/privacy-policy">Privacy policy</a><div class="h-4 w-px bg-slate-500/20"></div><a href="/changelog">Changelog</a>
      </div> -->
    </div>
  </footer>
</template>