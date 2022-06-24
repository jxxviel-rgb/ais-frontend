<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="
        page-header
        align-items-start
        min-vh-50
        pt-5
        pb-11
        m-3
        border-radius-lg
      "
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Sign In</h5>
            </div>
            <div class="row px-xl-5 px-sm-4 px-3"></div>
            <div class="card-body">
              <form role="form">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </form>
              <div class="text-center">
                <argon-button
                  fullWidth
                  color="dark"
                  variant="gradient"
                  class="my-4 mb-2"
                  @click="login()"
                  >Sign In</argon-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
    ArgonButton,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  watch: {
    '$store.state.notif.active': async function () {
      if (this.$store.state.notif.active) {
        await this.$swal({
          icon: this.$store.state.notif.icon,
          title: this.$store.state.notif.title,
          onClose: this.closeNotifhandler,
        })
        this.closeHandler()
      }
    },
  },
  mounted() {
    // this.$swal("test");
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
    },
    closeHandler() {
      this.$store.state.notif.active = false;
    },
  },
};
</script>
