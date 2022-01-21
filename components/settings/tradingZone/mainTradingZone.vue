<template>
  <v-data-table :headers="headers" :items="rowData" sort-by="id" class="elevation-0">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>จัดการโซน/เขตการขาย</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มโซน/เขตการขาย
            </v-btn>
          </template>
          <v-card>
            <form @submit.prevent="save()">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.trading_zone_name" required label="ชื่อโซน/เขตการขาย"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text type="submit">
                ยืนยัน
              </v-btn>
            </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      overlay: true,
      dialog: false,
      dialogDelete: false,
      headers: [{
          text: 'ชื่อโซน/เขตการขาย',
          align: 'start',
          sortable: false,
          value: 'trading_zone_name',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      rowData: [],
      editedIndex: -1,
      editedItem: {
        trading_zone_name: '',
      },
      defaultItem: {
        trading_zone_name: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'เพิ่มโซน/เขตการขาย' : 'แก้ไขโซน/เขตการขาย'
      },
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        this.rowData = [];
        this.readData();
      },
      async createData() {
        this.overlay = true;
        await this.$axios.post('/trading-zones', {
            trading_zone_name: this.editedItem.trading_zone_name,
          })
          .then(response => {
            this.overlay = false;
            this.rowData.push(response.data)
            this.close();
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'เรียบร้อย',
              timer: 1500
            })
          })
          .catch(error => {
            this.overlay = false;
            console.log('error', error);
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async readData() {
        await this.$axios.get("/trading-zones").then((res) => {
            this.rowData = res.data;
            this.overlay = false;
          })
          .catch(error => {
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async updateData() {
        this.overlay = true;
        await this.$axios.put('/trading-zones/' + this.editedItem.id, {
            trading_zone_name: this.editedItem.trading_zone_name,
          })
          .then(response => {
            Object.assign(this.rowData[this.editedIndex], response.data);
            this.overlay = false;
            this.close();
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'อัพเดตเรียบร้อย',
              timer: 1500
            })
          })
          .catch(error => {
            this.overlay = false;
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      async deleteData() {
        this.overlay = true;
        await this.$axios.delete('/trading-zones/' + this.editedItem.id)
          .then(response => {
            this.rowData.splice(this.editedIndex, 1)
            this.overlay = false;
            this.$swal({
              position: 'center',
              icon: 'success',
              title: 'ลบเรียบร้อย',
              timer: 1500
            })
          })
          .catch(error => {
            this.overlay = false;
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: error,
              showConfirmButton: true,
            })
          })
      },
      editItem(item) {
        this.editedIndex = this.rowData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.editedIndex = this.rowData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$swal({
          title: 'ลบข้อมูล',
          text: "คุณต้องการลบหรือไม่!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteData();
          }
        })
      },

      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save() {
        if (this.editedIndex > -1) {
          this.$swal({
            title: 'บันทึกข้อมูล',
            text: "คุณต้องการบันทึกหรือไม่!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              this.updateData();
            }
          })
        } else {
          this.$swal({
            title: 'บันทึกข้อมูล',
            text: "คุณต้องการบันทึกหรือไม่!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              this.createData();
            }
          })
        }
      }
    },
  }

</script>

<style>

</style>
