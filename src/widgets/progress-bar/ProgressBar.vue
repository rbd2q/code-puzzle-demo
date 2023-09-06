<style scoped>
progress {
  @apply h-2 w-full;
  &::-webkit-progress-bar {
    @apply rounded-[2px] bg-[#E4E7ED];
  }
  &::-webkit-progress-value {
    @apply rounded-[2px] bg-[#E61739];
  }
  &::-moz-progress-bar {
    @apply rounded-[2px] bg-[#E4E7ED];
  }
}
</style>

<template lang="pug">
div(class="progress-bar")
  progress(:max="maxNumber" :value="currentNumber")
  span(class="flex text-[#7E7E7E] text-[14px] leading-5 font-medium") Вопрос {{ currentNumber }} из {{ maxNumber }}
</template>

<script setup lang="ts">
interface Props {
  currentNumber?: number;
  maxNumber?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentNumber: 0,
  maxNumber: 0,
});
</script>