<!-- =========================================================================================
	File Name: TheNavbar.vue
	Description: Navbar component
	Component Name: TheNavbar
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template lang="pug">
  div(class="relative")
    div(class="vx-navbar-wrapper")
      vs-navbar(class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj")
        //- SM - OPEN SIDEBAR BUTTON -->
        feather-icon(class="sm:inline-flex xl:hidden cursor-pointer mr-1" icon="MenuIcon" @click.stop="showSidebar")

        vs-spacer

        //- <!-- I18N -->
        vs-dropdown(vs-custom-content vs-trigger-click class="cursor-pointer mr-3")
          span(class="cursor-pointer flex i18n-locale font-label")
            img(class="h-4 w-5" :src="require(`@/assets/images/flags/${$i18n.locale}.png`)" :alt="$i18n.locale")
            span(class="hidden sm:block ml-2") {{ getCurrentLocaleData.lang }}
   
          vs-dropdown-menu(class="w-48 i18n-dropdown font-label")
            vs-dropdown-item(@click="updateLocale('es')")
              <img class="h-4 w-5 mr-1" src="@/assets/images/flags/es.png" alt="es">
              span &nbsp;Español
            vs-dropdown-item(@click="updateLocale('en')")
              <img class="h-4 w-5 mr-1" :src="require(`@/assets/images/flags/en.png`)" alt="en">
              span &nbsp;English

        //- //- <!-- SEARCHBAR -->
        //- div(class="search-full-container w-full h-full absolute pin-l" :class="{ flex: showFullSearch }" v-show="showFullSearch")
        //-   vx-auto-suggest(ref="navbarSearch" :autoFocus="showFullSearch" :data="navbarList" search_key="title" background-overlay class="w-full" inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus" icon="SearchIcon" :placeholder="$t('Buscar')" @input="hnd_search_query_update" @selected="selected" @closeSearchbar="showFullSearch = false")
         
        //-     template(v-slot:group="{ group_name }")
        //-       p(class="font-semibold text-primary") {{ group_name }}
            
        //-     //- <!-- Pages Suggestion -->
        //-     template(v-slot:pages="{ suggestion }")
        //-       router-link(v-if="suggestion.url" class="linkstylenav flex items-end leading-none py-1 color-navbar-search" :to="suggestion.url")
        //-         feather-icon(:icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4")
        //-         span(class="mt-1") {{ suggestion.title }}

        //-       div(v-else class="flex items-end leading-none py-1 color-navbar-search")
        //-         feather-icon(:icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4")
        //-         span(class="mt-1") {{ suggestion.title }}

        //-     //- <!-- Files Suggestion -->
        //-     template(v-slot:files="{ suggestion }")
        //-       div(class="flex items-center justify-between color-navbar-search")
        //-         div(class="flex items-center")
        //-           div(class="img-container w-8 mr-3 flex")
        //-             img(:src="require(`@/assets/images/file-icons/${suggestion.file_ext}.png`)" :alt="suggestion.file_name" class="responsive")
        //-           div(class="leading-none mt-1")
        //-             p(class="mb-1") {{ suggestion.file_name }}
        //-             small by {{ suggestion.from }}
        //-         small {{ suggestion.size }}

        //-     //- <!-- Contacts Suggestion -->
        //-     template(v-slot:contacts="{ suggestion }")
        //-       div(class="flex items-center justify-between color-navbar-search")
        //-         div(class="flex items-center")
        //-           img(:src="suggestion.img" :alt="suggestion.name" class="w-8 h-8 mr-3 rounded-full")
        //-           div(class="leading-none mt-1")
        //-             p {{ suggestion.name }}
        //-             small {{ suggestion.email }}
        //-         small {{ suggestion.time }}

        //-     //- <!-- No Items Slot -->
        //-     template(v-slot:noResult="{ group_name }")
        //-       div(class="flex items-center color-navbar-search")
        //-         feather-icon(icon="InfoIcon" svgClasses="h-5 w-5" class="mr-4")
        //-         span {{ $t('No hay resultados') }}

        //-   div(class="absolute pin-r h-full z-50")
        //-     feather-icon(icon="XIcon" class="px-4 cursor-pointer h-full close-search-icon" @click="showFullSearch = false")
        //- div(v-shortkey="['alt', 'b']" @shortkey="showFullSearch = !showFullSearch")
        //- feather-icon(icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer navbar-fuzzy-search ml-4")

        //- //- <!-- NOTIFICATIONS -->
        //- vs-dropdown(vs-custom-content vs-trigger-click class="cursor-pointer")
        //-   feather-icon(icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="unreadNotifications.length")
        //-   vs-dropdown-menu(class="notification-dropdown dropdown-custom")
        //-     di(class="notification-top text-center p-5 bg-primary text-white")
        //-       h3(class="text-white") {{ unreadNotifications.length }} New
        //-       p(class="opacity-75") App Notifications

        //-     VuePerfectScrollbar(ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings")
        //-       ul(class="bordered-items")
        //-         li(v-for="ntf in unreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer")
        //-           div(class="flex items-start")
        //-             feather-icon(:icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']")
        //-             div(class="mx-2")
        //-               span(class="font-medium block notification-title" :class="[`text-${ntf.category}`]") {{ ntf.title }}
        //-               small {{ ntf.msg }}
        //-           small(class="mt-1 whitespace-no-wrap") {{ elapsedTime(ntf.time) }}
        //-     div(class="checkout-footer fixed pin-b rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid border-grey-light cursor-pointer")
        //-       span View All Notifications

        //- <!-- USER META -->
        div(class="the-navbar__user-meta flex items-center")
          div(class="text-right leading-tight hidden md:block")
            p(class="font-semibold font-label") {{ user_displayName }}
            span(class="font-label") Disponible
          vs-dropdown(vs-custom-content class="cursor-pointer")
            div(class="con-img ml-3")
              img(v-if="fotoUsuario" key="localImg" :src="fotoUsuario" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block")
              //- <!--<img v-else key="localImg" :src="require(`@/assets/images/portrait/small/${activeUserImg}`)" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block">-->
              //- <!--<img v-else key="onlineImg" :src="activeUserImgNull" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block">-->

              span(class="avatar-usuario") {{ avatarUsuario }}
              //- <!-- <img(v-else key="localImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWnWW6qlm453wib6Cg98IPS1DW-LpV0Hpl8AC308cXwqiiccOBUN7tjoyOTVY62e8qjs&usqp=CAU" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block")/> -->
              //- <!-- <feather-icon v-else icon="SettingsIcon" class="cursor-pointer navbar-fuzzy-search ml-1" title="Configuracion"/> -->
            vs-dropdown-menu
              ul(style="min-width: 9rem")
                //-li(class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/seguridad/perfil')")
                  feather-icon(icon="UserIcon" svgClasses="w-4 h-4")
                  span(class="ml-2 font-label") Perfil
                li(class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="modificarClave")
                  feather-icon(icon="KeyIcon" svgClasses="w-4 h-4")
                  span(class="ml-2 font-label") Modificar Contraseña
                vs-divider(class="m-1")
                li(class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout")
                  feather-icon(icon="LogOutIcon" svgClasses="w-4 h-4")
                  span(class="ml-2 font-label") Cerrar Sesión
</template>

<script>
import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList';
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import draggable from 'vuedraggable';
import vSelect from 'vue-select';
import request from '@/mixins/mixinRequest';
import parametros from '@/mixins/mixinParametros';
import swal from 'sweetalert2';

export default {
  name: 'the-navbar',
  mixins: [request,parametros],
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      navbarList: { ...navbarSearchAndPinList },
      fotoUsuario: null,
      avatarUsuario: '',
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: 'New Message',
          msg: 'Are your going to meet me tonight?',
          icon: 'MessageSquareIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 1,
          title: 'New Order Recieved',
          msg: 'You got new order of goods.',
          icon: 'PackageIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'success'
        },
        {
          index: 2,
          title: 'Server Limit Reached!',
          msg: 'Server have 99% CPU usage.',
          icon: 'AlertOctagonIcon',
          time: 'Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)',
          category: 'danger'
        },
        {
          index: 3,
          title: 'New Mail From Peter',
          msg: 'Cake sesame snaps cupcake',
          icon: 'MailIcon',
          time: 'Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: 'Chocolate cake oat cake tiramisu',
          icon: 'CalendarIcon',
          time: 'Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)',
          category: 'warning'
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    };
  },
  watch: {
    $route(val) {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false;
     
    },
    localeCamb(val) {
      if (val) {
        let x = {};

        for (let [key, value] of Object.entries(navbarSearchAndPinList)) {
          let tmp = [];
          value.data.forEach((e) => {
            tmp.push({
              title: this.$t(e.title),
              url: e.url,
              icon: e.icon,
              is_bookmarked: e.is_bookmarked
            });
          });
          x[key] = { key: value.key, data: tmp };
        }
        this.navbarList = x;
      }
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },
    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == 'default') return 'navbar-default';
      else if (this.sidebarWidth == 'reduced') return 'navbar-reduced';
      else if (this.sidebarWidth) return 'navbar-full';
    },

    // I18N
    getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == 'en') {
        return { flag: 'us', lang: 'English' };
      } else if (locale == 'es') return { flag: 'es', lang: 'Español' };
    },
    localeCamb() {
      return this.$i18n.locale;
    },
    starredPages() {
      return [...this.$store.state.starredPages];
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list);
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10);
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesMore', list);
      }
    },

    // CART DROPDOWN
    /*cartItems() {
            return this.$store.state.eCommerce.cartItems.slice().reverse();
        },*/

    // PROFILE
    user_displayName() {
      //console.log(localStorage)
      return localStorage.getItem('userName');
      //return JSON.parse(localStorage.getItem('userInfo')).displayName
     // return JSON.parse(localStorage.getItem('usuario-rpe')).nombreCompleto.split(',')[1];
    },
    activeUserImgNull() {
      return null;
    }
  },
  methods: {
    selected(item) {
      item.pages ? this.$router.push(item.pages.url).catch(() => {}) : null;
      this.showFullSearch = false;
    },
    hnd_search_query_update(query) {
      // Show overlay if any character is entered
      this.$store.commit('TOGGLE_CONTENT_OVERLAY', query ? true : false);
    },
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
    },
    /*
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    */
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
      } else if (days > 0) {
        return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : 'just now');
      }

      return 'Just Now';
    },

    modificarClave(){
      this.$router.push({name:"modificar-contrasena"});
    },

    async logout() {
      let status = await swal.fire({type:'warning', title: this.$t("Mensaje del Sistema"), text: this.$t("¿Está seguro que desea cerrar sesión?"), showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Cerrar Sesión"), cancelButtonText: this.$t("Cancelar")});
      if(status.value){
        let response = await this.cerrarSesion();
        if(response.data.estado){
          this.responseRequest(response.data);
        }else{
          this.sweetAlert(response.data);
        }
        localStorage.clear();
        this.$router.push('/');
      }
    },

    async cerrarSesion(){
      try {
        this.$vs.loading({ type: "point" });
        let post = {};
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi( "cerrar_sesion_bo", post, "POST");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },

    // CART DROPDOWN
    removeItemFromCart(item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item);
    },
  },
  directives: {
    'click-outside': {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener('click', handler);
      },

      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable,
    vSelect
  },
  async mounted() {
    this.avatarUsuario = localStorage.getItem('avatar');
    /* 
    let parametro = await this.obtenerParametros(['TMSGERROR','TMSGADV','TMSGINF']);
    if(parametro != null) this.$store.commit('TIEMPO_MENSAJE', { advertencia: parametro.TMSGADV.parametroNumero, error: parametro.TMSGERROR.parametroNumero, informacion: parametro.TMSGINF.parametroNumero});
    this.fotoUsuario = JSON.parse(localStorage.getItem('usuario-rpe')).foto;
    }); 
    */
  }
};
</script>

<style>
.dropdown.border-bottom .dropdown-toggle {
  border: none;
  border-bottom: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 0px;
}
.vs-navbar {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.select-navbar {
  font-size: 12px !important;
}
.select-navbar .selected-tag {
  color: white !important;
}
.select-navbar .open-indicator:before {
  color: white !important;
  border-color: rgb(255, 2555, 255) !important;
}
.select-navbar .dropdown-toggle {
  border: none !important;
  border-bottom: 1px solid rgb(255, 2555, 255) !important;
  border-radius: 0px !important;
}
.avatar-usuario{
  background: #B9DD1F;
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  padding: 0.5rem;
  font-weight: 500;
  font-family: ui-sans-serif;
}
</style>
