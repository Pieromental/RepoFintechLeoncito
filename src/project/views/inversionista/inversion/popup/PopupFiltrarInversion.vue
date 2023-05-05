<template lang="pug">
  div
    vx-popup.width_popup_cuenta_contable_formulario( :title="'BUSCAR INVERSIONISTA'" :active="popupVerFiltroInversionistaActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example")
      div.mb-5.mx-4.vx-row.vs-justify-flex-end
        div.vx-row
          vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
          vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
      vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
      vx-filter(:filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="filterActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")      
      vx-table.style-vxtable(idRef="listaInversionistas" ref="containerTable" max-items="10" v-model="seleccionados" :data="listaInversionistas" multiple search search-sticky search-popup pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
        template(slot="thead")
          vx-th.uppercase(min-width="250" sort-key="nombres") {{$t('Nombre')}}
          vx-th.uppercase(min-width="150" sort-key="apellido_paterno") {{$t('Apellido Paterno')}}
          vx-th.uppercase(min-width="150" sort-key="apellido_materno") {{$t('Apellido Materno')}}
          vx-th.uppercase(min-width="150" sort-key="detalle_tipo_documento") {{$t('Tipo de Documento')}}
          vx-th.uppercase(min-width="100" sort-key="numero_documento") {{$t('Número de Documento')}}
          vx-th.uppercase(min-width="100" sort-key="descripcion_estado") {{$t('Estado')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")                    
              vx-td.text-left(:data="tr.nombres") {{tr.nombres}}
              vx-td.text-left(:data="tr.apellido_paterno") {{tr.apellido_paterno}}
              vx-td.text-left(:data="tr.apellido_materno") {{tr.apellido_materno}}
              vx-td.text-left(:data="tr.detalle_tipo_documento") {{tr.detalle_tipo_documento}}
              vx-td.text-left(:data="tr.numero_documento") {{tr.numero_documento}}
              vx-td.text-left(:data="tr.descripcion_estado") {{tr.descripcion_estado}}
      vx-button.vs-justify-flex-end(@click="enviarSeleccionados()" :disabled="verBotonAceptar") {{$t('Aceptar')}}    

</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import VxButton from '@/components/buttons/Button.vue';
import funciones from '@/functions';

export default {

  name: 'PopupFiltrarInversion',
  mixins: [request],

  components: {
    funciones,
    VxButton
  },

  props: {
    popupVerFiltroInversionistaActive: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    popupVerFiltroInversionistaActive(val) {
      this.listaInversionistas = [];
      if (val) {
        this.filtros = helperFunctions.loaderFilters(this.filtros);
        this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
        this.listarTodo();
      }
    },

    seleccionados(val){
      if (val.length > 0) {
        this.verBotonAceptar = false;
      }else{
        this.verBotonAceptar = true;
      }
    }
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    enviarSeleccionados(){
      this.seleccionados = this.seleccionados.map((e)=>{
        e.nombres = e.nombres + " " + e.apellido_paterno + " " + e.apellido_materno;
        return e        
      })
      this.$emit('selectedAccount',this.seleccionados);
      this.cancelar();
    },

    async listar() {
      try { 
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros); 
        let { data } = await this.requestApi(`listar_inversionista_bo?id_master_detalle_estado_usu=&nombres=${obj.criterio0.nombre}&apellido_paterno=${obj.criterio0.apPaterno}&apellido_materno=${obj.criterio0.apMaterno}&numero_documento=${obj.criterio0.numeroDocumento}&busqueda_exacta=${obj.busquedaExacta == 'SI' ? true : obj.busquedaExacta == '' ? false : ''}`);
        let response = data.data;   
        if (response.estado) {          
          this.listaInversionistas = response.data;
        } else {
          this.listaInversionistas = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        parentx: '#parentx-filtrar-inversion',
        filterActive: false,
        ocultarChip: false,        
        seleccionados: [],
        listaInversionistas: [],
        verBotonAceptar: true,
        filtros:[
          {
            type: 'criterio',
            title: 'CRITERIO DE BÚSQUEDA',
            alias: 'criterio',
            closable: false,
            expand: false,
            action: true,
            add: true,
            options: {
              model: '',
              options: [             
                { id: 'nombre', label: 'NOMBRE', type: 'text', pattern: ["[a-zA-Z]"] },
                { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ["[a-zA-Z]"] },
                { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ["[a-zA-Z]"] },
                { id: 'numeroDocumento', label: 'NUMERO DE DOCUMENTO', type: 'numberMultiple', pattern: ["[0-9]"] },
              ],
              criterio_multiple: [],
              size_criterio_multiple: 1,
              label: 'label',
              placeholder: 'Seleccione un criterio de búsqueda'
            }
          },
          {
            type: 'singleCheck',
            title: 'BÚSQUEDA EXACTA',
            alias: 'busquedaExacta',
            single: true,
            action: false,
            expand: false,
            options: {
              model: '',
              value: false
            }
          },
        ]    
      }
    },

    abrirFiltro() {
      this.filterActive = true;
    },

    closeFilter() {
      this.filterActive = false;
    },

    async confirmFilter(filters) {
      this.filterActive = false;
      this.filtros = filters;
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async listarTodo() {
      this.filtros = funciones.filterCleanAll(this.filtros);
      this.ocultarChip = funciones.hiddenChipFilter(this.filtros);
      await this.listar();
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