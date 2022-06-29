<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Vessel data</h6>
            </div>
            <div class="card-body">
              <button class="btn btn-primary" @click="handleCreate()">
                Add new vessel
              </button>
              <data-index
                :columns="columns"
                :actions="actions"
                @data-edit="handleUpdate"
                @data-delete="handleDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <base-modal
    :title="modalTitle"
    @on-confirm="isEdit ? dataUpdated() : dataCreated()"
  >
    <template #body>
      <div class="form-group">
        <label for="">Harbor</label>
        <vue-select
          :options="harbors"
          label="name"
          v-model="harborSelected"
          :value="harborSelected"
          class="form-controll"
          :class="{ 'is-invalid': errorState['pelabuhan_id'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["pelabuhan"] ? errorState["pelabuhan_id"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Company</label>
        <vue-select
          :options="companies"
          label="name"
          v-model="companySelected"
          :value="companySelected"
          class="form-controll"
          :class="{ 'is-invalid': errorState['company_id'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["pelabuhan"] ? errorState["company_id"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Vessel Name</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          :class="{ 'is-invalid': errorState['name'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["name"] ? errorState["name"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">IMO</label>
        <input
          type="text"
          class="form-control"
          v-model="imo"
          :class="{ 'is-invalid': errorState['imo'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["imo"] ? errorState["imo"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Call Sign</label>
        <input
          type="text"
          class="form-control"
          v-model="callSign"
          :class="{ 'is-invalid': errorState['call_sign'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["call_sign"] ? errorState["call_sign"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Length</label>
        <input
          type="text"
          class="form-control"
          v-model="length"
          :class="{ 'is-invalid': errorState['length'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["length"] ? errorState["length"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Width</label>
        <input
          type="text"
          class="form-control"
          v-model="width"
          :class="{ 'is-invalid': errorState['width'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["width"] ? errorState["width"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">GT</label>
        <input
          type="text"
          class="form-control"
          v-model="gt"
          :class="{ 'is-invalid': errorState['gt'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["gt"] ? errorState["gt"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Netto</label>
        <input
          type="text"
          class="form-control"
          v-model="netto"
          :class="{ 'is-invalid': errorState['netto'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["netto"] ? errorState["netto"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Year</label>
        <input
          type="text"
          class="form-control"
          v-model="year"
          :class="{ 'is-invalid': errorState['year'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["year"] ? errorState["year"][0] : "" }}
        </div>
      </div>
    </template>
  </base-modal>
</template>
<script>
import services from "../../services/dataServices";
const columns = [
  {
    name: "Pelabuhan",
    dataIndex: "pelabuhan.name",
  },
  {
    name: "Company",
    dataIndex: "company.name",
  },
  {
    name: "Name",
    dataIndex: "name",
  },
  {
    name: "Imo",
    dataIndex: "imo",
  },
  {
    name: "Call Sign",
    dataIndex: "call_sign",
  },
  {
    name: "Width",
    dataIndex: "width",
  },
  {
    name: "GT",
    dataIndex: "gt",
  },
  {
    name: "Netto",
    dataIndex: "netto",
  },
  {
    name: "Years",
    dataIndex: "years",
  },
];
const actions = [
  {
    title: "Edit",
    emit: "data-edit",
    class: "btn-warning",
  },
  {
    title: "Delete",
    emit: "data-delete",
    class: "btn-outline-danger",
  },
];
export default {
  data() {
    return {
      apiPath: "/vessel",
      modalTitle: "",
      columns,
      actions,
      isEdit: false,
      id: "",
      harbors: [],
      companies: [],
      harborSelected: null,
      companySelected: null,
      name: "",
      imo: "",
      callSign: "",
      width: "",
      length: "",
      gt: "",
      netto: "",
      year: "",
    };
  },
  computed: {
    errorState() {
      return this.$store.state.data.errorMessage;
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.emitter.emit("fetch", this.apiPath);

      try {
        const result = await services.dataIndex("/company");
        this.companies = result.data.result;

        const harbors = await services.dataIndex("/pelabuhan");
        this.harbors = harbors.data.result;
      } catch (err) {
        console.log(err);
      }
    },
    handleCreate() {
      this.isEdit = false;
      this.modalTitle = "Add new harbor";
      this.$store.dispatch("data/validationReset");
      this.emitter.emit("show-modal");
    },
    async dataCreated() {
      let data = {
        pelabuhan_id: this.harborSelected.id,
        company_id: this.companySelected.id,
        name: this.name,
        imo: this.imo,
        call_sign: this.callSign,
        width: this.width,
        length: this.length,
        gt: this.gt,
        netto: this.netto,
        years: this.year,
      };

      try {
        const result = await this.$store.dispatch("data/create", {
          path: this.apiPath,
          data,
        });
        if (result) {
          this.emitter.emit("hide-modal");
          this.emitter.emit("fetch", this.apiPath);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleUpdate(data) {
      this.isEdit = true;
      this.id = data.id;
      this.$store.dispatch("data/validationReset");
      try {
        const response = await services.dataIndex(`${this.apiPath}/${data.id}`);
        const result = response.data.result;
        this.modalTitle = `Update ${data.name}`;
        this.harborSelected = result.pelabuhan;
        this.companySelected = result.company;
        this.name = result.name;
        this.imo = result.imo;
        this.callSign = result.call_sign;
        this.length = result.length;
        this.width = result.width;
        this.gt = result.gt;
        this.netto = result.netto;
        this.year = result.years;
        this.emitter.emit("show-modal");
      } catch (err) {
        console.log(err);
      }
    },
    async dataUpdated() {
      let data = {
        pelabuhan_id: this.harborSelected.id,
        company_id: this.companySelected.id,
        name: this.name,
        imo: this.imo,
        call_sign: this.callSign,
        width: this.width,
        length: this.length,
        gt: this.gt,
        netto: this.netto,
        years: this.year,
      };

      const result = await this.$store.dispatch("data/update", {
        path: this.apiPath,
        id: this.id,
        data,
      });

      if (result) {
        this.emitter.emit("hide-modal");
        this.emitter.emit("fetch", this.apiPath);
      }
    },
    handleDelete(data) {
      this.id = data.id;
      this.$swal({
        icon: "question",
        title: "Are you sure?",
        html: `Want to delete <strong> ${data.name} </strong>`,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataDeleted();
        }
      });
    },
    async dataDeleted() {
      await this.$store.dispatch("data/delete", {
        path: this.apiPath,
        id: this.id,
      });
      this.$store.dispatch("data/index", { path: this.apiPath });
    },
  },
};
</script>
