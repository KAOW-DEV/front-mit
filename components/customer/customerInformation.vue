<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-spacer></v-spacer>
        <v-alert color="warning" icon="mdi-xml" :value="true" text prominent>
          <h3>รหัสลูกค้า : CM XXXXXXXX</h3>
        </v-alert>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-autocomplete
              v-model="item.prefix"
              label="คำนำหน้า"
              ref="prefix"
              :items="itemsPrefix"
              item-text="title"
              item-value="id"
              return-object
              autocomplete
              outlined
              dense
              hide-details=""
              autofocus
              @change="checkValidate"
            ></v-autocomplete>
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="item.name"
              label="ชื่อ/บริษัทฯ"
              ref="name"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.account"
              label="เลขที่บัญชีลูกหนี้"
              ref="account"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.tax"
              label="หมายเลขผู้เสียภาษี"
              ref="tax"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.phone"
              label="เบอร์โทรติดต่อ"
              ref="phone"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.fax"
              label="เบอร์แฟกซ์"
              ref="fax"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="item.address_1"
              label="ที่อยู่ 1"
              ref="address_1"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="item.address_2"
              label="ที่อยู่ 2"
              ref="address_2"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="item.province"
              label="จังหวัด"
              ref="province"
              :items="itemsProvince"
              item-text="name_th"
              item-value="id"
              return-object
              autocomplete
              outlined
              dense
              hide-details=""
              @change="checkValidate(), getItemsAmphureById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="item.amphure"
              label="อำเภอ"
              ref="amphure"
              :items="itemsAmphure"
              item-text="name_th"
              item-value="id"
              return-object
              autocomplete
              outlined
              dense
              hide-details=""
              :disabled="!item.province"
              @change="checkValidate(), getItemsDistrictById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="item.district"
              label="ตำบล"
              ref="district"
              :items="itemsDistrict"
              item-text="name_th"
              item-value="id"
              return-object
              autocomplete
              outlined
              dense
              hide-details=""
              :disabled="!item.amphure"
              @change="checkValidate(), getZipCodeById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.zip_code"
              label="รหัสไปรษณีย์"
              ref="zip_code"
              outlined
              dense
              hide-details=""
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="item.description"
              label="ชื่อผู้ติดต่อ/รับเรื่อง"
              ref="description"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="item.home_page"
              label="Home Page"
              ref="home_page"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="checkValidate"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title primary-title>
        <v-btn color="warning" width="150" @click="resetItem"
          >เคลียร์ฟอร์ม (F5)
        </v-btn>
        <v-divider vertical class="mx-3"></v-divider>

        <v-btn color="success" width="150">บันทึก (F10) </v-btn>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn color="primary" width="150">พิมพ์ (F12) </v-btn>
      </v-card-title>
    </v-card>

    <v-dialog v-model="dialogSearchPrefix" persistent> </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      dialogSearchPrefix: false,
      itemsPrefix: [],

      itemsProvince: [],
      itemsAmphure: [],
      itemsDistrict: [],

      itemsAmphureStore: [],
      itemsDistrictStore: [],
    };
  },

  methods: {
    async getItemsPrefix() {
      await this.$axios
        .get("/prefixes?_limit=-1")
        .then((res) => {
          this.itemsPrefix = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async getItemsProvince() {
      await this.$axios
        .get("/provinces?_limit=-1")
        .then((res) => {
          this.itemsProvince = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async getItemsAmphure() {
      await this.$axios
        .get("/amphures?_limit=-1")
        .then((res) => {
          this.itemsAmphureStore = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async getItemsDistrict() {
      await this.$axios
        .get("/districts?_limit=-1")
        .then((res) => {
          this.itemsDistrictStore = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // getById
    async getItemsAmphureById() {
      let itemProvince = this.item.province;
      let itemsAmphure = [];

      this.itemsAmphure = [];
      this.item.amphure = null;
      this.itemsDistrict = [];
      this.item.district = null;
      this.item.zip_code = null;

      if (itemProvince) {
        itemsAmphure = this.itemsAmphureStore.filter((item) => {
          if (itemProvince.id != item.province.id) {
            return false;
          }
          return true;
        });
      }

      //   console.log("itemsAmphure", itemsAmphure);
      this.itemsAmphure = itemsAmphure;
    },

    async getItemsDistrictById() {
      let itemAmphure = this.item.amphure;
      let itemsDistrict = [];

      this.itemsDistrict = [];
      this.item.district = null;
      this.item.zip_code = null;

      if (itemAmphure) {
        itemsDistrict = this.itemsDistrictStore.filter((item) => {
          if (itemAmphure.id != item.amphure.id) {
            return false;
          }
          return true;
        });
      }

      //   console.log("itemsDistrict", itemsDistrict);
      this.itemsDistrict = itemsDistrict;
    },

    async getZipCodeById() {
      let itemDistrict = this.item.district;
      let zip_code = null;

      if (itemDistrict) {
        zip_code = itemDistrict.zip_code;
      }

      //   console.log("zip_code", zip_code);
      this.item.zip_code = zip_code;
    },

    async resetItem() {
      this.item.code = null;
      this.item.account = null;
      this.item.prefix = null;
      this.item.name = null;
      this.item.address_1 = null;
      this.item.address_2 = null;
      this.item.province = null;
      this.item.amphure = null;
      this.item.district = null;
      this.item.zip_code = null;
      this.item.phone = null;
      this.item.fax = null;
      this.item.description = null;
      this.item.home_page = null;
      this.item.customer_type = null;
      this.item.tax = null;
      this.item.price_level = null;
      this.item.branch_type = null;
      this.item.branch_number = null;

      this.$refs.prefix.focus();
    },

    async checkValidate() {},

    async getEvent(e) {
      if (e.keyCode == 116) {
        this.resetItem();
        e.preventDefault();
      }
    },

    async getData() {
      await this.getItemsPrefix();
      await this.getItemsProvince();
      await this.getItemsAmphure();
      await this.getItemsDistrict();
    },
  },

  created() {
    this.getData();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped>
</style>