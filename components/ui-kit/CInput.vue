<template>
  <div
    class="base-input border"
    :class="[baseInputClass , focused ? 'border-primary' : 'border-[#CACACA]']"
    :data-type="type"
    
  >
    <span
      v-if="loading"
      class="base-input-loading ic-loading"
    />

    <i
      class="i-border-top"
      :style="{ right: labelWidth }"
    />

    <i class="i-border-bottom" />

    <div
      v-if="prefix || $slots.prefix"
      class="base-input-prefix"
    >
      <slot name="prefix">
        {{ prefix }}
      </slot>
    </div>

    <label
      v-if="labelText"
      ref="labelRef"
      :for="cid"
      :class="{ active: showLabel }"
      @click.prevent="focus"
      v-text="labelText"
    />

    <textarea
      v-if="type === 'textarea'"
      ref="input"
      v-model="selfValue"
      v-bind="attributes"
      v-on="listeners"
       @focus="onFocus"
      @blur="onBlur"
    />

    <input
      v-else
      ref="input"
      v-model="selfValue"
      v-bind="attributes"
      v-on="listeners"
       @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="fireEnterPressed"

    />

    <div
      v-if="type === 'password'"
      class="base-input-suffix me-[15px]"
      @click.stop="isPasswordShown = !isPasswordShown"
    >
      <slot name="suffix">
        <i :class="isPasswordShown ? 'ic-hide' : 'ic-view'" />
      </slot>
    </div>

    <div
      v-if="suffix || $slots.suffix"
      class="base-input-suffix me-[15px]"
    >
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </div>

    <span
      v-if="tips && focused"
      class="base-input-tips"
      v-text="tips"
    />

    <div
      v-if="error"
      class="base-input-error"
      v-text="error"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: '' },
  modelValue: { type: [String, Number, Object, Array], default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rules: { type: [String, Object, RegExp], default: '' },
  wrapperClass: { type: String, default: '' },
  inputClass: { type: String, default: '' },
  error: { type: String, default: '' },
  ltr: { type: Boolean, default: false },
  numeric: { type: Boolean, default: false },
  convertNumbers: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: [String, Boolean], default: '' },
  tips: { type: String, default: '' },
  id: { type: String, default: '' },
  min: { type: Number, default: undefined },
  max: { type: Number, default: undefined },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  tabindex: { type: String, default: '1' },
  autoFocus: { type: Boolean, default: false },
  color: { type: String, default: '#918F8F' },
  rounded: { type: String, default: '10px' },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input','enterPressed'])

const attrs = useAttrs()

const labelRef = ref(null)
const input = ref(null)

const focused = ref(false)
const isPasswordShown = ref(false)
const labelWidth = ref('')

const selfValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const labelText = computed(() => {
  return props.label
})

const showLabel = computed(() => {
  return !(!focused.value && labelText.value && selfValue.value === '')
})

const isDisabled = computed(() => {
  return props.disabled || props.loading
})

const cid = computed(() => {
  return props.id || 'zi-input_' + Math.random().toString(36).substring(2)
})

const attributes = computed(() => {
  const attributes = {
    ...attrs,
    id: cid.value,
    name: props.name,
    tabindex: props.tabindex,
    placeholder: props.placeholder,
    disabled: isDisabled.value,
    type: isPasswordShown.value ? 'text' : props.type,
    class: ['the-input', `direction-${props.ltr ? 'ltr' : 'rtl'}`, props.inputClass],
  }
  if (props.type === 'textarea') delete attributes.type
  return attributes
})

const listeners = computed(() => {
  return {
    focus: onFocus,
    blur: onBlur,
  }
})

const isEmpty = computed(() => {
  return selfValue.value === ''
})

const baseInputClass = computed(() => {
  return [
    {
      'empty': isEmpty.value,
      'focused': focused.value,
      'has-error': props.error,
    },
    props.wrapperClass,
    `direction-${props.ltr ? 'ltr' : 'rtl'}`,
  ]
})

const color = computed(() => {
  return props.color
})

watch(
  () => props.autoFocus,
  (val) => {
    if (val) focus()
  },
  { immediate: true },
)

watch(focused, () => {
  setLabelWidth()
})

watch(
  isEmpty,
  () => {
    setLabelWidth()
  },
  { immediate: true },
)

function onFocus(e) {
  focused.value = true
  emit('focus', e)
}

function onBlur(e) {
  focused.value = false
  emit('blur', e)
  const val = selfValue.value
  if (val === '') return
  if (props.min !== undefined && val * 1 < props.min) {
    selfValue.value = String(props.min)
  }
  if (props.max !== undefined && val * 1 > props.max) {
    selfValue.value = String(props.max)
  }
}

