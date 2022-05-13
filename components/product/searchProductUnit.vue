<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        รายการสินค้า
        <v-divider vertical class="mx-3"></v-divider>
        <v-text-field
          label="ค้นหา"
          id="searchItem"
          v-model="searchItem"
          append-icon="mdi-magnify"
          outlined
          hide-details=""
          autofocus
        ></v-text-field>
        <v-divider vertical class="mx-3"></v-divider>
        <v-btn icon color="error" @click="$emit('closeDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="searchItem"
        fixed-header
        :items-per-page="-1"
        height="80vh"
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
  props: ["items", "item", "search"],
  data() {
    return {
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ/รายละเอียดสินค้า", value: "product_unit_name" },
        { text: "หน่วยนับ", value: "unit.unit_name" },
        { text: "ทุนล่าสุด/หน่วย", value: "product.product_cost" },
        { text: "รหัสสินค้า (ภายใน)", value: "product_unit_internal_code" },
        { text: "รหัสสินค้า บาร์โค้ด", value: "product_unit_barcode" },
      ],

      searchItem: null,
    };
  },

  methods: {
    async getData() {
      this.searchItem = this.search;
    },

    async getItem(e, { item }) {
      console.log("item", item);
      console.log("e", e);

      this.$emit("update:item", item);
      this.$emit("closeDialog");
    },
  },

  watch: {
    items(val) {
      if (val) {
        this.getData();
      }
    },
  },

  created() {
    this.getData();
  },

  mounted() {},
};
</script>

<style lang="scss" scoped></style>
