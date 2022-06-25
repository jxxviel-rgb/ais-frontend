<template>
  <main>
    <div class="container min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h6>Crew Depature</h6>
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
    name: 'Crew',
    dataIndex: 'crew_id',
  },
  {
    name: 'Activity',
    dataIndex: 'activity_id',
  },
  {
    name: 'Vessel',
    dataIndex: 'vessel_id',
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
