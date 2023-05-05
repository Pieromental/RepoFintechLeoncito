<template lang="pug">
//-   div#parentx-proyecto
//-     div
    
//-       vx-change-company(:active="activeCompany" :color="'primary'" :title="$t('Aviso')" :companyParameter="companyParameter" :optionCompany="optionCompany" :icon="'MessageCircleIcon'" @confirm="confirmCompany" @cancel="closeCompany")
//-       cabecera(:auth="nombreAutorizacion" :titulo="$t('Proyectos')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true")
      
//-       vx-card.card-sticky
        
//-         vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
//-         vx-filter(ref="filterProyecto" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-proyecto" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter"  @evntPopUp="evntPopup")
//-         vx-table.style-vxtable(search search-sticky max-content pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
//-           template(slot="thead")
//-             vx-th.uppercase(center min-width="150" ) {{ $t("Acciones") }}
//-             vx-th.uppercase(min-width="150" sort-key="companiaDescripcion") {{ $t("Compañía") }}
//-             vx-th.uppercase(min-width="100" sort-key="unidadNegocioDescripcion") {{ $t("Unidad de Negocio") }}
//-             vx-th.uppercase(min-width="120" sort-key="codigo") {{ $t("Código") }}
//-             vx-th.uppercase(min-width="220" sort-key="descripcion") {{ $t("Descripción") }}
//-             vx-th.uppercase(min-width="220" sort-key="descripcionIngles") {{ $t("Descripción Inglés") }}
//-             vx-th.uppercase(min-width="150" sort-key="responsableDescripcion") {{ $t("Responsable") }}
//-             vx-th.uppercase(min-width="150" sort-key="tipoProyectoDescripcion") {{ $t("Tipo de Proyecto") }}
//-             vx-th.uppercase(min-width="150" sort-key="grupoProyectoDescripcion") {{ $t("Grupo de Proyecto") }}
//-             vx-th.uppercase(min-width="150" sort-key="monedaDescripcion") {{ $t("Moneda") }}
//-             vx-th.uppercase(min-width="150" sort-key="elementoGastoDescripcion") {{ $t("Elemento de Gasto") }}
//-             vx-th.uppercase(min-width="150" sort-key="centroResponsabilidadId") {{ $t("Centro de Responsabilidad") }}
//-             vx-th.uppercase(min-width="150" sort-key="cuentaContableId") {{ $t("Cuenta Contable") }}
//-             vx-th.uppercase(min-width="150" sort-key="fechaInicio") {{ $t("Fecha de Inicio") }}
//-             vx-th.uppercase(min-width="150" sort-key="fechaFin") {{ $t("Fecha Fin") }}
//-             vx-th.uppercase(min-width="150" sort-key="fechaAprobacion") {{ $t("Fecha de Aprobación") }}
//-             vx-th.uppercase(min-width="150" sort-key="montoAutorizado") {{ $t("Monto Autorizado") }}
//-             vx-th.uppercase(min-width="100" sort-key="estado") {{ $t("Estado") }}
//-           template(slot-scope="{data}")
//-             tbody(class="table-text-sm")
//-               vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
//-                 vx-td.text-center
//-                   .d-f.vs-justify-center
//-                     feather-icon.style-icon.p-0(v-auth="`${nombreAutorizacion}-modificar`" @click.stop="questionCompany('editar', tr)" :title="$t('Modificar')" icon='Edit3Icon')
//-                     span.icon.icon-asignar(v-auth="`${nombreAutorizacion}-asignar`" @click.stop="questionCompany('asignar', tr)"  :title="$t('Asignar Presupuesto(s)')")
//-                     feather-icon.style-icon.p-0(v-auth="`${nombreAutorizacion}-ver`" @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')
//-                 vx-td.text-left(:data="tr.companiaDescripcion") {{tr.companiaDescripcion}}
//-                 vx-td.text-left(:data="tr.unidadNegocioDescripcion") {{tr.unidadNegocioDescripcion}}
//-                 vx-td.text-left(:data="tr.codigo") {{tr.codigo}}
//-                 vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
//-                 vx-td.text-left(:data="tr.descripcionIngles") {{tr.descripcionIngles}}
//-                 vx-td.text-left(:data="tr.responsableDescripcion") {{tr.responsableDescripcion}}
//-                 vx-td.text-left(:data="tr.tipoProyectoDescripcion") {{tr.tipoProyectoDescripcion}}
//-                 vx-td.text-left(:data="tr.grupoProyectoDescripcion") {{tr.grupoProyectoDescripcion}}
//-                 vx-td.text-left(:data="tr.monedaDescripcion") {{tr.monedaDescripcion}}
//-                 vx-td.text-left(:data="tr.elementoGastoDescripcion") {{tr.elementoGastoDescripcion}}
//-                 vx-td.text-left(:data="tr.centroResponsabilidadId") {{tr.centroResponsabilidadId}}
//-                 vx-td.text-left(:data="tr.cuentaContableId") {{tr.cuentaContableId}}
//-                 vx-td.text-left(:data="tr.fechaInicio") {{tr.fechaInicio}}
//-                 vx-td.text-left(:data="tr.fechaFin") {{tr.fechaFin}}
//-                 vx-td.text-left(:data="tr.fechaAprobacion") {{tr.fechaAprobacion}}
//-                 vx-td.text-left(:data="tr.montoAutorizado") {{tr.montoAutorizado}}
//-                 vx-td.text-center(:data="tr.estado")
//-                   span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
//-                   span(v-else class="justify-center") {{$t('INACTIVO')}}
                  
