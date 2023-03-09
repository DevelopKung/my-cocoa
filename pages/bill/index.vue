<template>
  <div>
    <Loader v-if="loading" :loading="loading" />
  
    <div v-else>
      <BarFilter>
        <v-row class="mb-3" no-gutters align="end">
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" placeholder="ค้นหา" single-line hide-details clearable></v-text-field>
          </v-col>
        </v-row>
      </BarFilter>
  
      <v-card class="mt-8" outlined>
        <v-data-table dense :search="search" :headers="dataTable.headers" :items="lists" :items-per-page="30" :footer-props="dataTable.footerProps">
          <template v-slot:[`item.index`]="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span :class="item.status ? 'success--text' : 'error--text'">{{ item.status ? 'ใช้งาน' : 'ยกเลิก' }}</span>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            <span>{{ item.price | numeral() }}</span>
          </template>
          <template v-slot:[`item.created_date`]="{ item }">
            <span>{{ new Date(item.created_date).toLocaleDateString() }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="openForm(item.prod_id)">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteData(item.prod_id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  
  </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import Swal from 'sweetalert2'
  console.log(mapActions);
  export default {
    data() {
      return {
        search: '',
        loading: false,
        lists: []
      }
    },
    computed: {
      dataLists() {
        return JSON.parse(JSON.stringify(this.lists))
      },
  
      dataTable() {
        return {
          headers: [{
              text: "ลำดับ",
              value: 'index',
              inlineFilter: false,
              sortable: false,
              width: 10,
            },
            {
              text: "ชื่อ",
              value: 'prod_name',
              inlineFilter: false,
              sortable: false
            },
            {
              text: "รายละเอียด",
              value: 'description',
              inlineFilter: false,
              sortable: false
            },
            {
              text: "ราคา",
              value: 'price',
              inlineFilter: false,
              sortable: false
            },
            {
              text: "สถานะ",
              value: 'status',
              inlineFilter: false,
              sortable: false
            },
            {
              text: "สร้างวันที่",
              value: 'created_date',
              inlineFilter: false,
              sortable: false
            },
            {
              text: '',
              value: 'actions',
              sortable: false,
              width: 100,
              align: "right"
            }
          ],
          footerProps: {
            'items-per-page-options': [30, 50, 100, -1],
            'itemsPerPageText': "จำนวนต่อหน้า"
          }
        }
  
      }
  
    },
    methods: {
      ...mapActions({
        loadData: 'bill-data/loadData',
        delete: 'bill-data/delete'
      }),
      async getDate(){
        // this.loading = true
        let res = await this.loadData()
        console.log(res);
        // this.lists = res.payload
        // this.loading = false
      },
      async deleteData(id) {
        Swal.fire({
          title: 'ต้องการลบข้อมูลจริงหรือไม่ ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ไม่'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.delete(id).then((res) => {
              if (!res.status) {
                Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาด',
                })
              } else {
                this.getDate()
                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'ลบสำเร็จ',
                })
              }
            })
          }
        })
      }
    },
    async fetch() {
      this.getDate()
    }
  }
  </script>
  