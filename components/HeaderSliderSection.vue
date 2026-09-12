<script setup>
const { data: sliderItems } = await useAPI('BlogBanner/get-by-type', {
  key: 'HeaderSliderSection-blogBanner',
  method: 'POST',
  body: {
    BlogId: null,
  },
  transform: (res) => {
    if (!res?.Data?.Slider) return []
    return res.Data.Slider.filter(item => item.PlaceType === 1).map(item => ({
      Title: item.Title,
      URL: item.URL,
      Image: item.Image,
      TagId: item.TagId,
    }))
  },
})

const { data: hero } = await useAPI('/hero/get-newest', {
  key: 'HeaderSliderSection-hero',
  method: 'GET',
  transform: (res) => {
    if (!res?.Data) return {}
    return {
      Name: res.Data.Name,
      LandingCover: res.Data.LandingCover,
    }
  },
})

const heroData = computed(() => hero.value || {})
const sliderList = computed(() => sliderItems.value || [])
</script>

<template>
  <div
    class="flex flex-row w-full"
  >
    <div
      class="w-full aspect-[16/9]"
    >
      <ui-kit-light-carousel :images="sliderList" />
    </div>
    <div class="flex-grow ms-4 hidden md:block">
      <div
        class="text-center bg-white border border-black/20 rounded-3xl relative hidden md:flex flex-col items-center px-6 h-full"
      >
        <h4
          class="w-52 font-bold text-black mt-8"
          v-text="$t('weekHero')"
        />
        <div class="flex-grow flex flex-col justify-center">
          <NuxtImg
            :src="heroData.LandingCover?.Url"
            :alt="$t('weekHero')"
            width="220"
            height="200"
            densities="x1"
            format="webp"
          />
        </div>
        <div
          class="w-full bg-[#CCEEEC] h-14 lg:h-[75px] rounded-t-[80px] rounded-b-3xl flex items-center justify-center"
        >
          <span
            class="text-xl lg:text-2xl text-primary font-bold"
            v-text="heroData.Name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
