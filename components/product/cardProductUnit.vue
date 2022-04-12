<template>
  <div>
    <v-card class="ma-7" flat>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-data-table
              :headers="headersItemsProductUnit"
              :items="itemsProductUnit"
              class="elevation-1"
              @click:row="getItem"
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
            </v-data-table>

            <v-row>
              <v-col cols="12">
                <v-btn color="success" @click="openDialogAddProductUnit"
                  >เพิ่มหน่วยซื้อ/ขาย</v-btn
                >
                <v-btn color="warning" @click="openDialogEditProductUnit"
                  >แก้ไขหน่วยซื้อ/ขาย</v-btn
                >
                <v-btn color="red" dark @click="checkDelete"
                  >ลบหน่วยซื้อ/ขาย</v-btn
                >
              </v-col>
            </v-row>

            <v-row class="mt-5">
              <v-col cols="4">
                <v-text-field
                  label="รหัสภายใน"
                  v-model="product_unit_internal_code"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="รหัสบาร์โค้ด"
                  v-model="product_unit_barcode"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="รายละเอียด(ย่อ)"
                  v-model="product_unit_name"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="รายละเอียดบรรจุ"
                  v-model="product_unit_description"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="หน่วยนับ"
                  v-model="unit"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="จำนวนบรรจุ"
                  v-model="product_unit_quantity_number"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="ราคาตั้งจากส่วนกลาง(ล่าสุด)"
                  v-model="product_price_middle"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ส่วนลดเปอร์เซ็น(ล่าสุด)"
                  v-model="product_price_discount"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class=""></v-divider>

            <v-row class="mt-3">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 01 (บวกเปอร์เซ็น)"
                  v-model="product_price_1"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 02 (บวกเปอร์เซ็น)"
                  v-model="product_price_2"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 03 (บวกเปอร์เซ็น)"
                  v-model="product_price_3"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 04 (บวกเปอร์เซ็น)"
                  v-model="product_price_4"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 05 (บวกเปอร์เซ็น)"
                  v-model="product_price_5"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 06 (บวกเปอร์เซ็น)"
                  v-model="product_price_6"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 07 (บวกเปอร์เซ็น)"
                  v-model="product_price_7"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 08 (บวกเปอร์เซ็น)"
                  v-model="product_price_8"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 09 (บวกเปอร์เซ็น)"
                  v-model="product_price_9"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาขาย 10 (บวกเปอร์เซ็น)"
                  v-model="product_price_10"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="6"> </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคาต่ำสุดที่ขายได้"
                  v-model="product_price_low_limit"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogAddProductUnit" persistent width="80%">
      <card-add-product-unit
        @closeDialogAddProductUnit="closeDialogAddProductUnit"
        @getItemsProductUnit="getItemsProductUnit"
        @resetText="resetText"
        :itemProduct.sync="itemProduct"
        :itemProductUnit.sync="itemProductUnit"
        :itemProductPrice.sync="itemProductPrice"
      ></card-add-product-unit>
    </v-dialog>

    <v-dialog v-model="dialogEditProductUnit" persistent width="80%">
      <card-edit-product-unit
        @closeDialogEditProductUnit="closeDialogEditProductUnit"
        @getItemsProductUnit="getItemsProductUnit"
        @resetText="resetText"
        :itemProduct.sync="itemProduct"
        :itemProductUnit.sync="itemProductUnit"
        :itemProductPrice.sync="itemProductPrice"
      ></card-edit-product-unit>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import cardAddProductUnit from "./cardAddProductUnit.vue";
import CardEditProductUnit from "./cardEditProductUnit.vue";
moment.locale("th");

