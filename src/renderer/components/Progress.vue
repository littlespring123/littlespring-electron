<template>
  <div class="container">
    <div class="icon"></div>
    <div v-if="title" class="title">{{ title }}</div>
    <div class="progress">
      <div class="value"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
defineProps({
  value: {
    type: String,
    default: 0,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  align-items: center;
  // box-shadow: 0 -1px 2px -2px rgba(0, 0, 0, 0.16);
  // border: 1px solid #f0f0f0;
}

.icon {
  font-size: 48px;
  color: #49a9ee;
}

.title {
  width: 29%;
  align-items: center;
  font-size: 14px;
  // padding-left: 10px;
}

.progress {
  z-index: 2;
  position: relative;
  width: 70%;
  max-width: 300px;
  height: 20px;
  margin: 10px;
  background: #ebebeb;
}

.value {
  width: v-bind(value);
  display: inline-block;
  z-index: 10;
  //   width: 0;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 -1px;
  height: 20px;
  line-height: 16px;
  text-align: right;

  background: v-bind(themeColor);
  border-color: v-bind(themeColor);
}
</style>
