<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="red--text text-center">ผู้ผลิต/ผู้ส่งสินค้า</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn class="float-end" @click="openDialogAddSupplier"
            >เพิ่มข้อมูลผู้ผลิต</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              รายชื่อผู้ผลิต
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchSupplier"
                append-icon="mdi-magnify"
                label="ค้นหา"
                hide-details=""
              ></v-text-field>
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table
              :headers="headersItemsSupplier"
              :items="itemsSupplier"
              :search="searchSupplier"
              @click:row="getItem"
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogAddSupplier" persistent width="50%">
      <card-add-supplier
        @closeDialogAddSupplier="closeDialogAddSupplier"
        @getItemsSupplier="getItemsSupplier"
        :itemSupplier.sync="itemSupplier"
      ></card-add-supplier>
    </v-dialog>

    <v-dialog v-model="dialogEditSupplier" persistent width="50%">
      <card-edit-supplier
        @closeDialogEditSupplier="closeDialogEditSupplier"
        @getItemsSupplier="getItemsSupplier"
        :itemSupplier.sync="itemSupplier"
      ></card-edit-supplier>
    </v-dialog>
  </div>
</template>

<script>
import cardAddSupplier from "~/components/suppliers/cardAddSupplier.vue";
import CardEditSupplier from "~/components/suppliers/cardEditSupplier.vue";
export default {
  components: { cardAddSupplier, CardEditSupplier },
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
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        supplier_phone: null,
        supplier_description: null,
        supplier_email: null,
        vendor_type: null,
        supplier_account_number: null,
        supplier_tax: null,
        supplier_branch_status: "สำนักงานใหญ่",
        supplier_branch_number: null,
        supplier_credit: 0,
      },

      searchSupplier: null,
      dialogAddSupplier: false,
      dialogEditSupplier: false,
    };
  },

  created() {
    this.getData();
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

    async openDialogAddSupplier() {
      this.dialogAddSupplier = true;
      this.resetItemSupplier();
    },

    async closeDialogAddSupplier() {
      this.dialogAddSupplier = false;
    },

    async openDialogEditSupplier() {
      this.dialogEditSupplier = true;
    },

    async closeDialogEditSupplier() {
      this.dialogEditSupplier = false;
      this.getItemsSupplier();
    },

    async resetItemSupplier() {
      this.itemSupplier = {
        id: 0,
        supplier_name: null,
        supplier_address: null,
        province: null,
        amphure: null,
        district: null,
        zip_code: null,
        supplier_phone: null,
        supplier_description: null,
        supplier_email: null,
        vendor_type: null,
        supplier_account_number: null,
        supplier_tax: null,
        supplier_branch_status: null,
        supplier_branch_number: null,
        supplier_credit: 0,
      };
    },

    async getItem(event, { item }) {
      console.log("item", item);
      this.itemSupplier = item;
      this.openDialogEditSupplier();
    },
  },
};
</script>

<style lang="scss" scoped></style>
