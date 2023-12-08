<template>
	<List :list-length="newList.length" margin="0px" padding="0px" class="new-list pink-atmo-box block-z-index" description="暂无播放内容">
		<span>{{ t("music.newList") }}</span>
		<hr />
		<div v-for="item in newList" :key="item.id" class="item" @click="emits('playNew', item.song)">
			<div>
				{{ item.name }}
				<Tag v-if="item.song.fee === 1 || item.song.fee === 4" text="vip" :circle="true" size="mini" :color="themeColor"></Tag>
			</div>
			<div class="item-right">
				<div style="align-items: center">
					{{ item?.song.artists[0].name }}
				</div>
			</div>
		</div>
	</List>
</template>

<script setup lang="ts">
import { newSongAPi } from "@renderer/api/music"
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useStore } from "@renderer/stores"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)

const emits = defineEmits(["playNew"])
const newList = ref([])
const getNewList = async () => {
	const res = await newSongAPi()
	console.log("new", res)
	if (res) {
		newList.value = res.result
	}
}

getNewList()
</script>

<style scoped lang="scss">
.new-list {
	width: 80%;
	height: 40vh;
	padding: 10px 5px;
	margin: -10px 20px auto auto;
	// bottom: 10px;
	box-sizing: border-box;
	background-color: v-bind(backgroundColor);

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
}
</style>
