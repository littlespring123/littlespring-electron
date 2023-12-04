<template>
  <div class="container" @click="click()">
    <div class="hd">
      分数<span class="scope">000</span>
      <span>速度:{{ speed }}</span>
    </div>
    <div class="bird"></div>
  </div>
  <div v-show="!startState" class="board">
    <div class="button" @click="start()">开始</div>
    <div class="button" @click="stop()">暂停</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const pipe_width = ref();
const bird_width = ref();
const bird_height = ref();
let distance = null;
let time_down = null;
let add_pipe = null;
let delete_pipe = null;
const startState = ref(false);
// 点击一下 小鸟上升
const click = () => {
  // 通过控制speed来间接的让小鸟上升 这样不仅代码更少 而且游戏手感更接近原版 （原版的小鸟就非常难以操控）
  speed.value -= 7;
};

let container = null;
const bird = ref(null);
let scope = null;

// 原版的像素鸟小鸟下降速度会越来越快 小鸟在多次点击后上升的速度也会越来越快
let speed = ref(10); // 所以提供一个共用变量给下降和上升，它用来控制小鸟上下跳动的距离
// 小鸟移动的函数
function bird_fly() {
  speed.value += 2;
  // 当speed是正数的时候 小鸟就会下降 当speed是负数时 小鸟就会上升
  bird.value.setAttribute(
    "style",
    `top:${bird.value.offsetTop + speed.value}px`
  );
}

// 随机出现的水管
// 1. 每过1秒出现一对 上下 高度随机的水管
// 2. 水管自右向左移动 通过动画实现
// 3. 判断水管和小鸟的距离 每100ms判断一次 根据双方高度的值来判断

const time_wait = 1000; // 1s生成一对水管
let pipe = []; // 记录所有水管的dom对象
let i = 0; // 分辨水管的下标是偶数还是奇数
// 生成水管的函数 水管的高度是随机的
function render_pipe() {
  pipe[i] = document.createElement("div");

  // 高度120 - 205    最高205  两根水管都205px的话 还能留出来90px让小鸟上升
  //  90 - 140
  let random_height = Math.floor(Math.random() * 50 + 90);
  pipe[i].classList.add("pipe");
  // pipe[i].setAttribute("style", "background-size: 100% 100%");
  pipe[i].style.height = random_height + "px";
  pipe[i].style.animation = "move 5s linear forwards";
  pipe[i].style.position = "absolute";
  pipe[i].style.right = "0";
  pipe[i].style.width = "60px";
  // pipe[i].style.background = "url(../assets/pipetop.png) no-repeat";
  // 偶数的水管在上面 奇数的在下面
  if (i % 2 == 0) {
    pipe[i].style.top = 0;
  } else {
    pipe[i].style.bottom = 0;
    // 颠倒底部的水管
    pipe[i].style.transform = "rotate(180deg)";
  }
  // i 的值会在执行完这行代码后 ＋1
  container.appendChild(pipe[i++]);
}

// 当水管到屏幕外面时，删除节点 并增加分数
let scope_point = 0;

// 获得是哪一对水管需要被判断 它们与小鸟的距离
let test_pipe1;
let test_pipe2; // 记录当前被检测位置的水管的下标
function get_testPipe() {
  // 开始是0和1
  test_pipe1 = 0;
  test_pipe2 = 1;
  // 然后每过1s更换一对要检测的水管
  setInterval(() => {
    test_pipe1 += 2;
    test_pipe2 += 2;
  }, time_wait);
}
onMounted(() => {
  // 获取dom元素
  container = document.querySelector(".container");
  bird.value = document.querySelector(".bird");
  scope = document.querySelector(".scope");
});

