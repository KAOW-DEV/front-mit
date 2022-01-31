<template>
  <div class="ma-2">
    <v-card-actions>
      <v-btn
        class="ml-auto"
        color="primary"
        large
        @click="openDialogCustomerDetail"
      >
        <v-icon>mdi-account-plus</v-icon> เพิ่มลูกค้า
      </v-btn>
    </v-card-actions>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <h4><v-icon left>mdi-account-group</v-icon> รายการลูกค้า</h4>
      </v-toolbar>
      <v-row>
        <v-col>
          <v-data-table></v-data-table>
        </v-col>
      </v-row>
    </v-card>

    <!-- dialog  -->
    <v-dialog v-model="dialogCustomerDetail" width="1000" persistent>
      <main-detail-customer
        @close="closeDialogCustomerDetail"
      ></main-detail-customer>
    </v-dialog>
  </div>
</template>

<script>
import mainDetailCustomer from "~/components/customer/mainDetailCustomer.vue";
export default {
  components: { mainDetailCustomer },
  data() {
    return {
      dialogCustomerDetail: false,
    };
  },
  methods: {
    openDialogCustomerDetail() {
      this.dialogCustomerDetail = true;
    },
    closeDialogCustomerDetail() {
      this.dialogCustomerDetail = false;
    },
  },
};
</script>
