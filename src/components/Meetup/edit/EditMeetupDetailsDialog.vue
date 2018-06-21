<template>
  <v-dialog v-model="editDialog" max-width="350px" persistent>
    <v-btn slot="activator" color="primary" fab>
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required
                ></v-text-field>
                <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editedDescription"
                  multi-line
                  required
                  ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
              @click="editDialog = false"
              flat
              class="blue--text darken-1">Close</v-btn>
              <v-btn
              @click="onSaveChanges"
              flat
              class="blue--text darken-1">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editDialog: false
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      const newMeetup = {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      }
      this.$store.dispatch('updateMeetupData', newMeetup)
    }
  }
}
</script>
