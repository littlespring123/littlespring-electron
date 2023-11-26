<template>
  <div id="audio-player" :style="{ color, backgroundColor }">
    <div v-show="!showLRC" class="img-container">
      <img
        :class="playState ? 'rotateLoop' : 'rotatePause'"
        src="images/ukulele.jpg"
        :alt="t('music.musicCover')"
        id="cover"
      />
    </div>
    <LRC :currentTime="currentTime" :lrc="lyric" v-show="showLRC" class="img-container"></LRC>
    <div class="controller">
      <div class="music-info">
        <h4 id="title">{{ baseInfo.title }}</h4>
        <Progress :value="`${progress}%`"></Progress>
      </div>
      <div class="baseSet">
        <div
          class="setItem"
          @click="showLRC = !showLRC"
          :style="showLRC ? `border:1px solid ${color}` : ''"
        >
          {{ t('music.LRC') }}
        </div>
      </div>
      <div class="navigation">
        <!-- <button id="prev" class="action-btn">
          <Icon class="svgIcon-base" name="arrow-left"></Icon>
        </button> -->
        <div v-show="playState" @click="playButton" class="player-button">
          <Icon name="stop" :color="color" />
        </div>
        <div v-show="!playState" @click="playButton" class="player-button">
          <Icon name="start" :color="color" />
        </div>
        <!-- <button id="next" class="action-btn">
          <Icon class="svgIcon-base" name="arrow-right"></Icon>
        </button> -->
      </div>
    </div>
  </div>
  <!-- <audio ref="audioPlayer" @timeupdate="chengeCurr" :src="baseInfo.url"></audio> -->
  <audio ref="audioPlayer" @timeupdate="chengeCurr"></audio>
  <!-- style="display: none" -->
</template>

<script setup lang="ts">
import LRC from './LRC.vue';
import { lyric } from './lyric.js';
import { ref, onMounted } from 'vue';
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const playState = ref(false); // 是否播放
const audioPlayer = ref(null); //播放器
const progress = ref(0); // 进度
const showLRC = ref(false); // 展示歌词
const currentTime = ref(0);

// const audio = document.querySelector('audio'); // 获取音频
const baseInfo = ref({
  title: '',
  timeline: 0, // 总时间
  cover: '',
  url: ''
});

const getInfo = () => {
  const res = true; // await
  if (res) {
    baseInfo.value = {
      title: '周杰伦',
      timeline: 7,
      endTime: 12,
      url: 'http://m701.music.126.net/20231113001353/fd9dd48b8ae3b8c74383fbd5c5d08da0/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8691015841/c477/085a/8455/ba7bd30c62cb663a710a72911049feb6.mp3'
    };
  }
};

// 1. 通过监听按钮的点击时间，修改音频的播放、暂停状态，并设置对应的 icon.
const playButton = () => {
  if (playState.value) {
    playState.value = false;
    audioPlayer.value?.pause();
  } else {
    playState.value = true;
    audioPlayer.value?.play();
  }
  console.log();
};

const chengeCurr = (e) => {
  currentTime.value = e.timeStamp;
  progress.value = e.timeStamp / (audioPlayer.value.duration * 10);
};
// audio.addEventListener('timeupdate', () => {
//
// });

// 3. 如果播放结束，将播放按钮重置为暂停状态。
// audio.onended = audioEnded = () => {
//   playerButton.innerHTML = playIcon;
// };

// 4. 监听进度条变化，并设置音频位置。
// timeline.addEventListener('change', () => {
//   const time = (timeline.value * audio.duration) / 100;
//   audio.currentTime = time;
// });

// 5. 监听音频按钮变化，并设置对应的状态（是否静音）和icon
// soundButton.addEventListener('click', () => {
//   audio.muted = !audio.muted;
//   soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
// });

const updateProgress = () => {
  if (audioPlayer.value) {
    progress.value = audioPlayer.value.currentTime;
  }
};
// audioPlayer.value.addEventListener('timeupdate', updateProgress);

onMounted(() => {
  getInfo();
  console.log('audio', audioPlayer.value, audioPlayer.value.duration);
  audioPlayer.value.src = baseInfo.value.url;
});
</script>

<style scoped lang="scss">
#audio-player {
  width: 70vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  position: fixed;
  // bottom: 10px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 20px 20px 10px rgba(252, 169, 169, 0.6);
  padding: 20px 30px;
  position: relative;
  margin: 100px auto;
  overflow: hidden;
  z-index: 10;

  .img-container {
    align-items: center;
    margin: auto;
    width: 70%;
    text-align: center;
    // position: relative;
    // width: 110px;

    img {
      border-radius: 50%;
      object-fit: cover;
      height: 110px;
      width: inherit;
      // position: absolute;
      bottom: 0;
      left: 0;
      animation: rotate 3s linear infinite;
    }
    .rotateLoop {
      animation-play-state: running;
    }

    .rotatePause {
      animation-play-state: paused;
    }
  }

  .img-container::after {
    content: '';
    background-color: #fff;
    border-radius: 50%;
    // position: absolute;
    bottom: 100%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, 50%);
  }

  .baseSet {
    display: flex;

    .setItem {
      box-sizing: border-box;
      cursor: pointer;
    }
  }

  .controller {
    width: 30%;
    // display: flex;

    .music-info {
      display: flex;  
    }

    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;

      .action-btn {
        background-color: #fff;
        border: 0;
        color: #dfdbdf;
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
        margin: 0 20px;
      }

      .action-btn.action-btn-big {
        color: #cdc2d0;
        font-size: 30px;
      }

      .action-btn:focus {
        outline: 0;
      }

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
