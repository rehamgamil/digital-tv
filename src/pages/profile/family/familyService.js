import api from '@/axios'

export default {
  getClientChilds(id) {
    return api().get(`client-dependencies/childs/${id}`)
  },
}
