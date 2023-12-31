import { marked } from "marked"

/**
 * md转html格式
 * @param {string} text 原文本
 * @return {{content, toc}} Object 文本内容，目录
 */
export const md2html = (text: string) => {
	let maxTitle = 0
	let toc: any = []
	let anchor = 0

	let rendererMD = new marked.Renderer()

	marked.setOptions({
		renderer: rendererMD,
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
	})

	rendererMD.heading = function (text, level, raw) {
		//保存这篇文章的最大标签：用于目录展示的相对定位
		if (level < maxTitle) {
			maxTitle = level
		}
		anchor += 1
		/*
        toc:数组用于保存标题，
        id:标题id,用于点击目录滚动到改标题
        tag:记录属于那个标签（h1……h6）
        text:标签内容
        */
		toc.push({
			id: anchor,
			tag: level,
			text: text,
		})
		return `<h${level} id="content-nav${anchor}">${text}</h${level}>`
	}

	const options = {
		gfm: true,
		breaks: true,
		smartLists: true,
		smartypants: true,
		highlight: (code: any, lang: any) => {
			return require("highlight.js").highlightAuto(code).value
		},
	}

	return {
		content: marked(text, options),
		toc,
		maxTitle,
	}
}
