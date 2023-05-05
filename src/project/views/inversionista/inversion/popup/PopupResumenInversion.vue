<template lang="pug">
    div      
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('RESUMEN DE LA INVERSIÓN')" :active="PopupResumenInversionActive" @close="closePopup" :click-not-close="false" classContent="popup-example" )
        div.vx-row.mb-3
          div.vx-col.w-full.text-center
            span.title-header.uppercase.bold {{ $t('Inversionista') }}
            vs-divider.mt-2
        div.vx-row.w-full.mb-3
          div.vx-col(class="sm:w-1/3")
            span.font-label.bold {{ $t("Nombres: ") }} 
          div.vx-col(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.inversionista_nombres" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Apellidos: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.inversionista_apellidos" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Tipo de Documento: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.descripcion_tipo_documento" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Número de Documento: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.numero_documento" :disabled="true")   
        vs-divider.my-5
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Monto: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="montoInversion" :disabled="true")    
        div.vx-row.w-full.mb-3(v-if="esSubasta")
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEA Mínima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.tea_minima" :disabled="true")     
        div.vx-row.w-full.mb-3(v-if="esVelocidad")
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEA Máxima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataResumen.tea_maxima" :disabled="true")      
        div.vx-row.w-full.mb-3           
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ganancia Final: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="gananciaFinal" :disabled="true")    
        vs-divider.my-5
        div.vx-row.vs-justify-center
          div.vx-col.w-full(class="sm:w-3/4")
            span.font-label.bold {{ $t("¿Está seguro de que desea hacer ganadora a esta inversión?") }}      
          div.vx-col.w-full.vs-justify-center(class="sm:w-1/4")
            vx-button.mr-3(@click="confirmar(dataResumen.ganancia_final, dataResumen.monto_inversion)") {{$t('SÍ')}}
            vx-button(@click="closePopup()") {{$t('NO')}}        
</template>

<script>

import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import VxButton from '@/components/buttons/Button.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';

export default {

  name: 'PopupResumenInversion',
  mixins: [request],

  components: {
    funciones,
    VxButton,
    TextsBox
  },

  props: {
    PopupResumenInversionActive: {
      type: Boolean,
      default: false
    },
    esSubasta: {
      type: Boolean,
      default: false
    },
    esVelocidad: {
      type: Boolean,
      default: false
    },
    dataResumen: {
      type: Object,
      default: () => {}
    },
    montoInversion:{
      type: String,
      default:''
    },
    gananciaFinal:{
      type: String,
      default:''
    },
    idInversion: {
      type: Number,
      default: 0
    },
    idSubasta: {
      type: Number,
      default: 0
    },
    listaInversiones:{
      type: Array,
      default: () => []
    },
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    async funcionVerAvance(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`verificar_avance_financiamiento?id_subasta=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async confirmar(gananciaFinal, montoInversion){
      this.$vs.loading({ type: "point" });
      try {
        let response = await this.funcionVerAvance(this.idSubasta);
        if (response.estado) {
          if (response.avance_financiacion != "100%") {
            let put = {          
              id: this.idInversion,
              ganancia_final: gananciaFinal,
              monto_inversion: montoInversion,
            }
            put.ip = await require('public-ip').v4();
            let { data } = await this.requestApi("actualizar_revisar_inversion_bo", put, "PUT");
            if(data.data.estado){
              this.responseRequest(data.data);          
              if (this.listaInversiones.length == 0) {
                this.cancelar();
              }else{            
                this.$emit('recibirLista', true);
              }                 
            }else{
              this.sweetAlert(data.data);
            }   
          }else{
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: response.mensaje,
              confirmButtonText: this.$t('Aceptar'),
            });
            if (status.value) this.$emit('eliminarInversiones', true);
          }       
        }else{
          this.sweetAlert(response);          
          this.cancelar();
        }        
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        titulo:'',   
      }
    },

    cancelar(){
      this.limpiar();
      this.$emit('cancelar',false);
    },

    closePopup(){
      this.limpiar();
      this.$emit('closePopup',false);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },

}
</script>