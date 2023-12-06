<template>
	<div>
		<div> 简介</div>
		<div>sasa</div>
	</div>
	<div></div>
	<div></div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.user {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: #ffffff;
	margin: 1px;
	// border-bottom: .4px solid lightgray;
	/*首先我们设置边框只显示右侧，宽度为2px的实线。*/
	border-bottom: 1px solid lightgray;
	/*设置线性渐变*/
	// border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, $uni-theme-color 20%, rgba(255, 255, 255, 0) 99%) 10;

	.photo {
		margin: 10px;

		.img {
			border-radius: 50%;
			width: 50px;
			height: 50px;
		}
	}

	.main {
		width: 80vw;
		margin: 4px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.name {
			font-size: 1.5rem;
			line-height: 1.2rem;
			padding: 2px 1px;
		}

		.info {
			color: grey;
			font-size: .8rem;
		}
	}

	.right {
		display: flex;
		justify-content: center;
		align-content: center;
	}
}

.item {
	font-size: 1.2rem;
	line-height: 1.2rem;
	display: flex;
	margin: 1.4rem 2px 1.4rem 0;

	.line {
		border: 1px solid green;
		width: 3px;
		height: 1.2rem;
		background-color: forestgreen;
		margin: 0 3px 0 1px;
	}

	.font {
		// border: 1px solid red;
	}

}

.copyright {
	text-align: center
}

// .user {
// 	margin: 40px auto;
// 	display: flex;
// 	width: 90vw;
// 	// box-shadow: 2px 2px 2px 2px grey;
// 	flex-direction: column;
// 	justify-content: center;

// 	.avatar {
// 		display: inline;
// 		// width: 30px;
// 		display: flex;
// 		justify-content: center;

// 		img {
// 			border-radius: 50px;
// 			width: 100px;
// 			height: 100px;
// 		}
// 	}

// 	.info {
// 		font-size: 2.5rem;
// 		text-align: center;
// 	}
// }

// .about {
// 	margin: 4px auto;
// 	width: 90vw;
// 	font-size: 2rem;
// 	// box-shadow: 2px 2px grey;
// }

// .item {
// 	font-size: 1.2rem;
// 	line-height: 1.2rem;
// 	display: flex;
// 	margin: .8rem 0;

// 	.line {
// 		border: 1px solid green;
// 		width: 3px;
// 		height: 1.2rem;
// 		background-color: forestgreen;
// 		margin: 0 3px 0 1px;
// 	}

// 	.font {
// 		// border: 1px solid red;
// 	}

// }

// .copyright {
// 	text-align: center
// }
</style>