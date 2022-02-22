<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-row justify="center" align="center">
          <v-data-table hide-default-footer height="300px" :headers="headers" :items="rowData" item-key="name"
            class="elevation-1">
            <template v-slot:body="{ items }">
              <tbody>
                <tr :class="key === selectedRow ? 'custom-highlight-row row-pointer' : 'row-pointer'"
                  @click="rowSelect(key)" v-for="(item, key) in items" :key="key">
                  <td>{{ item.product_unit_barcode_in }}</td>
                  <td>{{ item.product_unit_barcode_out }}</td>
                  <td>{{ item.product_unit_name }}</td>
                  <td>{{ item.product_desc }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
          <v-col cols="4">
            <v-text-field v-model="editedItem.product_unit_barcode_in" dense label="รหัสสินค้า" outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="editedItem.product_unit_barcode_out" dense label="รหัสบาร์โค้ด" outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
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
              readonly suffix="บาท" outlined></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="number" v-model="editedItem.product_unit_price_vat" dense label="รวม VAT" suffix="บาท"
              readonly outlined></v-text-field>
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
        <v-row class="mt-n6" justify="center" align="center">
          <div class="text-center">
            <v-btn class="ma-2" outlined color="primary" @click="newItem">
              เพิ่มหน่วยซื้อ/ขาย
            </v-btn>
            <v-btn class="ma-2" outlined color="primary" :disabled="selectedRow < 0" @click="editData">
              แก้ไขหน่วยซื้อ/ขาย
            </v-btn>
            <v-btn class="ma-2" outlined color="primary" :disabled="selectedRow < 0" @click="dialogSell = true">
              ราคาขาย
            </v-btn>
            <v-btn class="ma-2" outlined color="red" :disabled="selectedRow < 0" @click="del">
              ลบหน่วยซื้อ/ขาย
            </v-btn>
          </div>
        </v-row>
      </v-col>
      <v-col cols="6">
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
          <v-col cols="5">
            <v-subheader>วันที่อัพเดตล่าสุด{{$route.params.id}}</v-subheader>
          </v-col>
          <v-col cols="7">
            <v-subheader>{{showTime(editedItem.product_price.updated_at)}}</v-subheader>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ showFormTitle() }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="center" align="center" class="mt-5">
              <v-col cols="6">
                <v-text-field readonly v-model="editedItem.product_unit_barcode_in" dense label="รหัสสินค้า" outlined>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="editedItem.product_unit_barcode_out" dense label="รหัสบาร์โค้ด" outlined>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-n6">
              <v-col cols="12">
                <v-text-field v-model="editedItem.product_desc" dense label="รายละเอียด(ย่อ)" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-n6">
              <v-col cols="12">
                <v-text-field v-model="editedItem.product_desc_pack" dense label="รายละเอียดบรรจุ" outlined>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-n6">
              <v-col cols="6">
                <v-text-field v-model="editedItem.product_unit_name" dense label="หน่วยนับ" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field type="number" v-model="editedItem.product_unit_quatity_contain" dense label="จำนวนบรรจุ"
                  suffix="หน่วยนับ" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center" class="mt-n6">
              <v-col cols="6">
                <v-text-field type="number" v-model="editedItem.product_unit_price_no_vat" dense label="ทุน - NO VAT"
                  @change="calNoVat" @keydown="calNoVat" @keyup="calNoVat" suffix="บาท" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field type="number" v-model="editedItem.product_unit_price_vat" dense label="รวม VAT"
                  suffix="บาท" @change="calVat" @keyup="calVat" @keydown="calVat" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="close">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" dark :loading="loadingData" @click="save">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSell" max-width="700px">
      <v-card>
        <v-card-title>
          <span class="text-h5">กำหนดราคาขายจาดต้นทุน</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="center" align="center" class="mt-5">
              <v-col cols="6">
                <v-text-field label="ราคาตั้งจากส่วนกลาง (ล่าสุด)"
                  v-model="editedItem.product_price.product_unit_price_average" dense outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ส่วนลดเปอร์เซ็น(ล่าสุด)" v-model="editedItem.product_price.product_unit_discount"
                  dense outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-01(บวก เปอร์เซ็น) P01" v-model="editedItem.product_price.P1" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-02(บวก เปอร์เซ็น) P02" v-model="editedItem.product_price.P2" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-03(บวก เปอร์เซ็น) P03" v-model="editedItem.product_price.P3" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-04(บวก เปอร์เซ็น) P04" v-model="editedItem.product_price.P4" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-05(บวก เปอร์เซ็น) P05" v-model="editedItem.product_price.P5" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-06(บวก เปอร์เซ็น) P06" v-model="editedItem.product_price.P6" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-07(บวก เปอร์เซ็น) P07" v-model="editedItem.product_price.P7" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-08(บวก เปอร์เซ็น) P08" v-model="editedItem.product_price.P8" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-09(บวก เปอร์เซ็น) P09" v-model="editedItem.product_price.P9" dense
                  outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="ราคาขาย-10(บวก เปอร์เซ็น) P10" v-model="editedItem.product_price.P10" dense
                  outlined></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="close">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" dark :loading="loadingSell" @click="updateDataPrice">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import moment from "moment";
  moment.locale("th");
  export default {
    data() {
      return {
        productUnits: [],
        overlay: false,
        loadingData: false,
        loadingSell: false,
        dialog: false,
        selectedRow: -1,
        formTitle: 'เพิ่มหน่วยซื้อ/ขาย',
        dialogSell: false,
        rowData: [],
        product: [],
        headers: [{
            text: 'รหัสสินค้า',
            value: 'product_unit_barcode_in'
          },
          {
            text: 'รหัสบารโค้ด',
            value: 'product_unit_barcode_out'
          },
          {
            text: 'ชื่อหน่วย',
            value: 'product_unit_name'
          },
          {
            text: 'ชื่อสินค้า',
            value: 'product_desc'
          }
        ],
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
          categorei: null,
          group_name: null,
          product_unit_barcode_in: null,
          product_unit_barcode_out: null,
          product_unit_name: "",
          product_desc_pack: "",
          product_desc: "",
          product_detail: "",
          product_detail_quatity: "",
          product_unit_price_no_vat: 0,
          product_unit_price_vat: 0,
          product_unit_quatity_contain: 0,
          updated_at: null,
        },
        editedIndex: -1,
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
          categorei: null,
          group_name: null,
          product_unit_barcode_in: null,
          product_unit_barcode_out: null,
          product_desc_pack: "",
          product_desc: "",
          product_unit_name: "",
          product_detail: "",
          product_detail_quatity: "",
          product_unit_price_no_vat: 0,
          product_unit_price_vat: 0,
          product_unit_quatity_contain: 0,
          updated_at: null,
        }
      }
    },
    methods: {
      showFormTitle() {
        return this.editedIndex === -1 ? 'เพิ่มหน่วยซื้อ/ขาย' : 'แก้ไขหน่วยซื้อ/ขาย'
      },
      editData() {
        this.dialog = true;
      },
      showTime(time) {
        if (time) {
          return moment(time).format('LLL');
        } else {
          return '-'
        }

      },
      calVat() {
        let noVat = (this.editedItem.product_unit_price_vat * 100) / 107;
        this.editedItem.product_unit_price_no_vat = noVat.toFixed(2);
      },
      calNoVat() {
        let vat = this.editedItem.product_unit_price_no_vat * 0.07;
        let sum = (this.editedItem.product_unit_price_no_vat * 1) + (vat * 1);
        this.editedItem.product_unit_price_vat = sum.toFixed(2)
      },
      rowSelect(idx) {
        this.selectedRow = idx;
        this.editedIndex = idx;
        // this.selectedRow = this.rowData.indexOf(idx)
        this.editedItem = Object.assign({}, this.rowData[idx])

      },
      async clickItem(item) {
        this.editedItem = Object.assign({}, item)
      },
      newItem() {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.dialog = true;
        this.editedIndex = -1;
      },
      del() {
        this.$swal({
          title: 'ลบข้อมูล',
          text: "คุณต้องการลบสินค้าหรือไม่!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteData();
          }
        })
      },
      save() {
        if (this.editedIndex > -1) {
          this.updateData();
        } else {

          this.createDataPrice();
        }
      },
      async getProductUnit() {
        if (this.product) {
          await this.$axios.get('/product-units?product=' + this.$route.params.id + '?_limit=-1?_sort=id:DESC')
            .then((
              res) => {
              this.rowData = res.data;
              this.overlay = false;
              if (res) {
                this.editedItem.product_unit_barcode_in = res.data[0].product_unit_barcode_in;
                this.editedItem.group_name = res.data[0].product.group;
                this.editedItem.categorei = res.data[0].product.categoreis;
                this.editedItem.product = res.data[0].product.id;
                this.defaultItem.product_unit_barcode_in = res.data[0].product_unit_barcode_in;
                this.defaultItem.group_name = res.data[0].product.group;
                this.defaultItem.categorei = res.data[0].product.categoreis;
                this.defaultItem.product = res.data[0].product.id;
              }
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

      },
      close() {
        this.dialog = false;
        this.dialogSell = false;
        if (this.selectedRow > -1) {
          this.rowSelect(this.selectedRow)
        } else {
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        }
      },
      async createData(price_id) {

        this.overlay = true;
        await this.$axios.post('/product-units', {
            group_name: this.editedItem.group_name,
            categorei: this.editedItem.categorei,
            product_unit_barcode_in: this.editedItem.product_unit_barcode_in,
            product_unit_barcode_out: this.editedItem.product_unit_barcode_out,
            product_desc: this.editedItem.product_desc,
            product_desc_pack: this.editedItem.product_desc_pack,
            product_unit_name: this.editedItem.product_unit_name,
            product_unit_price_no_vat: this.editedItem.product_unit_price_no_vat,
            product_unit_price_vat: this.editedItem.product_unit_price_vat,
            product_unit_quatity_contain: this.editedItem.product_unit_quatity_contain,
            product: this.editedItem.product,
            product_price: price_id
          })
          .then(response => {
            this.overlay = false;
            this.loadingData = false;
            this.rowData.push(response.data)
            this.close();
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'เรียบร้อย',
              timer: 1500
            })
          })
          .catch(error => {
            this.overlay = false;
            this.loadingData = false;
            console.log('error', error);
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async createDataPrice() {
        this.overlay = true;
        this.loadingData = true;
        await this.$axios.post('/product-prices', {
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
            product_unit: 0,
            product_unit_discount: 0,
            product_unit_price_average: 0,
          })
          .then(response => {
            this.createData(response.data.id)
          })
          .catch(error => {
            this.loadingData = false;
            this.overlay = false;
            console.log('error', error);
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async updateData() {
        this.loadingData = true;
        await this.$axios.put('/product-units/' + this.editedItem.id, {
            product_unit_barcode_in: this.editedItem.product_unit_barcode_in,
            product_unit_barcode_out: this.editedItem.product_unit_barcode_out,
            product_desc: this.editedItem.product_desc,
            product_desc_pack: this.editedItem.product_desc_pack,
            product_unit_name: this.editedItem.product_unit_name,
            product_unit_price_no_vat: this.editedItem.product_unit_price_no_vat,
            product_unit_price_vat: this.editedItem.product_unit_price_vat,
            product_unit_quatity_contain: this.editedItem.product_unit_quatity_contain,
          })
          .then(response => {
            this.loadingData = false;
            this.dialog = false;
            Object.assign(this.rowData[this.selectedRow], response.data);
            this.overlay = false;
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'อัพเดตเรียบร้อย',
              showConfirmButton: false,
            })
          })
          .catch(error => {
            this.overlay = false;
            this.loadingData = false;
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async updateDataPrice() {
        this.overlay = true;
        this.loadingSell = true;
        await this.$axios.put('/product-prices/' + this.editedItem.product_price.id, {
            P1: this.editedItem.product_price.P1,
            P2: this.editedItem.product_price.P2,
            P3: this.editedItem.product_price.P3,
            P4: this.editedItem.product_price.P4,
            P5: this.editedItem.product_price.P5,
            P6: this.editedItem.product_price.P6,
            P7: this.editedItem.product_price.P7,
            P8: this.editedItem.product_price.P8,
            P9: this.editedItem.product_price.P9,
            P10: this.editedItem.product_price.P10,
            P11: this.editedItem.product_price.P11,
            P12: this.editedItem.product_price.P12,
            P13: this.editedItem.product_price.P13,
            P14: this.editedItem.product_price.P14,
            P15: this.editedItem.product_price.P15,
            product_unit: this.editedItem.product_price.product_unit,
            product_unit_discount: this.editedItem.product_price.product_unit_discount,
            product_unit_price_average: this.editedItem.product_price.product_unit_price_average
          })
          .then(response => {
            this.overlay = false;
            this.dialogSell = false;
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'สำเร็จ',
              showConfirmButton: false,
            })
          })
          .catch(error => {
            this.overlay = false;
            this.dialogSell = false;
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async deleteData() {
        this.overlay = true;
        await this.$axios.delete('/product-units/' + this.editedItem.id)
          .then(response => {
            this.rowData.splice(this.selectedRow, 1)
            this.overlay = false;
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'ลบเรียบร้อย',
              timer: 1500,
              showConfirmButton: false,
            })
          })
          .catch(error => {
            this.overlay = false;
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
        this.selectedRow = -1;
        this.editedItem = Object.assign({}, this.defaultItem)
      }
    }
  }
</script>
<style lang="css">
  .custom-highlight-row {
    background-color: rgb(177, 219, 252)
  }

  .row-pointer tbody tr :hover {
    cursor: pointer;
  }
</style>