//-       popup-centro-costo-filtro(:popupCentroCostoActive="popupCentroCostoActive" @selectedCenter="selectedCenter" @closePopup="closePopup" )
//-       popup-cuenta-contable-filtro(:popupCuentaContableActive="popupCuentaContableActive" @selectedAccount="selectedAccount" @closePopup="closePopup" )
                
</template>

<script>

// import Cabecera from "@/proyecto/vistas/header.vue";
// import helperFunctions from "@/functions";
// import request from "@/mixins/mixinRequest";
// import Parametros from '@/mixins/mixinParametros';
// import PopupCuentaContableFiltro from "@/proyecto/componentes/maestro/contabilidad/proyecto/popup/PopupCuentaContableFiltro.vue";
// import PopupCentroCostoFiltro from "@/proyecto/componentes/maestro/contabilidad/proyecto/popup/PopupCentroCostoFiltro.vue";

// export default {

//   name: 'Proyectos',
//   mixins: [request, Parametros],
  
//   components: {
//     Cabecera,
//     PopupCuentaContableFiltro,
//     PopupCentroCostoFiltro
//   },

//   data() {
//     return {
//       nombreAutorizacion: "proyecto",
//       listarProyectos: [],
//       filterActive: false,
//       ocultarChip: false,
//       showUniNegocio: false,
//       buscarPreferida: {},
//       popupCentroCostoActive: false,
//       popupCuentaContableActive: false,
//       isMounted: false,
//       filtros: [
//         {
//           type: 'select',
//           multiple: true,
//           title: 'COMPAÑÍA',
//           alias: 'compania',
//           closable: false,
//           expand: false,
//           action: true,
//           hidden: false,
//           options: {
//             model: '',
//             values: [],
//             options: [],
//             searchable: true,
//             filterable: true,
//             disabled: false,
//             clearable: true,
//             label: 'label',
//             placeholder: 'Seleccione una compañía'
//           }
//         },
//         {
//           type: 'criterio',
//           title: 'CRITERIO DE BÚSQUEDA',
//           alias: 'criterio',
//           closable: false,
//           expand: false,
//           action: false,
//           add: true,
//           options: {
//             model: '',
//             options: [
//               { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern: '[0-9a-zA-Z,]' },
//               { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text', pattern: ['[\\W\\w\\s]'] },
//               { id: 'descripcionIngles', label: 'DESCRIPCIÓN INGLÉS', type: 'text', pattern: ['["\\w!<>¡?¿^()*|°¬+{}:,;&%$#=\\[\\]\\\\/\'\\d.-\\s]']},
//             ],
//             criterio_multiple: [],
//             size_criterio_multiple: 1,
//             label: 'label',
//             placeholder: 'Seleccione un criterio de búsqueda'
//           }
//         },
//         {
//           type: 'tree',
//           multiple: true,
//           title: 'UNIDAD DE NEGOCIO',
//           alias: 'unidadNegocio',
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options: {
//             model: '',
//             value: [],
//             aux: [],
//             branchDisabled: false,
//             flat: true,
//             options: [],
//             placeholder: 'Seleccione una Unidad de Negocio',
//             searchable: true
//           }
//         },
//         {
//           type: 'tree',
//           multiple: true,
//           title: 'RESPONSABLE',
//           alias: 'responsable',
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           expandLevel: 2,
//           options: {
//             model: '',
//             value: [],
//             aux: [],
//             branchDisabled: false,
//             flat: true,
//             options: [],
//             placeholder: 'Seleccione un Responsable',
//             searchable: true
//           }
//         },
//         {
//           type: 'tree',
//           multiple: true,
//           title: 'TIPO DE PROYECTO',
//           alias: 'tipoProyecto',
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options: {
//             model: '',
//             value: [],
//             aux: [],
//             branchDisabled: false,
//             flat: true,
//             options: [],
//             placeholder: 'Seleccione un Tipo de Proyecto',
//             searchable: true
//           }
//         },
//         {
//           type: 'tree',
//           multiple: true,
//           title: 'GRUPO DE PROYECTO',
//           alias: 'grupoProyecto',
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options: {
//             model: '',
//             value: [],
//             aux: [],
//             branchDisabled: false,
//             flat: true,
//             options: [],
//             placeholder: 'Seleccione un Grupo de Proyecto',
//             searchable: true
//           }
//         },
//         {
//           type: 'tree',
//           multiple: true,
//           title: 'ELEMENTO DE GASTO',
//           alias: 'elementoGasto',
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options: {
//             model: '',
//             value: [],
//             aux: [],
//             branchDisabled: false,
//             flat: true,
//             options: [],
//             placeholder: 'Seleccione un Elemento de Gasto',
//             searchable: true
//           }
//         },
//         {
//           type: 'select',
//           multiple: true,
//           title: 'MONEDA',
//           alias: 'moneda',
//           closable: false,
//           expand: false,
//           action: true,
//           hidden: false,
//           options: {
//             model: '',
//             values: [],
//             options: [],
//             searchable: true,
//             filterable: true,
//             disabled: false,
//             clearable: true,
//             label: 'label',
//             placeholder: 'Seleccione una Moneda'
//           }
//         },
//         {
//           type: 'dateRange',
//           title: 'FECHA DE INICIO',
//           alias: 'fechaInicio',
//           hora: false,
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options:{
//             model: '',
//             options: [
//               {
//                 title:  "DESDE",
//                 model: '',
//                 value: null,
//                 disabled: false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder: 'dd/mm/yyyy'
//               },  
//               {
//                 title:  "HASTA",
//                 model:  '',
//                 value: null,
//                 disabled:  false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder:  'dd/mm/yyyy'
//               }
//             ]
//           }
//         },
//         {
//           type: 'dateRange',
//           title: 'FECHA FIN',
//           alias: 'fechaFin',
//           hora: false,
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options:{
//             model: '',
//             options: [
//               {
//                 title:  "DESDE",
//                 model: '',
//                 value: null,
//                 disabled: false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder: 'dd/mm/yyyy'
//               },  
//               {
//                 title:  "HASTA",
//                 model:  '',
//                 value: null,
//                 disabled:  false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder:  'dd/mm/yyyy'
//               }
//             ]
//           }
//         },
//         {
//           type: 'dateRange',
//           title: 'FECHA DE APROBACIÓN',
//           alias: 'fechaAprobacion',
//           hora: false,
//           closable: false,
//           expand: false,
//           action: false,
//           hidden: false,
//           options:{
//             model: '',
//             options: [
//               {
//                 title:  "DESDE",
//                 model: '',
//                 value: null,
//                 disabled: false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder: 'dd/mm/yyyy'
//               },  
//               {
//                 title:  "HASTA",
//                 model:  '',
//                 value: null,
//                 disabled:  false,
//                 disabledDate: {
//                   to: '',
//                   from: ''
//                 },
//                 placeholder:  'dd/mm/yyyy'
//               }
//             ]
//           }
//         },
//         {
//           type:  'popUp',
//           title:  'CENTRO DE RESPONSABILIDAD',
//           alias:  'centroCosto',
//           closable:  false,
//           expand:  false,
//           action:  false,
//           hidden:  false,
//           model:  '',
//           options: {
//             model:  "",
//             options: [
//               {
//                 title: "CENTROS DE RESPONSABILIDAD",
//                 abbr:  "CENTROS DE RESPONSABILIDAD",
//                 alias: "centrosCostos",
//                 model:  '',
//                 hidden:  false,
//                 disabled:  true,
//                 placeholder:  '',
//               }
//             ]
//           }
//         },
//         {
//           type:  'popUp',
//           title:  'CUENTA CONTABLE',
//           alias:  'cuentaContable',
//           closable:  false,
//           expand:  false,
//           action:  false,
//           hidden:  false,
//           model:  '',
//           options: {
//             model:  "",
//             options: [
//               {
//                 title: "CUENTAS CONTABLES",
//                 abbr:  "CUENTAS CONTABLES",
//                 alias: "cuentasContables",
//                 model:  '',
//                 hidden:  false,
//                 disabled:  true,
//                 placeholder:  '',
//               }
//             ]
//           }
//         },
//         {
//           type: 'radio',
//           title: 'ESTADO',
//           alias: 'estado',
//           closable: false,
//           expand: false,
//           action: false,
//           options: {
//             model: 'ACTIVO',
//             value: 'ACTIVO',
//             count: [
//               {
//                 value: 'ACTIVO',
//                 label: 'ACTIVO'
//               },
//               {
//                 value: 'INACTIVO',
//                 label: 'INACTIVO'
//               }
//             ]
//           }
//         }
//       ],
//       activeCompany: false,
//       companyParameter: {},
//       optionCompany: [],
//     };
//   },

//   computed: {
//     listado() {
//       return this.listarProyectos;
//     }
//   },

//   methods: {

//     async listarTodo() {
//       this.filtros = helperFunctions.filterCleanAll(this.filtros)
//       this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
//       await this.listar();
//     },

//     abrirFiltro() {
//       this.filterActive = true;
//     },

//     closeFilter() {
//       this.filterActive = false;
//     },

//     async confirmFilter(filters) {
//       this.filterActive = false
//       this.filtros = filters
//       this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
//       await this.listar();
//     },

//     evntPopup(obj){
//       if(!obj) return;
//       switch(obj.alias){
//         case 'cuentasContables':
//           this.popupCuentaContableActive = true;
//           break;
//         case 'centrosCostos':
//           this.popupCentroCostoActive = true;
//           break;
//       }
//     },

//     selectedAccount(listado){
//       this.popupCuentaContableActive = false;
//       this.$refs.filterProyecto.reactChangePopup('popUp', 'cuentaContable', 'cuentasContables', listado);
//     },
    
//     selectedCenter(listado) {
//       this.popupCentroCostoActive = false;
//       this.$refs.filterProyecto.reactChangePopup('popUp', 'centroCosto', 'centrosCostos', listado);
//     },

//     closePopup() {
//       this.popupCentroCostoActive = false;
//       this.popupCuentaContableActive = false;
//     },

//     async cargarCompania() {
//       try {
//         let { data } = await this.requestApi('cargar_compania_usuario');
//         let response = data.data.data || [];
//         response = response.filter(e => {return (e.usuarioDetalleValorCodigoTipoCompania == 'P')});
//         response = response.map((e) => {
//           return {
//             id: e.companiaId,
//             label: e.companiaDescripcionCorta,
//             object: {
//               codigo: e.companiaId,
//               descripcion: e.companiaDescripcionCorta,
//               estado: e.object.estado,
//             }
//           };
//         });
//         let filter = response.find(element =>{return element.id == localStorage.getItem('compania-actual')});
//         this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'compania', response, filter);
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarUnidadNegocio() {
//       try {
//         let { data } = await this.requestApi('cargar_unidad_negocio_requerimiento_filtro');
//         let response = data.data || []; 
//         if (response.estado) {
//           this.filtros.map( e => {
//             if (e.alias == 'unidadNegocio') {
//               if(response.data){
//                 e.options.options = this.recursividadChildren(response.data, 2);
//                 e.options.model = this.buscarPreferida.label;
//                 e.options.aux = [this.buscarPreferida];
//                 e.options.value = [this.buscarPreferida.id];
//               }else e.options.options = [];
//             }
//           });
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarResponsable() {
//       try {
//         let { data } = await this.requestApi('cargar_responsable');
//         let response = data.data || []; 
//         if (response.estado) {
//           this.filtros.map( e => {
//             if (e.alias == 'responsable') {
//               if (response.data) e.options.options = this.recursividadChildren(response.data)
//               else e.options.options = [];
//             }
//           });
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarTipoProyecto() {
//       try {
//         let { data } = await this.requestApi('cargar_tipo_proyecto_arbol');
//         let response = data.data || []; 
//         if (response.estado) {
//           this.filtros.map( e => {
//             if (e.alias == 'tipoProyecto') {
//               if (response.data) e.options.options = this.recursividadChildren(response.data)
//               else e.options.options = [];
//             }
//           });
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarGrupoProyecto() {
//       try {
//         let { data } = await this.requestApi('cargar_grupo_proyecto_arbol');
//         let response = data.data || []; 
//         if (response.estado) {
//           this.filtros.map( e => {
//             if (e.alias == 'grupoProyecto') {
//               if (response.data) e.options.options = this.recursividadChildren(response.data)
//               else e.options.options = [];
//             }
//           });
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarElementoGasto() {
//       try {
//         let { data } = await this.requestApi('cargar_elemento_gasto_arbol');
//         let response = data.data || []; 
//         if (response.estado) {
//           this.filtros.map( e => {
//             if (e.alias == 'elementoGasto') {
//               if (response.data) e.options.options = this.recursividadChildren(response.data)
//               else e.options.options = [];
//             }
//           });
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarMoneda() {
//       try {
//         let { data } = await this.requestApi('cargar_moneda_filtro');
//         let response = data.data || []; 
//         if (response.estado) {
//           response = response.data.map((e) => {
//             return {
//               id: e.id,
//               label: e.label,
//               object: {
//                 companiaIdMoneda: e.object.companiaIdMoneda ? e.object.companiaIdMoneda : '',
//                 codigo: e.id,
//                 descripcion: e.object.descripcion,
//                 estado: e.object.estado,
//               }
//             };
//           }); 
//           let defecto = response.find(element =>{return element.object.companiaIdMoneda});
//           this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'moneda', response, defecto);
//         }
//       }catch (error) {
//         throw new Error(error);
//       }
//     },

//     recursividadChildren(data,nivel=0) {
//       let recurData = [];
//       let contador = 0;
//       if (data) {
//         data.forEach((element) => {
//           let value = {};
//           value.id =  element.id;
//           value.codigo =  element.codigo;
//           value.label = element.codigo ? element.label : `${element.id} - ${element.label}`;
//           //value.label = element.label;
//           value.isNew =  element.isNew;
//           value.nivel =  element.nivel;
//           value.descripcion =  element.label;
//           value.estado =  element.estado;
//           value.isDisabled = !element.esSeleccionable;
//           if(element.nivel==nivel){
//             if(JSON.stringify(this.buscarPreferida) == '{}' && contador==0) this.buscarPreferida = element;
//             if(element.preferida) this.buscarPreferida = element;
//           }
//           recurData.push(value);
//           if (element.hasOwnProperty('children')) {
//             recurData[contador].children = this.recursividadChildren(element.children, nivel);
//           }
//           contador++;
//         });
//         return recurData;
//       }
//     },
//     async listar() {
//       try {
//         if(this.isMounted) this.$vs.loading({ type: "point" });
//         let obj = helperFunctions.mapFilters(this.filtros);
//         let { data } = await this.requestApi(`listar_proyecto?compania=${obj.compania.id}&codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&descripcionIngles=${obj.criterio0.descripcionIngles}&idUnidadNegocio=${obj.unidadNegocio}&idResponsable=${obj.responsable}&idTipoProyecto=${obj.tipoProyecto}&idGrupoProyecto=${obj.grupoProyecto}&idElementoGasto=${obj.elementoGasto}&idMoneda=${obj.moneda.id}&fechaInicioDesde=${obj.fechaInicio.desde}&fechaInicioHasta=${obj.fechaInicio.hasta}&fechaFinDesde=${obj.fechaFin.desde}&fechaFinHasta=${obj.fechaFin.hasta}&fechaAprobacionDesde=${obj.fechaAprobacion.desde}&fechaAprobacionHasta=${obj.fechaAprobacion.hasta}&idCentroResponsabilidad=${obj.centrosCostos}&idCuentaContable=${obj.cuentasContables}&estado=${ obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}`);
//         let response = data.data;
//         if (response.estado) {
//           this.listarProyectos = response.data;
//         } else {
//           this.listarProyectos = [];
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally{
//         if(this.isMounted) this.$vs.loading.close();
//       }
//     },

//     async exportar() {
//       try {
//         this.$vs.loading({ type: 'point' });
//         let obj = helperFunctions.mapFilters(this.filtros);
//         await this.funcExportar(`exportar_proyecto?compania=${obj.compania.id}&codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&descripcionIngles=${obj.criterio0.descripcionIngles}&idUnidadNegocio=${obj.unidadNegocio}&idResponsable=${obj.responsable}&idTipoProyecto=${obj.tipoProyecto}&idGrupoProyecto=${obj.grupoProyecto}&idElementoGasto=${obj.elementoGasto}&idMoneda=${obj.moneda.id}&fechaInicioDesde=${obj.fechaInicio.desde}&fechaInicioHasta=${obj.fechaInicio.hasta}&fechaFinDesde=${obj.fechaFin.desde}&fechaFinHasta=${obj.fechaFin.hasta}&fechaAprobacionDesde=${obj.fechaAprobacion.desde}&fechaAprobacionHasta=${obj.fechaAprobacion.hasta}&idCentroResponsabilidad=${obj.centrosCostos}&idCuentaContable=${obj.cuentasContables}&estado=${ obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}`);
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//     async questionCompany(action, tr){
//       let statusCompy = localStorage.getItem('compania-actual') == tr.idCompania ? false : true;
//       this.companyParameter = {id: tr.id, action: action, company: {id: tr.idCompania, descripcion: tr.companiaDescripcion }};
//       this.activeCompany = (action == 'ampliar') ? true : statusCompy;
//       if(this.activeCompany) return;
//       switch(action){
//         case 'editar':
//             this.editar(tr.id);
//           break;
//         case 'asignar':
//             this.asignar(tr.id);
//           break;
//       }
//     },

//     closeCompany(){
//       this.activeCompany = false;
//     },

//     confirmCompany(val){
//      this.activeCompany = false;
//      setTimeout(() => {
//        switch(val.action){
//           case 'editar':
//             this.editar(val.id);
//             break;
//           case 'asignar':
//             this.asignar(val.id);
//             break;
//         }
//       }, 500);
//     },

//     nuevo(){
//       this.$router.push('/proyecto/nuevo');
//     },

//     editar(id){
//       this.$router.push(`/proyecto/editar/${id}`);
//     },

//     asignar(id){
//       this.$router.push(`/proyecto/asignar/${id}`);
//     },
    
//     ver(id){
//       this.$router.push(`/proyecto/ver/${id}`);
//     },

//   },
  
//   async mounted() {
//     try {
//       this.$vs.loading({ type: "point" });
//       await this.formularioParametros(['OB-CTPROYECTOREL','OP-LOGCTPROYECTO']);
//       await this.cargarCompania();
//       await this.cargarUnidadNegocio();
//       await this.cargarResponsable();
//       await this.cargarTipoProyecto();
//       await this.cargarGrupoProyecto();
//       await this.cargarElementoGasto();
//       await this.cargarMoneda();
//       this.filtros = helperFunctions.loaderFilters(this.filtros);
//       this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);      
//       await this.listar();
//       this.isMounted = true;
//     } catch (error) {
//       throw new Error(error);
//     } finally{
//       this.$vs.loading.close();
//     }
//   }

// };

</script>