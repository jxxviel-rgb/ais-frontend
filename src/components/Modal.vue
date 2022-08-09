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
      class="text-white position-relative bg-primary"
      style="border-radius: 10px; padding: 5px"
    >
      <div class="px-2 py-2 d-flex justify-content-between">
        <div class="">
          <h4 class="text-white">Detail Kapal</h4>
        </div>
        <div>
          <button
            @click="$emit('close')"
            class="bg-white rounded-5 btn btn-primary text-dark"
          >
            X
          </button>
        </div>
      </div>
      <div class="px-2 py-2 pb-5 row justify-content-center align-items-center">
        <div class="col-4">
          <div class="card">
            <div class="card-body text-dark">
              <div class="card-title">Foto Kapal</div>
              <img src="@/assets/kapal.jpg" alt="gambar" style="width: 200px" />
            </div>
          </div>
        </div>
        <!-- <div class="col-4">
          <div class="card">
            <div class="card-body text-dark">
              <div class="card-title">Info Kapal</div>
              Nama :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.name
              }}

              <br />
              MMSI :
              {{
                store.state.data.vesselInfo &&
                store.state.data.vesselInfo.result.mmsi
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
        </div> -->
        <div class="col-8">
          <div class="card">
            <div class="card-body text-dark">
              <div class="d-flex justify-content-between">
                <div class="container-fluid">
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
                    store.state.data.vesselInfo.result.position[0]
                      .navigation_status
                  }}
                </div>
                <div class="container-fluid">
                  Nama :
                  {{
                    store.state.data.vesselInfo &&
                    store.state.data.vesselInfo.result.name
                  }}

                  <br />
                  MMSI :
                  {{
                    store.state.data.vesselInfo &&
                    store.state.data.vesselInfo.result.mmsi
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
          </div>
        </div>
      </div>
      <div class="px-2 py-2 row">
        <div class="col-6">
          <button
            class="bg-white position-absolute btn px-auto py-auto"
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