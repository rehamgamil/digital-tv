import api from '@/axios'

export default {
  findOne() {
    return api().get(`clients/alldata/1`)
  },

  update(data) {
    return api().patch('clients/1', data)
  },
}
