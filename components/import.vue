<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
          import
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Import
        </v-card-title>

        <v-card-text class="pt-6">
          <v-file-input label="เลือกไฟล์" outlined dense v-model="file" clearable></v-file-input>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" text @click="importProduct">
            นำเข้า
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog transition="dialog-top-transition" v-model="dialogError" persistent max-width="1200">
      <template v-slot:default="dialogError">
        <v-card>
          <v-toolbar color="primary" dark>รายการสินค้าที่ Import ไม่สำเร็จ</v-toolbar>
          <v-card-text class="mt-5">
            <v-data-table :headers="headers" :items="desserts" 
              class="elevation-1">
              <template v-slot:item.no="{ index }">
                <b>{{index+1}}</b>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="red" text @click="dialogError.value = false">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
  var XLSX = require("xlsx");
  export default {
    data() {
      return {
        dialog: false,
        loading: false,
        dialogError: false,
        itemAll: [],
        file: null,
        headers: [{
            text: "ลำดับ",
            align: "start",
            sortable: false,
            value: "no",
          },
          {
            text: "รหัสสินค้าภายใน",
            value: "internal_code"
          },
          {
            text: "รหัสบาร์โค้ด",
            value: "barcodeid"
          },
          {
            text: "สินค้า/รายละเอียด",
            value: "description"
          },
          {
            text: "หน่วยนับ",
            value: "unit"
          },
          {
            text: "ราคา/หน่วย",
            value: "qty_control"
          },
          {
            text: "จำนวน",
            value: "baseqty"
          },
          {
            text: "จำนวนเงินสุทธิ",
            value: "price0"
          },
          {
            text: "สาเหตุ",
            value: "status"
          }
        ],
        desserts:[]
      }
    },
    watch: {
      file(val) {
        if (val) {
          this.convertData(val);
        }
      }
    },
    methods: {
      async convertData(event) {
        // if (!event.currentTarget.files.length) {
        //   return
        // }
        const that = this
        that.loading = true;
        // // Get the file object
        // var f = event.currentTarget.files[0]
        // console.log('data', f);
        // Use FileReader to read
        var reader = new FileReader()
        // Rewrite the readAsBinaryString method on FileReader
        FileReader.prototype.readAsBinaryString = await

        function (event) {
          var binary = ''
          var wb // Read the completed data
          var outdata // the data you need
          var reader = new FileReader()
          reader.onload = function (e) {
            // Read into Uint8Array and convert to Unicode encoding (Unicode takes two bytes)
            var bytes = new Uint8Array(reader.result)
            var length = bytes.byteLength
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            // Next is xlsx, see the plugin api for details
            wb = XLSX.read(binary, {
              type: 'binary'
            })
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            that.itemAll = outdata;
            // that.$emit('getRe // dataRow.forEach(x => {
            //     that.itemAll.push(x)
            // })sult', outdata)

            // that.check = true;
            that.loading = false;

          }
          reader.readAsArrayBuffer(event)
        }
        reader.readAsBinaryString(event)

      },
      async importProduct() {
        this.loading = true;
        await this.$axios.post('/product-units/import', {
            dataAll: this.itemAll
          })
          .then((
            res) => {

            if (res.data.success) {
              this.$emit("get_products");
              this.$swal({
                position: 'center',
                icon: 'success',
                title: 'สำเร็จ',
                showConfirmButton: true,
              })
            } else {
              this.desserts = res.data.logError;
              this.dialogError = true;
              this.$swal({
                position: 'center',
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error,
                showConfirmButton: false,
              })
            }
            this.dialog = false;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            this.dialog = false;
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
  }
</script>

<style>

</style>