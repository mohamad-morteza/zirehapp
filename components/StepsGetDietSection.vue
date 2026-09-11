<script setup>
defineProps({
  titleClass: { type: String, default: '' },
})

const steps = [
  {
    title: 'نصب اپلیکیشن',
    description: 'می توانید از طریق استورها و سایت زیره، اپلیکیشن زیره را دریافت و نصب نمایید',
    icon: 'download',
  },
  {
    title: 'اطلاعات جسمانی',
    description: 'پس از ورود به اپلیکیشن، اطلاعات جسمانی خود را وارد کنید',
    icon: 'heart',
  },
  {
    title: 'انتخاب برنامه غذایی',
    description: 'بیش از 10 هزار منو غذایی در اپلیکیشن آماده شده تا شما بتوانید انتخاب کنید',
    icon: 'diet',
  },
  {
    title: 'شروع مسیر رژیم',
    description: 'در انتها می توانید مسیر کاهش وزن خود را بدون محدودیت شروع کنید',
    icon: 'scales',
  },
]
</script>

<template>
  <div>
    <div>
      <h3
        class="text-base md:text-2xl font-bold md:text-center mb-10 md:mb-24"
        :class="titleClass"
        v-text="$t('stepsGetDiet')"
      />
      <div class="max-w-[580px] mx-auto mb-12 md:mb-20">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-center mb-11"
        >
          <div
            class="min-w-[38px] h-[38px] md:w-[60px] md:h-[60px] relative rounded-xl md:rounded-2xl bg-[#DCEDEC] flex items-center justify-center me-4 before:absolute before:top-0 before:-translate-y-full before:w-px before:h-[46px] before:bg-[#D9D9D9] after:absolute after:bottom-0 after:translate-y-full after:w-px after:h-[33px] after:bg-[#D9D9D9]"
          >
            <nuxt-icon
              :name="step.icon"
              class="text-primary text-xl md:text-2xl"
            />
          </div>
          <span class="text-base md:text-2xl text-[#CCCCCC] me-4">{{ `0${index + 1}` }}</span>
          <div>
            <h4
              class="text-sm md:text-base font-bold"
              v-text="step.title"
            />
            <p
              class="text-sm md:text-base"
              v-text="step.description"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <ui-kit-c-button
          id="getDietAfterSteps"
          class="!text-sm md:!text-base w-[156px] md:!h-[52px] rounded-xl"
          @click="navigateTo('/')"
        >
          {{ $t('getDiet') }}
        </ui-kit-c-button>
      </div>
    </div>
  </div>
</template>
