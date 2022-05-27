<template>
  <c-row>
    <c-col :xs="12">
      <c-card>
        <c-card-header>{{ title }}</c-card-header>
        <c-card-body>
          <slot name="top" />
          <c-table bordered responsive="xl">
            <c-table-head>
              <c-table-row>
                <c-table-header-cell scope="col"> # </c-table-header-cell>
                <c-table-header-cell
                  scope="col"
                  v-for="(header, index) in columns"
                  :key="index"
                >
                  {{ header.name }}
                </c-table-header-cell>
                <c-table-header-cell scope="col" v-if="actions">
                  Actions
                </c-table-header-cell>
              </c-table-row>
            </c-table-head>
            <c-table-body v-if="dataState">
              <c-table-row
                v-for="(data, dataIndex) in dataState"
                :key="dataIndex"
              >
                <c-table-data-cell>{{ dataIndex + 1 }}</c-table-data-cell>
                <c-table-data-cell
                  v-for="(col, colIndex) in columns"
                  :key="colIndex"
                >
                  <span v-if="!col.skip">
                    {{ strTobject(data, col.dataIndex) }}
                  </span>
                </c-table-data-cell>
                <c-table-data-cell v-if="actions">
                  <span v-for="(action, acindex) in actions" :key="acindex">
                    <button
                      type="button"
                      class="btn btn-sm"
                      :class="action.class"
                      v-if="action.emit"
                      @click="$emit(action.emit, data)"
                    >
                      {{ action.title }}
                    </button>
                  </span>
                </c-table-data-cell>
              </c-table-row>
            </c-table-body>
          </c-table>
        </c-card-body>
      </c-card>
    </c-col>
  </c-row>
</template>

<script>
export default {
  name: 'DataIndex',
  props: {
    title: String,
    columns: Array,
    actions: Array,
  },
  data() {
    return {
      apiPath: '',
    }
  },
  computed: {
    dataState() {
      return this.$store.state.data.data
    },
  },
  mounted() {
    this.emitter.on('fetch', (path) => {
      this.apiPath = path
      this.fetch(this.apiPath)
    })
  },
  unmounted() {
    this.emitter.off('fetch')
  },
  methods: {
    fetch(path) {
      this.$store.dispatch('data/index', { path })
    },
    strTobject(obj, str) {
      const strSplit = str.split('.')

      let result = null

      if (strSplit.length > 1) {
        try {
          result = obj
          strSplit.forEach((element) => {
            result = result[element]
          })
        } catch (err) {
          result = null
        }
      } else {
        result = obj[str]
      }

      return result
    },
  },
}
</script>
