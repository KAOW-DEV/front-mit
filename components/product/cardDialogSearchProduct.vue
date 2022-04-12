<template>
  <div>
    <v-card>
      <v-toolbar color="success" dark
        >ค้นหาสินค้า
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeDialogSearchProduct')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
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
      </v-card-text>
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
