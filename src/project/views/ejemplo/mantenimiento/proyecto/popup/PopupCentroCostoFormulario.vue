<template lang="pug">
  //- div
  //-   div.demo-alignment
  //-     vx-popup.width_popup_centro_costo_formulario(:title="$t('Lista de Centros de Responsabilidad')" :active='popupActive' @close="closePopup" :click-not-close="false" fullscreen classContent="popup-example")
        
  //-       div.mb-5.mx-4.vx-row.vs-justify-flex-end
  //-         div.vx-row
  //-           vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
  //-           vs-button.mx-2.my-1.full( @click="openFilter" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
        
  //-       vx-filter-chip.mb-5(title="Filtros"  :hidden="hiddenChip" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros")
  //-       vx-filter(:filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" :parent="parentx" color="primary" :active="activo" @closeFilter='closeFilter' @confirmFilter="confirmFilter")
        
  //-       div.mx-3
  //-         strong
  //-           small.text-danger {{ "** " + $t("Haga doble click para seleccionar un centro de responsabilidad") }}
        
  //-       vx-table.style-vxtable(search tab pagination max-items="5" :data="listado" rowsPage :arrayRows='[25,50,100]' @dblClick="selectedCenter" :no-data-text="$t('No se encontraron registros')")
  //-         template(slot="thead")
  //-           vx-th.uppercase(sort-key="id"  min-width="160") {{$t('Código')}}
  //-           vx-th.uppercase(sort-key="descripcion"  min-width="160") {{$t('Descripción')}}
  //-           vx-th.uppercase(sort-key="gastoAdministrativoFlag"  min-width="160") {{$t('Administrativo')}}
  //-           vx-th.uppercase(sort-key="gastoFinancieroFlag"  min-width="160") {{$t('Finanzas')}}
  //-           vx-th.uppercase(sort-key="gastoVentaFlag"  min-width="160") {{$t('Ventas')}}
  //-           vx-th.uppercase(sort-key="gastoProduccionFlag"  min-width="160") {{$t('Producción')}}
  //-           vx-th.uppercase(center sort-key="estado" min-width="80") {{$t('Estado')}}
  //-         template(slot-scope="{data}")
  //-           tbody(class="table-text-sm")
  //-             vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
  //-               vx-td.text-left(:data="tr.id") {{tr.id}}
  //-               vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
  //-               vx-td.text-center(:data='tr.gastoAdministrativoFlag')
  //-                 feather-icon.style-icon(:icon="tr.gastoAdministrativoFlag ? 'CheckIcon': 'XIcon'")
  //-               vx-td.text-center(:data='tr.gastoFinancieroFlag')
  //-                 feather-icon.style-icon(:icon="tr.gastoFinancieroFlag ? 'CheckIcon': 'XIcon'")
  //-               vx-td.text-center(:data='tr.gastoVentaFlag')
  //-                 feather-icon.style-icon(:icon="tr.gastoVentaFlag ? 'CheckIcon': 'XIcon'")
  //-               vx-td.text-center(:data='tr.gastoProduccionFlag')
  //-                 feather-icon.style-icon(:icon="tr.gastoProduccionFlag ? 'CheckIcon': 'XIcon'")
  //-               vx-td.text-center(:data="tr.estado")
  //-                 span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
  //-                 span(v-else class="justify-center") {{$t('INACTIVO')}}

</template>

<script>

// import helperFunctions from '@/functions';
// import request from '@/mixins/mixinRequest';

// export default {

//   name: 'PopupCentroCostoFormulario',
//   mixins: [request],
//   components: {},

//   props: {
//     popupActive: {
//       type: Boolean,
//       default: false
//     },
//     company: {
//       type: String,
//       default: ''
//     },
//   },

//   data() {
//     return {
//       parentx: '#parentx-popup-centro-costo-formulario',
//       activo: false,
//       hiddenChip: true,
//       listadoCentroCosto: [],
//       filtros: [
//         {
//           type: 'criterio',
//           title: 'CRITERIO DE BÚSQUEDA',
//           alias: 'criterio',
//           closable: false,
//           expand: false,
//           action: false,
//           options: {
//             model: '',
//             options: [
//               { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern:['[0-9,]'] },
//               { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text' }
//             ],
//             criterio_multiple: [],
//             size_criterio_multiple: 1,
//             label: 'label',
//             placeholder: 'Seleccione un criterio de búsqueda'
//           }
//         },
//         {
//           type: 'singleCheck',
//           title: 'BÚSQUEDA EXACTA',
//           alias: 'busquedaExacta',
//           single: true,
//           action: false,
//           options: {
//             model: '',
//             value: false
//           }
//         },
//         {
//           type: 'singleCheck',
//           title: 'INCLUIR INACTIVOS',
//           alias: 'incluirInactivos',
//           single: true,
//           action: false,
//           options: {
//             model: '',
//             value: false
//           }
//         }
//       ],
//     };
//   },

//   computed: {
//     listado() {
//       return this.listadoCentroCosto;
//     }
//   },

//   watch: {
//     async popupActive(val){
//       this.activo = false;
//       if(val){
//         await this.listarTodo();
//       }
//     }
//   },

//   methods: {

//     async listarTodo() {
//       this.filtros = helperFunctions.filterCleanAll(this.filtros);
//       this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
//       await this.listarCentroCosto();
//     },

//     openFilter() {
//       this.activo = true;
//     },

//     async confirmFilter(filtros) {
//       this.activo = false;
//       this.filtros = filtros;
//       this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
//       await this.listarCentroCosto();
//     },
    
//     closeFilter() {
//       this.activo = false;
//     },

//     async listarCentroCosto() {
//       try {
//         if(!this.company) return
//         this.$vs.loading({ type: 'point' });
//         let obj = helperFunctions.mapFilters(this.filtros);
//         let { data } = await this.requestApi(`listar_centro_costo_defecto?companiaSeleccionada=${this.company}&idCentroCostoDefecto=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&busquedaExacta=${obj.busquedaExacta == 'SI' ? true : false}&incluirInactivos=${obj.incluirInactivos == 'SI' ? true : false}`);
//         let response = data.data;
//         if (response.estado) {
//           this.listadoCentroCosto = response.data;
//         } else {
//           this.listadoCentroCosto = [];
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//     selectedCenter(tr) {
//       if(!tr.estado) return this.notification(this.$t('Advertencia'), this.$t('No se pueden seleccionar registros en estado inactivo.'), 'warning',5000,'icon-alert-circle');
//       this.$emit('selectedCenter',tr);
//       this.listadoCentroCosto = [];
//     },

//     async closePopup() {
//       this.listadoCentroCosto = [];
//       this.$emit('closePopup');
//     },
//   },

//   async mounted() {
//     try {
//       this.filtros = helperFunctions.loaderFilters(this.filtros);
//       this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//};
</script>
