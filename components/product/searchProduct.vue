<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        ค้นหาข้อมูลสินค้า
        <v-divider vertical class="mx-3"></v-divider>
        <v-text-field
          label="ค้นหา"
          append-icon="mdi-magnify"
          v-model="searchProduct"
          outlined
          hide-details=""
          autofocus
        ></v-text-field>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn>ค้นหาชื่อสินค้า</v-btn>
        <v-btn>ค้นหาบาร์โค้ด</v-btn>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn icon @click="$emit('closeDialogSearchProduct')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsProduct"
        :items="itemsProduct"
        :items-per-page="-1"
        :search="searchProduct"
        sort-by="product_unit_name"
        height="520"
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
export default {
  props: ["itemProduct"],
  data() {
    return {
      itemsProduct: [],
      headersItemsProduct: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ/รายละเอียดสินค้า", value: "product_unit_name" },
        { text: "หน่วยนับ", value: "product_unit_name" },
        { text: "ทุนล่าสุด/หน่วย", value: "product.product_cost" },
        { text: "รหัสสินค้าภายใน", value: "product_unit_internal_code" },
        { text: "รหัสบาร์โค้ด", value: "product_unit_barcode" },
      ],

      searchProduct: null,
    };
  },

  created() {
    this.getItemsProduct();
  },
  methods: {
    async getItemsProduct() {
      await this.$axios.get("/product-units?_limit=-1").then((res) => {
        console.log("getItemsProduct", res.data);
        this.itemsProduct = res.data;
      });
    },

    async getItem(event, { item }) {
      this.$emit("update:itemProduct", item);
      this.$emit("closeDialogSearchProduct");
    },
  },
};
</script>

<style lang="scss" scoped></style>
