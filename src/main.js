import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/edit/EditMeetupDetailsDialog'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  }
})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_KEY,
      authDomain: 'appmeetup-9ca55.firebaseapp.com',
      databaseURL: 'https://appmeetup-9ca55.firebaseio.com',
      projectId: 'appmeetup-9ca55',
      storageBucket: 'appmeetup-9ca55.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadMeetups')
      }
    })
  }
})
