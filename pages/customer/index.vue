<template>
  <div>
    <customer-title></customer-title>

    <v-row>
      <v-col cols="12">
        <v-btn color="success" class="float-end" @click="goToCreate">
          เพิ่มข้อมูล (F1)
        </v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title primary-title>
        Customer
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="ค้นหา"
          append-icon="mdi-magnify"
          outlined
          hide-details=""
          autofocus
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :search="search"
        @dblclick:row="goToEdit"
      >
        <template v-slot:item.index="{ item, index }">
          {{ index + 1 }}
        </template>
        <!-- <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template> -->
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import customerTitle from "~/components/customer/customerTitle.vue";
export default {
  components: { customerTitle },
  data() {
    return {
      search: null,

      headers: [
        {
          text: "ลำดับ",
          value: "index",
          sortable: false,
        },
        {
          text: "ชื่อ/บริษัทฯ",
          value: "name",
        },
        {
          text: "ที่อยู่",
          value: "address_1",
        },
        {
          text: "เบอร์โทร.",
          value: "phone",
        },
        {
          text: "แฟกซ์",
          value: "fax",
        },
        {
          text: "ประเภท",
          value: "customer_type.title",
        },
      ],

      items: [],
    };
  },

  methods: {
    async getItemsCustomer() {
      this.items = await this.$axios
        .get("/customers?_sort=name:ASC&_limit=-1")
        .then((res) => {
          console.log("getItemsCustomer", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    async goToEdit(e, { item }) {
      console.log("e", e);
      console.log("item", item);
      this.$router.push("/customer/" + item.id);
    },

    async goToCreate() {
      this.$router.push("/customer/add");
    },

    async getEvent(e) {
      //   console.log("e", e);

      if (e.keyCode == 112) {
        e.preventDefault();
        this.goToCreate();
      }
    },
  },

  created() {
    this.getItemsCustomer();
    window.addEventListener("keydown", this.getEvent);
  },

  destroyed() {
    window.removeEventListener("keydown", this.getEvent);
  },
};
</script>

<style lang="scss" scoped>
</style>