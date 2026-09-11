<template>
  <div>
    <div
      class="relative"
      @click="showGallery"
    >
      <nuxt-img
        :src="cover"
        :is-expandable="false"
        width="600px"
        class="rounded-3xl md:rounded-2xl mx-auto"
      />
      <ui-kit-play-btn />
      <gallery-wrapper
        ref="galleryRef"
        :items="items"
      />
    </div>
    <div class="max-w-[680px] mx-auto mt-5">
      <p
        class="md:text-center text-base md:text-2xl font-bold mb-2 md:mb-3"
        v-text="title"
      />
      <p
        class="md:text-center text-sm md:text-lg"
        v-text="$t('watchVideo')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  video: { type: String, default: '' },
  cover: { type: String, default: '' },
  title: { type: String, default: '' },
})
const galleryRef = ref(null)
function showGallery() {
  galleryRef.value?.openGallery(0)
}
const items = [
  {
    type: 'video',
    config: {
      video: {
        source: [{ src: '/video/home.mp4', type: 'video/mp4' }],
        attributes: { preload: false, controls: true },
      },
      dataPoster: '/img/cover.webp',
      dataSubHtml: 'میخوای بدونی رژیم کالری شماری چطوریه؟',
      image: '/img/cover.webp',
    },
  },
]
</script>
