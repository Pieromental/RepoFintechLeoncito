<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_rechazar_subasta( :title="$t('RECHAZAR SUBASTA')" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
      
        div.vx-row
          div.vx-col.w-full.mx-auto.mb-3
            span.bold.font-label {{$t('Ingrese una razón de rechazo')}} 
              span.font-label.bold.text-danger  *                    
          div.vx-col.w-full.mx-auto
            vs-textarea.font-label.w-full( :id="`razon`" @focus="focusArea(`razon`)" rows="3" :name="`razon`"  :ref="`razon`" v-model="observacion" autocomplete="off" @blur="validarObservacion" :disabled="false")
            span.font-error.text-danger.mb-3(v-if="mensajeObservacion") {{ $t(mensajeObservacion) }}
            
        div.vx-row
          div.vx-col.w-full.vs-justify-flex-end
              vs-button.font-label.py-2.style-button-seccion.mr-1(color="danger" size="small" @click="cancelar(false)" type="filled")
                i.mr-1(class="feather icon-chevrons-left")
                span {{ ($t('Cancelar')) }}
              vs-button.font-label.py-2.style-button-seccion.ml-1(color="primary" size="small" @click="validarFormulario" type="filled")
                i.mr-1(class="feather icon-save")
                span {{ ($t('Aceptar')) }}
                
</template>

<script>
import swal from 'sweetalert2';
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
  watch:{
    popupAbrir(){
      if( this.popupAbrir ){
        this.id_subasta = this.parametro.id;
      }
    }
  },
  methods:{

    async validarFormulario(){      
      try {       
        if(this.showErrors()) return  
        let mensaje = this.$t('¿Está seguro que desea rechazar la subasta?');
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: mensaje,
          showCancelButton: true,
          confirmButtonText: this.$t('Si'),
          cancelButtonText: this.$t('No'),
        });
        if (status.value){ 
          this.$vs.loading({ type: "point" }); 
              
          let put={};
          put.id = this.id_subasta;
          put.razon_rechazo = this.observacion;
          put.ip = await require('public-ip').v4(); 
          
          let { data } = await this.requestApi('rechazar_revision_subasta', put,"PUT");
          let response = data.data || []; 
          if(response.estado){
            this.responseRequest(response);
            this.cancelar(true); 
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
        id_subasta : "",
        observacion: "",
        mensajeObservacion: "",
      }
    }, 

    cancelar(value=false){
      setTimeout( () => { 
        this.limpiar();
        this.$emit('closePopup',value); 
      } ,10);
      this.limpiar();
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
      
      if(this.mensajeObservacion) return true
      else return false;
    }

  },
  
};
</script>

<style >
.width_rechazar_subasta .vs-popup {
  width: 38rem !important;
}
@media only screen and (max-width: 750px) {
  .width_rechazar_subasta .vs-popup {
    width: 80% !important
  }
}
@media only screen and (min-width: 751px) {
  .width_rechazar_subasta .vs-popup {
    width: 38rem !important
  }
}
.con-vs-popup.width_rechazar_subasta .vs-popup--content{
  height: auto !important;
}
.con-vs-popup.fullscreen.width_rechazar_subasta .vs-popup{
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
