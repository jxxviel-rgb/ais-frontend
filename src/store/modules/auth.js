import authServices from '@/services/authServices'
import store from '@/store'
import router from '../../router'

export const auth = {
  namespaced: true,
  state: authServices.getAuhtData() ?? {
    user: {}
  },
  mutations: {
    SET_AUTH(state, user) {

      state.user = user.user
    },
    RESET_AUTH(state) {
      state.user = {}
    }
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
        router.push({ name: 'Dashboard' })
      } catch (err) {
        console.log(err)
        const payload = {
          title: 'Failed !',
        }
        store.dispatch('notif/error', { payload })
      }
    },

    logout({commit}) {
       authServices.removeAuthData()
      commit('RESET_AUTH')
      router.push({name: 'SignIn'})
    }
  },
}
