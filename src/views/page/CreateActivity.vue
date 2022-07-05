<template>
  <div class="container-fluid min-vh-75">
    <div class="row col-6">
      <div class="card">
        <div class="card-header">
          <h6>Activity data</h6>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label for="">Company Name</label>
            <vue-select
              :options="companies"
              label="name"
              v-model="companySelected"
              :value="companySelected"
              class="form-controll"
              :class="{ 'is-invalid': errorState['company_id'] }"
            />
            <div class="invalid-feedback">
              {{ errorState["company_id"] ? errorState["company_id"][0] : "" }}
            </div>
          </div>
          <div class="form-group">
            <label for="">Vessel</label>
            <vue-select
              :options="companies"
              label="name"
              v-model="companySelected"
              :value="companySelected"
              class="form-controll"
              :class="{ 'is-invalid': errorState['company_id'] }"
            />
            <div class="invalid-feedback">
              {{ errorState["company_id"] ? errorState["company_id"][0] : "" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      companySelected: {},
    };
  },
  computed: {
    errorState() {
      return this.$store.state.data.errorMessage;
    },
  },
  mounted() {
    // this.initData()
  },
  methods: {
    
  },
};
</script>