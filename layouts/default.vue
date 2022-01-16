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
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
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
          title: "รายการสินค้า",
          to: "/stock_list",
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
      ],
      title: "ระบบสต๊อกสินค้า",
    };
  },
};
</script>

<style scoped>
#app {
  zoom: 80%;
}
</style>
