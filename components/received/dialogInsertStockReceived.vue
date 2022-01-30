<template>
  <div>
    <v-card>
      <v-toolbar color="green" dark class="elevation-0" tile>
        <v-icon large>mdi-plus</v-icon>
        <h2>เพิ่มบิลรับ</h2>
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="closeDialog">
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card color="black" dark tile>
      <v-card-text>
        <v-row class="mb-n10">
          <v-col cols="4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="รับสินค้าจาก"
                  v-model="supplier_code"
                  dense
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      @click="openDialogSuppliers"
                      class="mt-n2 mr-n2"
                      color="green"
                      dark
                      ><v-icon>mdi-account-search</v-icon></v-btn
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="รับเข้าคลังสินค้า"
                  v-model="warehouse_name"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      @click="search_warehouses"
                      class="mt-n2 mr-n2"
                      color="green"
                      dark
                      ><v-icon>mdi-warehouse</v-icon></v-btn
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="ชื่อ/บริษัทฯ"
                  v-model="supplier_name"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-textarea
                  label="ที่อยู่"
                  v-model="supplier_address_1"
                  dense
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="โทรศัพท์"
                  v-model="supplier_tel"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="แฟกซ์"
                  v-model="supplier_fax"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ผู้ติดต่อ"
                  v-model="supplier_contact_name"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ราคาสินค้า/ภาษี"
                  v-model="supplier_code"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      @click="search_vat_types"
                      class="mt-n2 mr-n2"
                      color="green"
                      dark
                      ><v-icon>mdi-percent</v-icon></v-btn
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn color="warning" large>
                  <v-icon large>mdi-barcode</v-icon>
                  &nbsp; &nbsp;
                  <h2>ยิงบาร์โค้ด</h2>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="เอกสารออกที่สาขา"
                  v-model="supplier_code"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="รับสินค้าเลขที่"
                  v-model="supplier_code"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-menu
                  v-model="menu_stock_received_date"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="stock_received_date"
                      label="วันที่รับเข้า"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="stock_received_date"
                    @input="menu_stock_received_date = false"
                    locale="th"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ใบส่งสินค้าเลขที่"
                  v-model="stock_received_delivery_number"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ใบสั่งซื้อเลขที่"
                  v-model="stock_received_delivery_number"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="เครดิตเทอม (วัน)"
                  v-model="stock_received_delivery_number"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="รหัสพนักงานรับเข้า"
                  v-model="stock_received_delivery_number"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table
      :headers="headersStockReceivedDetail"
      :items="itemsStockReceivedDetail"
      dense
      height="355"
      fixed-header
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="warning" small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-card color="black" dark tile>
      <v-card-text class="mb-n7">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="3">
                <v-row>
                  <v-col cols="12" class="mb-7"></v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ลด (%)"
                      dense
                      outlined
                      readonly
                      color="warning"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="12" class="mb-7"></v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="จำนวนเงิน ส่วนลด"
                      dense
                      outlined
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="มูลค่าสินค้าคิดภาษี"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="มูลค่าสินค้าไม่คิดภาษี"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="12" class="mb-7"></v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ลดเงิน (บาท)"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="ภาษี (%)"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="จำนวนเงินทั้งหมดรวมภาษี"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="คงเหลือ"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="รวม"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="คงเหลือมูลค่าสินค้าสุทธิ"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card tile>
      <v-card-actions>
        <v-btn color="green" dark large>
          <v-icon large>mdi-content-save</v-icon>
          &nbsp; &nbsp;
          <h2>บันทึก</h2>
        </v-btn>
        <v-btn class="mx-5" color="primary" dark large>
          <v-icon large>mdi-printer</v-icon>
          &nbsp; &nbsp;
          <h2>พิมพ์</h2>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" dark large @click="closeDialog">
          <v-icon large>mdi-close</v-icon>
          &nbsp; &nbsp;
          <h2>ยกเลิก</h2>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogSearchSuppliers" width="1200px" persistent>
      <dialog-search-suppliers
        :dialogSearchSuppliers.sync="dialogSearchSuppliers"
      >
      </dialog-search-suppliers>
    </v-dialog>
  </div>
</template>

<script>
import dialogSearchSuppliers from "../supplier/dialogSearchSuppliers.vue";
export default {
  components: { dialogSearchSuppliers },
  props: ["dialogInsertStockReceived"],

  computed: {},

  data() {
    return {
      stock_received_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu_stock_received_date: false,

      // dialog
      dialogSearchSuppliers: false,

      // table
      headersStockReceivedDetail: [
        { text: "ลำดับ", value: "index" },
        { text: "รหัสสินค้าภายใน", value: "product_unit_barcode_in" },
        { text: "รหัสบาร์โค้ด", value: "product_unit_barcode_out" },
        { text: "สินค้า/รายละเอียด", value: "product_unit_name" },
        { text: "เบิกสินค้าจาก", value: "warehouse_name" },
        { text: "หน่วยนับ", value: "product_unit_name" },
        { text: "ราคา/หน่วย", value: "product_price" },
        { text: "จำนวน", value: "stock_received_detail_goods_quatity" },
        { text: "จำนวนสุทธิ", value: "stock_received_detail_goods_sum_price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      //   itemsStockReceivedDetail: [],

      itemsStockReceivedDetail: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
      ],
    };
  },

  created() {},
  methods: {
    async closeDialog() {
      this.$emit("update:dialogInsertStockReceived", false);
    },

    async openDialogSuppliers() {
      this.dialogSearchSuppliers = true;
    },
  },
};
</script>

<style scoped>
table.v-table thead th {
  font-size: 20px !important;
}
</style>
