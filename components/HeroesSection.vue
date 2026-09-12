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
    if (!res?.Data) return []
    return res.Data.map((hero) => {
      return {
        videoUrl: hero.Video?.Url || '',
        name: hero.Name || '',
        coverURL: hero.Cover?.Url || '',
        userId: hero.UserId,
        changes: hero.RecordWeight,
        type: hero.BeforeWeight > hero.AfterWeight ? $t('weightLoss') : $t('weightGain'),
      }
    })
  },
})

const heroList = computed(() => heroes.value || [])

const isModalShown = ref(false)
const swiper = ref(null)
const slideSrc = ref(null)

const galleryRef = ref(null)
function showGallery(slide) {
  const index = heroList.value.findIndex(val => val.userId === slide.userId)
  galleryRef.value?.openGallery(index)
}

const items = computed(() => heroList.value.map(h => ({
  ...h,
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
})))

function playVideo(slide) {
  slideSrc.value = slide.videoUrl
  isModalShown.value = true
}
</script>

<template>
  <div class="mt-10 md:mt-24">
    <div class="px-3 md:px-0">
      <h4
        class="text-base md:text-2xl font-bold mb-4 md:mb-8"
        v-text="$t('successStories')"
      />
      <div v-if="heroList.length" class="h-[420px]">
        <ui-kit-carousel
          v-slot="{ slide }"
          :info="items"
          :swiper-config="{
            breakpoints: {
              1920: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1028: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              990: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
            },
          }"
        >
          <div
            class="cursor-pointer"
            @click="playVideo(slide)"
          >
            <div class="h-[330px] w-full relative">
              <nuxt-img
                :src="slide.coverURL"
                alt="video-cover"
                class="w-[462px] h-[330px] mx-auto"
              />
              <ui-kit-play-button />
            </div>
            <p class="text-base text-center">
              {{ `${slide.name} با ${slide.changes} ${$t('kilo')} ${slide.type}` }}
            </p>
          </div>
        </ui-kit-carousel>
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
        v-if="slideSrc"
        :src="slideSrc"
        controls
        autoplay
        class="w-full"
      />
    </ui-kit-c-modal>
  </div>
</template>
