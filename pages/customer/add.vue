<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <customer-title></customer-title>

    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="float-end" @click="goToTable">
          ตารางข้อมูลลูกค้า (F2)
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-tabs
        v-model="tab"
        background-color="success"
        dark
        slider-color="warning"
        fixed-tabs
        icons-and-text
      >
        <v-tab
          v-for="item in items"
          :key="item.title"
          :disabled="item.components == 'customerCreditTerm'"
        >
          {{ item.title }}
          <v-icon large>{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.title">
          <customer-information
            v-if="item.components == 'customerInformation'"
            :item.sync="itemCustomer"
          ></customer-information>
          <customer-credit-term
            v-if="item.components == 'customerCreditTerm'"
            :item.sync="itemCustomer"
          ></customer-credit-term>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import CustomerCreditTerm from "~/components/customer/customerCreditTerm.vue";
import CustomerInformation from "~/components/customer/customerInformation.vue";
import customerTitle from "~/components/customer/customerTitle.vue";

moment.locales("th");
export default {
  components: { customerTitle, CustomerInformation, CustomerCreditTerm },
  data() {
    return {
      overlay: false,

      tab: null,
      items: [
        {
          title: "ข้อมูลลูกค้า (F3)",
          components: "customerInformation",
          icon: "mdi-card-account-details",
        },
        {
          title: "วงเงินเครดิต (F4)",
          components: "customerCreditTerm",
          icon: "mdi-credit-card-check",
        },
      ],

      itemCustomer: {
        id: 0,
        code: null,
        account: null,
        prefix: null,
        name: null,
        address_1: null,
        address_2: null,
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        phone: null,
        fax: null,
        description: null,
        home_page: null,
        customer_type: null,
        tax: null,
        price_level: null,
        branch_type: null,
        branch_number: null,
        order_limit: 0,
        over_due: 0,
        credit_term: 30,
        note: null,
        dateCreate: null,
        dateUpdate: null,
      },
    };
  },

  methods: {
    async resetItemCustomer() {
      this.itemCustomer = {
        id: 0,
        code: null,
        account: null,
        prefix: null,
        name: null,
        address_1: null,
        address_2: null,
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        phone: null,
        fax: null,
        description: null,
        home_page: null,
        customer_type: null,
        tax: null,
        price_level: null,
        branch_type: null,
        branch_number: null,
        order_limit: 0,
        over_due: 0,
        credit_term: 30,
        note: null,
        dateCreate: null,
        dateUpdate: null,
      };
    },

    async goToTable() {
      this.$router.push("/customer");
    },

    async getEvent(e) {
      //   console.log("e", e);

      if (e.keyCode == 113) {
        e.preventDefault();
        this.goToTable();
      } else if (e.keyCode == 114) {
        e.preventDefault();
        this.tab = 0;
      } else if (e.keyCode == 115) {
        e.preventDefault();
        this.tab = 1;
      }
    },
  },

  created() {
    window.addEventListener("keydown", this.getEvent);
  },

  mounted() {
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>
 
<style lang="scss" scoped>
</style>