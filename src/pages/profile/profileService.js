import api from '@/axios'

export default {
  getAllPurchases(id) {
    return api().get(`clients/${id}`)
  },
}
