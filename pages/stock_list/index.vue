<template>
  <div class="mt-2">
    <!-- <mainDetailProduct></mainDetailProduct> -->
    <v-card>
      <v-row>
        <v-col>
          <v-data-table :headers="header_table"></v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import mainDetailProduct from "../../components/stock_list/mainDetailProduct";
export default {
  components: {
    mainDetailProduct,
  },
  data() {
    return {
      
      header_table: [
        {
          text: "รหัสสินค้า"
        }
      ]
    }
  }
};
</script>
