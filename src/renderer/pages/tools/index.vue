<template>
  <TabSelect :list="lists" @change="(e) => (activeIndex = e)" />
  <div v-show="activeIndex === 0"><Todo></Todo></div>
  <div v-show="activeIndex === 1"><Music></Music></div>
</template>

<script setup lang="ts">
import Music from './Music/music.vue';
import Todo from './TodoList.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const activeIndex = ref(0);

const lists = [
  {
    id: '12',
    name: 'todo',
    title: 'todo',
    path: '/todo',
    icon: '',
  },
  {
    id: '12',
    name: 'music',
    title: 'music',
    path: '/music',
    icon: '',
  },
  // {
  //   id: '12',
  //   name: 'todo',
  //   title: 'todo',
  //   path: '',
  //   icon: '',
  // },
];
</script>

<style scoped lang="scss">
.list {
  display: flex;

  .item {
    cursor: pointer;
  }
}
</style>
