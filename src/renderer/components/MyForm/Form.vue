<template>
  <form ref="form" class="form" @submit.prevent="handleSubmit">
    <div class="item" v-for="field in inFormFields" :key="field.name">
      <Input
        :label="field.label"
        :type="field.type"
        :name="field.name"
        :placeholder="field.placeholder"
        v-model="formData[field.name]"
      />
      <span :class="field.error ? 'error' : 'hiden-error'">
        {{ field.error }}</span
      >
    </div>
    <div class="footer">
      <Button type="submit" @click="opearteSubmmit">{{
        t("form.confirm")
      }}</Button>
      <Button type="reset" @click="opearteReset">{{ t("form.reset") }}</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
/**
 * 表单
 *
 */

/**
 * 表单项
 * @param {} name
 * @param {} label
 * @param {} placeholder
 * @param {} type
 * @param {Array} rules
 * @param {}
 */

import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { formType, formItemsType } from "@renderer/components/MyForm/type";
import Loading from "@renderer/components/PageLoading/index";
import { ref, toRefs, Ref } from "vue";

const props = defineProps({
  formFields: {
    type: Array,
    default: [],
  },
  formData: {
    type: Object,
    default: {},
  },
});
const inFormFields = ref(props.formFields);
const { formData } = toRefs(props);
const emits = defineEmits(["submit", "reset"]);
const opearteSubmmit = () => {
  const isValid = validateForm();
  if (isValid) {
    emits("submit");
  }
};

const opearteReset = () => {
  inFormFields.value.map((item) => {
    item.error = null;
    return item;
  });
  emits("reset");
};

// 表单校验
const validateForm = () => {
  let isValid = true;
  inFormFields.value = inFormFields.value.map((field) => {
    // 简单的非空校验示例
    if (!formData.value[field.name]) {
      field.error = `${field.label}不能为空`;
      isValid = false;
    } else {
      field.error = null;
    }
    return field;
  });
  return isValid;
};

// const onFieldsChange = (e) => {};
</script>

<style scoped lang="scss">
.form {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .item {
    display: flex;
    flex-direction: column;
    // margin: 3px 10px;
    padding: 15px;
    position: relative;

    .error {
      color: red;
      position: absolute;
      top: 60px;
      transition: top 0.4s;
    }

    .hiden-error {
      color: red;
      position: absolute;
      top: 0px;
      transition: top 0.4s;
    }
  }
  .footer {
    padding: 10px;
    text-align: center;
  }
}
</style>
