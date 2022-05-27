import dataServices from '@/services/dataServices'
import store from '@/store'

export const data = {
  namespaced: true,
  state: {
    isloading: false,
    data: null,
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
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
      try {
        await dataServices.dataCreate(path, data)
        const payload = {
          title: 'Success create data',
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
    async delete({ commit }, { path, id }) {
      commit('SET_LOADING', true)
      try {
        await dataServices.dataDelete(path, id)
        const payload = {
          title: 'Success create data',
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
