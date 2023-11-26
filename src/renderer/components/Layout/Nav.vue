<template>
  <div
    class="Nav shell"
    :class="showMenu ? '' : 'close'"
    :style="{ color, backgroundColor }"
  >
    <div class="logo">
      <!-- <span class="logo-img"> -->
      <img
        @click="router.push('/login')"
        src="@renderer/assets/headportrait.jpeg"
        alt=""
      />
      <!-- </span> -->
      <!-- <div class="text logo-text">
        <span class="name">littlespring</span>
      </div> -->
    </div>
    <div class="menu-bar">
      <div class="menu">
        <ul class="menu-links">
          <li
            class="nav-link"
            :class="{ active: activeIndex === index }"
            v-show="!item?.hiden"
            @click="
              router.push(item.path);
              activeIndex = index;
            "
            v-for="(item, index) in routes"
            :key="index"
          >
            <Icon class="iconfont icon" :name="item.icon" :color="color"></Icon>
            <span class="text nac-text">{{ t(item.name) }}</span>
            <!-- :color="index === activeIndex ? themeColor : color" -->
          </li>
        </ul>
      </div>
      <div class="bottom-content">
        <ul class="menu-links">
          <li
            class="nav-link"
            v-show="!item?.hiden"
            @click="
              item.operate();
              activeIndex = -1;
            "
            v-for="(item, index) in bottomNav"
            :key="index"
          >
            <Icon class="iconfont icon" :color="color" :name="item.icon"></Icon>
            <span class="text nac-text">{{ t(item.name) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div @click="showMenu = true" class="tag" v-show="!showMenu">show</div> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import routes from "@renderer/router/routerList";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const store = useStore();
const router = useRouter();
const showMenu = ref(true);
const { color, backgroundColor, themeColor } = storeToRefs(store);

const activeIndex = ref(0);

const bottomNav = ref([
  {
    name: "nav.set",
    icon: "set",
    operate: () => router.push("/set"),
  },
  {
    name: "nav.hide",
    icon: "hide",
    operate: () => (showMenu.value = !showMenu.value),
  },
]);

// const getImageUrl = (icon: any) => {
//   return new URL(`../assets/${icon}`, import.meta.url).href;
// };
</script>

<style scoped lang="scss">
$body-color: #e4e9f7;
$shell-color: #fff;
$primary-color: #695cfe;
$primary-color-light: #f6f5ff;
$text-color: #707070;

/* 深色主题变量 */
// .dark {
//   $body-color: #202224;
//   $shell-color: #171717;
//   $primary-color: #3a3b3c;
//   $primary-color-light: #3a3b3c;
//   // $toggle-color: #fff;
//   $text-color: #ccc;
// }

.shell {
  // position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  // width: 250px;
  border: 1px solid #ccc;
  width: 13vw;
  padding: 10px 14px;
  background: $shell-color;
  transition: all 0.3s ease;
  z-index: 100;

  li {
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
    // justify-content: center;
    justify-content: left;
  }
}

.close {
  width: 7vw;
}

.icon {
  min-width: 60px;
  border-radius: 6px;
}

.icon {
  min-width: 60px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 300 23px "";
}

.text,
.icon {
  color: $text-color;
  transition: all 0.3s ease;
}

.text {
  cursor: pointer;
  font: 500 17px;
  white-space: nowrap;
  opacity: 1;
}

.shell.close .text {
  opacity: 0;
  // display: none;
}

.shell li a {
  list-style: none;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shell li:hover {
  background-color: v-bind(themeColor);
  color: v-bind(color);
}

.shell li:hover .icon,
.shell li:hover .text {
  color: $shell-color;
}

// .active {
//   color: $shell-color;
//   fill: $shell-color;
//   // mix-blend-mode: difference;
//   background-color: v-bind(themeColor);
// }

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  // width: 45px;
  // border-radius: 6px;

  // &-img {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;

  img {
    width: 55px;
    border-radius: 6px;
  }
  // }

  &-text {
    display: flex;
    flex-direction: column;

    .name {
      margin-top: 2px;
      font: 600 18px "";
    }
  }
}

// menu
.menu-bar {
  height: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  overflow-y: scroll;

  .menu {
    margin-top: 20px;
  }
}

.menu-bar::-webkit-scrollbar {
  display: none;
}
</style>
