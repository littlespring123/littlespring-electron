const editorList = []
/**
 * @description: 页面通信类
 * @param {String} channelName channel名称
 * @param {String} page 实例化channel的页面名称
 * @param {Boolean} isEditor 是否是编辑器
 * @param {String} editorName 编辑器页面名称
 * @param {Function} onmessage 接收到消息的回调
 * @return {Channel} channel实例
 */
export default class Channel {
	constructor({ channelName, page, isEditor = false, editorName, onmessage }) {
		if (!page) {throw new Error("page is required")}
		if (!isEditor && !editorName) {throw new Error("editorName is required")}
		this.__uuid__ = Math.random().toString(36).substr(2)
		this.isEditor = isEditor // 是否是编辑器
		this.editorName = editorName // 编辑器页面名称
		this.page = page // 实例化channel的页面名称
		this.name = channelName ?? "qh_channel" // channel名称
		this.channel = new BroadcastChannel(this.name)
		this.addEvent(onmessage)
		this.load() // 告诉其他页面，我初始化完了
	}
	addEvent(onmessage) {
		this.channel.onmessage = ({ data: { type, page, data, uuid } }) => {
			if (!this.isEditor) {
				if (page === this.editorName) {
					// 如果是编辑器页面发送的消息
					this.updateEditor(type, uuid)
				}
			} else if (type === "load" && page !== this.page) {
				// 其他页面加载时，告诉知我已经存在了
				this.load()
			}
			if (onmessage) {
				onmessage({ type, page, data })
			}
		}
	}
	// 如果用户手动打开了多个编辑器，需要更新编辑器列表
	updateEditor(type, uuid) {
		const index = editorList.indexOf(uuid)
		if (type === "load") {
			if (index === -1) {
				editorList.push(uuid)
			}
		} else if (type === "unload") {
			if (index !== -1) {
				editorList.splice(index, 1)
			}
		}
	}
	postMessage(data) {
		if (!!editorList.length || this.isEditor) {
			const newData = { page: this.page, uuid: this.__uuid__, ...JSON.parse(JSON.stringify(data)) }
			this.channel.postMessage(newData)
			return true
		}
		return false
	}
	load() {
		this.channel.postMessage({ type: "load", uuid: this.__uuid__, page: this.page })
	}
	unload() {
		this.channel.postMessage({ type: "unload", uuid: this.__uuid__, page: this.page })
		this.channel.onmessage = null
		this.channel.close()
	}
	close() {}
}
