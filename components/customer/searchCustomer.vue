<template>
  <div>
    <v-row class="pb-0">
      <v-col cols="12" md="7" class="mb-n5">
        <v-autocomplete outlined label="ค้นหา ลูกค้า" append-icon="mdi-clipboard-search-outline" clearable>

        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="2" class="mb-n5">
        <v-select  label="ค้นหาโดย" outlined></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn x-large block color="purple darken-1" dark >
          <v-icon left>mdi-magnify</v-icon>
          ค้นหา
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>

</style>
