import hljs from "highlight.js";
import 'highlight.js/styles/vs.css'

export default defineNuxtPlugin(() => {
  const tsLangOptions = hljs.getLanguage("ts")!;
});
