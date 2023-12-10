<template>
	<div class="floatBox block-z-index">
		<div v-for="(item, index) in list" :key="index" class="floatBox-btn" @click="item.fun">
			<div v-if="item.type === 'text'">
				{{ item.content }}
			</div>
			<div v-if="item.type === 'icon'">
				<Icon :name="item.content" width="24px" height="24px"></Icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)
defineProps({
	isShow: {
		type: Boolean,
		default: true,
	},
	list: {
		// type: array,
		default: [
			{
				content: "+",
				type: "text",
				fun: () => {
					console.log("hello")
				},
			},
		],
	},
	top: {
		type: String,
		default: "25px",
	},
	right: {
		type: String,
		default: "25px",
	},
	bootom: {
		type: String,
		default: "25px",
	},
	left: {
		type: String,
		default: "25px",
	},
})
</script>

<style scoped lang="scss">
.floatBox {
	position: fixed;
	bottom: v-bind(bootom);
	right: v-bind(right);

	&-btn {
		cursor: pointer;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		box-shadow: 10px salmon;
		font-size: 1.5rem;
		text-align: center;
		color: v-bind(color);
		margin: 4px 0;
		padding: auto;
		border: 1px solid v-bind(color);
		background-color: v-bind(backgroundColor);
	}

	&-btn:hover {
		fill: v-bind(themeColor);
		color: v-bind(themeColor);
		border: 1px solid v-bind(themeColor);
		transition: 0.5s;
	}
}
</style>
