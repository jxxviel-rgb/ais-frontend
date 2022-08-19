<template>
  <div>
    <div class="drpdwn">
      <input
        type="text"
        placeholder="Cari Kapal"
        v-model="search"
        class="mb-2 form-control"
        @keydown="searching"
        style="width: 400px"
      />
      <div class="drpdwn-content">
        <div
          class="drpdwn-item"
          :class="[options.length || option === null > 0 ? '' : 'hidden']"
        >
          <div v-if="notFound">
            <span>Kapal tidak ditemukan</span>
          </div>
          <div v-else>
            <div v-for="(option, index) in options[0]" :key="index">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-block">
                  <span> {{ option.name }}</span>
                </div>

                <button
                  @click="
                    selectedVessel(
                      option.latest_position.latitude,
                      option.latest_position.longitude
                    )
                  "
                  class="btn btn-primary"
                >
                  Point to Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, watchEffect } from "vue";
import { useStore } from "vuex";
import TablesVue from "../views/Tables.vue";
const store = useStore();
const option = ref(null);
const search = ref(null);
const notFound = ref(false);
const options = ref([]);
const emit = defineEmits(["pointVessel"]);
const props = defineProps({
  clearOption: Boolean,
});
const optionSelected = ref(null);
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
      options.value = [];
    }, timeout);
  };
}

const selectedVessel = (lat, lon) => {
  store.commit("data/SET_SELECTED_VESSEL", { lat, lon });
  // emit("clearing")
  emit("pointVessel");
};

watchEffect(() => {
  if (props.clearOption) options.value = [];
});

const searching = debounce(() =>
  store
    .dispatch("data/searchVessel", search.value)
    .then((res) => {
      options.value = [];
      notFound.value = false;
      options.value.push(res);
    })
    .catch((err) => {
      options.value = [];
      notFound.value = true;
      options.value.push(err.response.data);
    })
);
</script>

<style lang="scss" scoped>
.drpdwn {
  position: relative;
  display: inline-block;
  width: 400px;
}
/* drpdwn Content (Hidden by Default) */
.drpdwn-content {
  position: absolute;
  background-color: #f6f6f6;
  min-width: 100%;
  max-height: 400px;
  border: 1px solid #ddd;
  z-index: 20;
  overflow: scroll;
}

/* Links inside the drpdwn */
.drpdwn-content .d-flex {
  color: black;
  text-decoration: none;
  display: block;
  padding: 0px;
  max-height: 100px;
  padding: 2px 8px 2px 8px;
}
// .drpdwn-content span:hover {
//   background-color: #f1f1f1;
// }
.hidden {
  display: none;
}
</style>