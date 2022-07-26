<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Crew Data</h6>
            </div>
            <div class="card-body">
              <button class="btn btn-primary" @click="handleCreate()">
                Add new crew
              </button>
              <data-index
                :columns="columns"
                :actions="actions"
                @data-edit="handleUpdate"
                @data-delete="handleDelete"
              >
                <template #gender="prop">
                  {{ prop.gender == "m" ? "Male" : "Female" }}
                </template>
              </data-index>
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
        <label for="">Full Name</label>
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
        <label for="">Gender {{gender}}</label>
      <div class="form-group">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            value="m"
            v-model="gender"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Male
          </label>
        </div>
        <div class="form-check form-check-inline  ">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="f"
            v-model="gender"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Female
          </label>
        </div>
        <div class="invalid-feedback">
          {{ errorState["gender"] ? errorState["gender"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Address</label>
        <input
          type="text"
          class="form-control"
          v-model="address"
          :class="{ 'is-invalid': errorState['address'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["address"] ? errorState["address"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Phone</label>
        <input
          type="text"
          class="form-control"
          v-model="phone"
          :class="{ 'is-invalid': errorState['phone'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["phone"] ? errorState["phone"][0] : "" }}
        </div>
      </div>
    </template>
  </base-modal>
</template>
<script>
import services from "../../services/dataServices";

const columns = [
  {
    name: "Name",
    dataIndex: "name",
  },
  {
    name: "Gender",
    dataIndex: "gender",
  },
  {
    name: "Address",
    dataIndex: "address",
  },
  {
    name: "Phone",
    dataIndex: "phone",
  },
  {
    name: "Company",
    dataIndex: "company.name",
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
      apiPath: "/crew",
      columns,
      actions,
      isEdit: false,
      modalTitle: "",
      companies: [],
      companySelected: null,
      id: "",
      companyId: "",
      name: "",
      phone: "",
      gender: "",
      address: "",
    };
  },
  computed: {
    errorState() {
      return this.$store.state.data.errorMessage;
    },
  },
  mounted() {
    this.emitter.emit("fetch", this.apiPath);
    this.initData();
  },
  methods: {
    async initData() {
      this.emitter.emit("fetch", this.apiPath);

      try {
        const result = await services.dataIndex("/company");
        this.companies = result.data.result;
      } catch (err) {
        console.log(err);
      }
    },
    async handleCreate() {
      this.isEdit = false;
      this.modalTitle = "Add new crew";
      this.$store.dispatch("data/validationReset");
      this.emitter.emit("show-modal");
    },
    async dataCreated() {
      let data = {
        name: this.name,
        company_id: this.companySelected.id,
        phone: this.phone,
        gender: this.gender,
        address: this.address,
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
        this.name = result.name;
        this.gender = result.gender;
        (this.address = result.address), (this.phone = result.phone);
        this.companySelected = this.companies.find(
          (f) => f.id == result.company_id
        );
        this.emitter.emit("show-modal");
      } catch (err) {
        console.log(err);
      }
    },
    async dataUpdated() {
      let data = {
        name: this.name,
        company_id: this.companySelected.id,
        phone: this.phone,
        gender: this.gender,
        address: this.address,
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
