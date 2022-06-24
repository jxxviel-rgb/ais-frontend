import dataServices from '@/services/dataServices'
import store from '@/store'

export const data = {
  namespaced: true,
  state: {
    isloading: false,
    data: null,
    errorMessage: {}
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
    SET_ERROR_MESSAGE(state, data) {
      state.errorMessage = data
    },
    RESET_ERROR_MESSAGE(state) {
      state.errorMessage = {}
    },
    SET_LOADING(state, data) {
      state.isloading = data
    },
  },
  actions: {
    async index({ commit }, { path }) {
      commit('SET_DATA', [])
      commit('SET_LOADING', true)
      try {
        const response = await dataServices.dataIndex(path)
        if (response.data.result) {
          commit('SET_DATA', response.data.result)
        }
        commit('SET_LOADING', false)
      } catch (err) {
        const payload = {
          title: 'Geting data failed',
        }
        store.dispatch('notif/error', { payload })
        commit('SET_LOADING', false)

      }
    },
    async create({ commit }, { path, data }) {
      commit('SET_LOADING', true)
      commit('RESET_ERROR_MESSAGE')
      try {
        await dataServices.dataCreate(path, data)
        const payload = {
          title: 'Success create data',
        }
        store.dispatch('notif/success', { payload })
        commit('SET_LOADING', false)
        return true;
      } catch (err) {
        let data = err.response.data.data ?? {}
        commit('SET_ERROR_MESSAGE', data)
        const payload = {
          title: 'failed create data',
        }
        store.dispatch('notif/error', { payload })
        commit('SET_LOADING', false)
        return false
      }
    },
    async delete({ commit }, { path, id }) {
      commit('SET_LOADING', true)
      try {
        await dataServices.dataDelete(path, id)
        const payload = {
          title: 'Success delete data',
        }
        store.dispatch('notif/success', { payload })
      } catch (err) {
        console.log(err)
        const payload = {
          title: 'failed create data',
        }
        store.dispatch('notif/error', { payload })
      }
      commit('SET_LOADING', false)
    },
    async update({ commit }, { path, id, data }) {
      commit('SET_LOADING', true)
      commit('RESET_ERROR_MESSAGE')
      try {
        await dataServices.dataUpdate(path, id, data)
        const payload = {
          title: 'Success Update data',
        }
        store.dispatch('notif/success', { payload })
      } catch (err) {
        console.log(err)
        const payload = {
          title: 'failed failed data',
        }
        store.dispatch('notif/error', { payload })
      }
      commit('SET_LOADING', false)
    },
  },
}
