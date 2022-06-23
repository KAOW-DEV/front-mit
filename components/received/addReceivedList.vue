<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        เพิ่ม รายละเอียดการรับเข้าสินค้า
        <v-spacer></v-spacer>
        <v-btn icon color="error" @click="$emit('closeDialogAddReceivedList')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              autofocus
              label="รหัสบาร์โค้ด"
              append-icon="mdi-magnify"
              ref="search"
              v-model="search"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.stop.enter="searchProductUnit"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="รหัสสินค้า (ภายใน)"
              v-model="itemReceivedList.product_internal_code"
              dense
              outlined
              hide-details=""
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="ชื่อสินค้า"
              v-model="itemReceivedList.product_name"
              dense
              outlined
              hide-details=""
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="หน่วยนับ"
              v-model="itemReceivedList.unit"
              dense
              outlined
              hide-details=""
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="ราคาทุนเดิม(NO VAT)"
              v-model="itemReceivedList.product_cost_no_vat"
              dense
              outlined
              readonly
              hide-details=""
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="ราคาทุนเดิม + VAT"
              v-model="itemReceivedList.product_cost_vat"
              dense
              outlined
              readonly
              hide-details=""
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              label="ราคาที่รับเข้าตามบิล/หน่วย"
              ref="price"
              append-icon="mdi-pencil"
              v-model="itemReceivedList.price"
              dense
              outlined
              type="number"
              min="1"
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter="$refs.reduct_percen_1.focus(), setValue0()"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="primary"
              dark
              v-if="$nuxt.$auth.$state.user.role.name == 'Manager'"
              >Check Csot</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์-1"
                      ref="reduct_percen_1"
                      append-icon="mdi-pencil"
                      v-model="itemReceivedList.reduct_percen_1"
                      dense
                      outlined
                      type="number"
                      min="0"
                      hide-details=""
                      @focus="$event.target.select()"
                      @keydown.enter="
                        $refs.reduct_percen_2.focus(), setValue0()
                      "
                      @keyup="calculatorReduct"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์-2"
                      ref="reduct_percen_2"
                      append-icon="mdi-pencil"
                      v-model="itemReceivedList.reduct_percen_2"
                      dense
                      outlined
                      type="number"
                      min="0"
                      hide-details=""
                      @focus="$event.target.select()"
                      @keydown.enter="
                        $refs.reduct_percen_3.focus(), setValue0()
                      "
                      @keyup="calculatorReduct"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์-3"
                      ref="reduct_percen_3"
                      append-icon="mdi-pencil"
                      v-model="itemReceivedList.reduct_percen_3"
                      dense
                      outlined
                      type="number"
                      min="0"
                      hide-details=""
                      @focus="$event.target.select()"
                      @keydown.enter="
                        $refs.reduct_percen_4.focus(), setValue0()
                      "
                      @keyup="calculatorReduct"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์-4"
                      ref="reduct_percen_4"
                      append-icon="mdi-pencil"
                      v-model="itemReceivedList.reduct_percen_4"
                      dense
                      outlined
                      type="number"
                      min="0"
                      hide-details=""
                      @focus="$event.target.select()"
                      @keydown.enter="
                        $refs.reduct_percen_5.focus(), setValue0()
                      "
                      @keyup="calculatorReduct"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์-5"
                      ref="reduct_percen_5"
                      append-icon="mdi-pencil"
                      v-model="itemReceivedList.reduct_percen_5"
                      dense
                      outlined
                      type="number"
                      min="0"
                      hide-details=""
                      @focus="$event.target.select()"
                      @keydown.enter="$refs.price_reduce.focus(), setValue0()"
                      @keyup="calculatorReduct"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ส่วนลดเปอร์เซ็นต์ (รวม)"
                      v-model="itemReceivedList.reduct_percen_sum"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด-1"
                      v-model="itemReceivedList.reduct_price_1"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด-2"
                      v-model="itemReceivedList.reduct_price_2"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด-3"
                      v-model="itemReceivedList.reduct_price_3"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด-4"
                      v-model="itemReceivedList.reduct_price_4"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด-5"
                      v-model="itemReceivedList.reduct_price_5"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="ราคาส่วนลด (รวม)"
                      v-model="itemReceivedList.reduct_price_sum"
                      dense
                      outlined
                      readonly
                      hide-details=""
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ส่วนลดจำนวนเงิน/หน่วย"
                  ref="price_reduce"
                  append-icon="mdi-pencil"
                  v-model="itemReceivedList.price_reduce"
                  dense
                  outlined
                  type="number"
                  min="0"
                  hide-details=""
                  @focus="$event.target.select()"
                  @keydown.enter="$refs.quantity.focus(), setValue0()"
                  @keyup="calculatorReduct"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="ราคา/หน่วย(หลังหักส่วนลด)"
                  v-model="itemReceivedList.price_after_reduce"
                  dense
                  outlined
                  readonly
                  hide-details=""
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="จำนวนที่รับเข้าจริงตามบิล"
                  ref="quantity"
                  id="quantity"
                  append-icon="mdi-pencil"
                  v-model="itemReceivedList.quantity"
                  dense
                  outlined
                  type="number"
                  min="1"
                  hide-details=""
                  @focus="$event.target.select()"
                  @keydown.enter="$refs.btnSave.$el.focus(), setValue0()"
                  @keyup="calculatorReduct"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="มูลค่าสินค้ารวม(ตามบิล)"
                  v-model="itemReceivedList.price_sum"
                  dense
                  outlined
                  readonly
                  hide-details=""
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
        <v-btn
          color="success"
          width="100"
          ref="btnSave"
          @click="pushItem"
          @keydown.enter="pushItem($event)"
          >บันทึก</v-btn
        >
        <v-btn
          color="error"
          width="100"
          @click="$emit('ressetItemReceivedList'), $refs.search.focus()"
          >เคลียร์ฟอร์ม</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogSearchProductUnit" persistent width="80%">
      <search-product-unit
        :items.sync="itemsProductUnit"
        :item.sync="itemProductUnit"
        :search="search"
        @closeDialog="closeDialogSearchProductUnit"
      ></search-product-unit>
    </v-dialog>
  </div>
