<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>

    <received-title></received-title>

    <v-card>
      <v-card-title primary-title>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-btn color="success" class="float-end" @click="addItemReceived">
          <v-icon>mdi-database-plus</v-icon>
          สร้างใบรับเข้า (F1)
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="receivedDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="receivedDate"
                      label="วันที่ใบรับเข้า"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      hide-details=""
                      clearable
                      @click:clear="receivedDate = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="receivedDate"
                    no-title
                    scrollable
                    locale="th"
                    @click:date="$refs.menu1.save(receivedDate)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(receivedDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="เลขที่ใบรับเข้า"
                  v-model="receivedNumber"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  @click:clear="receivedNumber = null"
                >
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="deliveryDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="deliveryDate"
                      label="วันที่ใบรับเข้า"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                      hide-details=""
                      clearable
                      @click:clear="deliveryDate = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="deliveryDate"
                    no-title
                    scrollable
                    locale="th"
                    @click:date="$refs.menu2.save(deliveryDate)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(deliveryDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="เลขที่ใบส่งของ"
                  v-model="deliveryNumber"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  @click:clear="deliveryNumber = null"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อผู้ผลิต"
                  v-model="searchSupplier"
                  append-icon="mdi-magnify"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  :readonly="itemSupplier != null"
                  @click:clear="itemSupplier = null"
                  @focus="$event.target.select()"
                  @keydown.stop.enter="searchItemSupplier($event)"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อสินค้า"
                  v-model="searchProduct"
                  append-icon="mdi-magnify"
                  outlined
                  dense
                  hide-details=""
                  clearable
                  :readonly="itemProduct != null"
                  @click:clear="itemProduct = null"
                  @focus="$event.target.select()"
                  @keydown.stop.enter="searchItemProduct($event)"
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
        <v-btn color="primary" large @click="searchReceived"> ค้นหา </v-btn>
        <v-btn color="error" large @click="resetItemSearch"> เคลียร์ค่า </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsReceived"
        :items="itemsReceived"
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

    <!-- searchProduct -->
    <v-dialog v-model="dialogSearchProduct" persistent width="80%">
      <search-product
        :itemsProduct.sync="itemsProduct"
        :itemProduct.sync="itemProduct"
        :searchProduct.sync="searchProduct"
        @closeDialogSearchProduct="closeDialogSearchProduct"
      ></search-product>
    </v-dialog>

    <!-- searchSupplier -->
    <v-dialog v-model="dialogSearchSupplier" persistent width="80%">
      <search-supplier
        :itemsSupplier.sync="itemsSupplier"
        :itemSupplier.sync="itemSupplier"
        :searchSupplier.sync="searchSupplier"
        @closeDialogSearchSupplier="closeDialogSearchSupplier"
      ></search-supplier>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");

import searchProduct from "~/components/product/searchProduct.vue";
import searchSupplier from "~/components/supplier/searchSupplier.vue";
import ReceivedTitle from "~/components/received/receivedTitle.vue";

