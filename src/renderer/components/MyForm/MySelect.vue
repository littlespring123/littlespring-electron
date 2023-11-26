<template>
  <div ref="mySelect" class="select-box" :style="{ color, backgroundColor }">
    <label v-if="label">{{ label }}：</label>
    <div class="select-input" @click="toggleDropdown">
      <div v-if="value" class="selected">
        {{ value }}
      </div>
      <div v-else class="selected">
        {{ placeholder }}
      </div>
      <div class="arrow">
        <Icon v-show="isOpen" name="arrow-up"></Icon>
        <Icon v-show="!isOpen" name="arrow-down"></Icon>
      </div>
    </div>
    <ul class="options" v-show="isOpen">
      <li v-for="(item, index) in localdata" :key="index" @click="selectOption(item)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * DataChecklist 数据选择器
 * @description 通过数据渲染的下拉框组件
 * @property {String} value 默认值
 * @property {Array} localdata 本地数据 ，格式 [{text:'',value:''}]
 * @property {Boolean} clear 是否可以清空已选项
 * @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
 * @property {String} label 左侧标题
 * @property {String} placeholder 输入框的提示文字
 * @property {Boolean} disabled 是否禁用
 * @event {Function} change  选中发生变化触发
 */
import { ref, toRefs, onMounted, onBeforeUnmount } from 'vue';

import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const mySelect = ref(null);
const define = defineProps({
  localdata: {
    type: Array,
    default: []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '综合'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const { localdata, label, placeholder, disabled } = toRefs(define);
const value = ref(localdata.value[0].text);

const isOpen = ref(false);

const emit = defineEmits();
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  console.log(isOpen.value, localdata);
};

const selectOption = (option) => {
  value.value = option.text;
  emit('change', option);
  isOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!mySelect.value.contains(e.target)) {
      isOpen.value = false;
    }
  });
});

onBeforeUnmount(() => {
  document.body.removeEventListener('click', () => {});
});
</script>

<style scoped lang="scss">
.select-box {
  position: relative;
  width: 200px;
  align-items: center;
  margin: 3px;
  display: flex;
  // border-radius: 30px;
  label {
    width: 29%;
  }

  .select-input {
    display: flex;
    border-color: v-bind(themeColor);
    justify-content: space-between;
    width: 70%;
    border: 1px solid #ccc;

    .selected {
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    .arrow {
      margin: auto 0;
      width: 20%;
    }

    .arrow:hover {
      cursor: pointer;
      fill: v-bind(themeColor);
      transition: 0.3s;
    }
  }
}

.options {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  max-height: 120px;
  width: calc(200px * 0.7);
  overflow: auto;
  position: absolute;
  top: 100%;
  right: 0;
}

.options li {
  padding: 10px;
  cursor: pointer;
  color: v-bind(color);
  // background-color: v-bind(backgroundColor);
  mix-blend-mode: normal;
}

.options li:hover {
  // color: v-bind(color);
  // background-color: v-bind(backgroundColor);
  background-color: v-bind(themeColor);
  transition: 0.5s;
  // mix-blend-mode: difference;
}
</style>
