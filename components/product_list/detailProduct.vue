<template>
  <div>
    <v-card flat class="pa-5">
      <v-row>
        <v-col cols="4">
          <v-subheader>รหัสสต๊อกสินค้า</v-subheader>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn outlined>เปลี่ยนรหัสสินค้า</v-btn>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="4">
          <v-subheader>ชื่อ/รายละเอียดสินค้า</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n5">
        <v-col cols="4">
          <v-subheader>ชื่อ/รายละเอียดสินค้า 2</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-n8 mb-n10">
        <v-col cols="4">
          <v-subheader>ประเภทสินค้า</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field dense outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>ประเภทย่อย</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field dense outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n5">
        <v-col cols="4">
          <v-subheader>กลุ่มสินค้าย่อย</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field dense outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-n8 mb-n10">
        <v-col cols="4">
          <v-subheader>กลุ่มสินค้าย่อย</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-autocomplete dense outlined></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>จำนวนล่าสุด</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field
            class="input_number"
            dense
            outlined
            type="number"
            min="0"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-subheader>สั่งซื้อต่อครั้ง</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="input_number"
                dense
                outlined
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>ภาษีซื้อ</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-autocomplete dense outlined></v-autocomplete>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-subheader>ภาษีขาย</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-autocomplete dense outlined></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>รหัสผู้จำหน่าย</v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field
            class="input_number"
            dense
            outlined
            type="number"
            min="0"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-autocomplete dense outlined></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>ชื่อยี่ห้อสินค้า/Brand</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10 mb-n10">
        <v-col cols="4">
          <v-subheader>ชื่อชุดสินค้า</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.input_number >>> input[type="number"] {
  -moz-appearance: textfield;
}
.input_number >>> input::-webkit-outer-spin-button,
.input_number >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
