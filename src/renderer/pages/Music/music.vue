<template>
	<div class="music-box" :class="showBGI ? 'hiddenMain' : 'showMain'">
		<Search @add2-play-list="add2PlayList"></Search>
		<Player :id="currentId" :current-index="currentPlay" @change-play="clickPlay" @change-cover="changeCover"></Player>
		<SongList @play-new="add2PlayList"></SongList>
		<List :list-length="playList.length" margin="0px" padding="0px" class="play-list pink-atmo-box block-z-index" description="暂无播放内容">
			{{ t("music.playList") }}
			<hr />
			<div v-for="item in playList" :key="item.id" :class="{ active: currentId === item.id }" class="item">
				<div>{{ item.name }} - {{ item?.artists[0].name }}</div>
				<div v-show="currentId !== item.id" class="item-right">
					<div style="align-items: center">
						{{ secTotime(item.duration / 1000) }}
					</div>
					<Icon name="start" width="14px" @click="toplay(item.id, index)"></Icon>
					<Icon name="delete" width="14px" @click="removeList(item.id)"></Icon>
				</div>
				<MusicWave v-show="currentId === item.id" class="item-right" :count="5"></MusicWave>
			</div>
		</List>
	</div>
	<div class="bgc canvas-z-index" :class="{ blur: !showBGI }" :style="{ color, backgroundImage: `url(${coverUrl})` }"></div>
	<FloatBtn :list="floatBtns" right="30px" bootom="600px"></FloatBtn>
</template>

<script setup lang="ts">
import MusicWave from "@renderer/components/Music/MusicWave.vue"
import Search from "./searchList.vue"
import SongList from "./songList.vue"
import { secTotime } from "@renderer/utils/date"
import Player from "./player.vue"
import { ref, onMounted, watch, Ref } from "vue"
import { DesktopMsg } from "@renderer/utils/notification"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)

const playList = ref([])
const currentId: number = ref(0)
const currentPlay: number = ref(-1)
const coverUrl: Ref<string> = ref("")
const showBGI = ref(false)

const floatBtns = [
	{
		content: "S",
		fun: () => {
			showBGI.value = !showBGI.value
		},
	},
]

// 播放列表
const add2PlayList = (item) => {
	if (item.fee === 1 || item.fee === 4) {
		DesktopMsg({ title: "＞﹏＜", body: "vip歌曲不能播放" })
		return
	}
	if (playList.value.some((itemInPlayList) => itemInPlayList.id === item.id)) {
		return
	}
	playList.value.push(item)
	localStorage.setItem("playlist", JSON.stringify(playList.value))
	DesktopMsg({ title: "*^____^*", body: "添加成功" })
}

const removeList = (removeIdx: number) => {
	playList.value = playList.value.filter((item) => removeIdx !== item.id)
	localStorage.setItem("playlist", JSON.stringify(playList.value))
}

/**
 * 播放下一首
 * @param {number} index 序号
 * @return {void}
 */
const clickPlay = (index) => {
	if (index < 0 || index > playList.value.length) {
		return
	}
	currentId.value = playList.value[index].id
	currentPlay.value = index
}

const changeCover = (url) => {
	coverUrl.value = url
}

const toplay = (id, index) => {
	currentId.value = id
	currentPlay.value = index
}

onMounted(() => {
	playList.value = JSON.parse(localStorage.getItem("playlist")) || []
})
</script>

<style scoped lang="scss">
.music-box {
	align-items: center;
	width: 100%;
	height: 100vh;
	z-index: 100;
	transition: all 0.5s;
	display: grid;
	grid-template-columns: 1fr 1fr;

	.play-list {
		width: 80%;
		padding: 10px;
		height: 40vh;
		margin: 20px auto auto -10px;
		box-sizing: border-box;
		background-color: v-bind(backgroundColor);
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

.active {
	color: v-bind(themeColor);
}

.bgc {
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background-size: cover;
	// background-repeat: no-repeat;
}

.blur {
	filter: blur(3px);
}

.showMain {
	opacity: 1;
	transition: all 0.5s ease-in-out;
}

.hiddenMain {
	opacity: 0;
	transition: all 0.5s ease-in-out;
	// animation-name: fade;
	// animation-duration: 1.5s;
}

// @keyframes fade {
//   from {
//     opacity: 0.4;
//   }
//   to {
//     opacity: 1;
//   }
// }

// .fade-leave,   // 离开前,进入后透明度是1
// .fade-enter-to {
//   opacity: 1;
// }
// .fade-leave-active,
// .fade-enter-active {
//   transition: all 1.5s; //过度是2秒
// }
// .fade-leave-to,
// .fade-enter {
//   opacity: 0;
// }
</style>
