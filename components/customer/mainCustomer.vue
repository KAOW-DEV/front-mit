<template>
  <v-row justify="center" align="center">
    <v-col cols="10" > 
        <manegeCustomer/>
    </v-col>
    <v-col cols="2"> 
        
    </v-col>
  </v-row>
</template>

<script>
import manegeCustomer from '~/components/customer/manegeCustomer.vue'
export default {
  components:{
    manegeCustomer
  }
}
</script>