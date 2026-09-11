<template>
  <div class="relative h-full">
    <!-- Loading placeholder (optional) -->
    <div
      v-if="!swiperIsLoad"
      class="swiper-loading-placeholder bg-gray-100 flex items-center justify-center"
      style="height: 100%"
    >
      <!-- You can add a skeleton loader here -->
    </div>

    <!-- Swiper container - hidden until initialized -->
    <div
      :class="[containerClass.replaceAll('.', ''), { 'opacity-0': !swiperIsLoad }]"
      class="swiper transition-opacity duration-300"
    >
      <div class="swiper-wrapper">
        <template
          v-for="(i, index) in info"
          :key="index"
        >
          <div
            class="swiper-slide"
            :class="slideClass"
          >
            <slot :slide="i" />
          </div>
        </template>
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script setup>
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  info: { type: Array, default: () => ([]) },
  swiperConfig: { type: Object, default: () => ({}) },
  slideClass: { type: String, default: '' },
})
let mySwiper = null
const swiperIsLoad = ref(false)
const containerClass = '.swiper_' + useId()
const containerPagination = `${containerClass} .swiper-pagination`
const model = defineModel({ type: Number, default: 0 })
const stopSwiperLoop = () => {
  mySwiper.autoplay.stop()
}
const startSwiperLoop = () => {
  mySwiper.autoplay.start()
}
defineExpose({ stopSwiperLoop, startSwiperLoop })
onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()

  mySwiper = new Swiper(containerClass, {
    modules: [Pagination, Autoplay],
    centeredSlides: true,
    paginationClickable: true,
    loop: true,
    autoplay: false,
    spaceBetween: 30,
    slideToClickedSlide: true,
    observer: true, // Watch for DOM changes
    observeParents: true, // Watch parent DOM changes
    breakpoints: {
      1920: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1028: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
    },
    on: {
      slideChange(swiper) {
        model.value = swiper.realIndex
      },
      init() {
        swiperIsLoad.value = true
      },
    },
    ...props.swiperConfig,
    pagination: {
      el: containerPagination,
      clickable: true,
      ...props.swiperConfig.pagination,
    },
  })
})
</script>

<style>
.swiper {
  /* Prevent layout shift */
  overflow: hidden;
  min-height: 300px; /* Set your minimum expected height */
}

.swiper.opacity-0 {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.swiper-loading-placeholder {
  height: 300px; /* Should match your swiper height */
}

.swiper-pagination {
  position: initial;
  padding-top: 30px;
}

.swiper-pagination-bullet {
  height: 10px;
  width: 10px;
}

.swiper-pagination-bullet-active {
  width: 30px;
  border-radius: 20px;
  @apply bg-primary;
}
</style>
