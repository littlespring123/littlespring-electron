<template>
  <button @click="handle">
    <slot>{{ title }}</slot>
  </button>
</template>
<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
defineProps({
  title: {
    type: String,
    default: "",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  //   size: {
  //     type: String | Number,
  //     default: '12px',
  //   },
  //   color:{
  //     type: String,
  //     default: '#000',
  //   },
});
const emits = defineEmits(["Click"]);
const handle = () => {
  emits("Click");
};
</script>

<style scoped lang="scss">
button {
  width: auto;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 0.6em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: v-bind(backgroundColor);
  background-color: v-bind(themeColor);
  cursor: pointer;
  transition: 0.25s;
  margin: 3px;
}

button:active,
button:hover {
  border-color: v-bind(themeColor);
  filter: brightness(80%);
}

button:focus,
button:focus-visible {
  outline: 4px auto v-bind(themeColor);
}
</style>
