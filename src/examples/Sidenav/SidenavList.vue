<template>
  <div
    class="w-auto h-auto collapse navbar-collapse h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="user.role == 'admin'">
        <sidenav-item
          url="/company"
          :class="getRoute() === 'company' ? 'active' : ''"
          navText="Company"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="user.role == 'owner'">
        <sidenav-item
          url="/company/self"
          :class="getRoute() === 'company' ? 'active' : ''"
          navText="Company"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          url="/crew"
          :class="getRoute() === 'crew' ? 'active' : ''"
          navText="Crew"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <li class="nav-item">
        <sidenav-item
          url="/activity"
          :class="getRoute() === 'Activity' ? 'active' : ''"
          navText="Activity"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/fisherman-product"
          :class="getRoute() === 'fisherman-product' ? 'active' : ''"
          navText="Fisherman Product"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-if="user.role == 'admin'">
        <sidenav-item
          url="/harbor"
          :class="getRoute() === 'harbor' ? 'active' : ''"
          navText="Harbor"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/vessel"
          :class="getRoute() === 'vessel' ? 'active' : ''"
          navText="Vessel"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" v-show="user.role == 'admin'">
        <sidenav-item
          url="/catch-type"
          :class="getRoute() === 'catch-type' ? 'active' : ''"
          navText="Catch Type"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/live-map"
          :class="getRoute() === 'map' ? 'active' : ''"
          navText="Live Map"
        >
          <template v-slot:icon>
            <i class="text-sm ni ni-tv-2 text-primary opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <!-- <sidenav-card></sidenav-card> -->
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
    />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },

  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      // user: {},
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
  },
  // watch: {
  //   '$store.state.auth.user':function() {
  //     this.user = this.$store.state.auth.user;
  //   }
  // },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
