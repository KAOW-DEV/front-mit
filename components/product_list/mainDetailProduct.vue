<template>
  <div>
    <v-card class="mt-2" flat>
      <v-tabs v-model="select_tabs" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in item_taps" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="select_tabs">
        <v-tab-item>
          <detailProduct></detailProduct>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import detailProduct from "../../components/product_list/detailProduct";
export default {
  components: {
    detailProduct,
  },
  data() {
    return {
      base_api: process.env.baseUrl,
      select_tabs: null,

      item_taps: ["รายละเอียดสินค้า", "หน่วยซื้อขาย"],
    };
  },
};
</script>
