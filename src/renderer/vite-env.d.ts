/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "omit.js";
declare module "lodash/debounce";
declare module "marked";

declare module "*.less" {
  const classes: Record<string, string>;
  export default classes;
}
