<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <sell-title></sell-title>

    <v-row>
      <v-col cols="12">
        <v-btn color="success" class="float-end" @click="addItemSell">
          <v-icon>mdi-database-plus</v-icon>
          สร้างใบส่งสินค้าชั่วคราว (F1)
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="dateStart"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateStart"
                      label="วันที่เริ่มต้น"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      hide-details=""
                      clearable
                      @click:clear="dateStart = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateStart"
                    no-title
                    scrollable
                    locale="th"
                    @click:date="$refs.menu1.save(dateStart)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(dateStart)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="dateEnd"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateEnd"
                      label="สิ้นสุดวันที่"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      hide-details=""
                      clearable
                      @click:clear="dateEnd = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateEnd"
                    no-title
                    scrollable
                    locale="th"
                    @click:date="$refs.menu2.save(dateEnd)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(dateEnd)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="เลขที่ใบส่งสินค้า"
                  v-model="sellCode"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  @click:clear="sellCode = null"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อลูกค้า"
                  v-model="customerName"
                  append-icon="mdi-magnify"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  :readonly="itemCustomer != null"
                  @click:clear="itemCustomer = null"
                  @focus="$event.target.select()"
                  @keydown.enter.prevent="searchItemCustomer"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อสินค้า"
                  v-model="productName"
                  append-icon="mdi-magnify"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  :readonly="itemProductUnit != null"
                  @click:clear="itemProductUnit = null"
                  @focus="$event.target.select()"
                  @keydown.enter.prevent="searchItemProduct"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="search"> ค้นหา </v-btn>
        <v-btn color="error" @click="reset"> เคลียร์ค่า </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="itemsSell"
        fixed-header
        disable-sort
        @dblclick:row="getItem"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.quantity_total="{ item }">
          <v-currency-field :value="item.quantity_total" dense readonly />
        </template>
        <template v-slot:item.price_sum_net="{ item }">
          <v-currency-field :value="item.price_sum_net" dense readonly />
        </template>
        <template v-slot:item.type_vat="{ item }">
          <v-chip v-if="item.type_vat == true" color="success">VAT</v-chip>
          <v-chip v-else color="error">NO VAT</v-chip>
        </template>
      </v-data-table>
    </v-card>

    <!-- dialogSearchCustomer -->
    <dialog-search-customer
      :items.sync="itemsCustomer"
      :item.sync="itemCustomer"
      :search="customerName"
      :dialog.sync="dialogSearchCustomer"
    ></dialog-search-customer>

    <!-- dialogSearchProduct -->
    <dialog-search-product
      :items.sync="itemsProduct"
      :item.sync="itemProductUnit"
      :search="productName"
      :dialog.sync="dialogSearchProduct"
    ></dialog-search-product>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");

import SellTitle from "~/components/sell/sellTitle.vue";
import DialogSearchProduct from "~/components/product/dialogSearchProduct.vue";
import DialogSearchCustomer from "~/components/customer/dialogSearchCustomer.vue";

