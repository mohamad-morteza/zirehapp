<template>
  <div
    class="counter-input border rounded-xl md:rounded-2xl h-[45px] md:h-[52px] flex items-center px-3 md:px-6 py-2"
    :class="focused ? 'border-primary' : 'border-[#CACACA]'"
  >
    <i
      class="ic-plus-2 text-[8px] md:text-base"
      :class="
        disabledIncrement ? 'text-[#D9D9D9] cursor-not-allowed' : 'text-primary cursor-pointer'
      "
      @click="increase"
    />
    <input
      v-model="model"
      :placeholder="placeholder"
      type="number"
      class="appearance-none min-w-[75px] bg-transparent h-full flex-grow focus:outline-none text-center text-base-t placeholder:text-xs md:placeholder:text-base text-xs md:text-base mr-2 md:mr-4"
      :class="inputClass"
      @focus="onFocus"
      @blur="onBlur"
    >
    <i
      class="ic-minus-2 text-[12px] md:text-base mb-3"
      :class="
        disabledDecrement ? 'text-[#D9D9D9] cursor-not-allowed' : 'text-primary cursor-pointer'
      "
      @click="decrease"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  step: { type: [Number, String], default: 1 },
  min: { type: [Number, String], default: 0 },
  max: { type: [Number, String], default: 1000 },
  placeholder: { type: String, default: '' },
  inputClass: { type: String, default: '' },
})

let model = defineModel({ default: '' })

let focused = ref(false)

const disabledIncrement = computed(() => {
  return model.value >= props.max
})

const disabledDecrement = computed(() => {
  return model.value === 0 || model.value <= props.min
})

function increase() {
  if (disabledIncrement.value) return
  model.value += props.step * 1
}
function decrease() {
  if (disabledDecrement.value) return
  model.value -= props.step * 1
}

function onFocus() {
  focused.value = true
}

function onBlur() {
  focused.value = false
}
</script>

<style>
.counter-input {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
