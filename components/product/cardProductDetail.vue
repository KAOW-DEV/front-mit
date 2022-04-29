<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card class="ma-7" flat>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="รหัสสินค้าหลัก"
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_code"
                required
                :disabled="editItem"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn class="mx-1">เปลี่ยนรหัสสต๊อกสินค้า</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="ชื่อรายละเอียดสินค้า"
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
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
                required
                @change="getItemsSubGroup"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
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
                required
                :readonly="itemProduct.group == null"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
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
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
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
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
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
            <v-col cols="4">
              <v-text-field
                label="วันที่บันทึกข้อมูล"
                v-model="recordDate"
                dense
                outlined
                hide-details=""
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="วันที่แก้ไขข้อมูล(ล่าสุด)"
                v-model="revisionDate"
                dense
                outlined
                hide-details=""
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="mt-3">
          <v-spacer></v-spacer>
          <v-btn color="success" type="submit">
            <v-icon>mdi-content-save</v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");

export default {
  props: ["itemProduct", "editItem"],
  data() {
    return {
      itemsGroup: [],
      itemsSubGroup: [],
      itemsUnit: [],
      itemsSupplier: [],

      recordDate: null,
      revisionDate: null,
    };
  },

  created() {
    this.getData();
  },

  watch: {
    itemProduct(val) {
      if (val) {
        // console.log("itemProduct", val);
        this.getItemsSubGroup();
        console.log("editItem", this.editItem);
        this.convertDate(this.itemProduct);
      }
    },
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

    async checkSave() {
      this.$swal({
        title: "ต้องการบันทึกข้อมูล ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.editItem == true) {
            this.updateProduct();
          } else {
            this.addProduct();
          }
        }
      });
    },

    async alertSuccess() {
      this.$swal({
        title: "บันทึกข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    async alertError() {
      this.$swal({
        title: "เกิดข้อผิดพลาด",
        text: "ตรวจสอบความถูกต้องของข้อมูล ก่อนบันทึก",
        icon: "error",
      });
    },

    async alertDuplicate() {
      this.$swal({
        title: "รหัสสินค้า/ชื่อสินค้า หลักซ้ำ",
        icon: "error",
      });
    },

    async addProduct() {
      // console.log("itemProduct", this.itemProduct);

      await this.$axios
        .post("/products", {
          product_code: this.itemProduct.product_code,
          product_name: this.itemProduct.product_name,
          group: this.itemProduct.group.id,
          sub_group: this.itemProduct.sub_group.id,
          unit: this.itemProduct.unit.id,
          supplier: this.itemProduct.supplier.id,
          product_quantity: this.itemProduct.product_quantity,
          product_active: true,
        })
        .then((res) => {
          console.log("res", res.data);

          this.$emit("update:itemProduct", res.data);
          this.$emit("update:editItem", true);
          this.alertSuccess();
        })
        .catch((error) => {
          console.log("error", error);
          this.alertDuplicate();
          return;
          // this.$emit("newProduct");
          // this.$emit("update:editItem", false);
        });
    },

    async convertDate(itemProduct) {
      this.recordDate = moment(itemProduct.created_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");

      this.revisionDate = moment(itemProduct.updated_at)
        .add(543, "year")
        .format("DD/MM/YYYY HH:mm:ss");
    },

    async updateProduct() {
      // console.log("itemProduct", this.itemProduct);

      await this.$axios
        .put("/products/" + this.itemProduct.id, {
          product_name: this.itemProduct.product_name,
          group: this.itemProduct.group.id,
          sub_group: this.itemProduct.sub_group.id,
          unit: this.itemProduct.unit.id,
          supplier: this.itemProduct.supplier.id,
          product_quantity: this.itemProduct.product_quantity,
          product_active: true,
        })
        .then((res) => {
          console.log("res", res.data);

          this.$emit("update:itemProduct", res.data);
          this.$emit("update:editItem", true);
          this.alertSuccess();
        })
        .catch((error) => {
          console.log("error", error);
          this.alertError();
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
