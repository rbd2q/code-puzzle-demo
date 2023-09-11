<style scoped lang="scss">
.quiz-block {
  @apply flex flex-col max-w-[672px] px-4 w-full mx-auto;
  :deep(.g-quiz) {
    --text-color: #000000;
    --answer-bg: #ffffff;
    --answer-bg--hover: white;
    --answer-bg--click: white;
    --answer-bg--disabled: white;
    --correct-color: transparent;
    @apply font-medium;

    & > div:nth-child(3) {
      @apply w-full;
    }

    & .g-quiz__question {
      @apply my-6 text-[20px] leading-6;
      @screen lg {
        @apply text-[24px] leading-7 mt-8;
      }
    }

    & .g-quiz__code-block  {
      @apply bg-[#F3F4F6] p-2 rounded-md mb-4;
    }

    & .g-quiz__answers-title {
      @apply mb-4 text-[16px] leading-5 text-black font-sans font-medium opacity-100;
    }
    & .g-quiz__answer-item {
      @apply relative border-[2px] border-[#CACED9] rounded mt-2 first-of-type:mt-0 p-4 pl-[42px] text-[16px] leading-5 text-black font-medium font-sans text-left;

      &::before {
        content: "";
        @apply absolute left-4 top-[18px] bg-transparent w-[18px] h-[18px] border-[2px] border-[#CACED9] rounded-full;
      }

      &.picked {
        @apply border-[#BE0238];
        &::after {
          content: "";
          @apply absolute left-[19px] top-[21px] bg-[#BF0039] w-3 h-3 rounded-full;
        }
      }
      &.correct {
        @apply border-green-700;
      }
      &.incorrect {
        @apply border-[#BE0238];
        &::after {
          content: "";
          @apply absolute left-[19px] top-[21px] bg-[#BF0039] w-3 h-3 rounded-full;
        }
      }
    }
  }
}

.action-button {
  @apply flex items-center justify-center mt-6 w-full h-12 p-2 bg-[#E61739] rounded text-white;
  &:disabled {
    @apply bg-[#F3F4F6] text-[#CFCFCF] cursor-not-allowed;
  }
}
</style>

<template lang="pug">
div(class="quiz-block")
  GQuizLight(
    v-show="showQuizScreen",
    :question="currentQuestion",
    :hide-answer="true"
    text-pick-answer-title
    confirm-text="Проверить"
    next-text="Продолжить"
    textPickAnswerTitle="Выбери ответ"
    @next="nextQuestion"
    @answer="answerQuestion"
  )
    template(#action-button="{ onclick, disabled, text }")
      button(
        class="action-button"
        :disabled="disabled",
        @click="onclick"
      ) {{ text }}
</template>

<script setup lang="ts">
import { GQuizLight } from "@geeckocom/activity-ui";
import type { Task } from "~/src/shared/types";
import { tasksModel } from "~/src/entities/store/tasks";

interface Props {
  currentTask: Task;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (event: "next-task"): void;
}>();

const storeTasks = tasksModel.useTasksStore();

const showRegistrationScreen = ref(false);
const showQuizScreen = ref(true);

const currentQuestion = ref(props.currentTask);

const nextQuestion = () => {
  showQuizScreen.value = false;
  showRegistrationScreen.value = true;
  emit('next-task')
};

const answerQuestion = async (answerId: number) => {
  await storeTasks.checkQuizTask(currentQuestion.value.id, answerId)
};

watch(() => props.currentTask, () => {
  currentQuestion.value = props.currentTask
});
</script>
