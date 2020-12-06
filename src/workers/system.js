import si from 'systeminformation';

export default {
    async get() {
        try {
            return si.cpu();
          } catch (err) {
            console.log(err);
          }
    }
} 
