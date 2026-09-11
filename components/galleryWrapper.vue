<template>
  <Lightgallery
    :settings="{
      speed: 500,
      plugins,
      closable: true,
      closeOnTap: true,
      mobileSettings: {
        showCloseIcon: true,
        download: true,
      },
    }"
    class="ltr"
    :on-init="onInit"
  >
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <a
        v-if="item.type === 'image' "
        :href="item.config.src"
        class="hidden"
      >
        <img
          :src="item.config.thumb"
          :alt="'Image ' + (index + 1)"
        >
      </a>
      <a
        v-else-if="item.type === 'video'"
        class="gallery-item hidden"
        :data-video="JSON.stringify(item.config.video)"
        :data-poster="item.config.dataPoster"
        :data-sub-html="item.config.dataSubHtml"
      >
        <img
          width="200"
          class="img-responsive"
          :src="item.config.image"
        >
      </a>
    </template>
  </Lightgallery>
</template>

<script setup>
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-video.css'

import Lightgallery from 'lightgallery/vue'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgVideo from 'lightgallery/plugins/video'

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

// Setup plugins
const plugins = [lgThumbnail, lgVideo]

// Reference to LightGallery instance
const lightGalleryRef = ref(null)

// Function to open gallery from parent
function openGallery(index = 0) {
  lightGalleryRef.value?.openGallery(index)
}

// On init, get instance
const onInit = (detail) => {
  lightGalleryRef.value = detail.instance
}

// Expose method to parent
defineExpose({ openGallery })
</script>

<style scoped>
.ltr {
  direction: ltr;
}
</style>
