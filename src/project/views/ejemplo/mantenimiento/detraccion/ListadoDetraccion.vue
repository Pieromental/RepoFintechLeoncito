<template lang="pug">
  //- div#parentx-detraccion
  //-   div
  //-     cabecera(:auth="nombreAutorizacion" :titulo="$t('DETRACCIONES')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo"  @filtrar="abrirFiltro")
  //-     vx-card.card-sticky
  //-       vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
  //-       vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-detraccion" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")
  //-       vx-table.style-vxtable(search search-sticky  pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
  //-         template(slot="thead")
  //-           vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
  //-           vx-th.uppercase(sort-key="codigo" min-width="80") {{$t('Código')}}
  //-           vx-th.uppercase(sort-key="descripcion" min-width="160") {{$t('Descripción')}}
  //-           vx-th.uppercase(sort-key="porcentaje" min-width="80") {{$t('Porcentaje')}}
  //-           vx-th.uppercase(sort-key="montoMinimo" min-width="80") {{$t('Monto Mínimo')}}
  //-           vx-th.uppercase(center sort-key="estado" min-width="80") {{$t('Estado')}}
  //-         template(slot-scope="{data}")
  //-           tbody(class="table-text-sm")
  //-             vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
  //-               vx-td.text-center
  //-                 .d-f.vs-justify-center
  //-                   feather-icon.style-icon.p-0(v-auth="`${nombreAutorizacion}-modificar`" @click.stop="editar(tr.id)" :title="$t('Modificar')" icon='Edit3Icon')
  //-                   feather-icon.style-icon.p-0(v-auth="`${nombreAutorizacion}-ver`" @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')
  //-               vx-td.text-left(:data="tr.codigo") {{tr.codigo}}
  //-               vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
  //-               vx-td.text-right(:data="tr.porcentaje") {{tr.porcentaje}}
  //-               vx-td.text-right(:data="tr.montoMinimo") {{tr.montoMinimo}}
  //-               vx-td.text-center(:data="tr.estado")
  //-                 span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
  //-                 span(v-else class="justify-center") {{$t('INACTIVO')}}
  //-   vx-sidebar-personalized.sidebarx(:width="30" @cerrar="cerrarSidebar" v-model="sidebarActivo" :click-not-close="true" color="primary" spacer ref="VxSidebarPersonalized" parent="#parentx-detraccion")
  //-     formulario-detracciones(@cancelar='cerrarSidebar' :parametro.async="parametro")
  //-   vx-dialog( :active="activarAlertaPaisLocal" :color="'warning'" :title="$t('Alerta')" :body="$t(mensajePaisLocal)" :icon="'AlertCircleIcon'" :confirmText="$t('Aceptar')" :cancelText="'cancelar'" :confirmColor="'primary'" :cancelColor="'danger'" :confirm="true" :cancel="false" @confirm="aceptarPaisLocal" @cancel="" @closeDialog="closeDialog")            

</template>

<script>

// import Cabecera from "@/proyecto/vistas/header.vue";
// import helperFunctions from "@/functions";
// import request from "@/mixins/mixinRequest";
// import VxSidebarPersonalized from "@/components/VxSidebarPersonalized";
// import TituloInterfaz from "@/proyecto/componentes/extras/componentes/TituloInterfaz.vue";
// import FormularioDetracciones from "@/proyecto/componentes/maestro/cuentas_pagar/detraccion/FormularioDetraccion.vue";

// export default {

//   name: 'Detraccion',
//   mixins: [request],
//   components: {
//     Cabecera,
//     VxSidebarPersonalized,
//     TituloInterfaz,
//     FormularioDetracciones
//   },

//   data() {
//     return {
//       nombreAutorizacion: "detraccion",
//       listarDetracciones: [],
//       filterActive: false,
//       ocultarChip: false,
//       mensajePaisLocal: "",
//       activarAlertaPaisLocal: false,
//       filtros: [
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
//               { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern: "[0-9a-zA-Z,]" },
//               { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text', pattern: ["[\\W\\w\\s]"] },
//               { id: 'porcentaje', label: 'PORCENTAJE', type: 'text', pattern: ["[\\d.]"] },
//               { id: 'montoMinimo', label: 'MONTO MÍNIMO', type: 'text', pattern: ["[\\d.]"] }
//             ],
//             criterio_multiple: [],
//             size_criterio_multiple: 1,
//             label: 'label',
//             placeholder: 'Seleccione un criterio de búsqueda'
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
//       parametro: {},
//       sidebarActivo: false,
//       isMounted: false,

