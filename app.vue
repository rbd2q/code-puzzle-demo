<template lang="pug">
div(class="w-screen h-screen")
  div(class="h-2/3 overflow-scroll bg-[#F3F4F6]")
    div(v-for="line in updatedCodeArray" class="flex items-center mb-1")
      span(class="w-[20px] mr-4") {{ line.lineNumber }}
      pre(class="flex items-start")
        code(v-html="line.lineCode" class="flex items-center")
  div(class="h-1/3 border-t border-4 border-red flex flex-col items-center p-6")
    span(class="text-2xl font-bold mb-12") Выберите код
    div(class="flex flex-wrap justify-center")
      button(v-for="block in codeBlocksToSelect" :disabled="Object.values(usedCodeBlocks).includes(block)" key="block" @click="clickPuzzle(block)" class="bg-[#FFF6ED] disabled:bg-[#F6F4F1] border border-[#EBE0CC] disabled:border-[#EBE0CC] disabled:opacity-50 w-fit whitespace-nowrap rounded-md p-2 m-2") {{ block }}
    div(class="w-full mt-8")
      button(:disabled="Object.keys(usedCodeBlocks).length !== codeBlocksToSelect.length" class="w-full text-white py-2 disabled:bg-[#F3F4F6] disabled:text-[#CFCFCF] bg-[#E61739]" @click="checkCode") Отправить
</template>

<script setup lang="ts">
const initialCode = ref(`export const formatDurationWithLabels = (totalSeconds: number | undefined): string => {
  if (!*SLOT_FOR_CODE*) {
    return '0';
  }

  totalSeconds = Math.floor(totalSeconds);
  if (totalSeconds < 0) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = *SLOT_FOR_CODE*;

  const durationParts: string[] = [];
  if (hours > 0) {
    durationParts.push(*SLOT_FOR_CODE*);
  }
  if (hours > 0 || minutes > 0) {
    durationParts.push(*SLOT_FOR_CODE*);
  }
  durationParts.push(*SLOT_FOR_CODE*);

  return durationParts.join(' ');
};`)

const updatedCode = ref('');
const updatedCodeArray = ref();
const activeSlotId = ref();

const codeBlocksToSelect = ['first code', 'second code', 'third code', 'Math.floor(totalSeconds / 3600)', 'hours > 0 || minutes > 0']
const usedCodeBlocks = ref<Record<number, string | null>>({})


const getReviewContent = () => {
  return updatedCode.value?.split('\n').map((item, index) => {
    const lineNumber = index + 1;

    return {
      lineNumber,
      lineCode: item,
    };
  });
};


const clickPuzzle = (puzzleContent: string) => {
  const button = document.getElementById(activeSlotId.value);

  if (button) {
    const codeSlotId = activeSlotId.value.charAt(activeSlotId.value.length - 1) ?? 1;

    button.innerHTML = '<div class="flex" ><span id="puzzle-slot-content"></span><button id="puzzle-slot-delete-button" class="text-[#85A2C5] px-2 ml-2 border-l border-[#BECFE2]">&#215;</button</div>'

    const slotContentBlock = document.getElementById('puzzle-slot-content');
    if (slotContentBlock) {
      slotContentBlock.id = `puzzle-slot-content-${codeSlotId}`;
      slotContentBlock.innerText = puzzleContent;
    }

    const slotContentDeleteButton = document.getElementById('puzzle-slot-delete-button');
    if (slotContentDeleteButton) {
      slotContentDeleteButton.id = `puzzle-slot-content-delete-button-${codeSlotId}`
      slotContentDeleteButton.addEventListener('click', () => {
        button.innerHTML = '';
        delete usedCodeBlocks.value[codeSlotId];
        localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value))
      })
    }

    button.classList.remove('!bg-[#FFF6ED]');
    button.classList.add('!bg-[#EBF2FB]', '!border-[#BECFE2]');
    usedCodeBlocks.value[codeSlotId] = puzzleContent;
    localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value))
    activeSlotId.value = null;
  }
}

const checkCode = () => {
  console.log('check code', usedCodeBlocks.value);
}

onMounted(async () => {
  updatedCode.value = initialCode.value.replaceAll('*SLOT_FOR_CODE*', `<button class="puzzle-slot bg-white flex items-center text-center min-w-[80px] w-fit h-[26px] pl-2 py-1 border border-[#E9B087] rounded-md" ></button>`);
  updatedCodeArray.value = getReviewContent();

  nextTick(() => {
    const slots = document.getElementsByClassName('puzzle-slot');
    const slotsArray = [...slots];
    const itemsInStorage = JSON.parse(localStorage.getItem('answers')!)

    if (slotsArray.length) {
      slotsArray.map((slot, index) => {
        slot.id = `puzzle-slot-${index + 1}`;
        slot.addEventListener('click', () => {
          activeSlotId.value = slot.id;
        })

        if (itemsInStorage && itemsInStorage[index + 1]) {
          usedCodeBlocks.value = itemsInStorage;
          slot.innerHTML = '<div class="flex" ><span id="puzzle-slot-content"></span><button id="puzzle-slot-delete-button" class="text-[#85A2C5] px-2 ml-2 border-l border-[#BECFE2]">&#215;</button</div>';
          const slotContentBlock = document.getElementById('puzzle-slot-content');
          if (slotContentBlock) {
            slotContentBlock.id = `puzzle-slot-content-${index + 1}`;
            slotContentBlock.innerText = itemsInStorage[index + 1];
            slot.classList.remove('!bg-[#FFF6ED]');
            slot.classList.add('!bg-[#EBF2FB]', '!border-[#BECFE2]');
          }

          const slotContentDeleteButton = document.getElementById('puzzle-slot-delete-button');
          if (slotContentDeleteButton) {
            slotContentDeleteButton.id = `puzzle-slot-content-delete-button-${index + 1}`
            slotContentDeleteButton.addEventListener('click', () => {
              slot.innerHTML = '';
              delete usedCodeBlocks.value[index + 1];
              localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value))
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
