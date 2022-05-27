import { createStore } from 'vuex'

import { auth } from '@/store/modules/auth'
import { notif } from '@/store/modules/notif'
import { data } from '@/store/modules/data'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    auth,
    notif,
    data,
  },
})
