<template lang="pug">
div(class="w-screen h-screen")
  PuzzleEditor(v-if="updatedCodeArray" :updated-code-array="updatedCodeArray" :code-state="codeState")
  PuzzleSelectBlock(v-if="codeBlocksToSelect.length" :code-blocks-to-select="codeBlocksToSelect", :used-code-blocks="usedCodeBlocks" :code-state="codeState" @click-puzzle="clickPuzzle" @check-code="checkCode" @next-task="emit('next-task')")
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-light.css';
import PuzzleEditor from "~/src/entities/puzzle-editor/PuzzleEditor.vue";
import PuzzleSelectBlock from "~/src/entities/puzzle-select-block/PuzzleSelectBlock.vue";
import type { CodeState, TaskType, SplitCode } from "~/src/shared/types";

interface Props {
  currentTask: TaskType;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (event: "next-task"): void;
}>();

const updatedCodeArray = ref();
const activeSlotId = ref();
const usedCodeBlocks = ref<Record<number, string | null>>({});
const codeState = ref<CodeState>('not_executed');

const correctCode = computed(() => {
  return props.currentTask.correct_code;
});

const initialCode = computed(() => {
  return props.currentTask.initial_code;
});


const codeBlocksToSelect = computed(() => {
  return props.currentTask.blocks_to_select;
})


const getReviewContent = (): SplitCode[] => {
  return initialCode.value?.split('\n').map((item, index) => {
    const lineNumber = index + 1;

    const highlightedCode = hljs.highlight(
        item,
        { language: 'ts' }
    ).value;
    const codeToDisplay = highlightedCode.replaceAll('SLOT_FOR_CODE_BLOCK', `<button class="puzzle-slot relative -top-[1px] bg-white text-black flex items-center text-center min-w-[80px] w-fit h-[26px] pl-2 border border-[#E9B087] rounded-md mx-1" ></button>`);

    return {
      lineNumber,
      lineCode: codeToDisplay,
    };
  });
};


const clickPuzzle = (puzzleContent: string) => {
  const button = document.getElementById(activeSlotId.value);

  if (button) {
    const codeSlotId = activeSlotId.value.charAt(activeSlotId.value.length - 1) ?? 1;

    button.innerHTML = '<span id="puzzle-slot-content"></span><button id="puzzle-slot-delete-button" class="text-[#85A2C5] px-2 ml-2 border-l border-[#BECFE2]">&#215;</button>';

    const slotContentBlock = document.getElementById('puzzle-slot-content');
    if (slotContentBlock) {
      slotContentBlock.id = `puzzle-slot-content-${codeSlotId}`;
      slotContentBlock.innerText = puzzleContent;
    }

    const slotContentDeleteButton = document.getElementById('puzzle-slot-delete-button');
    if (slotContentDeleteButton) {
      slotContentDeleteButton.id = `puzzle-slot-content-delete-button-${codeSlotId}`;
      slotContentDeleteButton.addEventListener('click', () => {
        button.innerHTML = '';
        delete usedCodeBlocks.value[codeSlotId];
        codeState.value = 'not_executed';
        localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value));
      })
    }

    button.classList.remove('!bg-[#FFF6ED]');
    button.classList.add('!bg-[#EBF2FB]', '!border-[#BECFE2]');
    usedCodeBlocks.value[codeSlotId] = puzzleContent;
    localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value));
    activeSlotId.value = null;
  }
}

const checkCode = () => {
  let finalCode = initialCode.value;
  const slots = document.getElementsByClassName('puzzle-slot');
  const slotsArray = [...slots];

  slotsArray.map((item) => {
    finalCode = finalCode.replace('SLOT_FOR_CODE_BLOCK', item.children[0].innerText);
  })
  if (finalCode === correctCode.value) {
    codeState.value = 'correct';
  } else {
    codeState.value = 'wrong';
  }
}

onMounted(() => {
  updatedCodeArray.value = getReviewContent();

  nextTick(() => {
    const slots = document.getElementsByClassName('puzzle-slot');
    const slotsArray = [...slots];
    const itemsInStorage = JSON.parse(localStorage.getItem('answers')!);

    if (slotsArray.length) {
      slotsArray.map((slot, index) => {
        slot.id = `puzzle-slot-${index + 1}`;
        slot.addEventListener('click', () => {
          activeSlotId.value = slot.id;
        })

        if (itemsInStorage && itemsInStorage[index + 1]) {
          usedCodeBlocks.value = itemsInStorage;
          slot.innerHTML = '<span id="puzzle-slot-content"></span><button id="puzzle-slot-delete-button" class="text-[#85A2C5] px-2 ml-2 border-l border-[#BECFE2]">&#215;</button>';
          const slotContentBlock = document.getElementById('puzzle-slot-content');
          if (slotContentBlock) {
            slotContentBlock.id = `puzzle-slot-content-${index + 1}`;
            slotContentBlock.innerText = itemsInStorage[index + 1];
            slot.classList.remove('!bg-[#FFF6ED]');
            slot.classList.add('!bg-[#EBF2FB]', '!border-[#BECFE2]');
          }

          const slotContentDeleteButton = document.getElementById('puzzle-slot-delete-button');
          if (slotContentDeleteButton) {
            slotContentDeleteButton.id = `puzzle-slot-content-delete-button-${index + 1}`;
            slotContentDeleteButton.addEventListener('click', () => {
              slot.innerHTML = '';
              delete usedCodeBlocks.value[index + 1];
              codeState.value = 'not_executed';
              localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value));
            })
          }
        }
      })
    }
  })
})


watch(() => activeSlotId.value, () => {
  const slots = document.getElementsByClassName('puzzle-slot');
  const slotsArray = [...slots];
  if (slotsArray.length) {
    slotsArray.map((slot) => {
      if (slot.id === activeSlotId.value) {
        slot.classList.remove('!bg-[#EBF2FB]', '!border-[#BECFE2]');
        slot.classList.add('!bg-[#FFF6ED]');
      } else {
        slot.classList.remove('!bg-[#FFF6ED]');
        if (slot.innerHTML) {
          slot.classList.add('!bg-[#EBF2FB]', '!border-[#BECFE2]');
        }
      }
    })
  }
})
</script>
