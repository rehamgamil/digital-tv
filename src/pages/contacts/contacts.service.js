import api from '@/axios'

export default {
  create(data) {
    return api().post('contact-messages/add', data)
  },
}
