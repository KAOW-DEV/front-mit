<template>
  <div>
    <v-card flat class="pl-2 pr-4">
      {{ detail_customer }}
      <v-row class="mt-2">
        <v-col cols="2">
          <v-subheader>รหัสลูกค้า</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_id"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader>เลขที่บัญชีลูกหนี้</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            type="number"
            v-model="detail_customer.customer_account_number_payable"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>ชื่อ/บริษัท</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>ที่อยู่ (1)</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_address_1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>ที่อยู่ (2)</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_address_2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>อำเภอ</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            outlined
            dense
            :search-input.sync="searchAmphure"
            :items="listAmphure"
            item-text="name_th"
            item-value="id"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-subheader>จังหวัด</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field outlined dense></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader>รหัสไปรษณีย์</v-subheader>
        </v-col>
        <v-col cols="2">
          <v-text-field outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>เบอร์โทรศัพท์</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_tel"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-subheader>เบอร์เฟกซ์</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_fax"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-subheader>ชื่อผู้ติดต่อ/รับเรื่อง</v-subheader>
        </v-col>
        <v-col cols="10">
          <v-text-field
            outlined
            dense
            v-model="detail_customer.customer_contact_name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-n10">
        <v-col cols="8">
          <v-row>
            <v-col cols="3">
              <v-subheader>ชื่อ Home Page</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                outlined
                dense
                v-model="detail_customer.customer_home_page"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n10">
            <v-col cols="3">
              <v-subheader>ประเภทลูกค้า</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n10">
            <v-col cols="3">
              <v-subheader>โอน/เขตการซื้อ-ขาย</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n10">
            <v-col cols="3">
              <v-subheader>หมายเลขผู้เสียภาษี</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field outlined dense></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-1 mr-5" outlined>
            <v-row class="mt-n7">
              <v-col>
                <v-checkbox label="สำนักงานใหญ่"></v-checkbox>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col cols="12">
                <v-checkbox label="สาขาย่อย ลำดับที่"></v-checkbox>
              </v-col>
            </v-row>
            <v-row class="mt-n10 ml-5">
              <v-col cols="6">
                <v-text-field outlined dense></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["detail_customer"],
  data() {
    return {
      searchAmphure: null,
      
      // list select data 
      listAmphure: [],
    };
  },
  methods: {
    async getAmphure(item) {
      console.log(item);
      await this.$axios
        .get("/amphures?name_th_contains=" + item + "&_limit=10")
        .then((resAmphure) => {
          this.listAmphure = resAmphure.data;
          console.log(resAmphure.data);
        });
    },
  },
  watch: {
    searchAmphure(e) {
      this.getAmphure(e);
    },
  },
  created() {
    this.getAmphure();
  },
};
</script>
