<template>
  <div v-show="!loading" class="scroll">
    <v-row
      v-for="(val, name) in info"
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
      <v-progress-circular absolute color="primary" indeterminate v-if="loading" />
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    info: {},
    loading: true,
  }),
  created() {
    window.ipcRenderer.on("system-info", (event, data) => {
      console.log(data);
      this.info = data;
      this.loading = false;
    });
  },
};
</script>
<style scoped>

.scroll {
    overflow-y: auto;
}
</style>
