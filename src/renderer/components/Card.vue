<template>
  <div class="card">
    <div v-if="title || extra" class="card-head">
      <div class="card-title">
        <div class="card-mainTitle">
          {{ title }}
        </div>
        <div class="card-subtitle">{{ subTitle }}</div>
      </div>
      <div v-if="extra" class="card-extra">
        {{ extra }}
      </div>
    </div>
    <slot name="header"></slot>
    <slot></slot>
    <div class="card-content">
      {{ content }}
    </div>
    <div class="card-fotter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  extra: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 4,
  },
  margin: {
    type: String,
    default: "8px",
  },
  padding: {
    type: String,
    default: "8px",
  },
});
</script>

<style scoped lang="scss">
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: v-bind(padding);
  margin: v-bind(margin);
  width: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  .card-head {
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;

    .card-title {
    }

    .card-extra {
    }
  }

  .card-content {
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: v-bind(rows);
    /*行数*/
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: v-bind(rows);
    -moz-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }
}

.card:hover {
  transition: box-shadow 0.5s;
  box-shadow: 0 2px 4px black;
}
</style>
