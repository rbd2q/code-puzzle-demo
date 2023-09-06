<template lang="pug">
div(class="flex flex-col max-w-[640px] w-full mx-auto")
  ProgressBar(maxNumber=16 currentNumber=2)
  QuizBlock
</template>
  
<script setup lang="ts">
import QuizBlock from "~/src/features/quiz-block/QuizBlock.vue";
import ProgressBar from "~/src/widgets/progress-bar/ProgressBar.vue";
import PuzzleEditor from "~/src/entities/puzzle-editor/PuzzleEditor.vue";
</script>