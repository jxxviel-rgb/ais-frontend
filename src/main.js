import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import DataIndex from '@/components/DataIndex'
import emitter from 'mitt'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const app = createApp(App)
app.config.globalProperties.emitter = emitter()
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueSweetalert2)
app.use()
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('data-index', DataIndex)
app.component('v-select', vSelect)

app.mount('#app')