</template>

<script>
import { duration } from "moment";
import searchProductUnit from "../product/searchProductUnit.vue";
export default {
  components: { searchProductUnit },
  props: ["itemReceivedList", "itemsReceivedList"],
  data() {
    return {
      search: null,

      itemsProductUnit: [],
      itemProductUnit: null,

      dialogSearchProductUnit: false,
    };
  },

  methods: {
    async searchProductUnit() {
      if (this.search != null) {
        this.itemProductUnit = await this.searchByBarcode();
        console.log("itemProductUnit", this.itemProductUnit);

        if (this.itemProductUnit == null) {
          this.itemsProductUnit = await this.searchByName();
          console.log("itemsProductUnit", this.itemsProductUnit);
          if (this.itemsProductUnit != null) {
            this.dialogSearchProductUnit = true;
          } else {
            this.alertNoData();
            this.itemsProductUnit = [];
            return;
          }
        }
      }
    },

    async setValue0() {
      if (this.itemReceivedList.price == "") {
        this.itemReceivedList.price = 0;
      }
      if (this.itemReceivedList.reduct_percen_1 == "") {
        this.itemReceivedList.reduct_percen_1 = 0;
      }
      if (this.itemReceivedList.reduct_percen_2 == "") {
        this.itemReceivedList.reduct_percen_2 = 0;
      }
      if (this.itemReceivedList.reduct_percen_3 == "") {
        this.itemReceivedList.reduct_percen_3 = 0;
      }
      if (this.itemReceivedList.reduct_percen_4 == "") {
        this.itemReceivedList.reduct_percen_4 = 0;
      }
      if (this.itemReceivedList.reduct_percen_5 == "") {
        this.itemReceivedList.reduct_percen_5 = 0;
      }
      if (this.itemReceivedList.price_reduce == "") {
        this.itemReceivedList.price_reduce = 0;
      }
      if (this.itemReceivedList.quantity == "") {
        this.itemReceivedList.quantity = 0;
      }
    },

    async resetTextInput() {
      this.itemReceivedList.reduct_percen_1 = 0;
      this.itemReceivedList.reduct_percen_2 = 0;
      this.itemReceivedList.reduct_percen_3 = 0;
      this.itemReceivedList.reduct_percen_4 = 0;
      this.itemReceivedList.reduct_percen_5 = 0;
      this.itemReceivedList.reduct_percen_sum = 0;

      this.itemReceivedList.reduct_price_1 = 0;
      this.itemReceivedList.reduct_price_2 = 0;
      this.itemReceivedList.reduct_price_3 = 0;
      this.itemReceivedList.reduct_price_4 = 0;
      this.itemReceivedList.reduct_price_5 = 0;
      this.itemReceivedList.reduct_price_sum = 0;

      this.itemReceivedList.price_reduce = 0;
      this.itemReceivedList.price_after_reduce = 0;
      this.itemReceivedList.quantity = 0;
      this.itemReceivedList.price_sum = 0;
    },

    async searchByBarcode() {
      let itemProduct = await this.$axios
        .get("/product-units?product_unit_barcode=" + this.search)
        .then((res) => {
          if (res.data.length > 0) {
            return res.data[0];
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });

      return itemProduct;
    },

    async searchByName() {
      let itemsPriductUnit = await this.$axios
        .get(
          "/product-units?product_unit_name_containss=" +
            this.search +
            "&_sort=product_unit_name:ASC&_limit=-1"
        )
        .then((res) => {
          if (res.data.length > 0) {
            return res.data;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });

      return itemsPriductUnit;
    },

    async getItemProduct(e) {
      console.log("e", e);

      this.resetTextInput();

      this.itemReceivedList.product_unit = this.itemProductUnit;
      this.search = this.itemProductUnit.product_unit_barcode;

      this.itemReceivedList.product_barcode =
        this.itemProductUnit.product_unit_barcode;

      this.itemReceivedList.product_internal_code =
        this.itemProductUnit.product_unit_internal_code;

      this.itemReceivedList.product_name =
        this.itemProductUnit.product_unit_name;

      this.itemReceivedList.unit = this.itemProductUnit.unit.unit_name;

      this.itemReceivedList.product_cost_vat = Number(
        await this.getOriginalCost()
      ).toFixed(2);

      this.itemReceivedList.product_cost_no_vat = Number(
        parseFloat(this.itemReceivedList.product_cost_vat) -
          parseFloat(this.itemReceivedList.product_cost_vat * 0.07)
      ).toFixed(2);

      this.itemReceivedList.price = Number(
        this.itemReceivedList.product_cost_vat
      ).toFixed(2);
      this.$refs.price.focus();

      console.log("itemReceivedList", this.itemReceivedList);
    },

    async getOriginalCost() {
      let cost = await this.$axios
        .get(
          "/received-lists?product_unit=" +
            this.itemProductUnit.id +
            "&_sort=id:DESC&_limit=1"
        )
        .then((res) => {
          console.log("getOriginalCost", res.data);
          if (res.data.length > 0) {
            return res.data[0].product_cost_vat;
          } else {
            return 0;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      return cost;
    },

    async calculatorReduct($event) {
      // console.log("e", $event.target);

      if (this.itemReceivedList.reduct_percen_1) {
        this.itemReceivedList.reduct_price_1 = Number(
          (this.itemReceivedList.price *
            this.itemReceivedList.reduct_percen_1) /
            100
        ).toFixed(2);
      } else {
        this.itemReceivedList.reduct_price_1 = 0;
        this.itemReceivedList.reduct_percen_2 = 0;
        this.itemReceivedList.reduct_percen_3 = 0;
        this.itemReceivedList.reduct_percen_4 = 0;
        this.itemReceivedList.reduct_percen_5 = 0;
      }

      if (this.itemReceivedList.reduct_percen_2) {
        this.itemReceivedList.reduct_price_2 = Number(
          (this.itemReceivedList.reduct_price_1 *
            this.itemReceivedList.reduct_percen_2) /
            100
        ).toFixed(2);
      } else {
        this.itemReceivedList.reduct_price_2 = 0;

        this.itemReceivedList.reduct_percen_3 = 0;
        this.itemReceivedList.reduct_percen_4 = 0;
        this.itemReceivedList.reduct_percen_5 = 0;
      }

      if (this.itemReceivedList.reduct_percen_3) {
        this.itemReceivedList.reduct_price_3 = Number(
          (this.itemReceivedList.reduct_price_2 *
            this.itemReceivedList.reduct_percen_3) /
            100
        ).toFixed(2);
      } else {
        this.itemReceivedList.reduct_price_3 = 0;
        this.itemReceivedList.reduct_percen_4 = 0;
        this.itemReceivedList.reduct_percen_5 = 0;
      }

      if (this.itemReceivedList.reduct_percen_4) {
        this.itemReceivedList.reduct_price_4 = Number(
          (this.itemReceivedList.reduct_price_3 *
            this.itemReceivedList.reduct_percen_4) /
            100
        ).toFixed(2);
      } else {
        this.itemReceivedList.reduct_price_4 = 0;
        this.itemReceivedList.reduct_percen_5 = 0;
      }

      if (this.itemReceivedList.reduct_percen_5) {
        this.itemReceivedList.reduct_price_5 = Number(
          (this.itemReceivedList.reduct_price_4 *
            this.itemReceivedList.reduct_percen_5) /
            100
        ).toFixed(2);
      } else {
        this.itemReceivedList.reduct_price_5 = 0;
      }

      this.itemReceivedList.reduct_percen_sum = Number(
        parseFloat(this.itemReceivedList.reduct_percen_1) +
          parseFloat(this.itemReceivedList.reduct_percen_2) +
          parseFloat(this.itemReceivedList.reduct_percen_3) +
          parseFloat(this.itemReceivedList.reduct_percen_4) +
          parseFloat(this.itemReceivedList.reduct_percen_5)
      ).toFixed(2);

      this.itemReceivedList.reduct_price_sum = Number(
        parseFloat(this.itemReceivedList.reduct_price_1) +
          parseFloat(this.itemReceivedList.reduct_price_2) +
          parseFloat(this.itemReceivedList.reduct_price_3) +
          parseFloat(this.itemReceivedList.reduct_price_4) +
          parseFloat(this.itemReceivedList.reduct_price_5)
      ).toFixed(2);

      // console.log("price_reduce", this.itemReceivedList.price_reduce);

      if (this.itemReceivedList.price_reduce != "") {
        this.itemReceivedList.price_after_reduce = Number(
          parseFloat(this.itemReceivedList.price) -
            (parseFloat(this.itemReceivedList.reduct_price_sum) +
              parseFloat(this.itemReceivedList.price_reduce))
        ).toFixed(2);
      } else {
        this.itemReceivedList.price_after_reduce = Number(
          parseFloat(this.itemReceivedList.price) -
            parseFloat(this.itemReceivedList.reduct_price_sum)
        ).toFixed(2);
      }

      this.itemReceivedList.price_sum = Number(
        parseFloat(this.itemReceivedList.price_after_reduce) *
          parseFloat(this.itemReceivedList.quantity)
      ).toFixed(2);

      // console.log("reduct_price_1", this.itemReceivedList.reduct_price_1);
      // console.log("reduct_price_2", this.itemReceivedList.reduct_price_2);
      // console.log("reduct_price_3", this.itemReceivedList.reduct_price_3);
      // console.log("reduct_price_4", this.itemReceivedList.reduct_price_4);
      // console.log("reduct_price_5", this.itemReceivedList.reduct_price_5);

      // console.log("reduct_price_sum", this.itemReceivedList.reduct_price_sum);
      // console.log("reduct_percen_sum", this.itemReceivedList.reduct_percen_sum);
    },

    async alertNoData() {
      this.$swal.fire({
        icon: "warning",
        title: "ไม่พบข้อมูลสินค้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async closeDialogSearchProductUnit() {
      this.dialogSearchProductUnit = false;
    },

    async alertChooseProduct() {
      this.$swal.fire({
        icon: "warning",
        title: "ยังไม่ได้เลือกสินค้า",
        text: "กรุณาเลือกสินค้าที่ต้องการรับเข้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertInputReducePercen() {
      this.$swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: 'กรุณากรอกข้อมูล "เปอร์เซ็นต์ส่วนลด" ให้ครบทุกช่อง',
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertInputQuantity() {
      this.$swal.fire({
        icon: "warning",
        title: "จำนวนรับเข้าเป็น 0",
        text: 'กรุณาระบุ "จำนวนที่รับเข้าจริงตามบิล"',
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async pushItem(e) {
      console.log("itemReceivedList", this.itemReceivedList);

      await this.setValue0();
      await this.calculatorReduct();

      if (this.itemReceivedList.product_unit == null) {
        this.alertChooseProduct();
        this.$refs.search.focus();
      } else if (this.itemReceivedList.quantity == 0) {
        this.alertInputQuantity();
        this.$refs.quantity.focus();
      } else {
        let item = await this.checkDuplicateProduct();
        // console.log("item", item);

        if (item) {
          let index = this.itemsReceivedList.indexOf(item);
          // console.log("index", index);

          let quantityOld = this.itemsReceivedList[index].quantity;
          // console.log("quantityOld", quantityOld);

          let quantity = this.itemReceivedList.quantity;
          // console.log("quantity", quantity);

          this.itemReceivedList.quantity = Number(
            parseInt(quantityOld) + parseInt(quantity)
          ).toFixed();

          this.itemReceivedList.price_sum = Number(
            parseFloat(this.itemReceivedList.price_after_reduce) *
              parseFloat(this.itemReceivedList.quantity)
          ).toFixed(2);

          this.itemsReceivedList.splice(index, 1, this.itemReceivedList);
          this.$emit("update:itemsReceivedList", this.itemsReceivedList);
          this.$emit("ressetItemReceivedList");

          console.log("itemReceivedList", this.itemReceivedList);
          console.log("itemsReceivedList", this.itemsReceivedList);
        } else {
          this.itemsReceivedList.push(this.itemReceivedList);
          this.$emit("update:itemsReceivedList", this.itemsReceivedList);
          this.$emit("ressetItemReceivedList");
        }
      }
    },

    async checkDuplicateProduct() {
      if (this.itemsReceivedList.length > 0) {
        // grab the Array item which matchs the id "2"
        let productUnitId = this.itemProductUnit.id;
        // console.log("productUnitId", productUnitId);
        let item = this.itemsReceivedList.find(
          (item) => item.product_unit.id === productUnitId
        );
        return item;
      }
    },
  },

  watch: {
    itemReceivedList(val) {
      if (val) {
        this.$refs.search.focus();
      }
    },

    itemProductUnit(val) {
      if (val) {
        this.getItemProduct();
      }
    },
  },

  created() {},

  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 74) {
        e.preventDefault();
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
