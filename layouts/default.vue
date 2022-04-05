<template>
  <v-app dark>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app style="height: 100%">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-btn block large color="red" dark @click="logout">
            <v-icon left>mdi-logout</v-icon>Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- <v-container> -->
      <Nuxt />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  // middleware: "auth",
  data() {
    return {
      drawer: true,

      items: [
        {
          icon: "mdi-monitor-dashboard",
          title: "หน้าแรก",
          to: "/dashboard",
        },
      ],

      title: "ระบบสต๊อกสินค้า",
    };
  },

  methods: {
    async logout() {
      this.$swal({
        title: "ออกจากระบบ",
        text: "ยืนยันเพื่อออกจากระบบ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          //success
          this.$auth.logout();
          // this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped>
#app {
  zoom: 80%;
}

#app {
  font-family: "Sarabun", sans-serif;
}
</style>
