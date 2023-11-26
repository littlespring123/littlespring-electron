<template>
  <!-- <List class="list" :listLength="todos.length"> -->
  <div class="toList">
    <Card :title="item.title" class="item" v-for="item in todos" :key="item.id">
      <div class="content">
        {{ item.content }}
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const todos = ref([
  {
    id: "22",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "22111",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "222222",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "2333332",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "22444444",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "225555555",
    title: "sasa",
    content: "sassaassaasasasaas",
  },
  {
    id: "221666",
    title: "ssa",
    content:
      "sasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaas",
  },
  {
    id: "2245",
    title: "ssa",
    content: "sasassaasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
  },
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

<style scoped lang="scss">
.toList {
  width: 98%;
  display: grid;
  // grid-template-columns: repeat(4, 25%);
  // grid-template-rows: repeat(4, 22%);
  grid-template-columns: repeat(4, 1fr);
  // grid-template-rows: 1fr 1fr 1fr 1fr;
  // gap: 10px; /* 列之间的间隔 */
  // display: flex;
  // flex-wrap: wrap;
  // margin: 0 auto;
  // border: 1px solid red;

  .item {
    // border: 1px solid red;
    height: auto;
    // padding: 10px;
    // overflow: auto;

    .content {
      max-height: 20vh;
      overflow: auto;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 5; /*行数*/
      // -webkit-box-orient: vertical;
      // display: -moz-box;
      // -moz-line-clamp: 2;
      // -moz-box-orient: vertical;
      word-wrap: break-word;
      word-break: break-all;
      // white-space: normal;
    }
  }
}
</style>
