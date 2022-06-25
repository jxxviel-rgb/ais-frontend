<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Vessel data</h6>
            </div>
            <div class="card-body"></div>
            <data-index :columns="columns"></data-index>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
const columns = [
  {
    name: 'Pelabuhan',
    dataIndex: 'pelabuhan_id',
  },
  {
    name: 'Company',
    dataIndex: 'company_id',
  },
  {
    name: 'Name',
    dataIndex: 'name',
  },
  {
    name: 'Imo',
    dataIndex: 'imo',
  },
  {
    name: 'Call Sign',
    dataIndex: 'call_sign',
  },
  {
    name: 'Width',
    dataIndex: 'width',
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
    name: 'Years',
    dataIndex: 'years',
  },
]
export default {
  data() {
    return {
      apiPath: '/vessel',
      columns,
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
  },
}
</script>
