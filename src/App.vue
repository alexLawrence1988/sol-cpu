<template>
  <v-app>
    <v-app-bar app color="primary" class="drag" dark>
      <div class="d-flex align-center">
        <v-img
          alt="SolCpu Logo"
          class="shrink mr-2"
          contain
          src="https://www.cputemper.com/wp-content/uploads/sites/2/2018/03/cputemper-icon-1.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn class="no-drag" icon @click="ipcSend('minimize')">
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn class="no-drag" icon @click="maximize()">
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>
      <v-btn class="no-drag" icon @click="confirmQuitDialog = true">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <System />
      <v-dialog v-model="confirmQuitDialog">
        <v-card>
          <v-card-title> Are you sure you want to quit? </v-card-title>
          <v-row no-gutters class="pa-3">
            <v-spacer />
            <v-btn
              text
              outlined
              class="pr-5"
              color="error"
              @click="confirmQuitDialog = false"
              >Cancel
            </v-btn>
            <v-btn text outlined color="primary" @click="ipcSend('quit')">Quit </v-btn>
          </v-row>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import System from "./components/System";

export default {
  name: "App",

  components: {
    System,
  },

  data: () => ({
    confirmQuitDialog: false,
    maximized: false
  }),
  methods: {
    ipcSend(event) {
      window.ipcRenderer.send(event);
    },
    maximize(){
      const event = this.maximized ? 'restore' : 'maximize';
      this.ipcSend(event);
      this.maximized = !this.maximized;
    }
  },
};
</script>
<style scoped>
.drag {
  -webkit-app-region: drag;
}

.no-drag {
  -webkit-app-region: no-drag;
}

</style>
