<template>
  <div class="items">
    <div class="item" v-for="(item, index) in tips" :key="index">
      <div class="name">{{ t(item.name) }}</div>
      <div class="value">{{ t(item.value) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { platform, release, arch } = require('os');
const { path, name } = useRoute();
const { t } = useI18n();

let tips = ref(
  computed(() => [
    { name: 'about.language', value: 'about.languageValue' },
    { name: 'about.currentPagePath', value: path },
    { name: 'about.currentPageName', value: name },
    {
      name: 'about.vueVersion',
      value:
        process.env.NODE_ENV === 'development' ? require('vue/package.json').version : '不可见',
    },
    {
      name: 'about.electronVersion',
      value: process.versions.electron || '浏览器环境',
    },
    {
      name: t('about.nodeVersion'),
      value: process.versions.node || '浏览器环境',
    },
    { name: t('about.systemPlatform'), value: platform() },
    { name: t('about.systemVersion'), value: release() },
    { name: t('about.systemArch'), value: arch() + t('about.bit') },
  ]),
);
</script>

<style scoped lang="scss">
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  line-height: 24px;

  .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .value {
    color: #35495e;
    font-weight: bold;
  }
}
</style>
