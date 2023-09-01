<style scoped>

</style>


<template lang="pug">
div(class="h-1/3 border-t border-4 border-red flex flex-col items-center p-6 overflow-scroll")
  span(class="text-2xl font-bold mb-12") Выберите код
  div(class="flex flex-wrap justify-center")
    button(v-for="block in codeBlocksToSelect" :key="block" :disabled="Object.values(usedCodeBlocks).includes(block)" key="block" @click="emit('click-puzzle', block)" class="bg-[#FFF6ED] disabled:bg-[#F6F4F1] border border-[#EBE0CC] disabled:border-[#EBE0CC] disabled:opacity-50 w-fit whitespace-nowrap rounded-md p-2 m-2") {{ block }}
  div(class="w-full flex justify-center mt-8")
    button(:disabled="Object.keys(usedCodeBlocks).length !== codeBlocksToSelect?.length" class="w-full max-w-2xl text-white py-2 disabled:bg-[#F3F4F6] disabled:text-[#CFCFCF] bg-[#E61739]" @click="codeState === 'not_executed' ? emit('check-code') : emit('next-task')") {{ codeState === 'not_executed' ? 'Проверить' : 'Следующий вопрос' }}
</template>

<script setup lang="ts">
import type { CodeState } from "~/src/shared/types";

interface Props {
  codeBlocksToSelect: string[];
  usedCodeBlocks: Record<string, string | null>;
  codeState: CodeState;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (event: "click-puzzle", block: string): void;
  (event: "check-code",): void;
  (event: "next-task"): void;
}>();
</script>
