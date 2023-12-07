import myRequest from "@renderer/api/musicRequest"

// 检索音乐
export const searchMusic = async (keywords: string, pageNum?: number, pageSize?: number) => {
	const res = await myRequest({
		url: `/search`,
		method: "GET",
		params: {
			keywords,
		},
		// data: {
		//   pageNum,
		//   pageSize,
		// },
	})
	return res.result
}

/**
 * check音乐
 * @param {number} id 音乐id
 * @return {boolean} success
 */
export const checkMusic = async (id: number) => {
	const res = await myRequest({
		url: `/check/music?id=` + id,
		method: "GET",
	})
	return res
}

/**
 * 获取歌曲链接
 * @param {number} id 歌曲id
 * @return {any} data
 */
export const musicUrl = async (id: number) => {
	const res = await myRequest({
		url: `/song/url?id=` + id,
		method: "GET",
	})
	return res.data
}

/**
 * 获取歌曲详情
 * @param {number} id 歌曲id
 * @return {any} data
 */
export const musicInfo = async (id: number) => {
	const res = await myRequest({
		url: `/song/detail?ids=` + id,
		method: "GET",
	})
	return res
}

/**
 * 获取歌词详情
 * @param {number} id 歌词id
 * @return {[]} data
 */
export const lyricInfo = async (id: number) => {
	const res = await myRequest({
		url: `/lyric?id=` + id,
		method: "GET",
	})
	return res
}

/**
 * 获取最新列表
 * @return {any} data
 */
export const newSongAPi = async () => {
	const res = await myRequest({
		url: "/personalized/newsong",
		method: "GET",
	})
	return res
}
