<script setup>
const { data: info } = await useAPI('/public/ZirehSoFar', {
  key: 'AchievementSection',
  method: 'GET',
  transform: (res) => {
    if (!res?.Data) return {}
    return res.Data
  },
})

const stats = computed(() => info.value || {})
</script>

<template>
  <div
    class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-10"
  >
    <div
      class="h-16 md:h-[100px] p-4 bg-white rounded-2xl flex flex-col justify-center items-center"
    >
      <p class="text-primary font-bold text-xl md:text-2xl mb-1">
        + {{ price(stats.AppInstallCount) }}
      </p>
      <span
        class="text-xs md:text-base"
        v-text="$t('install')"
      />
    </div>
    <div
      class=" h-16 md:h-[100px] p-4 bg-white rounded-2xl flex flex-col justify-center items-center"
    >
      <p
        class="text-primary font-bold text-xl md:text-2xl mb-1"
        v-text="stats.WeightLossSum"
      />
      <span
        class="text-xs md:text-base"
        v-text="$t('weightLossRate')"
      />
    </div>
    <div
      class="h-16 md:h-[100px] p-4 bg-white rounded-2xl flex flex-col justify-center items-center"
    >
      <p
        class="text-primary font-bold text-xl md:text-2xl mb-1"
        v-text="stats.WomenCount"
      />
      <span
        class="text-xs md:text-base"
        v-text="$t('femaleUser')"
      />
    </div>
    <div
      class=" h-16 md:h-[100px] p-4 bg-white rounded-2xl flex flex-col justify-center items-center"
    >
      <p
        class="text-primary font-bold text-xl md:text-2xl mb-1 percent"
        v-text="stats.MenCount"
      />
      <span
        class="text-xs md:text-base"
        v-text="$t('maleUser')"
      />
    </div>
  </div>
</template>
