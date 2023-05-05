<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_razon( :title="$t('RECHAZAR PAGO PRESTAMO SUBASTA')" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )        
        vx-card.card-sticky-floating.styleSticky
          div.vx-row
            div.vx-col.w-full
              div.vx-row.mb-3
                div.vx-col.w-full
                  span.bold.font-label {{$t('Ingrese la razón de rechazo del pago (solo se usará para el envío del correo electrónico a la empresa):')}} 
                    span.font-label.bold.text-danger  *
                div.vx-col.w-full
                  vs-input.w-full(size="small" autocomplete="off" id ="observacion" ref="observacion" name="observacion"  v-model="observacion"  @focus="focus('observacion')"  v-mask="{ mask:funcionMascara(100,'D'), tokens:{ 'D': {pattern: /[A-Za-z0-9 ]/}}}" @blur="validarObservacion();blur('observacion')" )
                  span.font-error.text-danger(v-if="mensajeObservacion") {{ $t(mensajeObservacion) }}
          footer-opciones( @aceptar="validarFormulario" :btnCancelar="true" @cancelar="cancelar")

</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';

export default {
  name: 'PopupRechazarPagoPrestamo',
  mixins: [request],

  components: {
    FooterOpciones,
  },

  props: {
    popupAbrir: {
      type: Boolean,
      default: false
    },
    parametro: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return this.getDefaultData()
  },
  methods:{
    
    async validarFormulario(){      
      try {       
        if(this.showErrors()) return  
        let mensaje = this.$t('¿Está seguro que desea rechazar la operación?');
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: mensaje,
          showCancelButton: true,
          confirmButtonText: this.$t('Aceptar'),
          cancelButtonText: this.$t('Cancelar'),
        });
        if (status.value){ 
          this.$vs.loading({ type: "point" });               
          let put={};
          put.id = this.$route.params.codigo;
          put.razon_rechazo = this.observacion;
          put.ip = await require('public-ip').v4();           
          let { data } = await this.requestApi('validar_rechazo_pago_prestamo', put,"PUT");
          let response = data.data || []; 
          if(response.estado){
            this.responseRequest(response);
            this.cancelar();
            setTimeout( () => { this.$router.push(`/empresa-subasta`) },500);
          }else{
            this.sweetAlert(response);
          }
        }                 
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    getDefaultData(){
      return {
        id : "",
        observacion: "",
        mensajeObservacion: "",
      }
    }, 

    cancelar(){
      setTimeout( () => { 
        this.limpiar();
        this.$emit('closePopup',false); 
      } ,10);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    validarObservacion(){
      if(this.observacion) this.mensajeObservacion = "";
      else  this.mensajeObservacion = "La indicacion de Observacion es requerida.";   
    },

    showErrors() {
      if(this.observacion) this.mensajeObservacion = "";
      else  this.mensajeObservacion = "La indicacion de Observacion es requerida.";      
      
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
