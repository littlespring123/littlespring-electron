interface IRoute {
  path?: string; // 配置路由路径
  component?: any; // 配置用于渲染的 React 组件路径
  wrappers?: string[]; // 配置路由的高阶组件封装，输入值为高阶组件路径
  redirect?: string; // 配置路由跳转
  exact?: boolean; // 表示是否严格匹配，即 location 是否和 path 完全对应上
  actionId?: string; // 用于控制当前页面访问权限，默认不做限制
  name?: string; // 当前菜单名，无默认值，必填，不填则表示不展示
  icon?: string; // 当前菜单的左侧 icon，可选 antd 的 icon name 和 url，可不填
  headerRender?: boolean; // 是否展示顶栏，默认为true
  footerRender?: boolean; // 是否展示页脚，默认为true
  menuRender?: boolean; // 是否展示菜单，默认为true
  menuHeaderRender?: boolean; // 是否展示菜单顶栏，默认为true
  hideChildrenInMenu?: boolean; // 是否隐藏子菜单
  hideInMenu?: boolean; // 隐藏自己和子菜单
  hideInBreadcrumb?: boolean; // 在面包屑中隐藏
  flatMenu?: boolean; // 在菜单中只隐藏此项，子项往上提，仍旧展示，默认为false  routes?: IRoute[]; // 配置子路由
  [k: string]: unknown;
}

const routes: IRoute[] = [
  {
    path: "/",
    icon: "home",
    name: "nav.home",
    meta: {
      headerRender: false,
      menuRender: false,
    },
    component: () => import("@renderer/pages/home.vue"),
  },
  {
    path: "/blog",
    icon: "blog",
    name: "nav.blog",
    component: () => import("@renderer/pages/blog/blog.vue"),
  },
  {
    path: "/music",
    icon: "music",
    name: "nav.music",
    component: () => import("@renderer/pages/Music/music.vue"),
  },
  {
    path: "/game",
    icon: "game",
    name: "nav.game",
    component: () => import("@renderer/pages/game/index.vue"),
  },
  {
    path: "/tool",
    icon: "tools",
    name: "nav.tools",
    component: () => import("@renderer/pages/tools/index.vue"),
  },
  {
    path: "/detail",
    name: "nav.detail",
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false,
    },
    component: () => import("@renderer/pages/blog/detail.vue"),
  },
  {
    path: "/add",
    name: "nav.add",
    hiden: true,
    meta: {
      headerRender: true,
      menuRender: false,
    },
    component: () => import("@renderer/pages/blog/add.vue"),
  },
  {
    path: "/login",
    name: "nav.login",
    hiden: true,
    meta: {
      headerRender: false,
      menuRender: false,
    },
    component: () => import("@renderer/pages/center/login.vue"),
  },
  {
    path: "/set",
    name: "nav.set",
    hiden: true,
    component: () => import("@renderer/pages/center/set.vue"),
  },
  {
    path: "/center",
    name: "",
    hiden: true,
    component: () => import("@renderer/pages/center/index.vue"),
  },
  {
    path: "/test",
    name: "",
    hiden: true,
    component: () => import("@renderer/pages/other/test.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "",
    hiden: true,
    component: () => import("@renderer/pages/other/404.vue"),
  },
];

export default routes;
