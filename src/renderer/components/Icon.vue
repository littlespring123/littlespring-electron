<template>
	<svg :class="svgClass" v-bind="$attrs">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"

const define = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: "",
	},
	width: {
		type: String,
		default: "32px",
	},
	height: {
		type: String,
		default: "32px",
	},
})

const { name, color } = toRefs(define)

// 这边就是根据props的name来进行处理啦
const iconName = computed(() => `#icon-${name.value}`)
const svgClass = computed(() => {
	if (name.value) {
		return `svg-icon icon-${name.value}`
	}
	return "svg-icon" // svg 标签
})
</script>

<style scoped lang="scss">
.svg-icon {
	align-items: center;
	fill: v-bind(color);
	color: v-bind(color);
	width: v-bind(width);
	line-height: v-bind(height);
	height: v-bind(height);
	transition: 0.3s;
}
</style>
