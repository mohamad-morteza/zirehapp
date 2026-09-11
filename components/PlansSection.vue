<script setup>
defineProps({
  titleClass: { type: String, default: '' },
})
const { data: plans } = await useAPI('BlogProduction/get-all', {
  key: 'PlansSection',
  method: 'GET',
  transform: (plans) => {
    return plans.Data.map((plan) => {
      return {
        title: plan.Title,
        to: { path: '/' },
        key: plan.Route,
        icon: plan.Icon,
      }
    })
  },
})
const planItems = computed(() => {
  return [
    ...plans.value || [],
  ]
})
</script>

<template>
  <div class="px-3 sm:p-0 text-center">
    <slot>
      <!-- Default/fallback content -->
      <p
        class="text-base whitespace-nowrap sm:text-2xl font-bold mb-4 sm:mb-11"
        :class="titleClass"
        v-text="$t('brandPlans')"
      />
    </slot>
    <div>
      <div class="flex items-center justify-around flex-wrap">
        <nuxt-link
          v-for="plan in planItems"
          :to="plan.to"
          class="group w-[150px] flex flex-col items-center mb-6"
        >
          <div
            class="w-[102px] h-[102px] rounded-full bg-white group-hover:bg-[#DCEDEC] flex items-center justify-center"
          >
            <img
              :src="plan.icon+'?v=2'"
              :alt="plan.title"
              class="w-[58px] h-[58px]"
            >
          </div>
          <span
            class="text-center w-[150px] font-medium group-hover:font-bold group-hover:text-primary text-xl inline-block mt-3"
            v-text="plan.title"
          />
        </nuxt-link>
      </div>
    </div>
    <!--    <div -->
    <!--      v-if="planItems.length" -->
    <!--      class="hidden sm:block" -->
    <!--    > -->
    <!--      <div class="h-[310px]"> -->
    <!--        <ui-kit-carosoul -->
    <!--          v-slot="{ slide }" -->
    <!--          :info="planItems" -->
    <!--          :swiper-config="{ -->
    <!--            breakpoints: { -->
    <!--              1920: { -->
    <!--                slidesPerView: 5.5, -->
    <!--                spaceBetween: 1, -->
    <!--              }, -->
    <!--              1028: { -->
    <!--                slidesPerView: 5.5, -->
    <!--                spaceBetween: 1, -->
    <!--              }, -->
    <!--              990: { -->
    <!--                slidesPerView: 1.5, -->
    <!--                spaceBetween: 0, -->
    <!--              }, -->
    <!--            }, -->
    <!--          }" -->
    <!--        > -->
    <!--          <nuxt-link -->
    <!--            :to="slide.to" -->
    <!--            class="group" -->
    <!--          > -->
    <!--            <div -->
    <!--              class="h-[102px] rounded-full bg-white group-hover:bg-[#DCEDEC] flex items-center justify-center" -->
    <!--            > -->
    <!--              <nuxt-img -->
    <!--                :src="slide.icon" -->
    <!--                :alt="slide.to" -->
    <!--                width="48" -->
    <!--                height="48" -->
    <!--                densities="x1" -->
    <!--                format="webp" -->
    <!--                :placeholder="true" -->
    <!--              /> -->
    <!--            </div> -->
    <!--            <span -->
    <!--              class="w-full text-center font-medium group-hover:font-bold group-hover:text-primary text-base inline-block mt-5" -->
    <!--              v-text="slide.title" -->
    <!--            /> -->
    <!--          </nuxt-link> -->
    <!--        </ui-kit-carosoul> -->
    <!--      </div> -->
    <!--    </div> -->
  </div>
</template>
