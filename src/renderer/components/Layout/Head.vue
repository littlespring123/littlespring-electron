<template>
  <div v-show="headerRender" class="head" :style="{ color, backgroundColor }">
    <div @click="goBack" class="backBtn">
      <Icon name="arrow-left-circle" :color="themeColor"></Icon>
      {{ road }}
    </div>
    <div class="backBtn" @click="closeWin">
      <Icon name="close" :color="themeColor"></Icon>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { ipcRenderer } from 'electron';
// import { remote } from 'electron';
import { useRouter } from 'vue-router';
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const router = useRouter();
const goBack = () => {
  router.back();
};
const closeWin = () => {
  console.log('close');
  console.log(window.require('electron'));
  const { ipcRenderer } = window.require('electron');
  ipcRenderer.send('msg1', 'ss');
  // console.log(remote);
  // const currentWindow = remote.getCurrentWindow();
  // currentWindow.close();
};

defineProps({
  road: {
    type: String,
    default: '博客',
  },
});
</script>

<style scoped lang="scss">
.head {
  display: flex;
  top: 1vh;
  left: 8vw;
  margin: 1.5rem;
  // width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;

  .backBtn {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 26%;
  }

  .close {
    z-index: 1px;
    // float: right;
    // width: 10px;
    // height: 10px;
    // display: flex;
    // align-items: center;
    // cursor: pointer;
    // margin-right: 10px;
    // border-radius: 26%;
  }
}
</style>
