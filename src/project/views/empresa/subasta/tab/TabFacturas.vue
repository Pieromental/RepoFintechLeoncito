<template lang="pug">
  div    
    vx-card.vxcard-floating
      div.vx-row.demo-alignment

        div.vx-col
          vs-button.mx-2.my-1.full( @click="exportar" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar") }}
          vs-button.mx-2.my-1.full( @click="exportarDocumentos" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar Documentos") }}
          
        vx-table.style-vxtable(idRef="listarFacturas" ref="listarFacturas" pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="dataFacturas" :no-data-text="$t('No se encontraron registros')")
          template(slot='thead')
            vx-th.uppercase(center, colspan="1", rowspan="2",min-width='100') {{ $t("Acciones") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_nrocomprobante', min-width='130') {{ $t("Número de Comprobante") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_montototal', min-width='130') {{ $t("Monto Total") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_montopendiente', min-width='130') {{ $t("Monto Pendiente") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_fechapagodeudor', min-width='130') {{ $t("Fecha de Pago del Deudor") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_fechaemision', min-width='130') {{ $t("Fecha de Emisión") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_diascredito', min-width='130') {{ $t("Días de Crédito") }}
            vx-th.uppercase(center,colspan="4", rowspan="1",min-width='130') {{ $t("Afecto") }}
            vx-th.uppercase(center,colspan="1", rowspan="2",sort-key='comprobante_detalle_entregadoflag', min-width='130') {{ $t("Producto/Servicio Entregado") }}
            vx-th.uppercase(center,colspan="1", rowspan="2",sort-key='comprobante_detalle_esfacturafisicaflag', min-width='130') {{ $t("Es Factura Física") }}
            vx-th.uppercase(center,colspan="1", rowspan="2",sort-key='comprobante_detalle_esxlsxflag', min-width='130') {{ $t("Es XLSX") }}
            vx-th.uppercase(center,colspan="1", rowspan="2",sort-key='comprobante_detalle_estado', min-width='130') {{ $t("Estado") }}
            vx-th.uppercase(colspan="1", rowspan="2",sort-key='comprobante_detalle_fechaactualizacionusuario', min-width='130') {{ $t("Última Fecha de Modificación") }}
          template(slot="mhead")
            tr
              vx-th.uppercase( center,sort-key="comprobante_detalle_afectoretencionflag" min-width="120") {{$t('Retención')}}
              vx-th.uppercase( center,sort-key="comprobante_detalle_afectodetraccionflag" min-width="120") {{$t('Detracción')}}
              vx-th.uppercase( center,sort-key="comprobante_detalle_afectopercepcionflag" min-width="120") {{$t('Percepción')}}          
              vx-th.uppercase( center,sort-key="comprobante_detalle_ningunoflag" min-width="120") {{$t('Ninguno')}}  
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center                     
                    feather-icon.style-icon.p-0(@click.stop='ver(tr.comprobante_detalle_id)', :title='$t("Ver")', icon='EyeIcon')
                    feather-icon.style-icon.p-0(@click.stop='verDocumento(tr.comprobante_detalle_id)', :title='$t("Ver Documento")', icon='FileIcon')
                vx-td.text-left(:data='tr.comprobante_detalle_nrocomprobante' ) {{ tr.comprobante_detalle_nrocomprobante }}
                vx-td.text-right(:data='tr.comprobante_detalle_montototal') {{ tr.comprobante_detalle_montototal }}
                vx-td.text-right(:data='tr.comprobante_detalle_montopendiente') {{ tr.comprobante_detalle_montopendiente }}
                vx-td.text-right(:data='tr.comprobante_detalle_fechapagodeudor') {{ tr.comprobante_detalle_fechapagodeudor }}
                vx-td.text-right(:data='tr.comprobante_detalle_fechaemision') {{ tr.comprobante_detalle_fechaemision }}
                vx-td.text-right(:data='tr.comprobante_detalle_diascredito') {{ tr.comprobante_detalle_diascredito }}
                vx-td.text-center(:data='tr.comprobante_detalle_afectoretencionflag')
                  span(v-if="tr.comprobante_detalle_afectoretencionflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')    
                vx-td.text-center(:data='tr.comprobante_detalle_afectodetraccionflag')
                  span(v-if="tr.comprobante_detalle_afectodetraccionflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data='tr.comprobante_detalle_afectopercepcionflag')
                  span(v-if="tr.comprobante_detalle_afectopercepcionflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon') 
                vx-td.text-center(:data='tr.comprobante_detalle_ningunoflag')
                  span(v-if="tr.comprobante_detalle_ningunoflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data='tr.comprobante_detalle_entregadoflag')
                  span(v-if="tr.comprobante_detalle_entregadoflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data='tr.comprobante_detalle_esfacturafisicaflag')
                  span(v-if="tr.comprobante_detalle_esfacturafisicaflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data='tr.comprobante_detalle_esxlsxflag')
                  span(v-if="tr.comprobante_detalle_esxlsxflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.comprobante_detalle_estado")
                  span(v-if="tr.comprobante_detalle_estado" class="justify-center") {{$t('ACTIVO')}}
                  span(v-else class="justify-center") {{$t('INACTIVO')}}
                vx-td.text-right(:data='tr.comprobante_detalle_fechaactualizacionusuario') {{ convertirFecha(tr.comprobante_detalle_fechaactualizacionusuario) }}
                
    popup-ver-facturas(:popupAbrir="mostrarPopupVer" @closePopup="closePopup" :parametro.async="parametro")
      
</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopupVerFacturas from "@/project/views/empresa/subasta/popup/PopupVerFacturas.vue";
import files from '@/mixins/mixinFiles';

export default {

  name: 'TabFacturas',
  mixins: [request, files],
  
  components: {
    PopupVerFacturas
  },
  props:{
    dataFacturas:{
      type:Array,
      default: () => []
    }
  },

  data() {
    return {
      parametro : {},
      mostrarPopupVer: false
    }      
  },

  methods: {

    async verDocumento(id) {
      try {
        this.$vs.loading({ type: 'point' });
        let token = localStorage.getItem('token');
        await this.funcDescargar(`comprobante_detalle_archivo?id=${id}&token=${token}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    convertirFecha(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      return fecha.split(',')[0]
    },
    
    ver(id){      
      this.parametro = {
        id : id,
        pagina : "ver"
      }
      this.mostrarPopupVer = true; 
    },
    
    async closePopup() {
      this.mostrarPopupVer = false;
    },
    
    async exportarDocumentos(){
      try {
        await this.funcExportar(`comprobante_detalle_lote?id=${this.$route.params.codigo}`,false);
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async exportar(){
      try {   
        await this.funcExportar(`exportar_comprobante_detalle?id=${this.$route.params.codigo}`,false);
      } catch (error) {
        throw new Error(error);
      }
    }
    
  }
}
</script>
