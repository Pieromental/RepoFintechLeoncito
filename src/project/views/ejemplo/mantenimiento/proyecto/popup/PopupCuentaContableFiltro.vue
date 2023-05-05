<template lang="pug">
  //- div
  //-   div.demo-alignment
  //-     vx-popup.width_cuenta_contable_filtro( :title="'CUENTAS CONTABLES'" :active="popupCuentaContableActive" @close="closePopup" :click-not-close="false" classContent="popup-example")

  //-       .mb-5.mx-4.vx-row.vs-justify-flex-end
  //-         .vx-row
  //-           vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
  //-           vs-button.mx-2.my-1.full( @click="abrirFiltro" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}

  //-       vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
  //-       vx-filter( :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" :parent="parentx" color="primary" :active="popupActive" @closeFilter="closeFilter" @confirmFilter="confirmFilter")

  //-       vx-table.style-vxtable( idRef="listaCuentaContable" ref="containerTable" max-items="10" search tab pagination  rowsPage :arrayRows='[25,50,100]' :data="listaCuentaContable" :no-data-text="$t('No se encontraron registros.')" )
  //-         template(slot="thead")
  //-           vx-th.uppercase(min-width="90" center) {{$t('Acciones')}}
  //-           vx-th.uppercase(min-width="100" sort-key="id") {{$t('Código')}}
  //-           vx-th.uppercase(min-width="160" sort-key="descripcion") {{$t('Descripción')}}
  //-           vx-th.uppercase(min-width="100" sort-key="cuentaAnterior") {{$t('Cuenta Anterior')}}
  //-           vx-th.uppercase(min-width="100" sort-key="cuentaAnteriorDescripcion") {{$t('Descripción Anterior')}}
  //-           vx-th.uppercase(min-width="100" sort-key="estado") {{$t('Estado')}}

  //-         template(slot-scope="{data}")
  //-           tbody(class="table-text-sm")
  //-             vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
  //-               template(v-if="tr.nivel=='1'")
  //-                 vx-td.text-left.bold(style="border-bottom: solid 1px" colspan="8" rowspan="1") {{tr.id}} - {{tr.descripcion}}
  //-               template(v-else-if="tr.nivel=='2'")
  //-                 vx-td.text-center
  //-                   .d-f.vs-justify-center
  //-                     vs-checkbox.font-label.ml-0(color="primary" size="small"  v-model="tr.marcado")
  //-                 vs-td.text-left(:data="tr.id") {{tr.id}}
  //-                 vs-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
  //-                 vs-td.text-left(:data="tr.cuentaAnterior") {{tr.cuentaAnterior}}
  //-                 vs-td.text-left(:data="tr.cuentaAnteriorDescripcion") {{tr.cuentaAnteriorDescripcion}}
  //-                 vs-td.text-center(:data="tr.estado") {{ (tr.estado) ? $t("ACTIVO") : $t("INACTIVO") }}
  //-       footer-opciones( @aceptar="enviarSeleccionados" :btnCancelar="false" )

</template>

<script>

// import request from '@/mixins/mixinRequest';
// import funciones from '@/functions';
// import swal from 'sweetalert2';
// import FooterOpciones from '@/proyecto/componentes/extras/componentes/FooterOpciones';

// export default {

//   name: 'PopupCuentaContableFiltro',
//   mixins: [request],

//   components: {
//     FooterOpciones
//   },

//   props: {
//     popupCuentaContableActive: {
//       type: Boolean,
//       default: false
//     },
//   },

//   data: () => ({
//     popupActive: false,
//     parentx: '#parentx-popup-cuenta-contable-filtro',
//     listaCuentaContable: [],
//     ocultarChip: false,
//     filtros: [
//       {
//         type: 'criterio',
//         title: 'CRITERIO DE BÚSQUEDA',
//         alias: 'criterio',
//         closable: false,
//         expand: false,
//         action: false,
//         options: {
//           model: '',
//           options: [
//             { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern:['[0-9,]'] },
//             { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text' },
//             { id: 'cuentaAnterior', label: 'CUENTA ANTERIOR', type: 'text', pattern: ['["\\w!<>¡?¿^()*|°¬+{}:,;&%$#=\\[\\]\\\\/\'\\d.-\\s]']  },
//             { id: 'descripcionAnterior', label: 'DESCRIPCIÓN ANTERIOR', type: 'text', pattern: ['[\\W\\w\\s]']  }
//           ],
//           criterio_multiple: [],
//           size_criterio_multiple: 1,
//           label: 'label',
//           placeholder: 'Seleccione un criterio de búsqueda'
//         }
//       },
//       {
//         type: 'singleCheck',
//         title: 'BÚSQUEDA EXACTA',
//         alias: 'busquedaExacta',
//         single: true,
//         action: false,
//         options: {
//           model: '',
//           value: false
//         }
//       },
//       {
//         type: 'singleCheck',
//         title: 'INCLUIR INACTIVOS',
//         alias: 'incluirInactivos',
//         single: true,
//         action: false,
//         options: {
//           model: '',
//           value: false
//         }
//       }
//     ]
//   }),

//   watch: {
//     popupCuentaContableActive(val) {
//       this.listaCuentaContable = [];
//       if (val) {
//         this.listarTodo();
//       }
//     }
//   },

//   methods: {

//     enviarSeleccionados() {
//       let cuentas = '';
//       this.listaCuentaContable.forEach((element) => { if(element.marcado) cuentas = cuentas ? cuentas+','+element.id:cuentas+element.id });
//       this.$emit('selectedAccount', cuentas);
//     },

//     closePopup() {
//       this.$emit('closePopup');
//     },

//     abrirFiltro() {
//       this.popupActive = true;
//     },

//     closeFilter() {
//       this.popupActive = false;
//     },

//     async listarTodo() {
//       this.filtros = funciones.filterCleanAll(this.filtros);
//       this.ocultarChip = funciones.hiddenChipFilter(this.filtros);
//       await this.listar();
//     },

//     async confirmFilter(filtros) {
//       this.popupActive = false;
//       this.filtros = filtros;
//       this.ocultarChip = funciones.hiddenChipFilter(this.filtros);
//       await this.listar();
//     },

//     async listar() {
//       try {
//         this.$vs.loading({ type: 'point' });
//         let obj = funciones.mapFilters(this.filtros);
//         let { data } = await this.requestApi(`listar_cuenta_contable_arbol?id=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&cuentaAnterior=${obj.criterio0.cuentaAnterior}&descripcionCuentaAnterior=${obj.criterio0.descripcionAnterior}&incluirInactivo=${obj.incluirInactivos == 'SI' ? true : false}&busquedaExacta=${obj.busquedaExacta == 'SI' ? true : false}&compania`);
//         let response = data.data;
//         if (response.estado) {
//           response.data.forEach(element => {
//             element.marcado = false
//           });
//           this.listaCuentaContable = response.data;
//         } else {
//           this.listaCuentaContable = [];
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//   },

//   async mounted() {
//     this.filtros = funciones.loaderFilters(this.filtros);
//     this.ocultarChip = funciones.hiddenChipFilter(this.filtros);
//   }

// };

</script>
