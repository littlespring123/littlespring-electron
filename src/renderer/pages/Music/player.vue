<template>
	<div id="audio-player" class="pink-atmo-box block-z-index" :style="{ fill: color, color, backgroundColor }" @keydown.space="playButton">
		<div v-show="!showLRC" class="img-container">
			<img id="cover" :src="baseInfo.al.picUrl" :title="baseInfo.al.picUrl" :alt="t('music.musicCover')" />
		</div>
		<LRC v-show="showLRC" :current-time="currentTime" :lrc="lyric.lyric" class="img-container"></LRC>
		<div ref="controllerNode" class="controller">
			<h4 id="title" ref="titleNode" class="title">
				<span class="title-title">{{ baseInfo.name }}</span>
				<span v-show="baseInfo.ar[0].name" class="title-name">{{ baseInfo.ar[0].name }}</span>
			</h4>
			<Progress :title="secTotime(currentTime)" :sub-title="secTotime(baseInfo.dt / 1000 - currentTime)" :value="`${progress}%`"></Progress>
			<div ref="baseSet" class="baseSet">
				<div class="setItem" :style="showLRC && { borderWidth: '1px', borderStyle: 'solid' }" @click="showLRC = !showLRC">
					{{ t("music.LRC") }}
				</div>
				<a :href="music2Down" :download="baseInfo.name + 'mp3'" class="setItem">L</a>
				<div class="setItem">
					<Icon name="volume" width="18px" height="18px" @click="showVolume = !showVolume"></Icon>
					<input v-show="showVolume" id="volumeRange" v-model="myVolume" type="range" min="0" max="1" step="0.1" class="volumeRange" />
				</div>
				<div class="setItem">
					<Icon name="extend" width="18px" height="18px" @click="openNewWin"></Icon>
				</div>
			</div>
			<div class="navigation">
				<Icon name="arrow-left" height="24px" @click="emits('changePlay', currentIndex - 1)"></Icon>
				<div v-show="playState" class="player-button" @click="playButton">
					<Icon name="stop" :color="color" />
				</div>
				<div v-show="!playState" class="player-button" @click="playButton">
					<Icon name="start" :color="color" />
				</div>
				<Icon name="arrow-right" height="24px" @click="emits('changePlay', currentIndex + 1)"></Icon>
			</div>
		</div>
	</div>
	<audio ref="audioPlayer" @timeupdate="chengeCurr" @ended="endPlay"></audio>
</template>

<script setup lang="ts">
import { DesktopMsg } from "@renderer/utils/notification"
import { checkMusic, musicUrl, musicInfo, lyricInfo } from "@renderer/api/music"
import LRC from "./LRC.vue"
import { secTotime } from "@renderer/utils/date"
import { ref, toRefs, watch, onMounted, onBeforeUnmount } from "vue"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"

import { useI18n } from "vue-i18n"
const { t } = useI18n()
const store = useStore()
const { color, backgroundColor, themeColor } = storeToRefs(store)

const props = defineProps({
	id: {
		type: String,
		default: "",
	},
	currentIndex: {
		type: Number,
		default: -1,
	},
})
const emits = defineEmits(["changePlay", "changeCover"])

const { id, currentIndex } = toRefs(props)
const playState = ref(false) // 是否播放
const audioPlayer = ref(null) //播放器
const progress = ref(0) // 进度
const showLRC = ref(false) // 展示歌词
const currentTime = ref(0)
const lyric = ref("")

// 设置项目的节点
const baseSet = ref(null)
const titleNode = ref(null)
const titleWidth = ref("0")
const controllerNode = ref(null)

// 广播
const musicBroad = new BroadcastChannel("musicInfo")

musicBroad.onmessage = (data) => {
	console.log(data)
	const { closeWin, endPlay, index } = JSON.parse(data.data)
	if (closeWin) {
		sessionStorage.setItem("extendMusic", false)
	}
	if (endPlay) {
		endPlay()
	}
	if (index) {
		emits("changePlay", index)
	}
}

const baseInfo = ref({
	name: "",
	time: 0, // 总时间
	al: {
		picUrl: "http://47.98.47.146/static/headportrait.jpeg",
		name: "littlespring",
	},
	ar: [{ id: "", name: "" }],
	dt: 0,
})

// 1. 通过监听按钮的点击时间，修改音频的播放、暂停状态，并设置对应的 icon.
const playButton = () => {
	if (JSON.parse(sessionStorage.getItem("extendMusic"))) {
	} else {
		if (playState.value) {
			playState.value = false
			audioPlayer.value?.pause()
			emits("changePlay", -1)
		} else {
			playState.value = true
			audioPlayer.value?.play()
		}
	}
}

const chengeCurr = (e) => {
	currentTime.value = e.target.currentTime
	progress.value = (e.target.currentTime * 100) / e.target.duration
}

const music2Down = ref("")

