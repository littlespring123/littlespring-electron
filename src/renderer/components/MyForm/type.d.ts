export declare type FormLayout = 'horizontal' | 'inline' | 'vertical';
export declare type InternalNamePath = (string | number)[];
// type ReactNode = {} | null | undefined;

export interface formItemsType {
  // 通用信息
  component?: ReactElement;
  type?: string;
  label: string;
  name: string;
  placeholder?: string;
  style?: Record<string, number | string>; // 样式
  initValue?: unknown; // 复选框为数组
  required?: boolean;
  message?: string;
  errMessage?: string;
  disable?: boolean;
  hidden?: boolean;
  tooltip?: string; // 提示信息
  colon?: boolean; // 冒号
  labelCol?: Record<string, number>; // label 标签布局,如 {span: 3, offset: 12}
  wrapperCol?: Record<string, number>; // 控件设置布局样式
  rules?: Record<string, boolean | string | number>[]; // 自定义规则
  validateStatus?: string;

  // Input
  minLength?: number;
  maxLength?: number;

  // select的选项
  options?: Record<string, number | string | boolean>[];
  // 文件上传
  showUploadList?: boolean;
  action?: string;
  listType?: UploadListType;
  maxCount?: number; // 默认为1

  // TextArea
  rows?: number;
  allowClear?: boolean;
  showCount?: boolean;

  // numberInput
  min?: number;
  max?: number;

  // 动态
  dynamicItem?: string;
}

export interface formType {
  // 标题
  title?: string;
  titleStyle?: Record<string, number | string>;

  // 表单
  initialValues?: Store; // Store是对象类型
  formItems: formItemsType[];
  validateMessages?: Record<string, number | string>;

  // 样式
  submitButtonText: string;
  hideResetButton?: boolean;
  layout?: FormLayout;
  resetButtonText?: string;
  formItemLayout?: Record<string, Record<string, number>>; // 表单整体布局

  // 方法
  onFinish: (values: Record<string, string>) => void;
  onFinishFailed?: (values: unknown) => void;

  // 动态的字段
  dynamicField?: string;
}
