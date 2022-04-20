<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">กำหนดหน่วยนับสินค้า</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="mx-auto">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn color="success" class="float-end" @click="addUnit"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    หน่วยนับ
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="ค้นหา"
                      v-model="searchUnit"
                      hide-details=""
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headersItemsUnit"
                    :items="itemsUnit"
                    :search="searchUnit"
                  >
                    <template v-slot:item.index="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                      <v-btn color="warning" @click="editUnit(item)"
                        >แก้ไข</v-btn
                      >
                      <v-btn color="error" @click="checkDeleteUnit(item)"
                        >ลบ</v-btn
                      >
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <!-- Unit -->
    <v-dialog v-model="dialogAddUnit" persistent width="30%">
      <add-unit
        @closeDialogAddUnit="closeDialogAddUnit"
        @getItemsUnit="getItemsUnit"
        :itemUnit.sync="itemUnit"
      ></add-unit>
    </v-dialog>

    <v-dialog v-model="dialogEditUnit" persistent width="30%">
      <edit-unit
        @closeDialogEditUnit="closeDialogEditUnit"
        @getItemsUnit="getItemsUnit"
        :itemUnit.sync="itemUnit"
      ></edit-unit>
    </v-dialog>
  </div>
</template>

<script>
import AddUnit from "~/components/setting/unit/addUnit.vue";
import editUnit from "~/components/setting/unit/editUnit.vue";

export default {
  components: { editUnit, AddUnit },
  data() {
    return {
      headersItemsUnit: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ID", value: "id" },
        { text: "ชื่อหน่วยนับ", value: "unit_name" },
        { text: "Action", value: "actions", align: "center", sortable: false },
      ],
      itemsUnit: [],
      searchUnit: null,

      itemUnit: {
        unit_name: null,
      },

      dialogAddUnit: false,
      dialogEditUnit: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsUnit();
    },

    async getItemsUnit() {
      await this.$axios.get("/units").then((res) => {
        // console.log("getItemsUnit", res.data);
        this.itemsUnit = res.data;
      });
    },

    async addUnit() {
      this.dialogAddUnit = true;
      this.resetItemUnit();
    },

    async resetItemUnit() {
      this.itemUnit = {
        unit_name: null,
      };
    },

    async closeDialogAddUnit() {
      this.dialogAddUnit = false;
    },

    async editUnit(item) {
      this.itemUnit = item;
      this.dialogEditUnit = true;
    },

    async closeDialogEditUnit() {
      this.dialogEditUnit = false;
      this.getItemsUnit();
    },

    async checkDeleteUnit(item) {
      await this.$axios.get("/products?unit=" + item.id).then((res) => {
        // console.log("res.data", res.data);
        if (res.data.length > 0) {
          this.alertNotDelete();
          return;
        } else {
          this.$swal({
            title: "ต้องการลบข้อมูล ใช่หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่ใช่",
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteUnit(item);
            }
          });
        }
      });
    },

    async alertNotDelete() {
      this.$swal({
        title: "ไม่สามารถลบได้",
        text: "เนื่องจากข้อมูลนี้มีการใช้งานในระบบแล้ว",
        icon: "warning",
      });
    },

    async deleteUnit(item) {
      await this.$axios.delete("/units/" + item.id).then((res) => {
        this.getItemsUnit();
        this.alertDeleteSuccess();
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

    async alertDeleteSuccess() {
      this.$swal({
        title: "ลบข้อมูลเรียบร้อยแล้ว",
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
