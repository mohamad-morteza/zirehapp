<template>
  <div
    class="app-footer "
    :class="bgColor"
  >
    <div class="max-w-[1190px] mx-auto px-3">
      <div class="flex flex-col lg:flex-row lg:justify-between py-7 sm:py-10">
        <!-- Blog Section - Fixed image dimensions -->
        <div class="w-full  min-h-[50px] mb-5 sm:mb-8 lg:mb-0">
          <p
            class="text-base sm:text-xl font-bold text-center rtl:text-right ltr:text-left mb-2 sm:mb-[14px]"
            v-text="$t('newestContents')"
          />
          <div class="flex flex-row md:flex-col mb-4 pb-4 md:pb-0 md:mb-0 border-b border-[#A8A8A8]/50 md:border-0">
            <NuxtLink
              v-for="blog in blogs"
              :key="blog.Id"
              :to="blog.Url"
              class="flex md:flex-col md:mb-6 me-6 last:me-0 min-w-[75px]"
            >
              <div class="flex flex-col items-center md:flex-row md:items-center">
                <NuxtImg
                  :src="blog?.ImgSmall"
                  :alt="blog?.ImageAlt"
                  class="rounded-[6px] md:me-[18px] mb-3 md:mb-0 w-[75px] h-[50px] object-cover"
                  width="75"
                  height="50"
                  densities="x1"
                  format="webp"
                  loading="lazy"
                />
                <p
                  class="text-[16px] min-w-0"
                  v-text="blog.Title"
                />
              </div>
            </NuxtLink>
          </div>
          <div>
            <p
              class="text-center mb-1.5"
              v-text="$t('CountCaloriesGetInShape')"
            />
            <ui-kit-c-button
              id="getDietInFooter"
              class="w-full rounded-xl"
              @click="navigateTo('/')"
            >
              {{ $t('geDiet') }}
            </ui-kit-c-button>
          </div>
        </div>

        <!-- Brand Section - Fixed width -->
        <div class="flex mb-[30px] justify-between sm:mb-0 w-full  px-10">
          <div>
            <p
              class="text-base sm:text-xl font-bold flex mb-2 sm:mb-[14px]"
              v-text="$t('brand')"
            />
            <ul class="text-sm sm:text-base">
              <li class="mb-2">
                <nuxt-link
                  to="/"
                  class="hover:text-primary"
                >
                  {{ $t('aboutBrand') }}
                </nuxt-link>
              </li>
              <li class="mb-2">
                <nuxt-link
                  to="/"
                  class="hover:text-primary"
                >{{ $t('contactUs') }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- App Links Section - Fixed dimensions -->
        <div
          id="footer-app-link"
          class="w-full lg:max-w-[262px]"
        >
          <p class="text-center text-base sm:text-xl font-bold mb-2 sm:mb-[14px] whitespace-nowrap">
            {{ $t('installLinks') }}
          </p>

          <!-- Store buttons with fixed height -->
          <div class="grid gap-3">
            <a
              id="google-play"
              :href="getStoreLink('googlePlay')"
              target="_blank"
              class="w-full h-[45px] bg-white border border-[#CACACA] rounded-xl flex items-center justify-center"
            >
              <img
                src="/stores/google-play.png"
                alt="google-play"
                class="h-[30px] object-contain"
              >
            </a>
            <a
              id="cafe-bazaar"
              :href="getStoreLink('cafeBazar')"
              target="_blank"
              class="w-full h-[45px] bg-white border border-[#CACACA] rounded-xl flex items-center justify-center"
            >
              <img
                src="/stores/cafe-bazar.png"
                alt="cafe-bazar"
                class="h-[30px] object-contain"
              >
            </a>
            <a
              id="web-app"
              :href="getStoreLink('webApp')"
              target="_blank"
              class="GTM_web-app w-full h-[45px] bg-white border border-[#CACACA] rounded-xl flex items-center justify-center"
            >
              <nuxt-icon
                name="web"
                class="text-[#707071] text-sm me-1.5"
              />
              <span
                class="text-sm text-[#707071]"
                v-text="$t('webApplication')"
              />
            </a>
            <form
              class="w-full h-[48px] flex bg-white rounded-[12px] border border-[#CACACA] overflow-hidden"
              @submit.prevent="submit"
            >
              <input
                v-model="mobile"
                :placeholder="errorMessage || $t('phone')"
                class="flex-1 h-full bg-transparent outline-none px-3 min-w-0 placeholder:text-right"
                dir="ltr"
              >
              <ui-kit-c-button
                id="GTM_send-link"
                class="w-[90px] h-[34px] m-auto ml-[6px] rounded-xl text-sm shrink-0"
                :loading="loading"
                :disabled="submitted"
                type="submit"
              >
                <template v-if="submitted">
                  <nuxt-icon
                    name="check"
                    class="text-lg opacity-50 mb-1"
                  />
                </template>
                <span
                  v-else
                  class="whitespace-nowrap"
                  v-text="$t('sendLink')"
                />
              </ui-kit-c-button>
            </form>
          </div>

          <div
            v-if="irEnemad"
            class="flex justify-center sm:justify-end mt-3"
          >
            <a
              referrerpolicy="origin"
              target="_blank"
              href="/"
            ><img
              referrerpolicy="origin"
              src=""
              alt=""
              style="cursor:pointer"
            ></a>
          </div>

          <div
            v-else
            class="flex justify-center sm:justify-end mt-3"
          >
            <a
              class="w-[66px] h-[66px] rounded-3xl border border-[#D8D8D8] block"
              referrerpolicy="origin"
              target="_blank"
              href="/"
            ><img
              referrerpolicy="origin"
              src=""
              alt=""
              style="cursor:pointer"
            ></a>
          </div>
        </div>
      </div>
      <!-- Footer Bottom - Fixed height -->
      <div class="flex flex-col sm:flex-row items-center justify-between border-t border-[#A8A8A8] py-4 min-h-[60px]">
        <p
          class="text-xs sm:text-base mb-2 sm:mb-0 text-center sm:rtl:text-right sm:ltr:text-left"
          v-text="$t('copyright')"
        />
        <div class="flex items-center justify-center gap-8 text-[#A8A8A8]">
          <a
            id="instagram"
            href="/"
            class="hover:text-[#E72D69]"
          >
            <nuxt-icon
              name="instagram"
              class="text-base"
            />
          </a>
          <a
            id="youtube"
            href="/"
            class="hover:text-[#E72D69]"
          >
            <nuxt-icon
              name="youtube"
              class="text-base"
            />
          </a>
          <a
            id="aparat"
            href="/"
            class="hover:text-[#E72D69]"
          >
            <nuxt-icon
              name="aparat"
              class="text-base"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getStoreLink } = useDomain()

