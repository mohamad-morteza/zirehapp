<script setup>
const { $viewport } = useNuxtApp()
const route = useRoute()
const props = defineProps({
  stickyBanner: { type: Object, default: () => {} },
})
const show = ref(false)
onMounted(() => {
  show.value = $viewport.isLessThan('sm')
    ? props.stickyBanner?.ShowInMobile
    : props.stickyBanner?.ShowInDesktop
})
const goToLink = () => {
  if (new URL(props.stickyBanner.URL).pathname !== route.path) {
    navigateTo(props.stickyBanner.URL, { external: true })
  }
  else {
    navigateTo('#footer-app-link')
  }
}
</script>

<template>
  <span
    class="items-center h-[73px] w-full fixed bottom-0 left-0 right-0 z-[999]"
    :class="show ? 'flex' : 'hidden'"
    @click="goToLink"
  >
    <img
      :src="stickyBanner?.MobileImage"
      class="h-full w-full"
    />
    <span
      class="w-[25px] h-[25px] bg-white border border-gray-400 rounded-full flex items-center justify-center absolute top-0 -translate-y-1/2 left-[10px]"
      @click.prevent.stop="show = false"
    >
      <nuxt-icon
        name="close"
        class="text-sm"
      />
    </span>
  </span>
</template>
