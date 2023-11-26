<template>
  <div class="floatBtn" :style="{ border: `1px solid ${color}`, color, backgroundColor }">
    <div v-for="item in list" @click="item.fun">
      {{ item.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
// import { useRouter } from 'vue-router';
// const router = useRouter()
const store = useStore();
const { color, backgroundColor } = storeToRefs(store);
defineProps({
  isShow: {
    type: Boolean,
    default: true
  },
  list: {
    default: [
      {
        content: '+',
        fun: () => {
          console.log('hello');
        }
      }
    ]
  },
  top: {
    type: String
  },
  right: {
    type: String,
    default: '25px'
  },
  bootom: {
    type: String,
    default: '25px'
  },
  left: {
    type: String,
    default: '25px'
  }
});
</script>

<style scoped lang="scss">
.floatBtn {
  cursor: pointer;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  box-shadow: 10px salmon;
  position: fixed;
  font-size: 1.5rem;
  text-align: center;
  bottom: v-bind(bootom);
  right: v-bind(right);
}
.floatBtn:hover {
  mix-blend-mode: difference;
  transition: 0.5s;
}
</style>
