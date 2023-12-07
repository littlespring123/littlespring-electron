<template>
	<div class="root block-z-index">
		<div class="inputBox">
			<div @keyup.enter="pushTag">
				<Input v-model="blogForm.title" :label="t('blog.title')" :placeholder="t('blog.titlePlaceHolder')" name="title" tabindex="0" focus />
				<Input v-model="tagText" :label="t('blog.tag')" :placeholder="t('blog.tagPlaceHolder')" name="tag" tabindex="0" />
				<Button @keyup.enter="pushTag" @click="pushTag">{{ t("blog.add") }}</Button>
				<Button @click="importFile">{{ t("blog.import") }}</Button>
				<div style="margin: 0 3px 10px 3px">
					<Tag
						v-for="(item, index) in blogForm.tag"
						:key="index"
						:inverted="true"
						size="large"
						:circle="true"
						:text="item?.content ? item?.content : item"
					></Tag>
				</div>
			</div>

			<div @keyup.enter="post" @keydown.ctrl.s="showMD" @keydown.ctrl.p="showMD">
				<textarea v-model="blogForm.content" class="mo-textarea" :placeholder="t('blog.input')" cols="100" rows="20"></textarea>
			</div>
			<div v-highlight class="preview" v-html="valueMD.content"></div>
			<div class="submitBtn">
				<Button @click="post">{{ t("blog.submit") }}</Button>
				<Button @click="showMD">{{ t("blog.preview") }}</Button>
			</div>
		</div>

		<!-- 目录 -->
		<ul class="catalogy">
			<li
				v-for="item of valueMD.toc"
				:key="item.id"
				:style="{ 'padding-left': item.tag - valueMD.maxTitle + 'em' }"
				@click="toTarget(item.id)"
				v-html="item.text"
			></li>
		</ul>
	</div>
	<!-- <Modal :show="isModalVisible" @close="isModalVisible = false">
    <div class="" v-html="valueMD.content"></div>
  </Modal> -->
</template>

<script setup lang="ts">
import { getBlogApi, postBlogApi, modifyBlogApi } from "@renderer/api/blog"
import { ref, Ref } from "vue"
import { md2html } from "@renderer/utils/txt2md"
import { useRouter, useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useStore } from "@renderer/stores/index"
import { blogFormType } from "./types.d"
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const store = useStore()

const { themeColor } = storeToRefs(store)

const router = useRouter()
const { query } = useRoute()

// 内容 HTML
const blogForm: Ref<blogFormType> = ref({
	title: "",
	content: "",
	tag: []
})
const valueMD: string = ref("")
const tagText: string = ref("")

const pushTag = () => {
	if (tagText.value) {
		blogForm.value.tag.push(tagText.value)
		tagText.value = ""
	} else {
		console.log("输入不能为空")
	}
}

// 保存
// const isSave: boolean = ref(false);
// const isModalVisible: boolean = ref(false);

const showMD = () => {
	valueMD.value = md2html(blogForm.value.content)
}

const post = async () => {
	if (blogForm.value.title === "") {
		return
	}
	if (query?.id) {
		const res = await modifyBlogApi(blogForm.value, query?.id)
		if (res) {
			router.push("/blog")
		}
	} else {
		const res = await postBlogApi(blogForm.value, store.userInfo.uid)
		if (res) {
			router.push("/blog")
		}
	}
}

const toTarget = (target: any) => {
	target = "#toc-nav" + target
	let toElement = document.querySelector(target)
	// toElement.scrollIntoView()
	toElement.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "nearest"
	})
}

const getBlogDet = async () => {
	if (query?.id) {
		const res = await getBlogApi(Number(query?.id))
		if (res) {
			blogForm.value = res
		}
	}
}

// 导入文件，仅支持文件
const importFile = async () => {
	try {
		const handle = await showOpenFilePicker()
		const file = await handle[0].getFile()
		const reader = new FileReader()
		reader.onload = async (e) => {
			const text = (e.target as any).result
			blogForm.value.content = text
		}
		reader.readAsText(file, "utf-8")
	} catch (error) {
		console.log("err", error)
	}
}

getBlogDet()
</script>

<style scoped lang="scss">
.root {
	max-height: 86vh;
	width: 95%;
	display: flex;
	justify-content: space-around;
	border: 1px solid #ccc;
	padding: 6px;
	margin: 10px;

	.inputBox {
		display: flex;
		flex-direction: column;
		height: 60vh;
		width: 80%;

		.preview {
			border: 1px solid #ccc;
			min-height: 20vh;
			max-height: 50vh;
			overflow: hidden;
			padding: 5px 15px;
		}

		.preview:hover {
			overflow: auto;
			border: 1px solid v-bind(themeColor);
		}

		.submitBtn {
			display: flex;
			justify-content: center;
		}
	}

	.catalogy {
		width: 18%;
		border: 1px solid #ccc;
		overflow: hidden;
		overflow: auto;
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.catalogy:hover {
		overflow: auto;
		border: 1px solid v-bind(themeColor);
	}
}

// textarea
textarea {
	border: 1px solid v-bind(themeColor);
	outline: none;
	margin: 0;
	appearance: none;
	background-image: none;
	font-size: inherit;
	width: 100%;
}

textarea:focus {
	outline: none;
}

/* 自定义样式 */
.mo-textarea {
	height: 40vh;
	display: inline-block;
	resize: vertical;
	padding: 5px 15px;
	line-height: 1.5;
	box-sizing: border-box;
	color: v-bind(color);
	background-color: v-bind(backgroundColor);
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 提示文字 */
.mo-textarea::placeholder {
	color: #c0c4cc;
}

/* 鼠标hover */
.mo-textarea:hover {
	border-color: v-bind(themeColor);
}

/* 获得焦点 */
.mo-textarea:focus {
	border-color: #3677f0;
}
</style>
