import { createI18n } from 'vue-i18n'

import { getLanguage } from '../utils/helper'
import ar from './ar.json'
import en from './en.json'

const language = getLanguage()
const messages = { ar, en }

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: language.value, // set locale
  fallbackLocale: language.value, // set fallback locale
  messages, // set locale messages
})

export default i18n
