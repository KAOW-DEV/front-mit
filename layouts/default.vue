<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
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
    </v-navigation-drawer>
    <v-app-bar color="white" :clipped-left="clipped" fixed app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-archive-search",
          title: "สต๊อกสินค้า",
          to: "/stock",
        },
        {
          icon: "mdi-package-down",
          title: "รับเข้า",
          to: "/received",
        },
        {
          icon: "mdi-package-up",
          title: "เบิก-จ่าย",
          to: "/pay",
        },
        {
          icon: "mdi-account-group",
          title: "ผู้ผลิต",
          to: "/supplier",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "ระบบสต๊อกสินค้า",
    };
  },
};
</script>
