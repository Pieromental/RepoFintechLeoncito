<template lang="pug">
  div    
    vx-card.vxcard-floating        
      div.vx-row.demo-alignment            
        div.vx-col
          vs-button.mx-2.my-1.full( @click="exportar" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar") }}
        vx-table.style-vxtable(idRef="listarContactoDeudor" ref="listarContactoDeudor" pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="dataDeudor" :no-data-text="$t('No se encontraron registros')")
          template(slot='thead')
            vx-th.uppercase(center, min-width='100') {{ $t("Acciones") }}
            vx-th.uppercase(sort-key='deudor_contacto_nombres', min-width='160') {{ $t("Nombres") }}
            vx-th.uppercase(sort-key='deudor_contacto_apellidos', min-width='160') {{ $t("Apellidos") }}
            vx-th.uppercase(sort-key='deudor_contacto_correo', min-width='160') {{ $t("Correo") }}
            vx-th.uppercase(sort-key='deudor_contacto_telefono', min-width='130') {{ $t("Teléfono") }}
            vx-th.uppercase(sort-key='deudor_contacto_estado', min-width='130') {{ $t("Estado") }}
            vx-th.uppercase(center,sort-key='deudor_contacto_fechaactualizacionusuario', min-width='130') {{ $t("Última Fecha de Modificación") }}
          template(slot-scope='{ data }')
            tbody.table-text-sm
              vx-tr(:class="{'style-danger-vxtable' : !tr.deudor_contacto_estado }" :data='tr', :key='indextr', v-for='(tr, indextr) in data')
                vx-td.text-center
                  .d-f.vs-justify-center 
                    feather-icon.style-icon.p-0(@click.stop='ver(tr.deudor_contacto_id)', :title='$t("Ver")', icon='EyeIcon')
                vx-td.text-left(:data='tr.deudor_contacto_nombres' ) {{ tr.deudor_contacto_nombres }}
                vx-td.text-left(:data='tr.deudor_contacto_apellidos') {{ tr.deudor_contacto_apellidos }}
                vx-td.text-left(:data='tr.deudor_contacto_correo') {{ tr.deudor_contacto_correo }}
                vx-td.text-right(:data='tr.deudor_contacto_telefono') {{ tr.deudor_contacto_telefono }}
                vx-td.text-center(:data="tr.deudor_contacto_estado")
                  span(v-if="tr.deudor_contacto_estado" class="justify-center") {{$t('ACTIVO')}}
                  span(v-else class="justify-center") {{$t('INACTIVO')}}
                vx-td.text-right(:data='tr.deudor_contacto_fechaactualizacionusuario') {{ convertirFecha(tr.deudor_contacto_fechaactualizacionusuario) }}
    popup-ver-contacto-deudor(:popupAbrir="mostrarPopupVer" @closePopup="closePopup" :parametro.async="parametro")
</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopupVerContactoDeudor from "@/project/views/empresa/subasta/popup/PopupVerContactoDeudor.vue";

export default {

  name: 'TabContactosDeudor',
  mixins: [request],
  
  components: {
    PopupVerContactoDeudor
  },

  props:{
    flagButton:{
      type:Boolean,
      default:true,
    },
    dataDeudor:{
      type:Array,
      default: () => []
    }
  },

  data() {
    return this.getDefaultData()
  },

  methods: {
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
    async exportar(){
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });        
        await this.funcExportar(`exportar_deudor_contacto?id=${this.$route.params.codigo}`,false);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    getDefaultData(){
      return {
        parametro : {},
        mostrarPopupVer: false,
      }      
    },
  },
  
}
</script>
