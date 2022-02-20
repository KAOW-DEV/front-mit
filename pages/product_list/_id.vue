<template>
  <!-- <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2> -->
      <v-card class="pa-2 ma-2 overflow-hidden">
        <v-toolbar flat color="primary" dark>
          <h3><v-icon left>mdi-note-text-outline</v-icon> ข้อมูลสินค้า</h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_product_detail = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-row class="pa-5">
          <v-col>
            <productListUnit></productListUnit>
          </v-col>
        </v-row>
      </v-card>
    <!-- </v-flex>
  </v-layout> -->
</template>

<script>
import productListUnit from "../../components/product_list/productListUnit.vue"
export default {
  components: {
    productListUnit
  },
  data() {
    return {
    }
  },

  }
</script>

<style>

</style>