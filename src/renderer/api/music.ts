import myRequest from '@renderer/api/request';

// const API = process.env.VITE_APP_API_URL;

// 获取music列表 By uId
export const getListApi = async (
  uid?: string,
  key?: string,
  pageNum?: number,
  pageSize?: number
) => {
  const res = await myRequest({
    url: '/files/getBlog',
    method: 'GET',
    data: {
      uid,
      key,
      pageNum,
      pageSize
    }
  });
  return res.data;
};

// 检索音乐
export const searchMusic = async (keywords: string, pageNum?: number, pageSize?: number) => {
  const res = await myRequest({
    url: '/search',
    method: 'GET',
    params: {
      keywords
    },
    data: {
      pageNum,
      pageSize
    }
  });
  return res.data;
};

// check音乐
export const checkMusic = async (id: number) => {
  const res = await myRequest({
    url: '/check/music',
    method: 'GET',
    params: {
      id
    }
  });
  return res.data;
};
