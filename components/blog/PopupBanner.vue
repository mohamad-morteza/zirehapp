<script setup>
const props = defineProps({
  popupBanner: { type: Object, default: null },
})

const show = ref(false)
const imageIsLoaded = ref(false)

const handleScroll = () => {
  if (window.scrollY >= props.popupBanner.ScrollToShow) {
    show.value = true
    // Remove event after showed modal banner to stop repeating showing
    window.removeEventListener('scroll', handleScroll)
  }
}

const setTimeToShowBanner = () => {
  window.setTimeout(() => {
    show.value = true
  }, props.popupBanner.SecondToShow * 1000)
}

onMounted(() => {
  const key = 'bannerShowDate'
  let bannerShowDate = []

  if (import.meta.client) {
    // Get existing banners from sessionStorage
    const stored = sessionStorage.getItem(key)
    if (stored) {
      try {
        bannerShowDate = JSON.parse(stored)
      } catch {
        bannerShowDate = []
      }
    }

    const tagId = props.popupBanner.TagId

    // Check if TagId already exists
    const exists = bannerShowDate.includes(tagId)

    if (!exists) {
      // Add TagId to the list
      bannerShowDate.push(tagId)
      sessionStorage.setItem(key, JSON.stringify(bannerShowDate))

      // Show the banner
      if (props.popupBanner.SecondToShow) {
        setTimeToShowBanner()
      } else {
        window.addEventListener('scroll', handleScroll)
      }
    }
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll) // Cleanup
})
</script>

<template>
  <ui-kit-c-modal
    v-model="show"
    :active="imageIsLoaded"
    width="max-w-md"
    body-class="!p-0 !bg-transparent"
  >
    <div class="w-full flex justify-start mb-2">
      <nuxt-icon
        v-show="imageIsLoaded"
        name="close"
        class="p-1 cursor-pointer text-[#fff]"
        @click="show = false"
      />
    </div>
    <a
      :href="popupBanner?.URL"
      target="_blank"
      rel="noopener noreferrer"
      class="cursor-pointer aspect-[3/4]"
    >
      <NuxtImg
        :src="$viewport.isLessThan('sm') ? popupBanner?.MobileImage : popupBanner?.Image"
        alt="popup-img"
        :placeholder="[448, 330]"
        format="webp"
        densities="x1"
        @load="() => imageIsLoaded=true"
      />
    </a>
  </ui-kit-c-modal>
</template>
