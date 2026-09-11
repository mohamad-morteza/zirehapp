<template>
  <div class="relative w-full h-full">
    <div class="relative overflow-hidden h-full">
      <!-- Slides wrapper -->
      <div
        class="flex transition-transform duration-500  "
        :class="dir === 'rtl' ? 'flex-row-reverse' : ''"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        @touchend="handleTouchMove"
        @touchstart="handleTochStart"
      >
        <div
          v-for="(img, index) in images"
          :key="index"
          class="w-full h-full flex-shrink-0"
        >
          <NuxtLink
            :id="img.TagId"
            :to="img.URL"
          >
            <NuxtImg
              :src="img.Image"
              :alt="img.Title"
              class="rounded-2xl w-full object-cover"
              :lazy="index !== 0"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Pagination bullets -->
    <div class="flex justify-center gap-2 mt-5 absolute top-[100%] left-[50%] -translate-x-1/2">
      <span
        v-for="(img, i) in images"
        :key="i"
        class="h-3 w-3 rounded-full cursor-pointer GTM_topSliderClick"
        :class="i === currentIndex ? 'bg-primary w-6' : 'bg-gray-400'"
        style="transition: all 0.3s"
        @click="currentIndex = i"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})

const currentIndex = ref(0)
const dir = ref('ltr')
let startX, startY

onMounted(() => {
  dir.value = document?.documentElement?.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr'
})
const handleTouchMove = (event) => {
  const endX = event.changedTouches[0].clientX
  const endY = event.changedTouches[0].clientY

  // Calculate differences
  const deltaX = endX - startX
  const deltaY = endY - startY

  // Determine direction
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      if (currentIndex.value === 0)
        currentIndex.value = props.images.length - 1
      else currentIndex.value--
    }
    else {
      if (currentIndex.value === props.images.length - 1)
        currentIndex.value = 0
      else currentIndex.value++
    }
  }
}
const handleTochStart = (event) => {
  startX = event.changedTouches[0].clientX
  startY = event.changedTouches[0].clientY
}
</script>
