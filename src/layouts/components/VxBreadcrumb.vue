<!-- =========================================================================================
    File Name: VxBreadcrumb.vue
    Description: Breadcrumb component
    Component Name: VxBreadcrumb
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template lang="pug">
  div(class="vx-breadcrumb")
</template>

<script>

import CryptoJS from 'crypto-js';

export default {
  name: 'vx-breadcrumb',
  data(){
    return {
      dataBreadcrumb: [],
      breadcrumb: [],
      accessActive: false,
    }
  },
  components:{
  },
  methods: {
    createBreadcrumb(){
      let refreshMenu = process.env.VUE_APP_MENU == 'true' ? true : false;
      this.breadcrumb =  refreshMenu ? [] : this.$route.meta.breadcrumb;

      if(!refreshMenu) return
      
      let menu = localStorage.getItem('menu');

      //menu
      let encrypted_json = JSON.parse(atob(menu.toString()));

      let decrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(process.env.VUE_APP_ENCRYPT_KEY.toString()), {
        iv: CryptoJS.enc.Base64.parse(encrypted_json.iv)
      });

      let decrypt = decrypted.toString(CryptoJS.enc.Utf8);

      let parseDecrypt = JSON.parse(decrypt);

      let arrmenu = [];

      for (const key in parseDecrypt) {
        if (parseDecrypt.hasOwnProperty(key)) {
          arrmenu.push(parseDecrypt[key]);
        }
      }
     // console.info('arrmenu',arrmenu)
      this.dataBreadcrumb = [];
      let dataTempBreadcrumb = [];
      let breadcrumb = this.$route.meta.breadcrumb;
      let pop = this.$route.meta.breadcrumb.pop();
      if(breadcrumb.length > 0){
        
        console.log('menu=>',this.$route.fullPath);
        let fullPath = this.$route.fullPath;
        let split = fullPath.split('/');
        let status = false;
        if(split.length > 2){
          breadcrumb.forEach(element =>{
            if(element.hasOwnProperty('url')){
              if(element.url != '/'){
                fullPath = element.url;
                status = true;
              }
            }
          });
        }
        let valor = this.selectElementMenu(arrmenu,fullPath);
        this.saveSongFather(arrmenu,valor.hijo,arrmenu);
        dataTempBreadcrumb.push(
          {
            title: 'Inicio', url: '/', active: false
          }
        );
        this.dataBreadcrumb.reverse().forEach(element =>{
          dataTempBreadcrumb.push({
            title: this.converToMayuscula(element.i18n),
            active: false
          });
        });
        if(!status){
          dataTempBreadcrumb.push({
            title: this.converToMayuscula(valor.i18n),
            active: true
          });
        }else{
          dataTempBreadcrumb.push(
            {
              title: this.converToMayuscula(valor.i18n),
              url: valor.url,
              active: false
            },
            pop
          );
        }
      }
      
      this.breadcrumb = dataTempBreadcrumb;

    },

    selectElementMenu(array,url){
      let valor = '';
      array.forEach(element =>{
        if(valor) return
        if(element.url == url){
            valor = element;
          }else{
            if(element.hasOwnProperty('submenu')){
              valor = this.selectElementMenu(element.submenu,url);
            }
          }
      });
      return valor;
    },

    saveSongFather(array,value,arrmenu){
      let salir = false;
      array.forEach(element =>{
        if(salir) return;
        if(element.padre == value){
          let valor = element;
          // if(valor.hasOwnProperty('submenu')){
          //   delete valor.submenu;
          // }
          this.dataBreadcrumb.push(valor);
          if(element.nivel == 1){
            salir = true;
          }else{
            this.saveSongFather(arrmenu, element.hijo,arrmenu);
          }
        }else{
          if(element.hasOwnProperty('submenu')){
            this.saveSongFather(element.submenu, value,arrmenu);
          }
        }
      });
    },

    converToMayuscula(cadena){
      cadena = cadena.toLowerCase();
      return cadena.charAt(0).toUpperCase() + cadena.slice(1); 
    },

    async closePopupFilter(){
      this.accessActive = false;
    },

    
  },
  mounted() {
    //this.createBreadcrumb();
  }
};
</script>
<style>
.breadcrumb-icon-home:hover {
  color: rgba(var(--vs-primary), 1) !important;
}
.breadcrumb-icon-home::before {
  content: none !important;
}
.route-hover:hover {
  color: rgba(var(--vs-primary), 1) !important;
}
.width_dialogx .vs-popup {
  width: 70%;
}
</style>
