<template>
  <div class="card">
    <div class="card-head">
      <div>
        {{ props.title }}
      </div>
      <div>{{ props.subTitle }}</div>
    </div>
    <!-- <slot name="header"></slot> -->
    <div class="card-content">
      {{ props.content }}
    </div>
    <div class="card-fotter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
// 分类
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 16px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 2px 4px black;
}

.card-head {
  border-bottom: 1px solid lightgray;
}

.card-content {
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*行数*/
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
</style>
