<script setup>
import { ref, watch } from 'vue'
import { themeChange } from 'theme-change'

const props = defineProps({
  boardActive: {
    type: Boolean,
    default: false,
  },
})

const themes = ['light', 'dark', 'cupcake', 'retro', 'aqua', 'fantasy', 'dracula', 'cmyk', 'acid', 'winter']

themeChange(true)
</script>

<template>
  <select class="flex-grow w-full max-w-xs rounded p-2 bg-base-500" data-choose-theme :disabled="boardActive">
    <option
      v-for="item in themes"
      :value="item"
      :key="item"
    >
      {{ item }}
    </option>
  </select>
</template>

