// 博客
// 下拉框选项
export interface ISelectOptions {
	text: string
	value: string
}

export interface IPaginations {
	pageNum: number
	pageSize: number
	total: number
}

export interface blogFormType {
	title: string
	content: string
	tag: []
}

export interface NodeType {
	name?: string
	id?: number | string
	level?: number
	parent?: any
	children?: []
	rawName?: string
	scrollTop?: number
	isVisible?: boolean
}

export interface IBlogTag {
	id: number
	fatherid: number
	cotent: string
}

export interface IBlogItem {
	content: string
	count: number
	id: number
	lasttime: string
	tag: IBlogTag[]
	title: string
	uid: string
}
