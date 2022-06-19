<template>
  <div>
    <v-dialog v-model="dialog" persistent width="50%">
      <v-card>
        <v-card-title primary-title>
          {{ formTitle }}
          <v-spacer></v-spacer>
          <!-- <v-btn color="error" @click="$emit('update:dialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :autofocus="!editItem"
                v-model="item.product_barcode"
                label="รหัสบาร์โค้ดสินค้า"
                ref="product_barcode"
                append-icon="mdi-magnify"
                dense
                outlined
                hide-details=""
                @focus="$event.target.select()"
                @keydown.enter.prevent="searchProduct"
                :disabled="editItem"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="item.product_internal_code"
                label="รหัสสินค้า (ภายใน)"
                ref="product_internal_code"
                dense
                outlined
                hide-details=""
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.product_name"
                label="ชื่อ/รายละเอียดสินค้า"
                ref="product_name"
                dense
                outlined
                hide-details=""
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="item.product_unit_name"
                label="หน่วยนับสินค้า"
                ref="product_unit_name"
                dense
                outlined
                hide-details=""
                disabled
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.quantity"
                    label="จำนวน/Qty"
                    append-icon="mdi-pencil"
                    ref="quantity"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.price.focus()"
                    @keyup="calculator"
                    :autofocus="editItem"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.price"
                    label="ราคาขาย/หน่วย"
                    append-icon="mdi-pencil"
                    ref="price"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.percen_reduce.focus()"
                    @keyup="calculator"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.percen_reduce"
                    label="ส่วนลด (%)"
                    append-icon="mdi-pencil"
                    ref="percen_reduce"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.money_reduce.focus()"
                    @keyup="calculator"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.percen_reduce_money"
                    label=""
                    ref="percen_reduce_money"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.money_reduce"
                    label="ส่วนลด (บาท)"
                    append-icon="mdi-pencil"
                    ref="money_reduce"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.percen_plus.focus()"
                    @keyup="calculator"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.percen_plus"
                    label="บวกเพิ่ม (%)"
                    append-icon="mdi-pencil"
                    ref="percen_plus"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.money_plus.focus()"
                    @keyup="calculator"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.percen_plus_money"
                    label=""
                    ref="percen_plus_money"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.money_plus"
                    label="บวกเพิ่ม (บาท)"
                    append-icon="mdi-pencil"
                    ref="money_plus"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    @focus="$event.target.select()"
                    @keydown.enter.prevent="$refs.btnSave.$el.focus()"
                    @keyup="calculator"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.price_net"
                    label="ราคาเปิดบิลสุทธิ/หน่วย"
                    ref="price_net"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.price_sum"
                    label="จำนวนเงินรวม"
                    ref="price_sum"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="6"
              v-if="$nuxt.$auth.$state.user.role.name == 'Manager'"
            >
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.full_price"
                    label="Full Price"
                    ref="full_price"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.discount_percen"
                    label="Discount (%)"
                    ref="discount_percen"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.base_on"
                    label="Base ON"
                    ref="base_on"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.adjus_table"
                    label="Adjustable"
                    ref="adjus_table"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.limit_accept"
                    label="Limit Accept"
                    ref="limit_accept"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.customer_price_level"
                    label="Customer Type"
                    ref="customer_price_level"
                    dense
                    outlined
                    hide-details=""
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn block color="primary"> Check Cost </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-btn width="150" color="success" ref="btnSave" @click="save">
            บันทึก (F10)
          </v-btn>
          <v-btn
            width="150"
            color="warning"
            @click="clearForm"
            v-if="!editItem"
          >
            เคลียร์ฟอร์ม
          </v-btn>
          <v-btn
            width="150"
            color="error"
            @click="$emit('update:dialog', false)"
          >
            ปิด
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-dialog>

    <dialog-search-product
      :dialog.sync="dialogSearchProduct"
      :items.sync="itemsProduct"
      :item.sync="itemProduct"
      :search.sync="item.product_barcode"
    ></dialog-search-product>
  </div>
</template>

