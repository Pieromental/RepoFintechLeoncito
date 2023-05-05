<template lang="pug">
  div.vx-header-fixed.cabecera( :class="'content-area-full'" )
    div.d-f.vs-justify-flex-end( :style="'margin-top: 0.8rem'")
          
      //-div.ml-2
        div.padre
          img.mx-auto.img.imagen.hijo.mr-2(:src="require('@/assets/images/leo-fintech/Progrexa.png')")

      div( class="my-auto flex" v-if="logueado")
        div.label-usuario
          span.nombreUsuario( class="my-auto" style="color: #ffff;") {{ usuario }}
        div
          vs-dropdown(vs-trigger-click)
            vs-button.font-label.btn-drop(color="primary" type="filled" icon="expand_more")
            vs-dropdown-menu(style="width: 125px;")
              vs-dropdown-item.font-label( v-if="!cambioClave" @click="menuInicio")
                feather-icon.mr-2(icon="MenuIcon" svgClasses="w-4 h-4")
                span.cerrarsesion {{"Menú Inicio"}}
              vs-divider( v-if="!cambioClave" class="m-1")
              vs-dropdown-item.font-label(@click="logout")
                feather-icon.mr-2(icon="LogOutIcon" svgClasses="w-4 h-4")
                span.cerrarsesion {{"Cerrar Sesión"}}
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';

export default {

  name: 'HeaderAuxiliar',
  mixins: [request],
  
  data() {
    return {
      logueado: false,
      usuario: '',
      cambioClave: false,
    };
  },

  methods: {
    menuInicio(){
      this.$router.push('/inicio');
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
  },

  mounted() {
    this.cambioClave = localStorage.getItem('keyEarring') == "true" ? true : false;
    this.logueado = localStorage.getItem('token') && localStorage.getItem('userName') && localStorage.getItem('userLastName') ? true : false;
    if(this.logueado){
      let nombre = localStorage.getItem('userName');
      let apellido = localStorage.getItem('userLastName');
      this.usuario = `${nombre}, ${apellido}`;
    }else{
      localStorage.clear();
    }
  }

};
</script>

<style lang="scss">
.cabecera {
  background-color: #1441AF;
  height: 4.41rem;
}
.leo {
  height: 63px;
  font-size: 33px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;  
  line-height: 1.8;
  text-align: left;
  color: #FFFF;
}
.fintech {
  height: 63px;
  font-size: 33px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal; 
  line-height: 1.8;
  text-align: left;
  color: #a1bf23;
}
.cerrarsesion{
  line-height: 1.5;
}
.imagen{
  width: 50px;
}
.padre {
  display: table;
  height: auto;
  margin-left: 1rem;
}
.hijo {
  display: table-cell;
  vertical-align: middle;
  width: 10rem;
}
.label-usuario{
  align-self: center;
  text-align: end;
  min-width: 15rem;
  max-height: 4rem;
}
</style>