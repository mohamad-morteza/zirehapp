<template>
  <div
    class="relative"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <div
      class="rounded-full"
      :class="bgStroke"
      :style="{ width: size + 'px', height: size + 'px', padding: borderSize + 'px' }"
    >
      <div
        class="rounded-full flex justify-center items-center h-full w-full"
        :class="bgColor"
      >
        <slot>
          <div class="text-xl">
            {{ percent + '%' }}
          </div>
        </slot>
      </div>
    </div>
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="absolute top-0 left-0"
    >
      <circle
        :cx="halfOfSize"
        :cy="halfOfSize"
        :r="radius"
        :class="color"
        v-bind="attrs"
        class="fill-none"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  percent: { type: [Number, String], default: 0 },
  size: { type: [Number, String], default: 0 },
  color: { type: String, default: 'stroke-primary' },
  bgStroke: { type: String, default: 'bg-gray-100' },
  bgColor: { type: String, default: 'bg-white' },
  borderSize: { type: [Number, String], default: 15 },
  round: { type: Boolean, default: false },
})

const halfOfSize = computed(() => {
  return props.size ? props.size / 2 : 0
})

const radius = computed(() => {
  return halfOfSize.value - props.borderSize / 2
})

const dashArray = computed(() => {
  return radius.value * Math.PI * 2
})

const dashOffset = computed(() => {
  return dashArray.value - (dashArray.value * props.percent) / 100
})

const attrs = computed(() => {
  return {
    'stroke-dasharray': dashArray.value,
    'stroke-dashoffset': dashOffset.value,
    'stroke-linecap': props.round ? 'round' : '',
    'stroke-linejoin': props.round ? 'round' : '',
    'stroke-width': props.borderSize + 'px',
    transform: `rotate(-90 ${halfOfSize.value} ${halfOfSize.value})`,
  }
})
</script>
