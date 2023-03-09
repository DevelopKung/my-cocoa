<template>
<div class="pa-4">

  <BarFilter>
    <v-row class="mb-3" no-gutters align="end">
      <v-col cols="auto" v-for="(prod,i) in lists_product" :key="i">
        <v-btn color="primary" rounded depressed @click="addBill(prod)">
          <v-icon size="14" left>fa fa-plus</v-icon> เพิ่ม {{prod.prod_name}}
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn color="primary" rounded depressed @click="previewData(bill)">
          ตรวจสอบ <v-icon size="14" right>fas fa-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </BarFilter>

  <v-row class="mt-4">
    <v-col cols="12" sm="8" md="8">

      <v-row>
        <v-col v-for="(b,i) in bill" :key="i" cols="12" sm="6">
          <div class="form-bill">
            <div class="text--form pa-4">
              <div class="d-flex justify-space-between align-center">
                <h2>บิล {{ i + 1 }}</h2>
                <v-btn small color="error" depressed dark fab @click="removeData(i)">
                  <v-icon dark>fas fa-times</v-icon>
                </v-btn>
              </div>
              <div>
                <v-row class="my-0" v-for="(top, index) in b.topping" :key="index" align="center">
                  <v-col class="py-0" cols="auto">
                    <v-img v-if="top.image" :src="top.image" width="50" height="50"></v-img>
                    <v-icon v-else size="50" color="#777">mdi-image</v-icon>
                  </v-col>
                  <v-col class="py-0">
                    <v-checkbox class="mt-0 pt-0" v-model="top.enabled" left :label="top.topping_name + ' ราคา ' + top.price" hide-details></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-col>
        
      </v-row>

    </v-col>
    <v-col cols="12" sm="4" md="4">
      <v-card class="pa-4" v-if="total_sum">
        <v-text-field v-model="description" label="รายละเอียด" outlined dense ></v-text-field>
        <div class="px-4">
          <v-row align="center" justify="space-between">
            <h2>ราคารวม</h2> 
            <h2>{{ total_sum }}</h2> 
          </v-row>
        </div>
        <div class="mt-4 text-right">
          <v-btn color="primary" rounded depressed @click="submit(data)" small>
             <v-icon size="14" left>fas fa-dollar-sign</v-icon> ตกลง
          </v-btn>
        </div>
      </v-card>
      <v-card class="pa-4 mt-8" width="100%" min-height="50vh">
        <v-expansion-panels v-if="data&&data.length>0">
          <v-expansion-panel v-for="(item,i) in data" :key="i" >
            <v-expansion-panel-header class="d-flex justify-space-between">
              <div> บิลที่ {{ i + 1 }} โกโก้ใส่ท็อบปิ้ง  </div>
              <div> {{ item.total }} </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div v-for="(top, index) in item.topping" :key="index">
                  {{ top.topping_name }} ราคา {{ top.price }}
                </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      bill: [],
      data: [],
      lists_product: [],
      lists_topping: [],
      description: null
    }
  },
  computed: {
    total_sum() {
      if (this.data && this.data.length > 0) {
        return this.data.reduce((a, b) => a + b.total, 0)
      }
    },
  },
  methods: {
    ...mapActions({
      loadDataProduct: 'product/loadData',
      loadDataTopping: 'topping/loadData',
      createBill: 'bill/create'
    }),
    async addBill(prod) {
      await this.getTopping()
      let topping = Object.assign([], this.lists_topping)
      let form = {
        _id: prod._id,
        price: prod.price,
        topping: topping
      }
      this.bill.push(form)
    },
    removeData(index){
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
          this.bill.splice(index, 1)
        }
      })
    },
    previewData(bill){
      this.data = []
      bill.forEach(e => {
        this.data.push({
          prod_id: e._id,
          price: e.price,
          total: e.price + (e.topping.filter(x => x.enabled).reduce((a, b) => a + b.price, 0)),
          topping: e.topping.filter(x => x.enabled),
          description: this.description,
          topping_ids: e.topping.filter(x => x.enabled).map( x => x.topping_id)
        })
      });
    },
    async submit(data) {
      let res = await this.createBill(data)
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: res.message
        })
        this.data = []
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    },
    
    async getTopping(){
      let top = await this.loadDataTopping()
      this.lists_topping = JSON.parse(JSON.stringify(top.payload))
      this.lists_topping.forEach(e => {
        e.enabled = false
      });
      return this.lists_topping
    },
    async getProduct(){
      let prod = await this.loadDataProduct()
      this.lists_product = JSON.parse(JSON.stringify(prod.payload))
      return this.lists_product
    }
  },
  async created() {
    await this.getProduct()
    await this.getTopping()
  },
}
</script>

<style lang="scss" scoped>
.form-bill {
  max-width: 270px;
  height: 34rem;
  margin: 0 auto;
  background-image: url('@/static/img/bg-cocoa.png') !important;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    background: #eeeeeee7;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  .text--form {
    position: absolute;
  }
}
</style>
