<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        แก้ไข รายละเอียดการรับเข้าสินค้า
        <v-spacer></v-spacer>
        <!-- <v-btn icon color="error" @click="$emit('closeDialogEditReceivedList')">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="รหัสบาร์โค้ด"
              append-icon="mdi-eye"
              ref="search"
              v-model="search"
              dense
              outlined
              hide-details=""
              @focus="$event.target.select()"
              @keydown.enter="searchProductUnit"
              readonly
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
              @keyup="calculatorReduct"
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
                  @keydown.enter="checkQuantityInput($event), setValue0()"
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
          @keydown.stop.enter="pushItem"
          >บันทึก</v-btn
        >
        <!-- <v-btn
          color="error"
          width="100"
          @click="$emit('ressetItemReceivedList'), $refs.search.focus()"
          >เคลียร์ฟอร์ม</v-btn
        > -->
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

    async getItemProduct() {
      // this.resetTextInput();

      this.itemReceivedList.product_unit = this.itemProductUnit;
      this.search = this.itemProductUnit.product_unit_barcode;

      this.itemReceivedList.product_barcode =
        this.itemProductUnit.product_unit_barcode;

      this.itemReceivedList.product_internal_code =
        this.itemProductUnit.product_unit_internal_code;

      this.itemReceivedList.product_name =
        this.itemProductUnit.product_unit_name;

      this.itemReceivedList.unit = this.itemProductUnit.unit.unit_name;

      this.itemReceivedList.product_cost_vat = await this.getOriginalCost();

      this.itemReceivedList.product_cost_no_vat = Number(
        parseFloat(this.itemReceivedList.product_cost_vat) -
          parseFloat(this.itemReceivedList.product_cost_vat * 0.07)
      ).toString(2);

      this.itemReceivedList.price = Number(
        this.itemReceivedList.product_cost_vat
      ).toFixed(2);

      this.$nextTick(() => {
        this.$refs.price.focus();
      });
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

      let p = this.itemReceivedList.price;

      let pc_1 = this.itemReceivedList.reduct_percen_1;
      let pc_2 = this.itemReceivedList.reduct_percen_2;
      let pc_3 = this.itemReceivedList.reduct_percen_3;
      let pc_4 = this.itemReceivedList.reduct_percen_4;
      let pc_5 = this.itemReceivedList.reduct_percen_5;
      let pc_sum = 0;

      let pr_1 = this.itemReceivedList.reduct_price_1;
      let pr_2 = this.itemReceivedList.reduct_price_2;
      let pr_3 = this.itemReceivedList.reduct_price_3;
      let pr_4 = this.itemReceivedList.reduct_price_4;
      let pr_5 = this.itemReceivedList.reduct_price_5;
      let pr_sum = 0;

      let pr = this.itemReceivedList.price_reduce;
      let par = this.itemReceivedList.price_after_reduce;

      let q = this.itemReceivedList.quantity;
      let p_sum = this.itemReceivedList.price_sum;

      if (pc_1) {
        pr_1 = Number(p * (pc_1 / 100)).toFixed(2);
      } else {
        pr_1 = 0;
        pr_2 = 0;
        pr_3 = 0;
        pr_4 = 0;
        pr_5 = 0;
        pc_2 = 0;
        pc_3 = 0;
        pc_4 = 0;
        pc_5 = 0;
      }

      if (pc_2) {
        pr_2 = Number(
          (parseFloat(p) - parseFloat(pr_1)) * parseFloat(pc_2 / 100)
        ).toFixed(2);
      } else {
        pr_2 = 0;
        pr_3 = 0;
        pr_4 = 0;
        pr_5 = 0;
        pc_3 = 0;
        pc_4 = 0;
        pc_5 = 0;
      }

      if (pc_3) {
        pr_3 = Number(
          (parseFloat(p) - (parseFloat(pr_1) + parseFloat(pr_2))) *
            parseFloat(pc_3 / 100)
        ).toFixed(2);
      } else {
        pr_3 = 0;
        pr_4 = 0;
        pr_5 = 0;
        pc_4 = 0;
        pc_5 = 0;
      }

      if (pc_4) {
        pr_4 = Number(
          (parseFloat(p) -
            (parseFloat(pr_1) + parseFloat(pr_2) + parseFloat(pr_3))) *
            parseFloat(pc_4 / 100)
        ).toFixed(2);
      } else {
        pr_4 = 0;
        pr_5 = 0;
        pc_5 = 0;
      }

      if (pc_5) {
        pr_5 = Number(
          (parseFloat(p) -
            (parseFloat(pr_1) +
              parseFloat(pr_2) +
              parseFloat(pr_3) +
              parseFloat(pr_4))) *
            parseFloat(pc_5 / 100)
        ).toFixed(2);
      } else {
        pr_5 = 0;
      }

      pr_sum = Number(
        parseFloat(pr_1) +
          parseFloat(pr_2) +
          parseFloat(pr_3) +
          parseFloat(pr_4) +
          parseFloat(pr_5)
      ).toFixed(2);

      pc_sum = Number(parseFloat(pr_sum * 100) / parseFloat(p)).toFixed(2);

      if (pr) {
        if (pr_sum > 0) {
          par = Number(parseFloat(pr_sum) - parseFloat(pr)).toFixed(2);
        } else {
          par = Number(parseFloat(p) - parseFloat(pr)).toFixed(2);
        }
      } else {
        if (pr_sum > 0) {
          par = pr_sum;
        } else {
          par = p;
        }
      }

      if (q) {
        p_sum = Number(parseFloat(par) * parseFloat(q)).toFixed(2);
      } else {
        p_sum = 0;
      }

      this.itemReceivedList.price = p;

      this.itemReceivedList.reduct_percen_1 = pc_1;
      this.itemReceivedList.reduct_percen_2 = pc_2;
      this.itemReceivedList.reduct_percen_3 = pc_3;
      this.itemReceivedList.reduct_percen_4 = pc_4;
      this.itemReceivedList.reduct_percen_5 = pc_5;
      this.itemReceivedList.reduct_percen_sum = pc_sum;

      this.itemReceivedList.reduct_price_1 = pr_1;
      this.itemReceivedList.reduct_price_2 = pr_2;
      this.itemReceivedList.reduct_price_3 = pr_3;
      this.itemReceivedList.reduct_price_4 = pr_4;
      this.itemReceivedList.reduct_price_5 = pr_5;
      this.itemReceivedList.reduct_price_sum = pr_sum;

      this.itemReceivedList.price_reduce = pr;
      this.itemReceivedList.price_after_reduce = par;

      this.itemReceivedList.quantity = q;
      this.itemReceivedList.price_sum = p_sum;
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

    async checkQuantityInput(e) {
      e.preventDefault();
      let checkQuantity = false;

      if (this.itemReceivedList.quantity == 0) {
        await this.alertInputQuantity();
        this.$nextTick(() => {
          this.$refs.quantity.focus();
        });
        checkQuantity = false;
      } else {
        this.$refs.btnSave.$el.focus();
        checkQuantity = true;
      }

      return checkQuantity;
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
      // console.log("e", e);

      await this.setValue0();
      await this.calculatorReduct();

      let checkQuantity = await this.checkQuantityInput(e);
      // console.log("checkQuantity", checkQuantity);

      if (checkQuantity) {
        this.$emit("ressetItemReceivedList");
        this.$emit("closeDialogEditReceivedList");
      } else {
        this.$refs.quantity.focus();
      }
    },

    async getData() {
      this.search = this.itemReceivedList.product_barcode;
    },
  },

  watch: {
    itemReceivedList(val) {
      if (val) {
        this.getData();
        this.$nextTick(() => {
          this.$refs.price.focus();
        });
      }
    },

    itemProductUnit(val) {
      if (val) {
        this.getItemProduct();
      }
    },
  },

  created() {
    this.getData();
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.price.focus();
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 74) {
        e.preventDefault();
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
