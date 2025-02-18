<template>
  <div class="position-relative">
    <div ref="editorContainer" class="editor-container open-sans"></div>
    <FiledError :error />
  </div>
</template>

<script setup>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
// import Italic from '@editorjs/italic';
import Marker from "@editorjs/marker";
import Image from "@editorjs/image";
import FiledError from "./FiledError.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";

const props = defineProps({
  error: {
    type: Array,
  },
  label: {
    type: String,
  },
  content: {
    type: Object,
    default: {},
  },
});

const editorContainer = ref(null);
const data = ref("");
let editor = null;

const initializeEditor = async () => {
  editor = new EditorJS({
    holder: editorContainer.value, // Attach to the ref
    tools: {
      Heading: {
        class: Header,
        // inlineToolbar: true,
        // // inlineToolbar: ["link"],
        // config: {
        //   levels: [3, 4, 5, 6],
        //   default: 3,
        // },
        toolbox: [
          {
            title: "Heading 3",
            data: {
              level: 3,
            },
          },
          {
            title: "Heading 4",
            data: {
              level: 4,
            },
          },
          {
            title: "Heading 5",
            data: {
              level: 5,
            },
          },
          {
            title: "Heading 6",
            data: {
              level: 6,
            },
          },
        ],
      },
      list: {
        class: List,
        // inlineToolbar: true,
        // config: {
        //   defaultStyle: "unordered",
        // },
        toolbox: [
          {
            title: "List",
            data: {
              style: "unordered",
            },
          },
          {
            title: "Numrice List",
            data: {
              style: "ordered",
            },
          },
        ],
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
      },
      inlineCode: {
        class: InlineCode,
        inlineToolbar: true,
      },
      // italic: {
      //   class: Italic,
      //   inlineToolbar: true,
      // },
      marker: {
        class: Marker,
        inlineToolbar: true,
      },
      image: {
        class: Image,
        inlineToolbar: true,
        config: {
          uploader: {
            uploadByUrl: async (url) => {
              return {
                success: 1,
                file: {
                  url: url,
                },
              };
            },
          },
        },
      },
    },
    placeholder: props.label,
    // onReady: () => {
    //   // Render blocks after Editor.js is fully ready
    //   // if (props.content.blocks) {
    //   console.log(props.content);
    //   editor.blocks.render(props.content);
    //   // }
    // },
  });
};

const getContent = async () => {
  if (editor) {
    const savedData = await editor.save();
    return savedData;
  }
};
onMounted(async () => {
  // await initializeEditor();
  initializeEditor();
  if (props.content.blocks) {
    //   console.log(props.content.blocks);
    //   editor.blocks.render(props.content.blocks);
  }
  watch(
    () => props.content,
    (newContent) => {
      if (newContent?.blocks && Array.isArray(newContent.blocks)) {
        editor.blocks.render({ blocks: newContent.blocks });
      }
    },
    { immediate: true } // Run on the first render as well
  );
});

onBeforeMount(() => {
  if (editor) {
    editor.destroy();
  }
});

defineExpose({ getContent });
</script>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid #9b9b9b;
  border-radius: 6px;
  padding: 16px;
  margin: 0;
  min-height: 250px;
  // overflow: auto;
  ::v-deep .codex-editor__redactor {
    padding-bottom: 0 !important;
  }
}
</style>
