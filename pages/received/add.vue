<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          <v-btn
            color="primary"
            :to="{ name: 'received', params: { id: itemReceived.id } }"
          >
            <v-icon>mdi-table</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-alert color="success" text class="text-center" dense>
            <h1>ใบรับเข้า</h1>
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn color="success" class="float-end" @click="addItemReceived">
            <v-icon>mdi-database-plus</v-icon>
            สร้างใบรับเข้า (F1)
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="1">
              <v-row>
                <v-col cols="12">
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
                    readonly
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-switch
                      label="VAT"
                      v-model="itemReceived.type_vat"
                      hide-details=""
                      large
                      class="mt-n1 text-center"
                      color="red"
                      @click="calculator"
                    ></v-switch>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    label="ชื่อ/บริษัทฯ"
                    append-icon="mdi-pencil"
                    ref="supplier"
                    :items="itemsSupplier"
                    item-text="supplier_name"
                    item-value="id"
                    v-model="itemReceived.supplier"
                    return-object
                    dense
                    outlined
                    hide-details=""
                    required
                    @change="
                      $refs.delivery_date.focus(),
                        (menu2 = true),
                        autoInputItemSupplier()
                    "
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ที่อยู่"
                    v-model="itemReceived.supplier_address"
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
                    label="ผู้ติดต่อ"
                    v-model="itemReceived.supplier_description"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="โทรศัพท์"
                    v-model="itemReceived.supplier_phone"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3"></v-col>
            <v-col cols="1">
              <v-row>
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
                        append-icon="mdi-pencil"
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
                      @click:date="$refs.menu1.save(itemReceived.received_date)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu1 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu1.save(itemReceived.received_date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
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
              </v-row>
            </v-col>
            <v-col cols="1">
              <v-row>
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
                        append-icon="mdi-pencil"
                        ref="delivery_date"
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
                      @click:date="
                        $refs.menu2.save(itemReceived.delivery_date),
                          $refs.delivery_number.focus()
                      "
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menu2.save(itemReceived.delivery_date),
                            $refs.delivery_number.focus()
                        "
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="ใบส่งสินค้าเลขที่"
                    append-icon="mdi-pencil"
                    ref="delivery_number"
                    v-model="itemReceived.delivery_number"
                    dense
                    outlined
                    hide-details=""
                    @focus="$event.target.select()"
                    @keydown.enter="$refs.po_number.focus()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="1">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ใบสั่งซื้อเลขที่"
                    append-icon="mdi-pencil"
                    ref="po_number"
                    v-model="itemReceived.po_number"
                    dense
                    outlined
                    hide-details=""
                    @focus="$event.target.select()"
                    @keydown.enter="$refs.received_credit_term.focus()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="เครดิตเทอม (วัน)"
                    append-icon="mdi-pencil"
                    ref="received_credit_term"
                    v-model="itemReceived.received_credit_term"
                    dense
                    outlined
                    hide-details=""
                    type="number"
                    min="0"
                    @focus="$event.target.select()"
                    @keydown.enter="$refs.btnAddItemReceivedList.$el.focus()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" :disabled="selectItemDel" @click="delMultiItem">
            <v-icon>mdi-delete</v-icon>
            ลบรายการที่เลือก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            ref="btnAddItemReceivedList"
            color="primary"
            @click="addItemReceivedList"
            @keydown.enter="addItemReceivedList"
          >
            <v-icon>mdi-plus</v-icon>
            เพิ่มรายการ (F2)
          </v-btn>
        </v-card-actions>

        <v-divider></v-divider>

        <v-data-table
          v-model="itemsSelect"
          :headers="headersItemsReceivedList"
          :items="itemsReceivedList"
          item-key="product_name"
          fixed-header
          dense
          show-select
          @dblclick:row="getItem"
        >
          <template v-slot:item.index="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.price_after_reduce="{ item }">
            <v-currency-field :value="item.price_after_reduce" dense readonly />
          </template>
          <template v-slot:item.quantity="{ item }">
            <v-currency-field :value="item.quantity" dense readonly />
          </template>
          <template v-slot:item.price_sum="{ item }">
            <v-currency-field :value="item.price_sum" dense readonly />
          </template>
        </v-data-table>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <v-text-field
                label="ผู้จัดทำ"
                v-model="itemReceived.users_permissions_user.user_name"
                dense
                outlined
                hide-details=""
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="3">
              <v-row class="text-end">
                <v-col cols="2" class="text-center">
                  <v-alert color="error" text dense class="text-center">
                    ลด(%)
                  </v-alert>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="itemReceived.reduce_percen_1"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="itemReceived.reduce_percen_2"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="itemReceived.reduce_percen_3"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="itemReceived.reduce_percen_4"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="itemReceived.reduce_percen_5"
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
                <v-col cols="12">
                  <v-text-field
                    label="ลด(%) (รวม)"
                    v-model="itemReceived.reduce_percen_sum"
                    dense
                    outlined
                    hide-details=""
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
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
            <v-col cols="1">
              <v-text-field
                label="จำนวนที่รับเข้ารวม"
                v-model="itemReceived.quantity_total"
                dense
                outlined
                hide-details=""
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-currency-field
                label="ราคารวมไม่มีภาษี"
                v-model="itemReceived.price_sum_no_vat"
                dense
                outlined
                hide-details=""
                readonly
              ></v-currency-field>
            </v-col>
            <v-col cols="1">
              <v-currency-field
                label="VAT 7%"
                v-model="itemReceived.price_vat"
                dense
                outlined
                hide-details=""
                readonly
              ></v-currency-field>
            </v-col>
            <v-col cols="1">
              <v-currency-field
                label="ราคาสุทธิรวมภาษี"
                v-model="itemReceived.price_sum_net"
                dense
                outlined
                hide-details=""
                readonly
              ></v-currency-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="success" type="submit">
            <v-icon>mdi-content-save</v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>

    <v-dialog v-model="dialogAddReceivedList" persistent width="40%">
      <add-received-list
        :itemReceivedList.sync="itemReceivedList"
        :itemsReceivedList.sync="itemsReceivedList"
        :dialogAddReceivedList.sync="dialogAddReceivedList"
        @closeDialogAddReceivedList="closeDialogAddReceivedList"
        @ressetItemReceivedList="ressetItemReceivedList"
      ></add-received-list>
    </v-dialog>

    <v-dialog v-model="dialogEditReceivedList" persistent width="40%">
      <edit-received-list
        :itemReceivedList.sync="itemReceivedList"
        :itemsReceivedList.sync="itemsReceivedList"
        :dialogEditReceivedList.sync="dialogEditReceivedList"
        @closeDialogEditReceivedList="closeDialogEditReceivedList"
        @ressetItemReceivedList="ressetItemReceivedList"
      ></edit-received-list>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import addReceivedList from "~/components/received/addReceivedList.vue";
