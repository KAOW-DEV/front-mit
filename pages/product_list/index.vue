<template>
  <div class="mt-2 mx-2">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="90"></v-progress-circular>
    </v-overlay>
    <v-card class="pa-2 ma-2" elevation="2">
      <searchProduct></searchProduct>
    </v-card>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <h4><v-icon left>mdi-format-list-bulleted</v-icon> รานการสินค้า</h4>
        <v-spacer>
        </v-spacer>
        <div class="mt-5">
          <v-switch
            label="รายละเอียดเพิ่มเติม"
            v-model="show_more_detail"
            @change="change_show_more_detail"
          ></v-switch>
        </div>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-data-table
          class="row-pointer"
            :headers="header_table"
            :items="list_product_data"
            @dblclick:row="open_dialog_product_detail"
          >
          <template>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>

    <!-- dialog  -->
    <v-dialog v-model="dialog_product_detail" width="1000" persistent>
      <v-card class="overflow-hidden">
        <v-toolbar flat color="primary" dark>
          <h3><v-icon left>mdi-note-text-outline</v-icon> ข้อมูลสินค้า</h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_product_detail = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-row>
          <v-col>
            <mainDetailProduct></mainDetailProduct>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import mainDetailProduct from "../../components/product_list/mainDetailProduct";
import searchProduct from "../../components/product_list/searchProduct.vue"
export default {
  components: {
    mainDetailProduct,
    searchProduct
  },
  data() {
    return {
      overlay: true,
      dialog_product_detail: true,

      // config
      show_more_detail: false,

      // table
      header_table: [],

      list_product_data: [],
    };
  },
  methods: {
    // dailog methods
    open_dialog_product_detail() {
      this.dialog_product_detail = true;
    },

    // get data
    async get_list_product() {
      await this.$axios.get("/products").then((res_product) => {
        console.log(res_product.data);
        this.list_product_data = res_product.data;
        this.overlay = false;
      });
    },

    // change methode
    change_show_more_detail() {
      if (this.show_more_detail == false) {
        this.header_table = [
          {
            text: "หมวดหมู่",
            value: "categoreis.category_name",
            sortable: false
          },
          {
            text: "กลุ่มสินค้า",
            value: "group.group_name",
            sortable: false
          },

          {
            text: "รายละเอียดสินค้า",
            value: "product_name",
          },
        ];
      } else {
        this.header_table = [];
      }
    },
  },
  created() {
    this.change_show_more_detail();
    this.get_list_product();
  },
};
</script>
<style>
.row-pointer tbody tr :hover {
  cursor: pointer;
}
</style>