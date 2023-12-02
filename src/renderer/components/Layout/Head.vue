<template>
  <div v-show="headerRender" class="head" :style="{ color, backgroundColor }">
    <div @click="goBack" class="backBtn">
      <Icon name="arrow-left-circle" :color="themeColor"></Icon>
      {{ road }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const IsUseSysTitle = ref(false);
const mix = ref(false);

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
  // top: 1vh;
  // left: 8vw;
  margin: 1.5rem;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
  z-index: 100;
  position: relative;

  .backBtn {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 26%;

    .controls-container {
    }
  }
}
</style>
