<template>
  <view class="">
    <view v-if="listLength === 0" class="">
      <Empty description="暂无活动"></Empty>
    </view>
    <div style="height: 100vh" v-else>
      <slot></slot>
    </div>
  </view>
</template>

<script setup lang="ts">
import Empty from '@renderer/components/Empty.vue';
import { ref, nextTick } from 'vue';
// 子传父方法
const emit = defineEmits(['getMore']);

// 父传子变量
const props = defineProps({
  layout: {
    type: String,
    default: ''
  },
  listLength: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  }
});

// 置顶按钮
const myScroll = ref(0);
const oldScrollTop = ref(0);
const topArrow = ref(false);
const toTop = () => {
  console.log('出发了', myScroll.value);
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
  emit('getMore', { page: props.page + 1, pageSize: props.pageSize });
};
</script>

<style lang="scss" scoped></style>