function focus() {
  nextTick(() => {
    if (input.value) input.value.focus()
  })
}

function blur() {
  nextTick(() => {
    if (input.value) input.value.blur()
  })
}

function setLabelWidth() {
  setTimeout(() => {
    if (labelRef.value && (focused.value || (!focused.value && !isEmpty.value))) {
      labelWidth.value = labelRef.value.offsetWidth + 28 + 'px'
    }
    else {
      labelWidth.value = '15px'
    }
  }, 100)
}
const fireEnterPressed = ()=>{
  emit('enterPressed')
}
</script>

<style>
.base-input {
  position: relative;
  background-color: transparent;
  border-radius: v-bind('rounded');
  display: flex;
  align-items: center;

  /* &:before,
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 100%;
    border: solid 1px v-bind('color');
    border-left-width: 0;
    border-radius: 0 v-bind('rounded') v-bind('rounded') 0;
    content: '';
    transition: all 0.3s ease;
  }

  &:after {
    right: auto;
    left: 0;
    border-left-width: 1px;
    border-right-width: 0;
    border-radius: v-bind('rounded') 0 0 v-bind('rounded');
  }

  i.i-border-top,
  i.i-border-bottom {
    position: absolute;
    left: 15px;
    right: 15px;
    border-top: solid 1px transparent;
    transition: all 0.3s ease;
    background-color: v-bind('color');
  }

  i.i-border-top {
    top: 0;
  }

  i.i-border-bottom {
    bottom: 0;
  } */

  label {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: v-bind('color');
    transition: all 0.3s ease;
    z-index: 4;
    cursor: text;
  }

  &.focused {
    label {
      top: 0;
      right: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      color: #02aa9b;
    }
  }

  &:not(.empty) {
    label {
      top: -5px;
      right: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: #fff;
      padding: 0 5px;
    }
  }

  &.direction-ltr {
    direction: ltr;
    text-align: left;
  }

  .the-input {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    position: relative;
    z-index: 3;
    font-weight: 500;
    min-height: 46px;
    font-size: 20px;
    padding-right: 16px;
    padding-left: 16px;
    outline: none;
    width: 100%;
    font-family: inherit;
    html[dir='ltr'] {
      direction: ltr;
    }
    html[dir='rtl'] {
      direction: rtl;
    }
  }

    &::placeholder {
      transition: all 0.3s ease;
      font-weight: 400;
      font-size: 16px;
      color: v-bind('color');
    }

    &.en,
    &.en-content,
    &.direction-ltr,
    &[type='tel'],
    &[type='email'] {
      &:not(:placeholder-shown) {
        direction: ltr !important;
        text-align: left !important;
      }
    }

    &.en,
    &.en-content,
    &[type='email'] {
      &:not(:placeholder-shown) {
        font-family: sans-serif;
      }
    }

    &:focus::placeholder {
      opacity: 0;
    }
    &:disabled {
      -webkit-text-fill-color: #a09e9e;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  &[data-type='textarea'] {
    padding-top: 12px;
    textarea {
      padding-top: 0;
    }
  }

  .base-input-prefix {
    padding-right: 15px;
  }
  .base-input-loading,
  .base-input-caret {
    position: absolute;
    left: 10px;
    top: 50%;
  }

  .base-input-loading {
    margin-top: -7px;
  }

  &.focused {
    &:before,
    &:after {
    &:after {
      border-color: #02aa9b;
    }

    i.i-border-top,
    i.i-border-bottom {
      border-top-color: #02aa9b;
    }
  }

  &.has-error {
    label {
      color: #ff3e48;
    }

    &:before,
    &:after {
      border-color: #ff3e48;
    }

    i.i-border-top,
    i.i-border-bottom {
      border-top-color: #ff3e48;
    }

    .the-input {
      color: #ff3e48 !important;
      border-color: #ff3e48;
      &::placeholder {
        color: #ff3e48 !important;
      }
    }
  }

  .base-input-tips {
    position: absolute;
    right: 0;
    left: 0;
    top: 100%;
    padding: 0 20px;
    font-size: 11px;
    opacity: 0.5;
  }

  .base-input-error {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    color: #ff3e48;
    font-size: 12px;
    z-index: 2;
    padding-top: 4px;
  }

  &.en-content {
    &.focused .the-input {
      direction: ltr;
      text-align: left;
      font-family: sans-serif;
    }
  }
}
</style>
