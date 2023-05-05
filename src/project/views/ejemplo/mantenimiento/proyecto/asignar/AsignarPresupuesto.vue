<template lang="pug">
  //- div#parentxTabla
  //-   cabecera(:titulo="`${$t('Asignar Presupuesto(s)')}`" @aceptar='guardar' @cancelar='cancelar' :btnAceptar="isguardar" :btnCancelar="true" :btnNuevo="false" :btnExportar="false" :btnListarTodo="false" :btnFiltrar="false")
  //-   vx-card.card-sticky
  //-     div
  //-       div.w-full.px-4
  //-         div.w-full.pt-3
  //-           div.bold.colorTitulo
  //-             span {{$t('PROYECTO')}}
  //-         div.w-full.pt-3.px-4.alinearItems
  //-           div
  //-             span.font-label.fuenteEtiqueta CÓDIGO: 
  //-           div.ml-3
  //-             span.font-label {{ proyecto.codigo }}
  //-         div.w-full.pt-3.px-4.alinearItems
  //-           div
  //-             span.font-label.fuenteEtiqueta DESCRIPCIÓN: 
  //-           div.ml-3
  //-             span.font-label {{ proyecto.descripcion }}
              
  //-   vx-card.card-sticky-floating
  //-     div.vx-row.mb-3.w-full.ml-0.mr-0
  //-       vx-table.style-vxtable(idRef="listaPersonaRelacionada" btnPopup max-content ref="containerTable" @activeRows="" @deactivateRows="" @removeRows=""  :title="''" @popupAgregar="nuevo" v-model="seleccionados" header-sticky header-table search pagination rowsPage :arrayRows='[25,50,100]' :data="listado"  :no-data-text="`${$t('No se encontraron registros')}`")
  //-         template(slot="container")
  //-         div.vx-row
  //-           formulario-asignar( ref="refFormularioSocio")
  //-         template(slot="thead")
  //-           vx-th.uppercase( min-width="130" center) {{$t('Acciones')}}
  //-           vx-th.uppercase( min-width="130" sort-key="codigo") {{$t('Código')}}
  //-           vx-th.uppercase( min-width="200" sort-key="cuentaContableId") {{$t('Cuenta Contable')}}
  //-           vx-th.uppercase( min-width="130" sort-key="anioCodigo") {{$t('Año')}}
  //-           vx-th.uppercase( min-width="200" sort-key="monto") {{$t('Monto')}}
  //-           vx-th.uppercase( min-width="105" sort-key='estado') {{$t('Estado')}}
  //-         template(slot-scope="{data}")
  //-           tbody(class="table-text-sm")
  //-             vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
  //-               vx-td.text-center
  //-                 .d-f.vs-justify-center
  //-                   feather-icon.style-icon(v-if="tr.estado" v-on:click.stop="deshabilitar(indextr)"  :title="$t('Deshabilitar')"  icon='ToggleRightIcon' type="flat")
  //-                   feather-icon.style-icon(v-else v-on:click.stop="deshabilitar(indextr)" :title="$t('Habilitar')"   icon='ToggleLeftIcon' type="flat")
  //-                   feather-icon.style-icon(v-if="!tr.id" @click.stop="editar(tr)" :title="`${$t('Modificar')}`" icon="Edit3Icon" )
  //-                   feather-icon.style-icon(v-if="!tr.id" v-on:click.stop="eliminar(indextr)" :title="$t('Eliminar')" icon='Trash2Icon' type="flat")
  //-               vx-td.text-left(:data='tr.codigo') {{ tr.codigo }}
  //-               vx-td.text-left(:data='tr.cuentaContableId') {{ tr.cuentaContableId }}
  //-               vx-td.text-right(:data='tr.anioCodigo') {{ tr.anioCodigo }}
  //-               vx-td.text-right(:data='tr.monto') {{tr.monto}}
  //-               vx-td.text-center(:data="tr.estado")
  //-                 span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
  //-                 span(v-else class="justify-center") {{$t('INACTIVO')}}
  //-   vx-sidebar-personalized.sidebarx(:width="30" @cerrar="cerrarSidebar" v-model="sidebarActivo" :click-not-close="true" color="primary" spacer ref="VxSidebarPersonalized" parent="#parentxTabla")
  //-     formulario-asignar-presupuesto( @cancelar='cerrarSidebar' :parametro.async="parametro" @addRow="addRow" @editRow="editRow")
       
</template>

<script>

// import request from "@/mixins/mixinRequest";
// import parametros from "@/mixins/mixinParametros";
// import helperFunctions from "@/functions";
// import swal from 'sweetalert2';
// import Cabecera from "@/proyecto/vistas/header.vue";
// import TituloInterfaz from "@/proyecto/componentes/extras/componentes/TituloInterfaz.vue";
// import HeaderTable from "@/proyecto/componentes/extras/componentes/HeaderTable.vue";
// import VxSidebarPersonalized from "@/components/VxSidebarPersonalized";
// import FormularioAsignarPresupuesto from "@/proyecto/componentes/maestro/contabilidad/proyecto/asignar/FormularioAsignarPresupuesto.vue";

// export default {

//   name: "AsignarPersonaRelacionada",
//   mixins: [request, parametros],

//   components: {
//     Cabecera,
//     TituloInterfaz,
//     HeaderTable,
//     VxSidebarPersonalized,
//     FormularioAsignarPresupuesto
//   },

//   data() {
//     return {
//       listarPresupuesto: [],
//       proyecto: [],
//       seleccionados: [],
//       parametro: {},
//       sidebarActivo: false,
//       isguardar: false,
//       isMounted: false,
//     };
//   },

