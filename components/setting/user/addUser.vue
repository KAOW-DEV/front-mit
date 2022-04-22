<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card>
        <v-card-title primary-title>
          <v-icon>mdi-plus</v-icon> เพิ่มข้อมูลพนักงาน
          <v-spacer></v-spacer>
          <v-btn icon dark>
            <v-icon @click="$emit('closeDialogAddUser')">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="ชื่อ-สกุล"
                v-model="itemUser.user_name"
                dense
                outlined
                hide-details=""
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="username"
                v-model="itemUser.username"
                dense
                outlined
                hide-details=""
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="email"
                v-model="itemUser.email"
                dense
                outlined
                hide-details=""
                required
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="password"
                v-model="itemUser.password"
                dense
                outlined
                hide-details=""
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="บทบาท"
                v-model="itemUser.role"
                :items="itemsRole"
                item-text="name"
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
          <v-btn class="mx-3" color="success" type="submit">บันทึก</v-btn>
          <v-btn
            class="mx-3"
            color="red"
            dark
            @click="$emit('closeDialogAddUser')"
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
  props: ["itemUser"],

  data() {
    return {
      itemsRole: [],
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsRole();
    },

    async getItemsRole() {
      await this.$axios
        .get("/users-permissions/roles?_sort=name:ASC")
        .then((res) => {
          console.log("getItemsRole", res.data.roles);

          //   res.data.roles.splice(0, 2);
          this.itemsRole = res.data.roles;
        });
    },

    async alertPasswordNotPass() {
      this.$swal({
        title: "รหัสผ่านคาดเดาง่ายเกินไป",
        text: "ต้องประกอบด้วย ตัวพิพม์เล็ก+ตัวพิพ์ใหญ่+ตัวเลข",
        icon: "error",
      });
    },

    async checkSave() {
      var pwdPolicy = /^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*$/;
      var pass = this.itemUser.password;
      if (pass.match(pwdPolicy)) {
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
            this.$emit("closeDialogAddUser");
            this.addUser();
          }
        });
      } else {
        this.alertPasswordNotPass();
        return;
      }
    },

    async addUser() {
      await this.$axios
        .post("/users", {
          blocked: false,
          confirmed: true,
          email: this.itemUser.email,
          role: this.itemUser.role,
          user_name: this.itemUser.user_name,
          username: this.itemUser.username,
          password: this.itemUser.password,
        })
        .then((res) => {
          this.$emit("getItemsUser");
          this.alertSuccess();
        })
        .catch((error) => {
          this.alertError();
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
