<template>
  <div>
    <v-dialog v-model="dialog" persistent width="80%">
      <v-card>
        <v-card-title primary-title>
          รายการสินค้า

          <v-spacer></v-spacer>

          <v-btn color="error" @click="$emit('update:dialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-text-field
            autofocus
            label="ค้นหา"
            v-model="search"
            append-icon="mdi-magnify"
            outlined
            hide-details=""
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          @dblclick:row="getItem"
        >
          <template v-slot:item.index="{ item, index }">
            {{ index + 1 }}
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["items", "item", "search", "dialog"],
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

        { text: "รหัสสินค้า (ภายใน)", value: "product_unit_internal_code" },
        { text: "รหัสสินค้า บาร์โค้ด", value: "product_unit_barcode" },
      ],
    };
  },

  methods: {
    async getItem(e, { item }) {
      // console.log("e", e);
      // console.log("item", item);
      this.$emit("update:item", item);
      this.$emit("update:dialog", false);
    },

    async getEvent(e) {
      //   console.log("e", e);
      if (e.keyCode == 27) {
        e.preventDefault();
        this.$emit("update:dialog", false);
      }
    },
  },

  created() {
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped></style>
