<script setup>
const { getStoreLink } = useDomain()

defineProps({
  menus: { type: Array, default: () => [] },
  showMenu: { type: Boolean, default: true },
  showDownloadBtn: { type: Boolean, default: true },
})
const { $t } = useI18n()
const isLoggedIn = useCookie("AuthToken").value?.length > 0;
const user = ref({})
const loading = ref(false)
const openMenu = ref(false)
const authenticated = ref(false)
const info = [
  {
    title: $t('profile.myDiet'),
    icon: 'scales',
    to: '/',
  },
  {
    title: $t('profile.userInfo'),
    icon: 'user-check',
    to: '/',
  },
  {
    title: $t('getDietTutorial'),
    icon: 'play-circle',
    to: '/',
  },
]
const token = useCookie('AuthToken')
const { $viewport } = useNuxtApp()

// const { data: user, status } = await $fetch('/user/get', {
//   key: 'user',
//   method: 'POST',
//   server: false,
//   lazy: true,
//   transform: (user) => {
//     return {
//       Image: user.Data.Image,
//       FullName: user.Data.Name + user.Data.Family,
//     }
//   },
// })


const getUserData =() =>{
    useNuxtApp().$api('/user/get', {
      server: false,
      lazy: true,
      method: 'POST',
    }).then((res) => {
      authenticated.value = true;
      user.value = res.Data;
      user.value.FullName = res.Data.Name + res.Data.Family
    })
}
if(isLoggedIn) getUserData()

// watch(status, (val) => {
//   authenticated.value = val === 'success'
// })

const showDrawer = ref(false)

const logout = () => {
  token.value = null
  authenticated.value = false
  showDrawer.value = false
  navigateTo('/')
}

function logoutUser() {
  logout()
  window.location.reload()
}
const goToProfile = () => {
  const backUrl = useState('backUrl')
  backUrl.value = '/'
  navigateTo({ path: '/' })
}
</script>

