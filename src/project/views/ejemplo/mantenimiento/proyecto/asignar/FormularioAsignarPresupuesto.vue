<template lang="pug">

  //- VuePerfectScrollbar( :settings="settings"  class="scroll-area"  ref="mainSidebarPs")
  //-   form(@submit.prevent="validar"  method="post"  data-vv-scope="registrarPresupuesto" style="height:100%;")

  //-     div(class="mx-8 my-5")

  //-       div(class="vx-row ml-0")
  //-         span.title-header.uppercase.bold {{ $t(titulo) }}
  //-       vs-divider.mt-2

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Cuenta Contable')}}
  //-         span.font-label(v-if="!ver" style='color:#F74F51') *
  //-         div.vx-col.vs-align-items
  //-           vs-input.pt-1.w-full(size="small" ref="cuentaContable" name="cuentaContable" :placeholder="$t('Código')" v-model="presupuesto.cuentaContable" v-validate="'required'" data-vv-validate-on="blur|input" v-mask="{mask: maskFuncion(digitosCuenta,'E'),tokens:{'E': { pattern: /[\\d.-]/}}}" @keyup.enter.prevent="verificarCuentaContable(presupuesto.cuentaContable)" @blur="verificarCuentaContable(presupuesto.cuentaContable)" autocomplete="off" :disabled="ver")
  //-           vs-button.ml-4( size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" @click="openPopupCuentaContable")
  //-         span.text-danger.font-error(v-if="mensajeCuentaContable") {{ $t(mensajeCuentaContable) }}
  //-         span.text-danger.font-error(v-else) {{ errors.first("registrarPresupuesto.cuentaContable") }}
  //-         vs-input.pt-1.w-full(size="small" :placeholder="$t('Descripción')" v-model="presupuesto.cuentaContableDescripcion" disabled)
          
  //-       div.vx-col.mb-3
  //-         span.font-label.bold {{$t('Año')}}
  //-         span.font-label(v-if="!ver" style='color:#F74F51') *
  //-         v-select.w-full.font-label.pt-1(name="anio" :options='opcionAnio' label="codigo" v-model='anioSeleccionado' :placeholder="$t('Seleccione Año')" :disabled="ver")
  //-           template(slot="selected-option" slot-scope="option")
  //-             span {{option.codigo}}
  //-           template(slot='option' slot-scope='option')
  //-             span {{option.codigo}}
  //-           template(slot='no-options')
  //-             small {{$t('No se encontraron resultados')}}          
  //-         span.text-danger.font-error(v-if="mensajeAnio") {{ $t(mensajeAnio) }}
              
  //-       div.vx-col.mb-3
  //-         span.font-label.bold {{$t('Monto')}}
  //-         span.font-label(v-if="!ver" style='color:#F74F51') *
  //-         vs-input.pt-1.w-full(size="small" ref="monto" name="monto" v-model="presupuesto.monto" v-validate="'required'" data-vv-validate-on="blur|input" v-mask="{mask: maskFuncion(20,'E'),tokens:{'E': { pattern: /[\\d.]/}}}" @input="formato($event,15,4)" autocomplete="off" :disabled="ver")
  //-         span.text-danger.font-error(v-if="errors.has('registrarPresupuesto.monto')") {{ errors.first("registrarPresupuesto.monto") }}

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Estado')}}
  //-         vs-radio.mr-3.ml-3.font-label(:disabled="ver" size="small" color="primary"  v-model="presupuesto.estado" vs-name="presupuesto.estado" :vs-value="true") {{$t('Activo')}}
  //-         vs-radio.mr-3.ml-3.font-label(:disabled="ver" size="small" color="primary"  v-model="presupuesto.estado" vs-name="presupuesto.estado" :vs-value="false") {{$t('Inactivo')}}
        
  //-       footer-opciones(:sidebar="true"  @aceptar="validar"  :btnAceptar="!ver" @cancelar="cancelar()")

  //-   popup-cuenta-contable-formulario(:popupActive="popupActiveCuentaContable" :company="company" :lengthRestriction="digitosCuenta" @selectedAccount="selectedAccount" @closePopup="closePopup" )

</template>

<script>

// import helperFunctions from "@/functions";
// import swal from "sweetalert2";
// import request from "@/mixins/mixinRequest";
// import parametros from '@/mixins/mixinParametros';
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import { Validator } from "vee-validate";
// import vSelect from 'vue-select';
// import FooterOpciones from "@/proyecto/componentes/extras/componentes/FooterOpciones";
// import PopupCuentaContableFormulario from "@/proyecto/componentes/maestro/contabilidad/proyecto/popup/PopupCuentaContableFormulario.vue";

