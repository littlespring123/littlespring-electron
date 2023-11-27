import myRequest from "@renderer/api/request.js";

/**
 * 获取列表
 * @returns
 */
export const getList = async () => {
  const res = await myRequest({
    url: "/note/get",
    method: "GET",
  });
  return res.data;
};

/**
 * 添加
 * @returns
 */
export const addTodo = async () => {
  const res = await myRequest({
    url: "/blog/overview",
    method: "GET",
  });
  return res.data;
};

/**
 * 修改
 * @returns
 */
export const modifyTodo = async () => {
  const res = await myRequest({
    url: "/note/modify",
    method: "GET",
  });
  return res.data;
};

/**
 * 删除
 * @param id
 * @returns
 */
export const deleteTodo = async (id: number) => {
  const res = await myRequest({
    url: "/note/delete",
    method: "GET",
    params: {
      id,
    },
  });
  return res.data;
};
