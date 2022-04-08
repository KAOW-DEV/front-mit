<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-toolbar flat>
              <v-text-field
                label="รหัสสต๊อกสินค้า(ภายใน)"
                dense
                outlined
                hide-details=""
              ></v-text-field>
              <v-btn class="mx-1">เปลี่ยนรหัสสต๊อกสินค้า</v-btn>
              <v-btn class="mx-1">Copy To</v-btn>
              <v-btn class="mx-1">Copy FROM</v-btn>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col cols="6">
            <v-toolbar flat>
              <v-text-field
                label="ชื่อรายละเอียดสินค้า"
                dense
                outlined
                hide-details=""
              ></v-text-field>
            </v-toolbar>
          </v-col>
          <v-col cols="6">
            <v-toolbar flat>
              <v-text-field
                label="ชื่อรายละเอียดสินค้า-2"
                dense
                outlined
                hide-details=""
              ></v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col cols="6">
            <v-toolbar flat>
              <v-text-field
                label="ประเภทสินค้า"
                dense
                outlined
                hide-details=""
                class="shrink"
              ></v-text-field>
              <v-text-field dense outlined hide-details="">
                <template v-slot:append>
                  <v-btn class="mt-n2 mr-n3" dark color="red"
                    ><v-icon>mdi-download</v-icon></v-btn
                  >
                </template>
              </v-text-field>
            </v-toolbar>
          </v-col>
          <v-col cols="6">
            <v-toolbar flat>
              <v-text-field
                label="ประเภทย่อย"
                dense
                outlined
                hide-details=""
                class="shrink"
              ></v-text-field>
              <v-text-field dense outlined hide-details="">
                <template v-slot:append>
                  <v-btn class="mt-n2 mr-n3" dark color="red"
                    ><v-icon>mdi-download</v-icon></v-btn
                  >
                </template>
              </v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col cols="6">
            <v-toolbar flat>
              <v-text-field
                label="กลุ่มสินค้าย่อย"
                dense
                outlined
                hide-details=""
                class="shrink"
              ></v-text-field>
              <v-text-field dense outlined hide-details="">
                <template v-slot:append>
                  <v-btn class="mt-n2 mr-n3" dark color="red"
                    ><v-icon>mdi-download</v-icon></v-btn
                  >
                </template>
              </v-text-field>
            </v-toolbar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
