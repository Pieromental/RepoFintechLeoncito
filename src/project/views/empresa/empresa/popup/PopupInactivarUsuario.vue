<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_razon( :title="$t('INACTIVAR REGISTRO DE USUARIO')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
        
        vx-card.card-sticky-floating.styleSticky 
          
          div.vx-row
            div.vx-col.w-full
              div.vx-row.mb-3
                div.vx-col.w-full
                  span.bold.font-label {{$t('Observaciones de Inactivación')}} 
                    span.font-label.bold.text-danger  *                    
                div.vx-col.w-full
                  vs-input.w-full(size="small" autocomplete="off" id ="observacion" ref="observacion" name="observacion"  v-model="observacion"  @focus="focus('observacion')"  v-mask="{ mask:funcionMascara(100,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}" @blur="validarObservacion();blur('observacion')" )
                  span.font-error.text-danger(v-if="mensajeObservacion") {{ $t(mensajeObservacion) }}

          footer-opciones( @aceptar="validarFormulario" :btnCancelar="true" @cancelar="cancelar")

</template>

<script>

import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';

export default {

  name: 'PopupInactivacionUsuario',
  mixins: [request],

  components: {
    FooterOpciones,
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    id:{
      type: Number,
      default: '',
    }
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    async validarFormulario(){
      try {  
        if(this.showErrors()) return
        this.$vs.loading({ type: "point" });
        let put={};
        put.id = this.id;
        put.ip= await require('public-ip').v4();
        put.razon_inactivacion = this.observacion;
        let {data} = await this.requestApi('inactivar_registro_usuario_empresa', put,"PUT");
        let response = data.data || []; 
        if(response.estado){
          this.responseRequest(response);
        }else{
          this.sweetAlert(response);
        }      
        this.cancelar();           
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    getDefaultData(){
      return {
        observacion: "",
        mensajeObservacion: "",
      }
    }, 

    cancelar(){
      this.limpiar();
      this.$emit('closePopup',false);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    validarObservacion(){
      if(this.observacion) this.mensajeObservacion = "";
      else  this.mensajeObservacion = "Las Observaciones de Inactivación es requerida.";   
    },

    showErrors() {
      if(this.observacion) this.mensajeObservacion = "";
      else  this.mensajeObservacion = "Las Observaciones de Inactivación es requerida.";      
      
      if( !this.mensajeObservacion){
        return false;        
      } 
      else return true;
    },

    blur(element) {
      if (this[element] == "") {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    },
  },
  
};
</script>

<style>
.width_razon .vs-popup {
  width: 65% !important;
}
.con-vs-popup.width_razon .vs-popup--content{
  height: auto !important;
}
.con-vs-popup.fullscreen.width_razon .vs-popup{
  height: auto !important;
}
.vx-card.card-sticky-floating.styleSticky .vx-card{
  top: auto !important;
}
.vx-card.card-sticky-floating.styleSticky {
  top: auto !important;
}

.font-label textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}
.font-label .vs-con-textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
</style>
