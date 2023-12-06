<template>
  <label v-if="label">
    {{ label }}
  </label>
  <span>:</span>
  <textarea
    :name="name"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :rows="rows"
    :cols="cols"
    @input="(e) => console.log('e', e)"
    >{{ modelValue }}</textarea
  >
</template>

<script setup lang="ts">
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
import { watch, ref, toRefs } from 'vue';
defineProps({
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    // 绑定的v-model
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 100,
  },
  placeholder: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  rows:{
    type:Number;
    default: 3
  },
  cols:{
    type:Number;
    default: 10
  }
});
const emit = defineEmits(['update:modelValue']);

// const inputValue= ref("")

// watch(inputValue,(oldValue, newValue)=>{
//   console.log("e",oldValue,newValue)
//   emit('update:modelValue',newValue)
//   // inputValue(newValue) {
//       // this.$emit('update:modelValue', newValue);
//     // },
//   },{deep:true, immediate:true})
</script>

<style lang="scss" scoped>
label {
  margin-left: 5px;
}
textarea {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: transparent;
  font-size: inherit;
  width: 100%;
}

textarea:focus {
  outline: none;
}

/* 自定义样式 */
.mo-textarea {
  display: inline-block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 提示文字 */
.mo-textarea::placeholder {
  color: #c0c4cc;
}

/* 鼠标hover */
.mo-textarea:hover {
  border-color: #c0c4cc;
}

/* 获得焦点 */
.mo-textarea:focus {
  border-color: #3677f0;
}
</style>
