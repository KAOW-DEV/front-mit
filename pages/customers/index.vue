<template>
  <div class=" justify-center align-center">
    <!-- <v-layout column class="justify-center align-center"> -->
      <!-- <v-flex xs12 sm4 pa-2 ma-2> -->
        <v-card class="pa-2 ma-2>">
        <mainCustomer></mainCustomer>
        </v-card>
      <!-- </v-flex> -->
    <!-- </v-layout> -->
  </div>
</template>
<script>
  import mainCustomer from '~/components/customer/mainCustomer.vue'
  export default {
    components: {
      mainCustomer
    }
  }

</script>
