<template>
  <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2>
      <v-card class="pa-2 ma-2>">
      <mainCategoreis></mainCategoreis>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import mainCategoreis from '~/components/settings/categoreis/mainCategoreis.vue'
  export default {
    components: {
      mainCategoreis,
    }
  }

</script>
