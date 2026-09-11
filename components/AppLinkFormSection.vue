<script setup>
import { toast } from 'vue3-toastify'

const { $t } = useI18n()

const loading = ref(false)

const form = ref({
  mobile: '',
  name: '',
})

const message = ref('')
const step = ref('')

async function submit() {
  if (!/^09[0-9]{9}$/.test(form.value.mobile)) {
    toast($t('correctField', { field: $t('phone') }), {
      autoClose: 2000,
      hideProgressBar: true,
      transition: 'slide',
      type: 'error',
      position: toast.POSITION.BOTTOM_RIGHT,
    })
    return
  }
  loading.value = true

  useNuxtApp().$api('/public/get-source', {
    method: 'GET',
    params: {
      mobile: form.value.mobile,
      name: form.value.name,
    },
  }).then(() => {
    loading.value = false
    step.value = 'result'
    message.value = ''
    form.value.mobile = ''
    form.value.name = ''
  }).finally(() => {
    loading.value = false
  }).catch((err) => {
    toast(err.Data.Message)
  })
}
</script>

<template>
  <div>
    <div>
      <div
        class="flex flex-col lg:flex-row items-center justify-between bg-white rounded-2xl px-5 py-6 lg:px-[75px] lg:py-[70px]"
      >
        <div class="lg:pl-14 mb-6 lg:mb-12 text-center lg:rtl:text-right lg:ltr:text-left">
          <h2
            class="text-base lg:text-2xl font-bold mb-2 lg:mb-4"
            v-text="$t('getDietBrand')"
          />
          <p
            class="text-sm lg:text-base"
            v-text="$t('enterPhoneToGetAppLink')"
          />
        </div>
        <div class="w-full max-w-[410px] lg:min-w-[410px]">
          <p class="text-[#A8A8A8] text-center font-bold text-sm lg:text-base mb-7">
            برای ورود نام و شماره همراه خود را وارد کنید
          </p>

          <form @submit.prevent="submit">
            <ui-kit-c-input
              v-model="form.name"
              :placeholder="$t('name')"
              class="mb-3 lg:mb-5"
              input-class="!text-sm !lg:text-base"
            />
            <ui-kit-c-input
              v-model="form.mobile"
              :placeholder="$t('phone')"
              class="mb-4 lg:mb-10"
              input-class="!text-sm !lg:text-base"
            />
            <div class="flex justify-center">
              <div
                v-if="step === 'result'"
                id="result-send-app-install-link"
                class="text-primary text-md mt-7"
                v-text="$t('doneSuccessfully')"
              />
              <ui-kit-c-button
                v-else
                id="result-send-app-install-link"
                class="!text-sm md:!text-base w-[156px] md:!h-[48px] rounded-xl"
                :loading="loading"
                type="submit"
              >
                {{ $t('sendLink') }}
              </ui-kit-c-button>
              <p
                v-if="message"
                class="text-rose-400 text-xs mt-2"
                v-text="message"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
