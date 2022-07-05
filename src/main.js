import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import ArgonDashboard from './argon-dashboard'
import DataIndex from './components/DataIndex'
import BaseModal from './components/BaseModal'
import emitter from 'mitt'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'


import DatePicker  from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import moment from 'moment'

const appInstance = createApp(App)
appInstance.config.globalProperties.$moment = moment
appInstance.config.globalProperties.emitter = emitter()
appInstance.use(store)
appInstance.use(router)
appInstance.use(ArgonDashboard)
appInstance.use(VueSweetalert2)
appInstance.component('data-index', DataIndex)
appInstance.component('base-modal', BaseModal)
appInstance.component('vue-select', VueSelect)
appInstance.component('date-picker', DatePicker)
appInstance.mount('#app')
