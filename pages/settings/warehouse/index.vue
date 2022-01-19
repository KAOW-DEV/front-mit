<template>
  <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2>
      <v-card class="pa-2 ma-2>">
        <mainWarehouse></mainWarehouse>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import mainWarehouse from '~/components/settings/warehouse/mainWarehouse.vue'
  export default {
    components: {
      mainWarehouse,
    }
  }

</script>

<style>

</style>
