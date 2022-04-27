<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <v-container fluid>
      <!-- <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">ใบรับเข้า</h1>
        </v-col>
      </v-row> -->

      <!-- <v-row>
        <v-col cols="12">
          <v-btn color="success" class="float-end">เพิ่ม</v-btn>
        </v-col>
      </v-row> -->

      <v-row>
        <v-col cols="12">
          <form @submit.prevent="checkSave">
            <v-card>
              <v-card-title primary-title>
                <v-spacer></v-spacer>
                <h1 class="red--text">ใบรับเข้า</h1>
                <v-spacer></v-spacer>
                <v-btn large color="success" @click="newPage">
                  <v-icon>mdi-newspaper-plus</v-icon>
                  สร้างหน้าใหม่
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="3">
                      <v-row>
                        <v-col cols="6">
                          <v-autocomplete
                            label="รับเข้าคลังสินค้า"
                            :items="itemsBranch"
                            item-text="branch_name"
                            item-value="id"
                            v-model="itemReceived.branch"
                            return-object
                            dense
                            outlined
                            hide-details=""
                            required
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="text-center">
                          <v-switch
                            label="รวมภาษีมูลค่าเพิ่ม"
                            v-model="itemReceived.type_vat"
                            hide-details=""
                            large
                            class="mt-n1 text-center"
                            color="red"
                          ></v-switch>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            label="ชื่อ/บริษัทฯ"
                            id="supplier"
                            :items="itemsSupplier"
                            item-text="supplier_name"
                            item-value="id"
                            v-model="itemReceived.supplier"
                            return-object
                            dense
                            outlined
                            hide-details=""
                            required
                            autofocus
                            @change="autoInput"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-row>
                        <v-col cols="12">
                          <v-textarea
                            label="ที่อยู่"
                            v-model="itemReceived.supplier_address"
                            dense
                            outlined
                            disabled
                            hide-details=""
                            rows="2"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="ผู้ติดต่อ"
                            v-model="itemReceived.supplier_description"
                            dense
                            outlined
                            disabled
                            hide-details=""
                            rows="2"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="โทรศัพท์"
                            v-model="itemReceived.supplier_phone"
                            dense
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1"></v-col>
                    <v-col cols="2">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="ใบรับสินค้าเลขที่"
                            v-model="itemReceived.received_number"
                            dense
                            outlined
                            disabled
                            hide-details=""
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :return-value.sync="itemReceived.received_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="itemReceived.received_date"
                                label="วันที่รับสินค้า"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense
                                outlined
                                hide-details=""
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="itemReceived.received_date"
                              no-title
                              scrollable
                              locale="th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu1 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menu1.save(itemReceived.received_date),
                                    autoFocusDeliveryDate()
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="ใบสั่งซื้อเลขที่"
                            id="po_number"
                            v-model="itemReceived.po_number"
                            dense
                            outlined
                            hide-details=""
                            @keyup.enter="autoFocusReceivedCreditTerm"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="2">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="ใบส่งสินค้าเลขที่"
                            id="delivery_number"
                            v-model="itemReceived.delivery_number"
                            dense
                            outlined
                            hide-details=""
                            @keyup.enter="autoFocusDeliveryDate"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="itemReceived.delivery_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="itemReceived.delivery_date"
                                label="วันที่ส่งสินค้า"
                                id="delivery_date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                dense
                                outlined
                                hide-details=""
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="itemReceived.delivery_date"
                              no-title
                              scrollable
                              locale="th"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menu2.save(itemReceived.delivery_date),
                                    autoFocusPoNumber()
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="เครดิตเทอม (วัน)"
                            id="received_credit_term"
                            v-model="itemReceived.received_credit_term"
                            dense
                            outlined
                            hide-details=""
                            type="number"
                            min="0"
                            @keyup.enter="autoFocusAddReceivedList"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="my-3"
                  large
                  color="success"
                  dark
                  width="200"
                  id="addReceivedList"
                  @click="addReceivedList"
                >
                  <v-icon>mdi-database-plus</v-icon>
                  &nbsp; เพิ่มรายการสินค้า
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-divider></v-divider>
              <v-data-table
                :headers="headersItemsReceivedList"
                :items="itemsReceivedList"
                item-key="id"
                :show-select="true"
                dense
                @dblclick:row="getItem"
              >
                <template v-slot:item.index="{ item, index }">
                  {{ index + 1 }}
                </template>
              </v-data-table>
              <v-divider></v-divider>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="ผู้จัดทำ"
                        v-model="itemReceived.users_permissions_user.user_name"
                        dense
                        outlined
                        hide-details=""
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="9">
                      <v-row>
                        <v-col cols="2"></v-col>
                        <v-col cols="5">
                          <v-row class="mt-13">
                            <v-col cols="12">
                              <v-row class="text-end">
                                <v-col cols="2"></v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    label="ลด(%)(1)"
                                    v-model="itemReceived.reduce_percen_1"
                                    dense
                                    outlined
                                    hide-details=""
                                    readonly
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    label="ลด(%)(2)"
                                    v-model="itemReceived.reduce_percen_2"
                                    dense
                                    outlined
                                    hide-details=""
                                    readonly
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    label="ลด(%)(3)"
                                    v-model="itemReceived.reduce_percen_3"
                                    dense
                                    outlined
                                    hide-details=""
                                    readonly
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    label="ลด(%)(4)"
                                    v-model="itemReceived.reduce_percen_4"
                                    dense
                                    outlined
                                    hide-details=""
                                    readonly
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                  <v-text-field
                                    label="ลด(%)(5)"
                                    v-model="itemReceived.reduce_percen_5"
                                    dense
                                    outlined
                                    hide-details=""
                                    readonly
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="2">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="จำนวนที่รับเข้ารวม"
                                v-model="itemReceived.quantity_total"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="ลด(%)(รวม)"
                                v-model="itemReceived.reduce_percen_sum"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="1">
                          <v-row>
                            <v-col cols="12" class="mt-16">
                              <v-text-field
                                label="ลดเงิน"
                                v-model="itemReceived.reduce_money"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="2">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="ราคารวมไม่มีภาษี"
                                v-model="itemReceived.price_sum_no_vat"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="VAT 7%"
                                v-model="itemReceived.price_vat"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="ราคาสุทธิรวมภาษี"
                                v-model="itemReceived.price_sum_net"
                                dense
                                outlined
                                hide-details=""
                                readonly
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" large>
                  <v-icon>mdi-content-save</v-icon>
                  บันทึก
                </v-btn>
                <v-btn color="primary" large>
                  <v-icon>mdi-printer</v-icon>
                  พิมพ์
                </v-btn>
                <v-btn color="error" large>
                  <v-icon>mdi-trash-can</v-icon>
                  ลบ
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogaddReceivedList" persistent width="40%">
      <add-received-list
        :itemReceivedList.sync="itemReceivedList"
        @closeDialogReceivedList="closeDialogReceivedList"
      ></add-received-list>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import addReceivedList from "~/components/received/addReceivedList.vue";
