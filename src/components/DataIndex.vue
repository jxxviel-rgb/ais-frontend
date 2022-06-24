<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            #
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            v-for="(header, index) in columns"
            :key="index"
          >
            {{ header.name }}
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            v-if="actions"
          >
            Options
          </th>
        </tr>
      </thead>
      <tbody v-if="dataState">
        <tr v-for="(data, dataIndex) in dataState" :key="dataIndex">
          <td>{{ dataIndex + 1 }}</td>
          <td v-for="(col, colIndex) in columns" :key="colIndex">
            <slot :name="col.dataIndex" v-bind="data">
              <span v-if="!col.skip">
                {{ strTobject(data, col.dataIndex) }}
              </span>
            </slot>
          </td>
          <td v-if="actions">
            <span
              v-for="(action, acindex) in actions"
              :key="acindex"
              style="
                display: inline-block;
                margin-right: 0.3rem;
                margin-bottom: 0.1rem;
              "
            >
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
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