<template>
  <div>
    <div class="flex items-center">
      <!-- Login Button: Always rendered to reserve space -->
      <div class="hidden md:block !w-[124px] me-2">
        <ui-kit-c-button
          v-show="!authenticated && !loading && !$viewport.isLessThan('lg')"
          id="GTM_loginOrRegisterInHeaderMenuDrawer"
          class="!text-base !w-[124px] !h-[36px] !rounded-[8px] px-1"
          @click="goToProfile"
        >
          {{ $t('loginOrRegister') }}
        </ui-kit-c-button>
      </div>

      <!-- Avatar/Icon: Fixed size, no layout shift -->
      <div
        class="ms-2 md:ms-2 w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer border border-[#C8C8C8]"
        @click="showDrawer = true"
      >
        <template v-if="authenticated">
          <NuxtImg
            v-if="user.Image"
            class="rounded-full object-cover object-center"
            :src="user.Image "
            alt="عکس کاربر"
            height="36"
            width="36"
            densities="x1"
            format="webp"
            :placeholder="[36, 36]"
          />
          <nuxt-icon
            v-else
            name="user-check"
            class="text-[#C8C8C8] text-xl"
          />
        </template>
        <nuxt-icon
          v-else-if="!loading"
          name="user"
          class="text-[#C8C8C8] text-xl "
        />
      </div>
    </div>
    <ui-kit-c-drawer
      v-model="showDrawer"
      content-class="relative pb-32 overflow-y-auto"
    >
      <div class="relative w-full h-[103px] rounded-b-2xl bg-primary/10">
        <div class="w-[56px] h-[56px] absolute right-1/2 translate-x-1/2 bottom-0 translate-y-1/2">
          <div
            class="relative w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden"
            :class="!user?.Image && 'border border-[#C8C8C8]'"
          >
            <NuxtImg
              v-if="user?.Image"
              :src="user.Image"
              alt="عکس کاربر"
              height="56px"
              width="56px"
              densities="x1"
              format="webp"
              :placeholder="[56, 56]"
            />
            <nuxt-icon
              v-else
              name="user"
              class="text-[#C8C8C8] text-2xl"
            />
          </div>
        </div>
      </div>
      <div class="px-[27px]">
        <div>
          <h4
            v-if="authenticated"
            class="mt-9 text-base text-center"
            v-text="user?.FullName"
          />
          <ui-kit-c-button
            v-else
            class="w-full mt-11 !h-[46px] !rounded-3xl"
            @click="goToProfile"
            id="GTM_loginOrRegisterInHeader"
          >
            {{ $t('loginOrRegister') }}
          </ui-kit-c-button>
        </div>
        <ul
          v-if="authenticated"
          class="mt-6"
        >
          <li
            v-for="(item, index) in info"
            :key="index"
            class="flex items-center mb-4 last:mb-0 cursor-pointer hover:-translate-x-1 hover:text-primary transition-transform"
            @click="navigateTo({ path: item.to })"
          >
            <nuxt-icon
              :name="item.icon"
              class="pe-3 text-[#C8C8C8]"
            />
            <span
              class="text-base"
              v-text="item.title"
            />
          </li>
        </ul>
        <ul
          v-if="showMenu"
          class="nav mt-6"
        >
          <li
            v-for="menu in menus"
            :key="menu.key"
            class="py-3 relative border-t border-[#C2C2C2]"
            @click="openMenu = openMenu===menu.key?null:menu.key"
          >
            <div class="flex justify-between items-center">
              <span
                v-if="menu.hasItems"
                :id="menu.key"
                class="flex items-center hover:text-primary hover:cursor-pointer"
              >
                <nuxt-icon
                  :name="menu.icon"
                  class="me-2 text-[#A8A8A8] "
                />
                <span v-text="menu.title" />
              </span>
              <nuxt-link
                v-else
                :id="menu.key"
                :to="menu.to"
                class="flex items-center hover:text-primary hover:cursor-pointer"
              >
                <nuxt-icon
                  :name="menu.icon"
                  class="rtl:ml-2 ltr:mr-2 text-[#A8A8A8] "
                />
                <div v-text="menu.title" />
              </nuxt-link>

              <div
                v-if="menu.hasItems"
                class="w-[18px] h-[18px] rounded-full bg-[#EAEAEA] flex items-center justify-center md:hidden"
              >
                <nuxt-icon
                  name="chevron-down"
                  class="text-[8px] text-[#A8A8A8] transition-all"
                  :class="menu.key === openMenu ? 'rotate-180' : ''"
                />
              </div>
            </div>
            <ul
              v-if="menu.hasItems"
              class="w-full h-0 overflow-hidden"
              :class="menu.key === openMenu&& 'h-full pt-4 pr-4'"
            >
              <li
                v-for="item in menu.items"
                :key="item.key"
                class="h-[40px] hover:text-primary"
              >
                <NuxtLink
                  :id="`${item.key}-header`"
                  :to="item.to"
                  class="h-full flex items-center"
                >
                  <i class="w-[6px] h-[6px] bg-[#D9D9D9] rounded-full rtl:ml-1.5 ltr:mr-1.5" />
                  <span
                    class="text-base font-normal"
                    v-text="item.title"
                  />
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <div
          v-if="showDownloadBtn"
          class="flex mt-4"
        >
          <nuxt-link
            id="cafe-bazaar-drawer"
            :to="getStoreLink('bazar')"
            target="_blank"
            external
            class="border border-[#CACACA] rounded-[10px] w-full h-[37px] px-4 py-1 me-3"
          >
            <nuxt-img
              src="/stores/cafe-bazar.png"
              alt="cafe-bazar"
              height="28"
              width="75"
              densities="x1"
              format="webp"
              :placeholder="[75, 28]"
            />
          </nuxt-link>
          <nuxt-link
            id="GTM_google-play-drawer"
            :to="getStoreLink('googlePlay')"
            target="_blank"
            external
            class="border border-[#CACACA] rounded-[10px] w-full h-[37px] px-3 py-2"
          >
            <nuxt-img
              src="/stores/google-play.png"
              alt="google-play"
              height="20"
              width="84"
              densities="x1"
              format="webp"
              :placeholder="[84, 20]"
            />
          </nuxt-link>
        </div>
        <a
            :href="getStoreLink('webApp')"
            target="_blank"
            class="GTM_web-app mt-3 w-full h-[45px] bg-white border border-[#CACACA] rounded-xl flex items-center justify-center"
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
      </div>
      <div
        v-if="authenticated"
        class="w-full px-[27px] mt-5"
      >
        <ui-kit-c-button
          variant="outline"
          class="w-full !h-[48px] !rounded-3xl !bg-white !border !border-primary !text-primary"
          @click="logoutUser"
        >
          {{ $t('profile.logout') }}
        </ui-kit-c-button>
      </div>
    </ui-kit-c-drawer>
  </div>
</template>
