<template>
  <div>
    <v-card v-if="!editItem">
      <v-card-title primary-title>
        <v-spacer></v-spacer>
        <v-alert type="warning" text prominent>
          <h3>"ค้นหารายการสินค้า"</h3>
        </v-alert>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <v-card v-if="editItem">
      <v-card-title primary-title>
        <v-alert v-if="editItem" color="success" border="left" text>
          <h3>{{ itemProduct.product_name }}</h3>
        </v-alert>
        <v-spacer></v-spacer>

        <v-btn color="warning" v-if="editItem" width="100" @click="editProduct">
          แก้ไข
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="รหัสสินค้าหลัก"
              dense
              outlined
              hide-details=""
              v-model="itemProduct.product_code"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="ชื่อรายละเอียดสินค้า"
              dense
              outlined
              hide-details=""
              v-model="itemProduct.product_name"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-autocomplete
              label="ประเภทสินค้า"
              v-model="itemProduct.group"
              :items="itemsGroup"
              item-text="group_name"
              item-value="id"
              return-object
              dense
              outlined
              hide-details=""
              readonly
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              label="ประเภทย่อย"
              v-model="itemProduct.sub_group"
              :items="itemsSubGroup"
              item-text="sub_group_name"
              item-value="id"
              return-object
              dense
              outlined
              hide-details=""
              readonly
            ></v-autocomplete>
          </v-col>

          <v-col cols="3">
            <v-autocomplete
              label="หน่วยนับ"
              v-model="itemProduct.unit"
              :items="itemsUnit"
              item-text="unit_name"
              item-value="id"
              return-object
              dense
              outlined
              hide-details=""
              readonly
            ></v-autocomplete>
          </v-col>

          <v-col cols="3">
            <v-autocomplete
              label="ผู้จำหน่าย"
              v-model="itemProduct.supplier"
              :items="itemsSupplier"
              item-text="supplier_name"
              item-value="id"
              return-object
              dense
              outlined
              hide-details=""
              readonly
            ></v-autocomplete>
          </v-col>

          <v-col cols="3">
            <v-text-field
              label="ยอดคงเหลือ"
              v-model="itemProduct.product_quantity"
              dense
              outlined
              hide-details=""
              readonly
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row v-show="editItem">
          <v-col cols="6"></v-col>
          <v-col cols="3">
            <v-alert
              color="success"
              dark
              icon="mdi-plus"
              border="left"
              prominent
            >
              <b>วันที่บันทึกข้อมูล</b>
              <v-divider></v-divider>
              {{ itemProduct.dateCreate }}
            </v-alert>
          </v-col>
          <v-col cols="3">
            <v-alert
              color="warning"
              dark
              icon="mdi-pencil"
              border="left"
              prominent
            >
              <b>วันที่แก้ไขข้อมูล (ล่าสุด)</b>
              <v-divider></v-divider>
              {{ itemProduct.dateUpdate }}
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>

    <v-dialog v-model="dialogUpdateProduct" persistent width="50%">
      <update-product
        :itemProduct.sync="itemProduct"
        :editItem.sync="editItem"
        @closeDialogUpdateProduct="closeDialogUpdateProduct"
      ></update-product>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import updateProduct from "./updateProduct.vue";

moment.locales("th");
export default {
  components: { updateProduct },
  props: ["itemProduct", "editItem"],
  data() {
    return {
      itemsGroup: [],
      itemsSubGroup: [],
      itemsUnit: [],
      itemsSupplier: [],
      dialogUpdateProduct: false,
    };
  },

  methods: {
    async getData() {
      this.getItemsGroup();
      // this.getItemsSubGroup();
      this.getItemsUnit();
      this.getItemsSupplier();
    },

    async getItemsGroup() {
      await this.$axios.get("/groups").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsGroup = res.data;
      });
    },

    async getItemsSubGroup() {
      if (this.itemProduct.group != null) {
        await this.$axios
          .get("/sub-groups?group=" + this.itemProduct.group.id)
          .then((res) => {
            // console.log("itemsGroup", res.data);
            this.itemsSubGroup = res.data;
          });
      } else {
        this.itemsSubGroup = [];
      }
    },

    async getItemsUnit() {
      await this.$axios.get("/units").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsUnit = res.data;
      });
    },

    async getItemsSupplier() {
      await this.$axios.get("/suppliers").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsSupplier = res.data;
      });
    },

    async convertDate() {
      this.itemProduct.dateCreate = moment(this.itemProduct.created_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");

      this.itemProduct.dateUpdate = moment(this.itemProduct.updated_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");
    },

    async editProduct() {
      this.dialogUpdateProduct = true;
    },

    async closeDialogUpdateProduct() {
      this.dialogUpdateProduct = false;
      this.$emit("getItemProductById");
    },
  },

  watch: {
    itemProduct(val) {
      if (val) {
        // console.log("watchitemProduct", val);
        // console.log("editItem", this.editItem);
        this.getItemsSubGroup();
        this.convertDate();
      }
    },
  },

  created() {
    this.getData();
  },

  mounted() {},
};
</script>

<style lang="scss" scoped></style>
