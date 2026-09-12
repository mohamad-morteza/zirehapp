<script setup>
const { $getLocale, $t } = useI18n()

const { data: blogs } = await useAPI('blog/getlist', {
  method: 'POST',
  body: {
    Page: 1,
    PerPage: 10,
    IsDesc: true,
    SortBy: BlogSortTypesEnum.CreatedAt,
  },
  transform: (res) => {
    if (!res?.Data) return []
    return res.Data.map(item => ({
      date: new Date(item.CreatedAt).toLocaleDateString($getLocale()),
      name: !item.Name || !item.Family ? $t('author') : item.Name + ' ' + item.Family,
      url: item.Url,
      ReadingDuration: item.ReadingDuration > 0
        ? item.ReadingDuration
        : Math.floor(Math.random() * 5) + 1,
      Title: item.Title,
      ImageAlt: item.ImageAlt,
      BlogImage: item.BlogImage,
    }))
  },
})

const blogList = computed(() => blogs.value || [])
</script>

<template>
  <div>
    <div
      class="latest-blogs-section w-full"
    >
      <div>
        <div class="flex items-center justify-between mb-4 md:mb-8">
          <p
            class="text-base md:text-2xl font-bold"
            v-text="$t('latestBlogs')"
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
        <div v-if="blogList.length" class="h-[380px]">
          <ui-kit-carousel
            v-slot="{ slide }"
            :info="blogList"
          >
            <div class="w-full rtl:ml-2 ltr:mr-2 rtl:text-right ltr:text-left">
              <div class="h-[207px] w-full md:w-[462px] mb-6 rounded-2xl ">
                <NuxtImg
                  :src="slide.BlogImage?.[1]?.Url || slide.ImageAlt"
                  :alt="slide.ImageAlt"
                  class="h-[207px] rounded-2xl object-cover hover:scale-105 transition-all duration-200 ease-in"
                  height="207"
                  width="462"
                  :placeholder
                />
              </div>
              <NuxtLink
                :to="slide.url"
                class="text-black font-bold text-base md:text-xl mb-2 block h-12 md:h-14 hover:text-secondary"
              >
                <span v-text="slide.Title" />
              </NuxtLink>
              <div class="text-xs md:text-base flex items-center">
                <span v-text="slide.date" />
                <span class="w-[7px] h-[7px] rounded-full bg-[#D9D9D9] mx-2" />
                <p v-text="$t('readingDuration', [slide.ReadingDuration])" />
              </div>
            </div>
          </ui-kit-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
