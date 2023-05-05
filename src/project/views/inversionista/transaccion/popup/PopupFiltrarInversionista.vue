<template lang="pug">
  div.demo-alignment
    vx-popup.width-popup-75( :title="'VENTANA DE BÚSQUEDAS DE INVERSIONISTAS'" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example")
      div.mb-5.mx-4.vx-row.vs-justify-flex-end
        div.vx-row
          vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
          vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
      vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
      vx-filter( :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="filterActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")      
      vx-table.style-vxtable( idRef="listarInversionistas" ref="containerTable" max-items="10" :data="listarInversionistas" search search-sticky search-popup pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
        template(slot="thead")
          vx-th.uppercase(min-width="100" center ) {{$t('Acciones')}}
          vx-th.uppercase(min-width="180" sort-key="nombres") {{$t('Nombre')}}
          vx-th.uppercase(min-width="180" sort-key="apellido_paterno") {{$t('Apellido Paterno')}}
          vx-th.uppercase(min-width="180" sort-key="apellido_materno") {{$t('Apellido Materno')}}
          vx-th.uppercase(min-width="180" sort-key="detalle_tipo_documento") {{$t('Tipo de Documento')}}
          vx-th.uppercase(min-width="140" sort-key="numero_documento") {{$t('Número de Documento')}}
          vx-th.uppercase(min-width="140" sort-key="descripcion_estado") {{$t('Estado')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
              vx-td.text-center
                .d-f.vs-justify-center
                  vs-checkbox.font-label.ml-0(color="primary" size="small"  v-model="tr.marcado")
              vx-td.text-left(:data="tr.nombres") {{tr.nombres}}
              vx-td.text-left(:data="tr.apellido_paterno") {{tr.apellido_paterno}}
              vx-td.text-left(:data="tr.apellido_materno") {{tr.apellido_materno}}
              vx-td.text-left(:data="tr.detalle_tipo_documento") {{tr.detalle_tipo_documento}}
              vx-td.text-right(:data="tr.numero_documento") {{tr.numero_documento}}
              vx-td.text-center(:data="tr.descripcion_estado") {{tr.descripcion_estado}}
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
      let value = '';
      let label = '';
      this.listarInversionistas.forEach((element) => { 
        if(element.marcado){
          value = value ? value+','+element.id:value+element.id;
          label = label ? label+', '+element.nombres+' '+element.apellido_paterno+' '+element.apellido_materno:label+element.nombres+' '+element.apellido_paterno+' '+element.apellido_materno 
        } 
      });
      this.$emit('selectedInvestors', {value: value, label: label});
      this.cancelar();
    },

    async listar() {
      try { 
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = "listar_inversionista_bo?";        
        params += `nombres=${obj.criterio0.nombre}&`;
        params += `id_master_detalle_estado_usu=&`;
        params += `apellido_paterno=${obj.criterio0.apPaterno}&`;
        params += `apellido_materno=${obj.criterio0.apMaterno}&`;
        params += `numero_documento=${obj.criterio0.numeroDocumento}&`;
        params += `busqueda_exacta=${obj.busquedaExacta == 'SI' ? true : false}`; 
        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          response.data.forEach(element => {  element.marcado = false });    
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
        listarInversionistas: [],    
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
                { id: 'nombre', label: 'NOMBRE', type: 'text', pattern: ["[\\W\\w\\s]"] },
                { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ["[\\W\\w\\s]"] },
                { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ["[\\W\\w\\s]"] },
                { id: 'numeroDocumento', label: 'NUMERO DE DOCUMENTO', type: 'numberMultiple', pattern: ["[0-9,]"] },
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
    }

  }

}
</script>