<template>
  <div class="container">
    <div class="gearbox">
      <div class="overlay"></div>
      <div class="gear one">
        <div class="gear-inner">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const count = ref(1);
</script>

<style scoped lang="scss">
// 齿轮
@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes counter-clockwise {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.container {
  position: absolute;
  bottom: 3vh;
  right: 3vw;
  margin-left: -100px;
  height: 150px;
  width: 200px;
  margin-top: -75px;
}

.gearbox {
  // background: #111111;
  height: 150px;
  width: 200px;
  position: relative;
  border: none;
  overflow: hidden;
  border-radius: 6px;
  // box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
}

.gearbox .overlay {
  border-radius: 6px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // box-shadow: inset 0px 0px 20px black;
  transition: background-color 0.2s;
}

.gearbox.turn .overlay {
  background: transparent;
}

.gear {
  position: absolute;
  height: 60px;
  width: 60px;
  box-shadow: 0px -1px 0px 0px #888888, 0px 1px 0px 0px black;
  border-radius: 30px;
}

.gear.large {
  height: 120px;
  width: 120px;
  border-radius: 60px;
}

.gear.large:after {
  height: 96px;
  width: 96px;
  border-radius: 48px;
  margin-left: -48px;
  margin-top: -48px;
}

.gear.one {
  top: 12px;
  left: 10px;
}

.gear:after {
  content: "";
  position: absolute;
  height: 36px;
  width: 36px;
  border-radius: 36px;
  background: #111111;
  top: 50%;
  left: 50%;
  margin-left: -18px;
  margin-top: -18px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1),
    inset 0px 0px 10px rgba(0, 0, 0, 0.1), inset 0px 2px 0px 0px #080808,
    inset 0px -1px 0px 0px #888888;
}

.gear-inner {
  position: relative;
  height: 100%;
  width: 100%;
  background: #555555;
  animation-iteration-count: infinite;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.large .gear-inner {
  border-radius: 60px;
}

.gear.one .gear-inner {
  animation: counter-clockwise 3s infinite linear;
}

.gear-inner .bar {
  background: #555555;
  height: 16px;
  width: 76px;
  position: absolute;
  left: 50%;
  margin-left: -38px;
  top: 50%;
  margin-top: -8px;
  border-radius: 2px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.large .gear-inner .bar {
  margin-left: -68px;
  width: 136px;
}

.gear-inner .bar:nth-child(2) {
  transform: rotate(60deg);
}

.gear-inner .bar:nth-child(3) {
  transform: rotate(120deg);
}

.gear-inner .bar:nth-child(4) {
  transform: rotate(90deg);
}

.gear-inner .bar:nth-child(5) {
  transform: rotate(30deg);
}

.gear-inner .bar:nth-child(6) {
  transform: rotate(150deg);
}
</style>
