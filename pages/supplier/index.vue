<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-alert
          :value="true"
          icon="mdi-account-search"
          prominent
          shaped
          text
          color="success"
          class="text-center"
        >
          <h1>ผู้ผลิต / ผู้ส่งสินค้า</h1>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn color="success" @click="addSupplier" class="float-end">
          <v-icon>mdi-account-plus</v-icon>
          (F1)
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title primary-title>
        Suppliers
        <v-spacer></v-spacer>
        <v-text-field
          autofocus
          label="ค้นหา (F5)"
          ref="searchSupplier"
          append-icon="mdi-account-search"
          v-model="searchSupplier"
          hide-details=""
        ></v-text-field>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="headersItemsSupplier"
        :items="itemsSupplier"
        :search="searchSupplier"
        @dblclick:row="getItem"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogAddSupplier" persistent width="80%">
      <add-supplier
        @closeDialogAddSupplier="closeDialogAddSupplier"
        @openDialogAddSupplier="openDialogAddSupplier"
        @getItemsSupplier="getItemsSupplier"
        :itemSupplier.sync="itemSupplier"
      ></add-supplier>
    </v-dialog>

    <v-dialog v-model="dialogEditSupplier" persistent width="80%">
      <edit-supplier
        @openDialogEditSupplier="openDialogEditSupplier"
        @closeDialogEditSupplier="closeDialogEditSupplier"
        @getItemsSupplier="getItemsSupplier"
        :itemSupplier.sync="itemSupplier"
      ></edit-supplier>
    </v-dialog>
  </div>
</template>

<script>
import addSupplier from "~/components/supplier/addSupplier.vue";
import editSupplier from "~/components/supplier/editSupplier.vue";

import moment from "moment";
moment.locale("th");
export default {
  components: { addSupplier, editSupplier },
  data() {
    return {
      headersItemsSupplier: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ/บริษัทฯ", value: "supplier_name" },
        { text: "ที่อยู่", value: "supplier_address" },
        { text: "เบอร์โทรศัพท์", value: "supplier_phone" },
      ],

      itemsSupplier: [],

      itemSupplier: {
        id: 0,
        supplier_name: null,
        supplier_address: null,
        supplier_phone: null,
        supplier_description: null,
        supplier_email: null,
        vendor_type: null,
        supplier_account_number: null,
        supplier_tax: null,
        supplier_branch_status: null,
        supplier_branch_number: null,
        supplier_credit: 0,
        dateCreate: null,
        dateUpdate: null,
      },

      searchSupplier: null,
      dialogAddSupplier: false,
      dialogEditSupplier: false,
    };
  },

  methods: {
    async getData() {
      this.getItemsSupplier();
    },

    async getItemsSupplier() {
      await this.$axios
        .get("/suppliers?supplier_actived=true&_limit=-1")
        .then((res) => {
          console.log("itemsSupplier", res.data);
          this.itemsSupplier = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async addSupplier() {
      await this.resetItemSupplier();
      this.dialogAddSupplier = true;
    },

    async openDialogAddSupplier() {
      this.dialogAddSupplier = true;
    },

    async closeDialogAddSupplier() {
      this.dialogAddSupplier = false;
    },

    async openDialogEditSupplier() {
      this.dialogEditSupplier = true;
    },

    async closeDialogEditSupplier() {
      this.dialogEditSupplier = false;
      await this.getItemsSupplier();
    },

    async resetItemSupplier() {
      this.itemSupplier = {
        id: 0,
        supplier_name: null,
        supplier_address: null,
        supplier_phone: null,
        supplier_description: null,
        supplier_email: null,
        vendor_type: null,
        supplier_account_number: null,
        supplier_tax: null,
        supplier_branch_status: null,
        supplier_branch_number: null,
        supplier_credit: 0,
        dateCreate: null,
        dateUpdate: null,
      };
    },

    async getItem(event, { item }) {
      console.log("item", item);
      await this.resetItemSupplier();
      this.itemSupplier = item;
      await this.convertDate();
      await this.openDialogEditSupplier();
    },

    async convertDate() {
      this.itemSupplier["dateCreate"] = moment(this.itemSupplier.created_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");

      this.itemSupplier["dateUpdate"] = moment(this.itemSupplier.updated_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");
    },

    async getEvent(e) {
      // console.log("e", e);
      if (e.keyCode == 112) {
        this.addSupplier();
        e.preventDefault();
      } else if (e.keyCode == 27) {
        if (this.dialogAddSupplier == true) {
          await this.closeDialogAddSupplier();
          e.preventDefault();
        }
        if (this.dialogEditSupplier == true) {
          await this.closeDialogEditSupplier();
          e.preventDefault();
        }
      } else if (e.keyCode == 116) {
        this.$refs.searchSupplier.focus();
        e.preventDefault();
      }
    },
  },

  created() {
    this.getData();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped></style>
