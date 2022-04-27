<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        เพิ่มรายการสินค้า
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeDialogReceivedList')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="รหัสบาร์โค้ดสินค้า"
                v-model="itemReceivedList.product_barcode"
                dense
                outlined
                hide-details=""
                autofocus
                @keyup="getBarcode"
                @keyup.enter="searchProduct"
              >
                <template slot="append-outer">
                  <div>
                    <v-btn color="success" class="mt-n2">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="รหัสสินค้า(ภายใน)"
                v-model="itemReceivedList.product_internal_code"
                dense
                outlined
                readonly
                hide-details=""
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                label="ชื่อสินค้า"
                v-model="itemReceivedList.product_name"
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
                label="หน่วยนับ"
                v-model="itemReceivedList.unit"
                dense
                outlined
                readonly
                hide-details=""
              >
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-row>
                <v-col cols="6">
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
                <v-col cols="6">
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
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="ราคาที่รับเข้าตามบิล/หน่วย"
                append-icon="mdi-pencil"
                v-model="itemReceivedList.price"
                dense
                outlined
                type="number"
                min="0"
                hide-details=""
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn block color="error" dark>Check Cost</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์-1"
                    append-icon="mdi-pencil"
                    v-model="itemReceivedList.reduct_percen_1"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์-2"
                    append-icon="mdi-pencil"
                    v-model="itemReceivedList.reduct_percen_2"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์-3"
                    append-icon="mdi-pencil"
                    v-model="itemReceivedList.reduct_percen_3"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์-4"
                    append-icon="mdi-pencil"
                    v-model="itemReceivedList.reduct_percen_4"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์-5"
                    append-icon="mdi-pencil"
                    v-model="itemReceivedList.reduct_percen_5"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลดเปอร์เซ็นต์(รวม)"
                    v-model="itemReceivedList.reduct_percen_sum"
                    dense
                    outlined
                    readonly
                    hide-details=""
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ราคาส่วนลด(รวม)"
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
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="ส่วนลดจำนวนเงิน/หน่วย"
                append-icon="mdi-pencil"
                v-model="itemReceivedList.price_reduce"
                dense
                outlined
                type="number"
                min="0"
                hide-details=""
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="จำนวนที่รับเข้าจริงตามบิล"
                append-icon="mdi-pencil"
                v-model="itemReceivedList.quantity"
                dense
                outlined
                type="number"
                min="0"
                hide-details=""
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
        </v-container>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogSearchProduct" persistent width="80%">
      <search-product
        @closeDialogSearchProduct="closeDialogSearchProduct"
        :itemProduct.sync="itemProduct"
      ></search-product>
    </v-dialog>
  </div>
</template>

<script>
import searchProduct from "../product/searchProduct.vue";
export default {
  components: { searchProduct },
  props: ["itemReceivedList"],

  data() {
    return {
      dialogSearchProduct: false,
      itemProduct: {},
    };
  },

  methods: {
    async getBarcode(e) {
      console.log("e.keycode", e.keycode);
    },

    async searchProduct() {
      this.dialogSearchProduct = true;
    },

    async closeDialogSearchProduct() {
      this.dialogSearchProduct = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
