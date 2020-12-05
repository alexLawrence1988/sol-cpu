<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn icon text @click="confirmQuitDialog = true">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Main />
      <v-dialog v-model="confirmQuitDialog">
        <v-card>
          <v-card-title> Are you sure you want to quit? </v-card-title>
          <v-row no-gutters class="pa-3">
            <v-spacer />
            <v-btn text outlined color="error" @click="confirmQuitDialog = false">Cancel </v-btn>
            <v-btn text outlined color="primary" class="pl-5" @click="exitProgram()">Quit </v-btn>
          </v-row>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main,
  },

  data: () => ({
    confirmQuitDialog: false,
  }),
  methods: {
    exitProgram() {
      window.ipc.send('quit');
    },
  },
};
</script>
