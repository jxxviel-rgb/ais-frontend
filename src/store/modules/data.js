import dataServices from "@/services/dataServices";
import store from "@/store";
import axios from "axios";

export const data = {
  namespaced: true,
  state: {
    isloading: false,
    data: null,
    vesselInfo: null,
    vesselPositions: null,
    vesselLatPos: null,
    selectedVessel: {
      lat: -6.244418,
      lon: 108.32736,
    },
    selectedVesselId: null,
    errorMessage: {},
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_LAT_POS(state, data) {
      state.vesselLatPos = data;
    },
    SET_SELECTED_VESSEL(state, data) {
      state.selectedVessel = data;
    },
    SET_SELECTED_VESSEL_ID(state, data) {
      state.selectedVesselId = data;
    },
    SET_VESSEL_INFO(state, data) {
      state.vesselInfo = data;
    },
    SET_VESSEL_POSITIONS(state, data) {
      state.vesselPositions = data;
    },
    SET_ERROR_MESSAGE(state, data) {
      state.errorMessage = data;
    },
    RESET_ERROR_MESSAGE(state) {
      state.errorMessage = {};
    },
    SET_LOADING(state, data) {
      state.isloading = data;
    },
  },
  getters: {
    GET_VESSEL_INFO(state) {
      return state.vesselInfo;
    },
    GET_SELECTED_VESSEL(state) {
      return state.selectedVessel;
    },
    GET_VESSEL_POSITION(state) {
      return state.vesselInfo;
    },
  },
  actions: {
    async index({ commit }, { path }) {
      commit("SET_DATA", []);
      commit("SET_LOADING", true);
      try {
        const response = await dataServices.dataIndex(path);
        if (response.data.result) {
          commit("SET_DATA", response.data.result);
        }
        commit("SET_LOADING", false);
      } catch (err) {
        const payload = {
          title: "Geting data failed",
        };
        store.dispatch("notif/error", { payload });
        commit("SET_LOADING", false);
      }
    },
    async create({ commit }, { path, data }) {
      commit("SET_LOADING", true);
      commit("RESET_ERROR_MESSAGE");
      try {
        await dataServices.dataCreate(path, data);
        const payload = {
          title: "Success create data",
        };
        store.dispatch("notif/success", { payload });
        commit("SET_LOADING", false);
        return true;
      } catch (err) {
        let data = err.response.data.data;
        commit("SET_ERROR_MESSAGE", data);
        const payload = {
          title: "failed create data",
        };
        store.dispatch("notif/error", { payload });
        commit("SET_LOADING", false);
        return false;
      }
    },
    async delete({ commit }, { path, id }) {
      commit("SET_LOADING", true);
      try {
        await dataServices.dataDelete(path, id);
        const payload = {
          title: "Success delete data",
        };
        store.dispatch("notif/success", { payload });
      } catch (err) {
        console.log(err);
        const payload = {
          title: "failed create data",
        };
        store.dispatch("notif/error", { payload });
      }
      commit("SET_LOADING", false);
    },
    async update({ commit }, { path, id, data }) {
      commit("SET_LOADING", true);
      commit("RESET_ERROR_MESSAGE");
      try {
        await dataServices.dataUpdate(path, id, data);
        const payload = {
          title: "Success Update data",
        };
        store.dispatch("notif/success", { payload });
        commit("SET_LOADING", false);
        return true;
      } catch (err) {
        console.log(err);
        const payload = {
          title: "failed failed data",
        };
        store.dispatch("notif/error", { payload });
        commit("SET_LOADING", false);
        return false;
      }
    },
    validationReset({ commit }) {
      commit("RESET_ERROR_MESSAGE");
    },
    getVesselPosition({ commit }) {
      let token = JSON.parse(localStorage.getItem("auth-data"));
      axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_URL}/vessel/position`)
          .then((res) => {
            commit("SET_DATA", res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getSpecificVesselInfo({ commit }, id) {
      let token = JSON.parse(localStorage.getItem("auth-data"));
      axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_URL}/vessel/${id}`)
          .then((res) => {
            commit("SET_VESSEL_INFO", res.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getVesselPositions({ commit }, id) {
      let token = JSON.parse(localStorage.getItem("auth-data"));
      axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_URL}/vessel/${id}/positions`)
          .then((res) => {
            commit("SET_VESSEL_POSITIONS", res.data.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    searchVessel({ commit }, query) {
      let token = JSON.parse(localStorage.getItem("auth-data"));
      axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_URL}/vessel/search?vessel=${query}`)
          .then((res) => {
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getVesselLatestPos({ commit }, id) {
      let token = JSON.parse(localStorage.getItem("auth-data"));
      axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API_URL}/vessel/${id}/position`)
          .then((res) => {
            commit("SET_LAT_POS", res.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
