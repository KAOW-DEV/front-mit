<template>
  <div class="mt-2">
    <v-card>
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
      dialog_product_detail: false,

      header_table: [
        {
          text: "รหัสสินค้า",
        },
      ],
    };
  },
  methods: {
    async get_list_stock() {
      await this.$axios.get("/products")
      .then(res_stock => {
        console.log(res_stock.data);
      })
    },
  },
  created() {
    this.get_list_stock();
  }
};
</script>
