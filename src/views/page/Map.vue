<template>
  <div>
    <main>
      <div class="container-fluid" style="position: relative; height: 75vh">
        <PointToMap
          :clearOption="clearOption"
          @pointVessel="point"
        ></PointToMap>
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
import eezIndonesia from "../../../src/assets/js/zee.json";
import flagcode from "../../../flags.json";

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
const location = ref(null);
const polyline = ref(null);
const featureGroup = ref(null);
const vesselId = ref();
const flagWs = ref(null);
const threeDigit = ref(null);
const coordinate = computed(() => store.getters["data/GET_SELECTED_VESSEL"]);
const closeModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const isPastTrackActive = ref(false);
const clearOption = ref(false);
const circleMarker = ref(null);
const pastTrackId = ref(null);
const geoPolygon = ref(null);
const polygonFiltered = ref(null);
const filterLocation = ref([]);
const firstThreeDigitMmsi = ref([]);
const flags = ref([]);
const vesselFlag = ref(null);
const removeMarker = (id) => {
  markers.value.forEach((marker, index, arr) => {
    if (marker._leaflet_id === id) {
      map.value.removeLayer(marker);
      arr.splice(index, 1);
    }
  });
};
const updateCoordinates = (name, mmsi, flag, markerId) => {
  let newLocation = {
    latitude: location.value.vessel.latest_position.latitude,
    longitude: location.value.vessel.latest_position.longitude,
  };

  plotGeolocation(
    name,
    mmsi,
    flag,
    newLocation.latitude,
    newLocation.longitude,
    markerId
  );
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
const redMarker = ref(
  leaflet.icon({
    iconUrl: "../../../redMarker.svg",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  })
);
const point = () => {
  // console.table(coordinate.value.lat, coordinate.value.lon);
  // if (circleMarker.value) map.value.removeLayer(circleMarker.value);
  // circleMarker.value = leaflet
  //   .circleMarker([coordinate.value.lat, coordinate.value.lon], { radius: 5 })
  //   .addTo(map.value);
  clearOption.value = true;
  map.value.setView([coordinate.value.lat, coordinate.value.lon], 15);
  // clearOption.value = false;
  setTimeout(() => {
    clearOption.value = false;
  }, 1000);
};
const pastTrack = (id) => {
  isModalOpen.value = !isModalOpen.value;
  isPastTrackActive.value = !isPastTrackActive.value;
  pastTrackId.value = id;

  store.dispatch("data/getVesselPositions", id).then((res) => {
    locations.value = res[0].position;
    let filterLocations = locations.value.map((obj) => {
      return [obj.latitude, obj.longitude];
    });
    if (polyline.value) {
      polyline.value.remove();
    }
    polyline.value = leaflet.polyline(filterLocations, {
      color: "black",
      dashArray: "20",
    });

    featureGroup.value = leaflet
      .featureGroup([geoMarker.value, polyline.value])
      .addTo(map.value);
    map.value.fitBounds(featureGroup.value.getBounds());
  });
};
function isMarkerInsidePolygon(marker, poly) {
  var polyPoints = poly;
  var x = marker.getLatLng().lat,
    y = marker.getLatLng().lng;
  var inside = false;
  for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    var xi = polyPoints[i][1],
      yi = polyPoints[i][0];
    var xj = polyPoints[j][1],
      yj = polyPoints[j][0];
    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    // console.log(intersect);
    if (intersect) inside = !inside;
  }

  return inside;
}
const plotGeolocation = (name, mmsi, flag, lat, long, id) => {
  geoMarker.value = leaflet.marker([lat, long], { icon: greenMarker.value });
  geoMarker.value.bindTooltip(name + "<br>" + mmsi + "<br>" + flag.country);
  geoMarker.value._leaflet_id = id;

  map.value.addLayer(geoMarker.value);
  angle.value = calcAngleDegrees(lat, long);
  geoMarker.value.setRotationAngle(angle.value);
  markers.value.push(geoMarker.value);
};
// Start of OnMounted lifecycle
onMounted(() => {
  map.value = leaflet
    .map("mymap")
    .setView([coordinate.value.lat, coordinate.value.lon], 6);
  geoPolygon.value = leaflet.geoJSON(eezIndonesia).addTo(map.value);
  polygonFiltered.value = [].concat.apply(
    [],
    eezIndonesia.features[0].geometry.coordinates
  );
  map.value.on("click", function (e) {
    alert(e.latlng);
  });
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
  //! Ploting all vessel to map for every component mounted
  store.dispatch("data/getVesselPosition").then((res) => {
    vessels.value = res.data.data;
    vessels.value.forEach((vessel, index) => {
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
      firstThreeDigitMmsi.value.push(vessel.mmsi.substr(0, 3));
      vesselFlag.value = flagcode.filter(
        (flag) => flag.mid === firstThreeDigitMmsi.value[index]
      );
      flags.value.push(vesselFlag);
      plotGeolocation(
        vessel.name,
        vessel.mmsi,
        vesselFlag.value[0],
        vessel.latest_position.latitude,
        vessel.latest_position.longitude,
        vessel.id
      );

      geoMarker.value.on("click", function () {
        store.dispatch("data/getSpecificVesselInfo", vessel.id).then((res) => {
          vesselId.value = store.getters["data/GET_VESSEL_INFO"].result.id;
          geoMarker.value._leaflet_id = vessel.id;
          isModalOpen.value = !isModalOpen.value;
        });
      });
      markers.value.forEach((marker) => {
        if (
          isMarkerInsidePolygon(marker, polygonFiltered.value) &&
          vessel.mmsi.substr(0, 3) !== "525"
        ) {
          marker.setIcon(redMarker.value);
        }
        console.log(new Date());
        console.log(new Date(vessel.latest_position.created_at) > new Date());
        if (new Date(vessel.latest_position.created_at) > new Date()) {
          console.log("%c Masok", "color: red");
          marker
            .bindPopup(
              "Last seen : " +
                new Date(vessel.latest_position.created_at).toDateString()
            )
            .openPopup();
        }
      });
    });
  });
  // pusher debug mode on
  Pusher.logToConsole = true;
  // initializing pusher client
  const pusher = new Pusher("e4ed3df3a3664c4e917a", {
    cluster: "ap1",
    activityTimeout: 10000,
  });

  const channel = pusher.subscribe("location-tracker");
  // watch every state changes and update it with pusher
  channel.bind("location", (data) => {
    location.value = data;
    removeMarker(location.value.vessel.id);
    threeDigit.value = location.value.vessel.mmsi.substr(0, 3);
    flagWs.value = flagcode.filter((flag) => flag.mid === threeDigit.value);
    updateCoordinates(
      location.value.vessel.name,
      location.value.vessel.mmsi,
      flagWs.value[0],
      location.value.vessel.id
    );
    //! determine vessel is inside polygon, is true change marker
    markers.value.forEach((marker) => {
      if (
        isMarkerInsidePolygon(marker, polygonFiltered.value) &&
        location.value.vessel.mmsi.substr(0, 3) !== "525"
      ) {
        marker.setIcon(redMarker.value);
      }
    });
    if (pastTrackId.value === location.value.vessel.id) {
      store
        .dispatch("data/getVesselPositions", pastTrackId.value)
        .then((res) => {
          locations.value = store.state.data.vesselPositions[0].position;
          let filterLocations = locations.value.map((obj) => {
            return [obj.latitude, obj.longitude];
          });
          if (polyline.value) {
            map.value.removeLayer(polyline.value);
          }
          polyline.value = leaflet.polyline(filterLocations, {
            color: "black",
            dashArray: "20",
          });

          featureGroup.value = leaflet.featureGroup([
            geoMarker.value,
            polyline.value,
          ]);
          map.value.addLayer(featureGroup.value);
          // });
        });
    }

    geoMarker.value.on("click", function (e) {
      store
        .dispatch("data/getSpecificVesselInfo", e.sourceTarget._leaflet_id)
        .then((res) => {
          vesselId.value = store.getters["data/GET_VESSEL_INFO"].result.id;
          isModalOpen.value = !isModalOpen.value;
        });
    });
  });
});
// End of OnMounted lifecycle
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