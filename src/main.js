import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps";
import config from './setup/config';

Vue.use(VueGoogleMaps, {
  load: {
    key: config.googleMapsApiKey,
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
