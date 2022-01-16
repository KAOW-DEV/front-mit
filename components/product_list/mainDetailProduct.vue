<template>
  <div>
    <!-- <v-card class="pa-2">
      <v-row>
        <v-col cols="8">
          <v-text-field outlined label="ค้นหา"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-autocomplete outlined label="ค้าหาโดย"></v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-btn x-large color="primary" block
            ><v-icon>mdi-magnify</v-icon> ค้าหา</v-btn
          >
        </v-col>
      </v-row>
    </v-card> -->

    <v-card class="mt-2">
      <v-tabs v-model="select_tabs" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in item_taps" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      base_api: process.env.baseUrl,
      select_tabs: null,

      item_taps: ["รายละเอียดสินค้า", "หน่วยซื้อขาย"],
    };
  },
  
};
</script>
