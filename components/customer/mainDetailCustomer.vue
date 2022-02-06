<template>
  <div>
    <v-card class="overflow-hidden">
      <v-toolbar flat color="primary" dense dark>
        <h4>
          <v-icon left>mdi-card-account-details-outline</v-icon>ข้อมูลลูกค้า
        </h4>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>

      <v-tabs v-model="tabSelect">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in tabItems" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabSelect">
        <v-tab-item>
          <detail-customer
            :detail_customer.sync="detail_customer"
            @save="saveCustomer"
          ></detail-customer>
        </v-tab-item>
        <v-tab-item>
          <credit-customer></credit-customer>
        </v-tab-item>
      </v-tabs-items>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="ml-auto">
          <v-btn color="primary" elevation="0" dark @click="saveCustomer">
            <v-icon>mdi-content-save-outline</v-icon> บันทึก
          </v-btn>
          <v-btn color="red" elevation="0" dark>
            <v-icon>mdi-close-circle-outline</v-icon> ยกเลิก
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import CreditCustomer from "./creditCustomer.vue";
import detailCustomer from "./detailCustomer.vue";
export default {
  components: { detailCustomer, CreditCustomer },
  data() {
    return {
      // tab
      tabItems: ["ข้อมูลรายละเอียดลูกค้า", "วงเงินเครดิต"],
      tabSelect: null,

      detail_customer: {
        customer_id: null,
        customer_account_number_payable: null,
        customer_name: null,
        customer_address_1: null,
        customer_address_2: null,
        customer_tel: null,
        customer_fax: null,
        customer_contact_name: null,
        customer_home_page: null,
        vendor_type: null,
        amphure: [],
        province: [],
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    saveCustomer() {
      console.log(this.detail_customer);
    },
  },
};
</script>
