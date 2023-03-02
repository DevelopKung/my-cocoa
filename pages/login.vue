<template>
<div class="login">
  <v-card outlined class="mx-2" width="400" max-height="400">
    <v-card-title>LOGIN</v-card-title>
    <v-card-text>
      <v-text-field v-model="username" label="Username" placeholder="กรุณากรอก Username"></v-text-field>
      <v-text-field v-model="password" label="Password" placeholder="กรุณากรอก Password" type="password"></v-text-field>
      <v-btn @click="login" :loading="loading" color="primary" block dark elevation="0">ตกลง</v-btn>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      username: 'E-fat',
      password: '123456',
      loading: false
    }
  },
  methods: {
    async login(e) {
      this.loading = true
      e.preventDefault();

      const payload = {
        username: this.username,
        password: this.password,
      };

      try {
        const res = await this.$auth.loginWith('local', {
          data: payload
        });
        if (res.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ถูกต้อง',
          })
          await this.$auth.logout()
          this.loading = false
          return
        }
        this.$router.push('/');
        this.loading = false
      } catch (e) {
        this.$router.push('/login');
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/static/img/bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: sans-serif;
}
</style>
