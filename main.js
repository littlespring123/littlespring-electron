const { app, BrowserWindow, ipcMain, dialog, globalShortcut, Menu, Tray, nativeImage } = require('electron')
const path = require('path')

const creatTray = (win) => {
    const tray = new Tray('./logo.png')
    tray.setToolTip("electron test")
    // tray.setContextMenu
    tray.on('click', (e) => {
        win.isVisible() ? win.hide() : win.show()
    })
    tray.setContextMenu(Menu.buildFromTemplate([
        { label: "关于" },
        {
            label: "关闭", click: () => {
                app.quit()
            }
        },
    ]))
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        // 不显示菜单栏
        // frame: false,
        // 优雅的打开
        show: false,
        backgroundColor: '#fff',
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false,
            preload: path.resolve(__dirname, './preload.js')
        }
    })
    win.loadURL('http://localhost:5173')
    // win.loadFile('./dist/index.html')
    // if (NODE_ENV === "development") {
    win.webContents.openDevTools()
    // }

    // 优雅的打开
    win.on('ready-to-show', () => {
        win.show()
        // 打开文件
        // dialog.showOpenDialog({
        //     defaultPath: app.getPath("desktop")
        // }).then(res => {
        //     console.log(res)
        // })
        // 保存文件
        // dialog.showSaveDialog({
        //     defaultPath: app.getPath("desktop")
        // }).then(res => {
        //     console.log(res)
        // })

        // 消息弹窗
        // const answer = ['yes', 'no', 'or']
        // dialog.showMessageBox({
        //     title: "Message",
        //     detail: "detatil",
        //     message: "message",
        //     buttons: answer
        // }).then(res => {
        //     console.log('select', res)
        // })

        const menu = Menu.buildFromTemplate([
            {
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            },
            // { role: 'fileMenu' }
            {
                label: 'File',
                submenu: [
                    { role: 'quit' }
                ]
            },
            // { role: 'editMenu' }
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' }
                ]
            },
            // { role: 'viewMenu' }
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'resetZoom' },
                    { role: 'zoomIn' },
                    { role: 'zoomOut' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            // { role: 'windowMenu' }
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' },
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Learn More',
                        click: async () => {
                            const { shell } = require('electron')
                            await shell.openExternal('https://electronjs.org')
                        }
                    }
                ]
            }])
        // Menu.setApplicationMenu(menu)
    })

    // 第二窗口:作为字幕，O(∩_∩)O
    // const win2 = new BrowserWindow({
    //     width: 100,
    //     height: 100,
    //     // parent:win,
    //     //modal:true
    // })
    // win2.loadURL('https:baidu.com')
    // win2.on('ready-to-show', () => {
    //     win.show()
    // })
    //

    // 注册全局快捷键
    globalShortcut.register('G', () => {
        dialog.showMessageBox({
            title: "key",
            message: "按到了键盘",
        }).then(res => {
            console.log('select', res)
        })
    })

    // 定义托盘
    creatTray(win)
}

//通常我们使用触发器的 .on 函数来监听 Node.js 事件。
app.on('activate', () => {
    // 如果没有窗口，则打开一个窗口
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('ready', () => {
    createWindow()
    console.log(app.getPath('desktop'));
})


app.on('window-all-closed', () => {
    console.log("closed");
    if (process.platform !== 'darwin') {
        // 关闭所有窗口后退出
        app.quit()
    }
})

app.on("before-quit", () => {

})

app.on("browser-window-blur", () => {

})

app.on("browser-window-focus", () => {

})

ipcMain.on('msg1', (event, msg) => {
    console.log("close main", msg)
    win.close()
})

ipcMain.handle('btn-event', (event, msg) => {
    return msg;
})




