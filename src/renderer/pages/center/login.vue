<template>
  <div class="container" @keyup.enter="login">
    <div class="title">登录</div>
    <Form :formFields="loginForm" :formData="formData" @submit="login"></Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "@renderer/stores";
const { t } = useI18n();

const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);

const router = useRouter();

const formData = ref({
  username: "",
  password: "",
});

const loginForm = [
  {
    label: "用户名",
    name: "username",
    placeholder: "请输入用户名",
    type: "text",
  },
  {
    label: "密码",
    name: "password",
    placeholder: "请输入密码",
    type: "password",
  },
];

const login = () => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ username: "tfq", uid: "littlespring" })
  );
  router.push("/");
};

const fetchUserInfo = async () => {
  const userInfo = await getUserInfo();
  sessionStorage.setItem("user", JSON.stringify(userInfo));
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-image: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr");
  background-size: 100% 100%;
}

.title {
  height: 2rem;
  line-height: 2rem;
  font-size: 2rem;
  color: v-bind(themeColor);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
