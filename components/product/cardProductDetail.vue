<template>
  <div>
    <form @submit.prevent="checkSave">
      <v-card class="ma-7" flat>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="รหัสสต๊อกสินค้า(ภายใน)"
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_code"
                required
                :disabled="editItem"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn class="mx-1">เปลี่ยนรหัสสต๊อกสินค้า</v-btn>
              <v-btn class="mx-1">Copy To</v-btn>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="6">
              <v-text-field
                label="ชื่อรายละเอียดสินค้า"
                dense
                outlined
                hide-details=""
                v-model="itemProduct.product_name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="4">
              <v-autocomplete
                label="ประเภทสินค้า"
                v-model="itemProduct.group"
                :items="itemsGroup"
                item-text="group_name"
                item-value="id"
                return-object
                dense
                outlined
                hide-details=""
                required
                @change="getItemsSubGroup"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                label="ประเภทย่อย"
                v-model="itemProduct.sub_group"
                :items="itemsSubGroup"
                item-text="sub_group_name"
                item-value="id"
                return-object
                dense
                outlined
                hide-details=""
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="4">
              <v-autocomplete
                label="หน่วยนับ"
                v-model="itemProduct.unit"
                :items="itemsUnit"
                item-text="unit_name"
                item-value="id"
                return-object
                dense
                outlined
                hide-details=""
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                label="ผู้จำหน่าย"
                v-model="itemProduct.supplier"
                :items="itemsSupplier"
                item-text="supplier_name"
                item-value="id"
                return-object
                dense
                outlined
                hide-details=""
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="4">
              <v-text-field
                label="ยอดคงเหลือ"
                dense
                outlined
                hide-details=""
                readonly
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="6">
              <v-text-field
                label="วันที่สร้างข้อมูล"
                dense
                outlined
                hide-details=""
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="ปรับปรุงล่าสุดวันที่"
                dense
                outlined
                hide-details=""
                readonly
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="เวลา"
                dense
                outlined
                hide-details=""
                readonly
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-chip large label color="primary" text-color="white">
                วันที่สร้างข้อมูล 12/04/2565 เวลา 17:17:17
              </v-chip>
            </v-col>

            <v-col cols="6">
              <v-chip large label color="warning">
                วันที่สร้างแก้ไขลาสุด 12/04/2565 เวลา 17:17:17
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="mt-3">
          <v-spacer></v-spacer>
          <v-btn color="success" type="submit">
            <v-icon>mdi-content-save</v-icon>
            บันทึก
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("th");

export default {
  props: ["itemProduct"],
  data() {
    return {
      itemsGroup: [],
      itemsSubGroup: [],
      itemsUnit: [],
      itemsSupplier: [],
    };
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.getItemsGroup();
      this.getItemsUnit();
      this.getItemsSupplier();
    },

    async getItemsGroup() {
      await this.$axios.get("/groups").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsGroup = res.data;
      });
    },

    async getItemsSubGroup() {
      if (this.itemProduct.group != null) {
        await this.$axios
          .get("/sub-groups?group=" + this.itemProduct.group.id)
          .then((res) => {
            // console.log("itemsGroup", res.data);
            this.itemsSubGroup = res.data;
          });
      } else {
        this.itemsSubGroup = [];
      }
    },

    async getItemsUnit() {
      await this.$axios.get("/units").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsUnit = res.data;
      });
    },

    async getItemsSupplier() {
      await this.$axios.get("/suppliers").then((res) => {
        // console.log("itemsGroup", res.data);
        this.itemsSupplier = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
