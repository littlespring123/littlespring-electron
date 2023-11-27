<template>
  <!-- <List class="list" :listLength="todos.length"> -->
  <div class="toList">
    <Card
      @dblclick="modifyEvent(item.id, item.title, item.content)"
      :title="item.title"
      class="item"
      v-for="item in todos"
      :key="item.id"
    >
      <div class="content">
        {{ item.content }}
      </div>
      <template v-slot:footer>
        <Icon
          @click="deleteTodo(item.id)"
          name="select-not"
          :color="themeColor"
        ></Icon>
      </template>
    </Card>
  </div>
  <Modal :show="showForm" @confirm="addTodo" @cancel="showForm = false">
    <Input
      :placeholder="t('todo.titlePlace')"
      :label="t('todo.title')"
      name="title"
      v-model="todoForm.title"
    />
    <Input
      :placeholder="t('todo.contentPlace')"
      :label="t('todo.content')"
      name="content"
      v-model="todoForm.content"
    />
  </Modal>
  <FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Tool } from "@renderer/utils/tool";
import { getList, addTodo, modifyTodo, deleteTodo } from "@renderer/api/todo";

import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { themeColor } = storeToRefs(store);

const { t } = useI18n();

// 悬浮按钮
const btn = [
  {
    content: "+",
    fun: () => {
      showForm.value = true;
    },
  },
];

const showForm = ref(false);
const todoForm = ref({
  id: "",
  title: "",
  content: "",
});
const todos = ref([
  {
    id: "22",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: false,
  },
  {
    id: "22111",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: false,
  },
  {
    id: "222222",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: true,
  },
  {
    id: "2333332",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: false,
  },
  {
    id: "22444444",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: false,
  },
  {
    id: "225555555",
    title: "sasa",
    content: "sassaassaasasasaas",
    complete: false,
  },
  {
    id: "221666",
    title: "ssa",
    content:
      "sasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaassasasssasasasasassassasaaas",
    complete: false,
  },
  {
    id: "2245",
    title: "ssa",
    complete: true,
    content: "sasassaasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
  },
]);

const getTodoList = () => {
  todos.value = JSON.parse(localStorage.getItem("todo")) || [];
};

//添加一个TODO
const addTodo = () => {
  if (todoForm.value.id) {
    // for (let i = 0, len = todos.value.length; i < len; i++) {
    //   if (todos.value[i].id === todoForm.value.id) {
    //     todos.value[i] = todoForm.value;
    //   }
    // }
    todos.value = todos.value.map((item) => {
      if (item.id === todoForm.value.id) {
        item = todoForm.value;
      }
      return item;
    });
    localStorage.setItem("todo", JSON.stringify(todos.value));
  } else {
    todos.value.unshift({ ...todoForm.value, id: Tool.uuid(3) });
  }
  todoForm.value = { id: "", title: "", content: "" };
  showForm.value = false;
  localStorage.setItem("todo", JSON.stringify(todos.value));
};

//
const modifyEvent = (id, title: string, content: string) => {
  todoForm.value = {
    id,
    title,
    content,
  };
  showForm.value = true;
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
  localStorage.setItem("todo", JSON.stringify(todos.value));
};

//全选or取消全选
// const checkAllTodo = (done) => {
//   todos.value.forEach((todo: any) => {
//     todo.done = done;
//   });
// };

//清楚所有已经完成的todo
// const clearAllTodo = () => {
//   todos.value = todos.value.filter((todo: any) => {
//     return !todo.done;
//   });
// };

getTodoList();
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
      overflow: hidden;
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
    .content:hover {
      overflow: auto;
    }
  }
}
</style>