// const dictEs = {
//   custom: {
//     cuentaContable: {
//       required: "La Cuenta Contable es requerida.",
//     },
//     monto: {
//       required: "El Monto es requerido.",
//     },
//   }
// };

// const dictEn = {
//   custom: {
//     cuentaContable: {
//       required: "The Accounting Account is required.",
//     },
//     monto: {
//       required: 'Amount is required.'
//     },
//   }
// };

// export default {

//   name: "FormularioAsignarPresupuesto",
//   mixins: [request,parametros],

//   components: {
//     VuePerfectScrollbar,
//     vSelect,
//     FooterOpciones,
//     PopupCuentaContableFormulario,
//   },

//   props: {
//     parametro: {
//       type: Object,
//       default: () => {}
//     },
//   },

//   data() {
//     return this.getDefaultData();
//   },

//   computed:{
//     titulo(){
//       return this.parametro.pagina != null ? this.parametro.pagina == 'nuevo' ? 'NUEVO PRESUPUESTO' : this.parametro.pagina == 'editar' ? 'MODIFICAR PRESUPUESTO': 'VER PRESUPUESTO [MODO VISTA]' : '' ;
//     },
//   },

//   watch: {
//     anioSeleccionado(val){
//       if(val){
//         this.mensajeAnio = '';
//       }
//     },
//   },

//   methods: {

//     getDefaultData(){
//       return {
//         presupuesto: {
//           cuentaContable: '',
//           cuentaContableDescripcion: '',
//           monto: '',
//           estado: true,
//         },

//         tmpCuenta:'',
//         mensajeCuentaContable: '',
//         digitosCuenta: 0,

//         popupActiveCuentaContable: false,
//         company: '',
//         multiple: false,

//         opcionAnio: [],
//         anioSeleccionado: '',
//         mensajeAnio: '',

//         nuevo: false,
//         editar: false,
//         ver: false,
//         index: '',
//         settings: {
//           maxScrollbarLength: 60,
//           wheelSpeed: 0.6
//         },
//       }
//     },

//     async verificarCuentaContable(value) {
//       if (value) {
//         try {
//           if(!this.parametro.compania) return
//           if(this.tmpCuenta == value) return
//           this.$vs.loading({ type: 'point' });
//           let {data} = await this.requestApi(`buscar_cuenta_contable_codigo_familia?id=${value}&compania=${this.parametro.compania}`);
//           let response = data.data;
//           if (!response.estado) {
//             this.presupuesto.cuentaContable = '';
//             this.presupuesto.cuentaContableDescripcion = '';
//             this.mensajeCuentaContable = response.mensaje;
//             this.tmpCuenta = '';
//             this.$refs.cuentaContable.focusInput();
//           } else {
//             this.presupuesto.cuentaContable = response.data[0].id;
//             this.presupuesto.cuentaContableDescripcion = response.data[0].descripcion;
//             this.mensajeCuentaContable = '';
//             this.tmpCuenta = value;
//           }
//         } catch (error) {
//           throw new Error(error);
//         } finally{
//           this.$vs.loading.close();
//         }
//       }else{
//         this.tmpCuenta = '';
//         this.presupuesto.cuentaContable = '';
//         this.presupuesto.cuentaContableDescripcion = '';
//         this.mensajeCuentaContable = '';
//       }
//     },

//     openPopupCuentaContable(val){
//       this.company = this.parametro.compania ? this.parametro.compania:'';
//       this.popupActiveCuentaContable = true;
//     },

//     selectedAccount(value){
//       this.presupuesto.cuentaContable = value.idCuentaContable;
//       this.presupuesto.cuentaContableDescripcion = value.cuentaContable;
//       this.tmpCuenta = value.idCuentaContable;
//       this.mensajeCuentaContable = '';
//       this.popupActiveCuentaContable = false;
//     },

//     closePopup() {
//       this.popupActiveCuentaContable = false;
//     },

//     formato(val, lEnt, lDec) {
//       if (val.length) {
//         let split = val.split('.');
//         if (split.length == 1) {
//           if (split[0].length > lEnt) {
//             this.presupuesto.monto = this.presupuesto.monto.substring(0, lEnt);
//           }
//           return;
//         }
//         if (split.length == 2) {
//           if (split[1].length > lDec) {
//             split[1] = split[1].substring(0, lDec);
//             this.presupuesto.monto = split.join('.');
//           }
//           return;
//         }
//         if (split.length > 2) {
//           split.pop();
//           this.presupuesto.monto = split.join('.');
//           return;
//         }
//       }
//     },
    
//     maskFuncion(numero, token) {
//       return helperFunctions.longitudMaskNumero(numero, token);
//     },

//     // VALIDACIONES PARA HACER REGISTROS

//     showErrors() {

