<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">กำหนดประเภทผู้จำหน่ายสินค้า</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="mx-auto">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn color="success" class="float-end" @click="addVendorType"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    ประเภทผู้จำหน่าย
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="ค้นหา"
                      v-model="searchVendorType"
                      hide-details=""
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headersItemsVendorType"
                    :items="itemsVendorType"
                    :search="searchVendorType"
                  >
                    <template v-slot:item.index="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                      <v-btn color="warning" @click="editVendorType(item)"
                        >แก้ไข</v-btn
                      >
                      <v-btn color="error" @click="checkDeleteVendorType(item)"
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

    <!-- VendorType -->
    <v-dialog v-model="dialogAddVendorType" persistent width="30%">
      <add-vendor-type
        @closeDialogAddVendorType="closeDialogAddVendorType"
        @getItemsVendorType="getItemsVendorType"
        :itemVendorType.sync="itemVendorType"
      ></add-vendor-type>
    </v-dialog>

    <v-dialog v-model="dialogEditVendorType" persistent width="30%">
      <edit-vendor-type
        @closeDialogEditVendorType="closeDialogEditVendorType"
        @getItemsVendorType="getItemsVendorType"
        :itemVendorType.sync="itemVendorType"
      ></edit-vendor-type>
    </v-dialog>
  </div>
</template>

<script>
import addVendorType from "~/components/setting/vendorType/addVendorType.vue";
import EditVendorType from "~/components/setting/vendorType/editVendorType.vue";

export default {
  components: { addVendorType, EditVendorType },

  data() {
    return {
      headersItemsVendorType: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ID", value: "id" },
        { text: "ชื่อประเภทผู้จำหน่าย", value: "vendor_type_name" },
        { text: "Action", value: "actions", align: "center", sortable: false },
      ],
      itemsVendorType: [],
      searchVendorType: null,

      itemVendorType: {
        VendorType_name: null,
      },

      dialogAddVendorType: false,
      dialogEditVendorType: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsVendorType();
    },

    async getItemsVendorType() {
      await this.$axios.get("/vendor-types").then((res) => {
        // console.log("getItemsVendorType", res.data);
        this.itemsVendorType = res.data;
      });
    },

    async addVendorType() {
      this.dialogAddVendorType = true;
      this.resetItemVendorType();
    },

    async resetItemVendorType() {
      this.itemVendorType = {
        VendorType_name: null,
      };
    },

    async closeDialogAddVendorType() {
      this.dialogAddVendorType = false;
    },

    async editVendorType(item) {
      this.itemVendorType = item;
      this.dialogEditVendorType = true;
    },

    async closeDialogEditVendorType() {
      this.dialogEditVendorType = false;
      this.getItemsVendorType();
    },

    async checkDeleteVendorType(item) {
      await this.$axios.get("/suppliers?vendor_type=" + item.id).then((res) => {
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
              this.deleteVendorType(item);
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

    async deleteVendorType(item) {
      await this.$axios.delete("/vendor-types/" + item.id).then((res) => {
        this.getItemsVendorType();
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
