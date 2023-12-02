<template>
  <uni-search-bar
    @confirm="search"
    v-model="searchValue"
    placeholder="输入城市名"
    :cancelButton="false"
  ></uni-search-bar>
  <uni-section type="line" title="今日天气">
    <view class="box">
      <view
        style="width: 50vw; height: 30vh; background-color: beige"
        class="left"
      >
        <view
          v-if="weatherIcon[0].includes(today.dayweather)"
          class="sunny"
        ></view>
        <view
          v-else-if="weatherIcon[1].includes(today.dayweather)"
          class="starry"
        ></view>
        <view
          v-else-if="weatherIcon[2].includes(today.dayweather)"
          class="cloudy"
        ></view>
        <view
          v-else-if="weatherIcon[3].includes(today.dayweather)"
          class="rainy"
        ></view>
      </view>
      <view class="right">
        <view class="item">
          <h3>白天:{{ today.dayweather }}</h3>
          <view class="info">
            <text>风力{{ today.daypower }}</text>
            <text>风向{{ today.daywind }}</text>
            <text>气温{{ today.daytemp }}</text>
          </view>
        </view>
        <view class="item">
          <h3>夜间:{{ today.nightweather }}</h3>
          <view class="info">
            <text>风力:{{ today.nightpower }}</text>
            <text>风向:{{ today.nightwind }}</text>
            <text>气温:{{ today.nighttemp }}</text>
          </view>
        </view>
      </view>
    </view>
  </uni-section>
  <uni-section
    type="line"
    title="近4日天气"
    :sub-title="'更新时间：' + reportTime"
  >
    <qiun-data-charts type="line" :chartData="dataLine" />
  </uni-section>
</template>

<script setup lang="ts">
import { mainStore } from "@/stores/index.js";
import { onLoad, onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
const searchValue = ref();
const acCode = ref();
const store = mainStore();
const city = ref("");
const longitude = ref();
const latitude = ref();
const forecast = ref();
const reportTime = ref("");
const weatherIcon = ref([
  ["晴", ""],
  ["", ""],
  ["阴", "多云"],
  ["小雨", "阵雨", "中雨", "大雨", "暴雨"],
]);
const today = ref({
  dayweather: "",
  daypower: "",
  daywind: "",
  daytemp: "",
  nightweather: "",
  nightpower: "",
  nightwind: "",
  nighttemp: "",
});
const dataLine = ref({
  categories: ["今日", "明日", "后日", "后后日"],
  series: [],
});

onReady(() => {
  uni.setNavigationBarColor({
    frontColor: uni.getStorageSync("themeColor") ? "#ffffff" : "#000000", // 导航栏标题颜色，只能是'black'或'white'
    backgroundColor: uni.getStorageSync("themeColor")
      ? uni.getStorageSync("themeColor")
      : "#ffffff", // 导航栏背景颜色
  });
  if (store.location.errMsg) {
    //读缓存
    longitude.value = store.location.longitude;
    latitude.value = store.location.latitude;
  } else {
    uni.getLocation({
      type: "gcj02",
      geocode: true,
      success: function (res) {
        store.location = res;
        longitude.value = res.longitude;
        latitude.value = res.latitude;
        store.setPower("location");
      },
      fail(err) {
        uni.showToast({
          title: "位置信息获取失败",
          icon: "error",
          duration: 2000,
        });
        console.log("fail");
        console.log(err);
      },
    });
  }
  getCode();
});

function getCode() {
  uni.request({
    // #ifdef APP-PLUS
    url:
      "https://restapi.amap.com/v3/geocode/regeo?location=" +
      longitude.value +
      "," +
      latitude.value +
      "&key=a44a58513e68f7612a766a61dcc74915&radius=1000&extensions=all",
    // #endif
    // #ifdef H5
    url: "https://restapi.amap.com/v3/geocode/regeo?location=114.2627,30.2627&key=a44a58513e68f7612a766a61dcc74915&radius=1000&extensions=all",
    // #endif
    method: "GET",
    success: (res) => {
      console.log(res);
      if (res.statusCode != 200) {
        uni.showToast({
          title: "ERROR",
          duration: 2000,
        });
      } else {
        acCode.value = res.data.regeocode.addressComponent.adcode;
        getWeather();
      }
    },
    fail: (fail) => {
      console.log("Error", fail);
    },
  });
}
function getWeather() {
  uni.request({
    url:
      "https://restapi.amap.com/v3/weather/weatherInfo?key=a44a58513e68f7612a766a61dcc74915&city=" +
      acCode.value +
      "&extensions=all",
    // url: "http://t.weather.sojson.com/api/weather/city/" + acCode.value,
    // url: "http://t.weather.sojson.com/api/weather/city/101010100",
    method: "GET",
    success: (res) => {
      console.log(res);
      if (res.statusCode != 200) {
        uni.showToast({
          title: "ERROR",
          duration: 2000,
        });
      } else {
        res = res.data.forecasts[0];
        today.value = res.casts[0];
        reportTime.value = res.reporttime;
        city.value = res.city;
        forecast.value = res.casts;
        toObject(forecast.value);
        // console.log(weatherIcon.value[0].includes(today.value.dayweather))
        // console.log(weatherIcon.value[0].includes(today.value.nightweather))
      }
    },
    fail: (fail) => {
      console.log("Error", fail);
    },
  });
}

const toObject = (array) => {
  let daytemp = new Array();
  let nighttemp = new Array();
  array.map((item) => {
    daytemp.push(item.daytemp);
    nighttemp.push(item.nighttemp);
  });
  dataLine.value.series.push({
    name: "白天气温",
    data: daytemp,
  });
  dataLine.value.series.push({
    name: "夜间气温",
    data: nighttemp,
  });
};
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .right {
    border-left: 1px solid lightgray;
    display: flex;
    flex-direction: column;

    .item {
      margin: 5px;
      padding: 5px;

      .info {
        display: flex;
        flex-direction: column;
      }
    }
  }
}

