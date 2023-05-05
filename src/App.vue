<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js';
import request from '@/mixins/mixinRequest';

export default {
  mixins: [request],
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val);
    }
  },
  async created() {
    // --------------- REFRESCAR TOKEN ------------
    /*try {
        await this.$auth.renewTokens();
      } catch (e) {
        console.log(e);
      }*/
    //console.log('CREATED ----------------------')
  },
  methods: {
    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
        document.body.classList.add('theme-dark');
      } else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-semi-dark');
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
      }
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
  }
};
</script>
<style lang="scss">
@import '~vue-directive-tooltip/src/css/index.scss';
.d-f {
  display: flex;
}
.tooltip-custom {
  background: #323232;
  padding: 5px 7px;
  font-size: 12px;
  border-radius: 6px;
}

.vue-tooltip.tooltip-custom .tooltip-arrow {
  border-color: #323232;
}
</style>
