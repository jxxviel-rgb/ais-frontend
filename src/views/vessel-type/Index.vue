<template>
  <div>
    <data-index
      title="Vessel type"
      :columns="columns"
      :actions="actions"
      @delete-data="handleDelete"
      @edit-data="handleEdit"
    >
      <template v-slot:top>
        <div class="mb-3 row justify-content-between">
          <c-col :sm="12" :md="6">
            <c-button color="primary" @click="handleCreate()">
              Add vessel type
            </c-button>
          </c-col>
        </div>
      </template>
    </data-index>
    <c-modal
      size="sm"
      alignment="center"
      :visible="toggleForm"
      @close="
        () => {
          toggleForm = !toggleForm
        }
      "
    >
      <c-modal-header>
        <c-modal-title>
          {{ isEdit ? 'Edit' : 'Create new' }} vessel type
        </c-modal-title>
      </c-modal-header>
      <c-modal-body>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
      </c-modal-body>
      <c-modal-footer>
        <c-button color="primary" @click="isEdit ? dataEdited() : saveData()"
          >Save</c-button
        >
      </c-modal-footer>
    </c-modal>
  </div>
</template>

<script>
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
  },
]

const actions = [
  {
    title: 'update',
    emit: 'edit-data',
    class: 'btn-warning mr-2',
  },
  {
    title: 'Delete',
    emit: 'delete-data',
    class: 'btn-outline-danger',
  },
]

export default {
  data() {
    return {
      apiPath: 'vessel-type',
      columns,
      actions,
      toggleForm: false,
      isEdit: false,
      name: '',
      id: '',
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
  },
  methods: {
    handleCreate() {
      this.isEdit = false
      this.toggleForm = true
    },
    async saveData() {
      const data = {
        name: this.name,
      }
      await this.$store.dispatch('data/create', { path: this.apiPath, data })
      this.toggleForm = false
      this.$store.dispatch('data/index', { path: this.apiPath })
    },
    handleDelete(data) {
      this.id = data.id
      this.$swal({
        icon: 'question',
        title: 'Are you sure?',
        html: `Want to delete <strong> ${data.name} </strong>`,
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataDeleted()
        }
      })
    },
    async dataDeleted() {
      await this.$store.dispatch('data/delete', {
        path: this.apiPath,
        id: this.id,
      })
      this.$store.dispatch('data/index', { path: this.apiPath })
    },
    handleEdit(data) {
      this.id = data.id
      this.name = data.name
      this.isEdit = true
      this.toggleForm = true
    },
    async dataEdited() {
      const data = {
        name: this.name,
      }
      await this.$store.dispatch('data/update', {
        path: this.apiPath,
        id: this.id,
        data,
      })

      this.toggleForm = false
      this.$store.dispatch('data/index', { path: this.apiPath })
    },
  },
}
</script>
