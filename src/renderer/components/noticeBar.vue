<template>
	<div v-if="show" class="noticebar" :style="{ backgroundColor }" @click="onClick">
		<!-- <icons v-if="showIcon === true || showIcon === 'true'" class="noticebar-icon" type="sound" :color="color" :size="fontSize * 1.5" /> -->
		<div
			ref="textBox"
			class="noticebar__content-wrapper"
			:class="{
				'noticebar__content-wrapper--scrollable': scrollable,
				'noticebar__content-wrapper--single': !scrollable && (single || moreText),
			}"
			:style="{ height: scrollable ? fontSize * 1.5 + 'px' : 'auto' }"
		>
			<div
				:id="elIdBox"
				class="noticebar__content"
				:class="{
					'noticebar__content--scrollable': scrollable,
					'noticebar__content--single': !scrollable && (single || moreText),
				}"
			>
				<span
					:id="elId"
					ref="animationEle"
					class="noticebar__content-text"
					:class="{
						'noticebar__content-text--scrollable': scrollable,
						'noticebar__content-text--single': !scrollable && (single || showGetMore),
					}"
					:style="{
						color: color,
						fontSize: fontSize + 'px',
						lineHeight: fontSize * 1.5 + 'px',
						width: wrapWidth.value + 'px',
						animationDuration: animationDuration,
						animationPlayState: webdivHide.value ? 'paused' : animationPlayState.value,
						animationDelay: animationDelay.value,
					}"
					>{{ text }}</span
				>
			</div>
		</div>
		<!-- <div v-if="isShowGetMore" class="noticebar__more cursor-point" @click="clickMore">
			<text v-if="moreText.length > 0" :style="{ color: moreColor, fontSize: fontSize + 'px' }">{{ moreText }}</text>
			<icons v-else type="right" :color="moreColor" :size="fontSize * 1.1" />
		</div>
		<div v-if="isShowClose" class="noticebar-close cursor-point">
			<icons type="closeempty" :color="color" :size="fontSize * 1.1" @click="close" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
/**
 * NoticeBar 自定义导航栏
 * @description 通告栏组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=30
 * @property {Number} speed 文字滚动的速度，默认100px/秒
 * @property {String} text 显示文字
 * @property {String} backgroundColor 背景颜色
 * @property {String} color 文字颜色
 * @property {String} moreColor 查看更多文字的颜色
 * @property {String} moreText 设置“查看更多”的文本
 * @property {Boolean} single = [true|false] 是否单行
 * @property {Boolean} scrollable = [true|false] 是否滚动，为true时，NoticeBar为单行
 * @property {Boolean} showIcon = [true|false] 是否显示左侧喇叭图标
 * @property {Boolean} showClose = [true|false] 是否显示左侧关闭按钮
 * @property {Boolean} showGetMore = [true|false] 是否显示右侧查看更多图标，为true时，NoticeBar为单行
 * @event {Function} click 点击 NoticeBar 触发事件
 * @event {Function} close 关闭 NoticeBar 触发事件
 * @event {Function} getmore 点击”查看更多“时触发事件
 */
