<template>
  <div
    id="audio-player"
    class="pink-atmo-box"
    :style="{ fill: color, color, backgroundColor }"
  >
    <div v-show="!showLRC" class="img-container">
      <img
        :class="playState ? 'rotateLoop' : 'rotatePause'"
        :src="baseInfo.al.picUrl"
        :title="baseInfo.al.picUrl"
        :alt="t('music.musicCover')"
        id="cover"
      />
    </div>
    <LRC
      :currentTime="currentTime"
      :lrc="lyric.lyric"
      v-show="showLRC"
      class="img-container"
    ></LRC>
    <div class="controller">
      <h4 id="title">
        <span class="title-title">{{ baseInfo.name }}</span>
        <span class="title-name" v-show="baseInfo.ar[0].name">{{
          baseInfo.ar[0].name
        }}</span>
      </h4>
      <Progress
        :title="parseInt(currentTime).toString()"
        :value="`${progress}%`"
      ></Progress>
      <div class="baseSet">
        <div
          class="setItem"
          @click="showLRC = !showLRC"
          :style="showLRC && { borderWidth: '1px', borderStyle: 'solid' }"
        >
          {{ t("music.LRC") }}
        </div>
        <a :href="music2Down" class="setItem" @click="">L</a>
      </div>
      <div class="navigation">
        <Icon
          @click="emits('changePlay', currentIndex - 1)"
          name="arrow-left"
          height="24px"
        ></Icon>
        <div v-show="playState" @click="playButton" class="player-button">
          <Icon name="stop" :color="color" />
        </div>
        <div v-show="!playState" @click="playButton" class="player-button">
          <Icon name="start" :color="color" />
        </div>
        <Icon
          @click="emits('changePlay', currentIndex + 1)"
          name="arrow-right"
          height="24px"
        ></Icon>
      </div>
      <div class="list"></div>
    </div>
  </div>
  <audio ref="audioPlayer" @timeupdate="chengeCurr" @ended="endPlay"></audio>
</template>

<script setup lang="ts">
import { DesktopMsg } from "@renderer/utils/notification";
import {
  getListApi,
  searchMusic,
  checkMusic,
  musicUrl,
  musicInfo,
  lyricInfo,
} from "@renderer/api/music";
import LRC from "./LRC.vue";
import { ref, onMounted, toRefs, watch } from "vue";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  currentIndex: {
    type: Number,
    default: -1,
  },
});
const emits = defineEmits(["changePlay"]);

const { id, currentIndex } = toRefs(props);
const playState = ref(false); // 是否播放
const audioPlayer = ref(null); //播放器
const progress = ref(0); // 进度
const showLRC = ref(false); // 展示歌词
const currentTime = ref(0);
const lyric = ref("");

watch(id, () => {
  check(id.value);
});

const baseInfo = ref({
  name: "",
  time: 0, // 总时间
  al: {
    picUrl: "http://47.98.47.146/static/headportrait.jpeg",
    name: "littlespring",
  },
  ar: [{ id: "", name: "" }],
});

// 1. 通过监听按钮的点击时间，修改音频的播放、暂停状态，并设置对应的 icon.
const playButton = () => {
  if (playState.value) {
    playState.value = false;
    audioPlayer.value?.pause();
  } else {
    playState.value = true;
    audioPlayer.value?.play();
  }
};

const chengeCurr = (e) => {
  currentTime.value = e.target.currentTime;
  progress.value = (e.target.currentTime * 100) / audioPlayer?.value.duration;
};

const list = ref([]);
const counts = ref(0);
const current = ref(0);
const currentPlay = ref(-1);
const music2Down = ref("");

const play = async (id) => {
  const res = await musicUrl(id);
  if (res) {
    // baseInfo.value = { url: res[0].url };
    audioPlayer.value.src = res[0].url;
    music2Down.value = res[0].url;
    progress.value = 0;
    getLyric(id);
    getMusicInfo(id);
    audioPlayer.value?.play();
    playState.value = true;
  }
};

const getLyric = async (id) => {
  const res = await lyricInfo(id);
  if (res) {
    lyric.value = res.lrc;
  }
};

const getMusicInfo = async (id) => {
  const res = await musicInfo(id);
  console.log("info", res.songs);
  if (res) {
    baseInfo.value = res.songs[0];
  }
};

const check = async (id) => {
  const res = await checkMusic(id);
  if (res) {
    if (res.success) {
      play(id);
    } else {
      DesktopMsg({ title: "无版权", body: res.message });
    }
  }
};

const endPlay = () => {
  playState.value = false;
  currentIndex.value = -1;
  audioPlayer.value?.pause();
};
</script>

<style scoped lang="scss">
#audio-player {
  width: 70vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  position: fixed;
  // background-color: #fff;
  // border-radius: 15px;
  // box-shadow: 5px 5px 5px 5px rgba(252, 169, 169, 0.6);
  padding: 10px;
  position: relative;
  margin: auto;
  overflow: hidden;
  z-index: 10;

  .img-container {
    align-items: center;
    margin: auto;
    width: 50%;
    text-align: center;
    padding: 10px;
    margin: 10px;
    // position: relative;
    // width: 110px;

    img {
      // border-radius: 25%;
      object-fit: cover;
      background-size: cover;
      height: 26vh;
      width: 100%;
      // position: absolute;
      // bottom: 0;
      // left: 0;
      // animation: rotate 3s linear infinite;
    }
    .rotateLoop {
      animation-play-state: running;
    }

    .rotatePause {
      animation-play-state: paused;
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
      color: black;
      align-items: center;
    }
    .setItem:hover {
      color: v-bind(themeColor);
      border-color: v-bind(themeColor);
    }
  }

  .controller {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .title {
      &-title {
      }
      &-name {
      }
      &-name:before {
        content: "-";
        margin: 0 10px;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;

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
</style>
