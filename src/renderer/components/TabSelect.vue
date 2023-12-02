<template>
  <div class="tab">
    <div
      v-for="(tab, index) in list"
      class="tab-item"
      :key="tab.id"
      @click="changeTab(index)"
      :class="{ active: activeTab === index }"
    >
      {{ tab.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 选项卡
 * @params list 标签栏列表
 * @params {number} activeIndex 激活index
 *  */
import { ref, toRefs } from "vue";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const activeTab = ref(0);

const emits = defineEmits(["change"]);

const define = defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const { list, activeIndex } = toRefs(define);

const changeTab = (index: number) => {
  emits("change", index);
  activeTab.value = index;
};
</script>

<style scoped lang="scss">
.tab {
  display: flex;
  margin: 0;
  padding: 0 4px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;

  &-item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid v-bind(themeColor);
    transition: 0.3s;
  }

  &-item:first-child {
    border-radius: 10px 0px 0px 0px;
  }
  &-item:last-child {
    border-radius: 0px 0px 10px 0px;
  }
}

.active {
  background-color: v-bind(themeColor);
}
</style>
