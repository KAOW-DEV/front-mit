<template>
  <div class="mt-2 mx-2">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="90"></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>จัดการสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="searchBarcode" class="mb-n6" dense label="รหัสสินค้า" placeholder="รหัสสินค้า" solo
          @keydown.enter="search"></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-row>
      <v-col cols="10">
        <v-card class="mt-5" elevation="0">
          <v-row>
            <v-col cols="2">
              <v-subheader>รหัสสต็อกสินค้า (ภายใน)</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="listItem.internal_code" outlined dense></v-text-field>
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
              <v-text-field v-model="listItem.product_name" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>ชื่อ/รายละเอียดสินค้า2</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="listItem.product_name_2" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>หมวดหมู่สินค้า</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-autocomplete v-model="listItem.categoreis" item-text="category_name" item-value="id" :items="categoreis" outlined dense></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>กลุ่มสินค้า</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-autocomplete v-model="listItem.group" item-text="group_name" item-value="id" :items="group" outlined dense></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>หน่วยนับสต็อกสินค้า</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="listItem.unit" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>รหัสผู้จำหน่าย</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-select v-model="listItem.supplier" item-text="id" :items="supplier" readonly outlined dense></v-select>
            </v-col>
            <v-col cols="4">
              <v-autocomplete v-model="listItem.supplier" item-text="supplier_name" item-value="id" :items="supplier" outlined dense label="ชื่อผู้จำหน่าย"></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>ชื่อยี่ห้อสินค้า</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-autocomplete v-model="listItem.brand"  item-text="brand_name" item-value="id" :items="brand" outlined dense></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>ชื่อชุดสินค้า</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-autocomplete v-model="listItem.vendor_type" item-text="vendor_type_name" item-value="id" :items="vendor_type" outlined dense></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>ยอดคงเหลือ</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="listItem.amount" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col cols="2">
              <v-subheader>วันที่สร้าง</v-subheader>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="listItem.created_at" outlined dense></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>วันที่อัพเดตล่าสุด</v-subheader>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="listItem.updated_at" outlined dense></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="mt-5" elevation="0">
          <v-row>
            <v-col cols="12">
              <v-btn :disabled="listItem.id < 0" block :to="'product_list/'+listItem.id">รายละเอียดหลัก</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn disabled block>หน่วยซื้อ/ขาย</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn disabled block>ราคาขาย</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        categoreis:[],
        group:[],
        brand:[],
        vendor_type:[],
        supplier:[],
        overlay: false,
        searchBarcode: null,
        test:{
brand_name: "brands_test",
created_at: "2022-02-25T16:57:10.000Z",
created_by: 5,
id: 1,
updated_at: "2022-02-25T16:57:10.000Z",
updated_by: 5
        },
        listItem: {
          brand: null,
          categoreis: null,
          created_at: null,
          created_by: null,
          group: null,
          id: -1,
          internal_code: "",
          unit:'',
          amount: 0,
          product_name: "",
          product_name_2: null,
          product_unit: null,
          vendor_type: null,
          supplier: null,
          updated_at: null,
          updated_by: null
        }
      };
    },
    methods: {
      async search() {
        await this.$axios.get('/products/' + this.searchBarcode + '/search')
          .then((res) => {
            this.listItem = res.data;
            console.log(res);
          })
      },
      async getCategoreis() {
        this.categoreis = await this.$axios.get('/categoreis')
        .then((res) => {
          return res.data
        })
      }
      ,
      async getGroup() {
        this.group = await this.$axios.get('/groups')
        .then((res) => {
          return res.data
        })
      },
      async getBrand() {
        this.brand = await this.$axios.get('/brands')
        .then((res) => {
          return res.data
        })
      },
      async getVendorType() {
        this.vendor_type = await this.$axios.get('/vendor-types')
        .then((res) => {
          return res.data
        })
      },
      async getSupplier() {
        this.supplier = await this.$axios.get('/suppliers')
        .then((res) => {
          return res.data
        })
      }
    },
    created() {
      this.getCategoreis();
      this.getGroup();
      this.getBrand();
      this.getVendorType();
      this.getSupplier();
    },
  };
</script>