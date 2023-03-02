<template>
<div>
  <v-card class="mx-auto overflow-hidden nav" min-height="100vh">
    <v-app-bar color="primary" dense dark elevation="0" fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="cursor" v-if="title" @click="$router.push('/')">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu v-if="$auth.loggedIn" v-model="profile_menu" transition="slide-y-transition" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="36" class="avatar" color="#eee" v-bind="attrs" v-on="on">
            <v-img v-if="profilePicture" :src="profilePicture"></v-img>
            <v-icon v-else color="#777">fa-user</v-icon>
          </v-avatar>
        </template>

        <v-card width="300">
          <UserMiniInfo />
          <v-divider></v-divider>
          <div class="text-center">
            <v-btn block text @click="$auth.logout()">
              <v-icon small left>fas fa-sign-out-alt</v-icon> logout
            </v-btn>
          </div>
        </v-card>
      </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-row justify="center" class="ma-auto">
        <v-avatar size="200" class="my-5">
          <v-img v-if="profilePicture" :src="profilePicture"></v-img>
          <v-icon class="br-2" v-else size="140" color="#777">fa-user</v-icon>
        </v-avatar>
      </v-row>

      <div class="text-center">
        <h2>{{ $auth.user.username }}</h2>
      </div>

      <v-card-subtitle class="pb-0 caption">My Pets</v-card-subtitle>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">

          <v-list-item @click="$router.push(row.router)" v-for="(row,i) in lists_menu" :key="i">
            <v-list-item-icon>
              <v-badge color="primary" icon="mdi-plus" overlap>
                <v-icon>{{row.icon}}</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-title>{{ row.text }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div>
      <slot></slot>
    </div>
  </v-card>
</div>
</template>

<script>
import UserMiniInfo from '@/components/navbar/MiniInfo'
export default {
  components: { UserMiniInfo, },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      drawer: false,
      group: null,
      profile_menu: false,
      profilePicture: null,
      lists_menu: [{
          router: '/bill',
          text: 'เปิดบิล',
          icon: 'fas fa-cart-plus'
        },
        // { router: '', text: '', icon: '' },
      ]
    }
  }
}
</script>

<style scoped>
.nav {
  background: #0000000d;
}

.cursor {
  cursor: pointer;
}

.br-2 {
  border: 2px solid #eee;
  background: #efefef;
}
</style>
