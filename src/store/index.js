import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://dallasnews.imgix.net/1490816981-Foster-2012-Field.jpg?auto=format%2Cenhance&crop=faces%2Centropy&fit=crop&q=40&or=0&w=1024&h=543',
        id: 'asdfg',
        title: 'Meetup in Dallas',
        date: '2018-08-19',
        location: 'Dallas, tx',
        description: 'this is a dummy description that is hardcoded'
      },
      {
        imageUrl: 'https://images.fineartamerica.com/images-medium-large-5/texas-state-capitol-and-the-austin-skyline-from-south-congress-a-rob-greebon.jpg',
        id: 'qwerty',
        title: 'Meetup in Austin',
        date: '2018-07-17',
        location: 'Austin, tx',
        description: 'this is a dummy description that is hardcoded'
      }
    ],
    user: {
      id: 'asdfg',
      registeredMeetups: ['qwerty']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'idstore13434'
      }
      // Reach out to firebase and store payload
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
