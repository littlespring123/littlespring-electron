# electron-vite-template
基于electron模板，搭建的个人博客页面

## 功能
博客：记录，查看，修改
音乐：网易云音乐
todo:记事本
游戏

## Build Setup

```bash

# Clone this repository
$ git clone https://github.com/umbrella22/electron-vite-template.git

# Go into the repository
$ cd electron-vite-template

npm config edit
# 该命令会打开npm的配置文件，请在空白处添加
# registry=https://registry.npmmirror.com
# ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
# ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
# 然后关闭该窗口，重启命令行.
# 使用yarn安装

# install dependencies
$ npm install

# serve with hot reload at localhost:9080
$ npm run dev

# build electron application for production
$ npm run build

```




## 目录结构
├─main
│  ├─config
│  ├─server
│  └─services
├─preload
└─renderer
    ├─api
    │  └─user
    ├─assets 静态图片资源
    ├─components 组件
    ├─i18n 语言
    ├─pages 页面
    ├─plugins 插件
    ├─public
    │  └─trayIcon
    ├─router
    ├─store
    ├─stores
    ├─styles
    ├─utils
    └─views

## Built-in
- [vue-router](https://next.router.vuejs.org/index.html)
- [pinia](https://pinia.esm.dev/)
- [electron](http://www.electronjs.org/docs)
- electron-updater
- typescript
- i18n
- marked,highlight.js, github-markdown-css
- plugin-vue-jsx 在vue中使用jsx语法

## 组件封装
### 表单组件


### 表格组件


### 样式组件
#### star

### 



## 问题



## 其他