<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        รายการผู้ผลิต
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
        <v-btn icon color="error" @click="$emit('closeDialogSearchCustomer')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsCustomer"
        :items="itemsCustomer"
        :search="search"
        fixed-header
        :items-per-page="-1"
        height="80vh"
        @dblclick:row="getItem"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.branch="{ item }">
          <p v-if="item.customer_branch_status == 'สำนักงานใหญ่'">
            {{ item.customer_branch_status }}
          </p>
          <p v-else>สาขา {{ item.customer_branch_number }}</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["itemsCustomer", "itemCustomer", "searchCustomer", "editItem"],
  data() {
    return {
      headersItemsCustomer: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อผู้ผลิต", value: "customer_name" },
        { text: "ที่อยู่", value: "customer_address" },
        { text: "โทรศัพท์", value: "customer_phone" },
        { text: "ผู้ติดต่อ/หมายเหตุ", value: "customer_description" },
        { text: "ประภท", value: "vendor_type.vendor_type_name" },
        { text: "เลขที่ผู้เสียภาษี", value: "customer_tax" },
        { text: "สำนักงานใหญ่/สาขา", value: "branch" },
      ],

      search: null,
    };
  },

  methods: {
    async getData() {
      this.search = this.searchCustomer;
    },

    async getItem(e, { item }) {
      console.log("item", item);
      this.$emit("update:itemCustomer", item);
      this.$emit("update:searchCustomer", item.customer_name);
      this.$emit("update:editItem", true);
      this.$emit("closeDialogSearchCustomer");
    },
  },

  watch: {
    itemsCustomer(val) {
      if (val) {
        this.getData();
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped></style>
