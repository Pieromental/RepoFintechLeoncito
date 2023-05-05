<template lang="pug">
    div      
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('COMPLETAR PAGO AL INVERSOR')" :active="popupConfirmarPagoActive" @close="cancelar" :click-not-close="false" classContent="popup-example" )
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Monto: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.mostrarMonto" :disabled="true")
        div.vx-row.mb-3
          div.vx-col.w-full.text-center
            vs-divider.mb-2.mt-0
            span.title-header.uppercase.bold {{ $t('Cuenta Bancaria(Origen)') }}
            vs-divider.mt-2
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Entidad Bancaria: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.entidad_bancaria_origen" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Tipo de Cuenta: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.tipo_cuenta_origen" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Moneda: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.moneda_descripcion_origen" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Número de Cuenta: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.numero_cuenta_origen" :disabled="true") 
        div.vx-row.mb-3
          div.vx-col.w-full.text-center
            vs-divider.mb-2.mt-0
            span.title-header.uppercase.bold {{ $t('Cuenta PROGREXA(Destino)') }}
            vs-divider.mt-2
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Número de Cuenta: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.numero_cuenta_destino" :disabled="true")
            span.font-error.text-danger(v-if="dataPago.mensaje_cuenta_destino_inactiva") {{ $t(dataPago.mensaje_cuenta_destino_inactiva) }}
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Moneda: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.mostrarMoneda" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Estado: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.estado" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Inversionista: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataPago.inversionista" :disabled="true")
        div.vx-row.vs-justify-center(v-if='verBotones')
          vx-button.mr-3(@click="confirmar(dataPago.inversion_id)") {{$t('SI')}}
          vx-button(@click="btnNo()") {{$t('NO')}}
        div.vx-row.vs-justify-flex-end.mr-5(v-if='verBotonSiguiente')
          vx-button(@click="siguiente()") {{$t('Siguiente')}}
</template>

<script>

import request from '@/mixins/mixinRequest'
import funciones from '@/functions';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import VxButton from '@/components/buttons/Button.vue';

export default {

  name: 'PopupConfirmarPago',
  mixins: [request],

  components: {
    funciones,
    VxButton,
    TextsBox
  },

  props: {
    popupConfirmarPagoActive: {
      type: Boolean,
      default: false
    },
    dataPago: {
      type: Object,
      default: () => {}
    },
    listaPagos:{
      type: Array,
      default: () => []
    },
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    siguiente(){
      if (this.listaPagos.length > 0) {
        this.verBotones = true;
        this.verBotonSiguiente = false;
        this.$emit('btnSiguiente', this.listaPagos);
      }else{
        this.$emit('closePopup',false);
      }
    },

    async confirmar(idInversion){
      this.$vs.loading({ type: "point" });
      try {
        let put = {}
        put.id = idInversion;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_saldo_cuenta_fintech_bo", put, "PUT");
        if(data.data.estado){
          this.responseRequest(data.data); 
          this.listaPagos.shift();
          if (this.listaPagos.length == 0) {            
            this.cancelar();
          }else{
            this.verBotones = false;
            this.verBotonSiguiente = true;
          }         
        }else{
          this.sweetAlert(data.data);
        } 
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    getDefaultData(){
      return {
        verBotones: true,
        verBotonSiguiente: false,
      }
    },    

    btnNo(){
      this.listaPagos.shift();
      if (this.listaPagos.length == 0) {            
        this.cancelar();
      }else{
        this.verBotones = false;
        this.verBotonSiguiente = true;
      } 
    },

    cancelar(){
      this.limpiar();
      this.$emit('closePopup',false);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },

}
</script>
