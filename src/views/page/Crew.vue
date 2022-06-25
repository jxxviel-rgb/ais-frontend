<template>
  <main>
    <div class="container min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Crew Data</h6>
            </div>
            <div class="card-body">
              <data-index :columns="columns"></data-index>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
    name: 'Address',
    dataIndex: 'address',
  },
  {
    name: 'Phone',
    dataIndex: 'phone',
  },
  {
    name: 'Company',
    dataIndex: 'company_id',
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
