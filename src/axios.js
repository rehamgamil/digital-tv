import axios from 'axios'
import { core } from '@/config/pluginInit'
import store from '@/store'
import { getLanguage } from './utils/helper'
import { API_BASE_URL, API_BASE_URL_SSO } from './config/constant'
import i18n from './locales'
const { t } = i18n.global

const API_TIMEOUT = 20000

const language = getLanguage()
export const apiHeader = (authorizationHeader = '') => {
  let authorization = ''
  if (authorizationHeader) authorization = `Bearer ${authorizationHeader}`
  else if (store.getters['auth/authorizationToken'])
    authorization = `Bearer ${store.getters['auth/authorizationToken']}`
  else authorization = null

  return {
    Authorization: authorization,
    Accept: 'application/json',
    ContentType: 'application/json',
    lang: language.value,
  }
}

export const apiResponseCatch = (error) => {
  if (error?.response?.data?.errors) {
    // eslint-disable-next-line no-prototype-builtins
    if (error.response.data.errors?.hasOwnProperty('translations')) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(
        error.response.data.errors.translations
      )) {
        core.showSnackbar('error', value)
      }
    } else {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        core.showSnackbar('error', `[ ${key} ] -> ${value}`)
      }
    }
  } else if (error?.response?.data) {
    core.showSnackbar('error', error.response.data.message)
  } else {
    core.showSnackbar('error', t('global.apiCatch'))
  }
  return Promise.reject(error)
}

export default () => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: apiHeader(),
    timeout: API_TIMEOUT,
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, apiResponseCatch)
  return apiClient
}

export function singleSignOn(token = '') {
  const apiClient = axios.create({
    baseURL: API_BASE_URL_SSO,
    headers: apiHeader(token),
    timeout: API_TIMEOUT,
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, apiResponseCatch)
  return apiClient
}
