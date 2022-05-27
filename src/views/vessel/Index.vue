<template>
  <div>
    <data-index
      title="Vessels Type Data"
      :columns="columns"
      :actions="actions"
      @test-emit="testEmit"
    />
    <c-modal
      size="sm"
      :visible="toggleForm"
      @close="() => (toggleForm = !toggleForm)"
    >
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
    name: 'Length',
    dataIndex: 'length',
  },
  {
    name: 'Width',
    dataIndex: 'width',
  },
  {
    name: 'Depth',
    dataIndex: 'depth',
  },
  {
    name: 'GT',
    dataIndex: 'gt',
  },
  {
    name: 'Netto',
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
    emit: 'test-emit',
    class: 'btn-primary',
  },
]
export default {
  data() {
    return {
      columns,
      actions,
      apiPath: '/vessels',
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
  },
  methods: {
    testEmit(data) {
      console.log(data)
    },
  },
}
</script>
