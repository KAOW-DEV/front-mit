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
          @keyup="checkSearch"
        ></v-text-field>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn @click="getItemsProductByBarcode">F1-ค้นหาบาร์โค้ด</v-btn>
        <v-btn @click="getItemsProductByName">F2-ค้นหาชื่อสินค้า</v-btn>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn color="red" icon @click="$emit('closeDialogSearchProduct')">
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
        fixed-header
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
  props: ["itemsProduct", "itemReceivedList", "dialogSearchProduct"],
  data() {
    return {
      headersItemsProduct: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ/รายละเอียดสินค้า", value: "product_unit_name" },
        { text: "หน่วยนับ", value: "unit.unit_name" },
        { text: "ทุนล่าสุด/หน่วย", value: "product.product_cost" },
        { text: "รหัสสินค้าภายใน", value: "product_unit_internal_code" },
        { text: "รหัสบาร์โค้ด", value: "product_unit_barcode" },
      ],

      searchProduct: null,
    };
  },

  watch: {
    dialogSearchProduct(val) {
      if (val == true) {
        this.getData();
      }
    },
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.searchProduct = this.itemReceivedList.product_barcode;
    },

    async checkSearch(e) {
      if (e.keyCode == 112) {
        this.getItemsProductByBarcode();
        e.preventDefault();
        return false;
      } else if (e.keyCode == 113) {
        this.getItemsProductByName();
        e.preventDefault();
        return false;
      }
    },

    async getItemsProductByName() {
      await this.$axios
        .get(
          "/product-units?product_unit_name_containss=" +
            this.searchProduct +
            "&_sort=product_unit_name:ASC&_limit=-1"
        )
        .then((res) => {
          if (res.data.length > 0) {
            console.log("getItemsProductByName", res.data);
            this.$emit("update:itemsProduct", res.data);
          } else {
            this.alertNotProduct();
          }
        });
    },

    async getItemsProductByBarcode() {
      await this.$axios
        .get(
          "/product-units?product_unit_barcode=" +
            this.searchProduct +
            "&_sort=product_unit_name:ASC&_limit=-1"
        )
        .then((res) => {
          if (res.data.length > 0) {
            console.log("getItemsProductByBarcode", res.data);
            this.$emit("update:itemsProduct", res.data);
          } else {
            this.alertNotProduct();
          }
        });
    },

    async alertNotProduct() {
      this.$swal.fire({
        icon: "warning",
        title: "ไม่พบข้อมูลสินค้า",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async getItem(event, { item }) {
      console.log("itemReceivedList", this.itemReceivedList);
      console.log("item", item);

      this.itemReceivedList.product_barcode = item.product_unit_barcode;
      this.itemReceivedList.product_internal_code =
        item.product_unit_internal_code;
      this.itemReceivedList.product_name = item.product_unit_name;
      this.itemReceivedList.unit = item.unit;
      this.itemReceivedList.product_cost_no_vat =
        parseFloat(item.product_price.product_price_middle) -
        parseFloat(item.product_price.product_price_middle * 0.07);
      this.itemReceivedList.product_cost_vat =
        item.product_price.product_price_middle;

      this.$emit("closeDialogSearchProduct");
    },
  },
};
</script>

<style lang="scss" scoped></style>
