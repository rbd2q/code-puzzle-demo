<template lang="pug">
CodePuzzle(v-if="currentTask && currentTask.type === 'code-puzzle'" :key="currentTask.id" :current-task="currentTask" @next-task="handleNextTask")
QuizTask(v-if="currentTask && currentTask.type === 'quiz'" :key="currentTask.id" :current-task="currentTask" @next-task="handleNextTask")
</template>

<script setup lang="ts">
import CodePuzzle from "~/src/widgets/code-puzzle/CodePuzzle.vue";
import { tasksModel } from "~/src/entities/store/tasks";
import QuizTask from "~/src/features/quiz-task/QuizTask.vue";
import { TASKS_MOCK } from "~/src/shared/mocks/tasksMock";

const storeTasks = tasksModel.useTasksStore();
const currentTaskIndex = ref(0);

const tasks = computed(() => {
  return TASKS_MOCK;
});

const currentTask = computed(() => {
  if (!tasks.value?.length) {
    return;
  }
  return tasks.value[currentTaskIndex.value];
});

const handleNextTask = () => {
  if (tasks.value && currentTaskIndex.value + 1 < tasks.value.length) {
    currentTaskIndex.value = currentTaskIndex.value + 1;
    localStorage.removeItem('answers');
  }
}

onMounted(() => {
  storeTasks.getTasks();
})
</script>
