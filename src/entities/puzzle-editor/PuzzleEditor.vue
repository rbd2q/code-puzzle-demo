<style scoped>

</style>

<template lang="pug">
div(class="h-2/3 relative rounded-[2px] border border-b-0 border-[#F3F4F6]" :class="{'!border-[#4EAD69]' : codeState === 'correct', '!border-[#E61739]' : codeState === 'wrong',}")
    div(class="absolute -bottom-[11px] flex items-center w-full h-6 text-center bg-transparent")
      div(class="relative -left-[1px] flex flex-grow h-1 rounded-bl-[2px] border-b border-l bg-transparent" :class="{'border-[#4EAD69]' : codeState === 'correct', 'border-[#E61739]' : codeState === 'wrong',}")
      h2(v-if="codeState === 'correct' || codeState === 'wrong'" class="font-medium px-[9px]")
        span(v-if="codeState === 'correct'" class="text-[#4EAD69]") Круто! Это правильный код
        span(v-if="codeState === 'wrong'" class="text-[#E61739]") Где-то была ошибка
      div(class="relative -right-[1px] flex flex-grow h-1 rounded-br-[2px] border-b border-r bg-transparent" :class="{'border-[#4EAD69]' : codeState === 'correct', 'border-[#E61739]' : codeState === 'wrong',}")
    div(class="h-full overflow-scroll py-3 bg-[#F3F4F6] rounded-[2px]" :class="{ '!bg-[#FFF2F2]': codeState === 'wrong', '!bg-[#EEF8EA]': codeState === 'correct' }")
      div(v-for="line in updatedCodeArray" class="flex items-center mb-1")
        span(class="w-[20px] mx-4") {{ line.lineNumber }}
        pre(class="flex items-start")
          code(v-html="line.lineCode" class="flex items-center")
</template>

<script setup lang="ts">

export type CodeLine = {
  lineNumber: number;
  lineCode: string;
};

export type CodeState = 'correct'| 'wrong' | 'not_executed';

interface Props {
  updatedCodeArray: CodeLine[];
  codeState: CodeState;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

