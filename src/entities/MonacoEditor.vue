<template>
  <div
      ref="mContainer"
      class="w-full h-full min-h-[300px] pt-3 bg-[#0b0f17] box-border"
  ></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";

interface Props {
  modelValue?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions | null;
  run?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  options: null,
  run: () => {},
});

const emit = defineEmits([
  "editorDidMount",
  "update:modelValue",
  "onDidUpdateDiff",
]);
let editor:
    | monaco.editor.IStandaloneCodeEditor
    | monaco.editor.IStandaloneDiffEditor
    | null = null;

const mContainer = ref<HTMLElement | null>(null);

watch(
    () => props.options,
    (options) => {
      if (editor && options) {
        editor.updateOptions(options);
      }
    },
    { deep: true }
);

const _getEditor = () => {
  if (!editor) {
    return null;
  }
  return editor;
};

watch(
    () => props.modelValue,
    (newVal) => {
      const _editor = _getEditor();
      if (!_editor) {
        return;
      }
      const editorValue = _editor.getValue();
      if (editorValue === newVal) {
        return;
      }
      _editor.setValue(newVal);
    }
);


const initMonaco = async () => {
  editor = monaco.editor[ "create"](
      mContainer.value!,
      {
        value: props.modelValue,
        language: 'typescript',
        ...props.options,
      }
  );


  editor.addCommand(monaco.KeyMod.CtrlCmd | 3, () => {
    if (props.run) {
      props.run();
    }
  });


    (editor as monaco.editor.IStandaloneCodeEditor).onDidChangeModelContent(
        () => {
          const value = (
              editor as monaco.editor.IStandaloneCodeEditor
          ).getValue();
          if (props.modelValue !== value) {
            emit("update:modelValue", value);
          }
        }
    );


  emit("editorDidMount", editor);
};

onMounted(() => {
  initMonaco();
});

onBeforeUnmount(() => {
  editor && editor.dispose();
});
</script>
