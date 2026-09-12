<script setup>
const { getStoreLink } = useDomain()

defineProps({
  showVideo: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div>
    <div id="intro-app">
      <div class="bg-white rounded-2xl p-4 lg:px-10 lg:py-36 2xl:px-20">
        <div class="grid grid-cols-none md:grid-cols-5">
          <div
            class="flex flex-col mb-6 md:mb-0"
            :class="[showVideo ? 'col-span-3' : 'col-span-12']"
          >
            <h2
              class="text-base md:text-xl lg:text-2xl font-bold text-center rtl:md:text-right ltr:md:text-left mb-2"
              v-text="$t('zirehApplication')"
            />
            <p
              class="text-sm md:text-base font-normal text-center md:text-justify leading-6 whitespace-pre-line mb-6"
              v-text="$t('introZireh')"
            />
            <div class="grid grid-cols-2 lg:grid-cols-none gap-x-8 px-4">
              <div class="flex flex-col lg:flex-row items-center justify-center lg:mb-4">
                <div class="flex items-center justify-center text-[#D9D9D9] min-w-[112px] text-center lg:text-right mb-3 lg:m-0">
                  <nuxt-icon
                    name="android"
                    class="text-2xl me-1 lg:me-2 "
                  />
                  <span
                    class="text-sm"
                    v-text="$t('android')"
                  />
                </div>
                <div class="w-full grid lg:grid-cols-2 gap-3 grow justify-center">
                  <a
                    id="google-play"
                    :href="getStoreLink('googlePlay')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="max-w-[150px] md:max-w-full col-span-1 bg-white border border-[#CACACA] rounded-xl h-[42px] lg:h-[52px] px-4 flex items-center justify-center"
                  >
                    <nuxt-img
                      src="/stores/google-play.png"
                      alt="google-play"
                      width="119"
                      height="29"
                      class="w-[86px] md:w-[119px] h-5 md:h-7 object-contain"
                    />
                  </a>
                  <a
                    id="cafe-bazaar"
                    :href="getStoreLink('cafeBazar')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="max-w-[150px] md:max-w-full col-span-1 bg-white border border-[#CACACA] rounded-xl h-[42px] lg:h-[52px] px-4 flex items-center justify-center"
                  >
                    <nuxt-img
                      src="/stores/cafe-bazar.png"
                      alt="cafe-bazar"
                      width="75"
                      height="30"
                      class="w-12 md:w-14 h-5 md:h-7 object-contain"
                    />
                  </a>
                  <a
                    id="web-app"
                    :href="getStoreLink('webApp')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="md:max-w-full lg:hidden col-span-1 bg-white border border-[#CACACA] rounded-xl h-[42px] lg:h-[52px] px-4 flex items-center justify-center"
                  >
                    <span
                      class="text-base text-[#707071]"
                      v-text="$t('webApplication')"
                    />
                  </a>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center justify-center lg:mb-4">
                <div class="flex items-center justify-center text-[#D7D7D7] min-w-[112px] text-center lg:text-right mb-3 lg:m-0">
                  <nuxt-icon
                    name="ios"
                    class="text-2xl me-1 lg:me-2"
                  />
                  <span class="text-sm">IOS</span>
                </div>
                <div class="w-full grid lg:grid-cols-3 gap-3 grow justify-center">
                  <a
                    id="sib-irani"
                    :href="getStoreLink('sibIrani')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-white border border-[#CACACA] rounded-xl w-full md:max-w-full h-[42px] lg:h-[52px] px-4 lg-1 flex items-center justify-center"
                  >
                    <nuxt-img
                      src="/stores/sib-irani.png"
                      alt="sib-irani"
                      width="100"
                      height="30"
                      class="w-[68px] md:w-[100px] h-5 md:h-7 object-contain"
                    />
                  </a>
                  <a
                    id="sibapp"
                    :href="getStoreLink('sibApp')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-white border border-[#CACACA] rounded-xl w-full md:max-w-full h-[42px] lg:h-[52px] px-5 lg:px-7 flex items-center justify-center"
                  >
                    <nuxt-img
                      src="/stores/sib-app.png"
                      alt="sib-app"
                      width="107"
                      height="32"
                      class="w-[80px] md:w-[107px] h-5 md:h-7 object-contain"
                    />
                  </a>
                  <a
                    id="iapps"
                    :href="getStoreLink('iApps')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-white border border-[#CACACA] rounded-xl w-full md:max-w-full h-[42px] lg:h-[52px] px-4 lg-1 flex items-center justify-center"
                  >
                    <nuxt-img
                      src="/stores/i-apps.png"
                      alt="i-apps"
                      width="127"
                      height="31"
                      class="w-[85px] md:w-[127px] h-5 md:h-7 object-contain"
                    />
                  </a>
                </div>
              </div>
              <div class="hidden lg:flex flex-col lg:flex-row items-center justify-center">
                <div class="flex items-center text-[#D9D9D9] min-w-[112px] text-center lg:text-right mb-3 lg:m-0">
                  <nuxt-icon
                    name="web"
                    class="text-2xl me-1 lg:me-2"
                  />
                  <span
                    class="text-sm"
                    v-text="$t('webApplication')"
                  />
                </div>
                <div class="grow">
                  <a
                    :href="getStoreLink('webApp')"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="col-span-1 bg-white lg:border border-[#CACACA] rounded-xl h-[32px] lg:h-[52px] px-4 lg-1 flex items-center justify-center mb-4 lg:mb-0"
                  >
                    <span
                      class="text-base text-[#707071]"
                      v-text="$t('webApplication')"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="showVideo"
            class="w-full col-span-3 md:col-span-2 md:order-last"
          >
            <video
              class="h-[433px] w-[200px] rounded-[36px] mx-auto shadow-[18px_1px_25px_0_rgba(0,0,0,0.25)]"
              autoplay
              loop
              muted
            >
              <source
                type="video/mp4"
                src="/video/intro.mp4"
              >
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
