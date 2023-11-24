<template>
  <div class="pagination" :style="{ color, backgroundColor }">
    <div
      @click="handleCurrentChange(currentPage - 1)"
      :class="{ forbidden: currentPage - 1 <= 0 }"
      class="pagination-block"
    >
      <Icon class="svgIcon-base" name="arrow-left"></Icon>
    </div>
    <div v-if="pageList[2] - 2 > 1" class="pagination-block">...</div>
    <div
      v-for="pageNum in pageList"
      :key="pageNum"
      class="pagination-block"
      :class="pageNum === currentPage ? 'active' : ''"
      @click="handleCurrentChange(pageNum)"
    >
      {{ pageNum }}
    </div>
    <div v-if="pageMax - pageList[2] > 2" class="pagination-block">...</div>
    <div
      class="pagination-block"
      @click="handleCurrentChange(currentPage + 1)"
      :class="{ forbidden: currentPage + 1 >= pageMax }"
    >
      <Icon class="svgIcon-base" name="arrow-right"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs, watch, onUpdated } from 'vue';
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const define = defineProps({
  total: {
    type: Number,
    default: 9
  },
  pageSize: {
    type: Number,
    default: 9
  },
  currentPage: {
    type: Number,
    default: 1
  }
});

const { total, pageSize, currentPage } = toRefs(define);
const pageMax = () => Math.ceil(total.value / pageSize.value);

const pageList = ref(0);

const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`);
};

const emits = defineEmits(['pageChange']);

const handleCurrentChange = (e) => {
  if (e <= 0 || e > total.value) return;
  emits('pageChange', e);
};

const setPageList = () => {
  pageList.value = [];
  let i = 1;
  pageList.value = Array.from(
    { length: Math.ceil(total.value / pageSize.value) },
    (_, index) => index + 1
  );
  pageList.value.length > 5 && (pageList.value = pageList.value.slice(0, 5)); // 最多显示5页
};

onUpdated(() => {
  setPageList();
});

onMounted(() => {
  setPageList();
});
</script>

<style scoped lang="scss">
.pagination {
  width: auto;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  &-block {
    cursor: pointer;

    display: inline-block;
    width: 30px;
    height: 28px;
    padding: 4px 8px;
    font-size: 1rem;
    line-height: 18px;
    border: 1px solid #ddd;
    border-right: none;
    box-sizing: border-box;

    &:first-child {
      width: 34px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      width: 34px;
      border-right: 1px solid #ddd;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &-block:hover {
    color: v-bind(themeColor);
  }
}
.active {
  color: v-bind(themeColor);
}

.pagination-block {
  // line-height: 10px;
  // width: 10px;
  // height: 10px;
}

// .svgIcon-base:hover {
//   fill: v-bind(themeColor);
// }
.forbidden {
  color: #ccc;
  cursor: not-allowed;
}
</style>
