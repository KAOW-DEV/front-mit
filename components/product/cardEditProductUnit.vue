<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-toolbar color="warning" dark class="elevation-0">
          แก้ไขหน่วยซื้อ/ขาย
          <v-spacer></v-spacer>
          <v-btn icon dark @click="$emit('closeDialogEditProductUnit')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="รหัสภายใน"
                      v-model="itemProductUnit.product_unit_internal_code"
                      dense
                      outlined
                      hide-details=""
                      required
                      autofocus
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="รหัสบาร์โค้ด"
                      v-model="itemProductUnit.product_unit_barcode"
                      dense
                      outlined
                      hide-details=""
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="รายละเอียด(ย่อ)"
                      v-model="itemProductUnit.product_unit_name"
                      dense
                      outlined
                      hide-details=""
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="รายละเอียดบรรจุ"
                      v-model="itemProductUnit.product_unit_description"
                      dense
                      outlined
                      required
                      hide-details=""
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      label="หน่วยนับ"
                      v-model="itemProductUnit.unit"
                      :items="itemsUnit"
                      item-text="unit_name"
                      item-value="id"
                      return-object
                      dense
                      outlined
                      hide-details=""
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="จำนวนบรรจุ"
                      v-model="itemProductUnit.product_unit_quantity_number"
                      dense
                      outlined
                      hide-details=""
                      required
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="ราคาตั้งจากส่วนกลาง"
                      v-model="
                        itemProductUnit.product_price.product_price_middle
                      "
                      dense
                      outlined
                      hide-details=""
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="เปอร์เซ็นส่วนลด"
                      v-model="
                        itemProductUnit.product_price.product_price_discount
                      "
                      dense
                      outlined
                      hide-details=""
                      type="number"
                      min="0"
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
                          label="ราคาขาย - 01"
                          v-model="
                            itemProductUnit.product_price.product_price_1
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 02"
                          v-model="
                            itemProductUnit.product_price.product_price_2
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 03"
                          v-model="
                            itemProductUnit.product_price.product_price_3
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 04"
                          v-model="
                            itemProductUnit.product_price.product_price_4
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 05"
                          v-model="
                            itemProductUnit.product_price.product_price_5
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 06"
                          v-model="
                            itemProductUnit.product_price.product_price_6
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 07"
                          v-model="
                            itemProductUnit.product_price.product_price_7
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 08"
                          v-model="
                            itemProductUnit.product_price.product_price_8
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 09"
                          v-model="
                            itemProductUnit.product_price.product_price_9
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="ราคาขาย - 10"
                          v-model="
                            itemProductUnit.product_price.product_price_10
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-divider></v-divider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="ห้ามขายราคาต่ำกว่า"
                          v-model="
                            itemProductUnit.product_price
                              .product_price_low_limit
                          "
                          dense
                          outlined
                          hide-details=""
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" class="ma-3" type="submit">
            <v-icon>mdi-content-save</v-icon>
            บันทึก</v-btn
          >
          <v-btn
            color="red"
            class="ma-3"
            dark
            @click="$emit('closeDialogEditProductUnit')"
            ><v-icon>mdi-close</v-icon>ยกเลิก</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  props: ["itemProduct", "itemProductUnit", "dialogEditProductUnit"],

  data() {
    return {
      itemsUnit: [],
      internalcodeDuplicate: null,
      barcodeDuplicate: null,
    };
  },

  created() {
    this.getItemsUnit();
    console.log("itemProduct", this.itemProduct);
  },

  methods: {
    async getItemsUnit() {
      await this.$axios.get("/units").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsUnit = res.data;
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
          this.$emit("closeDialogEditProductUnit");
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
          console.log("itemProductPrice", res.data);
          //   this.itemsUnit = res.data;
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
          product: this.itemProduct.id,
          product_price: this.itemProductUnit.product_price.id,
        })
        .then((res) => {
          console.log("itemProductUnit", res.data);
          //   this.itemsUnit = res.data;

          this.$emit("getItemsProductUnit");
          this.$emit("resetText");
          this.alertSuccess();
        })
        .catch((error) => {
          this.$emit("update:dialogEditProductUnit", true);
          this.alertDuplicate();
          this.$emit("getItemsProductUnit");
          this.$emit("resetText");
        });
    },

    async alertDuplicate() {
      this.$swal({
        title: "รหัสซ้ำ!",
        text: "รหัสภายใน หรือ รหัสบาร์โค้ด ซ้ำ!!",
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
};
</script>

<style lang="scss" scoped></style>
