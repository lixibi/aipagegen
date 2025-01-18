export const locales = {
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  'zh-CN': {
    name: '简体中文',
    flag: '🇨🇳'
  },
  'zh-TW': {
    name: '繁體中文',
    flag: '🇭🇰'
  }
} as const

export type Locale = keyof typeof locales 