const play = async (id) => {
	const res = await musicUrl(id)
	if (res) {
		// baseInfo.value = { url: res[0].url };
		audioPlayer.value.src = res[0].url
		music2Down.value = res[0].url
		progress.value = 0
		getLyric(id)
		getMusicInfo(id)
		audioPlayer.value?.play()
		playState.value = true
	}
}

const getLyric = async (id) => {
	const res = await lyricInfo(id)
	if (res) {
		lyric.value = res.lrc
	}
}

const getMusicInfo = async (id) => {
	const res = await musicInfo(id)
	if (res) {
		baseInfo.value = res.songs[0]
		emits("changeCover", baseInfo.value.al.picUrl)
	}
}

const check = async (id) => {
	const res = await checkMusic(id)
	if (res) {
		if (res.success) {
			play(id)
		} else {
			DesktopMsg({ title: "无版权", body: res.message })
		}
	}
}

// 音量
const myVolume = ref(0.5)
const showVolume = ref(false)
watch(myVolume, () => {
	audioPlayer.value.volume = myVolume.value
})

// 结束播放，
const endPlay = () => {
	emits("changePlay", currentIndex.value + 1)
}

watch(id, () => {
	if (JSON.parse(sessionStorage.getItem("extendMusic"))) {
		console.log("index", currentIndex.value)
		musicBroad.postMessage(JSON.stringify({ id: id.value, currentIndex: currentIndex.value }))
	} else {
		if (id.value === -1) {
			return
		}
		check(id.value)
		setTimeout(() => {
			if (titleNode.value.offsetWidth > controllerNode.value.offsetWidth) {
				titleWidth.value = -titleNode.value.offsetWidth + "px"
			} else {
				titleWidth.value = "0"
			}
		}, 200)
	}
})

let { ipcRenderer } = window
// 打开新窗口
const openNewWin = () => {
	if (JSON.parse(sessionStorage.getItem("extendMusic"))) {
	} else {
		if (ipcRenderer) {
			playState.value = false
			audioPlayer.value?.pause()
			ipcRenderer.invoke("open-music-win")
			sessionStorage.setItem("extendMusic", true)
			setTimeout(() => {
				musicBroad.postMessage("创建新窗口")
				musicBroad.postMessage(JSON.stringify({ id: id.value, currentIndex: currentIndex.value }))
			}, 400)
		}
	}
}

onMounted(() => {
	// 给音量条 添加点击
	document.addEventListener("click", (e) => {
		if (!baseSet.value) {
			return
		}
		if (!baseSet.value?.contains(e.target)) {
			showVolume.value = false
		}
	})
})

onBeforeUnmount(() => {
	document.body.removeEventListener("click", () => {})
})
</script>

<style scoped lang="scss">
#audio-player {
	width: 90%;
	height: 40vh;
	display: flex;
	justify-content: center;
	padding-right: 10px;
	position: relative;
	margin: auto auto -10px 20px;
	overflow: hidden;
	user-select: none;

	.img-container {
		align-items: center;
		margin: auto;
		width: 50%;
		text-align: center;
		padding: 10px;
		margin: 1px;
		background-size: cover;
		background-repeat: no-repeat;
		// position: relative;
		// width: 110px;

		img {
			// border-radius: 25%;
			// object-fit: cover;
			// background-size: contain;
			height: 100%;
			width: auto;
		}
	}

	.img-container::after {
		content: "";
		// background-color: #fff;
		border-radius: 50%;
		bottom: 100%;

		left: 50%;
		width: 20px;
		height: 20px;
		transform: translate(-50%, 50%);
	}

	.baseSet {
		display: flex;
		align-items: center;

		.setItem {
			margin: 0 5px;
			box-sizing: border-box;
			cursor: pointer;
			color: v-bind(color);
			align-items: center;
			text-align: center;
		}
		.setItem:hover {
			fill: v-bind(themeColor);
			color: v-bind(themeColor);
			border-color: v-bind(themeColor);
		}
	}

	.controller {
		width: 40%;
		height: 100%;
		// min-height: 40vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		overflow: hidden;

		.title {
			// padding-left: 20px;
			display: inline-block;
			// font-size: 12px;
			white-space: nowrap;
			// transition-timing-function: linear;
			animation: 15s wordsLoop linear infinite normal;

			&-title {
			}
			&-name {
			}

			&-name:before {
				content: "-";
				margin: 0 10px;
			}
		}
		// 文字左右滚动
		@keyframes wordsLoop {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(v-bind(titleWidth));
			}
		}

		.navigation {
			display: flex;
			align-items: center;
			justify-content: center;

			// .action-btn {
			//   // background-color: #fff;
			//   border: 0;
			//   // color: #dfdbdf;
			//   font-size: 20px;
			//   cursor: pointer;
			//   // padding: 10px;
			//   margin: 0 20px;
			// }

			// .action-btn:focus {
			//   outline: 0;
			// }

			.player-button {
				cursor: pointer;
			}
		}
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

.volumeRange {
	position: absolute;

	/* 旋转为竖直方向 */
	transform: rotate(-90deg);
}
</style>
