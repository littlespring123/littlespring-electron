<template>
	<div class="music-test">
		<div v-for="item in count" :key="item" class="music-test-rod"></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"

const store = useStore()
const { themeColor } = storeToRefs(store)
defineProps({
	count: {
		type: Number,
		default: 7,
	},
	width: {
		type: String,
		default: "8px",
	},
	heightBox: {
		type: String,
		default: "10px",
	},
})
</script>

<style scoped lang="scss">
.music-test {
	display: flex;
	height: v-bind(heightBox);
	align-items: center;
	position: relative;

	&-rod {
		width: 8px;
		position: absolute;
		background-color: v-bind(themeColor);
		// background-color: red;
		border-radius: 6px;
		margin: 1px;
	}

	@for $i from 1 through 9 {
		&-rod:nth-child(#{$i}) {
			height: random(20) + 10px;
			right: #{$i * 10}+ px;
			animation: move random(100) / 100 + 0.3s infinite linear;
		}
	}
}

@keyframes move {
	100% {
		height: 10px;
		border-radius: 50%;
		filter: contrast(2);
	}
}
</style>
