<template>
  <List :listLength="todos.length">
    <div class="" v-for="item in todos">
      <!-- <Card :title="item.title" :content="item.content"> </Card> -->
      {{ item.title }}
    </div>
  </List>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const todos = ref([
  {
    id: '22',
    title: 'sasasa',
    content: 'sasasaas'
  },
  {
    id: '22',
    title: 'sasasa',
    content: 'sasasaas'
  },
  {
    id: '22',
    title: 'sasasa',
    content: 'sasasaas'
  }
]);
//添加一个TODO
const addTodo = (todoObj: any) => {
  todos.value.unshift(todoObj);
};
//勾选or取消勾选一个TODO
const checkTodo = (id) => {
  todos.value.forEach((todo: any) => {
    if (todo.id == id) todo.done = !todo.done;
  });
};
//删除一个todo
const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo: any) => {
    return todo.id !== id;
  });
};
//全选or取消全选
const checkAllTodo = (done) => {
  todos.value.forEach((todo: any) => {
    todo.done = done;
  });
};

//清楚所有已经完成的todo
const clearAllTodo = () => {
  todos.value = todos.value.filter((todo: any) => {
    return !todo.done;
  });
};
</script>

<style scoped lang="scss"></style>
