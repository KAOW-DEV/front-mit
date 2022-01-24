<template>
  <div>
      <v-card class="px-2">
          <v-row class="mt-2">
              <v-col cols="2">
                  <v-subheader>รหัสลูกค้า</v-subheader>
              </v-col>
              <v-col cols="4">
                  <v-text-field outlined dense></v-text-field>
              </v-col>
              <v-col cols="2">
                  <v-subheader>เลขที่บัญชีลูกหนี้</v-subheader>
              </v-col>
              <v-col cols="4">
                  <v-select outlined dense></v-select>
              </v-col>
          </v-row>
      </v-card>
  </div>
</template>

<script>
export default {

}
</script>
