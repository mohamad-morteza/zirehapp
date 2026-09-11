<script setup>
const { $viewport } = useNuxtApp()
let topStickyBanner = null
let popupBanner = null
let stickyBanner = null
let isMobile = false
const showPopupUpBanner = ref(false)
const showTopStickyBanner = ref(false)
// detect there is any bannter to show or not
isMobile = $viewport.isLessThan('sm')
const { data } = await useAPI('BlogBanner/get-by-type', {
  method: 'POST',
  body: {
    BlogId: null,
  },
})
const res = data.value
topStickyBanner = res.Data.TopStickyBanners.find(item => item.PlaceType === 1)
showTopStickyBanner.value = !!topStickyBanner
popupBanner = res.Data.Popup.find(item => item.PlaceType === 1)
stickyBanner = res.Data.StickyBanners.find(item => item.PlaceType === 1)
showPopupUpBanner.value
        = popupBanner // there is popupBanner to show
          && ((isMobile && popupBanner.ShowInMobile) // popupBanner is for mobile and screen is mobile
            || (!isMobile && popupBanner.ShowInDesktop)// popupBanner is for desktop and screen is desktop
          )
</script>

<template>
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
</template>
