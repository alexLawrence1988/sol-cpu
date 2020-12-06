<template>
  <v-container>
    <v-tabs v-model="selectedTab" background-color="transparent" color="basil" grow>
      <v-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab" class="tab-content">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <v-card flat>
          <SystemInfo v-if="tab === 'System Info'" />
          <NetworkInfo v-if="tab === 'Network Info'" />
          <CPUInfo v-if="tab === 'CPU Info'" />
          <CPUTemp v-if="tab === 'CPU Temperature'" />
          <MemoryInfo v-if="tab === 'Memory Info'" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-divider />
  </v-container>
</template>

<script>
import SystemInfo from "./SystemInfo";
import NetworkInfo from "./NetworkInfo";
import CPUInfo from "./CPUInfo";
import CPUTemp from "./CPUTemp";
import MemoryInfo from "./MemoryInfo";

export default {
  name: "System",
  components: {
    SystemInfo,
    NetworkInfo,
    CPUInfo,
    CPUTemp,
    MemoryInfo
  },
  data: () => ({
    datasets: {},
    selectedTab: 0,
    tabs: ["System Info", "Network Info", "CPU Info", "CPU Temperature", "Memory Info"],
  }),
};
</script>
<style scoped>
.tab-content {
  height: calc(100vh - 285px);
  overflow: auto;
}
</style>
