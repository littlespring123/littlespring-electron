<template>
  <div class="item" :class="{ active: currentPlay === index }">
    <slot name="left"></slot>
    <slot name="content"></slot>
    <div>{{ item.name }} - {{ item?.artists[0].name }}</div>
    <div class="item-right" v-show="currentPlay !== index">
      <div style="align-items: center">
        {{ secTotime(item.duration / 1000) }}
      </div>
      <Icon
        @click="
          currentId = item.id;
          currentPlay = index;
        "
        name="start"
        width="14px"
      ></Icon>
      <Icon @click="removeList(index)" name="delete" width="14px"></Icon>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * list-item
 */
defineProps({
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.item {
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: v-bind(color);
  fill: v-bind(color);
  box-sizing: border-box;
  // width: calc(100% - 10px);
  // padding-right: 10px;
  // border: 1px solid red;
  &-left {
    display: flex;
    align-items: center;
  }

  &-content {
    display: flex;
    align-items: center;
  }
}

.item:hover {
  color: v-bind(themeColor);
  fill: v-bind(themeColor);
}

.active {
  color: v-bind(themeColor);
}
</style>
