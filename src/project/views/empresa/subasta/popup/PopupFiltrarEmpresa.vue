<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_cuenta_contable_filtro( :title="'BUSCAR EMPRESAS'" :active="popupAbrir" @close="cancelar" :click-not-close="false" classContent="popup-example")
        //div.mb-5.mx-4.vx-row.vs-justify-flex-end
          div.vx-row
            vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
            vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
        //vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        //vx-filter( :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="filterActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")      
        vx-table.style-vxtable(idRef="listarInversionistas" ref="containerTable" max-items="10" v-model="seleccionados" :data="listarInversionistas" multiple search pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
          template(slot="thead")
            vx-th.uppercase(min-width="180" sort-key="empresa_razonsocial") {{$t('Razón Social')}}
            vx-th.uppercase(min-width="100" sort-key="empresa_ruc") {{$t('RUC')}}
            vx-th.uppercase(min-width="100" sort-key="riesgo_descripcion") {{$t('Riesgo')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")                    
                vx-td.text-left(:data="tr.empresa_razonsocial") {{tr.empresa_razonsocial}}
                vx-td.text-left(:data="tr.empresa_ruc") {{tr.empresa_ruc}}
                vx-td.text-left(:data="tr.riesgo_descripcion") {{tr.riesgo_descripcion}}
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
      this.listarInversionistas = [];
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
        popup : 'popupEmpresa',
        alias : 'empresa',
        listado : this.seleccionados
      }      
      this.$emit('selectedAccount',obj);
      this.cancelar();
    },

    async listar() {
      try { 
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros); 
        let { data } = await this.requestApi(`listar_empresa_subasta`);
        let response = data.data;   
        if (response.estado) {          
          this.listarInversionistas = response.data;
        } else {
          this.listarInversionistas = [];
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
        listarInversionistas: [],    
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