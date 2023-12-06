<template>
  <div class="container">
    <div class="icon"></div>
    <div v-if="title" class="title">{{ title }}</div>
    <div class="progress">
      <div class="value"></div>
    </div>
    <div v-if="subTitle" class="title">{{ subTitle }}</div>
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
  subTitle: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  font-size: 48px;
  color: #49a9ee;
}

.title {
  align-items: center;
  font-size: 14px;
}

.progress {
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
