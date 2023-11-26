<template>
  <Form
    class="form"
    :form="form"
    @onFinish="selfOnFinish"
    @onFinishFailed="selfOnFinishFailed"
    @onFieldsChange="onFieldsChange"
    @validateMessages="validateMessages"
  >
    <slot></slot>
  </Form>
</template>

<script setup lang="ts">
import { Form, Button, Input, Select, DatePicker, message } from 'antd';
import { formType, formItemsType } from '@renderer/components/MyForm/type';
import Loading from '@renderer/components/PageLoading/index';
import TextArea from 'antd/lib/input/TextArea';

const [imageUrl, setImageUrl] = useState<string>();
const [loading, setLoading] = useState(false);
const defaultFormLayout = formItemLayout || {
  labelCol: {
    span: 6
    // xs: { span: 24 },
    // sm: { span: 6 },
  },
  wrapperCol: {
    span: 14
    // xs: { span: 24 },
    // sm: { span: 14 },
  }
};
const [form] = Form.useForm();

const rulesHandler = (item: formItemsType) => {
  let rules: Record<string, boolean | string | number>[] = [];
  if (item?.required) {
    // const type = 'object' as const;
    rules.push({ required: true });
  }
  if (item.rules && item.rules.length > 0) {
    rules = rules.concat(item.rules);
  }
  return rules;
};

// 渲染单个表单项
const renderFormItem = (item: formItemsType) => {
  const rules: Record<string, boolean | string | number>[] = rulesHandler(item);
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

  if (item?.type === 'Select') {
    return (
      <Form.Item {...config}>
        <Select>
          {item.options &&
            item?.options.map((child) => (
              <Select.Option key={child.value} value={child.vlue}>
                {child.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    );
  }
  if (item?.type === 'TextArea') {
    return (
      <Form.Item {...config}>
        <TextArea
          placeholder={item?.placeholder || ''}
          showCount={item?.showCount || false}
          allowClear={item?.allowClear || false}
          rows={item?.rows || 2}
        ></TextArea>
      </Form.Item>
    );
  }
  // 使用component
  if (dynamicField) {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type}
      >
        {({ getFieldValue }) => {
          const fieldType = getFieldValue('type');
          console.log('fieldType', fieldType);
          if (fieldType === item.dynamicItem) {
            // 全部显示
            return <Form.Item {...config}>{item.component}</Form.Item>;
          }
          return (
            // 设置了showItem不显示
            item.dynamicItem ? null : <Form.Item {...config}>{item.component}</Form.Item>
          );
        }}
      </Form.Item>
    );
  }
  return (
    // 没有动态字段，全部加载
    <Form.Item {...config}>
      {item.component || <Input maxLength={item?.maxLength} minLength={item?.minLength} />}
    </Form.Item>
  );
};

const initFormItem = () => {
  if (!formItems || (formItems && formItems.length === 0)) return false;
  return (
    <>
      {formItems.map(
        (item: formItemsType) =>
          // 方案一
          renderFormItem(item)
        // items.push();
        // 方案二
        // if (item.type === 'Select') {
        //   items.push(<Form.Item
        //     key={item.name}
        //     label={item.label}
        //     name={item.name}
        //     rules={rules}
        //     style={item.style}
        //   >
        //     <Select>
        //       {item.option
        //       && item?.option.map((child) => <Select.Option
        //       key={child.value}
        //       value={child.vlue}>
        //         {child.name}
        //         </Select.Option>)}
        //     </Select>
        //   </Form.Item>);
        // } else if (item.type === 'Date') {
        //   items.push(<Form.Item
        //   key={item.name}
        //   label={item.label}
        //   name={item.name}
        //   style={item.style}
        //   rules={rules}
        // >
        //  <DatePicker />
        // </Form.Item>);
        // } else if (item.type === 'TextArea') {
        //   items.push(
        //   <Form.Item
        //   key={item.name}
        //   label={item.label}
        //   name={item.name}
        //   style={item.style}
        //   rules={rules}
        // >
        //  <Input.TextArea disabled={item.disable} />
        // </Form.Item>,
        //   );
        // } else {
        //   items.push(
        //   <Form.Item
        //   className={styles.test}
        //   key={item.name}
        //   label={item.label}
        //   name={item.name}
        //   style={item.style}
        //   rules={rules}
        //   tooltip={item.tooltip}
        // >
        //   <Input placeholder={item.placeholder} />
        // </Form.Item>,
        //   );
        // }
      )}
      <Form.Item
        style={{
          marginLeft: `${(defaultFormLayout.labelCol.span / 24) * 100}%`
        }}
        labelCol={defaultFormLayout.labelCol}
        className={styles.button}
      >
        <Button className={styles.button} size="large" type="primary" htmlType="submit">
          {submitButtonText || '提交'}
        </Button>
        <Button hidden={hideResetButton} className={styles.button} size="large" htmlType="reset">
          {resetButtonText || '重置'}
        </Button>
      </Form.Item>
    </>
  );
};

const selfOnFinish = (values: Record<string, string>) => {
  new Promise(() => {
    setLoading(true);
    onFinish(values);
  })
    .then(() => {
      message.destroy();
      message.success('Loading finished');
    })
    .catch((err) => {
      message.destroy();
      console.log(err);
      message.error('发送失败');
    })
    .finally(() => {
      setLoading(false);
      message.destroy();
    });
};

const selfOnFinishFailed = (errorInfo: unknown) => {
  message.error('请完善表格');
  if (onFinishFailed) {
    onFinishFailed(errorInfo);
  }
};

const onFieldsChange = (e) => {};

const validateMessages = {
  required: '${label}不能为空!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};
</script>

<style scoped lang="scss">
.form {
  // border: 1px solid red;
  margin: 10px;
}

.center {
  // border: 1px solid red;
  text-align: center;
  // margin: auto;
  display: flex;
  // justify-content: center;
}

.button {
  border-radius: 5px;
  margin-bottom: 2vh;
}
</style>
