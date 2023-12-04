<template>
  <div class="content">
    <p class="tips">Enter your personal details and start journey with us.</p>
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
        <div>{{ t("home.site") }}<span>http://local</span></div>
        <div>{{ t("home.github") }}<span>https://github</span></div>
      </div>
    </div>
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

onMounted(() => {
  getOverView();
});
</script>

<style lang="scss" scoped>
// .root {
//   width: 100vw;
//   max-height: 100vh;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   transition: 0.3s;
//   background: url("../assets/background_snow.jpg") no-repeat cover;
// }

.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  transition: 0.3s;
  background-image: url("../assets/home-bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: #fff;

  .tips {
    font-size: 25px;
    line-height: 100%;
    text-align: center;
    width: 60%;
    height: 100%;
    transform: translateY(50%);
  }

  .box {
    backdrop-filter: blur(10px);
    border-radius: 10px;
    width: 40%;
    height: 100%;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: auto;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

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
        color: #fff;
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
      color: #fff;
      text-align: center;
      padding: 2rem;
      mix-blend-mode: difference;
    }
  }
}
</style>
