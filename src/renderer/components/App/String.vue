<template>
  <div @click="changeTheme" ref="sw" id="sw"></div>
</template>

<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";

const stores = useStore();
const { color, themeColor } = storeToRefs(stores);

const changeTheme = () => {
  let sw = document.getElementById("sw");
  stores.setDarkMode(!stores.darkMode);
  sw?.classList.add("pull");

  setTimeout(() => {
    sw?.classList.remove("pull");
  }, 600);
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

$dark-color: #111;
$light-color: #eee;
$bg-color: #4c6fff;

*,
* *,
*::before,
*::after {
  box-sizing: border-box;
}

#sw {
  position: fixed;
  height: 200px;
  width: 2px;
  background: v-bind(themeColor);
  right: 20%;
  top: -100px;
  z-index: 100;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    border: 2px solid v-bind(themeColor);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    left: -10px;
    bottom: -20px;
  }
}

@keyframes line {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(50px);
  }

  100% {
    transform: translateY(0);
  }
}

.pull {
  animation: line 0.5s ease;
}

.dark {
  background-color: v-bind(color);
  color: v-bind(color);
}
</style>
