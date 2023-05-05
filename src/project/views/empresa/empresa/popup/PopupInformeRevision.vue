<template lang="pug">
    div
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('INFORME DE LA REVISION ACTUAL')" :active="popupRazonActive" @close="cancelarPopup" :click-not-close="false" classContent="popup-example" )
        vx-card.vxcard-floating
          div.vx-row.w-full(v-if='!esAprobadoFlag')
            vx-card.card-style-collapse(:title="$t('Datos del Usuario')" collapse-action)
              div.vx-row      
                div.vx-row.w-full
                  div.vx.row.m-2.p-1.w-full(style="background-color: #f5fcff; border-radius: 5px;")
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Nombre Comercial:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{nombreComercial}}
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Observaciones de Rechazo:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{observacionRechazoEmpresa}}
          div.vx-row.w-full(v-if='mostrarRepresentantes')
            vx-card.card-style-collapse(:title="$t('Datos de Representantes Legales')" collapse-action)
              div.vx-row(v-for = "items in listadoRepresentantes")          
                div.vx-row.w-full(v-if='!items.esAprobadoFlag')
                  div.vx.row.m-2.p-1.w-full(style="background-color: #f5fcff; border-radius: 5px;")
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Número de Documento:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.numero_documento}}                                    
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Nombres:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.nombre}} 
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Apellidos:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.apellidos}} 
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Observaciones de Rechazo:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.observacion_rechazo}}
          div.vx-row.w-full(v-if='mostrarCuentas')
            vx-card.card-style-collapse(:title="$t('Datos de Cuentas Bancarias')" collapse-action)
              div.vx-row(v-for = "items in listadoCuentas")          
                div.vx-row.w-full(v-if='!items.esAprobadoFlag')
                  div.vx.row.m-2.p-1.w-full(style="background-color: #f5fcff; border-radius: 5px;")
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Entidad Bancaria:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.entidad_bancaria}}                                    
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Número de Cuenta:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.numero_cuenta}} 
                    div.vx-row.mb-3
                      div.vx-col.w-full(class="sm:w-1/3")
                        span.font-label.bold {{ $t("Observaciones de Rechazo:") }} 
                      div.vx-col.w-full(class="sm:w-2/3")
                        span.font-label.bold {{items.observacion_rechazo}}
          div.vx-row.vs-justify-space-between(v-if='caso==1')
            vx-button.ml-3(@click="btnAtras") {{$t('ATRAS')}}
            vx-button.mr-3(@click="btnConfirmar") {{$t('CONFIRMAR')}}    
          div.vx-row.vs-justify-flex-end(v-if='caso==2')
            vx-button.mr-3(@click="btnEnviar") {{$t('ENVIAR')}}    
</template>

<script>

import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import VxButton from '@/components/buttons/Button.vue';

export default {

  name: 'PopupInformeRevision',
  mixins: [request],

  components: {
    funciones,
    VxButton
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    id:{
      type: Number,
      default: 0,
    },
    listarRepresentantes:{
      type: Array,
      default: () => []
    },
    listarCuentas:{
      type: Array,
      default: () => []
    },
    observacionRechazoEmpresa:{
      type: String,
      default: ''
    },
    nombreComercial:{
      type: String,
      default: ''
    },
    riesgo:{
      type: Object,
      default: () => {}
    },
    esAprobadoFlag: {
      type: Boolean,
      default: false
    },
    caso:{
      type: Number,
      default: 0,
    },
    mostrarRepresentantes:{
      type: Boolean,
      default: false
    },
    mostrarCuentas:{
      type: Boolean,
      default: false
    },
    flagUsuario: {
      type: Boolean,
      default: false
    },
    garantia:{
      type: String,
      default: '',
    },
    teaSoles:{
      type: String,
      default: '',
    },
    teaDolares:{
      type: String,
      default: '',
    },
  },

  data() {
    return this.getDefaultData()
  },

  computed: {
    listadoRepresentantes: {
      // getter
      get: function () {
        return this.listarRepresentantes;
      },
      // setter
      set: function (newValue) {
        this.listarRepresentantes = newValue;
      }
    },
    listadoCuentas: {
      // getter
      get: function () {
        return this.listarCuentas;
      },
      // setter
      set: function (newValue) {
        this.listarCuentas = newValue;
      }
    },
  },
  
  methods:{

    convertirListados(){
      this.listaRepresentantes = this.listarRepresentantes.map((e)=>{
        return{
          id_representante_legal: e.id_presentante_legal,
          observaciones_representante_legal: e.observacion_rechazo,
          representante_legal_flag: e.esAprobadoFlag
        }
      });
      this.listaCuentas = this.listarCuentas.map((e)=>{
        return{
          id_cuenta_bancaria: e.id_cuenta,
          observaciones_cuenta_bancaria: e.observacion_rechazo,
          cuenta_bancaria_flag: e.esAprobadoFlag
        }
      });
    },

    async btnConfirmar(){
      this.$vs.loading({ type: "point" });
      try {
        this.convertirListados();
        let put = {
          id : this.id,
          id_riesgo : this.riesgo.id,
          representante_legal : this.listaRepresentantes,
          cuenta_bancaria : this.listaCuentas,
          garantia: parseFloat(this.garantia),
          tea_soles: parseFloat(this.teaSoles),
          tea_dolares: parseFloat(this.teaDolares),
        }
        let { data } = await this.requestApi("actualizar_continuar_activacion", put, "PUT");
        if(data.data.estado){
          this.responseRequest(data.data);
          this.cancelar();
          setTimeout(() => { this.$router.push(`/empresa-empresa-revisar`); }, 100);
        }else{
          this.sweetAlert(data.data);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },
    
    async btnEnviar(){
      try {
        this.$vs.loading({ type: "point" });
        this.convertirListados();
        let put = {
          id : this.id,
          observaciones_revision : this.observacionRechazoEmpresa,
          representante_legal : this.listaRepresentantes,
          cuenta_bancaria : this.listaCuentas,
          aprobar_usuario: this.flagUsuario
        }
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_empresa_rechazada", put, "PUT");
        if(data.data.estado){
          this.cancelarPopup();
          this.responseRequest(data.data);
          setTimeout(() => { this.$router.push(`/empresa-empresa-revisar`); }, 100);
        }else{
          this.sweetAlert(data.data);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    btnAtras(){
      this.$emit('closeInforme');
    },

    getDefaultData(){
      return {
        listaRepresentantes:[],
        listaCuentas:[]
      }
    },

    cancelar(){
      this.limpiar();
      this.$emit('cancelar',false);
    },

    cancelarPopup(){
      this.limpiar();
      this.$emit('closeInforme',false);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },
  
};
</script>