//     };
//   },

//   computed: {
//     listado() {
//       return this.listarDetracciones;
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

//     async confirmFilter(filters) {
//       this.filterActive = false
//       this.filtros = filters
//       this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
//       await this.listar();
//     },

//     closeFilter() {
//       this.filterActive = false;
//     },

//     obtenerPorcentaje(val){
//       if(val.length){
//         let temp = val.indexOf('.');
//         let num = 0;
//         if(temp==-1){
//           val = val+".00";
//         }else{
//           num = val.length - (temp+1);
//           let add = "";
//           while(num!=2){
//             add = add + "0"
//             num++
//           }
//           val = val + add;
//         }
//       }
//       return val
//     },

//     obtenerMontoMinimo(val){
//       if(val.length){
//         let temp = val.indexOf('.');
//         let num = 0;
//         if(temp==-1){
//           val = val+".0000";
//         }else{
//           num = val.length - (temp+1);
//           let add = "";
//           while(num!=4){
//             add = add + "0"
//             num++
//           }
//           val = val + add;
//         }
//       }
//       return val
//     },

//     async listar() {
//       try {
//         if(this.isMounted) this.$vs.loading({ type: "point" });
//         let obj = helperFunctions.mapFilters(this.filtros);
//         let { data } = await this.requestApi(`listar_detraccion?codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&porcentaje=${this.obtenerPorcentaje(obj.criterio0.porcentaje)}&montoMinimo=${this.obtenerMontoMinimo(obj.criterio0.montoMinimo)}&estado=${obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}`);
//         let response = data.data;
//         if (response.estado) {
//           this.listarDetracciones = response.data;
//         } else {
//           this.listarDetracciones = [];
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         if(this.isMounted) this.$vs.loading.close();
//       }
//     },

//     async exportar() {
//       try {
//         this.$vs.loading({ type: 'point' });
//         let obj = helperFunctions.mapFilters(this.filtros);
//         await this.funcExportar(`exportar_detraccion?codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&porcentaje=${this.obtenerPorcentaje(obj.criterio0.porcentaje)}&montoMinimo=${this.obtenerMontoMinimo(obj.criterio0.montoMinimo)}&estado=${obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}&paltaaplicacion=CP`);
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//     nuevo(){
//       this.parametro = {
//         pagina: 'nuevo',
//         id: null
//       }
//       this.sidebarActivo = true;
//     },

//     editar(id){
//       this.parametro = {
//         pagina: 'editar',
//         id: id
//       }
//       this.sidebarActivo = true;
//     },

//     ver(id){
//       this.parametro = {
//         pagina: 'ver',
//         id: id
//       }
//       this.sidebarActivo = true;
//     },

//     async cerrarSidebar(estado = true) {
//       this.$refs.VxSidebarPersonalized.closeSidebarExtern();
//       this.parametro = {};
//       this.sidebarActivo = false;
//       if (estado) {
//         await this.listar();
//       }
//     },

//     async verificarPeruLocal(){
//       let { data } = await this.requestApi(`verificar_peru_local`);
//       let response = data.data;
//       if (response.estado) {
//         if(!response.esLocal){
//           this.mensajePaisLocal = response.mensaje;
//           this.activarAlertaPaisLocal = true;
//         }
//       }
//     },

//     aceptarPaisLocal() {
//       this.activarAlertaPaisLocal = false;
//       setTimeout(() => { this.$router.push('/inicio') }, 10);
//     },

//     closeDialog() {
//       this.activarAlertaPaisLocal = false;
//       setTimeout(() => { this.$router.push('/inicio') }, 10);
//     },

//   },

//   async mounted() {
//     try {
//       this.$vs.loading({ type: "point" });
//       await this.verificarPeruLocal();
//       if(this.activarAlertaPaisLocal) return
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