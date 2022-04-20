<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          เพิ่มข้อมูลประเภทย่อย
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('closeDialogAddSubGroup')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อประเภทหลัก"
                  v-model="itemGroup.group_name"
                  dense
                  outlined
                  hide-details=""
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ชื่อประเภทย่อย"
                  v-model="itemSubGroup.sub_group_name"
                  dense
                  outlined
                  hide-details=""
                  required
                  autofocus
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" type="submit">บันทึก</v-btn>
          <v-btn color="error" @click="$emit('closeDialogAddSubGroup')"
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
  props: ["itemSubGroup", "itemGroup"],
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
          this.$emit("closeDialogAddSubGroup");
          this.addSubGroup();
        }
      });
    },

    async addSubGroup() {
      await this.$axios
        .post("/sub-groups", {
          sub_group_name: this.itemSubGroup.sub_group_name,
          group: this.itemGroup,
        })
        .then((res) => {
          console.log("addSubGroup", res.data);

          this.$emit("getItemsSubGroup");
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
