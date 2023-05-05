<template lang="pug">
  div
    vx-popup.width-popup-60(:title="$t('VER FACTURA [MODO VISTA]')" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
      
      vx-card.card-style-collapse(:title="$t('Datos del Deudor')" )
        div.vx-row.mt-3
          div.vx-col.w-full.mx-auto(class="md:w-4/5")
          
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Número de Factura: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="nroFactura" name="nroFactura" v-model="data.comprobante_detalle_nrocomprobante" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Monto Total:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="montoTotal" name="montoTotal" v-model="data.comprobante_detalle_montototal" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Monto Pendiente: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="montoPendiente" name="montoPendiente" v-model="data.comprobante_detalle_montopendiente" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Emisión:  ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="fechaEmision" name="fechaEmision" v-model="data.comprobante_detalle_fechaemision" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Fecha de Pago:  ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="fechaPago" name="fechaPago" v-model="data.comprobante_detalle_fechapagodeudor" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Días de Crédito: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="diaCredito" name="diaCredito" v-model="data.comprobante_detalle_diascredito" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Es Afecto a:") }}
              div.vx-col.w-full(class="sm:w-2/3")
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_afectoretencionflag" :disabled="true") {{$t("Retención")}}
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_afectodetraccionflag" :disabled="true") {{$t("Detracción")}}
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_afectopercepcionflag" :disabled="true") {{$t("Percepción")}}
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_ningunoflag" :disabled="true") {{$t("Ninguno")}}
                    
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Productos/Servicio Entregados: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                check-box( v-model="data.comprobante_detalle_entregadoflag" :disabled="true") {{$t("Si")}}
                
            div.vx-row.mb-5
              div.vx-col.w-full(class="sm:w-1/3")
                span.bold.font-label {{$t('Registrado como:')}}
              div.vx-col.w-full(class="sm:w-2/3")
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_esfacturafisicaflag" :disabled="true") {{$t("Factura Física")}}
                  div.vx-col(class="sm:w-1/2")
                    check-box( v-model="data.comprobante_detalle_esxlsxflag" :disabled="true") {{$t("XLSX")}}
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.bold.font-label {{$t('Archivo PDF de la Factura:')}}
              div.vx-col.w-full(class="sm:w-2/3")
                view-download( :src="estadoFactura" :titleDescargar="'Guardar'" @descargar="descargar(data.comprobante_detalle_id)" )

            div.vx-row.mb-5
              div.vx-col.w-full(class="sm:w-1/3")
                span.bold.font-label {{$t('Estado:')}}
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="estado" name="estado" v-model="data.comprobante_detalle_estado ? 'ACTIVO' : 'INACTIVO'" :disabled="true")
              
      div.vx-row.mb-3
        div.vx-col.w-full
          footer-datos( :items='footer')
            
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import FooterDatos from '@/components/footer/FooterData';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';

export default {

  name: 'PopupInactivacionUsuario',
  mixins: [request,files],

  components: {
    FooterOpciones,
    FooterDatos,
    CheckBox,
    TextsBox,
    ViewDownload
  },

  props: {
    popupAbrir: {
      type: Boolean,
      default: false
    },
    parametro:{
      type : Object,
      default: () => {}
    }
  },

  data() {
    return this.getDefaultData()
  },
  watch:{
    popupAbrir(){
      if( this.popupAbrir ){
        this.cargarFactura(this.parametro.id);
      }
    }
  },
  
  methods:{
    async cargarFactura(id){
       try {        
        if(!id) return
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`ver_comprobante_detalle?id=${id}`);
        let response = data.data;
        if (response.estado) {
          const [ informacion ] = response.data;
          this.data = informacion;
          this.estadoFactura = informacion.comprobante_detalle_rutadocumento ? await this.convertPath(informacion.comprobante_detalle_rutadocumento) : null;
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value: informacion.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value: informacion.footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value: informacion.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value: informacion.footer_ip_actualizacion }
          ];
        }else{
          this.data = {};
          this.footer = {};
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async descargar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`comprobante_detalle_archivo?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        data : {},
        footer : [],
        observacion: "",
        mensajeObservacion: "",
        estadoFactura:'',
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
  
};
</script>