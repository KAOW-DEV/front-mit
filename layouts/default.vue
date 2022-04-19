<template>
  <v-app dark>
    <v-app-bar color="white" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" app style="height: 100%"> -->
    <!-- <v-list>
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
            <v-icon left>mdi-logout</v-icon>ออกจากระบบ
          </v-btn>
        </v-list-item>
      </v-list> -->
    <!-- </v-navigation-drawer> -->

    <v-navigation-drawer v-model="drawer" app style="height: 100%">
      <v-list nav dense>
        <div v-for="(link, i) in links" :key="i">
          <v-list-item v-if="!link.subLinks" :to="link.to" class="v-list-item">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.text" />
          </v-list-item>

          <v-list-group
            v-else
            :key="link.text"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              dense
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ sublink.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout"> ออกจากระบบ </v-btn>
        </div>
      </template>
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

      title: "ระบบสต๊อกสินค้า",

      links: [
        {
          to: "/dashboard",
          icon: "mdi-view-dashboard",
          text: "หน้าแรก",
        },
        {
          icon: "mdi-folder",
          text: "สินค้า",
          subLinks: [
            {
              text: "รายละเอียดสินค้า",
              to: "/product/productDetail",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ตารางหน่วยซื้อ/ขาย",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "สต๊อกคงเหลือ",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
          ],
        },
        {
          icon: "mdi-folder",
          text: "ใบรับเข้า",
          subLinks: [
            {
              text: "ผู้ผลิต/ผู้ส่งสินค้า",
              to: "/supplier",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบรับเข้า",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบคืนสินค้า/ลดหนี้",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
          ],
        },
        {
          icon: "mdi-folder",
          text: "ใบขาย",
          subLinks: [
            {
              text: "ใบส่งสินค้าชั่วคราว",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "บิลเงินสด",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบกำกับภาษี/ใบส่งสินค้า",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบกำกับภาษีอย่างย่อ",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบกำกับภาษี/ใบเสร็จ",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบลดหนี้",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบลดหนี้กำกับภาษี",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบวางบิลชั่วคราว",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "ใบเสร็จรับเงิน",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
          ],
        },
        {
          icon: "mdi-folder",
          text: "ใบเสนอราคา",
          to: "/",
        },
        {
          icon: "mdi-folder-swap",
          text: "โอนระหว่างสาขา",
          to: "/",
        },
        {
          icon: "mdi-folder",
          text: "แฟ้มข้อมูลอ้างอิง",
          subLinks: [
            {
              text: "กำหนดประเภท",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "กำหนดยี่ห้อ",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "กำหนดหน่วยนับ",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "กำหนดรายชื่อพนักงาน",
              to: "/setting/user",
              icon: "mdi-format-list-bulleted-square",
            },
            {
              text: "กำหนดประเภทผู้จำหน่าย",
              to: "/",
              icon: "mdi-format-list-bulleted-square",
            },
          ],
        },
      ],
    };
  },

  methods: {
    async logout() {
      this.$swal({
        title: "ออกจากระบบ",
        text: "ยืนยัน เพื่อออกจากระบบ",
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
