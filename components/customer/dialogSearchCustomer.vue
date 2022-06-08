<template>
  <div>
    <v-dialog v-model="dialog" persistent width="80%">
      <v-card>
        <v-card-title primary-title>
          รายชื่อลูกค้า

          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="$emit('update:dialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-text-field
            label="ค้นหา"
            v-model="search"
            append-icon="mdi-magnify"
            outlined
            hide-details=""
            autofocus
          ></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          fixed-header
          :items-per-page="-1"
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
        { text: "ชื่อลูกค้า", value: "name" },
        { text: "ที่อยู่", value: "address_1" },
        { text: "โทรศัพท์", value: "phone" },
        { text: "ผู้ติดต่อ/หมายเหตุ", value: "description" },
        { text: "ประภท", value: "vendor_type.vendor_type_name" },
        { text: "เลขที่ผู้เสียภาษี", value: "tax" },
        { text: "สำนักงานใหญ่/สาขา", value: "branch" },
      ],
    };
  },

  methods: {
    async getItem(e, { item }) {
      console.log("item", item);
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
