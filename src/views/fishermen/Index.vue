<template>
  <div>
    <data-index
      title="Fishermen Data"
      :columns="columns"
      :actions="actions"
      @data-update="handleUpdate"
    >
      <template v-slot:top>
        <div class="mb-3 row justify-content-between">
          <c-col :sm="12" :md="6">
            <c-button color="primary" @click="handleCreate()">
              Add Fisherman
            </c-button>
          </c-col>
        </div>
      </template>
      <template #gender="props">
        {{ props.gender == 'l' ? 'Male' : 'Female' }}
      </template>
    </data-index>
    <c-modal
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
          <input type="text" class="form-control" v-model="data.name" />
        </div>
        <div class="form-group">
          <label class="me-3 my-2">Gender : </label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineCheckbox1"
              value="l"
              v-model="data.gender"
            />
            <label class="form-check-label" for="inlineCheckbox1">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineCheckbox2"
              value="p"
              v-model="data.gender"
            />
            <label class="form-check-label" for="inlineCheckbox2">
              Female</label
            >
          </div>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="text" class="form-control" v-model="data.phone" />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input type="text" class="form-control" v-model="data.address" />
        </div>
      </c-modal-body>
      <c-modal-footer>
        <c-button color="primary" @click="isEdit ? dataEdited() : dataCreated()"
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
  {
    name: 'Gender',
    dataIndex: 'gender',
  },
  {
    name: 'Phone',
    dataIndex: 'phone',
  },
  {
    name: 'Address',
    dataIndex: 'address',
  },
]

const actions = [
  {
    title: 'Update',
    class: 'btn-warning',
    emit: 'data-update',
  },
]

export default {
  data() {
    return {
      apiPath: '/fisherman',
      columns,
      actions,
      toggleForm: false,
      isEdit: false,
      data: {},
    }
  },
  mounted() {
    this.data = this.resetData()
    this.emitter.emit('fetch', this.apiPath)
  },
  methods: {
    resetData() {
      return {
        id: '',
        name: '',
        phone: '',
        address: '',
        gender: '',
      }
    },
    handleCreate() {
      this.data = this.resetData()
      this.isEdit = false
      this.toggleForm = true
    },
    async dataCreated() {
      const data = this.data
      delete data.id
      await this.$store.dispatch('data/create', { path: this.apiPath, data })
      this.$store.dispatch('data/index', { path: this.apiPath })
    },
    handleUpdate(data) {
      this.data = data
      this.isEdit = true
      this.toggleForm = true
    },
    async dataEdited() {
      const data = this.data
      const id = this.data.id
      delete data.id
      await this.$store.dispatch('data/update', {
        path: this.apiPath,
        id,
        data,
      })
      this.$store.dispatch('data/index', { path: this.apiPath })
    },
  },
}
</script>
