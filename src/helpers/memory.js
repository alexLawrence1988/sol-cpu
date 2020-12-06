import si from 'systeminformation';

export default {
    async get() {
        try {
            return si.mem();
          } catch (err) {
            console.log(err);
          }
    }
} 
