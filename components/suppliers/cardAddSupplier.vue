<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          เพิ่มข้อมูลผู้ผลิต
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('closeDialogAddSupplier')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="9">
                <v-text-field
                  label="ชื่อ/บริษัทฯ"
                  v-model="itemSupplier.supplier_name"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  label="ประเภทผู้จำหน่าย"
                  :items="itemsVendorType"
                  item-text="vendor_type_name"
                  item-value="id"
                  v-model="itemSupplier.vendor_type"
                  outlined
                  dense
                  return-object
                  hide-details=""
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  label="ที่อยู่"
                  v-model="itemSupplier.supplier_address"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  label="ชื่อผู้ติดต่อ/รับเรื่อง"
                  v-model="itemSupplier.supplier_description"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  label="จังหวัด"
                  :items="itemsProvinces"
                  item-text="name_th"
                  item-value="id"
                  v-model="itemSupplier.province"
                  outlined
                  dense
                  hide-details=""
                  return-object
                  @change="getItemsAmphures"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  label="อำเภอ/เขต"
                  :items="itemsAmphures"
                  item-text="name_th"
                  item-value="id"
                  v-model="itemSupplier.amphure"
                  outlined
                  dense
                  hide-details=""
                  return-object
                  :readonly="itemProvinces == null"
                  @change="getItemsDistricts"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  label="ตำบล"
                  :items="itemsDistricts"
                  item-text="name_th"
                  item-value="id"
                  v-model="itemSupplier.district"
                  outlined
                  dense
                  hide-details=""
                  return-object
                  :readonly="itemAmphures == null"
                  @change="getZipCode"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="รหัสไปรษณีย์"
                  v-model="itemSupplier.zip_code"
                  outlined
                  dense
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="เบอร์โทรศัพท์"
                  v-model="itemSupplier.supplier_phone"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="E-Mail"
                  v-model="itemSupplier.supplier_email"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="หมายเลขผู้เสียภาษี"
                  v-model="itemSupplier.supplier_tax"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="เลขบัญชีเจ้าหนี้"
                  v-model="itemSupplier.supplier_account_number"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="วงเงินเครดิตในการสั่งซื้อสินค้า"
                  v-model="itemSupplier.supplier_credit"
                  dense
                  outlined
                  hide-details=""
                  type="number"
                  min="0"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-radio-group
                  label="สำนักงานใหญ่/สาขาย่อย"
                  v-model="itemSupplier.supplier_branch_status"
                  row
                >
                  <v-radio label="สำนักงานใหญ่" value="สำนักงานใหญ่"></v-radio>
                  <v-radio label="สาขาย่อย" value="สาขาย่อย"></v-radio>
                </v-radio-group>
                <v-text-field
                  v-if="itemSupplier.supplier_branch_status == 'สาขาย่อย'"
                  label="ลำดับที่"
                  v-model="itemSupplier.supplier_branch_number"
                  dense
                  outlined
                  hide-details=""
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="recordDate">
              <v-col cols="6">
                <v-text-field
                  label="วันที่บันทึกข้อมูล"
                  v-model="recordDate"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="วันที่แก้ไขข้อมูล(ล่าสุด)"
                  v-model="revisionDate"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3" color="success" type="submit">บันทึก</v-btn>
          <v-btn
            class="mx-3"
            color="error"
            @click="$emit('closeDialogAddSupplier')"
            >ปิด</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  props: ["itemSupplier"],

  data() {
    return {
      itemsProvinces: [],
      itemProvinces: {},
      itemsAmphures: [],
      itemAmphures: {},
      itemsDistricts: [],
      itemDistricts: {},

      itemsVendorType: [],

      recordDate: null,
      revisionDate: null,
    };
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      await this.getItemProvinces();
      await this.getItemsVendorType();
    },

    async getItemProvinces() {
      await this.$axios.get("/provinces").then((res) => {
        // console.log("getItemProvinces", res.data);
        this.itemsProvinces = res.data;
      });
    },

    async getItemsAmphures() {
      //   console.log("itemProvinces", this.itemProvinces);
      this.itemProvinces = this.itemSupplier.province;
      if (this.itemProvinces != null) {
        await this.$axios
          .get("/amphures?province=" + this.itemProvinces.id)
          .then((res) => {
            // console.log("getItemsAmphures", res.data);
            this.itemsAmphures = res.data;
            this.itemAmphures = [];
            this.itemDistricts = [];
            this.itemSupplier.zip_code = null;
          });
      } else {
        this.itemAmphures = [];
        this.itemDistricts = [];
        this.itemSupplier.zip_code = null;
      }
    },

    async getItemsDistricts() {
      this.itemAmphures = this.itemSupplier.amphure;

      if (this.itemAmphures != null) {
        await this.$axios
          .get("/districts?amphure=" + this.itemAmphures.id)
          .then((res) => {
            // console.log("getItemsDistricts", res.data);
            this.itemsDistricts = res.data;
            this.itemDistricts = [];
            this.itemSupplier.zip_code = null;
          });
      } else {
        this.itemDistricts = [];
        this.itemSupplier.zip_code = null;
      }
    },

    async getZipCode() {
      this.itemDistricts = this.itemSupplier.district;

      if (this.itemDistricts != null) {
        this.itemSupplier.zip_code = this.itemDistricts.zip_code;
      } else {
        this.itemSupplier.zip_code = null;
      }
    },

    async getItemsVendorType() {
      await this.$axios.get("/vendor-types").then((res) => {
        // console.log("getItemsVendorType", res.data);
        this.itemsVendorType = res.data;
      });
    },

    async checkSave() {
      console.log("itemSupplier", this.itemSupplier);

      this.$swal({
        title: "ต้องการบันทึกข้อมูล ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("closeDialogAddSupplier");
          this.insertSupplier();
        }
      });
    },

    async insertSupplier() {
      await this.$axios
        .post("/suppliers", {
          supplier_name: this.itemSupplier.supplier_name,
          supplier_address: this.itemSupplier.supplier_address,
          province: this.itemSupplier.province,
          amphure: this.itemSupplier.amphure,
          district: this.itemSupplier.district,
          zip_code: this.itemSupplier.zip_code.toString(),
          supplier_phone: this.itemSupplier.supplier_phone,
          supplier_description: this.itemSupplier.supplier_description,
          supplier_email: this.itemSupplier.supplier_email,
          vendor_type: this.itemSupplier.vendor_type,
          supplier_account_number: this.itemSupplier.supplier_account_number,
          supplier_tax: this.itemSupplier.supplier_tax,
          supplier_branch_status: this.itemSupplier.supplier_branch_status,
          supplier_branch_number: this.itemSupplier.supplier_branch_number,
          supplier_credit: this.itemSupplier.supplier_credit,
        })
        .then((res) => {
          console.log("itemSupplier", res.data);
          this.$emit("getItemsSupplier");
          this.alertSuccess();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async alertSuccess() {
      this.$swal({
        title: "บันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertError() {
      this.$swal({
        title: "เกิดข้อผิดพลาด",
        text: "ตรวจสอบความถูกต้องของข้อมูล ก่อนบันทึก",
        icon: "error",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
