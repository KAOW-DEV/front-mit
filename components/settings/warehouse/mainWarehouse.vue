<template>
  <v-data-table :headers="headers" :items="rowData" sort-by="id" class="elevation-0">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>จัดการคลังสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              เพิ่มคลังสินค้า
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.warehouse_name" label="ชื่อคลังสินค้า"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="save()">
                ยืนยัน
              </v-btn>
            </v-card-actions>
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
          text: 'ชื่อคลังสินค้า',
          align: 'start',
          sortable: false,
          value: 'warehouse_name',
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
        warehouse_name: '',
      },
      defaultItem: {
        warehouse_name: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'เพิ่มคลังสินค้า' : 'แก้ไขคลังสินค้า'
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
        await this.$axios.post('/warehouses', {
            warehouse_name: this.editedItem.warehouse_name,
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
        await this.$axios.get("/warehouses").then((res) => {
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
        await this.$axios.put('/warehouses/' + this.editedItem.id, {
            warehouse_name: this.editedItem.warehouse_name,
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
        await this.$axios.delete('/warehouses/' + this.editedItem.id)
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
