/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue';
import App from './App.vue';

// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css'; //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax);

// Tooltip
import Tooltip from 'vue-directive-tooltip';
Vue.use(Tooltip);

// v-mask
import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

Vue.use(require('vue-shortkey'));

// reCaptcha v3
import { VueReCaptcha } from 'vue-recaptcha-v3';
Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_RECAPTCHA_KEY });

// axios
import axios from 'axios';
Vue.prototype.$http = axios;

// Theme Configurations
import '../themeConfig.js';

// Algolia - Instant Search
import InstantSearch from 'vue-instantsearch';
Vue.use(InstantSearch);

// Globally Registered Components
import './globalComponents.js';

// Styles: SCSS
import './assets/scss/main.scss';

// Tailwind
import '@/assets/css/main.css';

// ACL
import acl from './acl/acl';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';

// i18n
import i18n from './i18n/i18n';

// Vuesax Admin Filters
import './filters/filters';

//ENCRIPTAR
import CryptoJS from 'crypto-js';

// Clipboard
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

// Tour
import VueTour from 'vue-tour';
Vue.use(VueTour);
require('vue-tour/dist/vue-tour.css');

// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

//Quill Editor
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor);
require('quill/dist/quill.bubble.css')

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'YOUR_KEY',
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
});

import AsyncComputed from 'vue-async-computed';

Vue.use(AsyncComputed);
//MIXIN DE FOCUS GLOBAL
Vue.mixin({
  data: () => ({
    styleArea: {}
  }),
  methods: {
    mapFocus() {
      document.querySelectorAll('textarea').forEach((e) => (e.parentElement.style.border = '1px solid rgba(0, 0, 0, 0.2)'));
    },
    focusInputArea(variable) {
      this.$refs[variable].$el.querySelector('textarea').focus();
    },
    focusArea(id) {
      let txtarea = document.getElementById(id).parentElement;
      setTimeout(() => {
        txtarea.style.border = '1px solid rgba(0, 0, 0,.2)';
        txtarea.style.boxShadow = '0 3px 10px 0 rgba(0,0,0,.15)';
      }, 1);
    },
    blurArea(id) {
      let txtarea = document.getElementById(id).parentElement;
      setTimeout(() => {
        txtarea.style.border = '1px solid rgba(0, 0, 0,.2)';
        txtarea.style.boxShadow = 'none';
        document.querySelectorAll('textarea').forEach((e) => (e.parentElement.style.border = '1px solid rgba(0, 0, 0, 0.2)'));
      }, 1);
    }
  },
  updated() {
    this.mapFocus();
  }
});

// DIRECTIVA PERZONALIZADA
Vue.directive('auth', {
  bind: function(el, binding, vnode, oldVnode) {
    const envMenu = true;

    if (envMenu) {
      if (localStorage.getItem('rutas') != null) {
        let rutas = localStorage.getItem('rutas');

        let encrypted_json = JSON.parse(atob(rutas.toString()));

        let decrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(process.env.VUE_APP_ENCRYPT_KEY.toString()), {
          iv: CryptoJS.enc.Base64.parse(encrypted_json.iv)
        });

        let decrypt = decrypted.toString(CryptoJS.enc.Utf8);
        // console.log('roue decrypt auth directive', JSON.parse(decrypt));

        let arrRutas = JSON.parse(decrypt) ? JSON.parse(decrypt) : [];

        if (arrRutas.length < 1) return;

        if (arrRutas.indexOf(binding.value) == -1) {
          vnode.componentInstance.$el.classList.add('hidden');
          vnode.elm.hidden = true;
          vnode.data.hook.destroy(vnode);
        }
      }
    }
  },
  update: function(el, binding, vnode, oldVnode) {
    const envMenu = true;

    if (envMenu) {
      if (localStorage.getItem('rutas') != null) {
        let rutas = localStorage.getItem('rutas');

        let encrypted_json = JSON.parse(atob(rutas.toString()));

        let decrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(process.env.VUE_APP_ENCRYPT_KEY.toString()), {
          iv: CryptoJS.enc.Base64.parse(encrypted_json.iv)
        });

        let decrypt = decrypted.toString(CryptoJS.enc.Utf8);
        //console.log('roue decrypt auth directive', JSON.parse(decrypt));

        let arrRutas = JSON.parse(decrypt) ? JSON.parse(decrypt) : [];

        if (arrRutas.length < 1) return;

        if (arrRutas.indexOf(binding.value) == -1) {
          vnode.componentInstance.$el.classList.add('hidden');
          vnode.elm.hidden = true;
          vnode.data.hook.destroy(vnode);
        }
      }
    }
  }
});

// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Feather font icon
require('./assets/css/iconfont.css');

require('./assets/css/Style.css');

require('./assets/css/StyleProgrexa.css');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: (h) => h(App)
}).$mount('#app');
