<template>
  <div class="floatBox block-z-index">
    <div class="floatBox-btn" v-for="item in list" @click="item.fun">
      {{ item.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
defineProps({
  isShow: {
    type: Boolean,
    default: true,
  },
  list: {
    default: [
      {
        content: "+",
        fun: () => {
          console.log("hello");
        },
      },
    ],
  },
  top: {
    type: String,
  },
  right: {
    type: String,
    default: "25px",
  },
  bootom: {
    type: String,
    default: "25px",
  },
  left: {
    type: String,
    default: "25px",
  },
});
</script>

<style scoped lang="scss">
.floatBox {
  position: fixed;
  bottom: v-bind(bootom);
  right: v-bind(right);

  &-btn {
    cursor: pointer;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    box-shadow: 10px salmon;
    font-size: 1.5rem;
    text-align: center;
    color: v-bind(color);
    border: 1px solid v-bind(color);
    background-color: v-bind(backgroundColor);
  }

  &-btn:hover {
    color: v-bind(themeColor);
    border: 1px solid v-bind(themeColor);
    transition: 0.5s;
  }
}
</style>
