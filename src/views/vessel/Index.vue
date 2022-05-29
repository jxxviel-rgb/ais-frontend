<template>
  <div>
    <data-index
      title="Vessel Data"
      :columns="columns"
      :actions="actions"
      @data-edit="handleEdit"
      @data-delete="handleDelete"
    >
      <template #top>
        <button class="btn btn-primary mb-3" @click="() => handleCreate()">
          Create New Vessel
        </button>
      </template>
    </data-index>
    <c-modal
      alignment="center"
      :visible="toggleForm"
      @close="() => (toggleForm = !toggleForm)"
    >
      <c-modal-header>
        <c-modal-title>
          {{ isEdit ? 'Edit' : 'Create New' }} Vessel
        </c-modal-title>
      </c-modal-header>
      <c-modal-body>
        <div class="form-group">
          <label for="">Owner</label>
          <v-select
            label="name"
            :options="owner"
            v-model="ownerSelected"
            :value="ownerSelected"
          />
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label for="">Vessel Type</label>
          <v-select
            label="name"
            :options="type"
            v-model="typeSelected"
            :value="typeSelected"
          />
        </div>
        <div class="form-group">
          <label>IMO</label>
          <input type="text" class="form-control" v-model="imo" />
        </div>
        <div class="form-group">
          <label>Call Signin</label>
          <input type="text" class="form-control" v-model="callSignin" />
        </div>
        <div class="form-group">
          <label>Length</label>
          <input type="text" class="form-control" v-model="length" />
        </div>
        <div class="form-group">
          <label>Width</label>
          <input type="text" class="form-control" v-model="width" />
        </div>
        <div class="form-group">
          <label>Depth</label>
          <input type="text" class="form-control" v-model="depth" />
        </div>
        <div class="form-group">
          <label>GT (Gross tonase)</label>
          <input type="text" class="form-control" v-model="gt" />
        </div>
        <div class="form-group">
          <label>Netto</label>
          <input type="text" class="form-control" v-model="netto" />
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" class="form-control" v-model="year" />
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
import dataServices from '@/services/dataServices'

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
  },
  {
    name: 'Type',
    dataIndex: 'vessel_type.name',
  },
  {
    name: 'Owner',
    dataIndex: 'fisherman.name',
  },
  {
    name: 'IMO',
    dataIndex: 'imo',
  },
  {
    name: 'Call Signin',
    dataIndex: 'call_signin',
  },
  {
    name: 'Length (m)',
    dataIndex: 'length',
  },
  {
    name: 'Width (m)',
    dataIndex: 'width',
  },
  {
    name: 'Depth (m)',
    dataIndex: 'depth',
  },
  {
    name: 'GT (ton)',
    dataIndex: 'gt',
  },
  {
    name: 'Netto (ton)',
    dataIndex: 'netto',
  },
  {
    name: 'Year',
    dataIndex: 'year',
  },
]

const actions = [
  {
    title: 'Edit',
    emit: 'data-edit',
    class: 'btn-primary',
  },
  {
    title: 'Delete',
    emit: 'data-delete',
    class: 'btn-outline-danger',
  },
]
export default {
  data() {
    return {
      apiPath: '/vessels',
      columns,
      actions,
      toggleForm: false,
      isEdit: false,
      type: [],
      owner: [],
      id: '',
      typeSelected: {},
      ownerSelected: {},
      name: '',
      imo: '',
      callSignin: '',
      length: '',
      width: '',
      depth: '',
      gt: '',
      netto: '',
      year: '',
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const type = await dataServices.dataIndex('/vessel-type')
        this.type = type.data.result

        const owner = await dataServices.dataIndex('/fisherman')
        this.owner = owner.data.result
      } catch (err) {
        console.log(err)
      }
    },
    handleCreate() {
      this.resetData()
      this.toggleForm = true
    },
    async dataCreated() {
      const data = {
        name: this.name,
        fishermanId: this.ownerSelected.id,
        vesselTypeId: this.typeSelected.id,
        imo: this.imo,
        callSignin: this.callSignin,
        length: this.length,
        width: this.width,
        depth: this.depth,
        gt: this.gt,
        netto: this.netto,
        year: this.year,
      }

      try {
        this.toggleForm = false
        await this.$store.dispatch('data/create', { path: this.apiPath, data })
        this.$store.dispatch('data/index', { path: this.apiPath })
      } catch (err) {
        console.log(err)
      }
    },
    handleEdit(data) {
      this.resetData()
      this.name = data.name
      this.ownerSelected =
        this.owner.find((f) => f.id == data.fisherman_id) ?? {}
      this.typeSelected =
        this.type.find((f) => f.id == data.vessels_type_id) ?? {}
      this.imo = data.imo
      this.callSignin = data.call_signin
      this.length = data.length
      this.width = data.width
      this.depth = data.depth
      this.gt = data.gt
      this.netto = data.netto
      this.year = data.year
      this.id = data.id

      this.isEdit = true
      this.toggleForm = true
    },
    async dataEdited() {
      const data = {
        name: this.name,
        fishermanId: this.ownerSelected.id,
        vesselTypeId: this.typeSelected.id,
        imo: this.imo,
        callSignin: this.callSignin,
        length: this.length,
        width: this.width,
        depth: this.depth,
        gt: this.gt,
        netto: this.netto,
        year: this.year,
      }

      await this.$store.dispatch('data/update', {
        path: this.apiPath,
        id: this.id,
        data,
      })

      this.$store.dispatch('data/index', { path: this.apiPath })
    },
    handleDelete(data) {
      this.name = data.name
      this.id = data.id
      this.$swal({
        icon: 'question',
        title: 'Are you sure?',
        html: `Want to delete <strong> ${this.name} </strong>`,
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
    resetData() {
      this.typeSelected = {}
      this.ownerSelected = {}
      this.name = ''
      this.imo = ''
      this.callSignin = ''
      this.length = ''
      this.width = ''
      this.depth = ''
      this.gt = ''
      this.netto = ''
      this.year = ''
    },
  },
}
</script>
