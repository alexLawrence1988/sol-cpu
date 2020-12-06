<template>
  <div class="scroll">
    <v-row no-gutters>
      <v-spacer />
      <v-btn icon @click="getInfo()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-row>
    <v-row
      v-for="(val, name) in combinedInfo"
      :key="name"
      no-gutters
      align="center"
      justify="center"
    >
      <v-col cols="6">
        <h3>{{ name }}</h3>
      </v-col>
      <v-col cols="6">
        <span>{{ val }}</span>
      </v-col>
    </v-row>
    <v-overlay v-show="loading" absolute>
      <v-progress-circular fixed color="primary" indeterminate />
    </v-overlay>
  </div>
</template>
<script>
export default {
  data: () => ({
    info: {},
    speed: {},
    loading: false,
  }),
  computed: {
    combinedInfo() {
      return { ...this.info, ...this.speed };
    },
  },
  methods: {
    getInfo() {
      this.loading = true;
      window.ipcRenderer.send("get-cpu-info");
      window.ipcRenderer.send("get-cpu-speed");
    },
  },
  created() {
    window.ipcRenderer.on("cpu-info", (event, data) => {
      this.info = data;
      this.loading = false;
    });

    window.ipcRenderer.on("cpu-speed", (event, data) => {
      console.log(data);
      this.speed = data;
    });

    this.getInfo();
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
