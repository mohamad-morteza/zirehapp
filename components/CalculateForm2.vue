<script setup>
const loading = ref(false)
const step = ref('form')
const result = ref()

const form = ref({
  gender: 0,
  weight: '',
  height: '',
  age: '',
  wrist: 16,
})

const circleProgressSize = computed(() => {
  return window.innerWidth < 1024 ? 208 : 200
})

const percent = computed(() => {
  return (result.value.NormalWeight / result.value.Weight) * 100
})

async function submit() {
  loading.value = true
  useNuxtApp().$api('/userbodyhistory/compute', {
    method: 'POST',
    body: form.value,
  }).then((res) => {
    result.value = res.Data
    step.value = 'result'
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div>
    <div>
      <div
        class="h-auto lg:h-[405px] grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-2xl p-4 lg:p-16"
      >
        <div class="mb-7 md:mb-0 md:me-12 text-center md:rtl:text-right md:ltr:text-left">
          <h4
            class="text-base md:text-xl lg:text-2xl font-bold mb-2 leading-6"
            v-text="$t('yourWeightOk')"
          />
          <p
            class="text-sm md:text-base leading-8 md:leading-10 font-normal"
            v-text="$t('enterWeightToCalculate')"
          />
        </div>
        <form
          v-if="step === 'form'"
          @submit.prevent="submit"
        >
          <div class="flex justify-center mb-6 md:mb-14">
            <div
              class="flex items-center me-2 md:me-12 cursor-pointer"
              @click="form.gender = 0"
            >
              <img
                src="/img/female.png"
                :alt="form.gender"
                class="w-5 md:w-9 h-auto object-contain me-1"
              >
              <span
                class="bg-[#E84678]
                   relative
                   after:absolute
                   after:-bottom-1.5
                   md:after:-bottom-2
                   after:left-1/2
                   after:-translate-x-1/2
                   after:w-[55px]
                   after:h-0.5
                   bg-opacity-15
                   pt-0
                   pb-2
                   rounded-full
                   leading-6
                   px-4
                   font-bold
                   text-base
                   md:text-xl"
                :class="form.gender === 0 && 'after:bg-primary'"

                v-text="$t('iAmFemale')"
              />
            </div>
            <div
              class="font-extrabold   flex items-center  cursor-pointer"
              @click="form.gender = 1"
            >
              <img
                src="/img/male.png"
                :alt="form.gender"
                class="w-5 md:w-9 h-auto object-contain me-1"
              >
              <span
                :class="form.gender === 1 && 'after:bg-primary'"

                class="bg-[#00AAA0]

                  relative
                  after:absolute
                  after:-bottom-1.5
                  md:after:-bottom-2
                  after:left-1/2
                  after:-translate-x-1/2
                  after:w-[55px]
                  after:h-0.5
                  bg-opacity-15
                  pt-0
                  pb-2
                  rounded-full
                  leading-6
                  px-4
                  font-bold
                  text-base
                  md:text-xl"
                v-text="$t('iAmMale')"
              />
            </div>
          </div>
          <ui-kit-counter-input
            v-model="form.weight"
            :placeholder="$t('weight')"
            input-class=" text-base "
            class="mb-4 lg:mb-5 md:!h-[44px] lg:!h-[52px]"
          />
          <div class="grid grid-cols-2 gap-3.5 mb-5">
            <ui-kit-counter-input
              v-model="form.age"
              :placeholder="$t('age')"
              input-class=" text-base "
              class="md:!h-11 xl:!h-[52px]"
            />
            <ui-kit-counter-input
              v-model="form.height"
              :placeholder="$t('height')"
              input-class=" text-base "
              class="md:!h-11 xl:!h-[52px]"
            />
          </div>
          <div class="flex justify-center">
            <ui-kit-c-button
              :loading="loading"
              class="text-sm w-[156px] h-11 xl:!h-[52px] lg:text-base rounded-xl"
              type="submit"
            >
              {{ $t("calculate") }}
            </ui-kit-c-button>
          </div>
        </form>
        <div
          v-else-if="step === 'result'"
          class="grow"
        >
          <div
            class="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-x-4 gap-y-6 mb-8"
          >
            <h4
              class="text-xl text-primary lg:text-3xl lg:hidden"
              v-text="result.Description"
            />
            <ui-kit-radial-progress
              :percent="percent"
              :size="circleProgressSize"
              :border-size="20"
              color="stroke-primary"
              round
              class="lg:order-last"
            >
              <div
                class="flex flex-col justify-center items-center text-primary"
              >
                <span
                  class="text-lg"
                  v-text="$t('appropriate')"
                />
                <div class="flex items-center">
                  <b
                    class="text-3xl rtl:ml-1 ltr:mr-1"
                    v-text="result.NormalWeight"
                  />
                  <span
                    class="text-lg text-black"
                    v-text="$t('kg')"
                  />
                </div>
                <span
                  class="text-lg"
                  v-text="$t('idealWeight')"
                />
              </div>
            </ui-kit-radial-progress>
            <div>
              <h4
                class="text-xl text-primary hidden lg:block mb-6 font-medium"
                v-text="result.Description"
              />
              <ul class="text-lg">
                <li class="grid grid-cols-3 mb-2">
                  <div class="col-span-2">
                    {{ `${$t("bmi")}:` }}
                  </div>
                  <div v-text="result.BMI.toFixed(2)" />
                </li>
                <li class="grid grid-cols-3 mb-2">
                  <div class="col-span-2">
                    {{ `${$t("idealWeight")}:` }}
                  </div>
                  <div>
                    <span v-text="result.NormalWeight" />
                    <span
                      class="mx-1"
                      v-text="$t('kg')"
                    />
                  </div>
                </li>
                <li class="grid grid-cols-3 mb-2">
                  <div class="col-span-2">
                    {{ `${$t("healthWeight")}:` }}
                  </div>
                  <div>
                    <span v-text="result.HealthWeight" />
                    <span
                      class="mx-1"
                      v-text="$t('kg')"
                    />
                  </div>
                </li>
                <li class="grid grid-cols-3">
                  <div class="col-span-2">
                    {{ `${$t("untilIdealWeight")}:` }}
                  </div>
                  <div>
                    <span>{{ Math.abs(result.TimeToGoalNormal) }}</span>
                    <span
                      class="mx-1"
                      v-text="$t('day')"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex justify-end items-center">
            <ui-kit-c-button
              id="calculate-bmi-again"
              class="!bg-white !border !border-primary !text-primary rtl:ml-2 ltr:mr-2 rounded-xl"
              variant="outline"
              @click="step = 'form'"
            >
              {{ $t("calculateAgain") }}
            </ui-kit-c-button>
            <NuxtLink :to="{ path: '/' }">
              <ui-kit-c-button
                id="getDietFromBmiForm"
                class="rounded-xl"
              >{{
                $t("getDietBrand")
              }}</ui-kit-c-button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
