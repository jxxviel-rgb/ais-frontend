import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import DataIndex from './components/DataIndex'
import BaseModal from './components/BaseModal'
import emitter from 'mitt'

import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'


const appInstance = createApp(App);
appInstance.config.globalProperties.emitter = emitter()
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueSweetalert2);
appInstance.component('data-index', DataIndex)
appInstance.component('base-modal', BaseModal)
appInstance.mount("#app");
