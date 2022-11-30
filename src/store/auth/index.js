import User from '@/pages/profile/models/User'

export default {
  namespaced: true,
  state: {
    otpPhone: '',
    authorizationToken: null,
    userData: new User(),
  },
  getters: {
    otpPhone: (state) => state.otpPhone,
    authorizationToken: (state) => state.authorizationToken,
    userData: (state) => state.userData,
  },
  mutations: {
    SET_OTP_PHONE: (state, data) => {
      state.otpPhone = data
    },
    SET_AUTHORIZATION_TOKEN: (state, data) => {
      state.authorizationToken = data
    },
    SET_USER_DATA: (state, data) => {
      state.userData = new User(data)
    },
    LOGOUT: (state) => {
      state.authorizationToken = null
      state.userData = new User()
    },
  },
  actions: {
    setOTPPhone(context, data) {
      context.commit('SET_OTP_PHONE', data)
    },
    setAuthorizationToken(context, data) {
      context.commit('SET_AUTHORIZATION_TOKEN', data)
    },
    setUserData(context, data) {
      context.commit('SET_USER_DATA', data)
    },
    logout(context) {
      context.commit('LOGOUT')
    },
  },
}