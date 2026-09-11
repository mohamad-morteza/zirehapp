<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'fill',
    validator: value => ['fill', 'outline', 'text'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'success', 'danger'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
})

const tag = computed(() => {
  return props.href ? 'a' : 'button'
})

const baseClasses = 'rounded-full transition duration-200'

const sizeClasses = computed(() => ({
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-[11px] text-base',
  lg: 'px-5 py-3 text-lg',
}[props.size]))

const colorClasses = computed(() => {
  const colors = {
    primary: 'text-white bg-primary border-primary hover:bg-primary',
    success: 'text-white bg-green-600 border-green-600 hover:bg-green-700',
    danger: 'text-white bg-red-600 border-red-600 hover:bg-red-700',
  }
  return colors[props.color]
})

const variantClasses = computed(() => {
  if (props.variant === 'outline') {
    return `border ${colorClasses.value.replace('bg-', 'border-').replace('text-white', 'text-primary bg-transparent hover:text-white')}`
  }
  if (props.variant === 'text') {
    return 'bg-transparent shadow-none border-none hover:underline'
  }
  return colorClasses.value
})
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :disabled="disabled"
    :class="`${baseClasses} ${sizeClasses} ${variantClasses} hover:brightness-105 disabled:opacity-50 disabled:select-none flex items-center justify-center`"
  >
    <nuxt-icon
      v-if="loading"
      name="loading"
      class="text-base ic-loading"
    />
    <slot v-else />
  </component>
</template>
