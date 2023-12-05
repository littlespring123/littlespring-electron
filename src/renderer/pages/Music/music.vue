<template>
  <div class="music-box">
    <Player
      :id="currentId"
      :currentIndex="currentPlay"
      @changePlay="clickPlay"
      @changeCover="changeCover"
    ></Player>
    <div class="show-list">
      <div class="search pink-atmo-box block-z-index">
        <div
          @keydown.ctrl.t="emptySearchList"
          @keyup.enter="search"
          class="search-box"
        >
          <input
            class="search-txt"
            v-model="searchValue"
            type="text"
            :placeholder="t('music.searchMusic')"
          />
          <div class="search-btn">
            <Icon
              v-show="searchValue"
              @click="emptySearchList"
              width="15px"
              name="close"
            ></Icon>
            <div class="btn" @click="search">
              {{ t("music.searchBtn") }}
            </div>
          </div>
        </div>
        <List
          :listLength="searchList.length"
          margin="0px"
          padding="0px"
          class="search-list"
          description="搜索查看"
        >
          <div
            @click="add2PlayList(item)"
            v-for="(item, index) in searchList"
            class="item"
            :key="index"
          >
            <span>
              {{ item.name }}
              <Tag
                text="vip"
                :circle="true"
                size="mini"
                :color="themeColor"
                v-if="item.fee === 1 || item.fee === 4"
              ></Tag>
            </span>
            <span>{{ item?.artists[0].name }}</span>
          </div>
        </List>
      </div>
      <List
        :listLength="playList.length"
        margin="0px"
        padding="0px"
        class="play-list pink-atmo-box block-z-index"
        description="暂无播放内容"
      >
        <div
          :class="{ active: currentId === item.id }"
          v-for="(item, index) in playList"
          class="item"
          :key="item.id"
        >
          <div>{{ item.name }} - {{ item?.artists[0].name }}</div>
          <div class="item-right" v-show="currentId !== item.id">
            <div style="align-items: center">
              {{ secTotime(item.duration / 1000) }}
            </div>
            <Icon
              @click="
                currentId = item.id;
                currentPlay = index;
              "
              name="start"
              width="14px"
            ></Icon>
            <Icon
              @click="removeList(item.id)"
              name="delete"
              width="14px"
            ></Icon>
          </div>
        </div>
      </List>
    </div>
  </div>
  <div
    class="bgc canvas-z-index"
    :style="{ color, backgroundImage: `url(${coverUrl})` }"
  ></div>
</template>

<script setup lang="ts">
import {
  getListApi,
  searchMusic,
  checkMusic,
  musicInfo,
} from "@renderer/api/music";
import { secTotime } from "@renderer/utils/date";
import Player from "./player.vue";
import { ref, onMounted, watch, Ref } from "vue";
import { DesktopMsg } from "@renderer/utils/notification";
import { getMusicList } from "@renderer/api/music";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const searchValue: Ref<string> = ref("");
const searchList = ref([]);
const playList = ref([]);
const counts: number = ref(0);
const currentId: number = ref(0);
const currentPlay: number = ref(-1);
const coverUrl: Ref<String> = ref("");

const search = async () => {
  if (!searchValue.value) return;
  const res = await searchMusic(searchValue.value);
  if (res) {
    counts.value = res.songCount;
    searchList.value = res.songs;
  }
};

// 播放列表
const add2PlayList = (item) => {
  if (item.fee === 1 || item.fee === 4) {
    DesktopMsg({ title: "＞﹏＜", body: "vip歌曲不能播放" });
    return;
  }
  if (playList.value.includes(item)) return;
  playList.value.push(item);
  localStorage.setItem("playlist", JSON.stringify(playList.value));
};

const removeList = (removeIdx: number) => {
  playList.value = playList.value.filter((item) => removeIdx !== item.id);
  localStorage.setItem("playlist", JSON.stringify(playList.value));
};

/**
 * 播放下一首
 * @param {number} index
 */
const clickPlay = (index) => {
  if (index < 0 || index > playList.length) return;
  currentId.value = playList.value[index].id;
  currentPlay.value = index;
};

const changeCover = (url) => {
  coverUrl.value = url;
};

const emptySearchList = () => {
  searchList.value = [];
  searchValue.value = "";
};

onMounted(() => {
  playList.value = JSON.parse(localStorage.getItem("playlist")) || [];
});
</script>

<style scoped lang="scss">
.music-box {
  align-items: center;
  width: 100%;
  height: 85vh;
  // overflow: auto;
  // background-size: cover;
  // backdrop-filter: blur(30px); /* 可以调整模糊程度 */
  // filter: blur(10px);
  z-index: 100;

  .show-list {
    margin: 20px 0 0 0;

    display: flex;
    justify-content: space-around;

    .play-list {
      width: 50%;
      height: 40vh;
      padding: 10px 5px;
      box-sizing: border-box;
      background-color: v-bind(backgroundColor);
    }

    .search {
      width: 40%;
      height: 40vh;
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 5px;
      background-color: v-bind(backgroundColor);

      &-box {
        display: flex;
        border: 1px solid #ccc;
        width: 80%;
        height: 38px;
        border-radius: 60px;

        .search-btn {
          width: 30%;
          height: 40px;
          border-radius: 50%;
          // background: #2f3640;
          // background-color: white;
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
          // padding: 0;
          // color: black;
          font-size: 14px;
          transition: 0.4s;
          height: 40px;
          line-height: 40px;
          // width: 0px;
          width: 60%;
          padding: 0 6px;
        }
      }

      &-box:hover {
        fill: v-bind(themeColor);
        color: v-bind(themeColor);
        border: 1px solid v-bind(themeColor);
      }

      &-list {
        // border: 1px solid #ccc;
        padding: 3px;
        max-height: 30vh;
        // overflow: hidden;
      }

      // &-list:hover {
      //   overflow: auto;
      // }
    }
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
  filter: blur(3px);
}
</style>
