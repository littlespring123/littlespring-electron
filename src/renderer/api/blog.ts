import myRequest from '@renderer/api/request.js';

// 获取blog预览，内容：文章数量，类别，浏览量
export const getOverViewApi = async () => {
  const res = await myRequest({
    url: '/blog/overview',
    method: 'GET'
  });
  return res.data;
};

// 获取blog列表 By uId
export const getBlogListApi = async (
  uid?: string,
  pageNum?: number,
  pageSize?: number,
  title?: string,
  tag?: string,
  order?: string
) => {
  const res = await myRequest({
    url: '/blog/getBlog',
    method: 'GET',
    params: {
      uid,
      pageNum,
      pageSize,
      title,
      tag,
      order
    }
  });
  return res.data;
};

// 获取详情
export const getBlogApi = async (id: number) => {
  const res = await myRequest({
    url: '/blog/getInfo',
    method: 'GET',
    params: {
      id
    }
  });
  return res.data;
};

// 检索
export const searchBlogApi = async (value: string) => {
  const res = await myRequest({
    url: '/blog/searchBlog',
    method: 'GET',
    data: {
      value
    }
  });
  return res.data;
};

// 新建blog
export const postBlogApi = async (data: any, uid: string) => {
  const res = await myRequest({
    url: '/blog/postBlog',
    method: 'POST',
    params: {
      uid
    },
    data
  });
  return res.data;
};

// 修改blog
export const modifyBlogApi = async (data: any, id: number) => {
  const res = await myRequest({
    url: '/blog/modifyBlog',
    method: 'POST',
    params: {
      id
    },
    data
  });
  return res.data;
};

// 删除blog
export const deleteBlogApi = async (id: string) => {
  const res = await myRequest({
    url: '/blog/deleteBlog',
    method: 'GET',
    params: {
      id
    }
  });
  return res.data;
};
