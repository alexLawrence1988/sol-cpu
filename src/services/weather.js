import axios from 'axios';
import config from '../setup/config';

// TODO: URL should be in ENV files relevant to environment
// TODO: Keys should not be here, the weather api call should ideally
// go through a client service where the key can be obtained for the account

export default {
  async get(location) {

    const baseURL = 'https://api.openweathermap.org/data/2.5';
    const apiKey = config.weatherApiKey;

    const api = axios.create({
      baseURL,
      timeout: 30000,
    });

    const [response, locationDetail] = await Promise.all([
      api.get(`/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,daily&units=metric&appid=${apiKey}`),
      getLocationDetail(location)
    ]);

    return { ...response.data, ...locationDetail.data };
  }
};


async function getLocationDetail(location) {
  const baseURL = 'https://api.bigdatacloud.net/data';

  const api = axios.create({
    baseURL,
    timeout: 30000,
  });

  return await api.get(`/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`)

}