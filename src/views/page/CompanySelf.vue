<template>
  <main>
    <div class="container-fluid min-vh-75">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h6>Data Company</h6>
              <div class="row mt-3">
                <div class="col-2">Owner</div>
                <div class="col-5">
                  <input :disabled="user.role == 'admin'" type="text" class="form-control" v-model="dataCompany.user.name"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-2">Company Name</div>
                <div class="col-5">
                  <input :disabled="user.role == 'admin'" type="text" class="form-control" v-model="dataCompany.name"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-2">Registartion Number</div>
                <div class="col-5">
                  <input :disabled="user.role == 'admin'" type="text" class="form-control" v-model="dataCompany.registration_number"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-2">Phone Number</div>
                <div class="col-5">
                  <input :disabled="user.role == 'admin'" type="text" class="form-control" v-model="dataCompany.phone"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-2">Address</div>
                <div class="col-5">
                  <input :disabled="user.role == 'admin'" type="text" class="form-control" v-model="dataCompany.address" />
                </div>
              </div>
              <button class="btn btn-primary px-5 mt-5" v-if="user.role == 'owner'">Save</button>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  class="btn btn-info"
                  @click="tab = 'crew'"
                >
                  Data Crew
                </button>
                <button
                  type="button"
                  class="btn btn-info"
                  @click="tab = 'vessel'"
                >
                  Data Vessel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-3" v-show="tab == 'crew'">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h6>Data Crew</h6>
                <button
                  class="btn btn-primary btn-sm"
                  @click="handleCrewCreate()"
                  v-if="user.role == 'owner'"
                >
                  Add Crew
                </button>
              </div>

              <table class="table mt-3">
                <thead>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th v-if="user.role == 'owner'">Actions</th>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in crew" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.gender == "m" ? "Male" : "Female" }}</td>
                    <td>{{ data.phone }}</td>
                    <td>{{ data.address }}</td>
                    <td class="d-flex gap-1" v-if="user.role == 'owner'">
                      <button
                        class="btn btn-sm btn-warning"
                        @click="handleCrewUpdate(data)"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-sm btn-danger"
                        @click="handleCrewDelete(data)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12 mt-3" v-show="tab == 'vessel'">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h6>Data Vessel</h6>
                <button
                  class="btn btn-primary btn-sm"
                  @click="handleAddVessel()"
                  v-if="user.role == 'owner'"
                >
                  Add Vessel
                </button>
              </div>
            <div class="table-responsive">
              <table class="table mt-3">
                <thead>
                  <th>#</th>
                  <th>Name</th>
                  <th>IMO</th>
                  <th>Width</th>
                  <th>Length</th>
                  <th>No AIS</th>
                  <th>Call Sign</th>
                  <th>Gross tonase</th>
                  <th>Netto</th>
                  <th>Years</th>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in vessels" :key="index">
                    <td>
                      {{index+1}}
                    </td>
                    <td>{{data.name}}</td>
                    <td>{{data.imo}}</td>
                    <td>{{data.width}}</td>
                    <td>{{data.length}}</td>
                    <td>{{data.no_ais}}</td>
                    <td>{{data.call_sign}}</td>
                    <td>{{data.gt}}</td>
                    <td>{{data.netto}}</td>
                    <td>{{data.years}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <base-modal
    :title="crewModal"
    @on-confirm="crewModalEdit ? dataCrewUpdated() : dataCrewCreated()"
  >
    <template #body>
      <div class="form-group">
        <label for="">Full Name</label>
        <input
          type="text"
          class="form-control"
          v-model="crewData.name"
          :class="{ 'is-invalid': errorState['name'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["name"] ? errorState["name"][0] : "" }}
        </div>
      </div>
      <label for="">Gender {{ gender }}</label>
      <div class="form-group">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            value="m"
            v-model="crewData.gender"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1"> Male </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="f"
            v-model="crewData.gender"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Female
          </label>
        </div>
        <div class="invalid-feedback">
          {{ errorState["gender"] ? errorState["gender"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Address</label>
        <input
          type="text"
          class="form-control"
          v-model="crewData.address"
          :class="{ 'is-invalid': errorState['address'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["address"] ? errorState["address"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Phone</label>
        <input
          type="text"
          class="form-control"
          v-model="crewData.phone"
          :class="{ 'is-invalid': errorState['phone'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["phone"] ? errorState["phone"][0] : "" }}
        </div>
      </div>
    </template>
  </base-modal>
  <base-modal :modalId="vesselModal" :title="vesselModalTittle" @on-confirm="vesselCreated()">
    <template #body>
      <div class="form-group">
        <label for="">Vessel Name</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.name"
          :class="{ 'is-invalid': errorState['name'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["name"] ? errorState["name"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">IMO</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.imo"
          :class="{ 'is-invalid': errorState['imo'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["imo"] ? errorState["imo"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Call Sign</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.callSign"
          :class="{ 'is-invalid': errorState['call_sign'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["call_sign"] ? errorState["call_sign"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">No. AIS</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.noAis"
          :class="{ 'is-invalid': errorState['no_ais'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["no_ais"] ? errorState["no_ais"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Length</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.length"
          :class="{ 'is-invalid': errorState['length'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["length"] ? errorState["length"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Width</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.width"
          :class="{ 'is-invalid': errorState['width'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["width"] ? errorState["width"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">GT</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.gt"
          :class="{ 'is-invalid': errorState['gt'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["gt"] ? errorState["gt"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Netto</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.netto"
          :class="{ 'is-invalid': errorState['netto'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["netto"] ? errorState["netto"][0] : "" }}
        </div>
      </div>
      <div class="form-group">
        <label for="">Year</label>
        <input
          type="text"
          class="form-control"
          v-model="vesselData.year"
          :class="{ 'is-invalid': errorState['year'] }"
        />
        <div class="invalid-feedback">
          {{ errorState["year"] ? errorState["year"][0] : "" }}
        </div>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label"
          >Upload vessel image</label
        >
        <input class="form-control" type="file" id="formFile"  @change="uploadImage"/>
      </div>
      <div class="text-center">
        <img v-if="imgPreview" :src="imgPreview" alt="" srcset="" class="w-25 text-center">
      </div>
    </template>
  </base-modal>
</template>


<script>
import dataServices from "../../services/dataServices";
export default {
  data() {
    return {
      tab: "crew",
      vesselModal: "vessel-modal",
      vesselModalTittle: "Add new vessel",
      companyId: this.$route.params.id,
      crew: [],
      vessels: [],
      crewModal: "Add new Crew",
      crewModalEdit: false,
      dataCompany: {
        user: {
          name : ''
        },
        name: '',
        registration_number: '',
        phone: '',
        address: ''
      },
      crewData: {
        id: "",
        name: "",
        phone: "",
        gender: "",
        address: "",
      },
      vesselData: {
        harborId: null,
        name: "",
        imo: "",
        callSign: "",
        width: "",
        length: "",
        gt: "",
        netto: "",
        year: "",
        image: null,
        noAis: "",
      },
      imgPreview: null,
      errorState: [],
    };
  },
  mounted() {
    this.getCrewData()
    this.getVessel()
    this.getCompany()
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },  
  methods: {
    async getCompany() {
      try {
        const res = await dataServices.dataIndex(
          `/company/${this.user.company.id}`
        )

        const data = res.data.result
        this.dataCompany = {...data}

        console.log(res)
      } catch (err) {
        console.log(err);
      }

      

    },
    async getCrewData() {
      try {
        const res = await dataServices.dataIndex(
          `/crew/company/${this.user.company.id}`
        );
        this.crew = res.data.result ?? [];
      } catch (err) {
        this.$store.dispatch("notif/error", {
          payload: "Failed get data crew",
        });
      }
    },
    async handleCrewCreate() {
      (this.crewData = {
        id: "",
        name: "",
        phone: "",
        gender: "",
        address: "",
      }),
        (this.isEdit = false);
      this.modalTitle = "Add new crew";
      this.errorState = [];
      this.emitter.emit("show-modal");
    },
    async dataCrewCreated() {
      let data = {
        name: this.crewData.name,
        company_id: this.companyId,
        phone: this.crewData.phone,
        gender: this.crewData.gender,
        address: this.crewData.address,
      };

      try {
        const result = await dataServices.dataCreate("/crew", data);
        if (result) {
          this.emitter.emit("hide-modal");
          this.getCrewData();
        }
      } catch (err) {
        if (err.response.data.data ?? null) {
          this.errorState = err.response.data.data;
        }
      }
    },
    handleCrewUpdate(data) {
      this.crewModalEdit = true;
      this.crewData.id = data.id;
      this.errorState = [];

      this.crewModal = `Update ${data.name}`;
      this.crewData.name = data.name;
      this.crewData.gender = data.gender;
      (this.crewData.address = data.address),
        (this.crewData.phone = data.phone);
      this.emitter.emit("show-modal");
    },
    async dataCrewUpdated() {
      let data = {
        name: this.crewData.name,
        company_id: this.companyId,
        phone: this.crewData.phone,
        gender: this.crewData.gender,
        address: this.crewData.address,
      };

      const result = await dataServices.dataUpdate(
        "/crew",
        this.crewData.id,
        data
      );

      if (result) {
        this.emitter.emit("hide-modal");
        this.getCrewData();
      }
    },
    handleCrewDelete(data) {
      this.crewData.id = data.id;
      this.$swal({
        icon: "question",
        title: "Are you sure?",
        html: `Want to delete Crew <strong> ${data.name} </strong>`,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataCrewDeleted();
        }
      });
    },
    async dataCrewDeleted() {
      await dataServices.dataDelete("/crew", this.crewData.id);
      this.getCrewData();
    },
    async getVessel() {
      try {
        const result = await dataServices.dataIndex(`/vessel/company/${this.user.company.id}`)
        this.vessels =  result.data.result ?? [];
      } catch(err) {
        console.log(err);
      }
    },
    handleAddVessel() {
      this.vesselData = {
        harborId: null,
        name: "",
        imo: "",
        callSign: "",
        width: "",
        length: "",
        gt: "",
        netto: "",
        year: "",
        noAis: "",
      };

      this.emitter.emit(`show-${this.vesselModal}`);
    },
    uploadImage(e) {
      const file = e.target.files[0]
      this.vesselData.image = file
      this.imgPreview = URL.createObjectURL(file)
    },
    async vesselCreated() {
      let data = new FormData()
      data.append('name', this.vesselData.name)
      data.append('imo', this.vesselData.imo)
      data.append('call_sign', this.vesselData.callSign)
      data.append('width', this.vesselData.width)
      data.append('length', this.vesselData.length)
      data.append('gt', this.vesselData.gt)
      data.append('netto', this.vesselData.netto)
      data.append('years', this.vesselData.year)
      data.append('image', this.vesselData.image)
      data.append('company_id', this.companyId)
      data.append('no_ais', this.vesselData.noAis)

      try {
        const result = await dataServices.dataCreate("/vessel", data);
        if (result) {
          this.emitter.emit(`hide-${this.vesselModal}`);
          this.getVessel();
        }
      } catch (err) {
        if (err.response.data.data ?? null) {
          this.errorState = err.response.data.data;
        }
      }
    }
  },
};
</script>