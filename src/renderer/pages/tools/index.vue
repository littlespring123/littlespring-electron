<template>
	<TabSelect :list="tabList" @change="(e) => (activeIndex = e)" />

	<transition name="fade-slide" mode="out-in" appear>
		<keep-alive>
			<component :is="tabList[activeIndex].component"></component>
		</keep-alive>
	</transition>
</template>

<script setup lang="ts">
import Todo from "./TodoList.vue"
import { useRouter } from "vue-router"
import { ref } from "vue"
const router = useRouter()

const activeIndex = ref(0)

const tabList = [
	{
		id: "1",
		name: "todo",
		title: "todo",
		component: Todo,
		icon: "",
	},
	{
		id: "2",
		name: "music",
		title: "music",
		component: Todo,
		icon: "",
	},
	{
		id: "3",
		name: "weather",
		title: "weather",
		component: Todo,
		icon: "",
	},
]
</script>

<style scoped lang="scss">
// .list {
//   display: flex;

//   .item {
//     cursor: pointer;
//   }
// }
</style>
