<template>
  <div class="modal" tabindex="-1" :ref="modalId">
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
          <slot name="footer">
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
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: "Base modal",
    },
    modalId: {
      type: String,
      default: "__base_modal",
    },
  },
  mounted() {
    let modal = new Modal(this.$refs[this.modalId]);
    this.emitter.on(
      `show-${this.modalId != "__base_modal" ? this.modalId : "modal"}`,
      function () {
        modal.show();
      }
    );
    this.emitter.on(
      `hide-${this.modalId != "__base_modal" ? this.modalId : "modal"}`,
      function () {
        modal.hide();
      }
    );
  },
  unmounted() {
    this.emitter.off(
      `show-${this.modalId != "__base_modal" ? this.modalId : "modal"}`
    );
    this.emitter.off(
      `hide-${this.modalId != "__base_modal" ? this.modalId : "modal"}`
    );
  },
};
</script>
