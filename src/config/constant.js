export const LANGUAGES = [
  {
    title: 'العربية',
    value: 'ar',
    image: require('@/assets/images/lang/ar.svg'),
    direction: 'rtl',
  },
  {
    title: 'English',
    value: 'en',
    image: require('@/assets/images/lang/en.svg'),
    direction: 'ltr',
  },
]
export const LANGUAGE = LANGUAGES[1]

export const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || 'http://172.16.40.18:15000/'
export const API_BASE_URL_SSO =
  process.env.VUE_APP_API_BASE_URL || 'http://172.16.40.18:15000/'
export const S3_BASE_URL =
  process.env.VUE_APP_S3_BASE_URL || 'http://172.16.40.18:15000/'

export const ABOUT_US_ID = 1
