<template>
  <v-card>
    <v-card-title> เพิ่มบิลรับ </v-card-title>

    <v-card color="black" dark>
      <v-card-text class="mb-n7">
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="รับสินค้าจาก"
                  v-model="supplier_code"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="รับเข้าคลังสินค้า"
                  v-model="warehouse_name"
                  append-icon="mdi-magnify"
                  dense
                  outlined
                  readonly
                ></v-text-field>
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
                ></v-text-field>
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

    <v-card>
      <v-data-table
        :headers="headersStockReceivedDetail"
        :items="itemsStockReceivedDetail"
        dense
        height="355"
        fixed-header
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-card color="black" dark>
      <v-card-text class="mb-n7">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="3">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ลด (%)"
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
                  <v-col cols="12">
                    <v-text-field
                      label="ลดเงิน"
                      dense
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n10">
                    <v-text-field
                      label="ภาษี"
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
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mx-5" color="red" dark @click="closeDialog">ยกเลิก</v-btn>
        <v-btn class="mx-5" color="green" dark>บันทึก</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["dialogInsertStockReceived"],
  data() {
    return {
      stock_received_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu_stock_received_date: false,

      itemsSuppliers: [],
      supplier: [],

      dialogSupplier: false,

      headersStockReceivedDetail: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
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
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ],
    };
  },

  created() {
    this.getSuppliers();
  },
  methods: {
    async closeDialog() {
      this.$emit("update:dialogInsertStockReceived", false);
    },

    async getSuppliers() {
      await this.$axios.get("/suppliers").then((res) => {
        this.itemsSuppliers = res.data;
        console.log("itemsSuppliers", this.itemsSuppliers);
      });
    },

    async openDialogSupplier() {
      this.dialogSupplier = true;
    },
  },
};
</script>

<style>
</style>