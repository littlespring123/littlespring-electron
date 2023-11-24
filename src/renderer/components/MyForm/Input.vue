<template>
  <!-- <div class="root"> -->
  <label v-if="label">
    {{ label }}
  </label>
  <span>:</span>
  <input
    :name="name"
    :type="inputType"
    :value="modelValue"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :class="className"
    @input="(e) => emit('update:modelValue', e.target.value)"
  />
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useStore } from '@renderer/stores';
import { storeToRefs } from 'pinia';
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
import { ref, toRefs } from 'vue';
const define = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: 'text'
  },
  modelValue: {
    // 绑定的v-model
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: 100
  },
  placeholder: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '20px'
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
label {
  margin-left: 5px;
  align-items: center;
}
input {
  outline-style: none;
  border: 1px solid v-bind(themeColor);
  background-color: v-bind(backgroundColor);
  border-radius: 3px;
  // padding: 10px;
  height: v-bind(height);
  font-size: 16px;
}

input:focus {
  border: 1px solid v-bind(themeColor);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
