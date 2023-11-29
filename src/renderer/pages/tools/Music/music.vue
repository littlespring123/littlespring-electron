<template>
  <div class="root">
    <div class="search">
      <div class="search-box" :style="{ color, backgroundColor }">
        <input
          class="search-txt"
          v-model="searchValue"
          type="text"
          :placeholder="t('music.searchMusic')"
        />
        <span @click="search" class="search-btn">
          {{ t("music.searchBtn") }}
        </span>
      </div>
      <List
        :page="paginations.pageNum"
        :pageSize="paginations.pageSize"
        :listLength="list.length"
        margin="0px"
        padding="0px"
        class="list"
        description="搜索查看"
      >
        <div
          @click="
            currentId = item.id;
            currentPlay = index;
          "
          :class="{ active: currentPlay === index }"
          v-for="(item, index) in list"
          class="item"
          :key="index"
        >
          <span>{{ item.name }}</span>
          <span>{{ item?.artists[0].name }}</span>
        </div>
      </List>
    </div>
    <Player :id="currentId"></Player>
  </div>
</template>

<script setup lang="ts">
import {
  getListApi,
  searchMusic,
  checkMusic,
  musicInfo,
} from "@renderer/api/music";
import Player from "./player.vue";
import { ref, onMounted } from "vue";
import { getMusicList } from "@renderer/api/music";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const searchValue = ref("");
const list = ref([]);
const counts = ref(0);
const currentId = ref(0);
const currentPlay = ref(-1);
const paginations = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

const search = async () => {
  const res = await searchMusic(
    searchValue.value,
    paginations.value.pageNum,
    paginations.value.pageSize
  );
  if (res) {
    console.log("music", res);
    counts.value = res.songCount;
    list.value = res.songs;
    // searchValue.value = "";
  }
};
</script>

<style scoped lang="scss">
.root {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 60vh;

  background-color: #fff;
  border-radius: 15px;
  box-shadow: 10px 10px 10px 4px rgba(252, 169, 169, 0.6);
  padding: 20px 30px;
  // position: relative;
  margin: 10px auto;
  overflow: hidden;
  z-index: 10;

  .search {
    width: 40%;
    height: 80%;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;

    .search-box {
      border: 1px solid v-bind(themeColor);
      width: 80%;
      height: 38px;
      border-radius: 60px;

      .search-btn {
        float: right;
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
      }

      .search-btn::before {
        content: "|";
        margin: 0 10px;
        width: 3px;
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

    .list {
      border: 1px solid #ccc;
      padding: 3px;
      .item {
        margin: 4px;
        cursor: pointer;
      }
      .item:hover {
        color: v-bind(themeColor);
      }
    }
  }
}

.active {
  color: v-bind(themeColor);
}
</style>
