<template>
  <button type="" @click="test">test</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
let { ipcRenderer, systemInfo } = window;

const test = () => {
  console.log("ipcRenderer", ipcRenderer);
  if (!ipcRenderer) {
    ipcRenderer = {} as any;
    ipcRenderer.on =
      ipcRenderer.invoke =
      ipcRenderer.removeAllListeners =
        (...args: any): any => {
          console.log("not electron");
        };
  } else {
    ipcRenderer.invoke("open-messagebox");
  }
};
</script>

<style scoped lang="scss"></style>
