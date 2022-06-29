<template>
  <main>
    <div class="container min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Harbor Data</h6>
            </div>
            <div class="card-body">
              <button class="btn btn-primary" @click="handleCreate()">
                Add new crew
              </button>
              <data-index
                :columns="columns"
                :actions="actions"
                @data-delete="handleDelete"
                @data-edit="handleUpdate"
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
        <label for="">Harbor Name</label>
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
      apiPath: "/pelabuhan",
      modalTitle: "",
      columns,
      actions,
      isEdit: false,
      id: "",
      name: "",
    };
  },
  computed: {
    errorState() {
      return this.$store.state.data.errorMessage;
    },
  },
  mounted() {
    this.emitter.emit("fetch", this.apiPath);
  },
  methods: {
    async handleCreate() {
      this.isEdit = false;
      this.modalTitle = "Add new harbor";
      this.$store.dispatch("data/validationReset");
      this.emitter.emit("show-modal");
    },
    async dataCreated() {
      let data = {
        name: this.name,
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
        this.emitter.emit("show-modal");
      } catch (err) {
        console.log(err);
      }
    },
    async dataUpdated() {
      let data = {
        name: this.name,
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
