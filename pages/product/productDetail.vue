<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="red--text">รายละเอียดสินค้า</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn color="success" class="float-end" @click="newProduct"
            >เพิ่มสินค้าใหม่</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <form @submit.prevent="searchProduct">
              <v-toolbar class="elevation-0">
                <v-text-field
                  label="รหัสสินค้า"
                  dense
                  outlined
                  hide-details=""
                  autofocus
                  class="mr-2"
                  required
                ></v-text-field>
                <v-btn class="mx-1" type="submit">ค้นหาจากบาร์โค้ด</v-btn>
                <v-btn class="mx-1" type="submit">ค้นหาจากชื่อ</v-btn>
              </v-toolbar>
            </form>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="tab" slider-color="yellow" fixed-tabs>
              <v-tab href="#tab-1"> รายละเอียดหลัก </v-tab>
              <v-tab href="#tab-2" :disabled="!editItem"> หน่วยซื้อ/ขาย </v-tab>
              <v-tab href="#tab-3" :disabled="!editItem"> ราคาขาย </v-tab>
              <v-tab href="#tab-4" :disabled="!editItem">
                พิมพ์บาร์โค้ดสินค้า
              </v-tab>

              <!-- tab-1 -->
              <v-tab-item value="tab-1">
                <card-product-detail
                  :itemProduct.sync="itemProduct"
                  :editItem.sync="editItem"
                ></card-product-detail>
              </v-tab-item>

              <!-- tab-2 -->
              <v-tab-item value="tab-2">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> หน่วยซื้อ/ขาย </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>

              <!-- tab-3 -->
              <v-tab-item value="tab-3">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> ราคาขาย </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>

              <!-- tab-4 -->
              <v-tab-item value="tab-4">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> พิมพ์บาร์โค้ดสินค้า </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cardProductDetail from "~/components/product/cardProductDetail.vue";
export default {
  components: { cardProductDetail },
  data() {
    return {
      tab: "tab-1",
      items: [
        { tab: "รายละเอียดหลัก", content: "รายละเอียดหลัก" },
        { tab: "หน่วยซื้อ/ขาย", content: "หน่วยซื้อ/ขาย" },
        { tab: "ราคาขาย", content: "ราคาขาย" },
        { tab: "พิมพ์บาร์โค้ดสินค้า", content: "พิมพ์บาร์โค้ดสินค้า" },
      ],

      itemProduct: {
        id: 0,
        product_code: null,
        product_name: null,
        group: {},
        sub_group: {},
        unit: {},
        supplier: null,
        product_quantity: 0,
        product_active: true,
      },

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
        product_unit: {},
      },

      itemProductBarcode: [],

      editItem: false,
    };
  },

  methods: {
    async resetItemProduct() {
      this.itemProduct = {
        id: 0,
        product_code: null,
        product_name: null,
        group: {},
        sub_group: {},
        unit: {},
        supplier: null,
        product_quantity: 0,
        product_active: true,
      };
    },

    async newProduct() {
      this.resetItemProduct();
      this.editItem = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
