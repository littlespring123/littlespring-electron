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
const { color, backgroundColor, scroller, themeColor } = storeToRefs(store);
const { scrollerColor, scrollerWidth } = toRefs(scroller.value);
store.setColor(store.getFromLocal("color"));
store.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
store.setLanguageMode(store.getFromLocal("languageMode") || "cn");

const showLayout = ref({
  showNav: true,
  showHead: true,
});

router.afterEach((to, from, next) => {
  // 是否显示layout
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
    store.setMenuActive(to.path);
    roadShow.value = i18n.global.t(to.name.toString());
    document.title = roadShow.value;
  }
  // next();
});
</script>

<template>
  <Star></Star>
  <div class="root" :style="{ color, backgroundColor }">
    <transtion name="swtich">
      <Nav v-show="showLayout.showNav"></Nav>
    </transtion>
    <div class="content">
      <Head :road="roadShow" v-show="showLayout.showHead"></Head>
      <!-- 路由切换特效 -->
      <transtion name="swtich">
        <router-view></router-view>
      </transtion>
    </div>
  </div>

  <Loading />
  <String />
</template>

<style lang="scss">
.root {
  width: 100vw;
  height: 100vh;
  display: flex;
  transition: 0.3s;
  overflow: hidden;

  .content {
    // left: 10vw;
    width: 100%;
    position: relative;
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
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}

.pink-atmo-box {
  border-radius: 15px;
  box-shadow: 5px 5px 5px 4px rgba(252, 169, 169, 0.6);
}

// 层级类
.back-z-index {
  z-index: 1;
}

.canvas-z-index {
  z-index: 5;
}

.block-z-index {
  position: relative;
  z-index: 10;
}
</style>
