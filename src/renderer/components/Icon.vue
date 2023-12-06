<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { defineComponent, computed, toRefs } from "vue";

const define = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "32px",
  },
  height: {
    type: String,
    default: "32px",
  },
});

const { name, color } = toRefs(define);

// 这边就是根据props的name来进行处理啦
const iconName = computed(() => `#icon-${name.value}`);
const svgClass = computed(() => {
  if (name.value) {
    return `svg-icon icon-${name.value}`;
  }
  return "svg-icon"; // svg 标签
});
</script>

<style scoped lang="scss">
.svg-icon {
  fill: v-bind(color);
  color: v-bind(color);
  width: v-bind(width);
  height: v-bind(height);
  margin-left: 3px;
}
</style>
