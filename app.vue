<script setup>
const { robots } = useDomain()

useSeoMeta({
  robots: robots,
})

useHead({
  htmlAttrs: {
    lang: 'fa-IR',
    dir: 'rtl',
  },
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
