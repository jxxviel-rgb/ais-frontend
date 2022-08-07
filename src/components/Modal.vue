<template>
  <div
    class="position-absolute"
    style="
      margin: 50px;
      right: 5px;

      top: 30px;
      z-index: 20;
    "
  >
    <div
      class="position-relative bg-primary text-white"
      style="border-radius: 10px; padding: 5px"
    >
      <div class="row">
        <div
          class="col-1 position-relative rounded border-primary"
          style="bottom: 0; top: 0"
        >
          <button
            @click="$emit('close')"
            class="rounded-5 btn btn-primary bg-white text-dark"
          >
            X
          </button>
        </div>
        <div class="col-11 align-items-center my-2">
          <h4 class="text-white">Detail Kapal</h4>
        </div>
      </div>
      <div class="row pb-5" style="width: 100%">
        <div class="col-6">
          <div class="card">
            <div class="card-body text-dark">
              <div class="card-title">Info Kapal</div>
              Nama :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.name
              }}

              <br />
              IMO :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.imo
              }}
              <br />
              Netto :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.netto
              }}
              <br />
              Length :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.length
              }}
              <br />
              GT :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.gt
              }}
              <br />
              Tipe :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.type
              }}
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body text-dark">
              <div class="card-title">Info Lokasi</div>
              Lat/Lon :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.position[0].latitude
              }}/{{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.position[0].longitude
              }}
              <br />
              Kecepatan :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.position[0].speed
              }}kn
              <br />
              Course :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.position[0].course
              }}&deg;
              <br />
              Status :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.position[0].navigation_status
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <button
            class="position-absolute btn bg-white px-auto py-auto"
            style="bottom: 0"
            @click="$emit('past-track')"
          >
            Past Track
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
const store = useStore();
const vessel = ref(null);
</script>

<style lang="css" scoped>

</style>