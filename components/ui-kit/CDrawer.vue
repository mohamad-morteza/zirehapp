<template>
  <Teleport to="body" >
    <Transition name="fade">
      <div
        v-show="model"
        class="fixed inset-0 z-[1000] "
        :class="{ 'invisible opacity-0': !model, 'visible opacity-100 transition-opacity duration-300': model }"
      >
        <div
          class="absolute bg-white z-[1001] transition-transform duration-700 ease-in-out h-[100vh]"
          :class="[
            position === 'left' && 'left-0 inset-y-0 rounded-r-2xl',
            position === 'right' && 'right-0 inset-y-0 rounded-l-2xl',
            position === 'top' && 'top-0 inset-x-0 rounded-b-2xl',
            position === 'bottom' && 'bottom-0 inset-x-0 rounded-t-2xl',
            contentClass,
            model ? 'translate-x-0 translate-y-0'
            : position === 'left' ? '-translate-x-full'
              : position === 'right' ? 'translate-x-full'
                : position === 'top' ? '-translate-y-full' : 'translate-y-full',
          ]"
          :style="{ [position === 'top' || position === 'bottom' ? 'height' : 'width']: size }"
        >
          <slot />
        </div>
        <div
          class="absolute inset-0 bg-black/50 cursor-pointer"
          @click="closeDrawer"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    default: 'right',
    validator: value => ['left', 'right', 'top', 'bottom'].includes(value),
  },
  size: {
    type: String,
    default: '290px',
  },
  contentClass: {
    type: String,
    default: '',
  },
})

const model = defineModel( { default: false })

const closeDrawer = () => {
  model.value = false
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
