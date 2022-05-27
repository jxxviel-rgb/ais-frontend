export const notif = {
  namespaced: true,
  state: {
    active: false,
    icon: 'info',
    title: '',
    message: '',
  },
  mutations: {
    SET_SUCCESS(state, payload) {
      state.active = true
      state.icon = 'success'
      state.title = payload.title ?? 'Success'
      state.message = payload.message
    },
    SET_INFO(state, payload) {
      state.active = true
      state.icon = 'info'
      state.title = payload.title ?? 'Information'
      state.message = payload.message
    },
    SET_WARNING(state, payload) {
      state.active = true
      state.icon = 'warning'
      state.title = payload.title ?? 'Warning'
      state.message = payload.message
    },
    SET_QUESTION(state, payload) {
      state.active = true
      state.icon = 'question'
      state.title = payload.title ?? 'Are you sure?'
      state.message = payload.message
    },
    SET_ERROR(state, payload) {
      state.active = true
      state.icon = 'error'
      state.title = payload.title ?? 'Failed!'
      state.message = payload.message
    },
  },
  actions: {
    success({ commit }, { payload }) {
      return commit('SET_SUCCESS', payload)
    },
    info({ commit }, { payload }) {
      return commit('SET_INFO', payload)
    },
    warning({ commit }, { payload }) {
      return commit('SET_WARNING', payload)
    },
    question({ commit }, { payload }) {
      return commit('SET_QUESTION', payload)
    },
    error({ commit }, { payload }) {
      return commit('SET_ERROR', payload)
    },
  },
}