export default {
  components: { SellTitle, DialogSearchProduct, DialogSearchCustomer },
  data() {
    return {
      overlay: false,
      dialogSearchProduct: false,
      dialogSearchCustomer: false,

      dateStart: null,
      dateEnd: null,
      sellCode: null,
      customerName: null,
      productName: null,

      headers: [
        {
          text: "ลำดับ",
          value: "index",
          sortable: false,
        },
        {
          text: "วันที่ขาย",
          value: "sell_date",
        },
        {
          text: "เลขที่ใบส่งสินค้าชั่วคราว",
          value: "sell_number",
        },
        {
          text: "ลูกค้า",
          value: "customer_name",
        },
        {
          text: "จำนวน",
          value: "quantity_total",
        },
        {
          text: "ยอดรวมสุทธิ",
          value: "price_sum_net",
        },
        {
          text: "VAT",
          value: "type_vat",
          align: "center",
        },
      ],
      itemsSell: [],

      itemsProduct: [],
      itemProductUnit: null,

      itemsCustomer: [],
      itemCustomer: null,

      productName: null,
      customerName: null,

      menu1: false,
      menu2: false,

      itemFilter: {},
    };
  },

  methods: {
    // search
    async search() {
      let f1 = this.dateStart;
      let f2 = this.dateEnd;
      let f3 = this.sellCode;
      let f4 = this.itemCustomer;
      let f5 = this.itemProductUnit;

      if (f1) {
        this.itemFilter["created_by_gte"] = this.dateStart;
      }
      if (f2) {
        this.itemFilter["created_by_lte"] = this.dateEnd;
      }
      if (f3) {
        this.itemFilter["code"] = this.sellCode;
      }
      if (f4) {
        this.itemFilter["customer"] = this.itemCustomer;
      }

      console.log("itemFilter", this.itemFilter);

      let items = await this.getItemsFilter();
      console.log("items", items);
    },

    async getItemsFilter() {
      let items = await this.$axios
        .post("/sells/filter", {
          itemFilter: this.itemFilter,
        })
        .then((res) => {
          if (res.data.length > 0) {
            return res.data;
          } else {
            return false;
          }
        })
        .catch((err) => {
          this.alertNotData();
        });
      return items;
    },

    async findItemProduct() {
      let itemsSell = await this.$axios
        .get(
          "/sell-lists?product=" + this.itemProductUnit.id + "&_sort=id:DESC"
        )
        .then((res) => {
          // console.log("itemsSell", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });

      // formatItemsSell
      let items = [];

      if (itemsSell.length > 0) {
        for (const item of itemsSell) {
          items.push(item.sell);
        }

        // console.log("items", items);
      }

      return items;
    },

    async alertNotData() {
      this.$swal({
        title: "ไม่พบข้อมูล",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    // product
    async searchItemProduct() {
      console.log("productName", this.productName);

      let itemProductUnit = await this.productNameByBarcode();
      console.log("itemProductUnit", itemProductUnit);

      if (itemProductUnit) {
        this.itemProductUnit = itemProductUnit;
        this.productName = itemProductUnit.product_unit_name;
      } else {
        let itemsProduct = await this.productNameByName();
        console.log("itemsProduct", itemsProduct);
        if (itemsProduct.length > 0) {
          this.itemsProduct = itemsProduct;
          this.dialogSearchProduct = true;
        } else {
          this.alertNotProduct();
          this.itemProductUnit = null;
        }
      }
    },

    async productNameByBarcode() {
      if (this.productName != null) {
        let itemProductUnit = await this.$axios
          .get("/product-units?product_unit_barcode=" + this.productName)
          .then((res) => {
            console.log("productNameByBarcode", res.data);
            return res.data[0];
          });
        return itemProductUnit;
      }
    },

    async productNameByName() {
      if (this.productName) {
        let itemsProduct = await this.$axios
          .get(
            "/product-units?product_unit_name_containss=" +
              this.productName +
              "&_sort=product_unit_name:ASC&_limit=-1"
          )
          .then((res) => {
            if (res.data.length > 0) {
              console.log("productNameByName", res.data);
              return res.data;
            } else {
              return false;
            }
          });

        return itemsProduct;
      }
    },

    async alertNotProduct() {
      this.$swal({
        title: "ไม่พบข้อมูลสินค้าในระบบ",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async getItemsSell() {
      await this.$axios
        .get("/sells?_sort=id:DESC")
        .then((res) => {
          this.itemsSell = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // customer
    async searchItemCustomer() {
      if (this.customerName) {
        let itemsCustomer = await this.$axios
          .get(
            "/customers?name_containss=" +
              this.customerName +
              "&_sort=name:ASC&_limit=-1" +
              "&actived=true"
          )
          .then((res) => {
            return res.data;
          });

        // checkItemsCustomer
        if (itemsCustomer.length > 0) {
          console.log("itemsCustomer", itemsCustomer);
          this.itemsCustomer = itemsCustomer;
          this.dialogSearchCustomer = true;
        } else {
          this.alertNotCustomer();
          this.itemCustomer = null;
        }
      }
    },

    async alertNotCustomer() {
      this.$swal({
        title: "ไม่พบข้อมูลลูกค้าในระบบ",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async reset() {
      this.productName = null;
      this.customerName = null;

      this.itemsProduct = [];
      this.itemProductUnit = null;

      this.itemsCustomer = [];
      this.itemCustomer = null;

      this.dateStart = null;
      this.dateEnd = null;
      this.sellCode = null;

      await this.getItemsSell();
    },

    async getItem(event, { item }) {
      console.log("item", item);
      this.$router.push("/sell/" + item.id);
    },

    async closeDialogSearchProduct() {
      this.dialogSearchProduct = false;
    },

    async closeDialogSearchCustomer() {
      this.dialogSearchCustomer = false;
    },

    async addItemSell() {
      await this.$router.push("/sell/add");
    },

    async getEvent(e) {
      // console.log("eAdd", e);
      if (e.keyCode == 112) {
        e.preventDefault();
        this.addItemSell();
      } else if (e.keyCode == 74) {
        e.preventDefault();
      }
    },
  },

  watch: {
    itemCustomer(val) {
      if (val) {
        this.customerName = val.name;
      }
    },
    itemProductUnit(val) {
      if (val) {
        this.productName = val.product_unit_name;
      }
    },
  },

  created() {
    this.getItemsSell();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped>
</style>