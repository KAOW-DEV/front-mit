<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          เพิ่มข้อมูลประเภทผู้จำหน่าย
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('closeDialogAddVendorType')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อประเภทผู้จำหน่าย"
                  v-model="itemVendorType.vendor_type_name"
                  dense
                  outlined
                  hide-details=""
                  autofocus
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" type="submit">บันทึก</v-btn>
          <v-btn color="error" @click="$emit('closeDialogAddVendorType')"
            >ปิด</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  props: ["itemVendorType"],
  data() {
    return {};
  },

  methods: {
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
          this.$emit("closeDialogAddVendorType");
          this.addVendorType();
        }
      });
    },

    async addVendorType() {
      await this.$axios
        .post("/vendor-types", {
          vendor_type_name: this.itemVendorType.vendor_type_name,
        })
        .then((res) => {
          console.log("addVendorType", res.data);

          this.$emit("getItemsVendorType");
          this.alertSuccess();
        })
        .catch((error) => {
          console.log("error", error);
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
  },
};
</script>

<style lang="scss" scoped></style>
