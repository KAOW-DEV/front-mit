<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="red--text">รายละเอียดสินค้า</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn color="success" class="float-end">เพิ่มสินค้าใหม่</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-toolbar class="elevation-0">
              <v-text-field
                label="รหัสสินค้า"
                dense
                outlined
                hide-details=""
                autofocus
                class="mr-2"
              ></v-text-field>
              <v-btn class="mx-1">ค้นหาจากรหัสสินค้า</v-btn>
              <v-btn class="mx-1">ค้นหาจากบาร์โค้ด</v-btn>
              <v-btn class="mx-1">ค้นหาจากชื่อ</v-btn>
              <v-btn class="mx-1">ค้นหาจากกลุ่มหลัก</v-btn>
              <v-btn class="mx-1">ค้นหาจาก Supplier</v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="tab" slider-color="yellow" fixed-tabs>
              <v-tab href="#tab-1"> รายละเอียดหลัก </v-tab>
              <v-tab href="#tab-2"> หน่วยซื้อ/ขาย </v-tab>
              <v-tab href="#tab-3"> ราคาขาย </v-tab>
              <v-tab href="#tab-4"> พิมพ์บาร์โค้ดสินค้า </v-tab>

              <!-- tab-1 -->
              <v-tab-item value="tab-1">
                <card-product-detail></card-product-detail>
              </v-tab-item>

              <!-- tab-2 -->
              <v-tab-item value="tab-2">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> หน่วยซื้อ/ขาย </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>

              <!-- tab-3 -->
              <v-tab-item value="tab-3">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> ราคาขาย </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>

              <!-- tab-4 -->
              <v-tab-item value="tab-4">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12"> พิมพ์บาร์โค้ดสินค้า </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cardProductDetail from "~/components/product/cardProductDetail.vue";
export default {
  components: { cardProductDetail },
  data() {
    return {
      tab: "tab-1",
      items: [
        { tab: "รายละเอียดหลัก", content: "รายละเอียดหลัก" },
        { tab: "หน่วยซื้อ/ขาย", content: "หน่วยซื้อ/ขาย" },
        { tab: "ราคาขาย", content: "ราคาขาย" },
        { tab: "พิมพ์บาร์โค้ดสินค้า", content: "พิมพ์บาร์โค้ดสินค้า" },
      ],

      itemProductDetail: [
          
      ],


      itemProductUnit: [],
      itemProductPrice: [],
      itemProductBarcode: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
