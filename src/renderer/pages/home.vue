<template>
  <div class="root" :style="{ color, backgroundColor }">
    <div class="box">
      <div class="avatar">
        <img class="img" src="../assets/headportrait.jpeg" alt="" />
        <div>littlespring</div>
      </div>
      <div @click="router.push('/blog')" class="list">
        <div class="item">
          <div>{{ t("home.article") }}</div>
          <div>{{ overViewInfo?.articleCount }}</div>
        </div>
        <div class="item">
          <div>{{ t("home.categorize") }}</div>
          <div>{{ overViewInfo?.tagCount }}</div>
        </div>
        <div class="item">
          <div>{{ t("home.viewer") }}</div>
          <div>{{ overViewInfo?.viewCount }}</div>
        </div>
      </div>
      <div class="link">
        <div>{{ t("home.site") }}<a>http://local</a></div>
        <div>{{ t("home.github") }}<a>https://github</a></div>
      </div>
    </div>
    <!-- <div class="search-box" :style="{ border: `1px solid ${themeColor}` }">
      <input
        :style="{ borderRight: `1px solid ${themeColor}` }"
        class="search-txt"
        v-model="searchValue"
        type="text"
        placeholder="what are you looking for?"
      />
      <span @click="search" class="search-btn" :style="{ color, backgroundColor }"> search </span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
import { getOverViewApi } from "@renderer/api/blog";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const searchValue = ref("");
const overViewInfo = ref({
  articleCount: 0,
  viewCount: 0,
  tagCount: 0,
});

const getOverView = async () => {
  const res = await getOverViewApi();
  if (res) {
    overViewInfo.value = res;
  }
};

const search = () => {
  router.push("/blog?key=" + searchValue.value);
};

onMounted(() => {
  getOverView();
});
</script>

<style lang="scss" scoped>
.root {
  width: 100vw;
  max-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  background: url("../assets/background_snow.jpg") no-repeat;
}

.box {
  // background-color: rgba(255, 255, 255, 0.5);
  // border: 1px solid v-bind(themeColor);
  margin: 10px auto;
  max-width: 80vw;
  backdrop-filter: blur(10px);
  //   width: 100%;
  border-radius: 10px;

  .avatar {
    display: flex;
    align-items: center;
    flex-direction: column;
    // padding: 10px auto;
    margin: 2vh auto;

    .img {
      border-radius: 10px;
      text-align: center;
      width: 5vw;
      height: 5vw;
    }
  }

  .list {
    display: flex;

    .item {
      text-align: center;
      border-right: 2px solid v-bind(themeColor);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      mix-blend-mode: difference;

      // height: 2rem;
      padding: 2vh 5vw;
    }

    .item:last-child {
      border-right: 0px;
    }
  }

  .link {
    text-align: center;
    padding: 2rem;
    mix-blend-mode: difference;
  }
}

//google
.search-box {
  max-width: 70vw;
  // width: 70vw;
  margin: 2px auto;
  height: 38px;
  border-radius: 60px;
  // mix-blend-mode: difference;
  // backdrop-filter:
  padding: 10px;
}

.search-btn {
  // color: #988fc7;
  cursor: pointer;
  float: right;
  width: 20%;
  height: 40px;
  border-radius: 50%;
  // background: #2f3640;
  // background-color: white;
  display: flex;
  justify-content: center;
  // mix-blend-mode: difference;

  align-items: center;
  transition: 0.4s;
}

.search-txt {
  border: none;
  // mix-blend-mode: difference;

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
