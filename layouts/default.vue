<template>
  <v-app dark>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app style="height: 100%">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="true" prepend-icon="mdi-cog">
          <template v-slot:activator>
            <v-list-item-title>ตั้งค่า</v-list-item-title>
          </template>

          <v-list-group :value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(item, i) in admins" :key="i" link :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>User</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(item, i) in users" :key="i" link :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
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
    middleware: "auth",
    data() {
      return {
        drawer: true,
        admins: [{
            icon: "mdi-package-up",
            title: "Categoreis",
            to: "/settings/categoreis",
          },
          {
            icon: "mdi-package-up",
            title: "Group",
            to: "/settings/group",
          },
          {
            icon: "mdi-package-up",
            title: "Trading zone",
            to: "/settings/trading_zone",
          },
          {
            icon: "mdi-package-up",
            title: "Vendor Type",
            to: "/settings/vendor_type",
          },
          {
            icon: "mdi-package-up",
            title: "Warehouse",
            to: "/settings/warehouse",
          }
        ],
        users: [{
          icon: "mdi-package-up",
          title: "categoreis",
          to: "/settings/categoreis",
        }],
        items: [{
            icon: "mdi-monitor-dashboard",
            title: "ข้อมูลลูกค้า",
            to: "/customers",
          },
          {
            icon: "mdi-archive-search",
            title: "รายการสินค้า",
            to: "/product_list",
          },
          {
            icon: "mdi-package-down",
            title: "ใบส่งสินค้าชั่วคราว",
            to: "/",
          },
          {
            icon: "mdi-package-down",
            title: "ใบรับเงินชั่วคราว",
            to: "/",
          },
          {
            icon: "mdi-package-down",
            title: "ใบส่งสินค้า/บิลเงินสด",
            to: "/",
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
          }
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
