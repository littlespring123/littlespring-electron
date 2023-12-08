<template>
	<button type="" @click="test">test</button>

	<div class="music-test">
		<div v-for="item in 9" :key="item" class="music-test-rod"></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
let { ipcRenderer, systemInfo } = window

const test = () => {
	console.log("ipcRenderer", ipcRenderer)
	if (!ipcRenderer) {
		ipcRenderer = {} as any
		ipcRenderer.on =
			ipcRenderer.invoke =
			ipcRenderer.removeAllListeners =
				(...args: any): any => {
					console.log("not electron")
				}
	} else {
		ipcRenderer.invoke("open-messagebox")
	}
}
</script>

<style scoped lang="scss">
.music-test {
	display: flex;
	height: 100px;
	align-items: flex-end;

	&-rod {
		width: 40px;
		background-color: red;
		margin: 1px;
		height: 40px;
	}

	@for $i from 1 through 9 {
		&-rod:nth-child(#{$i}) {
			animation: move random(100) / 100 + 1s infinite linear;
		}
	}
}

@keyframes move {
	0% {
		height: 0px;
	}
	100% {
		height: 50px;
	}
}
</style>
