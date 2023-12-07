interface IRoute {
	path?: string // 配置路由路径
	component?: any // 配置用于渲染的 React 组件路径
	wrappers?: string[] // 配置路由的高阶组件封装，输入值为高阶组件路径
	redirect?: string // 配置路由跳转
	exact?: boolean // 表示是否严格匹配，即 location 是否和 path 完全对应上
	actionId?: string // 用于控制当前页面访问权限，默认不做限制
	name?: string // 当前菜单名，无默认值，必填，不填则表示不展示
	icon?: string // 当前菜单的左侧 icon，可选 antd 的 icon name 和 url，可不填
	headerRender?: boolean // 是否展示顶栏，默认为true
	footerRender?: boolean // 是否展示页脚，默认为true
	menuRender?: boolean // 是否展示菜单，默认为true
	menuHeaderRender?: boolean // 是否展示菜单顶栏，默认为true
	hideChildrenInMenu?: boolean // 是否隐藏子菜单
	hideInMenu?: boolean // 隐藏自己和子菜单
	hideInBreadcrumb?: boolean // 在面包屑中隐藏
	flatMenu?: boolean // 在菜单中只隐藏此项，子项往上提，仍旧展示，默认为false  routes?: IRoute[]; // 配置子路由
	[k: string]: unknown
}

const routes: IRoute[] = [
	{
		path: "/music",
		icon: "music",
		name: "nav.music",
		meta: {
			headerRender: true,
			menuRender: false,
		},
		component: () => import("@renderer/pages/Music/music.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "",
		hiden: true,
		meta: {
			headerRender: true,
			menuRender: false,
		},
		component: () => import("@renderer/pages/Music/music.vue"),
	},
]

export default routes
