<template>
  <div
    v-show="this.$store.state.layout !== 'landing'"
    class="card card-plain shadow-none"
    id="sidenavCard"
  >
    <a
      v-if="this.$store.state.isRTL"
      href="https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/"
      target="_blank"
      class="mb-3 btn btn-dark btn-sm w-100"
      >توثيق</a
    >
    <a
      v-else
      href="https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/"
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
