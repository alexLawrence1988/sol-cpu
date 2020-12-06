<template>
  <v-row no-gutters class="weather-bar" align="center">
    <v-col cols="3" class="pl-3">
      <GoogleMap />
      <div id="map" />
    </v-col>
    <v-col cols="2" class="pl-2" align="center">
      <img :src="getWeatherIcon" class="icon mt-8" />
    </v-col>
    <v-col cols="3" class="ml-3">
      <h3>
        {{ weather.city }}
      </h3>
      <h4>
        {{ weather.countryName }}
      </h4>
      <span class="overline">
        {{ weather.current.weather[0].description }}
      </span>
    </v-col>
    <v-col cols="3">
      <v-card height="110" class="mt-4">
        <div class="ma-2 overline">
          <h4>Temperature: {{ weather.current.temp }}&#8451;</h4>
          <h4>Feels like: {{ weather.current.feels_like }}&#8451;</h4>
          <h4>Humidity: {{ weather.current.humidity }}%</h4>
        </div>
      </v-card>
    </v-col>
    <v-btn icon @click="getWeather()">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-overlay v-show="loading" absolute>
      <v-progress-circular fixed color="primary" indeterminate />
    </v-overlay>
  </v-row>
</template>
<script>
import weatherApi from "../services/weather";
import GoogleMap from "./GoogleMap";

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      weather: {
        current: {
          weather: [{ icon: "03n" }],
        },
      },
      loading: false,
    };
  },
  computed: {
    getWeatherIcon() {
      const icon = this.weather.current.weather[0].icon;
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
  },
  methods: {
    async getWeather() {
      console.log("fetching weather");
      this.loading = true;
      window.navigator.geolocation.getCurrentPosition(async (location) => {
        this.weather = await weatherApi.get(location);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getWeather();
  },
};
</script>
<style scoped>
.weather-bar {
  height: 180px;
  position: fixed;
  z-index: 3;
  bottom: 0px;
  width: 100%;
}

.icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: cornflowerblue;
}
</style>
