<script setup>
const currentSlideIndex = ref(0)

const { data: items } = await useAPI('/content/get-by-type', {
  key: 'FeatureAppSection',
  method: 'POST',
  body: {
    Type: [4],
  },
  transform: (res) => {
    if (!res?.Data?.[0]?.ContentDetails) return []
    return res.Data[0].ContentDetails
  },
})

const featureItems = computed(() => items.value || [])
const currentItem = computed(() => featureItems.value[currentSlideIndex.value] || {})
</script>

<template>
  <div>
    <div>
      <div class="flex flex-row items-center flex-wrap md:flex-nowrap">
        <div
          class="w-full md:w-[400px] sm:me-6 md:me-8 lg:me-20 mb-6 sm:mb-0"
        >
          <div v-if="featureItems.length" class="bg-[#D9D9D9] rounded-2xl mb-4">
            <ui-kit-carousel
              v-slot="{ slide }"
              v-model="currentSlideIndex"
              :info="featureItems"
              :swiper-config="{
                breakpoints: {
                  1920: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1028: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  990: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                },
                autoplay: true,
              }"
            >
              <nuxt-img
                :src="slide.Image"
                :alt="slide.Title"
                width="395px"
                height="395px"
                class="object-cover m-auto"
                :placeholder
              />
            </ui-kit-carousel>
          </div>
        </div>
        <div class="w-full md:grow">
          <Transition
            name="fade"
            mode="out-in"
          >
            <div :key="currentSlideIndex">
              <p
                class="text-sm md:text-2xl font-bold mb-2 sm:mb-3"
                v-text="currentItem.Title"
              />
              <p
                class="text-sm md:text-base"
                v-text="currentItem.Description"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
