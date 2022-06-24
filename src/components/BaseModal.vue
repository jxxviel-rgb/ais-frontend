<template>
  <div class="modal" tabindex="-1" :ref="id">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p>Modal body text goes here.</p>
          </slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="$emit('on-confirm')"
            type="button"
            class="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { uuid } from 'vue-uuid'
export default {
  props: {
    title: {
      type: String,
      default: 'Base modal',
    },
  },
  data() {
    return {
      id: uuid.v4(),
    }
  },
  mounted() {
    let modal = new Modal(this.$refs[this.id])

    this.emitter.on('show-modal', function () {
      modal.show()
    })
    this.emitter.on('hide-modal', function () {
      modal.hide()
    })
  },
  unmounted() {
    this.emitter.off('show-modal')
    this.emitter.off('hide-modal')
  },
}
</script>
