<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="red--text text-center">กำหนดรายชื่อพนักงาน</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn class="float-end" @click="openDialogAddUser"
            >เพิ่มข้อมูล</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title primary-title>
              ข้อมูลรายชื่อพนักงาน
              <v-spacer></v-spacer>
              <v-text-field
                label="ค้นหา"
                v-model="searchUser"
                hide-details=""
              ></v-text-field>
            </v-card-title>
            <v-divider></v-divider>
            <v-data-table
              :headers="headersUser"
              :items="itemsUser"
              :search="searchUser"
              @click:row="getItem"
            >
              <template v-slot:item.index="{ item, index }">
                {{ index + 1 }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogAddUser" persistent width="30%">
      <add-user
        @closeDialogAddUser="closeDialogAddUser"
        @getItemsUser="getItemsUser"
        :itemUser.sync="itemUser"
      ></add-user>
    </v-dialog>

    <v-dialog v-model="dialogEditUser" persistent width="30%">
      <edit-user
        @closeDialogEditUser="closeDialogEditUser"
        @getItemsUser="getItemsUser"
        :itemUser.sync="itemUser"
      ></edit-user>
    </v-dialog>
  </div>
</template>

<script>
import addUser from "~/components/setting/user/addUser.vue";
import EditUser from "~/components/setting/user/editUser.vue";
export default {
  components: { addUser, EditUser },
  data() {
    return {
      headersUser: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "ชื่อ-สกุล", value: "user_name" },
        { text: "username", value: "username" },
        { text: "email", value: "email" },
        { text: "บทบาท", value: "role.name" },
      ],
      itemsUser: [],
      searchUser: null,

      itemUser: {
        blocked: false,
        confirmed: true,
        email: null,
        id: 0,
        provider: null,
        role: null,
        user_name: null,
        user_number: null,
        username: null,
        password: null,
      },

      dialogAddUser: false,
      dialogEditUser: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsUser();
    },

    async getItemsUser() {
      await this.$axios.get("/users").then((res) => {
        // console.log("getItemsUser", res.data);
        this.itemsUser = res.data;
      });
    },

    async getItem(event, { item }) {
      console.log("item", item);

      this.itemUser = item;
      this.openDialogEditUser();
    },

    async openDialogAddUser() {
      this.dialogAddUser = true;
      this.resetItemUser();
    },
    async closeDialogAddUser() {
      this.dialogAddUser = false;
    },

    async openDialogEditUser() {
      this.dialogEditUser = true;
    },
    async closeDialogEditUser() {
      this.dialogEditUser = false;
    },

    async resetItemUser() {
      this.itemUser = {
        blocked: false,
        confirmed: true,
        email: null,
        id: 0,
        provider: null,
        role: null,
        user_name: null,
        user_number: null,
        username: null,
        password: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
