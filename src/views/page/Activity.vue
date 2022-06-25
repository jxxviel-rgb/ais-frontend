<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Activity data</h6>
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
    name: 'Vessel',
    dataIndex: 'vessel_id',
  },
  {
    name: 'Company',
    dataIndex: 'company_id',
  },
  {
    name: 'Departure Date',
    dataIndex: 'departure_date',
  },
  {
    name: 'Return',
    dataIndex: 'return_date',
  },
]
export default {
  data() {
    return {
      apiPath: '/crew',
      columns,
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
  },
}
</script>
