<template lang="pug">
div(class="w-screen h-screen")
  PuzzleEditor(v-if="updatedCodeArray" :updated-code-array="updatedCodeArray" :code-state="codeState")
  PuzzleSelectBlock(v-if="codeBlocksToSelect.length" :code-blocks-to-select="codeBlocksToSelect", :used-code-blocks="usedCodeBlocks" :code-state="codeState" @click-puzzle="clickPuzzle" @check-code="checkCode" @next-task="emit('next-task')")
</template>

<script setup lang="ts">
import 'highlight.js/styles/atom-one-light.css';
import PuzzleEditor from "~/src/entities/puzzle-editor/PuzzleEditor.vue";
import PuzzleSelectBlock from "~/src/entities/puzzle-select-block/PuzzleSelectBlock.vue";
import type { Task } from "~/src/shared/types";
import { usePuzzle } from "~/src/widgets/code-puzzle/model";

interface Props {
  currentTask: Task;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (event: "next-task"): void;
}>();

const updatedCodeArray = ref();

const { usedCodeBlocks, codeState, getReviewContent, clickPuzzle, checkCode, renderSlots } = usePuzzle({
  initialCode: props.currentTask.initial_code,
  correctCode: props.currentTask.correct_code,
});

const codeBlocksToSelect = computed(() => {
  return props.currentTask.blocks_to_select;
})

onMounted(() => {
  updatedCodeArray.value = getReviewContent();

  nextTick(() => {
    renderSlots()
  })
})
</script>
