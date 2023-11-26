<template>
  <div v-show="headerRender" class="head" :style="{ color, backgroundColor }">
    <div @click="goBack" class="backBtn">
      <Icon name="arrow-left-circle" :color="themeColor"></Icon>
      <!-- <svg-icon icon-class="arrow-left-circle" :color="themeColor"></svg-icon> -->
      {{ road }}
    </div>

    <div class="backBtn" @click="closeWin">
      <div class="controls-container">
        <div class="windows-icon-bg" @click="Mini">
          <img src="@renderer/assets/icons/svg/mini.svg" class="icon-size" />
        </div>
        <div class="windows-icon-bg" @click="MixOrReduction">
          <img
            v-if="mix"
            src="@renderer/assets/icons/svg/reduction.svg"
            class="icon-size"
          />
          <img
            v-else
            src="@renderer/assets/icons/svg/mix.svg"
            class="icon-size"
          />
        </div>
        <div class="windows-icon-bg close-icon" @click="Close">
          <img src="@renderer/assets/icons/svg/close.svg" class="icon-size" />
        </div>
      </div>

      <!-- <Icon name="close" :color="themeColor"></Icon> -->
    </div>
  </div>
</template>
<script setup lang="ts">
// import { ipcRenderer } from 'electron';
// import { remote } from 'electron';
import { useRouter } from "vue-router";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
// import { invoke } from "../../utils/ipcRenderer";
// import { IpcChannel } from "../../../ipc";
const IsUseSysTitle = ref(false);
const mix = ref(false);
// const isNotMac = ref(process.platform !== "darwin");
// const IsWeb = ref(process.env.BUILD_TARGET);
// invoke(IpcChannel.IsUseSysTitle).then((res) => {
//   IsUseSysTitle.value = res;
// });

const Mini = () => {
  // invoke(IpcChannel.WindowMini);
};
const MixOrReduction = () => {
  // invoke(IpcChannel.WindowMax).then((res) => {
  // mix.value = res.status;
  // });
};
const Close = () => {
  // invoke(IpcChannel.WindowClose);
};

const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const router = useRouter();

const goBack = () => {
  router.back();
};

defineProps({
  road: {
    type: String,
    default: "博客",
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
    border: 1px solid red;

    .controls-container {
      border: 1px solid red;
    }
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
