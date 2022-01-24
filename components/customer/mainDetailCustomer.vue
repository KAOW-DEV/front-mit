<template>
  <div>
    <v-card class="overflow-hidden">
      <v-toolbar flat color="primary" dense dark>
        <h4>
          <v-icon left>mdi-card-account-details-outline</v-icon>ข้อมูลลูกค้า
        </h4>
        <v-spacer></v-spacer>
        <v-btn icon dark><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>

      <v-tabs v-model="tabSelect">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in tabItems" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabSelect">
        <v-tab-item>
          <detail-customer></detail-customer>
        </v-tab-item>
        <v-tab-item> 666 </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import detailCustomer from "./detailCustomer.vue";
export default {
  components: { detailCustomer },
  data() {
    return {
      // tab
      tabItems: ["ข้อมูลลูกค้า", "วงเงินเครดิต"],
      tabSelect: null,
    };
  },
};
</script>
