<template>
  <div>
    <v-card tile>
      <v-toolbar color="green" dark class="elevation-0">
        <v-icon>mdi-warehouse</v-icon>
        เลือกคลังสินค้า
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-card tile>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headersItemsBranch"
              :items="itemsBranch"
              fixed-header
              :search="search"
              @dblclick:row="sendItem"
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon color="green" class="mx-5" @click="getItem(item)">
                  mdi-check-bold
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["dialogSearchBranch", "itemBranch", "itemsBranch"],
  data() {
    return {
      search: null,

      // table
      headersItemsBranch: [
        { text: "ลำดับ", value: "index" },
        { text: "คลัง", value: "branch_name" },

        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },

  created() {},

  methods: {
    async closeDialog() {
      this.$emit("update:dialogSearchBranch", false);
    },

    async getBranch() {
      await this.$axios.get("/branches?_limit=-1").then((res) => {
        this.$emit("update:itemsBranch", res.data);
      });
    },

    async sendItem(event, { item }) {
      console.log("item", item);
      this.$emit("update:itemBranch", item);
      this.$emit("update:dialogSearchBranch", false);
    },

    async getItem(item) {
      this.$emit("update:itemBranch", item);
      this.$emit("update:dialogSearchBranch", false);
    },
  },
};
</script>

<style>
</style>