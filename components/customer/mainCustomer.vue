<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-tabs centered v-model="customer_tab">
        <v-tab href="#tab-1">ข้อมูลลูกค้า</v-tab>
        <!-- <v-tab href="#tab-2">ที่อยู่ที่ใช้ออกบิล</v-tab> -->
        <v-tab href="#tab-2">วงเงินเครดิต</v-tab>
      </v-tabs>
      <v-tabs-items v-model="customer_tab">
        <v-tab-item value="tab-1">
         <detailCustomer></detailCustomer>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <creditCustomer></creditCustomer>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <!-- <v-col cols="2"> 
        
    </v-col> -->
  </v-row>
</template>

<script>
  import detailCustomer from '~/components/customer/detailCustomer.vue'
  import creditCustomer from '~/components/customer/creditCustomer.vue'
  export default {
    components: {
      detailCustomer,
      creditCustomer
    },
    data(){
      return{
        customer_tab: 'tab-1'
      }
    }
  }

</script>