import editReceivedList from "~/components/received/editReceivedList.vue";

moment.locale("th");
export default {
  components: { addReceivedList, editReceivedList },
  data() {
    return {
      overlay: false,
      editItem: false,

      itemsBranch: [],
      itemsSupplier: [],

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

      menu1: false,
      menu2: false,

      yearMonth: moment().add(543, "year").format("YYMM"),
      number: null,
      receivedNumberLast: null,

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
        { text: "ราคาต่อหน่วย", value: "price_after_reduce" },
        { text: "จำนวน", value: "quantity" },
        { text: "จำนวนเงินรวม", value: "price_sum" },
        { text: "", align: "center", value: "deleteItem" },
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

      dialogAddReceivedList: false,
      dialogEditReceivedList: false,

      itemsSelect: [],
      itemsDelete: [],
      selectItemDel: true,
    };
  },

  methods: {
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

    async getItemsSupplier() {
      await this.$axios
        .get("/suppliers")
        .then((res) => {
          this.itemsSupplier = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async autoInputItemSupplier() {
      this.itemReceived.supplier_address =
        this.itemReceived.supplier.supplier_address;
      this.itemReceived.supplier_phone =
        this.itemReceived.supplier.supplier_phone;
      this.itemReceived.supplier_description =
        this.itemReceived.supplier.supplier_description;
    },

    async ressetItemReceived() {
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

    async ressetItemsReceivedList() {
      this.itemsReceivedList = [];
    },

    async ressetItemReceivedList() {
      this.itemReceivedList = {
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
      };
    },

    async alertConfirmAddReceived() {
      await this.$swal
        .fire({
          title: "ต้องการสร้างใบรับเข้าใหม่ \n ใช่หรือไม่",
          text: "รายการสินค้าจะถูกเคลียร์",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.ressetItemReceived();
            this.itemsReceivedList = [];
            this.editItemReceived = false;
            await this.$refs.supplier.focus();
          }
        });
    },

    async addItemReceived() {
      if (this.itemsReceivedList.length > 0) {
        this.alertConfirmAddReceived();
      } else {
        this.$refs.supplier.focus();
        this.ressetItemReceived();
        this.editItemReceived = false;
      }
    },

    async addItemReceivedList() {
      this.dialogAddReceivedList = true;
      this.ressetItemReceivedList();
    },

    async closeDialogAddReceivedList() {
      this.dialogAddReceivedList = false;
      this.calculator();
    },

    async closeDialogEditReceivedList() {
      this.dialogEditReceivedList = false;
      this.ressetItemReceivedList();
      this.calculator();
    },

    async getItem(event, { item }) {
      // console.log("item", item);
      this.itemReceivedList = item;
      this.editReceivedList();
    },

    async editReceivedList() {
      this.dialogEditReceivedList = true;
    },

    async calculator() {
      let vat = this.itemReceived.type_vat;

      let q = 0;
      let psnv = 0;
      let pv = 0;
      let psn = 0;

      if (vat) {
        for (const item of this.itemsReceivedList) {
          console.log("calculator", item);
          q = parseInt(q) + parseInt(item.quantity);
          psn += parseFloat(item.price_sum);
        }
        pv = parseFloat(psn) * parseFloat(0.07);
        psnv = parseFloat(psn) - parseFloat(pv);
      } else {
        for (const item of this.itemsReceivedList) {
          console.log("calculator", item);
          q = parseInt(q) + parseInt(item.quantity);
          psnv += parseFloat(item.price_sum);
        }

        pv = parseFloat(psnv) * parseFloat(0.07);
        psn = parseFloat(psnv) + parseFloat(pv);
      }

      this.itemReceived.quantity_total = Number(q).toFixed(); //จำนวนที่รับเข้ารวม
      this.itemReceived.price_sum_no_vat = Number(psnv).toFixed(2); //ราคารวมไม่มีภาษี
      this.itemReceived.price_vat = Number(pv).toFixed(2); //VAT 7%
      this.itemReceived.price_sum_net = Number(psn).toFixed(2); //ราคาสุทธิรวมภาษี
    },

    async delMultiItem() {
      // console.log("itemsSelect", this.itemsSelect);
      for (const item of this.itemsSelect) {
        let index = this.itemsReceivedList.indexOf(item);
        this.itemsReceivedList.splice(index, 1);
      }
      this.itemsSelect = [];
    },

    async checkSave() {
      console.log("itemReceived", this.itemReceived);
      console.log("itemsReceivedList", this.itemsReceivedList);
      this.$swal({
        title: "ต้องการบันทึกข้อมูล ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.insertReceived();
        }
      });
    },

    async insertReceived() {
      this.$axios.post("/receiveds/insertReceived", {
        itemReceived: this.itemReceived,
        itemsReceivedList: this.itemsReceivedList,
      });
    },
  },

  watch: {
    itemsSelect(val) {
      if (val.length > 0) {
        this.selectItemDel = false;
      } else {
        this.selectItemDel = true;
      }
    },

    itemsReceivedList(val) {
      if (val.length > 0) {
        this.calculator();
      }
    },
  },

  created() {
    this.getItemsBranch();
    this.getItemsSupplier();
  },

  mounted() {
    this.$refs.supplier.focus();

    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 112) {
        e.preventDefault();
        this.addItemReceived();
      } else if (e.keyCode == 113) {
        e.preventDefault();
        this.addItemReceivedList();
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
