<template>
	<div v-show="total > 0" class="pagination block-z-index" :style="{ fill: color, color, backgroundColor }">
		<div :class="{ forbidden: currentPage - 1 <= 0 }" class="pagination-block" @click="handleCurrentChange(currentPage - 1)">
			<Icon name="arrow-left" width="24px"></Icon>
		</div>
		<div v-if="pageList[2] - 2 > 1" class="pagination-block">...</div>
		<div
			v-for="pageNum in pageList"
			:key="pageNum"
			class="pagination-block"
			:class="pageNum === currentPage ? 'active' : ''"
			@click="handleCurrentChange(pageNum)"
		>
			{{ pageNum }}
		</div>
		<div v-if="pageMax - pageList[2] > 2" class="pagination-block">...</div>
		<div class="pagination-block" :class="{ forbidden: currentPage + 1 > pageMax }" @click="handleCurrentChange(currentPage + 1)">
			<Icon name="arrow-right" width="24px"></Icon>
		</div>
		<div class="pagination-total">{{ total }}{{ t("page.items") }},{{ pageMax }}{{ t("page.pages") }}</div>
	</div>
</template>

<script setup lang="ts">
/**
 * 分页器
 * @param total 总条数
 * @param pageSize 每页多少条
 * @param currentPage 当前位于页
 */
import { ref, onMounted, toRefs, watch, onUpdated } from "vue"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)
const props = defineProps({
	total: {
		// 总条数
		type: Number,
		default: 5,
	},
	pageSize: {
		type: Number,
		default: 5,
	},
	currentPage: {
		type: Number,
		default: 1,
	},
})

const { total, pageSize, currentPage } = toRefs(props)
const pageMax = ref(Math.ceil(total.value / pageSize.value))
const pageList = ref([])

watch(total, () => {
	pageMax.value = Math.ceil(total.value / pageSize.value)
})

const handleSizeChange = (val) => {
	console.log(`每页 ${val} 条`)
}

const emits = defineEmits(["pageChange"])

const handleCurrentChange = (e) => {
	if (e <= 0 || e > pageMax.value || e === currentPage.value) {
		return
	}
	emits("pageChange", e)
}

const setPageList = () => {
	pageList.value = []
	let length = Math.ceil(total.value / pageSize.value)
	pageList.value = Array.from({ length }, (_, index) => index + 1)
	pageList.value.length > 5 &&
		(pageList.value = pageList.value.slice(Math.max(Math.min(currentPage.value - 3, length - 5), 0), Math.max(currentPage.value + 2, 6)))
}

onUpdated(() => {
	setPageList()
})

onMounted(() => {
	setPageList()
})
</script>

<style scoped lang="scss">
.pagination {
	width: auto;
	padding: 10px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;

	&-block {
		cursor: pointer;
		font-size: 1.5rem;
		display: inline-block;
		width: 3rem;
		height: 3rem;
		padding: 10px;
		text-align: center;
		align-items: center;
		// font-size: 1rem;
		line-height: 2rem;
		// align-items: center;
		border: 1px solid #ddd;
		border-right: none;
		box-sizing: border-box;

		&:first-child {
			width: 3rem;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		&:last-child {
			width: 3rem;
			border-right: 1px solid #ddd;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}
	}

	&-block:not(.forbidden) :hover {
		color: v-bind(themeColor);
		fill: v-bind(themeColor);
	}

	&-total {
		font-size: 0.8rem;
		margin: 5px;
	}
}
.active {
	color: v-bind(themeColor);
}

.forbidden {
	opacity: 0.6;
	cursor: not-allowed;
}

.icon {
	fill: v-bind(color);
}
</style>
