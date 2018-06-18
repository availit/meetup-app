<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
    >
      <v-list class="pt-0" dense>
        <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="onLogout" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
      @click.native.stop="drawer = !drawer"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link v-text="this.title" to="/" tag="span" style="cursor: pointer"></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
        exact
        flat
        v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon> {{item.title}}
        </v-btn>

        <v-btn flat
        v-if="userIsAuthenticated"
        @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon> Sign Out
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'AppMeet',
      drawer: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'home', title: 'Home', link: '/'},
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'home', title: 'Home', link: '/'},
          {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
          {icon: 'room', title: 'Organize Meetup', link: '/meetups/new'},
          {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
