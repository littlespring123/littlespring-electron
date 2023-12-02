<template>
  <canvas
    v-show="store.darkMode"
    id="star"
    class="star canvas-z-index"
    width="99vw"
    height="99vh"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@renderer/stores";
const store = useStore();
let canvas: any;
let ctx: any;
let meterors: any[] = [];
let allstar = 40;

const newmeteror = () => {
  meterors.push({
    lines: [
      {
        x: parseInt((Math.random() * canvas.width).toString()),
        y: parseInt((Math.random() * canvas.height * 0.7).toString()),
      },
    ],
    life: parseInt((Math.random() * 100).toString()) + 100,
    age: 0,
  });
};

const init = () => {
  for (let i = 0; i < allstar; i++) {
    newmeteror();
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, length = meterors.length; i < length; i++) {
    let meteror = meterors[i];
    let line = meteror.lines;
    for (let j = 0; j < line.length; j++) {
      ctx.fillStyle = `rgba(255,255,255,${j / line.length})`;
      ctx.fillRect(line[j].x, line[j].y, 1, 1);
    }
    let s_head = line[line.length - 1];
    ctx.fillRect(s_head.x, s_head.y, 2, 2);
    if (meteror.age <= meteror.life / 2) {
      line.push({
        x: s_head.x + 1,
        y: s_head.y + 0.3,
      });
    } else {
      line.shift();
    }
    meteror.age++;
    if (meteror.age >= meteror.life) {
      meterors.splice(i, 1);
      newmeteror();
    }
  }
};

onMounted(() => {
  canvas = document.getElementById("star");
  ctx = canvas?.getContext("2d"); //取得2d上下文对象(画笔)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  meterors = [];
  allstar = 40;
  init();
  setInterval(draw, 1);
});
</script>
<style scoped lang="scss">
.star {
  // z-index: -1;
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  color: white;
}
</style>
