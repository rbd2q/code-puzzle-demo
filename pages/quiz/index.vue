<template lang="pug">
div(class="flex flex-col max-w-[672px] px-4 w-full mx-auto")
  ProgressBar(maxNumber=16 currentNumber=2)
  QuizTask
</template>

<script setup lang="ts">
import ProgressBar from "~/src/widgets/progress-bar/ProgressBar.vue";
import QuizTask from "~/src/features/quiz-task/QuizTask.vue";
</script>
