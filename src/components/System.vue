<template>
  <v-container>
    <v-tabs v-model="selectedTab" background-color="transparent" color="basil" grow>
      <v-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <v-card flat>
          <SystemInfo v-if="tab === 'System Info'" />
          <NetworkInfo v-if="tab === 'Network Info'" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import SystemInfo from "./SystemInfo";
import NetworkInfo from "./NetworkInfo";
// import CPUInfo from './CPUInfo';
// import CPUTemp from './CPUTemp';

export default {
  name: "System",
  components: {
    SystemInfo,
    NetworkInfo,
    // CPUInfo,
    // CPUTemp
  },
  data: () => ({
    datasets: {},
    selectedTab: 0,
    tabs: ["System Info", "Network Info", "CPU Info", "CPU Temperature"],
  }),
};
</script>
