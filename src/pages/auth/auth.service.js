import { singleSignOn } from '@/axios'
export const uploadImageURL = 'clients/image/'

export default {
  signIn(data) {
    return singleSignOn().post('clients/signin', data)
  },
  signUp(data) {
    return singleSignOn().post('clients/signup', data)
  },

  logout(data) {
    return singleSignOn().post('clients/logout', data)
  },

  whoami(data) {
    return singleSignOn().post('clients/whoami', data)
  },
  update(data) {
    return singleSignOn().post('clients/update-profile', data)
  },

  activeNewClient(data) {
    return singleSignOn().post('clients/active-new-client-useing-otp', data)
  },
}
