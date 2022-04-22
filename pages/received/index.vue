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
                <v-btn color="success" class="float-end">เพิ่ม</v-btn>
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
                            v-model="itemReceived.Branch"
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
                            :items="itemsSupplier"
                            item-text="supplier_name"
                            item-value="id"
                            v-model="itemReceived.supplier"
                            return-object
                            dense
                            outlined
                            hide-details=""
                            required
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
                            label="เลขที่ใบรับสินค้า"
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
                                label="วันที่"
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
                                  $refs.menu1.save(itemReceived.received_date)
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="2">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="โทรศัพท์"
                            v-model="itemReceived.supplier_phone"
                            dense
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>
              <v-data-table
                :headers="headersItemsReceivedList"
                :items="ItemsReceivedList"
                dense
                @dblclick:row="getItem"
              >
                <template v-slot:item.index="{ item, index }">
                  {{ index + 1 }}
                </template>
              </v-data-table>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
moment.locales("th");
export default {
  data() {
    return {
      overlay: false,
      editItem: false,

      itemReceived: {
        id: 0,
        supplier: null,
        branch: null,
        supplier_name: null,
        supplier_address: null,
        supplier_phone: null,
        supplier_description: null,
        type_vat: true,
        received_number: null,
        received_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        delivery_number: null,
        delivery_date: null,
        po_number: null,
        received_credit_term: 0,
        users_permissions_user: null,
        quantity_total: 0,
        reduce_1: 0,
        reduce_2: 0,
        reduce_3: 0,
        reduce_4: 0,
        reduce_5: 0,
        reduce_money: 0,
        product_vat: 0,
        product_no_vat: 0,
        money_total_vat: 0,
        vat: 0,
        money_total_reduce: 0,
        money_vat: 0,
        money_net: 0,
      },

      itemsSupplier: [],
      itemsBranch: [],

      menu1: false,
      menu2: false,

      // receivedList
      headersItemsProduct: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "บาร์โค้ด", value: "product_code" },
        { text: "ชื่อสินค้า", value: "product_name" },
        { text: "คงเหลือ", value: "product_quantity" },
      ],
    };
  },

  created() {
    this.getData();
  },

  methods: {
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
          this.itemReceived.Branch =
            this.$auth.$storage.getUniversal("itemBranch");
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
    },

    async getItem(event, { item }) {
      // console.log("item", item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
