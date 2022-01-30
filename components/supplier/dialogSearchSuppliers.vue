<template>
  <div>
    <v-card>
      <v-toolbar color="green" dark class="elevation-0">
        <v-icon large>mdi-check-bold</v-icon>
        &nbsp; &nbsp;
        <h2>เลือกผู้ผลิต</h2>

        <v-spacer></v-spacer>
        <v-btn icon flat @click="closeDialog">
          <v-icon color="red" large>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card flat dark tile>
      <v-card-text>
        <v-row class="my-n4 mb-n10">
          <v-col cols="3">
            <v-autocomplete
              label="ค้นหาจาก จังหวัด"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              label="ค้นหาจาก จังหวัด"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              label="ค้นหาจาก จังหวัด"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              label="ค้นหาจาก จังหวัด"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="primary">
              <v-icon large>mdi-account-search-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card tile>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="searchSupplier"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headersItemsSuppliers"
      :items="itemsSuppliers"
      height="355"
      fixed-header
      :search="searchSupplier"
      dark
    >
      <template v-slot:item.index="{ item, index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon color="primary" class="mx-5" @click="view(item)">
          mdi-eye
        </v-icon>
        <v-icon color="green" class="mx-5" @click="addSupplier(item)">
          mdi-check-bold
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDetailSupplier" width="1024px">
      <dialog-detail-supplier
        :dialogDetailSupplier.sync="dialogDetailSupplier"
        :supplier="supplier"
      >
      </dialog-detail-supplier>
    </v-dialog>
  </div>
</template>

<script>
import dialogDetailSupplier from "./dialogDetailSupplier.vue";
export default {
  components: { dialogDetailSupplier },

  data() {
    return {
      searchSupplier: null,
      itemsSuppliers: [],
      supplier: [],

      // table
      headersItemsSuppliers: [
        { text: "ลำดับ", value: "index" },
        { text: "รหัส", value: "supplier_code" },
        { text: "ชื่อบริษัทฯ", value: "supplier_name" },
        { text: "ที่อยู่", value: "supplier_address_1" },
        { text: "เบอร์โทรศัพท์", value: "supplier_tel" },

        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],

      dialogDetailSupplier: false,
    };
  },

  created() {
    this.getSuppliers();
  },

  methods: {
    async getSuppliers() {
      await this.$axios.get("/suppliers?_limit=-1").then((res) => {
        console.log("itemsSuppliers", res.data);
        this.itemsSuppliers = res.data;
      });
    },

    async closeDialog() {
      this.$emit("update:dialogSearchSuppliers", false);
    },

    async view(item) {
      this.supplier = item;
      this.dialogDetailSupplier = true;
    },
  },
};
</script>

<style>
</style>