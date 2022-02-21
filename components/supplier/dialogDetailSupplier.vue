<template>
  <div>
    <v-card>
      <v-card-title class="green--text">
        <v-icon large color="green">mdi-card-account-details-outline</v-icon>
        &nbsp; &nbsp;
        <h2>ข้อมูลผู้ผลิต</h2>

        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="closeDialog">
          <v-icon large>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>รหัส :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_code != null">
                        {{ supplier.supplier_code }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>คำนำหน้าชื่อ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_title_name != null">
                        {{ supplier.supplier_title_name }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ชื่อบริษัทฯ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_name != null">
                        {{ supplier.supplier_name }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>

                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ที่อยู่ 1 :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_address_1 != null">
                        {{ supplier.supplier_address_1 }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ที่อยู่ 2 :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_address_2 != null">
                        {{ supplier.supplier_address_2 }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>จังหวัด :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.province != null">
                        {{ supplier.province.name_th }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>อำเภอ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.amphure != null">
                        {{ supplier.amphure.name_th }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ตำบล :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.district != null">
                        {{ supplier.district.name_th }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>รหัสไปรษณีย์ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.district != null">
                        {{ supplier.district.zip_code }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="6">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>E=Mail :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_email != null">
                        {{ supplier.supplier_email }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>เบอร์โทรศัพท์ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_tel != null">
                        {{ supplier.supplier_tel }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>E=Mail :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_email != null">
                        {{ supplier.supplier_email }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>Fax :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_fax != null">
                        {{ supplier.supplier_fax }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>เลขที่บัญชี :</p></b>
                    </td>
                    <td class="text-left">
                      <p
                        v-if="supplier.supplier_account_number_payable != null"
                      >
                        {{ supplier.supplier_account_number_payable }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>เลขประจำตัวผู้เสียภาษี :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_number_tax != null">
                        {{ supplier.supplier_number_tax }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>เขตซื้อขาย :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.trading_zone != null">
                        {{ supplier.trading_zone.trading_zone_name }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ประเภทผู้ผลิต :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.vendor_type != null">
                        {{ supplier.vendor_type.vendor_type_name }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" width="50%">
                      <b><p>ผู้ติดต่อ :</p></b>
                    </td>
                    <td class="text-left">
                      <p v-if="supplier.supplier_contact_name != null">
                        {{ supplier.supplier_contact_name }}
                      </p>
                      <p v-else class="red--text">ไม่มีข้อมูล</p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["dialogDetailSupplier", "itemSupplier"],

  data() {
    return {};
  },

  created() {
    // console.log("supplier", this.supplier);
  },

  methods: {
    async closeDialog() {
      this.$emit("update:dialogDetailSupplier", false);
    },
  },
};
</script>

<style>
</style>