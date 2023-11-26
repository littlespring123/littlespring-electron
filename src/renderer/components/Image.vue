<template>
  <img :src="src" alt="" />
</template>
<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss"></style>
