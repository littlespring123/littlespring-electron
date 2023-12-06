<template>
  <div class="m-empty" :style="{ color, backgroundColor }">
    <view v-if="image === 'empty'" class="image">
      <Icon name="empty"></Icon>
    </view>
    <slot v-else>
      <img class="u-empty" :src="image" :style="imageStyle" alt="image" />
    </slot>
    <span
      class="u-description"
      v-if="description"
      :class="{ gray: image === '2' }"
    >
      <slot name="description">{{ description }}</slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor } = storeToRefs(store);

defineProps({
  description: {
    type: String,
    default: "暂无数据",
  },
  width: {
    type: String,
    default: "320px",
  },
  height: {
    type: String,
    default: "240px",
  },
  image: {
    type: String,
    default: "empty",
  },
  imageStyle: {
    type: () => {},
  },
});
</script>
<style lang="scss" scoped>
.m-empty {
  text-align: center;

  .u-empty {
    display: inline-block;
    vertical-align: bottom;
  }

  .u-description {
    display: inline-block;
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.571;
  }

  .gray {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
