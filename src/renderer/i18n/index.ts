import { createI18n } from 'vue-i18n';
import EN from '@renderer/i18n/languages/en';
import CN from '@renderer/i18n/languages/zh-cn';

const message = {
  cn: {
    ...CN
  },
  en: {
    ...EN
  }
};

// export function loadLanguages() {
//     const context = import.meta.globEager("./languages/*.ts");

//     const languages: AnyObject = {};

//     let langs = Object.keys(context);
//     for (let key of langs) {
//         if (key === "./index.ts") return;
//         let lang = context[key].lang;
//         let name = key.replace(/(\.\/languages\/|\.ts)/g, '');
//         languages[name] = lang
//     }

//     return languages
// }

// export function i18nt(key: string) {
//     return i18n.global.d(key);
// }

const i18n = createI18n({
  legacy: false,
  locale: 'cn',
  fallbackLocale: 'cn',
  globalInjection: true, // 全局注册 $t方法
  // messages: loadLanguages()
  messages: message
});

export function setLanguage(locale: 'en' | 'cn') {
  i18n.global.locale.value = locale;
}

export default i18n;
