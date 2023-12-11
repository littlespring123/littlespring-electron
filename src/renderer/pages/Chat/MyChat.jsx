import { defineComponent, ref } from "vue"
// import { consultApi, getWordApi } from "@/page-home/utils/consultApi"

import styles from "./styles.scss"

export default defineComponent({
	setup() {
		//聊天列表
		const chatList = ref([
			{
				id: 0,
				content: "您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!",
			},
		])
		//搜索内容
		const questionInput = ref("")
		// 结果列表
		let questionList = ref([])

		// 是否显示搜索词条列表
		const showWordsModal = ref(false)

		// const handleDebounce = debounce(changeInput, 700)

		//搜索问题
		const searchQuestions = async () => {
			if (questionInput.value == "") {
				// uni.showToast({
				// 	title: "输入不能为空！",
				// 	duration: 2000,
				// 	icon: "fail",
				// })
				return
			}
			chatList.value.push({
				id: 1,
				content: questionInput.value,
			})
			let data = {
				msg: questionInput.value,
				userId: "",
			}
			const res = await consultApi(data)
			if (res) {
				questionList.value = res.data.matched
				if (questionList.value.length !== 0) {
					chatList.value.push({
						id: 2,
						content: "",
					})
				} else {
					chatList.value.push({
						id: 2,
						content: "您的问题超出了小图的理解能力喔 ~ ",
					})
				}
			} else {
				chatList.value.push({
					id: 2,
					content: "您的问题超出了小图的理解能力喔 ~ ",
				})
			}
			scrollBottom()
		}
		const scrollTop = ref(0) // 内容底部与顶部的距离
		//滚动到底部
		const scrollBottom = () => {}

		return () => (
			<>
				<div class={styles.chatBox} id="chatBody">
					<div>
						{chatList.value.map((item, index) => (
							<div class="chatWord" key={index} class={item.id == 1 ? "chatQuestion" : ""}>
								<div class={styles.icon}>
									<img class={styles.image} src="@renderer/assets/face1.png"></img>
								</div>
								{!item.questionList && <div class={styles.wordBox}>{item.content}</div>}
								{item.id == 2 && <div class={styles.judge}></div>}
							</div>
						))}
					</div>
				</div>
				<div class={styles.chatLine}>
					<div class={styles.chatInput}>
						<Input type="text" v-model={questionInput.value} placeholder="请输入咨询内容" class={styles.input}></Input>
						{/* @input="(e:string)=>handleDebounce(e)" /> */}
						<div class={styles.searchBtn} onClick={searchQuestions}>
							<img class={styles.img} src="@renderer/assest/face1.png" alt="error"></img>
						</div>
					</div>
				</div>
			</>
		)
	},
})
