<template>
  <div
    id="video-blog"
    class="video-blog-section"
  >
    <div>
      <div class="flex items-center justify-between mb-4 md:mb-8">
        <h4
          class="text-base md:text-2xl font-bold"
          v-text="$t('videoBlogs')"
        />
        <a
          href="/"
          class="text-primary"
        >
          <span
            class="text-xs md:text-base ml-2"
            v-text="$t('viewAll')"
          />
          <i class="ic-left-arrow text-[8px] md:text-[11px]" />
        </a>
      </div>
      <div class="grid md:grid-cols-2 gap-2 h-[326px]">
        <div
          class="grow order-last md:order-first overflow-y-scroll h-full "
          dir="ltr"
        >
          <div
              dir="rtl"
            v-for="item in videos"
            :key="item.Id"
          >
            <div class="flex items-center w-full h-[85px] my-5">
<!--              بخاطر اینکه با اسکرول بار کناری کنار هم قرار می گرفتند، حذف شد.-->
<!--              <div-->
<!--                class="h-4/5 md:h-full w-0.5 md:w-[5px] rounded-[30px] me-1.5 md:me-3 my-auto"-->
<!--                :class="selected?.Id === item.Id && 'bg-primary'"-->
<!--              />-->
              <NuxtImg
                :src="item.Image"
                :alt="item.ImageAlt"
                class="w-[97px] md:w-[154px] h-full rounded-[10px] rtl:ml-4 ltr:mr-4 rtl:lg:ml-8 ltr:lg:mr-4 object-cover cursor-pointer"
                placeholder
                width="154"
                height="85"
                densities="x1"
                format="webp"
                loading="lazy"
                @click="selected = item"
              />
              <div class="h-full flex flex-col justify-center items-start grow">
                <p
                  class="text-xs md:text-base font-bold cursor-pointer"
                  :class="selected?.Id === item.Id && 'text-primary'"
                  @click="selected = item"
                  v-text="item.Title"
                />
                <div class=" md:text-base flex items-center flex-wrap mt-2">
                  <span v-text="item.Date" class="text-sm"/>
                  <span class="w-[5px] h-[5px] rounded-full bg-[#D9D9D9] mx-2 " />
                  <p v-text="$t('videoDuration', [item.Duration])" class="text-sm mb-1"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grow mb-3 md:mb-0 relative"
          @click="showGallery"
        >
          <nuxt-img
            :src="selected.BlogImage[1].Url"
            :is-expandable="false"
            class="w-full h-[180px] sm:h-[250px] md:h-[326px] rounded-2xl"
          />
          <ui-kit-play-btn />
          <gallery-wrapper
            ref="galleryRef"
            :items="items"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $getLocale, $t } = useI18n()
const selected = ref(null)
const { data: videos } = await useAPI('blog/getlist', {
  key: 'VideoBlogSection',
  method: 'POST',
  body: {
    Page: 1,
    PerPage: 10,
    BlogContentType: 1,
    IsDesc: true,
    SortBy: BlogSortTypesEnum.Random,
  },
  transform: (res) => {
    return res.Data.map((item) => {
      return {
        Duration: item.Duration,
        ImageAlt: item.ImageAlt,
        Image: item.Image,
        Id: item.Id,
        BlogImage: item.BlogImage,
        Date: new Date(item.CreatedAt).toLocaleDateString($getLocale()),
        Video: item.Video,
        Title: item.Title,
      }
    })
  },
  default: () => ([]),
})
selected.value = videos.value[0]

const items = videos.value.map(h => ({
  type: 'video',
  config: {
    video: {
      source: [{ src: h.Video, type: 'video/mp4' }],
      attributes: { preload: false, controls: true },
    },
    dataPoster: h.BlogImage[1].Url,
    dataSubHtml: `${h.Title}`,
    image: h.BlogImage[1].Url,
    Id: h.Id,
  },
}))
const galleryRef = ref(null)
function showGallery() {
  const index = items.findIndex(val => val.config.Id === selected.value.Id)
  galleryRef.value?.openGallery(index)
}
</script>

<style>

</style>
