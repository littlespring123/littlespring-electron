import { ipcMain, dialog, BrowserWindow, app } from "electron"
import { winURL } from "../config/StaticPath"
import { updater } from "./HotUpdater"
import DownloadFile from "./downloadFile"
import Update from "./checkupdate"
import { join } from "path"
import config from "@config/index"

export default {
	Mainfunc() {
		const allUpdater = new Update()
		let ChildMusicWin: null
		ipcMain.handle("IsUseSysTitle", async () => {
			return config.IsUseSysTitle
		})

		ipcMain.handle("app-close", (event, args) => {
			app.quit()
		})
		ipcMain.handle("check-update", (event) => {
			allUpdater.checkUpdate(BrowserWindow.fromWebContents(event.sender))
		})

		ipcMain.handle("confirm-update", () => {
			allUpdater.quitAndInstall()
		})

		ipcMain.handle("open-messagebox", async (event, arg) => {
			const res = await dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), {
				type: arg?.type || "info",
				title: arg?.title || "",
				buttons: arg?.buttons || [],
				message: arg?.message || "",
				noLink: arg?.noLink || true,
			})
			return res
		})

		ipcMain.handle("open-errorbox", (event, arg) => {
			dialog.showErrorBox(arg.title, arg.message)
		})

		ipcMain.handle("hot-update", (event, arg) => {
			updater(BrowserWindow.fromWebContents(event.sender))
		})

		ipcMain.handle("start-download", (event, msg) => {
			new DownloadFile(BrowserWindow.fromWebContents(event.sender), msg.downloadUrl).start()
		})

		ipcMain.handle("open-win", (event, arg) => {
			const ChildWin = new BrowserWindow({
				titleBarStyle: config.IsUseSysTitle ? "default" : "hidden",
				height: 595,
				useContentSize: true,
				width: 940,
				autoHideMenuBar: true,
				minWidth: 842,
				frame: config.IsUseSysTitle,
				show: false,
				webPreferences: {
					sandbox: false,
					webSecurity: false,
					// 如果是开发模式可以使用devTools
					devTools: process.env.NODE_ENV === "development",
					// 在macos中启用橡皮动画
					scrollBounce: process.platform === "darwin",
					preload:
						process.env.NODE_ENV === "development"
							? join(app.getAppPath(), "preload.js")
							: join(app.getAppPath(), "dist", "electron", "main", "preload.js"),
				},
			})
			// 开发模式下自动开启devtools
			if (process.env.NODE_ENV === "development") {
				ChildWin.webContents.openDevTools({ mode: "undocked", activate: true })
			}
			ChildWin.loadURL(winURL + "/music-player")
			ChildWin.once("ready-to-show", () => {
				ChildWin.show()
				if (arg.IsPay) {
					// 检查支付时候自动关闭小窗口
					const testUrl = setInterval(() => {
						const Url = ChildWin.webContents.getURL()
						if (Url.includes(arg.PayUrl)) {
							ChildWin.close()
						}
					}, 1200)
					ChildWin.on("close", () => {
						clearInterval(testUrl)
					})
				}
			})
			// 渲染进程显示时触发
			ChildWin.once("show", () => {
				ChildWin.webContents.send("send-data", arg.sendData)
			})
		})

		ipcMain.handle("open-music-win", (event, arg) => {
			console.log("open", event, arg)
			ChildMusicWin = new BrowserWindow({
				// titleBarStyle: config.IsUseSysTitle ? "default" : "hidden",
				titleBarStyle: "hidden",
				height: 495,
				useContentSize: true,
				width: 340,
				autoHideMenuBar: true,
				minWidth: 200,
				frame: false,
				show: false,
				webPreferences: {
					sandbox: false,
					webSecurity: false,
					// 如果是开发模式可以使用devTools
					devTools: process.env.NODE_ENV === "development",
					// 在macos中启用橡皮动画
					scrollBounce: process.platform === "darwin",
					preload:
						process.env.NODE_ENV === "development"
							? join(app.getAppPath(), "preload.js")
							: join(app.getAppPath(), "dist", "electron", "main", "preload.js"),
				},
			})
			if (ChildMusicWin) {
				if (process.env.NODE_ENV === "development") {
					// 开发模式下自动开启devtools
					ChildMusicWin.webContents.openDevTools({ mode: "undocked", activate: true })
				}
				ChildMusicWin.loadURL(winURL + "#/extends")
				ChildMusicWin.once("ready-to-show", () => {
					ChildMusicWin.show()
				})
			}
		})

		ipcMain.handle("close-music-win", () => {
			ChildMusicWin && ChildMusicWin.close()
		})
		// ipcMain.on("move-application", (event, pos) => {
		// 	mainWin && mainWin.setPosition(pos.posX, pos.posY)
		// })
	},
}
