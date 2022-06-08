<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <customer-title></customer-title>

    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="float-end" @click="goToTable">
          ตารางข้อมูลลูกค้า (F2)
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title primary-title>
        ข้อมูลลูกค้า
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-alert
              color="warning"
              icon="mdi-xml"
              :value="true"
              text
              prominent
              dense
            >
              <h3>รหัสลูกค้า : {{ itemCustomer.code }}</h3>
            </v-alert>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <v-alert
              color="success"
              dark
              icon="mdi-plus"
              border="left"
              prominent
              dense
            >
              <b>วันที่บันทึกข้อมูล</b>
              <v-divider></v-divider>
              {{ itemCustomer.dateCreate }}
            </v-alert>
          </v-col>
          <v-col cols="3">
            <v-alert
              color="warning"
              dark
              icon="mdi-pencil"
              border="left"
              prominent
              dense
            >
              <b>วันที่แก้ไขข้อมูล (ล่าสุด)</b>
              <v-divider></v-divider>
              {{ itemCustomer.dateUpdate }}
            </v-alert>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.prefix"
              label="คำนำหน้า"
              ref="prefix"
              :items="itemsPrefix"
              item-text="title"
              item-value="id"
              return-object
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @change="$refs.name.focus()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="itemCustomer.name"
              label="ชื่อ/บริษัทฯ"
              ref="name"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.account.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.account"
              label="เลขที่บัญชีลูกหนี้"
              ref="account"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.tax.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.tax"
              label="หมายเลขผู้เสียภาษี"
              ref="tax"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.phone.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.phone"
              label="เบอร์โทรติดต่อ"
              ref="phone"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.fax.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.fax"
              label="เบอร์แฟกซ์"
              ref="fax"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.address_1.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="itemCustomer.address_1"
              label="ที่อยู่ 1"
              ref="address_1"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.address_2.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="itemCustomer.address_2"
              label="ที่อยู่ 2"
              ref="address_2"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.province.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.province"
              label="จังหวัด"
              ref="province"
              :items="itemsProvince"
              item-text="name_th"
              item-value="id"
              return-object
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @change="getItemsAmphureById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.amphure"
              label="อำเภอ"
              ref="amphure"
              :items="itemsAmphure"
              item-text="name_th"
              item-value="id"
              return-object
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              :readonly="!itemCustomer.province"
              @change="getItemsDistrictById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.district"
              label="ตำบล"
              ref="district"
              :items="itemsDistrict"
              item-text="name_th"
              item-value="id"
              return-object
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              :readonly="!itemCustomer.amphure"
              @change="getZipCodeById()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.zip_code"
              label="รหัสไปรษณีย์"
              ref="zip_code"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="itemCustomer.description"
              label="ชื่อผู้ติดต่อ/รับเรื่อง"
              ref="description"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.home_page.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="itemCustomer.home_page"
              label="Home Page"
              ref="home_page"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.price_level.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.price_level"
              label="ราคาสินค้าที่ใช้"
              ref="price_level"
              :items="itemsPriceLevel"
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
              @change="$refs.customer_type.focus()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="itemCustomer.customer_type"
              label="ประเภทลูกค้า"
              ref="customer_type"
              :items="itemsCustomerType"
              item-text="title"
              item-value="id"
              return-object
              outlined
              dense
              hide-details=""
              :disabled="!editItem"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <!-- สำนักงานใหญ่ / สาขาย่อย -->
            <v-radio-group
              v-model="itemCustomer.branch_type"
              row
              hide-details=""
              :disabled="!editItem"
              ref="branch_type"
            >
              <v-radio
                label="สำนักงานใหญ่"
                value="สำนักงานใหญ่"
                ref="radio1"
                @click="
                  $nextTick(() => {
                    itemCustomer.branch_number = null;
                  })
                "
              ></v-radio>
              <v-radio
                label="สาขาย่อย"
                value="สาขาย่อย"
                ref="radio2"
                @click="
                  $nextTick(() => {
                    $refs.branch_number.focus();
                  })
                "
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3" v-if="itemCustomer.branch_type == 'สาขาย่อย'">
            <v-text-field
              v-model="itemCustomer.branch_number"
              label="เลขที่สาขา"
              ref="branch_number"
              dense
              outlined
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter="$refs.order_limit.focus()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-title primary-title> วงเงินเครดิต </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.order_limit"
              label="วงเงินเครดิตการสั่งซื้อสินค้า"
              ref="order_limit"
              type="number"
              dense
              outlined
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter="$refs.over_due.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.over_due"
              label="ยอดค้างชำระ"
              ref="over_due"
              type="number"
              dense
              outlined
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter="$refs.credit_term.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="itemCustomer.credit_term"
              label="กำหนดชำระเงิน"
              ref="credit_term"
              type="number"
              dense
              outlined
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter="$refs.note.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-switch
              label="ระงับการขาย"
              dense
              outline
              hide-details=""
              v-model="itemCustomer.suspend_sales"
              :disabled="!editItem"
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="itemCustomer.note"
              label="หมายเหตุเกี่ยวกับลูกค้า"
              ref="note"
              dense
              outlined
              hide-details=""
              :disabled="!editItem"
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.btnSave.$el.focus()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-btn
          color="success"
          width="150"
          ref="btnSave"
          @click="checkSave"
          v-if="editItem"
          >บันทึก (F10)
        </v-btn>
        <v-btn
          color="warning"
          width="150"
          ref="btnEdit"
          @click="edit"
          v-if="!editItem"
          >แก้ไข (F9)
        </v-btn>
        <v-btn color="error" width="150" ref="btnRestore" @click="cancel" v-else
          >ยกเลิก (F8)
        </v-btn>

        <v-btn v-if="!editItem" color="primary" width="150">พิมพ์ (F12) </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";

