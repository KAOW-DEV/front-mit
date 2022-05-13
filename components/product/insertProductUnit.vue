<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          เพิ่มหน่วยซื้อ/ขาย
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="error"
            @click="$emit('closeDialogInsertProductUnit')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-card>
                <v-card-title primary-title> รายละเอียดสินค้า </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        autofocus
                        label="รหัสภายใน"
                        ref="internalCode"
                        id="internalCode"
                        v-model="itemProductUnit.product_unit_internal_code"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="รหัสบาร์โค้ด"
                        ref="barCode"
                        v-model="itemProductUnit.product_unit_barcode"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="จำนวนบรรจุ"
                        ref="quantity"
                        v-model="itemProductUnit.product_unit_quantity_number"
                        type="number"
                        min="1"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
                        :readonly="!editItemUnit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete
                        label="หน่วยนับ"
                        ref="unit"
                        :items="itemsUnit"
                        item-text="unit_name"
                        item-value="id"
                        return-object
                        v-model="itemProductUnit.unit"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
                        :readonly="!editItemUnit"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card>
                <v-card-title primary-title>
                  กำหนดราคาขายสินค้าจากต้นทุน
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
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
                        required
                        @focus="$event.target.select()"
                        @keydown.stop.enter="$refs.percen_discount.focus()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="เปอร์เซ็นส่วนลด"
                        ref="percen_discount"
                        v-model="itemProductUnit.percen_discount"
                        type="number"
                        min="0"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                            required
                            @focus="$event.target.select()"
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
                        required
                        @focus="$event.target.select()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" width="100" type="submit">บันทึก</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  props: ["itemProduct", "itemProductUnit"],
  data() {
    return {
      itemsUnit: [],
      internalcodeDuplicate: null,
      barcodeDuplicate: null,

      editItemUnit: false,
    };
  },

  watch: {
    itemProductUnit(val) {
      if (val) {
        this.checkEditItemUnit();
      }
    },
  },

  methods: {
    async checkEditItemUnit() {
      await this.$axios
        .get("/product-units?product=" + this.itemProduct.id)
        .then((res) => {
          console.log("checkFirtItemProductUnit", res.data);

          if (res.data.length > 0) {
            this.editItemUnit = true;
          } else {
            this.itemProductUnit.product_unit_quantity_number = 1;
            this.itemProductUnit.unit = this.itemProduct.unit;
            this.editItemUnit = false;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });

      // console.log("editItemUnit", this.editItemUnit);
    },

    async getItemsUnit() {
      this.$axios
        .get("/units")
        .then((res) => {
          console.log("getItemsUnit", res.data);
          this.itemsUnit = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async checkInternalcodeDuplicate() {
      let check = await this.$axios
        .get(
          "/product-units?product_unit_internal_code=" +
            this.itemProductUnit.product_unit_internal_code
        )
        .then((res) => {
          // console.log("checkInternalcodeDuplicate", res.data);
          if (res.data.length > 0) {
            return true;
          } else {
            return false;
          }
        });

      return check;
    },

    async checkBarcodeDuplicate() {
      let check = await this.$axios
        .get(
          "/product-units?product_unit_barcode=" +
            this.itemProductUnit.product_unit_barcode
        )
        .then((res) => {
          // console.log("checkBarcodeDuplicate", res.data);
          if (res.data.length > 0) {
            return true;
          } else {
            return false;
          }
        });

      return check;
    },

    async alertInternalcodeDuplicate() {
      this.$swal({
        title: "รหัสภายใน ซ้ำ!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertBarcodeDuplicate() {
      this.$swal({
        title: "รหัสบาร์โค้ด ซ้ำ!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async checkSave() {
      // console.log("itemProduct", this.itemProduct);
      // console.log("itemProductUnit", this.itemProductUnit);

      let internalcodeDuplicate = await this.checkInternalcodeDuplicate();
      let barcodeDuplicate = await this.checkBarcodeDuplicate();

      if (internalcodeDuplicate == true) {
        this.alertInternalcodeDuplicate();
        return;
      } else if (barcodeDuplicate == true) {
        this.alertBarcodeDuplicate();
        return;
      } else {
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
            this.$emit("closeDialogInsertProductUnit");
            this.insertProductUnit();
          }
        });
      }
    },

    async insertProductUnit() {
      await this.$axios
        .post("/product-units", {
          product_unit_internal_code:
            this.itemProductUnit.product_unit_internal_code,
          product_unit_barcode: this.itemProductUnit.product_unit_barcode,
          product_unit_name: this.itemProductUnit.product_unit_name,
          product_unit_description:
            this.itemProductUnit.product_unit_description,
          unit: this.itemProductUnit.unit,
          product_unit_quantity_number:
            this.itemProductUnit.product_unit_quantity_number,
          product: this.itemProduct.id,
          price_middle: this.itemProductUnit.price_middle,
          percen_discount: this.itemProductUnit.percen_discount,
          percen_low_limit: this.itemProductUnit.percen_low_limit,
          price_1: this.itemProductUnit.price_1,
          price_2: this.itemProductUnit.price_2,
          price_3: this.itemProductUnit.price_3,
          price_4: this.itemProductUnit.price_4,
          price_5: this.itemProductUnit.price_5,
          price_6: this.itemProductUnit.price_6,
          price_7: this.itemProductUnit.price_7,
          price_8: this.itemProductUnit.price_8,
          price_9: this.itemProductUnit.price_9,
          price_10: this.itemProductUnit.price_10,
        })
        .then((res) => {
          console.log("itemProductUnit", res.data);
          //   this.itemsUnit = res.data;
          this.$emit("getItemsProductUnitByProductId");
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

  created() {
    this.getItemsUnit();
    this.checkEditItemUnit();
  },

  mounted() {
    this.$refs.internalCode.focus();
  },

  updated() {},
};
</script>

<style lang="scss" scoped>
</style>
