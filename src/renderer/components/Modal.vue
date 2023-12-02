<template>
  <div
    @keyup.enter="confirmModal"
    class="rootModal block-z-index"
    v-if="props.show"
  >
    <div class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
      <div>
        <Button @click="confirmModal" class="modal-close-button">
          {{ t("modal.confirm") }}
        </Button>
        <Button @click="closeModal" class="modal-close-button">
          {{ t("modal.close") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const closeModal = () => {
  emit("close");
};
const confirmModal = () => {
  emit("confirm");
};

const emit = defineEmits(["close", "confirm"]);
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
  z-index: 100;
}

.modal {
  top: 10vh;
  width: 60vw;
  max-height: 65vh;
  background-color: #fff;

  &-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-height: 60vh;
    /* 设置容器的最大高度，根据需要进行调整 */
    overflow: auto;
    /* 添加滚动条 */
  }
}

.modal-close-button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
