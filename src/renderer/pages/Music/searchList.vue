<template>
	<div class="search pink-atmo-box block-z-index">
		<div class="search-box" @keydown.ctrl.t="emptySearchList" @keyup.enter="search">
			<input v-model="searchValue" class="search-txt" type="text" :placeholder="t('music.searchMusic')" />
			<div class="search-btn">
				<Icon v-show="searchValue" width="15px" name="close" @click="emptySearchList"></Icon>
				<div class="btn" @click="search">
					{{ t("music.searchBtn") }}
				</div>
			</div>
		</div>
		<List :list-length="searchList.length" margin="0px" padding="0px" class="search-list" description="搜索查看">
			<div v-for="(item, index) in searchList" :key="index" class="item" @click="emits('add2PlayList', item)">
				<span>
					{{ item.name }}
					<Tag v-if="item.fee === 1 || item.fee === 4" text="vip" :circle="true" size="mini" :color="themeColor"></Tag>
				</span>
				<span>{{ item?.artists[0].name }}</span>
			</div>
		</List>
	</div>
</template>

<script setup lang="ts">
import { searchMusic } from "@renderer/api/music"
import { ref, Ref } from "vue"
import { useI18n } from "vue-i18n"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)

const { t } = useI18n()
const searchList = ref([])
const searchValue: Ref<string> = ref("")
const counts = ref(0)

const emits = defineEmits("add2PlayList")

const search = async () => {
	if (!searchValue.value) {
		return
	}
	const res = await searchMusic(searchValue.value)
	if (res) {
		counts.value = res.songCount
		searchList.value = res.songs
	}
}

const emptySearchList = () => {
	searchList.value = []
	searchValue.value = ""
}
</script>

<style scoped lang="scss">
.search {
	width: 80%;
	height: 40vh;
	// right: 0;
	margin: auto -10px 20px auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 5px;
	background-color: v-bind(backgroundColor);

	&-box {
		display: flex;
		border: 1px solid #ccc;
		width: 80%;
		height: 38px;
		border-radius: calc(infinity * 1px);

		.search-btn {
			width: 30%;
			height: 40px;
			// border-radius: 50%;
			border-radius: calc(infinity * 1px);
			display: flex;
			cursor: pointer;
			justify-content: center;
			align-items: center;
			transition: 0.4s;

			.btn {
				align-items: center;
			}
			.btn::before {
				content: "|";
				margin: 0 10px;
				width: 3px;
				line-height: 40px;
				color: inherit;
			}
		}

		.search-txt {
			border: none;
			background: none;
			outline: none;
			float: left;
			font-size: 14px;
			transition: 0.4s;
			height: 40px;
			line-height: 40px;
			width: 70%;
			padding: 0 6px;
		}
	}

	&-box:hover {
		fill: v-bind(themeColor);
		color: v-bind(themeColor);
		border: 1px solid v-bind(themeColor);
	}

	&-list {
		padding: 3px;
		max-height: 30vh;
	}
}

.item {
	margin: 4px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: v-bind(color);
	fill: v-bind(color);
	box-sizing: border-box;
	&-right {
		display: flex;
		align-items: center;
	}
}

.item:hover {
	color: v-bind(themeColor);
	fill: v-bind(themeColor);
}
</style>
