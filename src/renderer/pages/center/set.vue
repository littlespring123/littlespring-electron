<template>
  <div class="root">
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
          @change="(option) => setLanguageMode(option.value)"
          :label="t('set.language')"
          :localdata="languageArray"
        ></MySelect>
      </div>
    </Card>
    <Card :title="t('set.scroller.set')" class="scroller">
      <div class="child">
        <div class="childItem">
          <Input
            :label="t('set.scroller.color')"
            inputType="color"
            v-model="scroller.scrollerColor"
          />
        </div>
      </div>
      <div class="child">
        <Input
          :label="t('set.scroller.size')"
          inputType="number"
          v-model="scroller.scrollerWidth"
        />
      </div>
    </Card>

    <!-- <div class="child">
        <Input label="导航栏颜色" inputType="color" v-model="scroller.scrollerColor" />
      </div> -->
  </div>
  <Button @Click="saveConfig">{{ t('set.save') }}</Button>
  <Button @Click="console.log('触发')">{{ t('set.reset') }}</Button>
</template>

<script setup lang="ts">
import SystemInformation from './Component/SystemInformation.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@renderer/stores';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useStore();
console.log('stroe', store);

const { scroller, themeColor, darkMode, color, backgroundColor } = storeToRefs(store);
const { setLanguageMode } = store;

const languageArray = [
  {
    text: 'English',
    value: 'en',
  },
  {
    text: '中文',
    value: 'cn',
  },
];

const saveConfig = () => {
  localStorage.setItem('');
};
</script>

<style scoped lang="scss">
.root {
  width: 98%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.scroller {
  overflow: scroll;
}
.item {
}

.child {
  align-items: center;
  margin: 10px;
}
</style>