import customerTitle from "~/components/customer/customerTitle.vue";

moment.locales("th");
export default {
  components: { customerTitle },
  data() {
    return {
      overlay: false,

      itemCustomer: {
        id: 0,
        code: null,
        account: null,
        prefix: null,
        name: null,
        address_1: null,
        address_2: null,
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        phone: null,
        fax: null,
        description: null,
        home_page: null,
        customer_type: null,
        tax: null,
        price_level: null,
        branch_type: null,
        branch_number: null,
        order_limit: 0,
        over_due: 0,
        credit_term: 30,
        note: null,
        suspend_sales: false,
        dateCreate: null,
        dateUpdate: null,
      },

      itemsPrefix: [],

      itemsProvince: [],
      itemsAmphure: [],
      itemsDistrict: [],

      itemsAmphureStore: [],
      itemsDistrictStore: [],

      itemsPriceLevel: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
      ],

      itemsCustomerType: [],

      editItem: false,
    };
  },

  methods: {
    async resetItemCustomer() {
      this.itemCustomer = {
        id: 0,
        code: null,
        account: null,
        prefix: null,
        name: null,
        address_1: null,
        address_2: null,
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        phone: null,
        fax: null,
        description: null,
        home_page: null,
        customer_type: null,
        tax: null,
        price_level: null,
        branch_type: null,
        branch_number: null,
        order_limit: 0,
        over_due: 0,
        credit_term: 30,
        note: null,
        suspend_sales: false,
        dateCreate: null,
        dateUpdate: null,
      };

      this.$refs.prefix.focus();
    },

    async goToTable() {
      this.$router.push("/customer");
    },

    async edit() {
      this.editItem = true;
      this.$nextTick(() => {
        this.$refs.prefix.focus();
      });
    },

    async cancel() {
      await this.getItemCustomer();
      await this.getItemsAmphure();
      await this.getItemsDistrict();
      this.editItem = false;

      this.$nextTick(() => {
        this.$refs.btnEdit.$el.focus();
      });
    },

    // checkSave
    async checkSave() {
      let prefix = this.itemCustomer.prefix;
      let name = this.itemCustomer.name;
      let address_1 = this.itemCustomer.address_1;
      let price_level = this.itemCustomer.price_level;
      let branch_type = this.itemCustomer.branch_type;
      let branch_number = this.itemCustomer.branch_number;

      if (!prefix) {
        this.$refs.prefix.focus();
        this.alertSetPrefix();
      } else if (!name) {
        this.$refs.name.focus();
        this.alertSetName();
      } else if (!address_1) {
        this.$refs.address_1.focus();
        this.alertSetAddress1();
      } else if (!price_level) {
        this.$refs.price_level.focus();
        this.alertSetPriceLevel();
      } else if (!branch_type) {
        this.alertSetBranchType();
      } else if (branch_type == "สาขาย่อย" && !branch_number) {
        this.$refs.branch_number.focus();
        this.alertSetBranchNumber();
      } else {
        this.$swal
          .fire({
            title: "ต้องการบันทึกข้อมูล\nใช่หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่ใช่",
            focusConfirm: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.updateCustomer();
            }
          });
      }
    },

    // update
    async updateCustomer() {
      await this.$axios
        .put("/customers/" + this.itemCustomer.id, {
          account: this.itemCustomer.account,
          prefix: this.itemCustomer.prefix,
          name: this.itemCustomer.name,
          address_1: this.itemCustomer.address_1,
          address_2: this.itemCustomer.address_2,
          province: this.itemCustomer.province,
          amphure: this.itemCustomer.amphure,
          district: this.itemCustomer.district,
          zip_code: this.itemCustomer.zip_code,
          phone: this.itemCustomer.phone,
          fax: this.itemCustomer.fax,
          description: this.itemCustomer.description,
          home_page: this.itemCustomer.home_page,
          customer_type: this.itemCustomer.customer_type,
          tax: this.itemCustomer.tax,
          price_level: this.itemCustomer.price_level,
          branch_type: this.itemCustomer.branch_type,
          branch_number: this.itemCustomer.branch_number,
          order_limit: this.itemCustomer.order_limit,
          over_due: this.itemCustomer.over_due,
          credit_term: this.itemCustomer.credit_term,
          note: this.itemCustomer.note,
          suspend_sales: this.itemCustomer.suspend_sales,
        })
        .then((res) => {
          console.log("res", res.data);
          this.getData();
          this.alertSuccess();
          this.editItem = false;
          this.$nextTick(() => {
            this.$refs.btnEdit.$el.focus();
          });
        })
        .catch((err) => {
          console.log("err", err);
          this.alertError();
        });
    },

    // alert
    async alertSetPrefix() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุ คำนำหน้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSetName() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุ ชื่อ/บริษัทฯ",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSetAddress1() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุ ที่อยู่ 1",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSetPriceLevel() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุ ราคาสินค้าที่ใช้",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSetBranchType() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุสาขา",
        text: "สำนักงานใหญ่ / สาขาย่อย",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSetBranchNumber() {
      this.$swal.fire({
        icon: "warning",
        title: "กรุณาระบุ เลขที่สาขา",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertSuccess() {
      this.$swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async alertError() {
      this.$swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    // getItems
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
      if (this.itemCustomer.amphure) {
        this.itemsAmphure = await this.$axios
          .get("/amphures?province=" + this.itemCustomer.province.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        this.itemsAmphure = [];
        this.itemCustomer.amphure = null;
        this.itemsDistrict = [];
        this.itemCustomer.district = null;
        this.itemCustomer.zip_code = null;
      }
    },

    async getItemsDistrict() {
      if (this.itemCustomer.district) {
        this.itemsDistrict = await this.$axios
          .get("/districts?amphure=" + this.itemCustomer.amphure.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        this.itemsDistrict = [];
        this.itemCustomer.district = null;
        this.itemCustomer.zip_code = null;
      }
    },

    async getItemsCustomerType() {
      await this.$axios
        .get("/customer-types?_limit=-1")
        .then((res) => {
          this.itemsCustomerType = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // getById
    async getItemsAmphureById() {
      let itemProvince = this.itemCustomer.province;

      this.itemsAmphure = [];
      this.itemCustomer.amphure = null;
      this.itemsDistrict = [];
      this.itemCustomer.district = null;
      this.itemCustomer.zip_code = null;

      if (itemProvince) {
        this.itemsAmphure = await this.$axios
          .get("/amphures?province=" + itemProvince.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        this.$nextTick(() => {
          this.$refs.amphure.focus();
        });
      }
    },

    async getItemsDistrictById() {
      let itemAmphure = this.itemCustomer.amphure;

      this.itemsDistrict = [];
      this.itemCustomer.district = null;
      this.itemCustomer.zip_code = null;

      if (itemAmphure) {
        this.itemsDistrict = await this.$axios
          .get("/districts?amphure=" + itemAmphure.id)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err", err);
          });

        this.$nextTick(() => {
          this.$refs.district.focus();
        });
      }
    },

    async getZipCodeById() {
      let itemDistrict = this.itemCustomer.district;
      this.itemCustomer.zip_code = null;

      if (itemDistrict) {
        this.itemCustomer.zip_code = itemDistrict.zip_code;

        this.$nextTick(() => {
          this.$refs.description.focus();
        });
      }
    },

    async getData() {
      await this.getItemCustomer();
      await this.getItemsPrefix();
      await this.getItemsProvince();
      await this.getItemsAmphure();
      await this.getItemsDistrict();
      await this.getItemsCustomerType();
    },

    async getItemCustomer() {
      await this.$axios
        .get("/customers/" + this.$route.params.id)
        .then((res) => {
          console.log("getItemCustomer", res.data);
          this.itemCustomer = res.data;
          this.convertDate();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async convertDate() {
      this.itemCustomer.dateCreate = moment(this.itemCustomer.created_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");

      this.itemCustomer.dateUpdate = moment(this.itemCustomer.updated_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");
    },

    async getEvent(e) {
      //   console.log("e", e);

      if (e.keyCode == 113) {
        e.preventDefault();
        this.goToTable();
      } else if (e.keyCode == 114) {
        e.preventDefault();
        this.tab = 0;
      } else if (e.keyCode == 115) {
        e.preventDefault();
        this.tab = 1;
      } else if (e.keyCode == 116) {
        e.preventDefault();
        this.resetItemCustomer();
      } else if (e.keyCode == 119) {
        e.preventDefault();
        this.cancel();
      } else if (e.keyCode == 120) {
        e.preventDefault();
        this.edit();
      } else if (e.keyCode == 121) {
        e.preventDefault();
        this.checkSave();
      }
    },
  },

  created() {
    this.getData();

    window.addEventListener("keydown", this.getEvent);
  },

  mounted() {
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>
 
<style lang="scss" scoped>
</style>