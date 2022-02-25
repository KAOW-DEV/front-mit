<template>
  <v-container grid-list-lg>
    <v-row>
      <v-col cols="12">
        <!-- <v-btn color="primary" class="float-end ma-2" :disabled="selected.length < 1">
          <v-icon>mdi-plus</v-icon>
          import
        </v-btn> -->
        <importData :selected="selected" v-on:get_products="get_products" class="float-end ma-2"></importData>
        <v-btn color="success" class="float-end ma-2" :disabled="selected.length < 1" @click="exportData()">
          <v-icon>mdi-plus</v-icon>
          export
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-n2">
      <v-col cols="12">
        <v-data-table show-select :headers="headers" :items="items_product" v-model="selected">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>รายละเอียดสินค้า</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.no="{ index }">
            <b>{{index+1}}</b>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
import importData from '../../components/import.vue'
  var XLSX = require("xlsx");
  export default {
    components:{
      importData
    },
    data: () => ({
      dialog_insert: false,
      dialog_update: false,
      items_product: [],
      selected: [],
      overlay: true,
      headers: [{
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "no",
        },
        {
          text: "รหัสสินค้าภายใน",
          value: "product_unit_barcode_in"
        },
        {
          text: "รหัสบาร์โค้ด",
          value: "product_unit_barcode_out"
        },
        {
          text: "สินค้า/รายละเอียด",
          value: "product_unit_name"
        },
        {
          text: "หน่วยนับ",
          value: "product_unit_name"
        },
        {
          text: "ราคา/หน่วย",
          value: "product_unit_price_no_vat"
        },
        {
          text: "จำนวน",
          value: "product_unit_quatity_contain"
        },
        {
          text: "จำนวนเงินสุทธิ",
          value: "product_unit_price_no_vat"
        },
      ],

    }),

    created() {
      this.get_products();
    },

    methods: {
      async exportData() {
        let exports = [];

        for (const item of this.selected) {
          let obj = [];
          obj['groupid'] = item.product.categoreis;
          obj['subgroupid'] = item.product.group;
          obj['codeno'] = item.product_unit_barcode_in;
          obj['description'] = item.product_desc;
          obj['company'] = item.product.supplier;
          obj['stock_unit'] = item.product_unit_name; //หน่วยเล็กสุด
          obj['plu_sdp'] = 0;
          obj['vat_type_in'] = '1-Inclusive';
          obj['qty_control'] = item.product_unit_quatity_contain;
          obj['productgroupname'] = '-';
          obj['brandname'] = item.product.brand;
          obj['internal_code'] = item.product_unit_barcode_in;
          obj['barcodeid'] = item.product_unit_barcode_out;
          obj['unit'] = item.product_unit_name;
          obj['baseqty'] = item.product_price.product_unit_price_average;
          obj['stock_type'] = 'W';
          obj['price0'] = item.product_price.product_unit_price_average;
          obj['percent_disc'] = item.product_price.product_unit_discount;
          obj['price01_add_type'] = 'P';
          obj['price1'] = item.product_price.P1;
          obj['price02_add_type'] = 'P';
          obj['price2'] = item.product_price.P2;
          obj['price03_add_type'] = 'P';
          obj['price3'] = item.product_price.P3;
          obj['price04_add_type'] = 'P';
          obj['price4'] = item.product_price.P4;
          obj['price05_add_type'] = 'P';
          obj['price5'] = item.product_price.P5;
          obj['price06_add_type'] = 'P';
          obj['price6'] = item.product_price.P6;
          obj['price07_add_type'] = 'P';
          obj['price7'] = item.product_price.P7;
          obj['price08_add_type'] = 'P';
          obj['price8'] = item.product_price.P8;
          obj['price09_add_type'] = 'P';
          obj['price9'] = item.product_price.P9;
          obj['price10_add_type'] = 'P';
          obj['price10'] = item.product_price.P10;
          obj['price11_add_type'] = 'P';
          obj['price11'] = 0;
          obj['price12_add_type'] = 'P';
          obj['price12'] = 0;
          obj['price13_add_type'] = 'P';
          obj['price13'] = 0;
          obj['price14_add_type'] = 'P';
          obj['price14'] = 0;
          obj['price15_add_type'] = 'P';
          obj['price15'] = 0;
          obj['minprice_add_type'] = 'P';
          obj['minprice'] = 0;
          exports.push(obj);
        }
        const dataWS = XLSX.utils.json_to_sheet(exports)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, dataWS)
        XLSX.writeFile(wb, 'export.xlsx')
        this.selected = [];

      },
      async get_products() {
        await this.$axios.get('/product-units?_limit=-1&_sort=id:DESC')
          .then((
            res) => {
            this.items_product = res.data;
            this.overlay = false;
          })
          .catch(error => {
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
    },
  };
</script>