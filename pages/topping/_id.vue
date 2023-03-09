<template>
<div>
  <Loader v-if="loading" :loading="loading" />

  <v-card v-else flat outlined max-width="50%">
    <v-card-title> {{ form_mode == 'add'? 'สร้าง':'อัพเดท' }} ท็อปปิ้ง</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="form_valid">
        <v-text-field v-model="form.topping_name" class="mb-2" label="ชื่อ ท็อปปิ้ง" placeholder="ท็อปปิ้ง" outlined dense :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="form.description" class="mb-2" label="รายละเอียด ท็อปปิ้ง" placeholder="รายละเอียด" outlined dense></v-text-field>
        <v-text-field v-model="form.price" class="mb-2" label="ราคา ท็อปปิ้ง" placeholder="ราคา" outlined dense :rules="[rules.required]"></v-text-field>
        <v-radio-group v-model="form.status" label="สถานะ" row>
          <v-radio label="เปิดใช้งาน" :value="true"></v-radio>
          <v-radio label="ปิดใช้งาน" :value="false"></v-radio>
        </v-radio-group>

        <div class="text-center">
          <v-btn color="primary" class="mx-1" depressed rounded :disabled="!form_valid" @click="saveForm()">
            <v-icon left small>fa fa-check</v-icon>
            บันทึก
          </v-btn>
          <v-btn color="default" class="mx-1" depressed rounded @click="$router.back()">
            <v-icon left small>fa fa-times</v-icon>
            ยกเลิก
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      form_mode: 'add',
      form_valid: true,
      id: null,
      loading: false,
      form: {
        status: true
      },
      rules: {
        required: value => !!value || "กรุณากรอกข้อมูล"
      }
    }
  },
  methods: {
    ...mapActions({
      create: 'topping/create',
      loadInfo: 'topping/loadInfo',
      update: 'topping/update',
      loadData: 'topping/loadData'
    }),

    async getInfo(id) {
      this.loading = true
      const res = await this.loadInfo(id)
      this.loading = false
      if (res.status) {
        this.form = res.payload
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: res.message,
        }).then((result) => {
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.replace('/topping')
          }
        })
      }
    },

    saveForm() {
      if (this.form_mode == 'add') {
        this.createData()
      } else {
        this.updateData(this.id)
      }
    },

    async createData() {
      this.loading = true
      const res = await this.create(this.form)
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: res.message,
        }).then(async (result) => {
          await this.loadData()
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.replace('/topping')
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: res.message,
        })
      }
      this.loading = false
    },

    async updateData() {
      this.loading = true
      const res = await this.update({ id: this.id, data: this.form })
      this.loading = false
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: res.message,
        }).then((result) => {
          if (result.isConfirmed || !result.isConfirmed) {
            this.$router.replace('/topping')
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: res.message,
        })
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id && this.id != 'new') {
      this.getInfo(this.id)
      this.form_mode = 'edit'
    }
  }

}
</script>
