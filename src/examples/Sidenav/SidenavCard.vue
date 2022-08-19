<template>
  <div
    class="shadow-none card card-plain"
    id="sidenavCard"
  >
    <a
      href="#"
      target="_blank"
      @click.prevent="logout()"
      class="mb-3 btn btn-dark btn-sm w-100"
      >Logout</a
    >
  </div>
</template>
<script>
import img from '../../assets/img/illustrations/icon-documentation.svg'

export default {
  name: 'sidenav-card',
  props: ['textPrimary', 'textSecondary', 'iconClass'],
  data() {
    return {
      img,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