export default {
  components: { cardAddProductUnit, CardEditProductUnit },
  props: ["itemProduct", "editItem"],
  data() {
    return {
      headersItemsProductUnit: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "รหัสภายใน", value: "product_unit_internal_code" },
        { text: "รหัสบาร์โค้ด", value: "product_unit_barcode" },
        { text: "รายละเอียด(ย่อ)", value: "product_unit_name" },
        { text: "รายละเอียดบรรจุ", value: "product_unit_description" },
        { text: "หน่วยนับ", value: "unit.unit_name" },
      ],

      itemsProductUnit: [],

      itemProductUnit: {
        id: 0,
        product_unit_internal_code: null,
        product_unit_barcode: null,
        product_unit_name: null,
        product_unit_description: null,
        unit: {},
        product_unit_quantity_number: 0,
        product: {},
      },

      itemProductPrice: {
        id: 0,
        product_price_middle: 0,
        product_price_discount: 0,
        product_price_1: 0,
        product_price_2: 0,
        product_price_3: 0,
        product_price_4: 0,
        product_price_5: 0,
        product_price_6: 0,
        product_price_7: 0,
        product_price_8: 0,
        product_price_9: 0,
        product_price_10: 0,
        product_price_low_limit: 0,
      },

      product_unit_internal_code: null,
      product_unit_barcode: null,
      product_unit_name: null,
      product_unit_description: null,
      unit: null,
      product_unit_quantity_number: null,

      product_price_middle: null,
      product_price_discount: null,
      product_price_1: null,
      product_price_2: null,
      product_price_3: null,
      product_price_4: null,
      product_price_5: null,
      product_price_6: null,
      product_price_7: null,
      product_price_8: null,
      product_price_9: null,
      product_price_10: null,
      product_price_low_limit: null,

      dialogAddProductUnit: false,
      dialogEditProductUnit: false,
    };
  },

  created() {
    this.getData();
  },

  watch: {
    itemProduct(val) {
      if (val) {
        this.getData();
      }
    },
  },
  methods: {
    async getData() {
      this.getItemsProductUnit();
      this.resetText();
    },

    async getItemsProductUnit() {
      await this.$axios
        .get(
          "/product-units?product=" +
            this.itemProduct.id +
            "&_sort=product_unit_quantity_number:ASC"
        )
        .then((res) => {
          console.log("itemsProductUnit", res.data);
          this.itemsProductUnit = res.data;
        });
    },

    async getItem(event, { item }) {
      console.log("item", item);
      this.itemProductUnit = item;
      console.log("itemProductUnit", this.itemProductUnit);

      this.product_unit_internal_code = item.product_unit_internal_code;
      this.product_unit_barcode = item.product_unit_barcode;
      this.product_unit_name = item.product_unit_name;
      this.product_unit_description = item.product_unit_description;
      this.product_unit_quantity_number = item.product_unit_quantity_number;
      this.unit = item.unit.unit_name;

      this.getItemProductPrice(item);
    },

    async getItemProductPrice(item) {
      await this.$axios
        .get("/product-prices?product_unit=" + item.id)
        .then((res) => {
          this.product_price_middle = res.data[0].product_price_middle;
          this.product_price_discount = res.data[0].product_price_discount;
          this.product_price_1 = res.data[0].product_price_1;
          this.product_price_2 = res.data[0].product_price_2;
          this.product_price_3 = res.data[0].product_price_3;
          this.product_price_4 = res.data[0].product_price_4;
          this.product_price_5 = res.data[0].product_price_5;
          this.product_price_6 = res.data[0].product_price_6;
          this.product_price_7 = res.data[0].product_price_7;
          this.product_price_8 = res.data[0].product_price_8;
          this.product_price_9 = res.data[0].product_price_9;
          this.product_price_10 = res.data[0].product_price_10;
          this.product_price_low_limit = res.data[0].product_price_low_limit;

          this.itemProductPrice = res.data[0];
        });
    },

    async resetText() {
      this.product_unit_internal_code = null;
      this.product_unit_barcode = null;
      this.product_unit_name = null;
      this.product_unit_description = null;
      this.product_unit_quantity_number = null;
      this.unit = null;

      this.product_price_middle = null;
      this.product_price_discount = null;
      this.product_price_1 = null;
      this.product_price_2 = null;
      this.product_price_3 = null;
      this.product_price_4 = null;
      this.product_price_5 = null;
      this.product_price_6 = null;
      this.product_price_7 = null;
      this.product_price_8 = null;
      this.product_price_9 = null;
      this.product_price_10 = null;
      this.product_price_low_limit = null;
    },

    async openDialogAddProductUnit() {
      this.dialogAddProductUnit = true;
      this.resetItemProductUnit();
      this.resetItemProductPrice();
      this.resetText();
    },
    async closeDialogAddProductUnit() {
      this.dialogAddProductUnit = false;
    },

    async openDialogEditProductUnit() {
      if (this.product_unit_internal_code != null) {
        this.dialogEditProductUnit = true;
      }
    },
    async closeDialogEditProductUnit() {
      this.dialogEditProductUnit = false;
    },

    async resetItemProductUnit() {
      this.itemProductUnit = {
        id: 0,
        product_unit_internal_code: null,
        product_unit_barcode: null,
        product_unit_name: null,
        product_unit_description: null,
        unit: {},
        product_unit_quantity_number: 0,
        product: {},
      };
    },

    async resetItemProductPrice() {
      this.itemProductPrice = {
        id: 0,
        product_price_middle: 0,
        product_price_discount: 0,
        product_price_1: 0,
        product_price_2: 0,
        product_price_3: 0,
        product_price_4: 0,
        product_price_5: 0,
        product_price_6: 0,
        product_price_7: 0,
        product_price_8: 0,
        product_price_9: 0,
        product_price_10: 0,
        product_price_low_limit: 0,
      };
    },

    async checkDelete() {
      if (this.product_unit_internal_code != null) {
        this.$swal({
          title: "ต้องการลบข้อมูล ใช่หรือไม่",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log("itemProductUnit", this.itemProductUnit);
            console.log("itemProductPrice", this.itemProductPrice);
            await this.deleteProductUnit();
            await this.deleteProductPrice();
            await this.alertSuccess();
            await this.getData();
          }
        });
      }
    },

    async deleteProductUnit() {
      await this.$axios
        .delete("/product-units/" + this.itemProductUnit.id)
        .then((res) => {
          // console.log("itemsProductUnit", res.data);
        });
    },

    async deleteProductPrice() {
      await this.$axios
        .delete("/product-prices/" + this.itemProductPrice.id)
        .then((res) => {
          // console.log("itemsProductUnit", res.data);
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
