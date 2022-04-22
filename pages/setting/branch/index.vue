<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">กำหนดสาขา</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" class="mx-auto">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn color="success" class="float-end" @click="addBranch"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    สาขา
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="ค้นหา"
                      v-model="searchBranch"
                      hide-details=""
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headersItemsBranch"
                    :items="itemsBranch"
                    :search="searchBranch"
                  >
                    <template v-slot:item.index="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                      <v-btn color="warning" @click="editBranch(item)"
                        >แก้ไข</v-btn
                      >
                      <v-btn color="error" @click="checkDeleteBranch(item)"
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

    <!-- Branch -->
    <v-dialog v-model="dialogAddBranch" persistent width="30%">
      <add-branch
        @closeDialogAddBranch="closeDialogAddBranch"
        @getItemsBranch="getItemsBranch"
        :itemBranch.sync="itemBranch"
      ></add-branch>
    </v-dialog>

    <v-dialog v-model="dialogEditBranch" persistent width="30%">
      <edit-branch
        @closeDialogEditBranch="closeDialogEditBranch"
        @getItemsBranch="getItemsBranch"
        :itemBranch.sync="itemBranch"
      ></edit-branch>
    </v-dialog>
  </div>
</template>

<script>
import addBranch from "~/components/setting/branch/addBranch.vue";
import EditBranch from "~/components/setting/branch/editBranch.vue";

export default {
  components: { addBranch, EditBranch },

  data() {
    return {
      headersItemsBranch: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อสาขา", value: "branch_name" },
        { text: "Action", value: "actions", align: "center", sortable: false },
      ],
      itemsBranch: [],
      searchBranch: null,

      itemBranch: {
        Branch_name: null,
      },

      dialogAddBranch: false,
      dialogEditBranch: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsBranch();
    },

    async getItemsBranch() {
      await this.$axios.get("/branches").then((res) => {
        // console.log("getItemsBranch", res.data);
        this.itemsBranch = res.data;
      });
    },

    async addBranch() {
      this.dialogAddBranch = true;
      this.resetItemBranch();
    },

    async resetItemBranch() {
      this.itemBranch = {
        Branch_name: null,
      };
    },

    async closeDialogAddBranch() {
      this.dialogAddBranch = false;
    },

    async editBranch(item) {
      this.itemBranch = item;
      this.dialogEditBranch = true;
    },

    async closeDialogEditBranch() {
      this.dialogEditBranch = false;
      this.getItemsBranch();
    },

    async checkDeleteBranch(item) {
      await this.$axios.get("/receiveds?branch=" + item.id).then((res) => {
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
              this.deleteBranch(item);
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

    async deleteBranch(item) {
      await this.$axios.delete("/branches/" + item.id).then((res) => {
        this.getItemsBranch();
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