//       let array = this.$validator.errors.items;
//       if(array.length){
//         let primero = array[0];
//         array.forEach( element => {
//           if( Number(primero.id)>Number(element.id)){
//             primero = element;
//           }
//         });
//         setTimeout(() => { this.$refs[primero.field].focusInput(); }, 500);
//       }

//       let statusRequerido = true;
//       if(!this.anioSeleccionado){
//         this.mensajeAnio = 'El Año es requerido.';
//         statusRequerido = false;
//       }
      
//       let statusValidacion = true;
//       if(this.parametro.validar){
//         if(this.anioSeleccionado && this.presupuesto.cuentaContable){
//           this.parametro.validar.forEach( (element,indexr) => {
//             if( this.anioSeleccionado.id==element.anio && this.presupuesto.cuentaContable==element.cuentaContable){
//               if(this.editar){
//                 if(indexr!=this.parametro.data.index) statusValidacion = false;
//               }else{
//                 statusValidacion = false;
//               }
//             }
//           });
//         }
//       }

//       if( array.length || !statusRequerido ){
//         this.notification(this.$t('Advertencia'), this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'), 'warning',5000,'icon-alert-circle');
//         return true;
//       } else if(!statusValidacion){
//         this.anioSeleccionado = '';
//         this.notification(this.$t('Advertencia'), this.$t('El año y la cuenta contable ya fueron agregadas. Debe ingresar un año o cuenta contable diferente(s).'), 'warning',5000,'icon-alert-circle');
//         return true;
//       } else {
//         return false;
//       }

//     },

//     async validar() {
//       let valid = await this.$validator.validateAll("registrarPresupuesto");
//       if(this.showErrors()) return
//       if (valid) {
//         let post = {};
//         post.cuentaContableId = this.presupuesto.cuentaContable;
//         post.cuentaContableDescripcion = this.presupuesto.cuentaContableDescripcion;
//         post.anioId = this.anioSeleccionado.id;
//         post.anioCodigo = this.anioSeleccionado.codigo;
//         post.anioDescripcion = this.anioSeleccionado.label;
//         post.monto = this.presupuesto.monto;
//         post.estado = this.presupuesto.estado;
//         if(this.editar){
//           post.index = this.index;
//           this.$emit('editRow', post);
//         }else{
//           this.$emit('addRow', post);
//         }
//         this.cancelar();
//       }
//     },
    
//     cancelar() {
//       this.$emit("cancelar");
//       this.errors.clear("registrarPresupuesto");
//       this.limpiar();
//     },
    
//     async cargarAnio(){
//       try {
//         let {data} = await this.requestApi(`cargar_anio`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element =>{ return element.object.estado == true});
//           this.opcionAnio = filter.map(element =>{
//             return {
//               id: element.id,
//               label: element.label,
//               codigo: element.object.codigo
//             }
//           })
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarDatos(data) {
//       if(data != null){
//         try {
//           this.index = data.index ? data.index:'';
//           this.presupuesto.cuentaContable = data.cuentaContableId;
//           this.presupuesto.cuentaContableDescripcion = data.cuentaContableDescripcion;
//           this.anioSeleccionado = data.anioId ? {
//             id: data.anioId,
//             label: data.anioDescripcion,
//             codigo: data.anioCodigo,
//           } : '';
//           this.presupuesto.monto = data.monto;
//           this.presupuesto.estado = data.estado;
//         } catch (error) {
//           throw new Error(error);
//         }
        
//       }
//     },

//     async validarParametro(){
//       try {
//         let {DIGULNIVPC} = await this.obtenerParametros(['DIGULNIVPC']);
//         this.digitosCuenta = parseFloat(DIGULNIVPC ? DIGULNIVPC.parametroNumero : 0);
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     validarRuta(nombre){
//       switch (nombre){
//         case 'nuevo':
//           return this.nuevo = true;
//         case 'editar':
//           return this.editar = true;
//         case 'ver':
//           return this.ver = true;
//       }
//     },
    
//     limpiar(){
//       Object.assign(this.$data,this.getDefaultData());
//     }
//   },

//   async mounted() {
//     try {
//       this.$vs.loading({ type: "point" });
//       await this.validarParametro();
//       this.validarRuta(this.parametro.pagina);
//       this.cargarAnio();
//       this.cargarDatos(this.parametro.data)
//     } catch (error) {
//       throw new Error(error);
//     } finally{
//       this.$vs.loading.close();
//     }
   
//   },

//   updated() {
//     if (this.$i18n.locale == 'es')
//       Validator.localize(this.$i18n.locale, dictEs);
//     else
//       Validator.localize(this.$i18n.locale, dictEn);
//   }
// };

</script>

<style>

</style>
