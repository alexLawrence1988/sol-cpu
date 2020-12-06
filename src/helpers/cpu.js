import si from 'systeminformation';

export default {
  info: {
    async get() {
      try {
        return si.cpu();
      } catch (err) {
        console.log(err);
      }
    }
  },
  temperature: {
    async get() {
      try {
        return si.cpuTemperature();
      } catch (err) {
        console.log(err);
      }
    }
  },
  speed: {
    async get() {
      try {
        return si.cpuCurrentspeed();
      } catch (err) {
        console.log(err);
      }
    }
  }
} 
