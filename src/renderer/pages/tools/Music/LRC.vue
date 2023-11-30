<template>
  <div ref="container" class="contaniner">
    <ul
      ref="ul"
      class="lrc-list"
      :style="{ transform: `translateY(-${offset}px)` }"
    >
      <li
        v-for="(item, index) in lrcList"
        :class="{ active: activeIndex === index }"
      >
        {{ item.words }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
import { toRefs, ref, watch, onMounted } from "vue";
const props = defineProps({
  currentTime: {
    type: Number,
    default: 0,
  },
  lrc: {
    type: String,
    default: "",
  },
});

const containerHeight = ref(220);
const liHeight = ref(40);
const ul = ref(null);
const { currentTime, lrc } = toRefs(props);
const lrcList = ref([]);
const activeIndex = ref(-1);
const offset = ref(0);

watch(currentTime, (newTime, old) => {
  console.log("curr time", currentTime.value);
  setOffset(newTime);
});

watch(lrc, () => {
  lrcList.value = parseLRC(lrc.value); // 数组，包含{ time:00:00, words:""}
});

/**
 * 时间字符串转时间(秒)
 * @param {String} timeStr
 * @returns
 **/
const parseTime = (timeStr) => {
  let parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
};

/*
 * 解析歌词字符串
 *
 */
const parseLRC = (lyric: string) => {
  let result = [];
  const regex = /\[(.*?)\]/g;
  let lines = lyric.split("\n");
  lines.forEach((item) => {
    let parts = item.split("]");
    const obj = {
      time: parseTime(parts[0].substring(1)),
      words: parts[1],
    };
    result.push(obj);
  });
  console.log("lrc", result);
  return result;
};

/*
 * 计算当前歌词的序号
 */
const findIndex = (newTime) => {
  for (let i = 0; i < lrcList.value.length; i++) {
    if (newTime < lrcList.value[i].time) {
      return i - 1;
    }
  }
  return lrcList.value.length - 1;
};

// 设置ul偏移量
const setOffset = (newTime) => {
  console.log("new time", newTime);
  let index = findIndex(newTime);
  activeIndex.value = index;
  offset.value = Math.max(
    liHeight.value * index + liHeight.value / 2 - containerHeight.value / 2,
    0
  );
  console.log(activeIndex.value, offset.value, index);
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #000;
  color: #666;
  text-align: center;
  font-size: 20px;
}

audio {
  margin: 10px;
}

/* 歌词 */
.contaniner {
  height: v-bind(containerHeight + "px");
  overflow: hidden;
}

ul {
  transition: 2s;
  list-style: none;
}

li {
  line-height: 40px;
  height: 40px;
  transition: 0.3s;
}

.active {
  color: v-bind(themeColor);
  /* font-size: 24px; */
  transform: scale(2);
}
</style>
