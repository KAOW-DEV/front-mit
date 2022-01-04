<template>
  <div style="zoom: 80%">
    <v-row>
      <v-col cols="2">
        <v-subheader>รหัสลูกค้า</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-text-field dense outlined label="รหัสลูกค้า" value="123456789"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn elevation="2" outlined>รูปแบบรหัสอัตโนมัติ</v-btn>
      </v-col>
      <v-col cols="2">
        <v-subheader>เลขที่บัญชีลูกหนี้</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-autocomplete dense outlined></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>คำนำหน้า</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-autocomplete dense outlined></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ชื่อ/บริษัท</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-text-field dense outlined value="123456789"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ชื่อ/บริษัท</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field dense outlined value="123456789"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ที่อยู่ (1)</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ที่อยู่ (2)</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>อำเภอ/เขต</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>จังหวัด</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ไปรษณีย์</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>เบอร์โทรติดต่อ</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>เบอร์แฟกซ์</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ชื่อผู้ติดต่อ/รับเรื่อง</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ชื่อ Home Page</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ชื่อ HOME PAGE</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ประเภทลูกค้า</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>โซน/เขตการซื้อขาย</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-text-field dense outlined></v-text-field>
      </v-col>
      <!-- <v-col cols="2">
        <v-subheader>โซน/เขตการซื้อขาย</v-subheader>
         <v-radio-group column>
          <v-radio label="Option 1" value="radio-1"></v-radio>
          <v-radio label="Option 2" value="radio-2"></v-radio>
        </v-radio-group>
      </v-col> -->
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>สำนักหนักงานใหญ่/สาขาย่อย</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field dense outlined></v-text-field>
      </v-col>
      <!-- <v-col cols="2">
        <v-radio-group column>
          <v-radio label="Option 1" value="radio-1"></v-radio>
          <v-radio label="Option 2" value="radio-2"></v-radio>
        </v-radio-group>
      </v-col> -->
    </v-row>
    <v-row class="my-n10">
      <v-col cols="2">
        <v-subheader>ราคาสินค้าที่ใช้</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field dense outlined></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-subheader>ราคาขายส่งรายใหญ่</v-subheader>
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
