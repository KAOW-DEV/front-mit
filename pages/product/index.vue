<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              <v-text-field
                label="ค้นหา"
                id="searchProduct"
                ref="searchProduct"
                placeholder="ค้นหาจาก บาร์โค้ด / ชื่อสินค้า"
                v-model="searchProduct"
                outlined
                hide-details=""
                @keyup.enter="search"
                @focus="focusSearchProduct"
              ></v-text-field>
              <v-divider vertical class="mx-3"></v-divider>
              <v-btn color="primary" x-large @click="search">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card color="red">
            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="success"
              dark
              slider-color="yellow"
            >
              <v-tab href="#tab-1"> รายละเอียดหลัก </v-tab>
              <v-tab href="#tab-2" :disabled="!editItem"> หน่วยซื้อ/ขาย </v-tab>
              <v-tab href="#tab-3" :disabled="!editItem">
                พิมพ์บาร์โค้ดสินค้า
              </v-tab>

              <!-- tab-1 -->
              <v-tab-item value="tab-1">
                <product
                  :itemProduct.sync="itemProduct"
                  :editItem.sync="editItem"
                ></product>
              </v-tab-item>

              <!-- tab-2 -->
              <v-tab-item value="tab-2">
                <product-unit
                  :itemProduct.sync="itemProduct"
                  :editItem.sync="editItem"
                ></product-unit>
              </v-tab-item>

              <!-- tab-3 -->
              <v-tab-item value="tab-3"> </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogSearchProduct" persistent width="80%">
      <search-product
        :itemsProduct.sync="itemsProduct"
        :itemProduct.sync="itemProduct"
        :searchProduct.sync="searchProduct"
        :editItem.sync="editItem"
        @closeDialogSearchProduct="closeDialogSearchProduct"
      ></search-product>
    </v-dialog>
  </div>
</template>

<script>
import SearchProduct from "~/components/product_2/searchProduct.vue";
import Product from "~/components/product_2/product.vue";
import ProductUnit from "~/components/product_2/productUnit.vue";
export default {
  components: { Product, SearchProduct, ProductUnit },
  data() {
    return {
      itemProduct: {
        id: 0,
        product_code: null,
        product_name: null,
        group: null,
        sub_group: null,
        unit: null,
        supplier: null,
        product_quantity: 0,
        product_active: true,
        product_cost: 0,
        dateCreate: null,
        dateUpdate: null,
      },

      searchProduct: null,
      tab: "tab-1",
      editItem: false,
      itemsProduct: [],
      dialogSearchProduct: false,
    };
  },

  methods: {
    async search() {
      console.log("searchProduct", this.searchProduct);

      // document.getElementById("searchProduct").focus();
      // document.getElementById("searchProduct").select();

      if (this.searchProduct != null) {
        this.$axios
          .get("/product-units?product_unit_barcode=" + this.searchProduct)
          .then((res) => {
            // console.log("search", res.data);
            if (res.data.length > 0) {
              this.itemProduct = res.data[0].product;
              this.editItem = true;
            } else {
              this.$axios
                .get(
                  "/product-units?product_unit_name_contains=" +
                    this.searchProduct +
                    "&_sort=product_unit_name:ASC&_limit=-1"
                )
                .then((res) => {
                  if (res.data.length > 0) {
                    // console.log("itemsProduct", res.data);
                    this.itemsProduct = res.data;
                    this.dialogSearchProduct = true;
                    this.editItem = true;
                  } else {
                    this.alertNotProduct();
                  }
                });
            }
          });
      }
    },

    async focusSearchProduct() {
      document.getElementById("searchProduct").select();
    },

    // alert
    async alertNotProduct() {
      this.$swal({
        title: "ไม่พบข้อมูลสินค้าในระบบ",
        text: "ต้องการเพิ่มสินค้าใหม่ ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then((result) => {
        if (result.isConfirmed) {
          this.addProduct();
        }
      });
    },

    // add
    async addProduct() {
      this.editItem = false;
      this.resetItemProduct();
      this.tab = "tab-1";
    },

    async resetItemProduct() {
      this.itemProduct = {
        id: 0,
        product_code: null,
        product_name: null,
        group: null,
        sub_group: null,
        unit: null,
        supplier: null,
        product_quantity: 0,
        product_active: true,
        product_cost: 0,
        dateCreate: null,
        dateUpdate: null,
      };
    },

    async closeDialogSearchProduct() {
      this.dialogSearchProduct = false;
    },
  },

  created() {},

  mounted() {
    this.$refs.searchProduct.focus();

    console.log("1");
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 74) {
        e.preventDefault();
        return false;
      }
    });
  },

  updated() {},
};
</script>
<style lang="scss" scoped></style>
