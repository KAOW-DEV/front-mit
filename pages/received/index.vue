<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn color="success" class="float-end" tile>
          <v-icon>mdi-plus</v-icon>&nbsp;เปิดบิลรับ
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-n2">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items_stock_receiveds">
          <template v-slot:top>
            <v-toolbar flat color="green" dark>
              <v-toolbar-title>รับเข้า</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
// import dailogInsert from "../../components/received/dailogInsert";

export default {
  // components: {
  //   dailogInsert,
  // },

  data: () => ({
    dialog_insert: false,
    dialog_update: false,

    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    items_stock_receiveds: [],
    list_product: [],
  }),

  created() {
    this.get_products();
  },

  methods: {
    async get_products() {
      await this.$axios.get("/stock-receiveds").then((res) => {
        this.items_stock_receiveds = res.data;
        console.log("items_stock_receiveds", this.items_stock_receiveds);
      });
    },
  },
};
</script>
