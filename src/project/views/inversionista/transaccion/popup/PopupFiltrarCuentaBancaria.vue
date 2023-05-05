<template lang="pug">
  div.demo-alignment
    vx-popup.width-popup-75( :title="'VENTANA DE BÚSQUEDA DE CUENTAS BANCARIAS'" :active="popupAbrir" @close="cancelar" :click-not-close="false" classContent="popup-example")
      div.mb-5.mx-4.vx-row.vs-justify-flex-end
        div.vx-row
          vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
          vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
      vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
      vx-filter( :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="filterActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")      
      vx-table.style-vxtable( idRef="listarCuentaBancarias" ref="containerTable" max-items="10" :data="listarCuentaBancarias" search search-sticky search-popup pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
        template(slot="thead")
          vx-th.uppercase(min-width="100" center ) {{$t('Acciones')}}
          vx-th.uppercase(min-width="160" sort-key="cuenta_bancaria_numerocuenta") {{$t('Número de Cuenta')}}
          vx-th.uppercase(min-width="160" sort-key="cuenta_bancaria_cci") {{$t('CCI')}}
          vx-th.uppercase(min-width="180" sort-key="cuenta_bancaria_nombretitular") {{$t('Nombre Titular')}}
          vx-th.uppercase(min-width="100" sort-key="cuenta_bancaria_estado") {{$t('Estado')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr( :class="{'style-danger-vxtable' : !tr.cuenta_bancaria_estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
              vx-td.text-center
                .d-f.vs-justify-center
                  vs-checkbox.font-label.ml-0(color="primary" size="small"  v-model="tr.marcado")
              vx-td.text-left(:data="tr.cuenta_bancaria_numerocuenta") {{tr.cuenta_bancaria_numerocuenta}}
              vx-td.text-left(:data="tr.cuenta_bancaria_cci") {{tr.cuenta_bancaria_cci}}
              vx-td.text-left(:data="tr.cuenta_bancaria_nombretitular") {{tr.cuenta_bancaria_nombretitular}}
              vx-td.text-center(:data="tr.cuenta_bancaria_estado")
                span(v-if="tr.cuenta_bancaria_estado" class="justify-center") {{$t('ACTIVO')}}
                span(v-else class="justify-center") {{$t('INACTIVO')}}
      footer-opciones( @aceptar="enviarSeleccionados" :btnCancelar="false" )
</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';

export default {

  name: 'PopupFiltrarCuentaBancaria',
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
      this.listarCuentaBancarias = [];
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
      this.listarCuentaBancarias.forEach((element) => { 
        if(element.marcado){
          value = value ? value+','+element.cuenta_bancaria_id:value+element.cuenta_bancaria_id;
          label = label ? label+', '+element.cuenta_bancaria_numerocuenta:label+element.cuenta_bancaria_numerocuenta;
        } 
      });
      this.$emit('selectedAccountBank', {value: value, label: label});
      this.cancelar();
    },
    
    async listar() {
      try { 
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = "listar_busqueda_cuenta_bancaria?";
        params += `numero_cuenta=${obj.criterio0.numeroCuenta}&`;
        params += `cci=${obj.criterio0.cci}&`;
        params += `nombre_titular=${obj.criterio0.nombreTitular}&`;
        params += `busqueda_exacta=${obj.busquedaExacta == 'SI' ? true : false}`;
        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          response.data.forEach(element => {  element.marcado = false });
          this.listarCuentaBancarias = response.data;
        } else {
          this.listarCuentaBancarias = [];
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
        listarCuentaBancarias: [],    
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
                { id: 'numeroCuenta', label: 'NÚMERO DE CUENTA', type: 'numberMultiple', pattern: '[0-9,]' },
                { id: 'cci', label: 'CCI', type: 'numberMultiple', pattern: '[0-9,]' },
                { id: 'nombreTitular', label: 'NOMBRE TITULAR', type: 'text', pattern: ['[\\W\\w\\s]'] },
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