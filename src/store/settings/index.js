export default {
  namespaced: true,
  state: {
    paymentGateway: 'HyperPay',
  },
  getters: {
    paymentGateway: (state) => state.paymentGateway,
  },
  mutations: {
    CHANGE_PAYMENT_GATEWAY: (state, data) => {
      state.paymentGateway = data
    },
  },
  actions: {
    changePaymentGateway(context, data) {
      context.commit('CHANGE_PAYMENT_GATEWAY', data)
    },
  },
}
