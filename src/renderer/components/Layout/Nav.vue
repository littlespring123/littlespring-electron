<template>
	<div class="Nav shell" :class="{ close: !showMenu }" :style="{ fill: color, color, backgroundColor }">
		<div class="logo">
			<!-- <span class="logo-img"> -->
			<img src="@renderer/assets/headportrait.jpeg" alt="" @click="router.push('/login')" />
			<!-- </span> -->
			<!-- <div class="text logo-text">
        <span class="name">littlespring</span>
      </div> -->
		</div>
		<div class="menu-bar">
			<div class="menu">
				<ul class="menu-links">
					<template v-for="item in routes" :key="item.path">
						<li v-if="!item?.hiden" class="nav-link" :class="{ active: menuActive === item.path }" @click="router.push(item.path)">
							<Icon class="iconfont icon" :name="item.icon"></Icon>
							<span class="text nac-text">{{ t(item.name) }}</span>
						</li>
					</template>
				</ul>
			</div>
			<div class="bottom-content">
				<ul class="menu-links">
					<template v-for="item in bottomNav" :key="item.name">
						<li v-if="!item?.hiden" class="nav-link" @click="item.operate()">
							<Icon class="iconfont icon" :color="color" :name="item.icon"></Icon>
							<span class="text nac-text">{{ t(item.name) }}</span>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</div>
	<!-- <div @click="showMenu = true" class="tag" v-show="!showMenu">show</div> -->
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import routes from "@renderer/router/routerList"
import { useStore } from "@renderer/stores"
import { storeToRefs } from "pinia"

import { useI18n } from "vue-i18n"
const { t } = useI18n()

const store = useStore()
const router = useRouter()
const showMenu = ref(false)
const { color, backgroundColor, themeColor, menuActive } = storeToRefs(store)

const bottomNav = ref([
	{
		name: "nav.set",
		icon: "set",
		operate: () => router.push("/set"),
	},
	{
		name: "nav.hide",
		icon: "hide",
		operate: () => (showMenu.value = !showMenu.value),
	},
])

// const getImageUrl = (icon: any) => {
//   return new URL(`../assets/${icon}`, import.meta.url).href;
// };
</script>

<style scoped lang="scss">
$body-color: #e4e9f7;
$shell-color: #fff;
$primary-color: #695cfe;
$primary-color-light: #f6f5ff;
$text-color: #707070;

/* 深色主题变量 */
// .dark {
//   $body-color: #202224;
//   $shell-color: #171717;
//   $primary-color: #3a3b3c;
//   $primary-color-light: #3a3b3c;
//   // $toggle-color: #fff;
//   $text-color: #ccc;
// }

.shell {
	top: 0;
	left: 0;
	height: 100%;
	border: 1px solid #ccc;
	width: 13vw;
	padding: 10px 14px;
	background: $shell-color;
	transition: all 0.3s ease;
	z-index: 100;

	li {
		height: 50px;
		list-style: none;
		display: flex;
		align-items: center;
		margin-top: 10px;
		justify-content: left;
	}
}

.close {
	width: 7vw;
}

.icon {
	min-width: 60px;
	border-radius: 6px;
}

.icon {
	min-width: 60px;
	border-radius: 6px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font: 300 23px "";
}

.text,
.icon {
	transition: all 0.3s ease;
}

.text {
	cursor: pointer;
	font: 500 17px;
	white-space: nowrap;
	opacity: 1;
}

.shell.close .text {
	opacity: 0;
	// display: none;
}

.shell li:hover {
	color: v-bind(themeColor);
	fill: v-bind(themeColor);
}

.shell li:hover .icon,
.shell li:hover .text {
	color: v-bind(themeColor);
	fill: v-bind(themeColor);
}

.active {
	color: v-bind(themeColor);
	fill: v-bind(themeColor);
}

.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;

	// width: 45px;
	// border-radius: 6px;

	// &-img {
	//   display: flex;
	//   align-items: center;
	//   justify-content: center;

	img {
		width: 55px;
		border-radius: 6px;
	}
	// }

	&-text {
		display: flex;
		flex-direction: column;

		.name {
			margin-top: 2px;
			font: 600 18px "";
		}
	}
}

// menu
.menu-bar {
	height: calc(100% - 85px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	// align-items: center;
	overflow-y: scroll;

	.menu {
		margin-top: 20px;
	}
}

.menu-bar::-webkit-scrollbar {
	display: none;
}
</style>
