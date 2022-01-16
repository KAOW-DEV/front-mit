<template>
  <div class="mt-2 mx-2">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="90"></v-progress-circular>
    </v-overlay>

    <v-card>
      <v-toolbar flat color="primary" dark>
        <h4><v-icon left>mdi-format-list-bulleted</v-icon> รานการสินค้า</h4>
        <v-spacer></v-spacer>
        <div class="mt-5">
          <v-switch label="รายละเอียดเพิ่มเติม" v-model="show_more_detail"></v-switch>
        </div>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-data-table :headers="header_table"></v-data-table>
        </v-col>
      </v-row>
    </v-card>

    <!-- dialog  -->
    <v-dialog v-model="dialog_product_detail">
      <v-card class="overflow-hidden">
        <v-toolbar flat color="primary" dark>
          <h3><v-icon left>mdi-note-text-outline</v-icon> ข้อมูลสินค้า</h3>
          <v-spacer></v-spacer>
          <v-btn icon><v-icon>mdi</v-icon></v-btn>
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
export default {
  components: {
    mainDetailProduct,
  },
  data() {
    return {
      overlay: true,
      dialog_product_detail: false,

      // config 
      show_more_detail: false,

      // table 
      header_table: [
        {
          text: "รหัสสินค้า",
        },
      ],

      list_product: [],
    };
  },
  methods: {
    async get_list_product() {
      await this.$axios.get("/products").then((res_product) => {
        this.list_product = res_product.data;
        this.overlay = false;
      });
    },
  },
  created() {
    this.get_list_product();
  },
};
</script>
