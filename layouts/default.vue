<template>
<div>
  <v-app>
    <Navbar :title="'My Shop Cocoa'">
     <div class="mt-12">
      <Nuxt />
     </div>
    </Navbar>
  </v-app>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
v-app,
.v-application {
  min-height: 100%;
  width: 100% !important;
}
</style>
