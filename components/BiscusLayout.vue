<script setup lang="ts">
const myTheme = useAppConfig().myTheme
</script>

<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>
