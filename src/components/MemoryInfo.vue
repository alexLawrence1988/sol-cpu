<template>
  <div class="scroll">
    <v-row no-gutters>
      <v-spacer />
      <v-btn icon @click="getInfo()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-row>
    <v-row
      v-for="(val, name) in info"
      :key="name"
      no-gutters
      align="center"
      justify="center"
    >
      <v-col cols="6">
        <h3 class="overline font-weight-bold">{{ name }}</h3>
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
    loading: false,
  }),
  methods: {
    getInfo() {
      this.loading = true;
      window.ipcRenderer.send("get-memory-info");
    },
  },
  created() {
    window.ipcRenderer.on("memory-info", (event, data) => {
      this.info = data;
      this.loading = false;
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
