<template>
  <Button @click="saveConfig">{{ t("set.save") }}</Button>
  <Button @click="console.log('触发')">{{ t("set.reset") }}</Button>
  <Button @click="router.push('test')">测试页</Button>
  <div class="set-root">
    <Card :title="t('set.systemInfo')">
      <SystemInformation></SystemInformation>
    </Card>
    <Card :title="t('set.interface')">
      <div class="child">
        <Input
          height="25px"
          :label="t('set.color.themeColor')"
          inputType="color"
          v-model="themeColor"
        />
      </div>
      <div class="child">
        <Switch
          :label="t('set.mode')"
          :modelValue="darkMode"
          :activeColor="themeColor"
          @change="
            (e) => {
              darkMode = e;
            }
          "
        ></Switch>
      </div>
      <div class="child">
        <MySelect
          @change="
            (option) => {
              setLanguageMode(option.value);
              store.save2Local('languageMode', option.value);
            }
          "
          :label="t('set.language')"
          :localdata="languageArray"
        ></MySelect>
      </div>
    </Card>

    <Card :title="t('set.blog.set')">
      <div class="child">
        <Input
          :label="t('set.blog.pagesize')"
          inputType="number"
          v-model="blogSet.pagesize"
        />
      </div>
    </Card>

    <Card :title="t('set.hotkey.set')">
      <div v-for="item in hotKeyList" class="child">
        {{ item.title }} - {{ item.value }}
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import SystemInformation from "./Component/SystemInformation.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@renderer/stores";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const router = useRoutr();
const { t } = useI18n();
const store = useStore();

const {
  scroller,
  themeColor,
  blogSet,
  windowSet,
  darkMode,
  color,
  backgroundColor,
} = storeToRefs(store);
const { setLanguageMode } = store;

const languageArray = [
  {
    text: "中文",
    value: "cn",
  },
  {
    text: "English",
    value: "en",
  },
];

const saveConfig = () => {
  localStorage.setItem("");
};

const hotKeyList = [
  {
    key: "",
    title: "返回上一页",
    value: "backspace",
  },
  {
    key: "",
    title: "清空列表",
    value: "ctrl + L",
  },
  {
    key: "",
    value: "",
  },
  {
    key: "",
    value: "",
  },
];
</script>

<style scoped lang="scss">
.set-root {
  width: 98%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 80vh;
  overflow: auto;
}

// .scroller {
//   overflow: scroll;
// }
// .item {
// }

.child {
  align-items: center;
  margin: 10px;
}
</style>
