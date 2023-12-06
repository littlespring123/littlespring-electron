import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@renderer/router";
import { createPinia } from "pinia";
import hljs from "highlight.js";
// 导入高亮样式
// import "highlight.js/styles/kimbie-light.css";
// import "highlight.js/styles/gradient-light.css";
// import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/obsidian.css";

const pinia = createPinia();

import Icon from "@renderer/components/Icon.vue";
import Button from "@renderer/components/Button.vue";
import Card from "@renderer/components/Card.vue";
import Empty from "@renderer/components/Empty.vue";
import FloatBtn from "@renderer/components/FloatBtn.vue";
import Tag from "@renderer/components/Tag.vue";

import Image from "@renderer/components/Image.vue";
import List from "@renderer/components/List/List.vue";
import ListItem from "@renderer/components/List/ListItem.vue";

import Loading from "@renderer/components/Loading.vue";
import Modal from "@renderer/components/Modal.vue";
import Pagination from "@renderer/components/Pagination.vue";
import Form from "@renderer/components/MyForm/Form.vue";
import Input from "@renderer/components/MyForm/Input.vue";
import MySelect from "@renderer/components/MyForm/MySelect.vue";
import Switch from "@renderer/components/MyForm/Switch.vue";
import Progress from "@renderer/components/Progress.vue";
import TabSelect from "@renderer/components/TabSelect.vue";
import Message from "@renderer/components/Message.vue";

// import VueI18n from 'vue-i18n';
import i18n from "./i18n";

// 全局导入组件
const GlobalComponents = (app: any) => {
  const components = {
    TabSelect,
    Progress,
    Message,
    Tag,
    Icon,
    MySelect,
    Switch,
    Image,
    Loading,
    Modal,
    Pagination,
    Form,
    Input,
    FloatBtn,
    List,
    ListItem,
    Button,
    Card,
    Empty,
  };
  Object.keys(components).forEach((key: any) => {
    app.component(`${key}`, components[key]);
  });
};

const app = createApp(App);

// 导入highlight.js及其样式
app.directive("highlight", (el) => {
  hljs.configure({ useBR: true });
  let blocks: any = el.querySelectorAll("pre");
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
});

GlobalComponents(app);
app.use(router).use(pinia).use(i18n).mount("#app");
