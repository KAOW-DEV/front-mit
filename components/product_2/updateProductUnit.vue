<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          แก้ไขหน่วยซื้อ/ขาย
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="error"
            @click="$emit('closeDialogUpdateProductUnit')"
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
                        v-model="
                          itemProductUnit.product_price.product_price_middle
                        "
                        type="number"
                        min="1"
                        dense
                        outlined
                        hide-details=""
                        required
                        @focus="$event.target.select()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="เปอร์เซ็นส่วนลด"
                        v-model="
                          itemProductUnit.product_price.product_price_discount
                        "
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
                            v-model="
                              itemProductUnit.product_price.product_price_1
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_2
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_3
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_4
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_5
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_6
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_7
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_8
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_9
                            "
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
                            v-model="
                              itemProductUnit.product_price.product_price_10
                            "
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
                        v-model="
                          itemProductUnit.product_price.product_price_low_limit
                        "
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
          console.log("getItemsUnit", res.data);
          this.itemsUnit = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async checkSave() {
      console.log("itemProduct", this.itemProduct);
      console.log("itemProductUnit", this.itemProductUnit);

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
          this.$emit("closeDialogUpdateProductUnit");
          this.updateProductPrice();
        }
      });
    },

    async updateProductPrice() {
      await this.$axios
        .put("/product-prices/" + this.itemProductUnit.product_price.id, {
          product_price_middle:
            this.itemProductUnit.product_price.product_price_middle,
          product_price_discount:
            this.itemProductUnit.product_price.product_price_discount,
          product_price_1: this.itemProductUnit.product_price.product_price_1,
          product_price_2: this.itemProductUnit.product_price.product_price_2,
          product_price_3: this.itemProductUnit.product_price.product_price_3,
          product_price_4: this.itemProductUnit.product_price.product_price_4,
          product_price_5: this.itemProductUnit.product_price.product_price_5,
          product_price_6: this.itemProductUnit.product_price.product_price_6,
          product_price_7: this.itemProductUnit.product_price.product_price_7,
          product_price_8: this.itemProductUnit.product_price.product_price_8,
          product_price_9: this.itemProductUnit.product_price.product_price_9,
          product_price_10: this.itemProductUnit.product_price.product_price_10,
          product_price_low_limit:
            this.itemProductUnit.product_price.product_price_low_limit,
        })
        .then((res) => {
          this.updateProductUnit();
        });
    },

    async updateProductUnit() {
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
