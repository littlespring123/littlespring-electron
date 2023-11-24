import myRequest from '@renderer/api/request.js';
// 按需引入的 请求头
export function login(data) {
  return myRequest({
    url: '/users/login',
    method: 'POST',
    data: data
  }).then((res) => {
    return res.data;
  });
}

export function register(data) {
  return myRequest({
    url: '/users/register',
    method: 'POST',
    data: data
  }).then((res) => {
    return res.data;
  });
}

export function getUserInfo(data) {
  return myRequest({
    url: '/users/info',
    method: 'GET'
  }).then((res) => {
    return res.data;
  });
}

export function checkName(data) {
  return myRequest({
    url: '/users/check',
    method: 'GET',
    data: {
      username: data
    }
  }).then((res) => {
    return res.data;
  });
}

// 上传头像
export function uploadAvatar(data) {
  return myRequest({
    url: '/users/upload',
    method: 'POST',
    data: data,
    header: {
      'Content-Type': 'multiple/form-data'
    }
  }).then((res) => {
    return res.data;
  });
}

// 获取头像
export function getAvatar(data) {
  console.log(data);
  return myRequest({
    url: '/users/getAvatar',
    method: 'GET',
    data: {
      uid: data
    }
  }).then((res) => {
    return res.data;
  });
}

// 反馈
export function postFeedBack(data) {
  console.log(data);
  return myRequest({
    url: '/feedback/post',
    method: 'POST',
    data: {
      uid: data.uid,
      score: data.score,
      feedBack: data.feedBack
    }
  }).then((res) => {
    return res.data;
  });
}
