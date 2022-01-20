<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="5" md="5">
        <v-card class="pa-5 rounded-xl" elevation="12">
          <form @submit.prevent="Sign">
            <h1 class="text-center">
              <v-icon>mdi-login-variant</v-icon> Sign In
            </h1>
            <v-divider class="my-5"></v-divider>
            <v-row class="mb-n5">
              <v-col cols="12">
                <h4>Username or Email</h4>
                <v-text-field
                  outlined
                  placeholder="Enter Username or Email"
                  class="rounded-pill"
                  prepend-icon="mdi-account"
                  :disabled="text_field_disbled"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n5">
              <v-col cols="12">
                <h4>Password</h4>
                <v-text-field
                  outlined
                  placeholder="Password"
                  class="rounded-pill"
                  required
                  label="Enter password"
                  prepend-icon="mdi-lock"
                  :disabled="text_field_disbled"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                class="css_botton ml-auto"
                type="submit"
                dark
                elevation="0"
                large
                :loading="loading_btn"
              >
                Login
              </v-btn>
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
    };
  },

  methods: {
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

<style scoped>
button {
  text-decoration: none;
  /* position: absolute; */
  border: none;
  font-size: 14px;
  font-family: inherit;
  color: #fff;
  width: 9em;
  height: 3em;
  line-height: 2em;
  text-align: center;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
}

button:hover {
  animation: ani 8s linear infinite;
  border: none;
}

@keyframes ani {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

button:before {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 35px;
  transition: 1s;
}

button:hover::before {
  filter: blur(20px);
}

button:active {
  background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
}
</style>
