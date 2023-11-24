<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { defineComponent, computed, toRefs } from 'vue';

const define = defineProps({
  name: {
    // 自定义svg的name属性
    type: String,
    required: true,
  },
  color: {
    // 自定义svg的color属性
    type: String,
    default: '',
  },
  width: {
    // 自定义svg的color属性
    type: Number,
    default: 16,
  },
  height: {
    // 自定义svg的color属性
    type: Number,
    default: 16,
  },
});

const { name, color } = toRefs(define);

// 这边就是根据props的name来进行处理啦
const iconName = computed(() => `#icon-${name.value}`);
const svgClass = computed(() => {
  if (name.value) {
    return `svg-icon icon-${name.value}`;
  }
  return 'svg-icon'; // svg 标签
});
</script>

<style scoped lang="scss">
.svg-icon {
  fill: v-bind(color);
  color: v-bind(color);
  width: 1.6em;
  height: 1.6em;
  margin-left: 3px;
}
</style>
