<template>
  <div>
    <v-card tile>
      <v-toolbar color="green" dark class="elevation-0">
        <v-icon>mdi-account-search</v-icon>
        เลือกผู้จำหน่าย
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card flat tile>
      <v-card-text>
        <v-row class="my-n4 mb-n10">
          <v-col cols="4" class="text-center">
            <v-autocomplete
              label="ค้นหาจาก ประเภทผู้จำหน่าย"
              v-model="vendorType"
              :items="itemsVendorTypes"
              item-text="vendor_type_name"
              item-value="id"
              return-object
              outlined
              dense
              @change="searchSupplier"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="primary" @click="searchSupplier">
              <v-icon large>mdi-account-search-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row> -->
      </v-card-text>
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
              :headers="headersItemsSuppliers"
              :items="itemsSuppliers"
              fixed-header
              :search="search"
              @dblclick:row="sendItem"
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogDetailSupplier" width="1024px">
      <dialog-detail-supplier
        :dialogDetailSupplier.sync="dialogDetailSupplier"
        :itemSupplier="itemSupplier"
      >
      </dialog-detail-supplier>
    </v-dialog>
  </div>
</template>

<script>
import dialogDetailSupplier from "./dialogDetailSupplier.vue";
export default {
  components: { dialogDetailSupplier },

  props: [
    "itemsSuppliers",
    "itemSupplier",
    "dialogSearchSuppliers",
    "itemsVendorTypes",
    "itemBranch",
  ],
  data() {
    return {
      search: null,

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

      vendorType: {
        created_at: null,
        id: 0,
        updated_at: null,
        vendor_type_name: "ทั้งหมด",
      },
    };
  },

  created() {},

  methods: {
    async closeDialog() {
      this.$emit("update:dialogSearchSuppliers", false);
    },

    async view(item) {
      this.supplier = item;
      this.dialogDetailSupplier = true;
    },

    async getSuppliers() {
      await this.$axios.get("/suppliers?_limit=-1").then((res) => {
        this.$emit("update:itemsSuppliers", res.data);
      });
    },

    async searchSupplier() {
      // console.log("vendorType", this.vendorType);

      if (this.vendorType.id == 0) {
        this.getSuppliers();
      } else {
        await this.$axios
          .get("/suppliers?vendor_type=" + this.vendorType.id + "&_limit=-1")
          .then((res) => {
            // console.log("itemsSuppliers", res.data);
            this.$emit("update:itemsSuppliers", res.data);
          });
      }
    },

    async sendItem(event, { item }) {
      console.log("item", item);
      this.$emit("update:itemSupplier", item);
      this.$emit("update:itemBranch", item.branch);
      this.$emit("update:dialogSearchSuppliers", false);
    },
  },
};
</script>

<style>
</style>