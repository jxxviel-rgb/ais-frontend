<template>
  <div class="py-4 container-fluid min-vh-75">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12" v-if="user.role == 'admin'">
            <card
              title="Total Company"
              :value="totalCompany"
              iconClass="fa-solid fa-building"
              iconBackground="bg-primary"
              directionReverse
              
            />
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              title="Total  Vessel"
              :value="totalVessel"
              iconClass="fa-solid fa-ferry"
              iconBackground="bg-warning"
              detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              title="Total Crew"
              :value="totalCrew"
              iconClass="fa-solid fa-people-line"
              iconBackground="bg-success"
              detail="stats.clients.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h5 class="text-white">Number of Catches (Ton)</h5>
          </div>
          <div
            v-for="(data, index) in hasilTangkapan"
            :key="index"
            class="col-lg-3 col-md-6 col-12"
          >
            <card
              :title="data.name"
              :value="data.total_tangkapan ?? 0"
              iconClass="fa-solid fa-fish-fins"
              iconBackground="bg-info"
              directionReverse
            ></card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import dataServices from "./../services/dataServices";
// import US from "@/assets/img/icons/flags/US.png";
// import DE from "@/assets/img/icons/flags/DE.png";
// import GB from "@/assets/img/icons/flags/GB.png";
// import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-default",
  data() {
    return {
      dashboard: "",
      totalCompany: 0,
      totalCrew: 0,
      totalVessel:0,
      hasilTangkapan:[],
    };
  },
  components: {
    Card,
    // GradientLineChart,
    // Carousel,
    // CategoriesCard,
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },  
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const result = await dataServices.dataIndex("/dashboard");
        const data = result.data.result

        this.totalCompany = data.total_company
        this.totalCrew = data.total_crew
        this.totalVessel = data.total_vessel
        this.hasilTangkapan = data.hasil_tangkapan
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
