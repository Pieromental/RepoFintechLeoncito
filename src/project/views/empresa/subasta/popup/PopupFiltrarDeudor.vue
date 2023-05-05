<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_cuenta_contable_filtro( :title="'BUSCAR DEUDOR'" :active="popupAbrir" @close="cancelar" :click-not-close="false" classContent="popup-example")
        div.mb-5.mx-4.vx-row.vs-justify-flex-end
          div.vx-row
            vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
            vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
        vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter( :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="filterActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")      
        vx-table.style-vxtable(idRef="listarDeudores" ref="containerTable" max-items="10" v-model="seleccionados" :data="listarDeudores" multiple search search-sticky search-popup pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
          template(slot="thead")
            vx-th.uppercase(min-width="100" sort-key="deudor_ruc") {{$t('RUC')}}
            vx-th.uppercase(min-width="180" sort-key="deudor_razonsocial") {{$t('Razón Social')}}
            vx-th.uppercase(min-width="100" sort-key="deudor_nombrecomercial") {{$t('Nombre Comercial')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")                    
                vx-td.text-left(:data="tr.deudor_ruc") {{tr.deudor_ruc}}
                vx-td.text-left(:data="tr.deudor_razonsocial") {{tr.deudor_razonsocial}}
                vx-td.text-left(:data="tr.deudor_nombrecomercial") {{tr.deudor_nombrecomercial}}
        footer-opciones( @aceptar="enviarSeleccionados" :btnCancelar="false" )

</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';

export default {

  name: 'PopupFiltrarInversion',
  mixins: [request],

  components: {
    funciones,
    FooterOpciones
  },

  props: {
    popupAbrir: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    popupAbrir(val) {
      this.listarDeudores = [];
      if (val) {
        this.filtros = helperFunctions.loaderFilters(this.filtros);
        this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
        this.listarTodo();
      }
    }
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    enviarSeleccionados(){ 
      let obj = {
        popup : 'popupDeudor',
        alias : 'deudor',
        listado : this.seleccionados
      }        
      this.$emit('selectedAccount',obj);
      this.cancelar();
    },

    async listar() {
      try { 
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = "listar_deudor_subasta?";        
        params += `ruc=${obj.criterio0.ruc}&`;
        params += `razon_social=${obj.criterio0.razonSocial}&`;
        params += `nombre_comercial=${obj.criterio0.nombreComercial}&`;        
        params += `busqueda_exacta=${obj.busquedaExacta == 'SI' ? true : obj.busquedaExacta == '' ? false : ''}`; 
        let { data } = await this.requestApi(params);
        let response = data.data;   
        if (response.estado) {          
          this.listarDeudores = response.data;
        } else {
          this.listarDeudores = [];
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
        listarDeudores: [],    
        filtros:[          
          {
            type: 'criterio',
            title: 'CRITERIO DE BÚSQUEDA',
            alias: 'criterio',
            closable: false,
            expand: false,
            action: false,
            add: true,
            options: {
              model: '',
              options: [
                { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: '[0-9a-zA-Z]' },
                { id: 'razonSocial', label: 'RAZÓN SOCIAL', type: 'numberMultiple', pattern: '[0-9a-zA-Z]' },
                { id: 'nombreComercial', label: 'NOMBRE COMERCIAL', type: 'numberMultiple', pattern: '[0-9a-zA-Z]' },
              ],
              criterio_multiple: [],
              size_criterio_multiple: 1,
              label: 'label',
              placeholder: 'Seleccione un criterio de búsqueda',
            },
          },
          {
            type: 'singleCheck',
            title: 'BÚSQUEDA EXACTA',
            alias: 'busquedaExacta',
            single: true,
            action: false,
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