defineProps({
  bgColor: { type: String, default: 'bg-white' },
})

const { currentDomain } = useDomain()

const irEnemad = computed(() => {
  return false
})

const { $t } = useI18n()
const loading = ref(false)
const mobile = ref('')
const errorMessage = ref('')
const submitted = ref(false)

const { data: blogs } = await useAPI('blog/getlist', {
  method: 'POST',
  body: {
    Page: 1,
    PerPage: 5,
    IsDesc: true,
    SortBy: BlogSortTypesEnum.CreatedAt,
  },
  transform: ({ Data }) => {
    return Data.slice(0, 3).map((blog) => {
      return {
        Title: blog.Title,
        ImageAlt: blog.ImageAlt,
        Url: blog.Url,
        ImgSmall: getImageBySize(blog.BlogImage, 'Small'),
      }
    })
  },
})

async function submit() {
  if (!/^09[0-9]{9}$/.test(mobile.value)) {
    errorMessage.value = $t('WrongNumberFail')
    mobile.value = ''
    return
  }
  loading.value = true
  useNuxtApp().$api('/public/get-source', {
    method: 'GET',
    params: {
      mobile: mobile.value,
      name: $t('user'),
    },
  }).then(() => {
    submitted.value = true
    errorMessage.value = null
  }).catch(() => {
    mobile.value = ''
    errorMessage.value = $t('WrongNumberFail')
  })
    .finally(() => {
      loading.value = false
    })
}
</script>
