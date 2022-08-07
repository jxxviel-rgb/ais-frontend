<template>
  <div>
    <main>
      <div class="container-fluid" style="position: relative; height: 75vh">
        <PointToMap @pointVessel="point"></PointToMap>
        <div v-if="isModalOpen">
          <Modal
            @close="closeModal"
            @past-track="pastTrack(vesselId)"
            :isModalOpen="isModalOpen"
          ></Modal>
        </div>
        <div id="mymap" style="height: 100%"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, computed } from "@vue/runtime-core";
import PointToMap from "../../components/PointToMap.vue";
import leaflet from "leaflet";
import Pusher from "pusher-js";
import { useStore } from "vuex";
import "leaflet-rotatedmarker";
import { AisEncode } from "ggencoder";
import { AisDecode } from "ggencoder";
import Modal from "/src/components/Modal.vue";
import "../../../src/index.css";

const map = ref(null);
const geoMarker = ref(null);
const angle = ref(null);
const markers = ref([]);
const store = useStore();
const vessels = ref(null);
const encodedMessages = ref([]);
const encodedMessage = ref(null);
const decodedMessage = ref(null);
const isModalOpen = ref(false);
const locations = ref(null);
const polyline = ref(null);
const featureGroup = ref(null);
const vesselId = ref();
const coordinate = computed(() => store.getters["data/GET_SELECTED_VESSEL"]);
const closeModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const circleMarker = ref(null);
const removeMarker = (id) => {
  markers.value.forEach((marker, index, arr) => {
    if (marker._leaflet_id === id) {
      map.value.removeLayer(marker);
      arr.splice(index, 1);
    }
  });
};
const updateCoordinates = (markerId) => {
  let newLocation = {
    latitude: location.value.vessel.latest_position.latitude,
    longitude: location.value.vessel.latest_position.longitude,
  };

  plotGeolocation(newLocation.latitude, newLocation.longitude, markerId);
};
function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}
const greenMarker = ref(
  leaflet.icon({
    iconUrl: "../../../markerGreen.svg",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  })
);
const point = () => {
  // console.table(coordinate.value.lat, coordinate.value.lon);
  if (circleMarker.value) map.value.removeLayer(circleMarker.value);
  circleMarker.value = leaflet
    .circleMarker([coordinate.value.lat, coordinate.value.lon], { radius: 5 })
    .addTo(map.value);
  map.value.setView([coordinate.value.lat, coordinate.value.lon], 15);
};
const pastTrack = (id) => {
  isModalOpen.value = !isModalOpen.value;
  store.dispatch("data/getVesselPositions", vesselId.value).then((res) => {
    locations.value = store.state.data.vesselPositions[0].position;
    let filterLocations = locations.value.map((obj) => {
      return [obj.latitude, obj.longitude];
    });
    polyline.value = leaflet.polyline(filterLocations, { color: "black" });
    if (featureGroup.value) {
      featureGroup.value.remove();
    }
    markers.value.forEach((marker) => {
      if (!marker._leaflet_id === id) return;

      featureGroup.value = leaflet.featureGroup([
        geoMarker.value,
        polyline.value,
      ]);
      // featureGroup.value._leaflet_id = id;
      map.value.addLayer(featureGroup.value);
      map.value.fitBounds(featureGroup.value.getBounds());
    });
  });
};
const plotGeolocation = (lat, long, id) => {
  geoMarker.value = leaflet.marker([lat, long], { icon: greenMarker.value });
  let popup = leaflet
    .popup({
      closeButton: false,
      autoClose: false,
    })
    .setLatLng([lat, long])
    .setContent("<p>Text box on a map</p>")
    .openOn(map.value);
  geoMarker.value._leaflet_id = id;

  map.value.addLayer(geoMarker.value);
  angle.value = calcAngleDegrees(lat, long);
  geoMarker.value.setRotationAngle(angle.value);
  markers.value.push(geoMarker.value);
};
onMounted(() => {
  map.value = leaflet
    .map("mymap")
    .setView([coordinate.value.lat, coordinate.value.lon], 6);

  leaflet
    .tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoianh4dmllbCIsImEiOiJjbDNoY29sOGExYXFtM2pwODI2eG9nMmg2In0.VFXcjaJrUxJ34qfa5rFXHQ",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoianh4dmllbCIsImEiOiJjbDNoY29sOGExYXFtM2pwODI2eG9nMmg2In0.VFXcjaJrUxJ34qfa5rFXHQ",
      }
    )
    .addTo(map.value);

  // pusher debug mode on
  Pusher.logToConsole = true;
  // initializing pusher client
  const pusher = new Pusher("e4ed3df3a3664c4e917a", {
    cluster: "ap1",
  });

  const channel = pusher.subscribe("location-tracker");
  // watch every state changes and update it with pusher
  channel.bind("location", (data) => {
    location.value = data;
    removeMarker(location.value.vessel.id);
    updateCoordinates(location.value.vessel.id);
    geoMarker.value.on("click", function () {
      store
        .dispatch("data/getSpecificVesselInfo", location.value.vessel.id)
        .then((res) => {
          vesselId.value = store.getters["data/GET_VESSEL_INFO"].result.id;
          isModalOpen.value = !isModalOpen.value;
        });
      geoMarker.value._leaflet_id = location.value.vessel.id;
    });
  });
  store.dispatch("data/getVesselPosition").then((res) => {
    vessels.value = res.data.data;
    vessels.value.forEach((vessel) => {
      encodedMessage.value = new AisEncode({
        aistype: vessel.msg_type,
        repeat: 0,
        mmsi: vessel.mmsi,
        reserved: 0,
        sog: vessel.speed,
        accuracy: 0,
        lat: vessel.latest_position.latitude,
        lon: vessel.latest_position.longitude,
        cog: calcAngleDegrees(
          vessel.latest_position.latitude,
          vessel.latest_position.longitude
        ),
        hdg: 0,
        utc: vessel.latest_position.created_at,
        reg: 0,
        cs: 0,
        display: 0,
        dsc: 0,
        band: 0,
        msg22: 0,
        assigned: 0,
        raim: 0,
        radio: 0,
        status: vessel.latest_position.navigation_status,
      });
      decodedMessage.value = new AisDecode(encodedMessage.value.nmea);
      encodedMessages.value.push(encodedMessage);
      plotGeolocation(
        vessel.latest_position.latitude,
        vessel.latest_position.longitude,
        vessel.id
      );

      geoMarker.value.on("click", function () {
        // console.log("Halo");
        store.dispatch("data/getSpecificVesselInfo", vessel.id).then((res) => {
          vesselId.value = store.getters["data/GET_VESSEL_INFO"].result.id;
          geoMarker.value._leaflet_id = vessel.id;
        });
        isModalOpen.value = !isModalOpen.value;
      });
    });
  });
});
</script>

<style>
#mymap{
  border-radius: 10px;
  z-index: 10
}
/* .custom-popup .leaflet-popup-content-wrapper {
  background:#2c3e50;
  color:#fff;
  font-size:16px;
  line-height:24px;
  border-radius: 0px;
  }
.custom-popup .leaflet-popup-content-wrapper a {
    color:rgba(255,255,255,0.1);
  }
.custom-popup .leaflet-popup-tip-container {
  width:30px;
  height:15px;
  }
.custom-popup .leaflet-popup-tip {
    background: transparent;
    border: none;
    box-shadow: none;
  } */

</style>