<template>
  <v-app dark>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
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

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-monitor-dashboard",
          title: "ข้อมูลลูกค้า",
          to: "/customers",
        },
        {
          icon: "mdi-archive-search",
          title: "รายละเอียดสินค้า",
          to: "/stock",
        },
        {
          icon: "mdi-package-down",
          title: "ใบส่งสินค้าชั่วคราว",
          to: "/received",
        },
        {
          icon: "mdi-package-down",
          title: "ใบรับเงินชั่วคราว",
          to: "/received",
        },
        {
          icon: "mdi-package-down",
          title: "ใบส่งสินค้า/บิลเงินสด",
          to: "/received",
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
        // {
        //   icon: "mdi-account-group",
        //   title: "ผู้ผลิต",
        //   to: "/supplier",
        // },
      ],
      title: "ระบบสต๊อกสินค้า",
    };
  },
};
</script>