/* SUNNY */
.sunny {
  animation: sunny 15s linear infinite;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 140px;
  width: 20px;
  margin-left: 60px;
  position: absolute;
  top: 30px;
}

.sunny:before {
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  content: "";
  height: 140px;
  width: 20px;
  opacity: 1;
  position: absolute;
  bottom: 0px;
  left: 0px;
  transform: rotate(90deg);
}

.sunny:after {
  background: #ffee44;
  border-radius: 50%;
  box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 15px;
  content: "";
  height: 80px;
  width: 80px;
  position: absolute;
  left: -30px;
  top: 30px;
}

@keyframes sunny {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* CLOUDY */
.cloudy {
  animation: cloudy 5s ease-in-out infinite;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: #ffffff 65px -15px 0 -5px, #ffffff 25px -25px, #ffffff 30px 10px,
    #ffffff 60px 15px 0 -10px, #ffffff 85px 5px 0 -5px;
  height: 50px;
  width: 50px;
  margin-left: 30px;
  position: absolute;
  top: 70px;
}

.cloudy:after {
  animation: cloudy_shadow 5s ease-in-out infinite;
  background: #000000;
  border-radius: 50%;
  content: "";
  height: 15px;
  width: 120px;
  opacity: 0.2;
  position: absolute;
  left: 5px;
  bottom: -60px;
  transform: scale(0.7);
}

@keyframes cloudy {
  50% {
    transform: translateY(-20px);
  }
}

@keyframes cloudy_shadow {
  50% {
    transform: translateY(20px) scale(1);
    opacity: 0.05;
  }
}

/* RAINY */
.rainy {
  animation: rainy 5s ease-in-out infinite 1s;
  background: #cccccc;
  border-radius: 50%;
  box-shadow: #cccccc 65px -15px 0 -5px, #cccccc 25px -25px, #cccccc 30px 10px,
    #cccccc 60px 15px 0 -10px, #cccccc 85px 5px 0 -5px;
  display: block;
  height: 50px;
  width: 50px;
  margin-left: -60px;
  position: absolute;
  left: 20vw;
  top: 70px;
}

.rainy:after {
  animation: rainy_shadow 5s ease-in-out infinite 1s;
  background: #000000;
  border-radius: 50%;
  content: "";
  height: 15px;
  width: 120px;
  opacity: 0.2;
  position: absolute;
  left: 5px;
  bottom: -60px;
  transform: scale(0.7);
}

.rainy:before {
  animation: rainy_rain 0.7s infinite linear;
  content: "";
  background: #cccccc;
  border-radius: 50%;
  display: block;
  height: 6px;
  width: 3px;
  opacity: 0.3;
  transform: scale(0.9);
}

@keyframes rainy {
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rainy_shadow {
  50% {
    transform: translateY(20px) scale(1);
    opacity: 0.05;
  }
}

@keyframes rainy_rain {
  0% {
    box-shadow: rgba(0, 0, 0, 0) 30px 30px, rgba(0, 0, 0, 0) 40px 40px,
      #000000 50px 75px, #000000 55px 50px, #000000 70px 100px,
      #000000 80px 95px, #000000 110px 45px, #000000 90px 35px;
  }

  25% {
    box-shadow: #000000 30px 45px, #000000 40px 60px, #000000 50px 90px,
      #000000 55px 65px, rgba(0, 0, 0, 0) 70px 120px,
      rgba(0, 0, 0, 0) 80px 120px, #000000 110px 70px, #000000 90px 60px;
  }

  26% {
    box-shadow: #000000 30px 45px, #000000 40px 60px, #000000 50px 90px,
      #000000 55px 65px, rgba(0, 0, 0, 0) 70px 40px, rgba(0, 0, 0, 0) 80px 20px,
      #000000 110px 70px, #000000 90px 60px;
  }

  50% {
    box-shadow: #000000 30px 70px, #000000 40px 80px,
      rgba(0, 0, 0, 0) 50px 100px, #000000 55px 80px, #000000 70px 60px,
      #000000 80px 45px, #000000 110px 95px, #000000 90px 85px;
  }

  51% {
    box-shadow: #000000 30px 70px, #000000 40px 80px, rgba(0, 0, 0, 0) 50px 45px,
      #000000 55px 80px, #000000 70px 60px, #000000 80px 45px,
      #000000 110px 95px, #000000 90px 85px;
  }

  75% {
    box-shadow: #000000 30px 95px, #000000 40px 100px, #000000 50px 60px,
      rgba(0, 0, 0, 0) 55px 95px, #000000 70px 80px, #000000 80px 70px,
      rgba(0, 0, 0, 0) 110px 120px, rgba(0, 0, 0, 0) 90px 110px;
  }

  76% {
    box-shadow: #000000 30px 95px, #000000 40px 100px, #000000 50px 60px,
      rgba(0, 0, 0, 0) 55px 35px, #000000 70px 80px, #000000 80px 70px,
      rgba(0, 0, 0, 0) 110px 25px, rgba(0, 0, 0, 0) 90px 15px;
  }

  100% {
    box-shadow: rgba(0, 0, 0, 0) 30px 120px, rgba(0, 0, 0, 0) 40px 120px,
      #000000 50px 75px, #000000 55px 50px, #000000 70px 100px,
      #000000 80px 95px, #000000 110px 45px, #000000 90px 35px;
  }
}

/* STARRY */
.starry {
  animation: starry_star 5s ease-in-out infinite;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: #ffffff 26px 7px 0 -1px,
    rgba(255, 255, 255, 0.1) -36px -19px 0 -1px,
    rgba(255, 255, 255, 0.1) -51px -34px 0 -1px, #ffffff -52px -62px 0 -1px,
    #ffffff 14px -37px, rgba(255, 255, 255, 0.1) 41px -19px, #ffffff 34px -50px,
    rgba(255, 255, 255, 0.1) 14px -71px 0 -1px, #ffffff 64px -21px 0 -1px,
    rgba(255, 255, 255, 0.1) 32px -85px 0 -1px, #ffffff 64px -90px,
    rgba(255, 255, 255, 0.1) 60px -67px 0 -1px, #ffffff 34px -127px,
    rgba(255, 255, 255, 0.1) -26px -103px 0 -1px;
  height: 4px;
  width: 4px;
  margin-left: 60px;
  opacity: 1;
  position: absolute;
  top: 150px;
}

.starry:after {
  animation: starry 5s ease-in-out infinite;
  border-radius: 50%;
  box-shadow: #ffffff -25px 0;
  content: "";
  height: 100px;
  width: 100px;
  position: absolute;
  top: -106px;
  transform: rotate(-5deg);
  transform-origin: 0 50%;
}

@keyframes starry {
  50% {
    transform: rotate(10deg);
  }
}

@keyframes starry_star {
  50% {
    box-shadow: rgba(255, 255, 255, 0.1) 26px 7px 0 -1px,
      #ffffff -36px -19px 0 -1px, #ffffff -51px -34px 0 -1px,
      rgba(255, 255, 255, 0.1) -52px -62px 0 -1px,
      rgba(255, 255, 255, 0.1) 14px -37px, #ffffff 41px -19px,
      rgba(255, 255, 255, 0.1) 34px -50px, #ffffff 14px -71px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px -21px 0 -1px, #ffffff 32px -85px 0 -1px,
      rgba(255, 255, 255, 0.1) 64px -90px, #ffffff 60px -67px 0 -1px,
      rgba(255, 255, 255, 0.1) 34px -127px, #ffffff -26px -103px 0 -1px;
  }
}
</style>
