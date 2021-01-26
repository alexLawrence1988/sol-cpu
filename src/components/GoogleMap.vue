<template>
  <div>
    <br />
    <gmap-map id="map-location" :center="center" :zoom="13" style="width: 100%; height: 110px">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center = loc;

        this.markers.push({ position: loc });
      });
    },
  },
};
</script>
