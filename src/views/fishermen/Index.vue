<template>
  <data-index title="Fishermen Data" :columns="columns" />
</template>

<script>
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
  },
]
export default {
  data() {
    return {
      apiPath: '/fisherman',
      columns,
    }
  },
  mounted() {
    this.emitter.emit('fetch', this.apiPath)
  },
}
</script>