//   computed: {
//     listado() {
//       if (this.listarPresupuesto.length) {
//         this.isguardar = true;
//       } else {
//         this.isguardar = false;
//       }
//       return this.listarPresupuesto;
//     }
//   },

//   methods: {

//     async cerrarSidebar() {
//       this.$refs.VxSidebarPersonalized.closeSidebarExtern();
//       this.parametro = {};
//       this.sidebarActivo = false;
//     },

//     nuevo(){
//       let validar = [];
//       this.listarPresupuesto.forEach( element=>{
//         validar.push({
//           anio: element.anioId,
//           cuentaContable: element.cuentaContableId,
//         });
//       });
//       this.parametro = {
//         pagina: 'nuevo',
//         data: null,
//         compania: this.proyecto.idCompania ? this.proyecto.idCompania:'',
//         validar: validar,
//       }
//       this.sidebarActivo = true;
//     },

//     editar(tr){
//       let validar = [];
//       this.listarPresupuesto.forEach( element=>{
//         validar.push({
//           anio: element.anioId,
//           cuentaContable: element.cuentaContableId,
//         });
//       });
//       this.parametro = {
//         pagina: 'editar',
//         data: tr,
//         compania: this.proyecto.idCompania ? this.proyecto.idCompania:'',
//         validar: validar,
//       }
//       this.sidebarActivo = true;
//     },

//     ver(id){
//       this.parametro = {
//         pagina: 'ver',
//         data: tr,
//       }
//       this.sidebarActivo = true;
//     },

//     addRow(presupuesto){
//       this.popupActive = false;
//       presupuesto.codigo = Number(this.listarPresupuesto.length) + 1;
//       presupuesto.index = this.listarPresupuesto.length;
//       this.listarPresupuesto.push(presupuesto);
//     },

//     editRow(presupuesto){
//       let tmpListado = this.listarPresupuesto;
//       this.listarPresupuesto = [];
//       tmpListado.forEach( (element,index) => {
//         if(presupuesto.index != index){
//           this.listarPresupuesto.push(element);
//         }else{
//           presupuesto.codigo = Number(index) + 1;
//           this.listarPresupuesto.push(presupuesto);
//         }
//       });
//       this.popupActive = false;
//     },

//     async eliminar(indextr) {
//       let status = await swal.fire({ title: "Mensaje del Sistema", text: "¿Está seguro de que desea eliminar el presupuesto?", showConfirmButton: true, showCancelButton: true, confirmButtonText: "Sí", cancelButtonText: "No" });
//       if(!status.value) return
//       let tmpListado = this.listarPresupuesto;
//       this.listarPresupuesto = [];
//       let newIndex = 0;
//       tmpListado.forEach( (element,index) => {
//         if(indextr != index){
//           element.index = newIndex;
//           if(!element.id) element.codigo = newIndex+1;
//           this.listarPresupuesto.push(element);
//           newIndex = newIndex+1;
//         }
//       });
//     },

//     async deshabilitar(indextr) {
//       this.listarPresupuesto.forEach( (element,index) => {
//         if( indextr==index ){
//           element.estado = !element.estado;
//         }
//       });
//     },

//     async listar() {
//       try {
//         if(this.isMounted) this.$vs.loading({ type: "point" });
//         let id = this.$route.params.id ? this.$route.params.id : null;
//         if(id != null){
//           let {data} = await this.requestApi(`listar_presupuesto_proyecto?idProyecto=${id}`);
//           let response = data.data;
//           if(response.estado){
//             this.listarPresupuesto = response.data;
//           }else{
//             this.listarPresupuesto = [];
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally{
//         if(this.isMounted) this.$vs.loading.close();
//       }
//     },

//     async verProyecto(){
//       try {
//         let id = this.$route.params.id ? this.$route.params.id : null;
//         if(id != null){
//           let {data} = await this.requestApi(`ver_proyecto?id=${id}`);
//           let response = data.data;
//           if(response.estado){
//             this.proyecto = response.data[0];
//           }else{
//             this.proyecto = [];
//             this.cancelar();
//           }
//         }else{
//           this.cancelar();
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async guardar(){
//       try {
//         let mensaje = this.$t("¿Desea guardar el registro?");
//         let status = await swal.fire({ title: this.$t("Mensaje del Sistema"), text: mensaje, showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
//         if (status.value) {
//           let response = await this.asignar();
//           if(response.data.estado){
//             this.responseRequest(response.data);
//             this.cancelar();
//           }else{
//             this.sweetAlert(response.data);
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async asignar(){
//       this.$vs.loading({ type: "point" });
//       try {
//         let post = {};
//         post.idProyecto = this.$route.params.id;
//         let lista = [];
//         this.listarPresupuesto.forEach( element => {
//           lista.push({
//             id: element.id ? element.id:null,
//             idCuentaContable:element.cuentaContableId,
//             idAnio: element.anioId,
//             monto: element.monto,
//             estado: element.estado
//           })
//         });
//         post.presupuestoProyecto = lista;
//         console.log("post=>",post);
//         let { data } = await this.requestApi("asignar_presupuesto_proyecto", post, "POST");
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//     cancelar() {
//       this.$router.push(`/proyecto`);
//     },

//   },
//   async mounted() {
//     try {
//       this.$vs.loading({ type: "point" });
//       await this.verProyecto();
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

<style>
/* 
.alinearItems{
  display: flex;
  align-items: center;
}
.colorTitulo{
  color: rgba(var(--vs-primary), 1);
}
.fuenteEtiqueta{
  font-weight: 600;
} */

</style>