<script setup>
defineProps({
  topStickyBanner: { type: Object, default: () => {} },
})
</script>

<template>
  <div class="w-full h-full bg-red-900">
    <a
      :href="topStickyBanner?.URL"
    >
      <img
        :src="topStickyBanner?.Image"
        class="w-full h-full"
      />
    </a>
  </div>
</template>
