<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-alert v-if="editItem" color="success" border="left" text>
          <h3>{{ itemProduct.product_name }}</h3>
        </v-alert>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="error"
                  class="float-end"
                  width="100"
                  @click="deleteProductUnit"
                  >ลบ</v-btn
                >
                <v-btn
                  color="warning"
                  class="float-end"
                  width="100"
                  @click="editProductUnit"
                  >แก้ไข</v-btn
                >
                <v-btn
                  color="success"
                  class="float-end"
                  width="100"
                  @click="addProductUnit"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-card>
              <v-card-title primary-title>
                <div>รายการสินค้า</div>
              </v-card-title>
              <v-divider></v-divider>

              <v-data-table
                :headers="headersItemsProductUnit"
                :items="itemsProductUnit"
                class="elevation-1"
                hide-default-footer
                @click:row="getItem"
              >
                <template v-slot:item.index="{ item, index }">
                  {{ index + 1 }}
                </template>
              </v-data-table>
            </v-card>

            <v-card class="mt-3">
              <v-card-title primary-title> รายละเอียดสินค้า </v-card-title>
              <v-divider></v-divider>
              <v-card-text v-if="!editItemProductUnit">
                <v-spacer></v-spacer>
                <v-alert type="warning" prominent text>
                  คลิ๊ก!! เลือกรายการสินค้า
                </v-alert>
                <v-spacer></v-spacer>
              </v-card-text>
              <v-card-text v-if="editItemProductUnit">
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      label="รหัสภายใน"
                      v-model="itemProductUnit.product_unit_internal_code"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="รหัสบาร์โค้ด"
                      v-model="itemProductUnit.product_unit_barcode"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      label="จำนวนบรรจุ"
                      v-model="itemProductUnit.product_unit_quantity_number"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      label="หน่วยนับ"
                      v-model="itemProductUnit.unit.unit_name"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6"></v-col>
                  <v-col cols="3">
                    <v-alert
                      color="success"
                      dark
                      icon="mdi-plus"
                      border="left"
                      prominent
                    >
                      <b>วันที่บันทึกข้อมูล</b>
                      <v-divider></v-divider>
                      {{ itemProductUnit.dateCreate }}
                    </v-alert>
                  </v-col>
                  <v-col cols="3">
                    <v-alert
                      color="warning"
                      dark
                      icon="mdi-pencil"
                      border="left"
                      prominent
                    >
                      <b>วันที่แก้ไขข้อมูล (ล่าสุด)</b>
                      <v-divider></v-divider>
                      {{ itemProductUnit.dateUpdate }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="mt-9">
              <v-card-title primary-title>
                กำหนดราคาขายสินค้าจากต้นทุน
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text v-if="!editItemProductUnit">
                <v-spacer></v-spacer>
                <v-alert type="warning" prominent text>
                  คลิ๊ก!! เลือกรายการสินค้า
                </v-alert>
                <v-spacer></v-spacer>
              </v-card-text>
              <v-card-text v-if="editItemProductUnit">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="ราคาจากส่วนกลาง"
                      v-model="itemProductUnit.price_middle"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="เปอร์เซ็นส่วนลด"
                      v-model="itemProductUnit.percen_discount"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-01"
                          v-model="itemProductUnit.price_1"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-02"
                          v-model="itemProductUnit.price_2"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-03"
                          v-model="itemProductUnit.price_3"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-04"
                          v-model="itemProductUnit.price_4"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-05"
                          v-model="itemProductUnit.price_5"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-06"
                          v-model="itemProductUnit.price_6"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-07"
                          v-model="itemProductUnit.price_7"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-08"
                          v-model="itemProductUnit.price_8"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-09"
                          v-model="itemProductUnit.price_9"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-10"
                          v-model="itemProductUnit.price_10"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6"></v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="ห้ามขายราคาต่ำกว่า"
                      v-model="itemProductUnit.percen_low_limit"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="8"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogInsertProductUnit" persistent width="50%">
      <insert-product-unit
        :itemProductUnit.sync="itemProductUnit"
        :itemProduct.sync="itemProduct"
        @closeDialogInsertProductUnit="closeDialogInsertProductUnit"
        @getItemsProductUnitByProductId="getItemsProductUnitByProductId"
      ></insert-product-unit>
    </v-dialog>

    <v-dialog v-model="dialogUpdateProductUnit" persistent width="50%">
      <update-product-unit
        :itemProductUnit.sync="itemProductUnit"
        :itemProduct.sync="itemProduct"
        :dialogUpdateProductUnit.sync="dialogUpdateProductUnit"
        @closeDialogUpdateProductUnit="closeDialogUpdateProductUnit"
        @getItemsProductUnitByProductId="getItemsProductUnitByProductId"
      ></update-product-unit>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import insertProductUnit from "./insertProductUnit.vue";
import updateProductUnit from "./updateProductUnit.vue";

moment.locale("th");
export default {
  components: { insertProductUnit, updateProductUnit },
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
        {
          text: "รหัสภายใน",
          value: "product_unit_internal_code",
          sortable: false,
        },
        {
          text: "รหัสบาร์โค้ด",
          value: "product_unit_barcode",
          sortable: false,
        },
        {
          text: "จำนวนบรรจุ",
          value: "product_unit_quantity_number",
          sortable: false,
        },

        { text: "หน่วยนับ", value: "unit.unit_name", sortable: false },
      ],

      itemsProductUnit: [],

      itemProductUnit: {
        id: 0,
        product_unit_internal_code: null,
        product_unit_barcode: null,
        product_unit_name: this.itemProduct.product_name,
        product_unit_description: null,
        unit: null,
        product_unit_quantity_number: 0,
        product: null,
        price_middle: 0,
        percen_discount: 0,
        percen_low_limit: 0,
        price_1: 0,
        price_2: 0,
        price_3: 0,
        price_4: 0,
        price_5: 0,
        price_6: 0,
        price_7: 0,
        price_8: 0,
        price_9: 0,
        price_10: 0,
      },

      editItemProductUnit: false,

      dialogInsertProductUnit: false,
      dialogUpdateProductUnit: false,

      usedStatus: false,
      lengthStatus: false,
    };
  },

  watch: {
    itemProduct(val) {
      if (val) {
        this.getItemsProductUnitByProductId();
      }
    },
  },

  created() {
    this.getItemsProductUnitByProductId();
  },

  methods: {
    async getItemsProductUnitByProductId() {
      this.$axios
        .get(
          "/product-units?product=" +
            this.itemProduct.id +
            "&product_unit_active=true" +
            "&_sort=product_unit_quantity_number:ASC"
        )
        .then((res) => {
          console.log("getItemsProductUnitByProductId", res.data);
          this.itemsProductUnit = res.data;
          this.editItemProductUnit = false;
        });
    },

    async getItem($event, { item }) {
      this.itemProductUnit = item;
      this.editItemProductUnit = true;
      console.log("itemProductUnit", this.itemProductUnit);

      this.convertDate();
    },

    async convertDate() {
      this.itemProductUnit.dateCreate = moment(this.itemProductUnit.created_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");

      this.itemProductUnit.dateUpdate = moment(this.itemProductUnit.updated_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");
    },

    async resetItemProductUnit() {
      this.itemProductUnit = {
        id: 0,
        product_unit_internal_code: null,
        product_unit_barcode: null,
        product_unit_name: this.itemProduct.product_name,
        product_unit_description: null,
        unit: null,
        product_unit_quantity_number: 0,
        product: null,
        price_middle: 0,
        percen_discount: 0,
        percen_low_limit: 0,
        price_1: 0,
        price_2: 0,
        price_3: 0,
        price_4: 0,
        price_5: 0,
        price_6: 0,
        price_7: 0,
        price_8: 0,
        price_9: 0,
        price_10: 0,
      };
      this.editItemProductUnit = false;
    },

    async addProductUnit() {
      this.dialogInsertProductUnit = true;
      this.resetItemProductUnit();
    },

    async closeDialogInsertProductUnit() {
      this.dialogInsertProductUnit = false;
    },

    async editProductUnit() {
      if (this.editItemProductUnit == true) {
        this.dialogUpdateProductUnit = true;
      } else {
        this.alertChangeList();
      }
    },

    async closeDialogUpdateProductUnit() {
      this.dialogUpdateProductUnit = false;
      this.getItemsProductUnitByProductId();
    },

    async alertChangeList() {
      this.$swal.fire({
        icon: "warning",
        title: "เลือกรายการสินค้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async deleteProductUnit() {
      if (this.editItemProductUnit == true) {
        await this.checkUsedStatus();
        await this.checkDeleteLargeUnits();

        if (this.usedStatus == true) {
          this.alertDataHasBeenUsed();
        } else if (this.lengthStatus == true) {
          this.alertRemoveLargeUnitsFirst();
        } else {
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

              await this.destroyProductUnit();
            }
          });
        }
      } else {
        this.alertChangeList();
      }
    },

    async checkUsedStatus() {
      this.$axios
        .get("/received-lists?product_unit=" + this.itemsProductUnit.id)
        .then((res) => {
          if (res.data.length > 0) {
            this.usedStatus = true;
          } else {
            this.usedStatus = false;
          }
        });
    },

    async checkDeleteLargeUnits() {
      let index = this.itemsProductUnit.indexOf(this.itemProductUnit);
      console.log("index", index);
      if (index == this.itemsProductUnit.length - 1) {
        this.lengthStatus = false;
      } else {
        this.lengthStatus = true;
      }
    },

    async alertDataHasBeenUsed() {
      this.$swal.fire({
        title: "ไม่สามารถลบได้",
        text: "ข้อมูลสินค้านี้ มีการใช้งานในระบบแล้ว",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertRemoveLargeUnitsFirst() {
      this.$swal.fire({
        title: "ไม่สามารถลบได้",
        text: "กรุณาลบข้อมูลจากหน่วยใหญ่ก่อน",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async destroyProductUnit() {
      await this.$axios
        .put("/product-units/" + this.itemProductUnit.id, {
          product_unit_active: false,
        })
        .then((res) => {
          this.getItemsProductUnitByProductId();
          this.alertDeleteSuccess();
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

    async alertDeleteSuccess() {
      this.$swal({
        title: "ลบข้อมูลเรียบร้อยแล้ว",
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