export default {
  components: { searchProduct, searchSupplier, ReceivedTitle },
  data() {
    return {
      overlay: false,
      dialogSearchProduct: false,
      dialogSearchSupplier: false,

      headersItemsReceived: [
        {
          text: "ลำดับ",
          value: "index",
          sortable: false,
        },
        {
          text: "วันที่รับเข้า",
          value: "received_date",
        },
        {
          text: "เลขที่ใบรับเข้า",
          value: "received_number",
        },
        {
          text: "ผู้ผลิต",
          value: "supplier_name",
        },
        {
          text: "วันที่ส่งของ",
          value: "delivery_date",
        },
        {
          text: "เลขที่ใบส่งของ",
          value: "delivery_number",
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
      itemsReceived: [],

      itemsProduct: [],
      itemProduct: null,

      itemsSupplier: [],
      itemSupplier: null,

      searchProduct: null,
      searchSupplier: null,

      receivedNumber: null,
      receivedDate: null,
      deliveryDate: null,
      deliveryNumber: null,

      menu1: false,
      menu2: false,
    };
  },

  methods: {
    // searchReceived
    async searchReceived() {
      let f1 = this.receivedDate;
      let f2 = this.receivedNumber;
      let f3 = this.deliveryDate;
      let f4 = this.deliveryNumber;
      let f5 = this.itemSupplier;
      let f6 = this.itemProduct;

      let s1 = "";
      let s2 = "";
      let s3 = "";
      let s4 = "";
      let s5 = "";
      let txtCondition = "";

      if (f6) {
        let items = await this.findItemProduct();

        if (items.length > 0) {
          let itemsReceived = items.filter((item) => {
            let itemFilter = {};

            if (f1) {
              itemFilter["received_date"] = f1;
            }

            if (f2) {
              itemFilter["received_number"] = f2;
            }

            if (f3) {
              itemFilter["delivery_date"] = f3;
            }
            if (f4) {
              itemFilter["delivery_number"] = f4;
            }

            if (f5) {
              itemFilter["supplier"] = f5.id;
            }

            // console.log("itemFilter", itemFilter);

            for (var key in itemFilter) {
              if (item[key] === undefined || item[key] != itemFilter[key])
                return false;
            }
            // console.log("item", item);
            return true;
          });

          this.itemsReceived = itemsReceived;
        } else {
          this.alertNotData();
        }
      }

      if (f6 == null) {
        if (f1) {
          s1 = "received_date=" + f1 + "&";
          txtCondition += s1;
        }

        if (f2) {
          s2 = "received_number=" + f2 + "&";
          txtCondition += s2;
        }

        if (f3) {
          s3 = "delivery_date=" + f3 + "&";
          txtCondition += s3;
        }

        if (f4) {
          s4 = "delivery_number=" + f4 + "&";
          txtCondition += s4;
        }

        if (f5) {
          s5 = "supplier=" + f5.id;
          txtCondition += s5;
        } else {
          txtCondition = String(txtCondition).substr(
            0,
            txtCondition.length - 1
          );
        }

        // console.log("txtCondition", txtCondition);

        if (f1 || f2 || f3 || f4 || f5) {
          let itemsReceived = await this.$axios
            .get("/receiveds?" + txtCondition + "&_sort=id:DESC")
            .then((res) => {
              // console.log("res", res.data);
              return res.data;
            })
            .catch((err) => {
              console.log("err", err);
            });

          if (itemsReceived.length > 0) {
            this.itemsReceived = itemsReceived;
            // console.log("itemsReceived", itemsReceived);
          } else {
            this.alertNotData();
          }
        }
      }
    },

    async findItemProduct() {
      let itemsReceived = await this.$axios
        .get(
          "/received-lists?product=" + this.itemProduct.id + "&_sort=id:DESC"
        )
        .then((res) => {
          // console.log("itemsReceived", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });

      // formatItemsReceived
      let items = [];

      if (itemsReceived.length > 0) {
        for (const item of itemsReceived) {
          items.push(item.received);
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
    async searchItemProduct(e) {
      // console.log("e", e);
      console.log("searchProduct", this.searchProduct);
      e.preventDefault();

      let itemProduct = await this.searchProductByBarcode();
      console.log("itemProduct", itemProduct);

      if (itemProduct) {
        this.itemProduct = itemProduct.product;
        this.searchProduct = itemProduct.product.product_name;
      } else {
        let itemsProduct = await this.searchProductByName();
        console.log("itemsProduct", itemsProduct);
        if (itemsProduct.length > 0) {
          this.itemsProduct = itemsProduct;
          this.dialogSearchProduct = true;
        } else {
          this.alertNotProduct();
        }
      }
    },

    async searchProductByBarcode() {
      if (this.searchProduct != null) {
        let itemProduct = await this.$axios
          .get("/product-units?product_unit_barcode=" + this.searchProduct)
          .then((res) => {
            console.log("searchProductByBarcode", res.data);
            return res.data[0];
          });
        return itemProduct;
      }
    },

    async searchProductByName() {
      if (this.searchProduct != null) {
        let itemsProduct = await this.$axios
          .get(
            "/products?product_name_containss=" +
              this.searchProduct +
              "&_sort=product_name:ASC&_limit=-1"
          )
          .then((res) => {
            if (res.data.length > 0) {
              console.log("searchProductByName", res.data);
              return res.data;
            } else {
              this.alertNotProduct();
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

    async getItemsReceived() {
      await this.$axios
        .get("/receiveds?" + "_sort=id:DESC")
        .then((res) => {
          this.itemsReceived = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // supplier
    async searchItemSupplier(e) {
      e.preventDefault();
      if (searchProduct) {
        let itemsSupplier = await this.$axios
          .get(
            "/suppliers?supplier_name_containss=" +
              this.searchSupplier +
              "&_sort=supplier_name:ASC&_limit=-1" +
              "&supplier_actived=true"
          )
          .then((res) => {
            return res.data;
          });

        // checkItemsSupplier
        if (itemsSupplier.length > 0) {
          console.log("itemsSupplier", itemsSupplier);
          this.itemsSupplier = itemsSupplier;
          this.dialogSearchSupplier = true;
        } else {
          this.alertNotSupplier();
        }
      }
    },

    async alertNotSupplier() {
      this.$swal({
        title: "ไม่พบข้อมูลผู้ผลิตในระบบ",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async resetItemSearch() {
      this.searchProduct = null;
      this.searchSupplier = null;

      this.itemsProduct = [];
      this.itemProduct = null;

      this.itemsSupplier = [];
      this.itemSupplier = null;
      this.receivedNumber = null;
      this.receivedDate = null;
      this.deliveryDate = null;
      this.deliveryNumber = null;

      await this.getItemsReceived();
    },

    async getItem(event, { item }) {
      console.log("item", item);
      this.$router.push("/received/" + item.id);
    },

    async closeDialogSearchProduct() {
      this.dialogSearchProduct = false;
    },

    async closeDialogSearchSupplier() {
      this.dialogSearchSupplier = false;
    },

    async addItemReceived() {
      await this.$router.push("/received/add");
    },

    async reloadPage(e) {
      // console.log("eAdd", e);
      if (e.keyCode == 112) {
        e.preventDefault();
        this.addItemReceived();
      } else if (e.keyCode == 74) {
        e.preventDefault();
      }
    },
  },

  created() {
    this.getItemsReceived();
    window.addEventListener("keydown", this.reloadPage);
  },

  destroyed() {
    window.removeEventListener("keydown", this.reloadPage);
  },
};
</script>

<style lang="scss" scoped>
</style>