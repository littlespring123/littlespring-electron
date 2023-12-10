<template>
	<div class="head" :style="{ color }">
		<div class="backBtn" @click="goBack">
			<Icon name="arrow-left-circle" :color="themeColor"></Icon>
			{{ road }}
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
import { ref } from "vue"
// let { ipcRenderer, systemInfo } = window
// const IsUseSysTitle = ref(false)

// if (!ipcRenderer) {
// 	ipcRenderer = {} as any
// 	ipcRenderer.on =
// 		ipcRenderer.invoke =
// 		ipcRenderer.removeAllListeners =
// 			(...args: any): any => {
// 				console.log("not electron")
// 			}
// } else {
// 	isNotMac.value = systemInfo.platform !== "darwin"
// 	ipcRenderer.invoke("IsUseSysTitle").then((res) => {
// 		IsUseSysTitle.value = res
// 	})
// }

const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)
const router = useRouter()

// 拖拽
// const isDown = ref(false) // 鼠标状态
// const baseX = ref(0)
// const baseY = ref(0) //监听坐标

// const clickDown = (e) => {
// 	isDown.value = true
// 	baseX.value = e.x
// 	baseY.value = e.y
// }

// const clickMove = (e) => {
// 	console.log("e", e)
// 	if (isDown.value && ipcRenderer) {
// 		const x = e.x - baseX.value
// 		const y = e.y - baseY.value
// 		const moveX = x > 0 ? x : 0
// 		const moveY = y > 0 ? y : 0
// 		ipcRenderer.send("move-application", {
// 			posX: x,
// 			posY: y,
// 		})
// 	}
// }

const goBack = () => {
	router.back()
}

defineProps({
	road: {
		type: String,
		default: "博客",
	},
})
</script>

<style scoped lang="scss">
.head {
	display: flex;
	margin: 1.5rem 1.5rem 0.2rem 1.5rem;
	align-items: center;
	justify-content: space-between;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.2rem;
	border-bottom: 1px solid #ccc;
	z-index: 100;
	position: relative;
	-webkit-app-drag: drag;
	// mix-blend-mode: multiply;

	.backBtn {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-right: 10px;
		-webkit-app-drag: no-drag;
		// border-radius: 26%;
		background-color: v-bind(backgroundColor);
		// mix-blend-mode: difference;
	}
}
</style>
