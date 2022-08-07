<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Fisherman product data</h6>
            </div>
            <div class="card-body">
              <button class="btn btn-primary" @click="handleCreate()">
                Add new fisherman product
              </button>
              <data-index
                :columns="columns"
                :actions="action"
                @data-edit="handleEdit"
                @data-crew="handleCrewDeparture"
              >
                <template #sail_date="prop">
                  {{
                    this.$moment(prop.sail_date, "yyyy-mm-DD").format(
                      "DD MMM yyyy"
                    )
                  }}
                </template>
                <template #is_sail="prop">
                  <div v-if="prop.is_sail">
                    <div class="badge badge-sm bg-warning">Sail</div>
                  </div>
                  <div v-else>
                    <div class="badge badge-sm bg-info">Berth</div>
                  </div>
                </template>
              </data-index>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <base-modal
    :title="titleModal"
    :modalId="activityModal"
    @on-confirm="isEdit ? acitityEdited() : activityCreated()"
  >
    <template #body>
      <div class="form-group">
        <label for="">Place of berth</label>
        <vue-select
          :options="harbors"
          label="name"
          class="form-controll"
          v-model="harborSelected"
          :value="harborSelected"
          :class="{ 'is-invalid': errorState['companyId'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["companyId"] ? errorState["companyId"][0] : "" }}
        </div>
      </div>
      <div class="form-group" v-show="!isEdit">
        <label for="">Vessel Name</label>
        <vue-select
          :options="vessels"
          :get-option-label='option => option.vessel.name'
          v-model="vesselSelected"
          :value="vesselSelected"
          class="form-controll"
          :class="{ 'is-invalid': errorState['vesselId'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["vesselId"] ? errorState["vesselId"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Catch type</label>
        <vue-select
          :options="catchTypes"
          label="name"
          v-model="catchTypeSelected"
          :value="catchTypeSelected"
          class="form-controll"
          :class="{ 'is-invalid': errorState['vesselId'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["vesselId"] ? errorState["vesselId"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Amount(Ton)</label>
        <input
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errorState['amount'] }"
          v-model="amount"
        />
        <div class="invalid-feedback">
          {{
            errorState["berth_date"] ? errorState["berth_date"][0] : ""
          }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Berth Date</label>
        <input
          type="date"
          class="form-control"
          :class="{ 'is-invalid': errorState['berth_date'] }"
          v-model="berthDate"
        />
        <div class="invalid-feedback">
          {{
            errorState["berth_date"] ? errorState["berth_date"][0] : ""
          }}
        </div>
      </div>
    </template>
  </base-modal>
</template>
<script>
import services from "../../services/dataServices";

const columns = [
  {
    name: "Vessel",
    dataIndex: "vessel.name",
  },
  {
    name: "Company",
    dataIndex: "company.name",
  },
  {
    name: "Berth Date",
    dataIndex: "berth_date",
  },
  {
    name: "Amount",
    dataIndex: "amount",
  },
];

const action = [
  {
    title: "Edit",
    emit: "data-edit",
    class: "btn-warning",
  },
];
export default {
  data() {
    return {
      titleModal: "",
      activityModal: "activity-modal",
      crewModal: "crew-modal",
      apiPath: "/activity?berth=false",
      columns,
      action,
      isEdit: false,
      id: "",
      harbors: [], 
      harborSelected: null,
      vessels: [],
      catchTypes: [],
      catchTypeSelected: null,
      vesselSelected: null,
      berthDate: null,
      amount: null,
    };
  },
  computed: {
    errorState() {
      return this.$store.state.data.errorMessage;
    },
    statusLable() {
      return this.status ? "Return" : "Depart";
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.emitter.emit("fetch", this.apiPath);

      try {
        const harbors = await services.dataIndex("/pelabuhan");
        this.harbors = harbors.data.result;
        const result = await services.dataIndex('/activity?berth=true');
        this.vessels = result.data.result

        const type = await services.dataIndex('/type')
        this.catchTypes = type.data.result
        this.companies = result.data.result;
      } catch (err) {
        console.log(err);
      }
    },
    handleCreate() {
      this.isEdit = false;
      this.titleModal = "Add New Fisherman Product";
      this.$store.dispatch("data/validationReset");
      this.emitter.emit(`show-${this.activityModal}`);
    },
    async activityCreated() {
      let data = {
        pelabuhan_berth_id: this.harborSelected.id ?? null,
        berth_date: this.berthDate,
        jenis_tangkapan_id: this.catchTypeSelected.id,
        amount: this.amount,
      };

      try {
        const result = await this.$store.dispatch("data/create", {
          path: `/activity/${this.vesselSelected.id}/berth`,
          data,
        });
        if (result) {
          this.emitter.emit(`hide-${this.activityModal}`);
          this.emitter.emit("fetch", this.apiPath);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleEdit(data) {
        console.log(data.bert_harbor);
      this.titleModal = "Edit  Activity";
      this.isEdit = true;
      this.id = data.id;
      this.$store.dispatch("data/validationReset");
        this.berthDate = data.berth_date;
        this.vesselSelected = data;
        this.harborSelected = data.berth_harbor
        this.emitter.emit(`show-${this.activityModal}`);
        this.amount = data.amount;
    },
    async acitityEdited() {
      let data = {
        berth_date: this.berthDateate,
        status: this.status ? "return" : "depart",
        amount: this.amount,
      };

      try {
        const result = await this.$store.dispatch("data/update", {
          path: this.apiPath,
          id: this.id,
          data,
        });
        if (result) {
          this.emitter.emit(`hide-${this.activityModal}`);
          this.emitter.emit("fetch", this.apiPath);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
