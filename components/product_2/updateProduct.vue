<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          แก้ไขข้อมูลสินค้า
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="error"
            @click="$emit('closeDialogUpdateProduct')"
            @focus="$refs.productCode.focus()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="รหัสสินค้าหลัก"
                ref="productCode"
                autofocus
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_code"
                required
                @keydown.enter="$refs.productName.focus()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="ชื่อรายละเอียดสินค้า"
                ref="productName"
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-autocomplete
                label="ประเภทสินค้า"
                ref="group"
                v-model="itemProduct.group"
                :items="itemsGroup"
                item-text="group_name"
                item-value="id"
                return-object
                dense
                outlined
                hide-details=""
                required
                @change="getItemsSubGroupByGroupId(), $refs.subGroup.focus()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                label="ประเภทย่อย"
                ref="subGroup"
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

            <v-col cols="3">
              <v-autocomplete
                label="หน่วยนับ"
                ref="unit"
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
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                label="ผู้จำหน่าย"
                ref="supplier"
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" type="submit" width="150">บันทึก</v-btn>
          <v-btn
            color="error"
            @click="$emit('closeDialogUpdateProduct')"
            width="150"
            >ยกเลิก</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  props: ["itemProduct", "editItem"],
  data() {
    return {
      itemsGroup: [],
      itemsSubGroup: [],
      itemsUnit: [],
      itemsSupplier: [],
    };
  },

  methods: {
    async getData() {
      this.getItemsGroup();
      this.getItemsSubGroup();

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

    async getItemsSubGroupByGroupId() {
      this.itemProduct.sub_group = null;
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
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("closeDialogUpdateProduct");
          this.updateProduct();
        }
      });
    },

    async updateProduct() {
      // console.log("itemProduct", this.itemProduct);

      await this.$axios
        .put("/products/" + this.itemProduct.id, {
          product_name: this.itemProduct.product_name,
          group: this.itemProduct.group,
          sub_group: this.itemProduct.sub_group,
          unit: this.itemProduct.unit,
          supplier: this.itemProduct.supplier,
          product_active: true,
        })
        .then((res) => {
          console.log("res", res.data);
          this.$emit("update:editItem", true);
          this.alertSuccess();
        })
        .catch((error) => {
          console.log("error", error);
          this.alertError();
        });
    },

    // alert
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
  },

  watch: {
    itemProduct(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.productCode.focus();
        });
        this.getItemsSubGroup();
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
