<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="layout--main" :class="[navbarClasses, footerClasses, { 'app-page': isAppPage }]">
    <vx-tour :steps="steps" v-if="!disableThemeTour" />

    <the-customizer
      @updateNavbar="updateNavbar"
      @updateNavbarColor="updateNavbarColor"
      :navbarType="navbarType"
      :navbarColor="navbarColor"
      :footerType="footerType"
      @updateFooter="updateFooter"
      :routerTransition="routerTransition"
      @updateRouterTransition="updateRouterTransition"
      v-if="!disableCustomizer"
      :hideScrollToTop="hideScrollToTop"
      @toggleHideScrollToTop="toggleHideScrollToTop"
    />
    <vx-sidebar :sidebarItems="sidebarItemsMenu" title="Vuesax" parent=".layout--main" />

    <div id="content-area" :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]">
      <div id="content-overlay"></div>

      <div class="content-wrapper">
        <the-navbar :navbarColor="navbarColor" :class="[{ 'text-white': isNavbarDark && !isThemeDark }, { 'text-base': !isNavbarDark && isThemeDark }]" />

        <div class="router-view">
          <div class="router-content" :class="{ 'mt-0': navbarType == 'hidden' }">
            <div class="content-area__content">
              <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg" color="primary" />
              </back-to-top>
              <transition :name="routerTransition" mode="out-in">
                <router-view v-if="view" @changeRouteTitle="changeRouteTitle" @responseParametros="responseParametros"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <!--
      <the-footer></the-footer>
      -->
    </div>
  </div>
</template>

<script>

import VxSidebar from '@/layouts/components/vx-sidebar/VxSidebar.vue';
import TheCustomizer from '../components/customizer/TheCustomizer.vue';
import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '../components/TheFooter.vue';
import themeConfig from '@/../themeConfig.js';
import request from '@/mixins/mixinRequest';
import sidebarItems from '@/layouts/components/vx-sidebar/sidebarItems.js'; // => se sobrepone
import BackToTop from 'vue-backtotop';
import CryptoJS from 'crypto-js';
const VxTour = () => import('@/components/VxTour.vue');

export default {

  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    TheCustomizer,
    BackToTop,
    VxTour
  },

  mixins: [request],

  data() {
    return {
      logo: null,
      view: true,
      navbarType: themeConfig.navbarType || 'floating',
      navbarColor: themeConfig.navbarColor || '#fff',
      footerType: themeConfig.footerType || 'static',
      routerTransition: themeConfig.routerTransition || 'none',
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      //sidebarItems: [],
      disableCustomizer: themeConfig.disableCustomizer,
      windowWidth: window.innerWidth, //width of windows
      hideScrollToTop: themeConfig.hideScrollToTop,
      disableThemeTour: themeConfig.disableThemeTour,
      steps: [
        {
          target: '#btnSidebarToggler',
          content: 'Toggle Collapse Sidebar.'
        },
        {
          target: '.vx-navbar__starred-pages',
          content: 'Create your own bookmarks. You can also re-arrange them using drag & drop.'
        },
        {
          target: '.i18n-locale',
          content: 'You can change language from here.'
        },
        {
          target: '.navbar-fuzzy-search',
          content: 'Try fuzzy search to visit pages in flash.'
        },
        {
          target: '.customizer-btn',
          content: 'Customize template based your preference',
          params: {
            placement: 'left'
          }
        }
      ]
    };
  },

  watch: {
    $route(to) {
      //this.changeAltas(to);
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      if (this.navbarColor == '#fff' && val) {
        this.updateNavbarColor('#10163a');
      } else {
        this.updateNavbarColor('#fff');
      }
    }
  },

  computed: {
    sidebarItemsMenu() {
      return this.$store.state.menu ? this.$store.state.menu : []
    },
    isAppPage() {
      if (this.$route.path.includes('/apps/')) return true;
      else return false;
    },
    isThemeDark() {
      return this.$store.state.theme == 'dark';
    },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.sidebarWidth == 'default') return 'content-area-default';
      else if (this.sidebarWidth == 'reduced') return 'content-area-reduced';
      return 'content-area-full';
      //else if (this.sidebarWidth) return 'content-area-full';
    },
    navbarClasses() {
      return {
        'navbar-hidden': this.navbarType == 'hidden',
        'navbar-sticky': this.navbarType == 'sticky',
        'navbar-static': this.navbarType == 'static',
        'navbar-floating': this.navbarType == 'floating'
      };
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType == 'hidden',
        'footer-sticky': this.footerType == 'sticky',
        'footer-static': this.footerType == 'static'
      };
    }
  },

  methods: {
    async cargarMenu() {
      try {
        //this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`cargar_menu_bo`);
        let response = data.data;
        if (response.estado) {
          localStorage.removeItem('rutas');
          localStorage.setItem('rutas', response.data);
          let rutas = localStorage.getItem('rutas');
          let encrypted_json_ruta = JSON.parse(atob(rutas.toString()));
          let decrypted_ruta = CryptoJS.AES.decrypt(encrypted_json_ruta.value, CryptoJS.enc.Base64.parse(process.env.VUE_APP_ENCRYPT_KEY.toString()), {
            iv: CryptoJS.enc.Base64.parse(encrypted_json_ruta.iv)
          });
          let decrypt_ruta = decrypted_ruta.toString(CryptoJS.enc.Utf8);
          let arrRutas = JSON.parse(decrypt_ruta) ? JSON.parse(decrypt_ruta) : [];
          let arrmenu = [];
          let childrens = [];
          sidebarItems.forEach( opcion => { 
            if(opcion.submenu){
              opcion.submenu.forEach( subopcion => {
                arrRutas.forEach( element => { 
                  if(element == subopcion.slug) childrens.push(subopcion);
                });
              });
              if(childrens.length){
                arrmenu.push(
                  {
                    url: opcion.url,
                    name: opcion.name,
                    slug: opcion.slug,
                    i18n: opcion.i18n,
                    icon: opcion.icon,
                    nivel: opcion.nivel,
                    submenu: childrens
                  }
                )
              }
              childrens = [];
            }else{
              arrRutas.forEach( element => {
                if(element == opcion.slug) arrmenu.push(opcion)
              });
            }
          });
          this.$store.commit('CAMBIAR_MENU', arrmenu);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        //this.$vs.loading.close();
      }
    },
    responseParametros(value) {
      console.log('cambio en el view', this);
      this.view = value;
    },
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == '#fff') this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false);
        this.$store.dispatch('updateSidebarWidth', 'no-sidebar');
        this.disableThemeTour = true;
      } else if (this.windowWidth < 1200) {
        this.$store.dispatch('updateSidebarWidth', 'reduced');
      } else {
        this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  },

  async created() {
    try {
      this.setSidebarWidth();
      if (this.navbarColor == '#fff' && this.isThemeDark) this.updateNavbarColor('#10163a')
      else this.updateNavbarColor(this.navbarColor)
      this.cargarMenu();
    } catch (error) {
      throw new Error(error);
    }
  }

};

</script>
