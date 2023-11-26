<template>
  <text class="tag" v-if="text" :class="classes" :style="customStyle" @click="onClick">{{
    text
  }}</text>
</template>

<script setup lang="ts">
/**
 * Tag 标签
 * @description 用于展示1个或多个文字标签，可点击切换选中、不选中的状态
 * @tutorial https://ext.dcloud.net.cn/plugin?id=35
 * @property {String} text 标签内容
 * @property {String} size = [default|small|mini] 大小尺寸
 * 	@value default 正常
 * 	@value small 小尺寸
 * 	@value mini 迷你尺寸
 * @property {String} color
 * @property {Boolean} disabled = [true|false] 是否为禁用状态
 * @property {Boolean} inverted = [true|false] 是否无需背景颜色（空心标签）
 * @property {Boolean} circle = [true|false] 是否为圆角
 * @event {Function} click 点击 Tag 触发事件
 */
import { storeToRefs } from 'pinia';
import { useStore } from '@renderer/stores/index';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const emits = defineEmits(['click']);
const props = defineProps({
  color: {
    type: String,
    default: '#2979ff'
  },
  size: {
    type: String,
    default: 'normal'
  },
  // 标签内容
  text: {
    type: String,
    default: ''
  },
  disabled: {
    // 是否为禁用状态
    type: [Boolean, String],
    default: false
  },
  inverted: {
    // 是否为空心
    type: [Boolean, String],
    default: false
  },
  circle: {
    // 是否为圆角样式
    type: [Boolean, String],
    default: false
  },
  mark: {
    // 是否为标记样式
    type: [Boolean, String],
    default: false
  },
  customStyle: {
    type: String,
    default: ''
  }
});
const classes = () => {
  const { disabled, inverted, circle, mark, size, isTrue } = toRefs(props);
  const classArr = [
    'tag--' + size,
    isTrue(disabled) ? 'tag--disabled' : '',
    isTrue(inverted) ? 'tag--' + type + '--inverted' : '',
    isTrue(circle) ? 'tag--circle' : '',
    isTrue(mark) ? 'tag--mark' : '',
    isTrue(inverted) ? 'tag--inverted tag-text--' + type : '',
    size === 'small' ? 'tag-text--small' : ''
  ];
  // 返回类的字符串，兼容字节小程序
  return classArr.join(' ');
};
const isTrue = (value) => {
  return value === true || value === 'true';
};
const onClick = () => {
  if (isTrue(disabled)) return;
  emit('click');
};
</script>

<style lang="scss" scoped>
$primary: #2979ff !default;
$info: #8f939c !default;
$theme: #142d88 !default;

$tag-default-pd: 4px 7px;
$tag-small-pd: 2px 5px;
$tag-mini-pd: 1px 3px;

.tag {
  line-height: 14px;
  font-size: 14px;
  font-weight: 200;
  padding: $tag-default-pd;
  color: v-bind(themeColor);
  border-radius: 3px;
  // background-color: $primary;
  border-width: 1rpx;
  border-style: solid;
  border: 1px solid v-bind(themeColor);

  margin: 3px;
  cursor: pointer;

  // size attr
  &--large {
    font-size: 16px;
  }

  &--default {
    font-size: 12px;
  }

  &--default--inverted {
    color: $info;
    border-color: $info;
  }

  &--small {
    padding: $tag-small-pd;
    font-size: 12px;
    border-radius: 2px;
  }

  &--mini {
    padding: $tag-mini-pd;
    font-size: 12px;
    border-radius: 2px;
  }

  // type attr
  &--theme {
    background-color: $theme;
    border-color: $theme;
    color: $theme;
  }

  &--primary--inverted {
    color: $primary;
    border-color: $primary;
  }

  &--inverted {
    background-color: #fff;
  }

  // other attr
  &--circle {
    border-radius: 15px !important;
  }

  &--mark {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-top-right-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.tag-text {
  color: #fff;
  font-size: 14px;

  &--primary {
    color: $primary;
  }
  &--small {
    font-size: 12px;
  }
  &--large {
    font-size: 16px;
  }
}
</style>
