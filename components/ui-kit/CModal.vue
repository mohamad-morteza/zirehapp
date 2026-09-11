<template>
  <Transition v-bind="transition">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black bg-opacity-80 z-[1]"
        @click.self="close"
      />

      <!-- Dialog -->
      <div
        ref="dialog"
        :class="dialogClasses"
        class="relative z-[2] bg-white"
      >
        <!-- Header -->
        <header
          v-if="hasHeader"
          :class="['zi-modal__header flex justify-between items-center pb-4', headerClass]"
        >
          <slot name="header">
            <span class="ft-modal__title">{{ title }}</span>
          </slot>
        </header>

        <!-- Body -->
        <div class="zi-modal__body">
          <slot />
        </div>

        <!-- Footer -->
        <footer
          v-if="hasFooter"
          :class="['zi-modal__footer', footerClass]"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: null },
  show: { type: Boolean, default: false },
  width: { type: String, default: 'max-w-xl' },
  plain: { type: Boolean, default: false },
  showClose: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: undefined },
  headerClass: { type: [Object, Array, String], default: null },
  bodyClass: { type: [Object, Array, String], default: null },
  footerClass: { type: [Object, Array, String], default: null },
})

const isVisible = defineModel({ default: false })

const transition = computed(() => ({
  'enter-active-class': 'transition-opacity ease-out duration-300',
  'enter-from-class': 'opacity-0',
  'enter-to-class': 'opacity-100',
  'leave-active-class': 'transition-opacity ease-in duration-200',
  'leave-from-class': 'opacity-100',
  'leave-to-class': 'opacity-0',
}))

const hasHeader = computed(() => !props.plain && props.showHeader !== false)
const hasFooter = computed(() => !props.plain)

const dialogClasses = computed(() => [
  'zi-modal__dialog',
  { 'p-4 sm:p-6': !props.plain },
  props.width,
  props.bodyClass,
])

function close() {
  isVisible.value = false
}
</script>
