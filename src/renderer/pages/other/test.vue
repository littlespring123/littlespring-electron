<template>
	<button type="" @click="test">test</button>
	<button @click="openDialog">open dialog</button>
	<button @click="close">close</button>
	<button @click="newWin">new</button>
	<test-jsx></test-jsx>
</template>

<script setup lang="ts">
import testJsx from "./test-jsx"
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

const openDialog = () => {
	ipcRenderer.invoke("open-messagebox")
}

const close = () => {
	ipcRenderer.invoke("app-close")
}

const newWin = () => {
	ipcRenderer.invoke("open-music-win")
}
</script>

<style scoped lang="scss"></style>
