import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Tables from '../views/Tables.vue'
import Billing from '../views/Billing.vue'
import VirtualReality from '../views/VirtualReality.vue'
import RTL from '../views/Rtl.vue'
import Profile from '../views/Profile.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/dashboard-default',
  },
  {
    path: '/dashboard-default',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('@/views/page/Company.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/page/Signin.vue'),
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
  },
  {
    path: '/virtual-reality',
    name: 'Virtual Reality',
    component: VirtualReality,
  },
  {
    path: '/rtl-page',
    name: 'RTL',
    component: RTL,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/harbor',
    name: 'Harbor',
    component: () => import('@/views/page/Harbor.vue'),
  },
  {
    path: '/crew',
    name: 'Crew',
    component: () => import('@/views/page/Crew.vue'),
  },
  {
    path: '/crew-departure',
    name: 'Crew Departure',
    component: () => import('@/views/page/CrewDeparture.vue'),
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/views/page/Activity.vue'),
  },
  {
    path: '/vessel',
    name: 'Vessel',
    component: () => import('@/views/page/Vessel.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

export default router
