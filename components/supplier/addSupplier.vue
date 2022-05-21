<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-icon color="success" large>mdi-account-plus</v-icon>
        <v-spacer></v-spacer>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn class="" color="error" @click="$emit('closeDialogAddSupplier')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              autofocus
              label="ชื่อ/บริษัทฯ"
              ref="ref1"
              v-model="itemSupplier.supplier_name"
              dense
              outlined
              hide-details=""
              required
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref2.focus(), checkValidate()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              label="สำนักงานใหญ่ / สาขาย่อย"
              ref="ref2"
              :items="itemsBranchType"
              v-model="itemSupplier.supplier_branch_status"
              outlined
              dense
              hide-details=""
              @focus="$event.target.select()"
              @change="checkValidate()"
            ></v-autocomplete>
          </v-col>
          <v-col
            cols="3"
            v-if="itemSupplier.supplier_branch_status == 'สาขาย่อย'"
          >
            <v-text-field
              label="ลำดับที่"
              ref="ref3"
              v-model="itemSupplier.supplier_branch_number"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref4.focus(), checkValidate()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              label="ที่อยู่"
              ref="ref4"
              v-model="itemSupplier.supplier_address"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref5.focus(), checkValidate()"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-textarea
              label="ชื่อผู้ติดต่อ/รับเรื่อง"
              ref="ref5"
              v-model="itemSupplier.supplier_description"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref6.focus(), checkValidate()"
            ></v-textarea>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="เลขบัญชีเจ้าหนี้"
              ref="ref6"
              v-model="itemSupplier.supplier_account_number"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref7.focus(), checkValidate()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="หมายเลขผู้เสียภาษี"
              ref="ref7"
              v-model="itemSupplier.supplier_tax"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref8.focus(), checkValidate()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="เบอร์โทรศัพท์"
              ref="ref8"
              v-model="itemSupplier.supplier_phone"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref9.focus(), checkValidate()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="E-Mail"
              ref="ref9"
              v-model="itemSupplier.supplier_email"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter.prevent="$refs.ref10.focus(), checkValidate()"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-autocomplete
              label="ประเภทผู้จำหน่าย"
              ref="ref10"
              :items="itemsVendorType"
              item-text="vendor_type_name"
              item-value="id"
              v-model="itemSupplier.vendor_type"
              outlined
              dense
              return-object
              hide-details=""
              @focus="$event.target.select()"
              @change="$refs.ref11.focus(), checkValidate()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="วงเงินเครดิตในการสั่งซื้อสินค้า"
              ref="ref11"
              v-model="itemSupplier.supplier_credit"
              dense
              outlined
              hide-details=""
              type="number"
              min="0"
              @focus="$event.target.select()"
              @keydown.enter.prevent="
                $refs.btnSave.$el.focus(), checkValidate()
              "
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          ref="btnSave"
          @keydown.enter="insertConfirm"
          @click="insertConfirm"
        >
          <v-icon>mdi-content-save</v-icon>
          (F10)
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["itemSupplier"],

  data() {
    return {
      itemsProvinces: [],
      itemProvinces: null,
      itemsAmphures: [],
      itemAmphures: null,
      itemsDistricts: [],
      itemDistricts: null,

      itemsVendorType: [],

      recordDate: null,
      revisionDate: null,

      itemsBranchType: ["สำนักงานใหญ่", "สาขาย่อย"],
    };
  },

  methods: {
    async loadData() {
      await this.getItemsVendorType();
    },

    async getItemsVendorType() {
      await this.$axios.get("/vendor-types").then((res) => {
        // console.log("getItemsVendorType", res.data);
        this.itemsVendorType = res.data;
      });
    },

    async checkValidate() {
      // console.log("itemSupplier", this.itemSupplier);

      let item = this.itemSupplier;

      if (!item.supplier_name) {
        this.$refs.ref1.focus();
        return false;
      } else if (!item.supplier_branch_status) {
        this.$refs.ref2.focus();
        return false;
      } else if (
        item.supplier_branch_status == "สาขาย่อย" &&
        !item.supplier_branch_number
      ) {
        this.$nextTick(() => {
          this.$refs.ref3.focus();
        });
        return false;
      } else if (!item.supplier_address) {
        this.$refs.ref4.focus();
        return false;
      } else if (!item.supplier_description) {
        this.$refs.ref5.focus();
        return false;
      } else {
        return true;
      }
    },

    async insertConfirm(e) {
      console.log("e", e);
      this.$refs.btnSave.$el.focus();
      e.preventDefault();

      let check = await this.checkValidate();
      console.log("check", check);

      if (check) {
        this.$emit("closeDialogAddSupplier");

        this.$nextTick(() => {
          this.$swal
            .fire({
              title: "ต้องการบันทึกข้อมูล\nใช่หรือไม่",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ใช่",
              cancelButtonText: "ไม่ใช่",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.insertSupplier();
              } else {
                this.$emit("openDialogAddSupplier");
              }
            });
        });
      }
    },

    async insertSupplier() {
      await this.$axios
        .post("/suppliers", {
          supplier_name: this.itemSupplier.supplier_name,
          supplier_address: this.itemSupplier.supplier_address,
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

    async getEvent(e) {
      // console.log("e", e);
      if (e.keyCode == 121) {
        this.insertConfirm(e);
      }
    },
  },

  created() {
    this.loadData();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped></style>
