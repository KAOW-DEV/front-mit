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
                <tr v-for="(item, index) in productUnits" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                  <td>{{ item.calories }}</td>
                  <td>{{ item.calories }}</td>
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
          <v-col cols="3">
            <v-text-field dense label="หน่วยนับ" outlined></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" dense label="จำนวนบรรจุ" suffix="หน่วยนับ" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="3">
            <v-text-field type="number" dense label="ทุน - NO VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" dense label="รวม VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="3">
            <v-text-field type="number" dense label="ทุนครั้งที่แล้ว - NO VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field type="number" dense label="(ทุนครั้งที่แล้ว)รวม VAT" suffix="บาท" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-n6">
          <v-col cols="6">
            <v-btn block>
              บันทึก
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="7">
            <v-subheader>ราคาขาย-01(บวก เปอร์เซ็น) P01</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ส่วนลดเปอร์เซ็น(ล่าสุด)</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-01(บวก เปอร์เซ็น) P01</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-02(บวก เปอร์เซ็น) P02</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-03(บวก เปอร์เซ็น) P03</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-04(บวก เปอร์เซ็น) P04</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-05(บวก เปอร์เซ็น) P05</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-06(บวก เปอร์เซ็น) P06</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-07(บวก เปอร์เซ็น) P07</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-08(บวก เปอร์เซ็น) P08</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-09(บวก เปอร์เซ็น) P09</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-10(บวก เปอร์เซ็น) P10</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-11(บวก เปอร์เซ็น) P11</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-12(บวก เปอร์เซ็น) P12</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-13(บวก เปอร์เซ็น) P13</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-14(บวก เปอร์เซ็น) P14</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n10">
          <v-col cols="7">
            <v-subheader>ราคาขาย-15(บวก เปอร์เซ็น) P15</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field value="0" dense outlined></v-text-field>
          </v-col>
        </v-row> -->
        <v-row class="mt-n10">
          <v-col cols="6">
            <v-subheader>วันที่อัพเดตล่าสุด</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-subheader>01-01-2000 12:10:00</v-subheader>

          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        productUnits: []
      }
    }
  }
</script>