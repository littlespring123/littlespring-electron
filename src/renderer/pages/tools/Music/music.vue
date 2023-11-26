<template>
  <div class="search-box" :style="{ color, backgroundColor }">
    <input
      class="search-txt"
      v-model="searchValue"
      type="text"
      :placeholder="t('music.searchMusic')"
    />
    <span @tap="search" class="search-btn"> {{ t('music.searchBtn') }} </span>
  </div>
  <view v-for="(item, index) in list" class="item" :key="index">
    <div class="container" id="container">
      <div
        @click="router.push('/detail?id=' + item.id)"
        v-for="(item, index) in list"
        :key="index"
        class="item"
      >
        <Card
          :title="item.title"
          :sub-title="item.date"
          :extra="'view' + item.count"
          :content="item.content"
        >
          <!-- <img src="@renderer/assets/vue.svg" alt="error"> -->
        </Card>
      </div>
    </div>
    <Pagination :total="list.length * 10" @pageChange="change" :currentPage="1"></Pagination>
  </view>
  <Player></Player>
</template>

<script setup lang="ts">
import Player from './player.vue';
import { ref, onMounted } from 'vue';
import { getMusicList } from '@renderer/api/music';
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const searchValue = ref('');
const list = ref([]);
const counts = ref(0);
const current = ref(0);
const currentPlay = ref(-1);
const paginations = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
});

const getMusic = async () => {
  const res = true; //await getMusicList();
  console.log(res);
  list.value = res.data;
};

const search = () => {
  const res = true; //await searchMusic(searchValue.value,paginations.value.pageNum,paginations.value.pageSize)
  if (res) {
    let temp = res.data.result;
    counts.value = temp.songCount;
    // list.value.push(temp.songs)
    // list.value = temp.songs;
    list.value = [
      {
        name: 'sasa'
      },
      {
        name: 'ssa'
      }
    ];
    searchValue.value = '';
  }
};

const getList = () => {};

// 播放器
const play = (id, index) => {};

function check(id, index) {
  const res = true; // awit chekcMusic(id)
  if (res) {
    if (res.data.success) {
      play(id, index);
    } else {
      console.log('err');
    }
  }
}
const stop = () => {
  innerAudioContext.pause();
  currentPlay.value = -1;
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1px;
  border-radius: 4px;
  // border-bottom: .4px solid lightgray;
  /*首先我们设置边框只显示右侧，宽度为2px的实线。*/
  border-bottom: 3px solid lightgray;
  /*设置线性渐变*/
  // border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, $uni-theme-color 20%, rgba(255, 255, 255, 0) 99%) 10;

  .photo {
    margin: 5px;

    .img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  }

  .main {
    width: 100%;
    margin: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }

    .songer {
      display: flex;
      justify-content: left;
      margin: 5px 0px;
    }

    // .info {
    //   color: grey;
    //   font-size: 0.8rem;
    // }
  }

  .right {
    width: 20vw;
    display: flex;
    align-items: center;

    .font {
      padding: 0.2rem;
      font-size: 0.8rem;
      background-color: lightgray;
      border-radius: 4px;
    }
  }
}

//google
.search-box {
  border: 1px solid v-bind(themeColor);
  width: 70vw;
  margin: 20px auto;
  height: 38px;
  border-radius: 60px;
  padding: 10px;
}

.search-btn {
  float: right;
  width: 20%;
  height: 40px;
  border-radius: 50%;
  // background: #2f3640;
  // background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.search-btn::before {
  content: '|';
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
  font-size: 16px;
  transition: 0.4s;
  height: 40px;
  line-height: 40px;
  // width: 0px;
  width: 70%;
  padding: 0 6px;
}
</style>
