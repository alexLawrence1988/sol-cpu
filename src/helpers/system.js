import si from 'systeminformation';

export default {
    async get() {
        try {
            return si.system();
          } catch (err) {
            console.log(err);
          }
    }
} 
