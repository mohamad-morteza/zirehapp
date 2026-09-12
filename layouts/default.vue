<script setup>
const { $viewport } = useNuxtApp()
let topStickyBanner = null
let popupBanner = null
let stickyBanner = null
let isMobile = false
const showPopupUpBanner = ref(false)
const showTopStickyBanner = ref(false)

isMobile = $viewport.isLessThan('sm')

const { data } = await useAPI('BlogBanner/get-by-type', {
  method: 'POST',
  body: {
    BlogId: null,
  },
})

const res = data.value?.Data

if (res) {
  topStickyBanner = res.TopStickyBanners?.find(item => item.PlaceType === 1)
  showTopStickyBanner.value = !!topStickyBanner
  popupBanner = res.Popup?.find(item => item.PlaceType === 1)
  stickyBanner = res.StickyBanners?.find(item => item.PlaceType === 1)
  showPopupUpBanner.value
          = !!popupBanner
            && ((isMobile && popupBanner.ShowInMobile)
              || (!isMobile && popupBanner.ShowInDesktop)
            )
}
</script>

<template>
  <div>
    <div
      v-if="showTopStickyBanner && !isMobile"
      class="w-full aspect-[30/1] bg-[#00988b]"
    >
      <blog-top-sticky-banner
        :top-sticky-banner="topStickyBanner"
      />
    </div>
    <AppHeader />
    <div class="max-w-[1190px] px-3 mx-auto mt-10 mb-10 overflow-hidden">
      <slot />
    </div>
    <blog-popup-banner
      v-if="showPopupUpBanner"
      :popup-banner="popupBanner"
    />
    <blog-sticky-banner
      v-if="stickyBanner"
      :sticky-banner="stickyBanner"
    />
    <AppFooter />
  </div>
</template>
