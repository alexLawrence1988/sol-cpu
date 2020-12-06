<template>
  <v-container>
    <v-tabs fixed-tabs>
      <v-tab v-for="(tab, i) in tabs" :key="i"> {{ tab }} </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <v-card flat>
          <SystemInfo v-if="tab === 'System Info'" />

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import SystemInfo from './SystemInfo';
// import NetworkInfo from './NetworkInfo';
// import CPUInfo from './CPUInfo';
// import CPUTemp from './CPUTemp';

export default {
  name: "System",
  components: {
    SystemInfo,
    // NetworkInfo,
    // CPUInfo,
    // CPUTemp
  },
  data: () => ({
    datasets: {},
    tab: 0,
    tabs: [
      "System Info",
      "Network Info",
      "CPU Info",
      "CPU Temperature",
    ],
  }),
};
</script>
