import { defineStore } from 'pinia';
import { watch, ref } from 'vue';
import { setLanguage } from '@renderer/i18n';

export const useStore = defineStore('main', () => {
  // 用户信息
  const userInfo = ref({
    id: '',
    name: ''
  });

  const setUserInfo = (data: any) => {
    userInfo.value = data;
  };

  // 用户博客信息
  // userBlog: {
  //   count: 100,
  //   viewCount: 100,
  //   github: 'www.wwww',
  //   office: 'asasass',
  // },

  // 设置相关
  // 主题设置
  const themeColor = ref('#007AFF');
  const color = ref('#000');
  const backgroundColor = ref('#fff');
  const setColor = (colorObj: any) => {
    setThemeColor(colorObj?.themeColor || '#007AFF');
    color.value = colorObj?.color || '#000';
    backgroundColor.value = colorObj?.backgroundColor || '#fff';
  };
  const setThemeColor = (color: string) => {
    themeColor.value = color;
  };

  // 滚动条设置
  const scroller = ref({
    scrollerColor: '#ccc',
    scrollerWidth: 10
  });
  const setScroller = (data) => {
    scroller.value = data;
  };

  // 夜间模式设置
  const darkMode = ref(false);
  const setDarkMode = (value: boolean) => {
    darkMode.value = value;
    if (value) {
      color.value = '#fff';
      backgroundColor.value = '#000';
    } else {
      color.value = '#000';
      backgroundColor.value = '#fff';
    }
  };

  // 语言设置
  const languageMode = ref('cn');
  const setLanguageMode = (mode: 'en' | 'cn') => {
    languageMode.value = mode;
    setLanguage(mode);
    console.log('mode', mode, languageMode.value);
  };

  // 加载中
  const loading = ref(false);

  // message设置
  const message = ref({
    show: false,
    text: '',
    icon: 'success',
    duration: 2000
  });

  const setMessage = (text: string, duration = 2000) => {
    message.value = {
      show: true,
      text,
      icon: 'none',
      duration
    };
  };

  const setSuccessMsg = (text = '成功', duration = 2000) => {
    message.value = {
      show: true,
      text,
      icon: 'success',
      duration
    };
  };
  const setFailMsg = (text = '失败', duration = 2000) => {
    message.value = {
      show: true,
      text,
      icon: 'fail',
      duration
    };
  };

  // layout设置
  const showHead = ref(true);
  const showNav = ref(true);
  const setShowHead = (value: boolean) => {
    showHead.value = value;
  };
  const setSHowNav = (value: boolean) => {
    showHead.value = value;
  };

  return {
    userInfo,
    message,
    themeColor,
    color,
    backgroundColor,
    scroller,
    darkMode,
    loading,
    languageMode,
    showHead,
    showNav,
    setScroller,
    setColor,
    setLanguageMode,
    setMessage,
    setFailMsg,
    setSuccessMsg,
    setThemeColor,
    setUserInfo,
    setDarkMode,
    setShowHead,
    setSHowNav
  };
});
// watch(
//   pinia.state,
//   (state) => {
//     // 每当状态发生变化时，将整个 state 持久化到本地存储。
//     localStorage.setItem('piniaState', JSON.stringify(state));
//   },
//   { deep: true },
// );
