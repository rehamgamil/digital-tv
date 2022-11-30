import api from '../axios'

export default {
  uploadFile(formData, url = '') {
    url = url ? url : 'media-files/upload'
    return api().post(url, formData)
  },
  // commonUploadFiles(payload, config) {
  //   return api().post('media-files/upload', payload, config)
  // },
  // removeImage(id, type) {
  //   return api().get(`remove-image/${id}/${type}`)
  // },
}