<script>
import dialogSearchProduct from "../product/dialogSearchProduct.vue";
export default {
  components: { dialogSearchProduct },
  props: ["items", "item", "editItem", "dialog", "itemCustomer"],
  data() {
    return {
      itemsProduct: [],
      itemProduct: null,

      dialogSearchProduct: false,
    };
  },

  methods: {
    async calculator() {
      let qty = this.item.quantity;
      let p = this.item.price;
      let pr = this.item.percen_reduce;
      let prm = this.item.percen_reduce_money;
      let mr = this.item.money_reduce;
      let pp = this.item.percen_plus;
      let ppm = this.item.percen_plus_money;
      let mp = this.item.money_plus;
      let pn = this.item.price_net;
      let ps = this.item.price_sum;

      if (qty) {
        ps = Number(parseFloat(pn) * parseFloat(qty)).toFixed(2);
      }

      //   if (p) {
      //     if (p < this.item.limit_accept) {
      //       p = this.item.limit_accept;
      //     }
      //   }

      if (pr) {
        prm = Number((parseFloat(p) * parseFloat(pr)) / 100).toFixed(2);
      }

      if (pp) {
        ppm = Number((parseFloat(p) * parseFloat(pp)) / 100).toFixed(2);
      }

      pn = Number(
        parseFloat(p) -
          (parseFloat(prm) + parseFloat(mr)) +
          (parseFloat(ppm) + parseFloat(mp))
      ).toFixed(2);

      ps = Number(parseFloat(pn) * parseFloat(qty)).toFixed(2);

      this.item.percen_reduce_money = prm;
      this.item.percen_plus_money = ppm;
      this.item.price_net = pn;
      this.item.price_sum = ps;
    },

    async searchProduct() {
      if (this.item.product_barcode) {
        let itemProduct = await this.getItemProductByBarcode();

        if (itemProduct) {
          this.itemProduct = itemProduct;
          this.autoInputItemProduct();
        } else {
          this.getItemProductByName();
        }
      }
    },

    async getItemProductByBarcode() {
      let item = await this.$axios
        .get("/product-units?product_unit_barcode=" + this.item.product_barcode)
        .then((res) => {
          // console.log("getItemProductByBarcode", res.data);
          if (res.data.length > 0) {
            return res.data[0];
          } else {
            return false;
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.alertError();
        });
      return item;
    },

    async getItemProductByName() {
      await this.$axios
        .get(
          "/product-units?product_unit_name_containss=" +
            this.item.product_barcode +
            "&_sort=product_unit_name:ASC&_limit=-1"
        )
        .then((res) => {
          if (res.data.length > 0) {
            this.itemsProduct = res.data;
            this.dialogSearchProduct = true;
          } else {
            this.alertNotData();
            this.clearForm();
          }
        })
        .catch((err) => {
          this.alertError();
        });
    },

    async autoInputItemProduct() {
      this.item.product = this.itemProduct.product;
      this.item.product_unit = this.itemProduct;
      this.item.product_barcode = this.itemProduct.product_unit_barcode;
      this.item.product_internal_code =
        this.itemProduct.product_unit_internal_code;
      this.item.product_name = this.itemProduct.product_unit_name;
      this.item.product_unit_name = this.itemProduct.unit.unit_name;

      this.item.price = await this.getPrice();
      this.item.full_price = Number(this.item.price).toFixed(2);
      this.item.discount_percen = Number(
        this.itemProduct.percen_discount
      ).toFixed(2);
      this.item.base_on = Number(
        parseFloat(this.itemProduct.price_middle) -
          parseFloat(
            (parseFloat(this.itemProduct.price_middle) *
              parseFloat(this.itemProduct.percen_discount)) /
              100
          )
      ).toFixed(2);
      this.item.adjus_table = await this.getJusaTable();
      this.item.limit_accept = Number(
        parseFloat(this.itemProduct.price_middle) -
          (parseFloat(this.itemProduct.percen_low_limit) / 100) *
            parseFloat(this.itemProduct.price_middle)
      ).toFixed(2);
      this.item.customer_price_level = this.itemCustomer.price_level;

      // console.log("itemCustomer", this.itemCustomer);
      // console.log("item", this.item);

      this.$nextTick(() => {
        this.$refs.quantity.focus();
      });
    },

    async getPrice() {
      
      
      let price = 0;

      if (this.itemCustomer.price_level == "01") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_1) / 100
            );
      } else if (this.itemCustomer.price_level == "02") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_2) / 100
            );
      } else if (this.itemCustomer.price_level == "03") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_3) / 100
            );
      } else if (this.itemCustomer.price_level == "04") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_4) / 100
            );
      } else if (this.itemCustomer.price_level == "05") {
        price = 200 * 14
        
         
      } else if (this.itemCustomer.price_level == "06") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_6) / 100
            );
      } else if (this.itemCustomer.price_level == "07") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_7) / 100
            );
      } else if (this.itemCustomer.price_level == "08") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_8) / 100
            );
      } else if (this.itemCustomer.price_level == "09") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_9) / 100
            );
      } else if (this.itemCustomer.price_level == "10") {
        price =
          parseFloat(this.itemProduct.price_middle) -
          parseFloat(this.itemProduct.price_middle) *
            parseFloat(
              parseFloat(this.itemProduct.percen_discount) +
                parseFloat(this.itemProduct.price_10) / 100
            );
      }

      return Number(price).toFixed(2);
    },

    async getJusaTable() {
      let price = 0;

      if (this.itemCustomer.price_level == "01") {
        price = this.itemProduct.price_1;
      } else if (this.itemCustomer.price_level == "02") {
        price = this.itemProduct.price_2;
      } else if (this.itemCustomer.price_level == "03") {
        price = this.itemProduct.price_3;
      } else if (this.itemCustomer.price_level == "04") {
        price = this.itemProduct.price_4;
      } else if (this.itemCustomer.price_level == "05") {
        price = this.itemProduct.price_5;
      } else if (this.itemCustomer.price_level == "06") {
        price = this.itemProduct.price_6;
      } else if (this.itemCustomer.price_level == "07") {
        price = this.itemProduct.price_7;
      } else if (this.itemCustomer.price_level == "08") {
        price = this.itemProduct.price_8;
      } else if (this.itemCustomer.price_level == "09") {
        price = this.itemProduct.price_9;
      } else if (this.itemCustomer.price_level == "10") {
        price = this.itemProduct.price_10;
      }

      return Number(price).toFixed(2);
    },

    async clearForm() {
      this.$emit("resetItemSellList");
      this.$nextTick(() => {
        this.$refs.product_barcode.focus();
      });
    },

    // alert
    async alertSuccess() {
      this.$swal({
        title: "บันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertEditSuccess() {
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "แก้ไขรายการ เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertError() {
      this.$swal({
        title: "เกิดข้อผิดพลาด",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertNotData() {
      this.$swal({
        title: "ไม่พบข้อมูล",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertOverLimit() {
      this.$swal({
        title: "ราคาต่ำสุดที่ขายได้\n" + this.item.limit_accept + " บาท",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertQtyNull() {
      this.$swal({
        title: "กรุณาระบุจำนวน",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    // save
    async save() {
      let chkValidate = await this.checkValidate();
      // console.log("chkValidate", chkValidate);

      if (chkValidate) {
        if (!this.editItem) {
          let item = await this.checkDuplicateProduct();
          // console.log("item", item);

          if (item) {
            let index = this.items.indexOf(item);
            //   console.log("index", index);

            let quantityOld = this.items[index].quantity;
            //   console.log("quantityOld", quantityOld);

            let quantity = this.item.quantity;
            //   console.log("quantity", quantity);

            this.item.quantity = Number(
              parseInt(quantityOld) + parseInt(quantity)
            ).toFixed();

            this.item.price_sum = Number(
              parseFloat(this.item.price_net) * parseFloat(this.item.quantity)
            ).toFixed(2);

            this.items.splice(index, 1, this.item);
            this.alertPushSuccess();
            this.$emit("update:items", this.items);
            this.$emit("resetItemSellList");

            // console.log("item", this.item);
            // console.log("itemsReceivedList", this.itemsReceivedList);
          } else {
            this.items.push(this.item);
            this.alertPushSuccess();
            this.$emit("update:items", this.items);
            this.$emit("resetItemSellList");
          }
        } else {
          this.alertEditSuccess();
          // this.$emit("resetItemSellList");
          this.$emit("update:dialog", false);
        }
      }
    },

    async checkValidate() {
      if (!this.item.product) {
        this.clearForm();
        this.$refs.product_barcode.focus();
        this.alertNotData();
        return false;
      }

      if (!this.item.quantity) {
        this.item.quantity = 0;
        this.$refs.quantity.focus();
        await this.alertQtyNull();
        return false;
      }

      if (this.item.price < this.item.limit_accept) {
        this.item.price = this.item.limit_accept;
        this.$refs.price.focus();
        this.alertOverLimit();
        return false;
      }

      if (!this.item.percen_reduce) {
        this.item.percen_reduce = 0;
      }
      if (!this.item.money_reduce) {
        this.item.money_reduce = 0;
      }
      if (!this.item.percen_plus) {
        this.item.percen_plus = 0;
      }
      if (!this.item.money_plus) {
        this.item.money_plus = 0;
      }

      await this.calculator();
      return true;
    },

    async checkDuplicateProduct() {
      if (this.items.length > 0) {
        // grab the Array item which matchs the id "2"
        let productUnitId = this.itemProduct.id;
        // console.log("productUnitId", productUnitId);
        let item = this.items.find(
          (item) => item.product_unit.id === productUnitId
        );
        return item;
      } else {
        return false;
      }
    },

    async alertPushSuccess() {
      await this.$refs.product_barcode.focus();

      await this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "เพิ่มรายการ เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async getEvent(e) {
      //   console.log("e", e);
      //   if (e.keyCode == 27) {
      //     e.preventDefault();
      //     this.$emit("update:dialog", false);
      //   } else

      if (this.dialog) {
        if (e.keyCode == 74) {
          e.preventDefault();
        } else if (e.keyCode == 121) {
          e.preventDefault();
          this.save();
        }
      }
    },
  },

  watch: {
    itemProduct(val) {
      if (val) {
        this.autoInputItemProduct();
      }
    },
  },

  computed: {
    formTitle() {
      return this.editItem === false ? "เพิ่ม" : "แก้ไข";
    },
  },

  created() {
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped></style>