import { ref, toRefs, onMounted, onBeforeUnmount, nextTick } from "vue"
const props = defineProps({
	text: {
		type: String,
		default: "",
	},
	moreText: {
		type: String,
		default: "",
	},
	backgroundColor: {
		type: String,
		default: "#FFF9EA",
	},
	speed: {
		// 默认1s滚动100px
		type: Number,
		default: 100,
	},
	color: {
		type: String,
		default: "#FF9A43",
	},
	fontSize: {
		type: Number,
		default: 14,
	},
	moreColor: {
		type: String,
		default: "#FF9A43",
	},
	single: {
		// 是否单行
		type: [Boolean, String],
		default: false,
	},
	scrollable: {
		// 是否滚动，添加后控制单行效果取消
		type: [Boolean, String],
		default: false,
	},
	showIcon: {
		// 是否显示左侧icon
		type: [Boolean, String],
		default: false,
	},
	showGetMore: {
		// 是否显示右侧查看更多
		type: [Boolean, String],
		default: false,
	},
	showClose: {
		// 是否显示左侧关闭按钮
		type: [Boolean, String],
		default: false,
	},
})
const { moreText, speed, single, scrollable, showGetMore, showClose } = toRefs(props)
const emits = defineEmits(["click", "getmore", "close"])
const textWidth = ref(0)
const boxWidth = ref(0)
const wrapWidth = ref("")
const webdivHide = ref(false)
const stopAnimation = false
const animationEle = ref(null)
const textBox = ref(null)
const show = true
const animationDuration = "none"
const animationPlayState = "paused"
const animationDelay = "0s"
const isShowGetMore = () => {
	return showGetMore.value === true || showGetMore.value === "true"
}
const isShowClose = () => {
	return (showClose.value === true || showClose.value === "true") && (showGetMore.value === false || showGetMore.value === "false")
}
const initSize = () => {
	if (scrollable.value) {
		let query = []
		boxWidth.value = 0
		textWidth.value = 0
		let textQuery = new Promise((resolve, reject) => {
			// uni
			// 	.createSelectorQuery()
			// 	.in(this)
			// 	.select(`#${this.elId}`)
			// 	.boundingClientRect()
			// 	.exec((ret) => {
			// 		textWidth.value = ret[0].width
			// 		resolve()
			// 	})
		})
		let boxQuery = new Promise((resolve, reject) => {
			// uni
			// 	.createSelectorQuery()
			// 	// #ifndef MP-ALIPAY
			// 	.in(this)
			// 	// #endif
			// 	.select(`#${this.elIdBox}`)
			// 	.boundingClientRect()
			// 	.exec((ret) => {
			// 		boxWidth.value = ret[0].width
			// 		resolve()
			// 	})
		})
		query.push(textQuery)
		query.push(boxQuery)
		Promise.all(query).then(() => {
			animationDuration.value = `${textWidth.value / speed.value}s`
			animationDelay.value = `-${boxWidth.value / speed.value}s`
			setTimeout(() => {
				animationPlayState.value = "running"
			}, 1000)
		})

		// dom.getComponentRect(animationEle.value, (res) => {
		// 	let winWidth = uni.getSystemInfoSync().windowWidth
		// 	textWidth.value = res.size.width
		// 	animation.transition(
		// 		animationEle.value,
		// 		{
		// 			styles: {
		// 				transform: `translateX(-${winWidth}px)`,
		// 			},
		// 			duration: 0,
		// 			timingFunction: "linear",
		// 			delay: 0,
		// 		},
		// 		() => {
		// 			if (!stopAnimation.value) {
		// 				animation.transition(
		// 					animationEle.value,
		// 					{
		// 						styles: {
		// 							transform: `translateX(-${textWidth.value}px)`,
		// 						},
		// 						timingFunction: "linear",
		// 						duration: ((textWidth.value - winWidth) / speed.value) * 1000,
		// 						delay: 1000,
		// 					},
		// 					() => {
		// 						if (!stopAnimation.value) {
		// 							loopAnimation()
		// 						}
		// 					},
		// 				)
		// 			}
		// 		},
		// 	)
		// })
	}
	// if (!scrollable.value && (single.value || moreText.value)) {
	// 	dom.getComponentRect(textBox.value, (res) => {
	// 		wrapWidth.value = res.size.width
	// 	})
	// }
}
// const loopAnimation = () => {
// 	animation.transition(
// 		animationEle.value,
// 		{
// 			styles: {
// 				transform: `translateX(0px)`,
// 			},
// 			duration: 0,
// 		},
// 		() => {
// 			if (!stopAnimation.value) {
// 				animation.transition(
// 					animationEle.value,
// 					{
// 						styles: {
// 							transform: `translateX(-${textWidth.value}px)`,
// 						},
// 						duration: (textWidth.value / speed.value) * 1000,
// 						timingFunction: "linear",
// 						delay: 0,
// 					},
// 					() => {
// 						if (!stopAnimation.value) {
// 							loopAnimation()
// 						}
// 					},
// 				)
// 			}
// 		},
// 	)
// }

const clickMore = () => {
	emits("getmore")
}
const close = () => {
	show.value = false
	emits("close")
}
const onClick = () => {
	emits("click")
}

onMounted(() => {
	// var pages = getCurrentPages()
	// var page = pages[pages.length - 1]
	// var currentWebdiv = page.$getAppWebdiv()
	// currentWebdiv.addEventListener("hide", () => {
	// 	webdivHide.value = true
	// })
	// currentWebdiv.addEventListener("show", () => {
	// 	webdivHide.value = false
	// })
	nextTick(() => {
		initSize()
	})
})

onBeforeUnmount(() => {
	stopAnimation.value = true
})
</script>

<style lang="scss" scoped>
.noticebar {
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	box-sizing: border-box;
	/* #endif */
	flex-direction: row;
	align-items: center;
	padding: 10px 12px;
	// margin-bottom: 10px;
}

.cursor-point {
	cursor: pointer;
}

.noticebar-close {
	margin-left: 8px;
	margin-right: 5px;
}

.noticebar-icon {
	margin-right: 5px;
}

.noticebar__content-wrapper {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
}

.noticebar__content-wrapper--single {
	line-height: 18px;
}

.noticebar__content-wrapper--single,
.noticebar__content-wrapper--scrollable {
	flex-direction: row;
}

.noticebar__content-wrapper--scrollable {
	position: relative;
}

.noticebar__content--scrollable {
	flex: 0;
	flex: 1;
	display: block;
	overflow: hidden;
}

.noticebar__content--single {
	/* #ifndef APP-NVUE */
	display: flex;
	flex: none;
	width: 100%;
	justify-content: center;
	/* #endif */
}

.noticebar__content-text {
	font-size: 14px;
	line-height: 18px;
	/* #ifndef APP-NVUE */
	word-break: break-all;
	/* #endif */
}

.noticebar__content-text--single {
	/* #ifdef APP-NVUE */
	lines: 1;
	/* #endif */
	/* #ifndef APP-NVUE */
	display: block;
	width: 100%;
	white-space: nowrap;
	/* #endif */
	overflow: hidden;
	text-overflow: ellipsis;
}

.noticebar__content-text--scrollable {
	/* #ifdef APP-NVUE */
	lines: 1;
	padding-left: 750rpx;
	/* #endif */
	/* #ifndef APP-NVUE */
	position: absolute;
	display: block;
	height: 18px;
	line-height: 18px;
	white-space: nowrap;
	padding-left: 100%;
	animation: notice 10s 0s linear infinite both;
	animation-play-state: paused;
	/* #endif */
}

.noticebar__more {
	/* #ifndef APP-NVUE */
	display: inline-flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	padding-left: 5px;
}

@keyframes notice {
	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
