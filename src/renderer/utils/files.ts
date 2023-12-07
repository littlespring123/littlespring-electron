// 处理文件/文件夹
export const processHandle = async (handle) => {
	if (handle.kind === "file") {
		return handle
	}
	// 异步迭代器
	handle.children = []
	const iter = handle.entries()
	for await (const entry of iter) {
		handle.children.push(await processHandle(entry[1]))
	}
	return handle
}
