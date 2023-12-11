import { toRefs, toRef, ref, defineComponent } from "vue"

export default defineComponent({
	setup() {
		const title = ref("jkjkj")
		return () => (
			<>
				<button>{title.value}</button>
				<button>dsdad</button>
				<button>dsdad</button>
				<button>dsdad</button>
			</>
		)
	},
})
