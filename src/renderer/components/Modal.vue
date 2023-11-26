<template>
  <div class="rootModal" v-if="props.show">
    <div class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
      <button @click="closeModal" class="modal-close-button">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
  },
});
const closeModal = (event: any) => {
  console.log(event);
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

const emit = defineEmits();
</script>

<style scoped lang="scss">
.rootModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  top: 10vh;
  width: 60vw;
  max-height: 65vh;
  background-color: #fff;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-height: 60vh;
  /* 设置容器的最大高度，根据需要进行调整 */
  overflow: auto;
  /* 添加滚动条 */
}

.modal-close-button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
