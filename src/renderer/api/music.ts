import myRequest from "@renderer/api/request";
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
    url: `${API}/search`,
    method: "GET",
    params: {
      keywords,
    },
    // data: {
    //   pageNum,
    //   pageSize,
    // },
  });
  return res.data;
};

/**
 * check音乐
 * @param {number} id
 * @return {boolean} success
 */
export const checkMusic = async (id: number) => {
  const res = await myRequest({
    url: `${API}/check/music`,
    method: "GET",
    params: {
      id,
    },
  });
  return res.data;
};

/**
 * 获取详情
 * @param id
 */
export const musicInfo = async (id: number) => {
  const res = await myRequest({
    url: `${API}/song/url`,
    method: "GET",
    params: {
      id,
    },
  });
  return res.data;
};
