<template>
  <div>
    <v-card tile>
      <v-toolbar color="green" dark class="elevation-0">
        <v-icon>mdi-database-plus</v-icon> เพิ่มบิลรับ
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
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
                  label="รหัสผู้จำหน่าย"
                  v-model="itemSupplier.supplier_code"
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
                  v-model="itemBranch.branch_name"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      @click="openDialogBranch"
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
                  v-model="itemSupplier.supplier_name"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-textarea
                  label="ที่อยู่"
                  v-model="itemSupplier.supplier_address_1"
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
                  v-model="itemSupplier.supplier_tel"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="แฟกซ์"
                  v-model="itemSupplier.supplier_fax"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ผู้ติดต่อ"
                  v-model="itemSupplier.supplier_contact_name"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ราคาสินค้า/ภาษี"
                  v-model="itemVatType.vat_type_name"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-btn
                      class="mt-n2 mr-n2"
                      color="green"
                      dark
                      @click="openDialogVatType"
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
                  label="รหัสสำนักงาน/สาขา"
                  v-model="stock_received_branch_code"
                  dense
                  outlined
                  readonly
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="รับสินค้าเลขที่"
                  v-model="stock_received_number"
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
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="ใบสั่งซื้อเลขที่"
                  v-model="stock_order_number"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="เครดิตเทอม (วัน)"
                  v-model="stock_received_credit_term"
                  type="number"
                  min="0"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-n10"> </v-col>
              <v-col cols="6" class="mt-n10">
                <v-text-field
                  label="รหัสพนักงานรับเข้า"
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
          <v-col cols="2"></v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="12" class="mt-6">
                <input type="hidden" />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="ลด(%)"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field outlined dense readonly></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field outlined dense readonly></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field outlined dense readonly></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field outlined dense readonly></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="จำนวนที่รับเข้ารวม"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="รวมลด(%)"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="มูลค่าสินค้ามีภาษี"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="มูลค่าสินค้าไม่มีภาษี"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col cols="12" class="mt-15"></v-col>
              <v-col cols="12" class="mt-n8">
                <v-text-field
                  label="ลดเงิน"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="ภาษี"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="มูลค่าสินค้าไม่รวมภาษี"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="คงเหลือ"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="รวม"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n10">
                <v-text-field
                  label="จำนวนเงินรวมสุทธิ"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card tile>
      <v-card-actions>
        <v-btn color="green" dark>
          <v-icon>mdi-content-save</v-icon>
          &nbsp; &nbsp; บันทึก
        </v-btn>
        <v-btn class="mx-5" color="primary" dark>
          <v-icon>mdi-printer</v-icon>
          &nbsp; &nbsp; พิมพ์
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
          &nbsp; &nbsp; ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- dialogSearchSuppliers -->
    <v-dialog v-model="dialogSearchSuppliers" persistent>
      <dialog-search-suppliers
        :dialogSearchSuppliers.sync="dialogSearchSuppliers"
        :itemsSuppliers.sync="itemsSuppliers"
        :itemSupplier.sync="itemSupplier"
        :itemsVendorTypes.sync="itemsVendorTypes"
        :itemBranch.sync="itemBranch"
      >
      </dialog-search-suppliers>
    </v-dialog>

    <!-- dialogSearchBranch -->
    <v-dialog v-model="dialogSearchBranch" persistent>
      <dialog-search-branch
        :dialogSearchBranch.sync="dialogSearchBranch"
        :itemBranch.sync="itemBranch"
        :itemsBranch.sync="itemsBranch"
      ></dialog-search-branch>
    </v-dialog>

    <!-- dialogSearchVatType -->
    <v-dialog v-model="dialogSearchVatType" persistent>
      <dialog-search-vat-type
        :dialogSearchVatType.sync="dialogSearchVatType"
        :itemsVatType.sync="itemsVatType"
        :itemVatType.sync="itemVatType"
      ></dialog-search-vat-type>
    </v-dialog>
  </div>
</template>

<script>
import DialogSearchBranch from "../branch/dialogSearchBranch.vue";
import dialogSearchSuppliers from "../supplier/dialogSearchSuppliers.vue";
import DialogSearchVatType from "../vatType/dialogSearchVatType.vue";

export default {
  components: {
    dialogSearchSuppliers,
    DialogSearchBranch,
    DialogSearchVatType,
  },
  props: ["dialogInsertStockReceived"],

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
      dialogSearchBranch: false,
      dialogSearchVatType: false,

      // table
      headersStockReceivedDetail: [
        { text: "ลำดับ", value: "index" },
        { text: "รหัสสินค้าภายใน", value: "product_unit_barcode_in" },
        { text: "รหัสบาร์โค้ด", value: "product_unit_barcode_out" },
        { text: "สินค้า/รายละเอียด", value: "product_unit_name" },
        { text: "เบิกสินค้าจาก", value: "branch_name" },
        { text: "หน่วยนับ", value: "product_unit_name" },
        { text: "ราคา/หน่วย", value: "product_price" },
        { text: "จำนวน", value: "stock_received_detail_goods_quatity" },
        { text: "จำนวนสุทธิ", value: "stock_received_detail_goods_sum_price" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      itemsStockReceivedDetail: [],

      // item
      itemSupplier: {},
      itemsSuppliers: [],
      itemsVendorTypes: [],
      itemsBranch: [],
      itemBranch: {},
      itemsVatType: [],
      itemVatType: {
        id: 2,
        vat_type_name: "ราคาสินค้าไม่รวมภาษี",
      },

      stock_received_branch_code: null,
      stock_received_number: null,
      stock_received_delivery_number: null,
      stock_order_number: null,
      stock_received_credit_term: null,
    };
  },

  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.getSuppliers();
      await this.getVendorTypes();
      await this.getBranch();
      await this.getVatType();
    },

    async getSuppliers() {
      await this.$axios.get("/suppliers?_limit=-1").then((res) => {
        // console.log("itemsSuppliers", res.data);
        this.itemsSuppliers = res.data;
      });
    },

    async getBranch() {
      await this.$axios.get("/branches?_limit=-1").then((res) => {
        // console.log("itemsSuppliers", res.data);
        this.itemsBranch = res.data;
      });
    },

    async getVendorTypes() {
      await this.$axios.get("/vendor-types?_limit=-1").then((res) => {
        // console.log("itemsVendorTypes", res.data);
        this.itemsVendorTypes = res.data;

        let item = {
          created_at: null,
          id: 0,
          updated_at: null,
          vendor_type_name: "ทั้งหมด",
        };
        this.itemsVendorTypes.splice(0, 0, item);
        // console.log("itemsVendorTypes", this.itemsVendorTypes);
      });
    },

    async getVatType() {
      await this.$axios.get("/vat-types?_limit=-1").then((res) => {
        // console.log("itemsSuppliers", res.data);
        this.itemsVatType = res.data;
      });
    },

    async closeDialog() {
      this.$emit("update:dialogInsertStockReceived", false);
    },

    async openDialogSuppliers() {
      this.dialogSearchSuppliers = true;
    },

    async openDialogBranch() {
      this.dialogSearchBranch = true;
    },

    async openDialogVatType() {
      this.dialogSearchVatType = true;
    },
  },
};
</script>

<style scoped>
table.v-table thead th {
  font-size: 20px !important;
}
</style>
