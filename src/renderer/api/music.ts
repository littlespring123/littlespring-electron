import myRequest from "@renderer/api/musicRequest";
const API = "http://47.98.47.146:3000";

/**
 * 获取music列表 By uId
 *
 */
export const getListApi = async (
  uid?: string,
  key?: string,
  pageNum?: number,
  pageSize?: number
) => {
  const res = await myRequest({
    url: `${API}/files/getBlog`,
    method: "GET",
    data: {
      uid,
      key,
      pageNum,
      pageSize,
    },
  });
  return res.data;
};

// 检索音乐
export const searchMusic = async (
  keywords: string,
  pageNum?: number,
  pageSize?: number
) => {
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
  });
  return res.result;
};

/**
 * check音乐
 * @param {number} id
 * @return {boolean} success
 */
export const checkMusic = async (id: number) => {
  const res = await myRequest({
    url: `/check/music?id=` + id,
    method: "GET",
  });
  return res;
};

/**
 * 获取歌曲链接
 * @param id
 */
export const musicUrl = async (id: number) => {
  const res = await myRequest({
    url: `/song/url?id=` + id,
    method: "GET",
  });
  return res.data;
};

/**
 * 获取歌曲链接
 * @param id
 */
export const musicInfo = async (id: number) => {
  const res = await myRequest({
    url: `/song/detail?ids=` + id,
    method: "GET",
  });
  return res;
};

/**
 * 获取歌词详情
 * @param id
 */
export const lyricInfo = async (id: number) => {
  const res = await myRequest({
    url: `/lyric?id=` + id,
    method: "GET",
  });
  return res;
};
