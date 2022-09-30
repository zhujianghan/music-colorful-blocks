<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '', // green, blue
  },
  borderColor: {
    type: String,
    default: 'border-slate-100',
  },
})

const colorsMap = {
  'red': 'bg-red-400',
  'green': 'bg-green-400',
  'blue': 'bg-blue-400',
  'yellow': 'bg-yellow-400',
  'fuchsia': 'bg-fuchsia-400',
}


</script>

<template>
  <div
    class="w-12 h-12 border"
    :class="(color ? colorsMap[color] : '') + ' ' + borderColor"
  />
</template>

