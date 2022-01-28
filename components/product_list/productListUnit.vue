<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-row justify="center" align="center">
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    รหัสสินค้า
                  </th>
                  <th class="text-left">
                    รหัสบารโค้ด
                  </th>
                  <th class="text-left">
                    ชื่อหน่วย
                  </th>
                  <th class="text-left">
                    ชื่อสินค้า
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rowData" :key="index" @click="clickItem(item)">
                  <td>{{ item.product_unit_barcode_in }}</td>
                  <td>{{ item.product_unit_barcode_out }}</td>
                  <td>{{ item.product_unit_name }}</td>
                  <td>{{ item.product.product_name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
        <v-row justify="center" align="center">
          <div class="text-center">
            <v-btn class="ma-2" outlined color="primary">
              เพิ่มหน่วยซื้อ/ขาย
            </v-btn>
            <v-btn class="ma-2" outlined color="primary">
              แก้ไขหน่วยซื้อ/ขาย
            </v-btn>
            <v-btn class="ma-2" outlined color="primary">
              ลบหน่วยซื้อ/ขาย
            </v-btn>
          </div>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-text-field v-model="editedItem.product_unit_name" dense label="หน่วยนับ" outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_quatity_contain" dense label="จำนวนบรรจุ"
              suffix="หน่วยนับ" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_price_no_vat" dense label="ทุน - NO VAT"
              suffix="บาท" outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_price_vat" dense label="รวม VAT" suffix="บาท"
              outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_price_no_vat_last_time" dense
              label="ทุนครั้งที่แล้ว - NO VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_price_vat_last_time" dense
              label="(ทุนครั้งที่แล้ว)รวม VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="8">
            <v-btn block>
              บันทึก
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="7">
            <v-subheader>ราคาตั้งจากส่วนกลาง (ล่าสุด)</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.product_unit_price_average" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ส่วนลดเปอร์เซ็น(ล่าสุด)</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.product_unit_discount" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-01(บวก เปอร์เซ็น) P01</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P1" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-02(บวก เปอร์เซ็น) P02</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P2" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-03(บวก เปอร์เซ็น) P03</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P3" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-04(บวก เปอร์เซ็น) P04</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P4" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-05(บวก เปอร์เซ็น) P05</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P5" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-06(บวก เปอร์เซ็น) P06</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P6" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-07(บวก เปอร์เซ็น) P07</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P7" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-08(บวก เปอร์เซ็น) P08</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P8" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-09(บวก เปอร์เซ็น) P09</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P9" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-10(บวก เปอร์เซ็น) P10</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P10" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-11(บวก เปอร์เซ็น) P11</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P11" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-12(บวก เปอร์เซ็น) P12</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P12" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-13(บวก เปอร์เซ็น) P13</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P13" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-14(บวก เปอร์เซ็น) P14</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P14" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-15(บวก เปอร์เซ็น) P15</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="editedItem.product_price.P15" dense outlined></v-text-field>
          </v-col>
        </v-row> -->
        <v-row class="mt-n10">
          <v-col cols="6">
            <v-subheader>วันที่อัพเดตล่าสุด</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-subheader>{{editedItem.product_price.updated_at}}</v-subheader>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: ['product'],
    data() {
      return {
        productUnits: [],
        overlay: false,
        rowData: [],
        //input
        editedItem: {
          created_at: "",
          id: null,
          product: null,
          product_price: {
            P1: 0,
            P2: 0,
            P3: 0,
            P4: 0,
            P5: 0,
            P6: 0,
            P7: 0,
            P8: 0,
            P9: 0,
            P10: 0,
            P11: 0,
            P12: 0,
            P13: 0,
            P14: 0,
            P15: 0,
            id: 0,
            product_unit: 0,
            product_unit_discount: 0,
            product_unit_price_average: 0,
            updated_at: "2022-01-23T16:05:06.000Z"
          },
          product_unit_barcode_in: null,
          product_unit_barcode_out: null,
          product_unit_name: "",
          product_unit_price_no_vat: 0,
          product_unit_price_vat: 0,
          product_unit_quatity_contain: 0,
          updated_at: null,
        },
        defaultItem: {
          created_at: "",
          id: null,
          product: null,
          product_price: {
            P1: 0,
            P2: 0,
            P3: 0,
            P4: 0,
            P5: 0,
            P6: 0,
            P7: 0,
            P8: 0,
            P9: 0,
            P10: 0,
            P11: 0,
            P12: 0,
            P13: 0,
            P14: 0,
            P15: 0,
            id: 0,
            product_unit: 0,
            product_unit_discount: 0,
            product_unit_price_average: 0,
            updated_at: "2022-01-23T16:05:06.000Z"
          },
          product_unit_barcode_in: null,
          product_unit_barcode_out: null,
          product_unit_name: "",
          product_unit_price_no_vat: 0,
          product_unit_price_vat: 0,
          product_unit_quatity_contain: 0,
          updated_at: null,
        }
      }
    },
    methods: {
      async clickItem(item){
        this.editedItem = Object.assign({}, item)
      },
      async getProductUnit() {
        if (this.product) {
          await this.$axios.get('/product-units?product=' + this.product.id + '?_limit=-1?_sort=id:DESC').then((
              res) => {
              this.rowData = res.data;
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
        }

      }
    },
    mounted() {
      this.getProductUnit();
    },
    watch: {
      product(val) {
        // console.log(val);
        // if (val.id != this.product.id) {
        //   console.log(val);
        // }
        this.getProductUnit();
      }
    }
  }
</script>