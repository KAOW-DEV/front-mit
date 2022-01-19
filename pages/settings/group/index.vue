<template>
  <v-layout column class="justify-center align-center">
    <v-flex xs12 sm4 pa-2 ma-2>
      <v-card class="pa-2 ma-2>">
        <mainGroup></mainGroup>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import mainGroup from '~/components/settings/group/mainGroup.vue'
  export default {
    components: {
      mainGroup,
    }
  }

</script>

<style>

</style>
