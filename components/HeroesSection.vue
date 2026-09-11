<script setup>
defineProps({
  titleClass: { type: String, default: '' },
})

const { $t } = useI18n()
const { data: heroes } = await useAPI('/hero/getlist', {
  key: 'HeroesSection',
  method: 'POST',
  body: {
    Page: 1,
    PerPage: 10,
  },
  transform: (res) => {
    return res.Data.map((hero) => {
      return {
        videoUrl: hero.Video.Url,
        name: hero.Name,
        coverURL: hero.Cover.Url,
        userId: hero.UserId,
        changes: hero.RecordWeight,
        type: hero.BeforeWeight > hero.AfterWeight ? $t('weightLoss') : $t('weightGain'),
      }
    })
  },
})
const isModalShown = ref(false)
const swiper = ref(null)
const slideSrc = ref(null)

const galleryRef = ref(null)
function showGallery(slide) {
  const index = heroes.value.findIndex(val => val.userId === slide.userId)
  galleryRef.value?.openGallery(index)
}
const items = heroes.value.map(h => ({
  type: 'video',
  config: {
    video: {
      source: [{ src: h.videoUrl, type: 'video/mp4' }],
      attributes: { preload: false, controls: true },
    },
    dataPoster: h.coverURL,
    dataSubHtml: `${h.name} با ${h.changes} ${$t('kilo')} ${h.type}`,
    image: h.coverURL,
  },
}))

watch(isModalShown, (val) => {
  if (val) swiper.value.stopSwiperLoop()
  else swiper.value.startSwiperLoop()
})
</script>

<template>
  <div>
    <div
      class="relative"
    >
      <div>
        <h4
          class="text-base md:text-2xl font-bold mb-4 md:mb-8"
          :class="titleClass"
          v-text="$t('zirehHeros')"
        />
      </div>
      <div
        class="h-[400px] xl:h-[350px]"
      >
        <ui-kit-carosoul
          id="hero-marquee-slider"
          ref="swiper"
          v-slot="{ slide }"
          :swiper-config="{
            speed: 1800,
            autoplay: {
              delay: 0,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            },
            pauseOnHover: true,
          }"
          :info="heroes"
        >
          <div>
            <div
              class="w-full bg-black/[.15] rounded-2xl pt-5 pb-7 mb-3 relative"
              @click="showGallery(slide)"
            >
              <nuxt-img
                :src="slide.coverURL"
                alt="video-cover"
                class="w-[270px] h-[255px] mx-auto"
              />
              <ui-kit-play-btn />
            </div>
            <p class="text-base text-center">
              {{ `${slide.name} با ${slide.changes} ${$t('kilo')} ${slide.type}` }}
            </p>
          </div>
        </ui-kit-carosoul>
        <gallery-wrapper
          ref="galleryRef"
          :items="items"
        />
      </div>
    </div>
    <ui-kit-c-modal
      v-model="isModalShown"
    >
      <video
        ref="video"
        :src="slideSrc"
        controls
        autoplay
        class="h-3/4 max-h-[800px]"
      />
    </ui-kit-c-modal>
  </div>
</template>

<style>
.lg-outer .lg-video-cont .lg-object{
  max-width: 350px !important;
  width: 100% !important;
  height: auto !important;
  margin: auto !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  cursor: pointer !important;
  transform: translate(-50%, -50%) scale(1) !important;
}
</style>
