<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        แก้ไขหน่วยซื้อ/ขาย
        <v-spacer></v-spacer>
        <v-btn
          icon
          color="error"
          @click="$emit('closeDialogUpdateProductUnit')"
          @focus="$refs.btnSave.$el.focus()"
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
                      @keydown.enter="$refs.barCode.focus()"
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
                      @keydown.enter="$refs.quantity.focus()"
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
                      @keydown.enter="$refs.unit.focus()"
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
                      @keydown.enter="$refs.price_middle.focus()"
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
                      ref="price_middle"
                      v-model="itemProductUnit.price_middle"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      required
                      @focus="$event.target.select()"
                      @keydown.enter="$refs.percen_discount.focus()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="เปอร์เซ็นส่วนลด"
                      ref="percen_discount"
                      v-model="itemProductUnit.percen_discount"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      required
                      @focus="$event.target.select()"
                      @keydown.enter="$refs.price_1.focus()"
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
                          ref="price_1"
                          v-model="itemProductUnit.price_1"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_2.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-02"
                          ref="price_2"
                          v-model="itemProductUnit.price_2"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_3.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-03"
                          ref="price_3"
                          v-model="itemProductUnit.price_3"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_4.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-04"
                          ref="price_4"
                          v-model="itemProductUnit.price_4"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_5.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-05"
                          ref="price_5"
                          v-model="itemProductUnit.price_5"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_6.focus()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-06"
                          ref="price_6"
                          v-model="itemProductUnit.price_6"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_7.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-07"
                          ref="price_7"
                          v-model="itemProductUnit.price_7"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_8.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-08"
                          ref="price_8"
                          v-model="itemProductUnit.price_8"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_9.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-09"
                          ref="price_9"
                          v-model="itemProductUnit.price_9"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.price_10.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย-10"
                          ref="price_10"
                          v-model="itemProductUnit.price_10"
                          type="number"
                          min="1"
                          dense
                          outlined
                          hide-details=""
                          required
                          @focus="$event.target.select()"
                          @keydown.enter="$refs.percen_low_limit.focus()"
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
                      ref="percen_low_limit"
                      v-model="itemProductUnit.percen_low_limit"
                      type="number"
                      min="1"
                      dense
                      outlined
                      hide-details=""
                      required
                      @focus="$event.target.select()"
                      @keydown.enter="$refs.btnSave.$el.focus()"
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
        <v-btn
          color="success"
          width="100"
          ref="btnSave"
          @keydown.stop.enter="updateProductUnit($event)"
          @click="updateProductUnit($event)"
          >บันทึก</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    "itemProduct",
    "itemProductUnit",
    "dialogUpdateProductUnit",
    "editItemProductUnit",
  ],
  data() {
    return {
      itemsUnit: [],
      internalcodeDuplicate: null,
      barcodeDuplicate: null,
    };
  },

  methods: {
    async getItemsUnit() {
      this.$axios
        .get("/units")
        .then((res) => {
          // console.log("getItemsUnit", res.data);
          this.itemsUnit = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async checkSave(e) {
      // console.log("itemProduct", this.itemProduct);
      // console.log("itemProductUnit", this.itemProductUnit);

      let checkResult = await this.$swal({
        title: "ต้องการบันทึกข้อมูล ใช่หรือไม่",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("closeDialogUpdateProductUnit");
          return true;
        } else {
          return false;
        }
      });

      return checkResult;
    },

    async updateProductUnit(e) {
      // console.log("e", e);
      // console.log("e.target", e.target);

      let checkSave = await this.checkSave(e);
      console.log("checkSave", checkSave);

      if (checkSave) {
        await this.$axios
          .put("/product-units/" + this.itemProductUnit.id, {
            product_unit_internal_code:
              this.itemProductUnit.product_unit_internal_code,
            product_unit_barcode: this.itemProductUnit.product_unit_barcode,
            product_unit_name: this.itemProductUnit.product_unit_name,
            product_unit_description:
              this.itemProductUnit.product_unit_description,
            unit: this.itemProductUnit.unit,
            product_unit_quantity_number:
              this.itemProductUnit.product_unit_quantity_number,
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
            this.alertDuplicate();
            this.$emit("update:dialogUpdateProductUnit", true);
            this.$emit("getItemsProductUnitByProductId");
          });
      }
    },

    async alertDuplicate() {
      this.$swal({
        title: "รหัสซ้ำ",
        text: "รหัสภายใน / รหัสบาร์โค้ด ซ้ำ!!",
        icon: "error",
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
  },

  mounted() {
    this.$refs.internalCode.focus();
  },

  updated() {},
};
</script>

<style lang="scss" scoped></style>
