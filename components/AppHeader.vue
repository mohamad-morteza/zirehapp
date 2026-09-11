<script setup>
defineProps({
  showSearch: { type: Boolean, default: false },
  showDownload: { type: Boolean, default: true },
})
const route = useRoute()
const { $t } = useI18n()
const isHomePage = useIsHome()

// ✅ Wait until plans is ready before building menus
const menus = computed(() => {
  const m = [
    {
      key: 'home',
      title: $t('home'),
      icon: 'home',
      to: { path: '/' },
      show: false,
      hasItems: false,
    },
  ]
  if (route.path !== '/')
    m.push({
      key: 'downloadPage',
      title: $t('DownloadPage'),
      icon: 'comment',
      to: { path: '/' },
      show: false,
      hasItems: false,
    })
  return m
})

</script>

<template>
  <header class="w-full h-[68px] sticky top-0 bg-white border-b border-[#E3E3E3] z-[200]">
    <div class="h-full full-container">
      <div class="h-full flex items-center justify-between flex-row">
        <!-- Site Main Title -->
         <h1 v-if="isHomePage" class="sr-only">
          زیره
         </h1>
        <!-- Logo -->
        <div
          class="flex items-center w-[56px] h-[20px] md:me-8 order-1 md:order-0"
          :class="{ 'ms-2': showSearch }"
        >
          <nuxt-link
            to="/"
            class="relative z-10 w-full h-full"
          >
            <nuxt-img
              src="/img/logo.png"
              alt="logo"
              width="112"
              height="40"
              densities="x1"
              format="webp"
              class="w-full h-full object-contain"
            />
          </nuxt-link>
        </div>

        <!-- Navigation -->
        <nav
          v-show="!searching && menus.length"
          class="nav md:order-1 flex-grow overflow-visible hidden md:block h-full"
        >
          <ul class="nav__list flex flex-col md:flex-row gap-x-8 text-base p-4 md:p-0 h-full items-center">
            <li
              v-for="menu in menus"
              :key="menu.key"
              class="nav-item py-1.5 relative group h-full flex items-center"
            >
              <!-- Menu with items -->
              <template v-if="menu.hasItems">
                <span
                  :id="menu.key"
                  class="relative flex items-center after:absolute after:w-0 after:h-px after:bottom-0 after:right-1/2 after:translate-x-1/2 after:bg-primary hover:after:w-8 hover:after:transition-[width] after:ease-in after:duration-300 hover:text-primary h-full"
                >
                  <span v-text="menu.title" />
                  <nuxt-icon
                    v-if="menu.hasItems"
                    name="chevron-down"
                    class="ms-1 mt-2 text-[8px]"
                  />
                </span>
                <ul
                  v-if="menu.items?.length"
                  class="w-[326px] transform scale-y-0 h-0 group-hover:h-auto group-hover:block group-hover:scale-y-100 transition duration-150 ease-in-out origin-top rounded-3xl mt-2 md:mt-0 py-4 px-[25px] bg-white/95 shadow-[0_10px_50px_0_rgba(0,0,0,0.1)] backdrop-blur-lg absolute top-full left-1/2 -translate-x-1/2"
                >
                  <li
                    v-for="item in menu.items"
                    :key="item.key"
                    class="h-[40px] hover:text-primary min-w-[200px]"
                  >
                    <NuxtLink
                      :id="`${item.key}-header`"
                      :to="item.to"
                      class="h-full flex items-center"
                      exact-active-class="text-primary"
                    >
                      <i class="text-base font-normal w-[6px] h-[6px] bg-[#D9D9D9] mt-[7px] rounded-full me-2" />
                      <span
                        class="text-base font-normal"
                        v-text="item.title"
                      />
                    </NuxtLink>
                  </li>
                </ul>
              </template>

              <!-- Menu without items -->
              <template v-else>
                <nuxt-link
                  :id="menu.key"
                  :to="menu.to"
                  class="relative flex items-center h-full after:absolute after:w-0 after:h-px after:bottom-0 after:right-1/2 after:translate-x-1/2 after:bg-primary hover:after:w-8 hover:after:transition-[width] after:ease-in after:duration-300 hover:text-primary"
                  exact-active-class="text-primary"
                >
                  <span v-text="menu.title" />
                </nuxt-link>
              </template>
            </li>
          </ul>
        </nav>

        <!-- Mobile Menu -->
        <div class="md:me-2 md:flex-shrink-0 order-0 md:order-2 md:w-fit">
          <client-only>
            <LazyHeaderMenuDrawer
              v-show="!searching"
              hydrate-on-interaction="click"
              :menus="menus"
            />
          </client-only>
        </div>

        <!-- Download button -->
        <NuxtLink
          v-show="showDownload && !searching && $route.path==='/'"
          id="download-app-header"
          class="order-5 hidden hover:brightness-105 md:flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#D1EFEE] flex-shrink-0"
          :to="{ hash: '#intro-app' }"
        >
          <nuxt-icon
            name="download"
            class="text-primary"
          />
        </NuxtLink>

        <slot name="action" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.sr-only {
	clip-path: inset(50%);
	white-space: nowrap;
	border-width: 0;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	position: absolute;
	overflow: hidden;
}
</style>