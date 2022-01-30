<template>
  <div>
    <v-container fluid>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-card-title primary-titlev>
              <h1>รับเข้า</h1>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="green"
            dark
            x-large
            class="float-end"
            tile
            @click="openDialogInsert"
          >
            <v-icon x-large>mdi-plus</v-icon>&nbsp;
            <h2>เพิ่มบิลรับ</h2>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table :headers="headers" :items="itemStockReceived">
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogInsertStockReceived" width="1400px" persistent>
      <dialogInsertStockReceived
        :dialogInsertStockReceived.sync="dialogInsertStockReceived"
      >
      </dialogInsertStockReceived>
    </v-dialog>
  </div>
</template>




<script>
import dialogInsertStockReceived from "../../components/received/dialogInsertStockReceived";
import dialogUpdateStockReceived from "../../components/received/dialogUpdateStockReceived";

export default {
  components: {
    dialogInsertStockReceived,
    dialogUpdateStockReceived,
  },

  data: () => ({
    overlay: false,
    dialogInsertStockReceived: false,
    dialogUpdateStockReceived: false,

    search: "",

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

    itemStockReceived: [],
  }),

  created() {
    this.get_products();
  },

  methods: {
    async get_products() {
      await this.$axios.get("/stock-receiveds").then((res) => {
        this.itemStockReceived = res.data;
        console.log("itemStockReceived", this.itemStockReceived);
      });
    },

    openDialogInsert() {
      this.dialogInsertStockReceived = true;
    },
  },
};
</script>

