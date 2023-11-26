<template>
  <!-- 消息列表 -->
  <transition name="slide-fade">
    <div class="message-container" :class="{ slideFade: !message.show }">
      <!-- 内容 -->
      <div class="message-content">
        <!-- 消息类型图标，通过消息类型确定，text类型不配置图标 -->
        <div class="message-icon" v-if="message.icon">
          <Icon :name="message.icon"></Icon>
        </div>
        <!-- 消息文本 -->
        <span v-text="message.text"></span>
        <!-- 手动关闭消息 -->
        <div class="option" v-if="!close">
          <i class="ri-close-fill" @click="onClose"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@renderer/stores";
const store = useStore();
const { message } = storeToRefs(store);

// defineProps({
//   show: {
//     type: Boolean,
//     default: false,
//   },
//   text: {
//     type: String,
//     default: 'Loading...',
//   },
//   icon: {
//     type: String,
//     default: 'success',
//   },
//   close: {
//     type: Function,
//     default: () => {},
//   },
//   remove: { type: Function, default: () => {} }, // 取消挂载回调
// });

// const state = reactive({
//   visibled: false,
// });

// 打开消息
const onOpen = (config) => {
  // setTimeout(() => {
  message.value.show = true;
  // }, 10);

  // 指定时间后移除消息
  if (message.duration !== 0) {
    setTimeout(() => {
      onClose();
    }, message.value.duration);
  }
};

watch(message, () => {
  onOpen();
});

// 消息关闭
const onClose = () => {
  message.value.show = false;
};
</script>

<style scoped lang="scss">
$radius: 4px;
$normalHeight: 34px;

.message-container {
  // margin-bottom: 14px;
  position: fixed;
  top: 60px;
  right: 10px;
  width: 20vw;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  z-index: 9999;
  transition: right 1s ease-in-out;

  .message-icon {
    display: inline-block;

    i {
      font-size: 18px;
      font-weight: 400;
      margin-top: -3px;
      margin-right: 6px;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: middle;
    }

    .ri-checkbox-circle-fill {
      color: #58c05b;
    }

    .ri-close-circle-fill {
      color: #fd4f4d;
    }
  }

  .message-content {
    // border: 1px solid red;
    display: inline-block;
    padding: 4px 18px;
    height: $normalHeight;
    text-align: left;
    line-height: $normalHeight;
    font-size: 14px;
    font-weight: 400;
    border-radius: $radius;
    box-shadow: 0px 3px 0px 1px #ccc;
    color: #595959;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: #ffffff;

    .option {
      display: inline-block;
      pointer-events: all;
      margin-left: 18px;

      i {
        font-size: 18px;
        font-weight: 400;
        margin-top: -3px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        cursor: pointer;
        color: #d9d9d9;
        transition: color 0.2s ease;

        &:hover {
          color: #ff7c75;
          transition: color 0.2s ease;
        }
      }
    }
  }
}

// .slide-fade-enter-active {
//   transition: all 0.2s ease-out;
// }

// .slide-fade-leave-active {
//   transition: all 0.2s ease;
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//   transform: translateY(-20px);
//   opacity: 0;
// }

.slideFade {
  right: -400px;
}
</style>
