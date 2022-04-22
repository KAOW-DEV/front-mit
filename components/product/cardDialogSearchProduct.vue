<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        ค้นหาสินค้า
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeDialogSearchProduct')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsProduct"
        :items="itemsProduct"
        class="elevation-1"
        @dblclick:row="getItem"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");
export default {
  props: [
    "itemsProduct",
    "itemProduct",
    "itemsProductUnit",
    "itemProductPrice",
    "itemProductBarcode",
    "editItem",
  ],

  data() {
    return {
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

  methods: {
    async getItem(event, { item }) {
      // console.log("item", item);

      this.$emit("update:itemProduct", item);
      this.$emit("closeDialogSearchProduct");
      this.$emit("update:editItem", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
