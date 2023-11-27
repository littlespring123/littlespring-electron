<script setup lang="ts">
import FloatBtn from "./components/FloatBtn.vue";
import Star from "@renderer/components/App/Star.vue";
import { useStore } from "@renderer/stores";
import Nav from "@renderer/components/Layout/Nav.vue";
import Loading from "@renderer/components/Loading.vue";
import Head from "@renderer/components/Layout/Head.vue";
import String from "@renderer/components/App/String.vue";
import { storeToRefs } from "pinia";
import { toRefs, ref } from "vue";
import router from "@renderer/router";
import i18n from "@renderer/i18n";
const store = useStore();
const roadShow = ref("");
const { color, backgroundColor, scroller } = storeToRefs(store);
const { scrollerColor, scrollerWidth } = toRefs(scroller.value);
store.setColor(JSON.parse(localStorage.getItem("color")));
store.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

const showLayout = ref({
  showNav: true,
  showHead: true,
});

router.afterEach((to, from, next) => {
  console.log(to, to.meta);
  if (Object.keys(to.meta).length !== 0) {
    let { meta } = to;
    showLayout.value = {
      showNav: meta.menuRender,
      showHead: meta.headerRender,
    };
  } else {
    showLayout.value = {
      showNav: true,
      showHead: true,
    };
  }

  if (to.name) {
    roadShow.value = i18n.global.t(to.name.toString());
    document.title = roadShow.value;
  }
  // next();
});
</script>

<template>
  <div class="root" :style="{ color, backgroundColor }">
    <Nav v-show="showLayout.showNav"></Nav>
    <div class="content">
      <Head :road="roadShow" v-show="showLayout.showHead"></Head>
      <!-- 路由切换特效 -->
      <transtion name="swtich">
        <router-view></router-view>
      </transtion>
    </div>
  </div>

  <Loading />
  <Message />
  <String />
  <!-- <FloatBtn></FloatBtn> -->
  <!-- <div v-show="!store.darkMode">
    <Gear></Gear>
  </div> -->
  <Star></Star>
</template>

<style lang="scss">
.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  // margin: 0 auto;
  // justify-content: center;
  transition: 0.3s;
  // padding-top: 10vh;
  overflow: hidden;
  z-index: 99;

  .content {
    // left: 10vw;
    width: 100%;
  }
}

/* 渐入渐出效果 */
.switch-enter-active,
.switch-leave-active {
  transition: opacity 3s;
}

.switch-enter,
.switch-leave-to {
  opacity: 0;
}

// 滚动条
::-webkit-scrollbar {
  // width: v-bind(scrollerWidth + 'px');
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  opacity: 0.1;
  background-color: v-bind(scrollerColor);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
}
</style>
