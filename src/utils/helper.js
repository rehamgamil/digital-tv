import moment from 'moment'
import { LANGUAGE, S3_BASE_URL } from '../config/constant'
import LogoImg from '@/assets/images/logo-2.png'

export const getLanguage = () => {
  return localStorage.getItem('language')
    ? JSON.parse(localStorage.getItem('language'))
    : LANGUAGE
}
export const changeLanguage = (lang) => {
  const currentLanguage = getLanguage()
  if (JSON.stringify(lang) !== JSON.stringify(currentLanguage)) {
    localStorage.setItem('language', JSON.stringify(lang))
    window.location.reload()
  }
}

//#region api
export const fileFullPathFromApi = (filePath) => {
  if (filePath) return `${S3_BASE_URL}${filePath}`
  else return LogoImg
}
//#endregion api

//#region formats
export const formatDateTime = (value = '') => {
  return value
    ? moment(String(value)).format('DD MMMM YYYY, hh:mm:ss A')
    : '---'
}
export const formatDate = (value = '') => {
  return value ? moment(String(value)).format('DD MMMM YYYY') : '---'
}
export const formatTime = (value = '') => {
  return value ? moment(String(value)).format('hh:mm:ss A') : '---'
}

export const formatDateAgo = (value = '') => {
  return value ? moment(String(value)).fromNow() : '---'
}

export const formatNumber = (value = '') => {
  const local = getLanguage().value === 'ar' ? 'ar-EG' : 'en'
  return Number(value).toLocaleString(local)
}
//#endregion formats
