<template>
  <button @click="login" type="">{{ t('center.login') }}</button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { t } = useI18n();

const router = useRouter();

const login = () => {
  localStorage.setItem('userInfo', JSON.stringify({ username: 'tfq', uid: 'littlespring' }));
  router.push('/');
};
</script>

<style></style>
