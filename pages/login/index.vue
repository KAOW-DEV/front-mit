<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4" md="4">
        <v-card elevation="12">
          <form @submit.prevent="Sign">
            <v-card-title primary-title>
              <v-spacer></v-spacer>
              <h1 class="text-center">
                <v-icon>mdi-login-variant</v-icon>
                ล็อกอิน
              </h1>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-autocomplete
                      :items="itemsBranch"
                      item-text="branch_name"
                      item-value="id"
                      v-model="itemBranch"
                      return-object
                      placeholder="เลือกสาขา"
                      prepend-icon="mdi-source-branch"
                      outlined
                      hide-details=""
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      placeholder="กรอก Username หรือ E-Mail"
                      prepend-icon="mdi-account"
                      :disabled="text_field_disbled"
                      required
                      v-model="email"
                      hide-details=""
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      placeholder="Password"
                      required
                      label="กรอก password"
                      prepend-icon="mdi-lock"
                      :disabled="text_field_disbled"
                      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (value = !value)"
                      :type="value ? 'password' : 'text'"
                      v-model="password"
                      hide-details=""
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                color="success"
                dark
                large
                :loading="loading_btn"
              >
                <h3>เข้าสู่ระบบ</h3>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      show3: false,
      value: String,
      text_field_disbled: false,
      loading_btn: false,

      email: null,
      password: null,

      itemsBranch: [],
      itemBranch: {},
    };
  },

  created() {
    this.getItemsBranch();
  },

  methods: {
    async getItemsBranch() {
      await this.$axios
        .get("/branches")
        .then((res) => {
          console.log("getItemsBranch", res.data);
          this.itemsBranch = res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async Sign() {
      this.text_field_disbled = true;
      this.loading_btn = true;
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              identifier: this.email,
              password: this.password,
            },
          })
          .then(() => {
            this.$auth.$storage.setUniversal("itemBranch", this.itemBranch);
            this.$swal({
              position: "center",
              icon: "success",
              title: "ยินดีต้อนรับเข้าสู่ระบบ",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
          });
      } catch (error) {
        this.password = null;
        this.text_field_disbled = false;
        this.loading_btn = false;

        this.$swal({
          icon: "error",
          title: "Oops...",
          html: "<p>Invalid username or password ! </p>",
          confirmButtonText: `OK`,
        });
      }
    },
  },
};
</script>
