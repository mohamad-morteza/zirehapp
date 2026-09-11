<script setup>
defineProps({
  error: { type: Object },
})
</script>

<template>
  <NuxtLayout :name="error.Layout">
    <div class="w-full p-5 h-[400px] text-center flex flex-col justify-around">
      <div>
        <h2 class="text-8xl text-secondary mb-5">
          {{ error.statusCode }}
        </h2>
        <h2 class="text-2xl mb-5">
          {{ error?.statusMessage }}
        </h2>
        <nuxt-link
          to="/"
          class="text-primary underline text-xl"
        >خانه</nuxt-link>
      </div>
    </div>
  </NuxtLayout>
</template>
