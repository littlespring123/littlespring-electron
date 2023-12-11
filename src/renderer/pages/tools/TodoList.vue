<template>
	<div class="toList block-z-index">
		<Card v-for="item in todos" :key="item.id" :title="item.title" class="item" @dblclick="modifyEvent(item.id, item.title, item.content)">
			<div class="content" v-html="item.content.replace(/\n/g, '<br>')"></div>
			<template #footer>
				<Icon width="16px" height="16px" name="select-not" :color="themeColor" @click="deleteTodo(item.id)"></Icon>
			</template>
		</Card>
	</div>
	<Modal :show="showForm" @keydown.ctrl.enter="addTodo" @close="showForm = false">
		<div class="input-box">
			<div class="">
				<Input v-model="todoForm.title" :placeholder="t('todo.titlePlace')" :label="t('todo.title')" name="title" />
			</div>
			<textarea
				v-model="todoForm.content"
				:placeholder="t('todo.contentPlace')"
				:label="t('todo.content')"
				name="content"
				:rows="10"
				spellcheck="false"
				class="textarea"
			></textarea>
		</div>
	</Modal>
	<FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { Tool } from "@renderer/utils/tool"
// import { getList, addTodo, modifyTodo, deleteTodo } from "@renderer/api/todo"

import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
const store = useStore()
const { themeColor } = storeToRefs(store)

const { t } = useI18n()

const showForm = ref(false)
const todoForm = ref({
	id: "",
	title: "",
	content: "",
})
const todos = ref([])

const getTodoList = () => {
	todos.value = JSON.parse(localStorage.getItem("todo")) || []
}

//添加一个TODOs
const addTodo = () => {
	if (todoForm.value.id) {
		todos.value = todos.value.map((item) => {
			if (item.id === todoForm.value.id) {
				item = todoForm.value
			}
			return item
		})
		localStorage.setItem("todo", JSON.stringify(todos.value))
	} else {
		todos.value.unshift({ ...todoForm.value, id: Tool.uuid(3) })
	}
	todoForm.value = { id: "", title: "", content: "" }
	showForm.value = false
	localStorage.setItem("todo", JSON.stringify(todos.value))
}

//
const modifyEvent = (id, title: string, content: string) => {
	todoForm.value = {
		id,
		title,
		content,
	}
	showForm.value = true
}

//勾选or取消勾选一个MyTODO
const checkTodo = (id) => {
	todos.value.forEach((todo: any) => {
		if (todo.id == id) {
			todo.done = !todo.done
		}
	})
}

//删除一个todos
const deleteTodo = (id) => {
	todos.value = todos.value.filter((todo: any) => {
		return todo.id !== id
	})
	localStorage.setItem("todo", JSON.stringify(todos.value))
}

getTodoList()

// 悬浮按钮
const btn = [
	{
		content: "+",
		type: "text",
		fun: () => {
			showForm.value = true
		},
	},
	{
		content: "calendar",
		type: "icon",
		fun: () => {
			todoForm.value.title = new Date().toLocaleDateString()
			showForm.value = true
		},
	},
]
</script>

<style scoped lang="scss">
.toList {
	width: 98%;
	display: grid;
	max-height: 80vh;
	overflow: hidden;
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
		color: black;
		background-color: #fff7d1;
		// padding: 10px;
		// overflow: auto;

		.content {
			background-color: #fff7d1;
			height: 20vh;
			overflow: hidden;
			word-wrap: break-word;
			word-break: break-all;
		}
		.content:hover {
			overflow: auto;
		}
	}
}

.toList:hover {
	overflow: auto;
}

.input-box {
	display: flex;
	flex-direction: column;

	.textarea {
		margin: 3px;
		white-space: pre-wrap;
		// outline: none;
		padding: 3px;
		font-family: "微软雅黑";
	}
	.textarea:focus {
		outline: 1px solid v-bind(themeColor);
	}
}
</style>
