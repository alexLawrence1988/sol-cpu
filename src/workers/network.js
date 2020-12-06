import si from 'systeminformation';

export default {
    async get() {
        try {
            return si.networkStats();
          } catch (err) {
            console.log(err);
          }
    }
} 
