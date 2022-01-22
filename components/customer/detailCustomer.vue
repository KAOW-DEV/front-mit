<template>
  <div>
    <v-card flat class="pa-2">
      <v-row justify="center">
        <!-- <v-col cols="2">
          <v-subheader>รหัสลูกค้า</v-subheader>
        </v-col> -->
        <v-col cols="2">
          <v-text-field dense outlined label="รหัสลูกค้า" value="123456789"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn elevation="2" outlined>รูปแบบรหัสอัตโนมัติ</v-btn>
        </v-col>
        <v-col cols="4">
          <v-autocomplete dense outlined label="เลขที่บัญชีลูกหนี้"></v-autocomplete>
        </v-col>
      </v-row>
      <!-- <v-row class="my-n10" justify="center" align="center">
        <v-col cols="2">
          <v-subheader>เลขที่บัญชีลูกหนี้</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-autocomplete dense outlined label="เลขที่บัญชีลูกหนี้"></v-autocomplete>
        </v-col>
      </v-row> -->
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>คำนำหน้า</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-autocomplete dense outlined label="คำนำหน้า"></v-autocomplete>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>ชื่อ/บริษัท</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined value="123456789" label="ชื่อ/บริษัท"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>ที่อยู่ (1)</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ที่อยู่ (1)"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>ที่อยู่ (2)</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ที่อยู่ (2)"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>ตำบล/แขวง</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ตำบล/แขวง"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>อำเภอ/เขต</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="อำเภอ/เขต"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>จังหวัด</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="จังหวัด"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>ไปรษณีย์</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ไปรษณีย์"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>เบอร์โทรติดต่อ</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="เบอร์โทรติดต่อ"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>เบอร์แฟกซ์</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="เบอร์แฟกซ์"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>ชื่อผู้ติดต่อ/รับเรื่อง</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ชื่อผู้ติดต่อ/รับเรื่อง"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>ชื่อ Home Page</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ชื่อ Home Page"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>ประเภทลูกค้า</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="ประเภทลูกค้า"></v-text-field>
        </v-col>
        <!-- <v-col cols="2">
          <v-subheader>โซน/เขตการซื้อขาย</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="โซน/เขตการซื้อขาย"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <!-- <v-col cols="2">
          <v-subheader>สำนักหนักงานใหญ่/สาขาย่อย</v-subheader>
        </v-col> -->
        <v-col cols="4">
          <v-text-field dense outlined label="สำนักหนักงานใหญ่/สาขาย่อย"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field dense outlined label="ราคาสินค้าที่ใช้"></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row class="my-n10" justify="center" align="center">
        <v-col cols="2">
          <v-subheader>ราคาสินค้าที่ใช้</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field dense outlined label="ราคาสินค้าที่ใช้"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader>ราคาขายส่งรายใหญ่</v-subheader>
        </v-col>
      </v-row> -->
      <v-row class="mt-10 " justify="center" align="center">
        <v-btn color="primary" dark>
          บันทึก
        </v-btn>
      </v-row>
      <br>
    </v-card>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>

</style>
