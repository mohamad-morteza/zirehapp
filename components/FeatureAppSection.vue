<script setup>
const currentSlideIndex = ref(0)

const { data: items } = await useAPI('/content/get-by-type', {
  key: 'FeatureAppSection',
  method: 'POST',
  body: {
    Type: [4],
  },
  transform: (res) => {
    return res.Data[0].ContentDetails
  },
})
</script>

<template>
  <div>
    <div >
      <div class="flex flex-row items-center flex-wrap md:flex-nowrap">
        <div
          class="w-full md:w-[400px] sm:me-6 md:me-8 lg:me-20 mb-6 sm:mb-0"
        >
          <div class="bg-[#D9D9D9] rounded-2xl mb-4">
            <ui-kit-carosoul
              v-slot="{ slide }"
              v-model="currentSlideIndex"
              :info="items"
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
                :placeholder="true"
              />
            </ui-kit-carosoul>
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
                v-text="items[currentSlideIndex].Title"
              />
              <p
                class="text-sm md:text-base"
                v-text="items[currentSlideIndex].Description"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
