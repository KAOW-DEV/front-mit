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
                  v-model="productSearch"
                  dense
                  outlined
                  hide-details=""
                  autofocus
                  class="mr-2"
                  required
                ></v-text-field>
                <v-btn class="mx-1" type="submit" @click="typeSearchBarcode"
                  >ค้นหาจากบาร์โค้ด</v-btn
                >
                <v-btn class="mx-1" type="submit" @click="typeSearchName"
                  >ค้นหาจากชื่อ</v-btn
                >
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
                <card-product-unit
                  :itemProduct.sync="itemProduct"
                  :itemsProductUnit.sync="itemsProductUnit"
                  :editItem.sync="editItem"
                ></card-product-unit>
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

    <v-dialog v-model="dialogSearchProduct" persistent width="80vh">
      <card-dialog-search-product
        @closeDialogSearchProduct="closeDialogSearchProduct"
        :itemsProduct.sync="itemsProduct"
        :itemProduct.sync="itemProduct"
      ></card-dialog-search-product>
    </v-dialog>
  </div>
</template>

<script>
import CardDialogSearchProduct from "~/components/product/cardDialogSearchProduct.vue";
import cardProductDetail from "~/components/product/cardProductDetail.vue";
import CardProductUnit from "~/components/product/cardProductUnit.vue";
export default {
  components: { cardProductDetail, CardDialogSearchProduct, CardProductUnit },
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

      itemsProductUnit: [],

      itemProductBarcode: [],

      editItem: false,
      typeSearch: null,

      productSearch: null,
      dialogSearchProduct: false,

      itemsProduct: [],
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
      this.productSearch = null;
    },

    async searchProduct() {
      if (this.typeSearch == "ค้นหาจากบาร์โค้ด") {
        await this.$axios
          .get("/products?product_code=" + this.productSearch)
          .then((res) => {
            // console.log("product_code", res.data);
            // this.itemsGroup = res.data;
            if (res.data.length > 0) {
              this.editItem = true;
              this.itemsProduct = res.data;
              this.openDialogSearchProduct();
            } else {
              this.alertAddProduct();
            }
          });
      }

      if (this.typeSearch == "ค้นหาจากชื่อ") {
        await this.$axios
          .get("/products?product_name_containss=" + this.productSearch)
          .then((res) => {
            console.log("product_code", res.data);
            // this.itemsGroup = res.data;
            if (res.data.length > 0) {
              this.editItem = true;
              this.itemsProduct = res.data;
              this.openDialogSearchProduct();
            } else {
              this.alertAddProduct();
            }
          });
      }
    },

    async openDialogSearchProduct() {
      this.dialogSearchProduct = true;
    },

    async closeDialogSearchProduct() {
      this.dialogSearchProduct = false;
    },

    async alertAddProduct() {
      this.$swal({
        title: "ยังไม่มีสินค้านี้ในระบบ",
        text: "ต้องการเพิ่มสินค้าใหม่ ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then((result) => {
        if (result.isConfirmed) {
          this.newProduct();
        }
      });
    },

    async typeSearchBarcode() {
      this.typeSearch = "ค้นหาจากบาร์โค้ด";
    },

    async typeSearchName() {
      this.typeSearch = "ค้นหาจากชื่อ";
    },
  },
};
</script>

<style lang="scss" scoped></style>
