<template>
  <TabSelect :list="tabList" @change="(e) => (activeIndex = e)" />

  <transition name="fade-slide" mode="out-in" appear>
    <component :is="tabList[activeIndex].component"></component>
  </transition>
</template>

<script setup lang="ts">
import Bird from "./bird.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const activeIndex = ref(0);

const tabList = [
  {
    id: "1",
    name: "bird",
    title: "bird",
    component: Bird,
    icon: "",
  },
  {
    id: "2",
    name: "music",
    title: "music",
    component: Bird,
    icon: "",
  },
  {
    id: "3",
    name: "weather",
    title: "weather",
    component: Bird,
    icon: "",
  },
];
</script>

<style scoped lang="scss"></style>
