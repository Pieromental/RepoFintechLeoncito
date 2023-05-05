<template lang="pug">
  div

    popup-rechazar-subasta(:popupAbrir="mostrarRechazoSubasta" @closePopup="closePopup" :parametro.async="parametro")
    popup-rechazar-pago-prestamo(:popupAbrir="mostrarRechazoPagoPrestamo" @closePopup="closePopup" :parametro.async="parametro")

    vx-card.vxcard-floating

      div.vx-row.mb-2

        div.vx-col.w-full
          span.title-header.uppercase.bold {{ $t(titulo) }}
          vs-divider.mt-2

      div.vx-row.mb-5.mx-auto(class="sm:w-5/6")

        div.vx-col.w-full.mb-3(class="sm:w-1/3")
          span.font-label.bold {{ $t("Código de Riesgo:") }} 
          span.font-label.ml-3 {{ $t(dataDatosGeneral.riesgo_codigo) }}

        div.vx-col.w-full.mb-3(class="sm:w-1/3")
          span.font-label.bold {{ $t("Descripción de Riesgo:") }} 
          span.font-label.ml-3 {{ $t(dataDatosGeneral.riesgo_descripcion) }}
          
        div.vx-col.w-full.mb-3(class="sm:w-1/3" style="text-align: center")
          vx-button.button-personalized(  @click="accionVer") {{$t('Ver Empresa')}}
          
      vx-card.card-style-collapse(:title="$t('Datos de la Subasta')" collapse-action)
      
        div.vx-row
          div.vx-col.w-full.mx-auto(class="sm:w-4/5")
            
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Código:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="codigo" name="codigo"  v-model="dataDatosGeneral.subasta_codigo" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full
                span.font-label.bold {{ $t("Deudor:") }}
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("RUC:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="deudor_ruc" name="deudor_ruc"  v-model="dataDatosGeneral.deudor_ruc" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Razón Social:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="deudor_razon_social" name="deudor_razon_social"  v-model="dataDatosGeneral.deudor_razonsocial" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Nombre Comercial:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="deudor_nombrecomercial" name="deudor_nombrecomercial"  v-model="dataDatosGeneral.deudor_nombrecomercial" :disabled="true")
                  
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Industria:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="deudor_industria_descripcion" name="deudor_industria_descripcion"  v-model="dataDatosGeneral.deudor_industria_descripcion" :disabled="true")
          
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Modelo: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="esModelo" name="esModelo"  v-model="esModelo" :disabled="true")
                  
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Moneda:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="esMoneda" name="esMoneda"  v-model="esMoneda" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Monto Total:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                groups-box
                  template(slot="prepend")
                    div(class="prepend-text" :title="`${$t('Moneda de la Subasta')}`")
                      span.font-label {{codigoMoneda}}
                  texts-box( ref="subasta_montototal" name="subasta_montototal" v-model="dataDatosGeneral.subasta_montototal" :disabled="true")
                  
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Monto Préstamo:") }}
              div.vx-col.w-full(class="sm:w-2/3")
                groups-box
                  template(slot="prepend")
                    div(class="prepend-text" :title="`${$t('Moneda de la Subasta')}`")
                      span.font-label {{codigoMoneda}}
                  texts-box( ref="subasta_montoarecibir" name="subasta_montoarecibir" v-model="dataDatosGeneral.subasta_montoarecibir" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Costo Total: ") }}
              div.vx-col.w-full(class="sm:w-2/3")
                groups-box
                  template(slot="prepend")
                    div(class="prepend-text" :title="`${$t('Moneda de la Subasta')}`")
                      span.font-label {{codigoMoneda}}
                  texts-box( ref="subasta_costototal" name="subasta_costototal" v-model="dataDatosGeneral.subasta_costototal" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Días Crédito:") }} 
                  span.font-label.bold.text-danger(v-if="$route.name=='empresa-subasta-revisar'")   *   
              div.vx-col.w-full(class="sm:w-2/3")
                groups-box
                  template(slot="append")
                    div(class="append-text")
                      span.font-label {{$t('días')}}
                  texts-box( ref="subasta_diacredito" name="subasta_diacredito" v-model="diasCredito" @input="validarDiasCredito" :disabled="$route.name!='empresa-subasta-revisar'")
                span.font-error.text-danger(v-if="mensajeDiasCredito") {{ $t(mensajeDiasCredito) }}
                //- texts-box( ref="subasta_diacredito" name="subasta_diacredito"  v-model="dataDatosGeneral.subasta_diacredito" )
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("TEA:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="subasta_teaactual" name="subasta_teaactual" v-model="TEA" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("TEM:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="subasta_tasarendimiento" name="subasta_tasarendimiento"  v-model="TEM" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("TED:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="subasta_ted" name="subasta_ted"  v-model="TED" :disabled="true")
                
            div.vx-row.mb-3( v-if="$route.name == 'empresa-subasta-avance'" )
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Cierre: ") }}
                  span.font-label.bold.text-danger(v-if="activarFechaCierre") * 
              div.vx-col.w-full(class="sm:w-2/3")
                datepicker.w-full.font-label.datapicker_input( class="sm:w-full" ref="fechaCierre" name="fechaCierre" :language="languages['es']" v-model="fechaCierre" format="dd/MM/yyyy" :disabledDates="disabledFechasCierre" @closed="closedDatapicker" placeholder="" :disabled="!activarFechaCierre" )
                div(v-if="activarFechaCierre")
                  vx-button.button-personalized.mr-2.mt-3(@click="abrirFechaCierre") {{$t('Cambiar')}}
                
            div.vx-row.mb-3( v-else )
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Cierre: ") }}
                  span.font-label.bold.text-danger(v-if="$route.name=='empresa-subasta-revisar'")  *   
              div.vx-col.w-full(class="sm:w-2/3")
                datepicker.w-full.font-label.datapicker_input( class="sm:w-full" ref="fechaCierre" name="fechaCierre" :language="languages['es']" v-model="fechaCierre" format="dd/MM/yyyy" :disabledDates="disabledFechasCierre" placeholder="" :disabled="$route.name!='empresa-subasta-revisar'" )
                span.font-error.text-danger(v-if="mensajeFechaCierre") {{ $t(mensajeFechaCierre) }}
                  
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Pago Pactada:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="subasta_fechapago" name="subasta_fechapago"  v-model="fechaPagoPactada" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Pago a Inversionistas Pactada: ") }}
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="subasta_fechapagoainversionistapactada" name="subasta_fechapagoainversionistapactada" v-model="fechaPagoPactada" :disabled="true" )

          div.vx-col.w-full.mx-auto(class="sm:w-4/5")

            div.vx-row.mb-3
              div.vx-col.w-full
                span.font-label.bold {{ $t("Cuenta Bancaria para Entrega del Préstamo:") }}
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Entidad Bancaria:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="cuenta_bancaria_entrega_descripcion_entidad" name="cuenta_bancaria_entrega_descripcion_entidad"  v-model="dataDatosGeneral.cuenta_bancaria_entrega_descripcion_entidad" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Tipo de Cuenta:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="cuenta_bancario_entrega_descripcion_tipo_cuenta" name="cuenta_bancario_entrega_descripcion_tipo_cuenta"  v-model="dataDatosGeneral.cuenta_bancario_entrega_descripcion_tipo_cuenta" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Moneda:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="cuenta_bancario_entrega_descripcion_moneda" name="cuenta_bancario_entrega_descripcion_moneda"  v-model="dataDatosGeneral.cuenta_bancario_entrega_descripcion_moneda" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.ml-3.pl-5 {{ $t("Número de Cuenta:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="cuenta_bancario_entrega_numerocuenta" name="cuenta_bancario_entrega_numerocuenta"  v-model="dataDatosGeneral.cuenta_bancario_entrega_numerocuenta" :disabled="true")                
                      
            template(v-if="$route.name == 'empresa-subasta-ver'")
            
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Préstamo Entregado ") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  check-box( ref="subasta_prestamoentregadoflag" name="subasta_prestamoentregadoflag"  v-model="dataDatosGeneral.subasta_prestamoentregadoflag" :disabled="true") {{$t("Activo")}} 
                  
              //- div.vx-row.mb-3
              //-   div.vx-col.w-full(class="sm:w-1/3")
              //-     span.font-label.bold {{ $t("Fecha de Entrega de Préstamo:") }} 
              //-   div.vx-col.w-full(class="sm:w-2/3")
              //-     texts-box( ref="subasta_fechaentregaprestamo_formateada" name="subasta_fechaentregaprestamo_formateada" v-model="dataDatosGeneral.subasta_fechaentregaprestamo_formateada" :disabled="true")
                  
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Fecha de Publicación:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="subasta_fechapublicacion_formateada" name="subasta_fechapublicacion_formateada" v-model="dataDatosGeneral.subasta_fechapublicacion_formateada" :disabled="true")
              
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Fecha de Fin de Financiamiento:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="subasta_fechafinanciamientofin_formateada" name="subasta_fechafinanciamientofin_formateada" v-model="dataDatosGeneral.subasta_fechafinanciamientofin_formateada" :disabled="true")

              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Préstamo Pagado:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  check-box( ref="subasta_prestamopagadoflag" name="subasta_prestamopagadoflag" v-model="dataDatosGeneral.subasta_prestamopagadoflag" :disabled="true") {{$t("Activo")}}
                  
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Confirmación de Pago de Préstamo:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  check-box( ref="subasta_confirmacionprestamopagadoflag" name="subasta_confirmacionprestamopagadoflag"  v-model="dataDatosGeneral.subasta_confirmacionprestamopagadoflag" :disabled="true") {{$t("Activo")}}
                  
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Fecha de Pago del Préstamo:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="subasta_fechapagoprestamo" name="subasta_fechapagoprestamo" v-model="dataDatosGeneral.subasta_fechapagoprestamo_formateada" :disabled="true")
                    
              div.vx-row.mb-3
                div.vx-col.w-full
                  span.font-label.bold {{ $t("Cuenta Bancaria de Pago del Préstamo:") }}
                  
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.ml-3.pl-5 {{ $t("Entidad Bancaria:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="cuenta_bancario_pago_descripcion_entidad" name="cuenta_bancario_pago_descripcion_entidad"  v-model="dataDatosGeneral.cuenta_bancario_pago_descripcion_entidad" :disabled="true")
              
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.ml-3.pl-5 {{ $t("Tipo de Cuenta:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="cuenta_bancario_pago_descripcion_tipo_cuenta" name="cuenta_bancario_pago_descripcion_tipo_cuenta"  v-model="dataDatosGeneral.cuenta_bancario_pago_descripcion_tipo_cuenta" :disabled="true")

              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.ml-3.pl-5 {{ $t("Moneda:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="cuenta_bancario_pago_descripcion_moneda" name="cuenta_bancario_pago_descripcion_moneda"  v-model="dataDatosGeneral.cuenta_bancario_pago_descripcion_moneda" :disabled="true")
              
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.ml-3.pl-5 {{ $t("Número de Cuenta:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="cuenta_bancario_pago_numerocuenta" name="cuenta_bancario_pago_numerocuenta"  v-model="dataDatosGeneral.cuenta_bancario_pago_numerocuenta" :disabled="true")

              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.ml-3.pl-5 {{ $t("Razón de Rechazo:") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box( ref="subasta_rechazo" name="subasta_rechazo" v-model="dataDatosGeneral.subasta_rechazo" :disabled="true")

            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Estado:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="estado_subasta_descripcion" name="estado_subasta_descripcion"  v-model="dataDatosGeneral.estado_subasta_descripcion" :disabled="true")
                      
      vx-card.card-style-collapse(:title="$t('Datos del Deudor')" collapse-action)
      
        div.vx-row
          div.vx-col.w-full.mx-auto(class="sm:w-4/5")
            
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Nombre Proveedor:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="nombre_proveedor" name="nombre_proveedor"  v-model="dataDatosGeneral.subasta_nombreproveedor" :disabled="true")

            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("RUC Proveedor:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="ruc_proveedor" name="ruc_proveedor"  v-model="dataDatosGeneral.subasta_rucproveedor" :disabled="true")

      footer-data( :items.async='footer' )
      
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import files from '@/mixins/mixinFiles';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import PopupRechazo from "@/project/views/empresa/empresa/popup/PopupRechazar.vue";
import VxButton from '@/components/buttons/Button.vue';
import FooterData from '@/components/footer/FooterData.vue';
import Datepicker from "vuejs-datepicker";
import * as lang from 'vuejs-datepicker/src/locale';
import helperFunctions from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import PopupRechazarSubasta from '@/project/views/empresa/subasta/popup/PopupRechazarSubasta.vue';
import PopupRechazarPagoPrestamo from '@/project/views/empresa/subasta/popup/PopupRechazarPagoPrestamo.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import GroupsBox from '@/components/fields/input/GroupsBox.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';

export default {

  name: 'TabDatosGenerales',
  mixins: [request,files],
  
  components: {
    TextsBox,
    ViewDownload,
    PopupRechazo,
    VxButton,
    FooterData,
    Datepicker,
    FooterOpciones,
    PopupRechazarSubasta,
    PopupRechazarPagoPrestamo,
    CheckBox,
    GroupsBox,
    Binnacle
  },

  props: {
    dataDatosGeneral: {
      type: Object,
      default: () => {}
    },
    footer:{
      type: Array,
      default: () => []
    }
  },

  data() {
    return{
      mostrarRechazoSubasta : false,
      mostrarRechazoPagoPrestamo: false,
      parametro : {},

      diasCredito: '',
      mensajeDiasCredito: '',
      fechaPagoPactada: null,
      tmpFechaCierre: '',
      fechaCierre : '',
      mensajeFechaCierre: '',
      disabledFechasCierre: {
        to: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()) 
      },
      
      languages: lang,
    }
  },

  computed:{
    titulo(){
      return `${this.dataDatosGeneral.empresa_ruc && this.dataDatosGeneral.empresa_razonsocial ? this.dataDatosGeneral.empresa_ruc+' - '+this.dataDatosGeneral.empresa_razonsocial :''}`
    },
    esModelo(){
      const texto =
        this.dataDatosGeneral.subasta_esvelocidad && !this.dataDatosGeneral.subasta_essubasta ? "Velocidad" : 
        !this.dataDatosGeneral.subasta_esvelocidad && this.dataDatosGeneral.subasta_essubasta ? "Subasta" : "-";
      
      return texto;
    },
    esMoneda(){
      const texto = `[${this.dataDatosGeneral.subasta_moneda_codigo}] ${this.dataDatosGeneral.subasta_moneda_descripcion}`
      return texto;
    },
    codigoMoneda(){
      return this.dataDatosGeneral.subasta_moneda_codigo ? this.dataDatosGeneral.subasta_moneda_codigo:''
    },
    TEA(){
      return `${this.dataDatosGeneral.subasta_teaactual} %`
    },
    TEM(){
      return `${this.dataDatosGeneral.subasta_tasarendimiento} %`
    },
    TED(){
      return `${this.dataDatosGeneral.subasta_ted} %`
    },
    activarFechaCierre(){
      return this.dataDatosGeneral.estado_subasta_codigo ? this.dataDatosGeneral.estado_subasta_codigo == 'SUB':false
    }
  },
  
  watch:{
    fechaCierre(val){
      this.sumarDias();
      if(val) {
        this.mensajeFechaCierre = '';
      }
    },
    diasCredito(val){
      this.sumarDias();
    },
  },
  
  methods: {
    
    sumarDias(){
      if(this.fechaCierre && this.diasCredito){
        const fechaDestino = new Date(); 
        fechaDestino.setDate( this.fechaCierre.getDate() + Number(this.diasCredito) );
        this.fechaPagoPactada = helperFunctions.convertirFecha(new Date(fechaDestino));
      }else{
        this.fechaPagoPactada = null;
      }
    },

    obtenertituloConfirming(){
      let dias_credito_antes = this.dataDatosGeneral.subasta_diacredito;
      let dias_credito_despues = this.diasCredito;
      let fecha_cierre_antes =  helperFunctions.convertirFecha(new Date(this.dataDatosGeneral.subasta_fechacierre));
      let fecha_cierre_despues =  helperFunctions.convertirFecha(this.fechaCierre);
      if( dias_credito_antes == dias_credito_despues && fecha_cierre_antes == fecha_cierre_despues )  return 'Resumen de la Operación'
      else return 'Recálculo de la Pre-Liquidación'
    },

    validarDiasCredito(){
      if(this.diasCredito){
        const regex = /[0-9]/;
        let newValue = '';
        let result = false;
        for (let e = 0; e < this.diasCredito.length; e++) {
          let tmpval = this.diasCredito.substring(e, e + 1);
          result = regex.test(tmpval);
          if(result) newValue = newValue + tmpval;
        }
        if(newValue){
          this.diasCredito = newValue;
          this.mensajeDiasCredito = '';
        }else{
          this.diasCredito = '';
          this.mensajeDiasCredito = 'Los Días de Crédito.';
        }
      }else{
        this.mensajeDiasCredito = 'Los Días de Crédito.';
      }
    },

    accionVer(){
      if(this.dataDatosGeneral.empresa_id){
        this.$router.push(`/empresa-empresa-ver-registro/${this.dataDatosGeneral.empresa_id}`);
      }
    },

    convertirFechaDia(date) {
      if(date){
        let fecha = helperFunctions.convertirFechaLocal( date, '-').split(',')
        return fecha[0];
      }else{
        return ''
      }
    },
    
    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },
    
    abrirFechaCierre(){
      this.tmpFechaCierre = this.fechaCierre;
      setTimeout(() => { this.$refs.fechaCierre.showCalendar() }, 10);
    },

    async closedDatapicker(){
      if(this.tmpFechaCierre != this.fechaCierre){
        let status = await swal.fire({ title: this.$t("Mensaje de Sistema"), text: '¿Estás seguro de que deseas actualizar los cambios?', showCancelButton: true, confirmButtonText: this.$t("Sí"), cancelButtonText: this.$t("No") });
        if(status.value) {
          let response =  await this.actualizarFecha();
          if(response.data.estado){
            this.responseRequest(response.data);
            this.tmpFechaCierre = this.fechaCierre;
          }else{
            this.sweetAlert(response.data);
            this.fechaCierre = this.tmpFechaCierre;
          }
        }else{
          this.fechaCierre = this.tmpFechaCierre;
        }
      }
    },
    
    async actualizarFecha(){
      try{ 
        this.$vs.loading({ type: 'point' });
        let put = {}
        put.id = this.$route.params.codigo;
        put.fecha_cierre = this.fechaCierre ? helperFunctions.convertirFecha(this.fechaCierre):'';
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_cierre_avance", put, "PUT");
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    rechazar(){
      this.parametro = {
        id : this.$route.params.codigo
      }
      this.mostrarRechazoSubasta = true;
    },

    rechazarPagoPrestamo(){
      this.parametro = {
        id : this.$route.params.codigo
      }
      this.mostrarRechazoPagoPrestamo = true;
    },

    showErrors() {
      let statusRequerido = true;
      if(!this.diasCredito){
        this.mensajeDiasCredito = 'Los Días de Crédito.';
        statusRequerido = false;
      }
      if(!this.fechaCierre){
        this.mensajeFechaCierre = 'La Fecha Cierre es requerida.';
        statusRequerido = false;
      }
      if(!statusRequerido ){
        this.notification(this.$t('Advertencia'), this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'), 'warning',5000,'icon-alert-circle');
        return true;
      } else {
        return false;
      }
    },
    
    async confirmar(){
      try{
        const { value } = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: '¿Está seguro que desea aprobar la subasta para su publicación?',
          showCancelButton: true,
          confirmButtonText: this.$t('Si'),
          cancelButtonText: this.$t('No'),
        });
        if (value) {
          this.$vs.loading({ type: 'point' });
          let put = {}
          put.id = this.$route.params.codigo;
          put.fecha_cierre = this.fechaCierre ? helperFunctions.convertirFecha(this.fechaCierre):'';
          put.ip = await require('public-ip').v4();
          let { data } = await this.requestApi("aprobar_revision_subasta", put, "PUT");
          if(data.data.estado){
            this.responseRequest(data.data); 
            setTimeout( () => {this.$router.push(`/empresa-subasta`)},500)                
          }else{
            this.sweetAlert(data.data);
          } 
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    closePopup(value) {      
      this.mostrarRechazoSubasta = false;
      this.mostrarRechazoPagoPrestamo = false;
      if(value){
        setTimeout( () => {this.$router.push(`/empresa-subasta`)},500)
      }
    }
        
  }

}
</script>

<style>
.datapicker_input input {
  width: 100%;
}
</style>