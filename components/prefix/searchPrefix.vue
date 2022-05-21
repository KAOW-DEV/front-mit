<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        คำนำหน้าชื่อ
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
        <v-btn icon color="error" @click="$emit('closeDialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        fixed-header
        :items-per-page="-1"
        height="50vh"
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
  props: ["items", "itemCustomer"],
  data() {
    return {
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "CODE", value: "code" },
        { text: "TITLE", value: "title" },
        { text: "COMMENT", value: "comment" },
      ],

      search: null,
    };
  },

  methods: {
    async getItem(e, { item }) {
      console.log("item", item);
      this.$emit("update:item.prefix", item);
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="scss" scoped></style>
