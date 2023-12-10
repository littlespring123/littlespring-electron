<template>
	<p>&copy;littlespring</p>
</template>
<script setup lang="ts">
// import { useRouter } from "vue-router";
// import { useStore } from "@renderer/stores";
// import { storeToRefs } from "pinia";
// import { ref } from "vue";
// const IsUseSysTitle = ref(false);
// const mix = ref(false);

// const store = useStore();
// const { color, backgroundColor, themeColor } = storeToRefs(store);
// const router = useRouter();

// defineProps({
//   road: {
//     type: String,
//     default: "博客",
//   },
// });
</script>

<style scoped lang="scss">
.head {
	display: flex;
	margin: 1.5rem;
	align-items: center;
	justify-content: space-between;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.2rem;
	border-bottom: 1px solid #ccc;
	z-index: 100;
	position: relative;

	.backBtn {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-right: 10px;
		border-radius: 26%;

		.controls-container {
		}
	}
}
</style>
