<template>
  <view class="list" :style="{ display: layout }">
    <view v-if="listLength === 0" class="">
      <Empty :description="description"></Empty>
    </view>
    <div v-else>
      <slot></slot>
    </div>
  </view>
</template>

<script setup lang="ts">
/**
 * 列表组件
 * layout 布局方式
 * listLength
 */
import Empty from "@renderer/components/Empty.vue";
import { ref, nextTick } from "vue";
// 子传父方法
const emit = defineEmits(["getMore"]);

// 父传子变量
const props = defineProps({
  description: {
    type: String,
    default: "暂无内容",
  },
  layout: {
    type: String,
    default: "block",
  },
  listLength: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
});

// 置顶按钮
const myScroll = ref(0);
const oldScrollTop = ref(0);
const topArrow = ref(false);
const toTop = () => {
  myScroll.value = oldScrollTop.value;
  nextTick(() => {
    myScroll.value = -20;
  });
  topArrow.value = false;
};

const isShowArrow = (e: any) => {
  oldScrollTop.value = e.detail.scrollTop;
  if (e.detail.scrollTop > 0) topArrow.value = true;
  else topArrow.value = false;
};

const getMoreFunc = () => {
  emit("getMore", { page: props.page + 1, pageSize: props.pageSize });
};
</script>

<style lang="scss" scoped>
.list {
  overflow: auto;
  align-items: center;
}

.list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
  border-radius: 0;
  transition: background-color 2s ease;
}

.list:hover::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
  transition: background-color 2s ease;
}

.list::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  transition: background-color 2s ease;
  // display: none;
  // opacity: 0;
}

.list:hover::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  transition: background-color 2s ease;
  // display: inline !important;
  // opacity: 1;
}

.list::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
  transition: background-color 2s ease;
}

.list:hover::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: background-color 2s ease;
}
</style>
