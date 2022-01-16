<template>
  <v-container grid-list-lg>
    <v-row>
      <v-col cols="12">
        <v-btn color="success" class="float-end">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-n2">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items_product">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>รายละเอียดสินค้า</v-toolbar-title>
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
export default {
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

  }),

  created() {
    this.get_products();
  },

  methods: {
    async get_products() {},
  },
};
</script>
