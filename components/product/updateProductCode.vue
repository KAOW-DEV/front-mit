<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          แก้ไขรหัสสินค้าหลัก
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="error"
            @click="$emit('closeDialogUpdateProductCode')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            label="รหัสสินค้าหลัก"
            id="newProductCode"
            v-model="newProductCode"
            outlined
            hide-details=""
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3" color="success" type="summit">บันทึก</v-btn>
          <v-btn
            class="mx-3"
            color="error"
            @click="$emit('closeDialogUpdateProductCode')"
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
  props: ["itemProduct"],

  data() {
    return {
      newProductCode: null,
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      this.newProductCode = this.itemProduct.product_code;
      document.getElementById("newProductCode").focus();
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
          this.updateProductCode();
        }
      });
    },

    async updateProductCode() {
      console.log("itemProduct", this.itemProduct);

      this.$axios
        .put("/products/" + this.itemProduct.id, {
          product_code: this.newProductCode,
        })
        .then((res) => {
          this.$emit("update:itemProduct", res.data);
          this.alertSuccess();
          this.$emit("closeDialogUpdateProductCode");
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
  },
};
</script>

<style lang="scss" scoped></style>