const start = () => {
  startState.value = true;
  // 每过1s渲染2根水管 一上一下
  add_pipe = setInterval(function () {
    render_pipe();
    render_pipe();
  }, time_wait);

  // 小鸟不停的飞行......
  time_down = setInterval(bird_fly, 100);
  delete_pipe = setTimeout(() => {
    setInterval(() => {
      // 删除第一个节点和它的兄弟
      let pipe_first = document.querySelector(".pipe");
      container.removeChild(pipe_first.nextSibling);
      container.removeChild(pipe_first);

      // 分数+1 有补零
      let scope_point_string = "000";
      if (scope_point <= 100) {
        scope_point_string = "00" + ++scope_point;
      }
      scope.innerText = scope_point_string;
    }, time_wait);
  }, 5000);

  // 逻辑：
  //      1.游戏开始1s后生成第一对水管
  //      2.计算得出第一对水管3.25s后到达小鸟的右侧
  //      3.游戏开始4.25s后开始检测小鸟和水管的位置
  //      4.游戏开始4.25s后每过1s，更换需要检测的水管

  // 1.游戏开始1s后开始确定水管移动的速度
  setTimeout(() => {
    let pipe_speed = container.offsetWidth / 5; // 水管动画持续时间5s 移动距离为1000px 即速度为 200px/s
    let test_time =
      (container.offsetWidth -
        bird.value.offsetLeft -
        bird.value.offsetWidth -
        pipe[0].offsetWidth) /
      pipe_speed;
    //console.log(test_time); //3.25s  2.也就是说 水管出现并移动3.25s后 第一对水管到达小鸟的右侧

    // 3.再过3.25s后，开始检测距离
    setTimeout(() => {
      get_testPipe();
      distance = setInterval(() => {
        test_distance();
      }, 50);
    }, test_time * 1000);
  }, time_wait);

  // 4.在水管生成后获取小鸟和水管的一些固定属性
  setTimeout(() => {
    // 获取水管的宽度
    pipe_width.value = pipe[0].offsetWidth;
    // 获取小鸟的宽高
    bird_width.value = bird.value.offsetWidth;
    bird_height.value = bird.value.offsetHeight;
  }, time_wait);
};

const stop = () => {
  startState.value = false;
  clearInterval(distance);
  clearInterval(time_down);
  clearInterval(add_pipe);
  clearInterval(delete_pipe);
};
// 5.检测小鸟是否撞到了被检测的水管
function test_distance() {
  // 获取被检测的水管与上边界的高度
  let height_up = pipe[test_pipe1].offsetHeight;
  let height_down = pipe[test_pipe2].offsetTop;
  // 获取水管现在的水平位置
  let pipe_level = pipe[test_pipe1].offsetLeft;

  // 获取小鸟现在的水平位置和垂直位置
  let bird_level = bird.value.offsetLeft;
  let b_top = bird.value.offsetTop;
  console.log(
    b_top + "," + height_up + "," + bird_height.value + "," + height_down
  );
  // 顶部与上水管相比较 或 底部与下水管相比较 且水平距离上水管与小鸟也在同一位置
  if (
    (b_top < height_up || b_top + bird_height.value > height_down) &&
    bird_level + bird_width.value >= pipe_level &&
    bird_level <= pipe_level + pipe_width.value
  ) {
    stop();
    alert(`碰！ ${scope_point}分`);
    // 游戏结束，刷新页面
    location.reload();
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  width: 90vw;
  height: 80vh;
  background: url("../../assets/game/bgi.jpg") no-repeat center;
  background-size: cover;
  overflow: hidden;
}

.container *,
.hd * {
  /* 用这行代码禁止用户选中文字 */
  user-select: none;
}

.hd {
  position: absolute;
  width: 100%;
  padding-top: 20px;
  padding-right: 20px;
  text-align: right;
  color: #333;
  font-size: 16px;
  z-index: 1;
}

.bird {
  width: 40px;
  height: 40px;
  background: url("../../assets/game/PixelBird.png") center no-repeat;
  background-size: 100%;
  position: absolute;
  left: 200px;
  top: 40%;
  font-size: 14px;
  transition: all 0.1s;
}

.pipe {
  position: absolute;
  right: 0;
  width: 60px;
  background: url("../../assets/game/pipetop.png") no-repeat;
  background-size: 100% 100%;
  /* 水管的移动是通过动画来完成的,动画执行完毕后停留到终点位置 */
  /* animation: move 5s linear forwards; */
  /* border: 1px solid red; */
  z-index: 999;
}

@keyframes move {
  to {
    right: 100%;
  }
}

.scope {
  padding-right: 20px;
  font-size: 18px;
}

.board {
  background-image: url("../../assets/game/background.png");
  position: fixed;
  width: 50vw;
  height: 30vh;
  font-size: 2.3rem;
  left: 25vw;
  top: 45vh;
}

.button {
  text-align: center;
}
</style>
