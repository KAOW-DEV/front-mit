<template>
  <div>
    <v-card flat class="pa-4">
      <v-row>
        <v-col cols="3">
          <v-subheader>
            วงเงินเครดิตการสั่งซื้อสินค้า
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="บาท"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-subheader>
            ยอดค้างชำระ
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="บาท"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="3">
          <v-subheader>
            กำหนดการชำระเงิน
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined type="number" suffix="วัน"></v-text-field>
        </v-col>
        <v-col cols="6">
          <h4>
            (0-ชำระเป็นเงินสด หรือไม่ระบุ Credit Team)
          </h4>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="3">
          <v-subheader>
            ชำระภายใน
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="วัน"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="วัน"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="วัน"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="3">
          <v-subheader>
            มีส่วนลดเพิ่ม
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="%"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="%"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined suffix="%"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="3">
          <v-subheader>
            เลขที่ใบส่งสินค้าล่าสุด
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-subheader>
            ส่งสินค้าให้เมื่อถึงวันที่
          </v-subheader>
        </v-col>
        <v-col cols="3">
          <v-text-field dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-n10">
        <v-col cols="12">
          <v-textarea label="หมายเหตุเกี่ยวกับลูกค้า"></v-textarea>
        </v-col>
      </v-row>
      <v-row class="my-n10" justify="center" align="center">
        <v-col cols="3">
          <v-checkbox v-model="checkbox" label="หยุดบริการขายสินค้าชั่วคราว"></v-checkbox>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>

</style>
