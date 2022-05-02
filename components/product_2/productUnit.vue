<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <v-alert v-if="editItem" color="success" border="left" text>
          <h3>{{ itemProduct.product_name }}</h3>
        </v-alert>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["itemProduct", "editItem"],
  data() {
    return {
      headersItemsProductUnit: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        {
          text: "รหัสภายใน",
          value: "product_unit_internal_code",
          sortable: false,
        },
        {
          text: "รหัสบาร์โค้ด",
          value: "product_unit_barcode",
          sortable: false,
        },
        {
          text: "รายละเอียด(ย่อ)",
          value: "product_unit_name",
          sortable: false,
        },
        {
          text: "รายละเอียดบรรจุ",
          value: "product_unit_description",
          sortable: false,
        },
        { text: "หน่วยนับ", value: "unit.unit_name", sortable: false },
      ],

      itemsProductUnit: [],

      itemProductUnit: {
        id: 0,
        product_unit_internal_code: null,
        product_unit_barcode: null,
        product_unit_name: null,
        product_unit_description: null,
        unit: {},
        product_unit_quantity_number: 0,
        product: {},
        product_price: {
          id: 0,
          product_price_middle: 0,
          product_price_discount: 0,
          product_price_1: 0,
          product_price_2: 0,
          product_price_3: 0,
          product_price_4: 0,
          product_price_5: 0,
          product_price_6: 0,
          product_price_7: 0,
          product_price_8: 0,
          product_price_9: 0,
          product_price_10: 0,
          product_price_low_limit: 0,
        },
      },
    };
  },

  watch: {
    itemProduct(val) {
      if (val) {
        this.getItemsProductUnitByProductId();
      }
    },
  },

  created() {
    this.getItemsProductUnitByProductId();
  },

  methods: {
    async getItemsProductUnitByProductId() {
      this.$axios
        .get("/product-units?product=" + this.itemProduct.id)
        .then((res) => {
          console.log("getItemsProductUnitByProductId", res.data);
          this.itemsProductUnit = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
