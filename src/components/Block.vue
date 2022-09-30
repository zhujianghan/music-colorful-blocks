<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '', // green, blue
  },
  borderColor: {
    type: String,
    default: 'border-slate-300',
  },
  showText: {
    type: Boolean,
    default: false,
  }
})

const colorsMap = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'accent': 'bg-accent',
  'info': 'bg-info',
  'success': 'bg-success',
  'warning': 'bg-warning',
  'error': 'bg-error',
  'neutral': 'bg-neutral',
}


</script>

<template>
  <div
    class="w-12 h-12 border-t border-r uppercase text-base-100 flex justify-center items-center"
    :class="(color ? colorsMap[color] : '') + ' ' + borderColor"
  >
    <span v-show="color && showText">
      {{ color.substring(0, 2) }}
    </span>
  </div>
</template>

