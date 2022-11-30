import api from '@/axios'
export default {
  findAll () {
    return api().get(`packages/our`)
  },
  findOne (id) {
    return api().get(`packages/${id}`)
  }
}
