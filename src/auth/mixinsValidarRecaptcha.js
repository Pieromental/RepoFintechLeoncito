import { requestApi } from '@/api';

export default {
  methods: {
    validacionRecaptcha(token) {
      return requestApi('verificar_capcha', { token: token }, 'post');
    }
  }
};
