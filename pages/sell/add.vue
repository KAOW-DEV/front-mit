<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <sell-title></sell-title>

    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="float-end" @click="goToTable">
          ตาราง (F2)
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  autofocus
                  label="ส่งสินค้าให้"
                  append-icon="mdi-magnify"
                  ref="customer_code"
                  v-model="itemSell.customer_code"
                  dense
                  outlined
                  hide-details=""
                  @focus="$event.target.select()"
                  @keydown.enter.prevent="searchCustomer"
                  :clearable="itemCustomer != null"
                  :readonly="itemCustomer != null"
                  @click:clear="clearItemCustomer"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="itemSell.customer_price_level"
                  label="ราคาสินค้าที่ใช้"
                  ref="customer_price_level"
                  :items="itemsPriceLevel"
                  outlined
                  dense
                  hide-details=""
                  @change="$refs.customer_type.focus()"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  ไม่รวมภาษี
                  <v-switch
                    label=""
                    v-model="itemSell.vat_type"
                    hide-details=""
                    large
                    class="mt-n1 text-center"
                    color="red"
                    @click="calculator"
                  ></v-switch>
                  รวมภาษี
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อ/บริษัทฯ"
                  ref="customer_name"
                  v-model="itemSell.customer_name"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ที่อยู่"
                  ref="customer_address"
                  v-model="itemSell.customer_address"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="ผู้ติดต่อ"
                  ref="customer_description"
                  v-model="itemSell.customer_description"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="โทรศัพท์"
                  ref="customer_phone"
                  v-model="itemSell.customer_phone"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="แฟกซ์"
                  ref="customer_fax"
                  v-model="itemSell.customer_fax"
                  dense
                  outlined
                  hide-details=""
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="1">
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  label="เอกสารออกที่สาขา"
                  :items="itemsBranch"
                  item-text="branch_name"
                  item-value="id"
                  v-model="itemSell.branch"
                  return-object
                  dense
                  outlined
                  hide-details=""
                  disabled
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <v-row>
              <v-col cols="12">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="itemSell.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="itemSell.date"
                      label="วันที่"
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
                    v-model="itemSell.date"
                    no-title
                    scrollable
                    locale="th"
                    @click:date="$refs.menu1.save(itemSell.date)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(itemSell.date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ใบส่งสินค้าเลขที่"
                  v-model="itemSell.code"
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
                <v-text-field
                  v-model="itemSell.date_due"
                  label="ครบกำหนดวันที่"
                  dense
                  outlined
                  hide-details=""
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="เครดิตเทอม(วัน)"
                  ref="credit_term"
                  v-model="itemSell.credit_term"
                  dense
                  outlined
                  hide-details=""
                  type="number"
                  @focus="$event.target.select()"
                  @keyup="setDateDue"
                  @keyup.enter.prevent="$refs.btnAddProduct.$el.focus()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-btn
          color="error"
          :disabled="itemsSelect.length == 0"
          @click="delMultiItem"
        >
          <v-icon>mdi-delete</v-icon>
          ลบรายการที่เลือก
        </v-btn>
        <v-btn
          color="success"
          class="float-end"
          ref="btnAddProductByBarcode"
          @click="addItemSellListByBarcode"
          :disabled="itemCustomer == null"
        >
          ยิงบาร์โค้ด (F6)
        </v-btn>
        <v-btn
          color="primary"
          class="float-end"
          ref="btnAddProduct"
          @click="addItemSellList"
          :disabled="itemCustomer == null"
        >
          เพิ่มรายการสินค้า (F5)
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        v-model="itemsSelect"
        :headers="headersSellList"
        :items="itemsSellList"
        item-key="product_name"
        dense
        show-select
        disable-sort
        :items-per-page="-1"
        @dblclick:row="editItemSellList"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.price_net="{ item }">
          <v-currency-field :value="item.price_net" dense readonly />
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
          <v-col cols="1">
            <v-text-field
              label="ผู้จัดทำ"
              v-model="itemSell.users_permissions_user.user_name"
              dense
              outlined
              hide-details=""
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="10"></v-col>
          <v-col cols="1">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="itemSell.reduce_money"
                  label="ลดเงิน"
                  ref="reduce_money"
                  dense
                  outlined
                  hide-details=""
                  type="number"
                  @focus="$event.target.select()"
                  @keyup="calculator"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-currency-field
                  v-model="itemSell.price_sum"
                  label="รวม"
                  ref="price_sum"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-currency-field>
              </v-col>
              <v-col cols="12">
                <v-currency-field
                  v-model="itemSell.price_vat"
                  label="ภาษี 7%"
                  ref="price_vat"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-currency-field>
              </v-col>
              <v-col cols="12">
                <v-currency-field
                  v-model="itemSell.price_net"
                  label="สินค้าสิทธิ"
                  ref="price_net"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-currency-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title primary-title>
        <v-spacer></v-spacer>
        <v-btn color="success" ref="btnSave" @click="save">บันทึก (F10)</v-btn>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <dialog-search-customer
      :item.sync="itemCustomer"
      :items.sync="itemsCustomer"
      :dialog.sync="dialogSearchCustomer"
      :search.sync="itemSell.customer_code"
    ></dialog-search-customer>

    <dialog-item-sell-list
      :dialog.sync="dialogItemSellList"
      :item.sync="itemSellList"
      :items.sync="itemsSellList"
      :editItem.sync="editItem"
      :itemCustomer.sync="itemCustomer"
      @resetItemSellList="resetItemSellList"
    ></dialog-item-sell-list>

    <dialog-add-product-by-barcode
      :dialog.sync="dialogAddProductByBarcode"
      :itemSellList.sync="itemSellList"
      :itemsSellList.sync="itemsSellList"
      :itemCustomer.sync="itemCustomer"
      @resetItemSellList="resetItemSellList"
    ></dialog-add-product-by-barcode>
  </div>
