<template>
  <div class="mt-2 mx-2">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="90"></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>จัดการสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field class="mb-n6" dense label="รหัสสินค้า" placeholder="รหัสสินค้า" solo></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-card class="mt-5">
      <v-row>
        <v-col cols="2">
          <v-subheader>รหัสสต็อกสินค้า (ภายใน)</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn block>เปลี่ยนรหัสสต็อกสินค้า</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn block>COPYID</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>ชื่อ/รายละเอียดสินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>ชื่อ/รายละเอียดสินค้า2</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>หมวดหมู่สินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>กลุ่มสินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>หน่วยนับสต็อกสินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>รหัสผู้จำหน่าย</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field outlined dense label="ชื่อผู้จำหน่าย"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>ชื่อยี่ห้อสินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>ชื่อชุดสินค้า</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>ยอดคงเหลือ</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col cols="2">
          <v-subheader>วันที่สร้าง</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field outlined dense></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader>วันที่อัพเดตล่าสุด</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        overlay: false,
      };
    },
    methods: {},
    created() {},
  };
</script>