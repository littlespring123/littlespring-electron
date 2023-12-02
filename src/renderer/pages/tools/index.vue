<template>
  <TabSelect :list="lists" @change="(e) => (activeIndex = e)" />
  <div v-show="activeIndex === 0">
    <Todo />
  </div>
  <div v-show="activeIndex === 1">
    <!-- <Music /> -->
  </div>
  <div v-show="activeIndex === 2">
    <!-- <Music /> -->
  </div>
</template>

<script setup lang="ts">
// import Weather from "./weather";
import Todo from "./TodoList.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const activeIndex = ref(0);

const lists = [
  {
    id: "1",
    name: "todo",
    title: "todo",
    path: "/todo",
    icon: "",
  },
  {
    id: "2",
    name: "music",
    title: "music",
    path: "/music",
    icon: "",
  },
  {
    id: "3",
    name: "weather",
    title: "weather",
    path: "/weather",
    icon: "",
  },
];
</script>

<style scoped lang="scss">
// .list {
//   display: flex;

//   .item {
//     cursor: pointer;
//   }
// }
</style>
