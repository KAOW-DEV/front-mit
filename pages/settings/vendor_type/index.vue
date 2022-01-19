<template>
  <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2>
      <v-card class="pa-2 ma-2>">
        <mainVendorType></mainVendorType>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import mainVendorType from '~/components/settings/vendorType/mainVendorType.vue'
  export default {
    components: {
      mainVendorType,
    }
  }

</script>

<style>

</style>
