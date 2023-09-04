import {CodeState, SplitCode} from "~/src/shared/types";
import hljs from "highlight.js/lib/core";

export const usePuzzle = ({initialCode, correctCode}: {
  initialCode: string;
  correctCode: string;
}) => {
  const activeSlotId = ref();
  const slotsArray = ref<Element[]>([]);
  const usedCodeBlocks = ref<Record<number, string | null>>({});
  const codeState = ref<CodeState>('not_executed');


  const getReviewContent = (): SplitCode[] => {
    return initialCode?.split('\n').map((item, index) => {
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
    let finalCode = initialCode;

    slotsArray.value.map((item) => {
      // @ts-ignore
      finalCode = finalCode.replace('SLOT_FOR_CODE_BLOCK', item.children[0].innerText);
    })
    if (finalCode === correctCode) {
      codeState.value = 'correct';
    } else {
      codeState.value = 'wrong';
    }
  }

  const renderSlots = () => {
    const slots = document.getElementsByClassName('puzzle-slot');
    slotsArray.value = [...slots];
    const itemsInStorage = JSON.parse(localStorage.getItem('answers')!);

    if (slotsArray.value.length) {
      slotsArray.value.map((slot, index) => {
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
              localStorage.setItem('answers', JSON.stringify(usedCodeBlocks.value));
            })
          }
        }
      })
    }
  }

  watch(() => activeSlotId.value, () => {
    if (slotsArray.value.length) {
      slotsArray.value.map((slot) => {
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

  watch(() => codeState.value, (val) => {
    if (val !== 'not_executed') {
      if (slotsArray.value.length) {
        slotsArray.value.map((slot, index) => {
          // @ts-ignore
          slot.disabled = true;
          const slotContentDeleteButton = document.getElementById(`puzzle-slot-content-delete-button-${index + 1}`);
          if (slotContentDeleteButton) {
            // @ts-ignore
            slotContentDeleteButton.disabled = true;
          }
        })
      }
    }
  })

  return { usedCodeBlocks, activeSlotId, codeState, getReviewContent, clickPuzzle, checkCode, renderSlots }
}
