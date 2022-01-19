<template>
  <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2>
      <v-card class="pa-2 ma-2>">
        <mainTradingZone></mainTradingZone>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import mainTradingZone from '~/components/settings/tradingZone/mainTradingZone.vue'
  export default {
    components: {
      mainTradingZone,
    }
  }

</script>

<style>

</style>
