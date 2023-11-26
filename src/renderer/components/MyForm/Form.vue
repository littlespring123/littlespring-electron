<template>
  <!-- <Form
    class="form"
    :form="form"
    @onFinish="selfOnFinish"
    @onFieldsChange="onFieldsChange"
    @validateMessages="validateMessages"
  >
    <slot></slot>
  </Form> -->
  <div>assaa</div>
</template>

<script setup lang="ts">
import { formType, formItemsType } from '@renderer/components/MyForm/type';
import Loading from '@renderer/components/PageLoading/index';
import { ref } from 'vue';
const imageUrl = ref();
const loading = ref(false);

// const [form] = Form.useForm();

// const rulesHandler = (item: formItemsType) => {
//   let rules: Record<string, boolean | string | number>[] = [];
//   if (item?.required) {
//     // const type = 'object' as const;
//     rules.push({ required: true });
//   }
//   if (item.rules && item.rules.length > 0) {
//     rules = rules.concat(item.rules);
//   }
//   return rules;
// };

// 渲染单个表单项
const renderFormItem = (item) => {
  //   const rules= rulesHandler(item);
  const config = {
    key: item.name,
    label: item.label,
    name: item.name,
    style: item?.style,
    labelCol: item?.labelCol || { span: 6 },
    wrapperCol: item?.wrapperCol || { span: 8 },
    colon: item?.colon,
    tooltip: item?.tooltip,
    rules
  };
};

const initFormItem = () => {
  if (!formItems || (formItems && formItems.length === 0)) return false;
};

const selfOnFinish = (values) => {};

const onFieldsChange = (e) => {};
</script>

<style scoped lang="scss">
.form {
  margin: 10px;
}

.center {
  text-align: center;
  display: flex;
}

.button {
  border-radius: 5px;
  margin-bottom: 2vh;
}
</style>