moment.locales("th");
export default {
  components: { addReceivedList },
  data() {
    return {
      overlay: false,
      editItem: false,

      itemReceived: {
        id: 0,
        supplier: null,
        branch: this.$auth.$storage.getUniversal("itemBranch"),
        supplier_name: null,
        supplier_address: null,
        supplier_phone: null,
        supplier_description: null,
        type_vat: true,
        received_number: null,
        received_date: moment().format("YYYY-MM-DD"),
        delivery_number: null,
        delivery_date: null,
        po_number: null,
        received_credit_term: 30,
        users_permissions_user: this.$auth.$state.user,
        quantity_total: 0,
        reduce_percen_1: 0,
        reduce_percen_2: 0,
        reduce_percen_3: 0,
        reduce_percen_4: 0,
        reduce_percen_5: 0,
        reduce_percen_sum: 0,
        reduce_money: 0,
        price_sum_no_vat: 0,
        price_vat: 0,
        price_sum_net: 0,
      },

      itemsSupplier: [],
      itemsBranch: [],

      menu1: false,
      menu2: false,

      // receivedList
      headersItemsReceivedList: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "รหัสสินค้าภายใน", value: "product_internal_code" },
        { text: "รหัสบาร์โค้ด", value: "product_barcode" },
        { text: "สินค้า/รายละเอียด", value: "product_name" },
        { text: "หน่วยนับ", value: "unit" },
        { text: "ราคาต่อหน่วย", value: "price" },
        { text: "จำนวน", value: "quantity" },
        { text: "จำนวนเงินรวม", value: "price_sum" },
      ],

      itemsReceivedList: [],
      itemReceivedList: {
        id: 0,
        received: null,
        product_unit: null,
        product_internal_code: null,
        product_barcode: null,
        product_name: null,
        unit: null,
        product_cost_vat: 0,
        product_cost_no_vat: 0,
        price: 0,
        reduct_percen_1: 0,
        reduct_percen_2: 0,
        reduct_percen_3: 0,
        reduct_percen_4: 0,
        reduct_percen_5: 0,
        reduct_price_1: 0,
        reduct_price_2: 0,
        reduct_price_3: 0,
        reduct_price_4: 0,
        reduct_price_5: 0,
        reduct_percen_sum: 0,
        reduct_price_sum: 0,
        price_reduce: 0,
        price_after_reduce: 0,
        quantity: 0,
        price_sum: 0,
      },

      dialogaddReceivedList: false,
      dialogeditReceivedList: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async autoFocusAddReceivedList() {
      document.getElementById("addReceivedList").focus();
    },

    async autoFocusReceivedCreditTerm() {
      document.getElementById("received_credit_term").focus();
    },

    async autoFocusPoNumber() {
      document.getElementById("po_number").focus();
    },
    async autoFocusDeliveryDate() {
      document.getElementById("delivery_date").focus();
      this.menu2 = true;
    },

    async getData() {
      this.getItemsSupplier();
      this.getItemsBranch();
    },

    async getItemsSupplier() {
      await this.$axios
        .get("/suppliers?supplier_actived=true&_limit=-1")
        .then((res) => {
          console.log("itemsSupplier", res.data);
          this.itemsSupplier = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async getItemsBranch() {
      await this.$axios
        .get("/branches")
        .then((res) => {
          console.log("itemsBranch", res.data);
          this.itemsBranch = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async autoInput() {
      this.itemReceived.supplier_address =
        this.itemReceived.supplier.supplier_address;
      this.itemReceived.supplier_phone =
        this.itemReceived.supplier.supplier_phone;
      this.itemReceived.supplier_description =
        this.itemReceived.supplier.supplier_description;

      document.getElementById("delivery_number").focus();
    },

    async getItem(event, { item }) {
      // console.log("item", item);
    },

    async newPage() {
      this.editItem = false;
      this.resetItemReceived();
      this.itemsReceivedList = [];
      document.getElementById("supplier").focus();
    },

    async resetItemReceived() {
      this.itemReceived = {
        id: 0,
        supplier: null,
        branch: this.$auth.$storage.getUniversal("itemBranch"),
        supplier_name: null,
        supplier_address: null,
        supplier_phone: null,
        supplier_description: null,
        type_vat: true,
        received_number: null,
        received_date: moment().format("YYYY-MM-DD"),
        delivery_number: null,
        delivery_date: null,
        po_number: null,
        received_credit_term: 30,
        users_permissions_user: this.$auth.$state.user,
        quantity_total: 0,
        reduce_percen_1: 0,
        reduce_percen_2: 0,
        reduce_percen_3: 0,
        reduce_percen_4: 0,
        reduce_percen_5: 0,
        reduce_percen_sum: 0,
        reduce_money: 0,
        price_sum_no_vat: 0,
        price_vat: 0,
        price_sum_net: 0,
      };
    },

    async addReceivedList() {
      this.dialogaddReceivedList = true;
    },

    async closeDialogReceivedList() {
      this.dialogaddReceivedList = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
