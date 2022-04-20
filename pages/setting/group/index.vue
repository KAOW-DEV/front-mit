<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">กำหนดประเภทสินค้า</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn color="success" class="float-end" @click="addGroup"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    ประเภทหลัก
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="ค้นหา"
                      v-model="searchGroup"
                      hide-details=""
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headersItemsGroup"
                    :items="itemsGroup"
                    :search="searchGroup"
                    @click:row="getItem"
                  >
                    <template v-slot:item.index="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                      <v-btn color="warning" @click="editGroup(item)"
                        >แก้ไข</v-btn
                      >
                      <v-btn color="error" @click="checkDeleteGroup(item)"
                        >ลบ</v-btn
                      >
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn color="success" class="float-end" @click="addSubGroup"
                  >เพิ่ม</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    ประเภทย่อย
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="ค้นหา"
                      v-model="searchSubGroup"
                      hide-details=""
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headersItemsSubGroup"
                    :items="itemsSubGroup"
                    :search="searchSubGroup"
                  >
                    <template v-slot:item.index="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:item.actions="{ item, index }">
                      <v-btn color="warning" @click="editSubGroup(item)"
                        >แก้ไข</v-btn
                      >
                      <v-btn color="error" @click="checkDeleteSubGroup(item)"
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

    <!-- group -->
    <v-dialog v-model="dialogAddGroup" persistent width="30%">
      <add-group
        @closeDialogAddGroup="closeDialogAddGroup"
        @getItemsGroup="getItemsGroup"
        :itemGroup.sync="itemGroup"
      ></add-group>
    </v-dialog>

    <v-dialog v-model="dialogEditGroup" persistent width="30%">
      <edit-group
        @closeDialogEditGroup="closeDialogEditGroup"
        @getItemsGroup="getItemsGroup"
        :itemGroup.sync="itemGroup"
      ></edit-group>
    </v-dialog>

    <!-- subgroup -->
    <v-dialog v-model="dialogAddSubGroup" persistent width="30%">
      <add-sub-group
        @closeDialogAddSubGroup="closeDialogAddSubGroup"
        @getItemsSubGroup="getItemsSubGroup"
        :itemSubGroup.sync="itemSubGroup"
        :itemGroup.sync="itemGroup"
      ></add-sub-group>
    </v-dialog>

    <v-dialog v-model="dialogEditSubGroup" persistent width="30%">
      <edit-sub-group
        @closeDialogEditSubGroup="closeDialogEditSubGroup"
        @getItemsSubGroup="getItemsSubGroup"
        :itemSubGroup.sync="itemSubGroup"
        :itemGroup.sync="itemGroup"
      ></edit-sub-group>
    </v-dialog>
  </div>
</template>

<script>
import addGroup from "~/components/setting/group/addGroup.vue";
import AddSubGroup from "~/components/setting/group/addSubGroup.vue";
import EditGroup from "~/components/setting/group/editGroup.vue";
import EditSubGroup from "~/components/setting/group/editSubGroup.vue";
export default {
  components: { addGroup, EditGroup, AddSubGroup, EditSubGroup },
  data() {
    return {
      headersItemsGroup: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ID", value: "id" },
        { text: "ชื่อประเภท", value: "group_name" },
        { text: "Action", value: "actions", align: "center", sortable: false },
      ],
      itemsGroup: [],
      searchGroup: null,

      itemGroup: {
        group_name: null,
      },

      dialogAddGroup: false,
      dialogEditGroup: false,

      headersItemsSubGroup: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ID ประเภทหลัก", value: "group.id" },
        { text: "ชื่อประเภทหลัก", value: "group.group_name" },
        { text: "ID ประเภทย่อย", value: "id" },
        { text: "ชื่อประเภทย่อย", value: "sub_group_name" },
        { text: "Action", value: "actions", align: "center", sortable: false },
      ],

      itemsSubGroup: [],
      searchSubGroup: null,

      itemSubGroup: {
        sub_group_name: null,
      },

      dialogAddSubGroup: false,
      dialogEditSubGroup: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsGroup();
    },

    async getItemsGroup() {
      await this.$axios.get("/groups").then((res) => {
        // console.log("getItemsGroup", res.data);
        this.itemsGroup = res.data;
      });
    },

    async getItem(event, { item }) {
      console.log("item", item);
      this.itemGroup = item;
      this.getItemsSubGroup();
    },

    async getItemsSubGroup() {
      await this.$axios
        .get("/sub-groups?group=" + this.itemGroup.id)
        .then((res) => {
          //   console.log("getItemsSubGroup", res.data);

          this.itemsSubGroup = res.data;
        });
    },

    async addGroup() {
      this.dialogAddGroup = true;
      this.resetItemGroup();
      this.resetItemsSubGroup();
    },

    async resetItemGroup() {
      this.itemGroup = {
        group_name: null,
      };
    },

    async resetItemsSubGroup() {
      this.itemsSubGroup = [];
    },

    async closeDialogAddGroup() {
      this.dialogAddGroup = false;
    },

    async editGroup(item) {
      this.itemGroup = item;
      this.dialogEditGroup = true;
    },

    async closeDialogEditGroup() {
      this.dialogEditGroup = false;
      this.getItemsGroup();
    },

    async checkDeleteGroup(item) {
      await this.$axios.get("/products?group=" + item.id).then((res) => {
        // console.log("res.data", res.data);
        if (res.data.length > 0) {
          this.alertNotDelete();
          return;
        } else {
          this.$axios.get("/sub-groups?group=" + item.id).then((res) => {
            if (res.data.length > 0) {
              this.alertDeleteSubGroup();
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
                  this.deleteGroup(item);
                }
              });
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

    async alertDeleteSubGroup() {
      this.$swal({
        title: "ไม่สามารถลบได้",
        text: "กรุณาลบประเภทย่อยทั้งหมดก่อน",
        icon: "warning",
      });
    },

    async deleteGroup(item) {
      await this.$axios.delete("/groups/" + item.id).then((res) => {
        this.getItemsGroup();
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

    async addSubGroup() {
      console.log("itemGroup", this.itemGroup);
      if (this.itemGroup.group_name != null) {
        this.resetItemSubGroup();
        this.dialogAddSubGroup = true;
      } else {
        this.alertChangeGroup();
      }
    },

    async resetItemSubGroup() {
      this.itemSubGroup = {
        sub_group_name: null,
      };
    },

    async alertChangeGroup() {
      this.$swal({
        title: "กรุณาเลือกประเภทหลัก",
        text: "คลิกที่แถวตารางประเภทหลักที่ต้องการเลือก",
        icon: "warning",
      });
    },

    async closeDialogAddSubGroup() {
      this.dialogAddSubGroup = false;
    },

    async editSubGroup(item) {
      this.itemSubGroup = item;
      this.dialogEditSubGroup = true;
    },

    async closeDialogEditSubGroup() {
      this.dialogEditSubGroup = false;
      this.getItemsSubGroup();
    },

    async checkDeleteSubGroup(item) {
      await this.$axios.get("/products?sub_group=" + item.id).then((res) => {
        console.log("res.data", res.data);
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
              this.deleteSubGroup(item);
            }
          });
        }
      });
    },

    async deleteSubGroup(item) {
      await this.$axios.delete("/sub-groups/" + item.id).then((res) => {
        this.getItemsSubGroup();
        this.alertDeleteSuccess(item);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
