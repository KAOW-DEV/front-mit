<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        รายการสินค้า
        <v-divider vertical class="mx-3"></v-divider>
        <v-text-field
          label="ค้นหา"
          id="search"
          v-model="search"
          append-icon="mdi-magnify"
          outlined
          hide-details=""
          autofocus
        ></v-text-field>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn icon color="error" @click="$emit('closeDialogSearchProduct')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsProduct"
        :items="itemsProduct"
        :search="search"
        fixed-header
        :items-per-page="-1"
        height="80vh"
        @dblclick:row="getItem"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
        <!-- <template v-slot:item.group="{ item }">
          <get-group :groupId="item.product.group"></get-group>
        </template>
        <template v-slot:item.subGroup="{ item }">
          <get-sub-group :subGroupId="item.product.sub_group"></get-sub-group>
        </template> -->
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["itemsProduct", "itemProduct", "searchProduct", "editItem"],
  data() {
    return {
      headersItemsProduct: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ/รายละเอียดสินค้า", value: "product_name" },

        { text: "หน่วยนับ", value: "unit.unit_name" },
        { text: "ทุนล่าสุด/หน่วย", value: "product_cost" },
        { text: "รหัสสินค้าหลัก", value: "product_code" },
      ],

      search: null,
    };
  },

  methods: {
    async getData() {
      this.search = this.searchProduct;
    },

    async getItem(e, { item }) {
      console.log("item", item);
      this.$emit("update:itemProduct", item);
      this.$emit("update:searchProduct", item.product_name);
      this.$emit("update:editItem", true);
      this.$emit("closeDialogSearchProduct");
    },
  },

  watch: {
    itemsProduct(val) {
      if (val) {
        this.getData();
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped></style>