</template>

<script>
import moment from "moment";
import DialogSearchCustomer from "~/components/customer/dialogSearchCustomer.vue";
import sellTitle from "~/components/sell/sellTitle.vue";
import DialogItemSellList from "~/components/sell/dialogItemSellList.vue";
import DialogAddProductByBarcode from "~/components/product/dialogAddProductByBarcode.vue";

moment.locale("th");
export default {
  components: {
    sellTitle,
    DialogSearchCustomer,
    DialogItemSellList,
    DialogAddProductByBarcode,
  },
  data() {
    return {
      overlay: false,

      itemSell: {
        branch: this.$auth.$storage.getUniversal("itemBranch"),
        code: null,
        date: moment().format("YYYY-MM-DD"),
        code_ref: null,
        date_ref: null,
        credit_term: 30,
        date_due: moment().add(30, "days").format("YYYY-MM-DD"),
        users_permissions_user: this.$auth.$state.user,
        customer: null,
        customer_code: null,
        customer_name: null,
        customer_address: null,
        customer_phone: null,
        customer_fax: null,
        customer_description: null,
        vat_type: true,
        customer_price_level: null,
        reduce_money: 0,
        price_sum: 0,
        price_vat: 0,
        price_net: 0,
        dateCreate: null,
        dateUpdate: null,
      },

      itemsBranch: [],

      itemsPriceLevel: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
      ],

      itemCustomer: null,
      itemsCustomer: [],
      dialogSearchCustomer: false,

      menu1: false,
      menu2: false,
      menu3: false,

      itemsSelect: [],

      headersSellList: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "รหัสสินค้าภายใน", value: "product_internal_code" },
        { text: "รหัสบาร์โค้ด", value: "product_barcode" },
        { text: "สินค้า/รายละเอียด", value: "product_name" },
        { text: "ราคาต่อหน่วย", value: "price_net" },
        { text: "จำนวน", value: "quantity" },
        { text: "หน่วยนับ", value: "product_unit_name" },
        { text: "จำนวนเงินรวม", value: "price_sum" },
      ],
      itemsSellList: [],

      itemSellList: {
        sell: null,
        product: null,
        product_unit: null,
        product_barcode: null,
        product_name: null,
        product_unit_name: null,
        quantity: 1,
        price: 0,
        percen_reduce: 0,
        percen_reduce_money: 0,
        money_reduce: 0,
        percen_plus: 0,
        percen_plus_money: 0,
        money_plus: 0,
        price_net: 0,
        price_sum: 0,
        full_price: 0,
        discount_percen: 0,
        base_on: 0,
        adjus_table: 0,
        limit_accept: 0,
        customer_price_level: null,
      },

      dialogItemSellList: false,
      editItem: false,

      dialogAddProductByBarcode: false,
    };
  },

  methods: {
    async save() {
      let chkNullItemCustomer = await this.checkNullItemCustomer();
      let chkNullItemsSellList = await this.checkNullItemsSellList();
      // console.log("chkNullItemsSellList", chkNullItemsSellList);

      if (!chkNullItemCustomer) {
        this.alertNoCustomer();
        this.$nextTick(() => {
          this.$refs.customer_code.focus();
        });
        return;
      } else if (!chkNullItemsSellList) {
        this.alertNoListItem();
        this.$nextTick(() => {
          this.$refs.btnAddProduct.$el.focus();
        });
        return;
      } else {
        this.saveConfirm();
      }
    },

    async saveConfirm() {
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
          this.overlay = true;
          this.insert();
        }
      });
    },

    async insert() {
      let itemSell = await this.insertSell();
      this.itemSell = itemSell;
      console.log("itemSell", itemSell);

      if (itemSell) {
        let itemsSellList = await this.insertSellList();

        if (itemsSellList.length > 0) {
          this.overlay = false;
          this.$router.push("/sell/" + itemSell.id);
          this.alertSuccess();
        } else {
          this.alertError();
          return;
        }
      } else {
        this.alertError();
        return;
      }
    },

    async genCode() {
      let yearMonth = moment().add(543, "year").format("YYMM");
      let number = null;
      let genCode = null;
      let str = null;

      let code = await this.$axios
        .get("/sells?_sort=id:DESC&_limit=1")
        .then((res) => {
          if (res.data.length > 0) {
            let codeLast = res.data[0].code;
            // console.log("codeLast", codeLast);

            let ym = codeLast.substring(0, 4);
            let no = codeLast.substring(4);

            if (ym == yearMonth) {
              str = String(parseInt(no) + 1);
              number = str.padStart(4, "0");
            } else {
              str = "1";
              number = str.padStart(4, "0");
            }

            genCode = yearMonth + number;
            // console.log("code", code);
            return genCode;
          } else {
            str = "1";
            number = str.padStart(4, "0");
            genCode = yearMonth + number;
            return genCode;
          }
        });

      return code;
    },

    async insertSell() {
      let code = await this.genCode();
      this.itemSell.code = code;
      // console.log("code", code);

      let itemSell = await this.$axios
        .post("/sells/insertSell", {
          itemSell: this.itemSell,
        })
        .then((res) => {
          // console.log("insertSell", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      return itemSell;
    },

    async insertSellList() {
      let itemsSellList = await this.$axios
        .post("/sell-lists/insertSellList", {
          itemSell: this.itemSell,
          itemsSellList: this.itemsSellList,
        })
        .then((res) => {
          console.log("res", res.data);
          return res.data;
        })
        .catch((err) => {
          this.alertError();
          console.log("err", err);
          return;
        });

      return itemsSellList;
    },

    // alert
    async alertSuccess() {
      this.$swal({
        title: "บันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertError() {
      this.$swal({
        title: "เกิดข้อผิดพลาด",
        text: "ตรวจสอบความถูกต้องของข้อมูล ก่อนบันทึก",
        icon: "error",
      });
    },

    async checkNullItemCustomer() {
      if (this.itemCustomer) {
        return true;
      } else {
        return false;
      }
    },

    async checkNullItemsSellList() {
      if (this.itemsSellList.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    async alertNoCustomer() {
      this.$swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลลูกค้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertNoListItem() {
      this.$swal.fire({
        icon: "warning",
        title: "ไม่มีรายการสินค้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async calculator() {
      let vat = this.itemSell.vat_type;

      let reduceMoney = this.itemSell.reduce_money; //ลดเงิน
      let priceSum = 0; //รวม
      let priceVat = 0; //ภาษี %
      let priceNet = 0; //ราคาสินค้าสุทธิ

      // console.log("itemsSellList", this.itemsSellList);

      //คำนวณราคารวม
      for (let index = 0; index < this.itemsSellList.length; index++) {
        priceSum = Number(
          parseFloat(priceSum) + parseFloat(this.itemsSellList[index].price_sum)
        ).toFixed(2);
      }

      if (reduceMoney) {
        priceSum = Number(
          parseFloat(priceSum) - parseFloat(reduceMoney)
        ).toFixed(2);
      }

      // console.log("priceSum", priceSum);

      if (vat) {
        priceNet = priceSum;
        priceVat = Number((parseFloat(priceNet) * 7) / 100).toFixed(2);
        priceSum = Number(parseFloat(priceNet) - parseFloat(priceVat)).toFixed(
          2
        );
      } else {
        priceNet = priceSum;
        priceVat = 0.0;
      }

      this.itemSell.reduce_money = reduceMoney;
      this.itemSell.price_sum = priceSum;
      this.itemSell.price_vat = priceVat;
      this.itemSell.price_net = priceNet;
    },

    async addItemSellListByBarcode() {
      if (this.itemCustomer) {
        this.$refs.btnAddProduct.$el.focus();
        this.resetItemSellList();
        this.dialogAddProductByBarcode = true;
        this.editItem = false;
      } else {
        this.$refs.customer_code.focus();
      }
    },

    async addItemSellList() {
      if (this.itemCustomer) {
        this.$refs.btnAddProduct.$el.focus();
        this.resetItemSellList();
        this.dialogItemSellList = true;
        this.editItem = false;
      } else {
        this.$refs.customer_code.focus();
      }
    },

    async resetItemSellList() {
      this.itemSellList = {
        sell: null,
        product: null,
        product_unit: null,
        product_barcode: null,
        product_name: null,
        product_unit_name: null,
        quantity: 1,
        price: 0,
        percen_reduce: 0,
        percen_reduce_money: 0,
        money_reduce: 0,
        percen_plus: 0,
        percen_plus_money: 0,
        money_plus: 0,
        price_net: 0,
        price_sum: 0,
        full_price: 0,
        discount_percen: 0,
        base_on: 0,
        adjus_table: 0,
        limit_accept: 0,
        customer_price_level: null,
      };
    },

    async delMultiItem() {
      for (const item of this.itemsSelect) {
        let index = this.itemsSellList.indexOf(item);
        this.itemsSellList.splice(index, 1);
      }
      this.itemsSelect = [];
    },

    async searchCustomer() {
      if (this.itemSell.customer_code) {
        let itemCustomer = await this.getItemCustomerByCode();

        if (itemCustomer) {
          this.itemCustomer = itemCustomer;
          this.autoInputItemCustomer();
        } else {
          this.getItemsCustomerByName();
        }
      }
    },

    async getItemCustomerByCode() {
      let item = await this.$axios
        .get("/customers?code=" + this.itemSell.customer_code)
        .then((res) => {
          console.log("getItemsCustomerByCode", res.data);
          if (res.data.length > 0) {
            return res.data[0];
          } else {
            return false;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      return item;
    },

    async getItemsCustomerByName() {
      this.itemsCustomer = await this.$axios
        .get(
          "/customers?name_containss=" +
            this.itemSell.customer_code +
            "&_sort=name:ASC&_limit=-1"
        )
        .then((res) => {
          //   console.log("getItemsCustomer", res.data);
          if (res.data.length > 0) {
            this.dialogSearchCustomer = true;
            return res.data;
          } else {
            this.alertNotData();
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async autoInputItemCustomer() {
      let chkSuspendSales = await this.checkSuspendSales();
      console.log("chkSuspendSales", chkSuspendSales);

      if (!chkSuspendSales) {
        this.itemSell.customer = this.itemCustomer;
        this.itemSell.customer_code = this.itemCustomer.code;
        this.itemSell.customer_name = this.itemCustomer.name;
        this.itemSell.customer_address = this.itemCustomer.address_1;
        this.itemSell.customer_phone = this.itemCustomer.phone;
        this.itemSell.customer_fax = this.itemCustomer.fax;
        this.itemSell.customer_description = this.itemCustomer.description;
        this.itemSell.customer_price_level = this.itemCustomer.price_level;

        this.$nextTick(() => {
          this.$refs.credit_term.focus();
        });
      } else {
        this.alertSuspendSales();
        this.clearItemCustomer();
        this.$nextTick(() => {
          this.$refs.customer_code.focus();
        });
      }
    },

    async checkSuspendSales() {
      if (this.itemCustomer.suspend_sales) {
        return true;
      } else {
        return false;
      }
    },

    async alertNotData() {
      this.$swal.fire({
        title: "ไม่พบข้อมูล",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertSuspendSales() {
      this.$swal.fire({
        title: "ระงับการขาย (ชั่วคราว)",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async clearItemCustomer() {
      this.itemCustomer = null;
      this.itemSell.customer = null;
      this.itemSell.customer_code = null;
      this.itemSell.customer_name = null;
      this.itemSell.customer_address = null;
      this.itemSell.customer_phone = null;
      this.itemSell.customer_fax = null;
      this.itemSell.customer_description = null;
      this.itemSell.customer_price_level = null;
    },

    async setDateDue() {
      if (this.itemSell.credit_term) {
        this.itemSell.date_due = moment()
          .add(this.itemSell.credit_term, "days")
          .format("YYYY-MM-DD");
      }
    },

    async getItemsBranch() {
      this.itemsBranch = await this.$axios
        .get("/branches")
        .then((res) => {
          // console.log("itemsBranch", res.data);
          return res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async getData() {
      this.getItemsBranch();
    },

    async editItemSellList(e, { item }) {
      this.itemSellList = item;
      this.dialogItemSellList = true;
      this.editItem = true;
    },

    async goToTable() {
      this.$router.push("/sell");
    },

    async getEvent(e) {
      //   console.log("e", e);
      if (e.keyCode == 113) {
        e.preventDefault();
        this.goToTable();
      } else if (e.keyCode == 116) {
        e.preventDefault();
        this.addItemSellList();
      } else if (e.keyCode == 117) {
        e.preventDefault();
        this.addItemSellListByBarcode();
      } else if (e.keyCode == 121) {
        e.preventDefault();
        this.save();
      }
    },
  },

  watch: {
    itemCustomer(val) {
      if (val) {
        this.autoInputItemCustomer();
      }
    },

    itemsSellList(val) {
      if (val) {
        this.calculator();
      }
    },
  },

  created() {
    this.getData();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped>
</style>