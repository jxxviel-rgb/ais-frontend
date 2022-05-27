import authServices from '@/services/authServices'
import store from '@/store'

export const auth = {
  namespaced: true,
  state: authServices.getAuhtData(),
  mutations: {
    SET_AUTH(state, user) {
      state = user
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ commit }, { email, password }) {
      try {
        const response = await authServices.login(email, password)
        delete response.data.status
        authServices.loggingIn(response.data)
        commit('SET_AUTH', response.data)
        const payload = {
          title: 'Success',
        }
        store.dispatch('notif/success', { payload })
      } catch (err) {
        console.log(err)
        const payload = {
          title: 'Failed !',
        }
        store.dispatch('notif/error', { payload })
      }
    },
  },
}
