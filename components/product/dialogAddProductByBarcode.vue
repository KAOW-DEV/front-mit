<template>
  <div>
    <v-dialog v-model="dialog" persistent width="50vh">
      <v-card>
        <v-card-title primary-title>
          ยิงบาร์โค้ด
          <v-spacer></v-spacer>
          <!-- <v-btn color="error" @click="$emit('update:dialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                autofocus
                label="รหัสบาร์โค้ด"
                ref="barcode"
                v-model="barcode"
                outlined
                hide-details=""
                @focus="$event.target.select()"
                @keydown.enter.prevent="getItemProduct"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="จำนวน"
                ref="quantity"
                v-model="quantity"
                type="number"
                outlined
                hide-details=""
                @focus="$event.target.select()"
                @keyup.enter.prevent="$refs.barcode.focus()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="$emit('update:dialog', false)">
            ปิด (Esc)
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialog", "itemSellList", "itemsSellList", "itemCustomer"],
  data() {
    return {
      barcode: null,
      quantity: 1,

      itemProduct: null,
    };
  },

  methods: {
    async getItemProduct() {
      if (this.barcode) {
        let itemProduct = await this.getItemProductByBarcode();

        if (itemProduct) {
          this.itemProduct = itemProduct;
          await this.autoInputItemProduct();
          await this.save();
        } else {
          this.alertNotData();
        }
      }
    },

    async getItemProductByBarcode() {
      let item = await this.$axios
        .get("/product-units?product_unit_barcode=" + this.barcode)
        .then((res) => {
          //   console.log("getItemProductByBarcode", res.data);
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

    async autoInputItemProduct() {
      this.itemSellList.product = this.itemProduct.product;
      this.itemSellList.product_unit = this.itemProduct;
      this.itemSellList.product_barcode = this.itemProduct.product_unit_barcode;
      this.itemSellList.product_internal_code =
        this.itemProduct.product_unit_internal_code;
      this.itemSellList.product_name = this.itemProduct.product_unit_name;
      this.itemSellList.product_unit_name = this.itemProduct.unit.unit_name;

      this.itemSellList.quantity = this.quantity;
      this.itemSellList.price = await this.getPrice();
      this.itemSellList.price_net = this.itemSellList.price;
      this.itemSellList.price_sum = Number(
        parseFloat(this.itemSellList.price) * parseFloat(this.quantity)
      ).toFixed();
      this.itemSellList.full_price = Number(this.itemSellList.price).toFixed(2);
      this.itemSellList.discount_percen = Number(
        this.itemProduct.percen_discount
      ).toFixed(2);
      this.itemSellList.base_on = Number(this.itemProduct.price_middle).toFixed(
        2
      );
      this.itemSellList.adjus_table = Number(
        (parseFloat(this.itemProduct.percen_discount) / 100) *
          parseFloat(this.itemProduct.price_middle)
      ).toFixed(2);
      this.itemSellList.limit_accept = Number(
        parseFloat(this.itemProduct.price_middle) -
          (parseFloat(this.itemProduct.percen_low_limit) / 100) *
            parseFloat(this.itemProduct.price_middle)
      ).toFixed(2);
      this.itemSellList.customer_price_level = this.itemCustomer.price_level;

      console.log("itemCustomer", this.itemCustomer);
      console.log("itemSellList", this.itemSellList);
    },

    async getPrice() {
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

    async save() {
      let item = await this.checkDuplicateProduct();
      console.log("item", item);

      if (item) {
        let index = this.itemsSellList.indexOf(item);
        //   console.log("index", index);

        let quantityOld = this.itemsSellList[index].quantity;
        //   console.log("quantityOld", quantityOld);

        let quantity = this.itemSellList.quantity;
        //   console.log("quantity", quantity);

        this.itemSellList.quantity = Number(
          parseInt(quantityOld) + parseInt(quantity)
        ).toFixed();

        this.itemSellList.price_sum = Number(
          parseFloat(this.itemSellList.price_net) *
            parseFloat(this.itemSellList.quantity)
        ).toFixed(2);

        this.itemsSellList.splice(index, 1, this.itemSellList);
        this.alertPushSuccess();
        this.$emit("update:itemsSellList", this.itemsSellList);
        this.$emit("resetItemSellList");

        // console.log("item", this.item);
        // console.log("itemsReceivedList", this.itemsReceivedList);
      } else {
        console.log("a");

        this.itemsSellList.push(this.itemSellList);
        this.alertPushSuccess();
        this.$emit("update:itemsSellList", this.itemsSellList);
        this.$emit("resetItemSellList");
      }
    },

    async alertPushSuccess() {
      await this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "เพิ่มรายการ เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async checkDuplicateProduct() {
      if (this.itemsSellList.length > 0) {
        // grab the Array item which matchs the id "2"
        let productUnitId = this.itemProduct.id;
        // console.log("productUnitId", productUnitId);
        let item = this.itemsSellList.find(
          (item) => item.product_unit.id === productUnitId
        );
        return item;
      } else {
        return false;
      }
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

    async getEvent(e) {
      if (this.dialog) {
        if (e.keyCode == 74) {
          e.preventDefault();
        } else if (e.keyCode == 27) {
          e.preventDefault();
          this.$emit("update:dialog", false);
        }
      }
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

<style lang="scss" scoped>
</style>