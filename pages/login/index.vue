<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <form @submit.prevent="Sign()">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    label="E-mail or Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    label="password"
                    v-model="password"
                    class="input-group--focused"
                    @click:append="show3 = !show3"
                    required
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      email: null,

      show3: false,
      password: "",
      rules_password: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },

  methods: {
    async Sign() {
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then(() => {
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
        console.log(error);
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password !",
          confirmButtonText: `OK`,
        }).then((item) => {
          if (item.isConfirmed) {
            this.email = "";
            this.password = "";
          }
        });
      }
    },
  },
};
</script>

<style></style>
