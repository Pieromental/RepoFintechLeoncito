<template lang="pug">
  //- VuePerfectScrollbar( :settings="settings"  class="scroll-area"  ref="mainSidebarPs")

  //-   form(@submit.prevent="validar"  method="post"  data-vv-scope="registrarDetraccion" style="height:100%;")
  //-     div(class="mx-8 my-5")

  //-       div(class="vx-row ml-0")
  //-         span.title-header.uppercase.bold {{ $t(titulo) }}
  //-       vs-divider.mt-2

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Código')}}
  //-         span.font-label(v-if="nuevo") (4)
  //-           span.bold.font-label(style='color:#F74F51') *
  //-         vs-input.pt-1.w-full(size="small" ref="codigo" name="codigo"  v-model="detraccion.codigo"  v-validate="'required|max:4'"  data-vv-validate-on="blur|input" @blur="validarCodigo" @keyup.enter.prevent="validarCodigo"   @input="changeCodigo" v-mask="{mask:maskFuncion(4,'D'),tokens:{'D': {pattern: /[0-9a-zA-Z]+$/, transform: v => v.toLocaleUpperCase()},}}" autocomplete="off" :disabled="!nuevo")
  //-         span.text-danger.font-error(v-if="mensajeExisteCodigo") {{ $t(mensajeExisteCodigo) }}
  //-         span.text-danger.font-error(v-else) {{errors.first('registrarDetraccion.codigo')}}

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Descripción')}} 
  //-         span.font-label(v-if="!ver") (80)
  //-           span.bold.font-label(style='color:#F74F51') *
  //-         vs-input.pt-1.w-full(size="small" ref="descripcion" name="descripcion"  v-model="detraccion.descripcion"  v-validate="'required|max:80'"  data-vv-validate-on="blur|input"  v-mask="{ mask:maskFuncion(80,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/, transform: v => v.toLocaleUpperCase()}}}"  autocomplete="off" @blur="trimLabel('descripcion')" :disabled="ver")
  //-         span.text-danger.font-error(v-if="errors.has('registrarDetraccion.descripcion')") {{ errors.first("registrarDetraccion.descripcion") }}

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Porcentaje')}} 
  //-         span.font-label(v-if="!ver") (5)
  //-           span.bold.font-label(style='color:#F74F51') *
  //-         vs-input.pt-1.w-full(size="small" ref="porcentaje" name="porcentaje"  v-model="detraccion.porcentaje" v-validate="'required'" data-vv-validate-on="blur|input" v-mask="{mask:maskFuncion(6,'D'),tokens:{'D': {pattern: /[\\d.]/, transform: v => v.toLocaleUpperCase()},}}" @blur="completaDecimal(2,detraccion.porcentaje)" @keyup.enter.prevent="completaDecimal(2,detraccion.porcentaje)" @input="formato('porcentaje',$event,3,2)" @keyup="tamanioPorcentaje" autocomplete="off" :disabled="ver")
  //-         span.text-danger.font-error(v-if="errors.has('registrarDetraccion.porcentaje')") {{ errors.first("registrarDetraccion.porcentaje") }}

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Monto Mínimo')}} 
  //-         span.font-label(v-if="!ver")
  //-           span.bold.font-label(style='color:#F74F51') *
  //-         vs-input.pt-1.w-full(size="small" ref="montoMinimo" name="montoMinimo"  v-model="detraccion.montoMinimo" v-validate="'required'" data-vv-validate-on="blur|input" v-mask="{mask:maskFuncion(20,'D'),tokens:{'D': {pattern: /[\\d.]/, transform: v => v.toLocaleUpperCase()},}}" @blur="completaDecimal(4,detraccion.montoMinimo)" @keyup.enter.prevent="completaDecimal(4,detraccion.montoMinimo)" @input="formato('montoMinimo',$event,15,4)" autocomplete="off" :disabled="ver")
  //-         span.text-danger.font-error(v-if="errors.has('registrarDetraccion.montoMinimo')") {{ errors.first("registrarDetraccion.montoMinimo") }}

  //-       div.vx-col.mb-3
  //-         span.bold.font-label {{$t('Estado')}}
  //-         vs-radio.mr-3.ml-3.font-label(:disabled="ver" size="small" color="primary"  v-model="detraccion.estado" vs-name="detraccion.estado" :vs-value="true") {{$t('Activo')}}
  //-         vs-radio.mr-3.ml-3.font-label(:disabled="ver" size="small" color="primary"  v-model="detraccion.estado" vs-name="detraccion.estado" :vs-value="false") {{$t('Inactivo')}}
        
  //-       footer-datos(v-if="!nuevo" footerSidebar :footerSidebarVista="ver" :propDatos='footer')
  //-       footer-opciones(:sidebar="true"  @aceptar="validar"  :btnAceptar="!ver" @cancelar="cancelar(false)")

</template>

<script>

// import { Validator } from "vee-validate";
// import helperFunctions from "@/functions";
// import swal from "sweetalert2";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import request from "@/mixins/mixinRequest"
// import FooterDatos from "@/proyecto/componentes/extras/componentes/FooterDatos";
// import FooterOpciones from "@/proyecto/componentes/extras/componentes/FooterOpciones";

// const dictEs = {
//   custom: {
//     codigo: {
//       required: 'El código es requerido.',
//       max: 'Se requiere digitar 4 caracteres.'
//     },
//     descripcion: {
//       required: 'La descripción es requerida.',
//       max: 'Longitud máxima de 80 caracteres.'
//     },
//     porcentaje: {
//       required: 'El porcentaje es requerido.'
//     },
//     montoMinimo: {
//       required: 'El monto mínimo es requerido.'
//     }
//   }
// };

// const dictEn = {
//   custom: {
//     codigo: {
//       required: 'The code is required.',
//       min: 'It is required to type 4 characters.'
//     },
//     descripcion: {
//       required: 'Description is required.',
//       max: 'Maximum length of 80 characters.'
//     },
//     porcentaje: {
//       required: 'Percentage is required.',
//     },
//     montoMinimo: {
//       required: 'Minimum amount is required.'
//     }
//   }
// };

// export default {

//   name: "Formulariodetraccion",
//   mixins: [request],
//   components: {
//     VuePerfectScrollbar,
//     FooterDatos,
//     FooterOpciones,
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
//       return this.parametro.pagina != null ? this.parametro.pagina == 'nuevo' ? 'NUEVA DETRACCIÓN' : this.parametro.pagina == 'editar' ? 'MODIFICAR DETRACCIÓN': 'DETRACCIÓN [MODO VISTA]' : '' ;
//     },
//     limpiarNumero(){
//       return this.detraccion.codigo;
//     },
//   },
  
//   watch: {
//     limpiarNumero(val){
//       if(val){
//         this.mensajeExisteCodigo = '';
//       }
//     },
//   },

//   methods: {

//     getDefaultData(){
//       return {
//         detraccion: {
//           id:'',
//           codigo: '',
//           descripcion:'',
//           porcentaje: "",
//           montoMinimo: "",
//           estado: true
//         },
//         nuevo: false,
//         editar : false,
//         ver : false,
//         settings: {
//           maxScrollbarLength: 60,
//           wheelSpeed: 0.6
//         },
//         mensajeExisteCodigo: '',
//         isMounted:false,
//         footer:{},
//         tempCodigo: '',
//       }
//     },

//     trimLabel(name) {
//       this.detraccion[name] = this.detraccion[name].trim();
//     },

//     tamanioPorcentaje() {
//       if (parseFloat(this.detraccion.porcentaje) > 100) {
//         this.detraccion.porcentaje = '';
//       }
//     },

//     changeCodigo() {
//       this.mensajeExisteCodigo = null;
//     },

//     formato(type, val, lEnt, lDec) {
//       if (val.length) {
//         let split = val.split('.');
//         if (split.length == 1) {
//           if (split[0].length > lEnt) {
//             if(type=="porcentaje") this.detraccion.porcentaje = this.detraccion.porcentaje.substring(0, lEnt);
//             if(type=="montoMinimo") this.detraccion.montoMinimo = this.detraccion.montoMinimo.substring(0, lEnt);
//           }
//           return;
//         }
//         if (split.length == 2) {
//           if (split[1].length > lDec) {
//             split[1] = split[1].substring(0, lDec);
//             if(type=="porcentaje") this.detraccion.porcentaje = split.join('.');
//             if(type=="montoMinimo") this.detraccion.montoMinimo = split.join('.');
//           }
//           return;
//         }
//         if (split.length > 2) {
//           split.pop();
//           if(type=="porcentaje") this.detraccion.porcentaje = split.join('.');
//           if(type=="montoMinimo") this.detraccion.montoMinimo = split.join('.');
//           return;
//         }
//       }
//     },

//     async cargarDatos(id) {
//       if(id != null){
//         try {
//           let { data } = await this.requestApi(`ver_detraccion?id=${id}`);
//           let response = data.data;
//           if(response.estado){
//             this.detraccion.id = id;
//             Object.assign(this.detraccion,response.data[0]);
//             this.footer = response.data[0].footer;
//             delete this.detraccion.footer;
//           }
//         } catch (error) {
//           throw new Error(error);
//         } 
//       }
//     },

//     async validarCodigo(){
//       try {
//         if(this.detraccion.codigo){
//           if(!this.nuevo) return
//           if(this.tempCodigo == this.detraccion.codigo) return
//           this.$vs.loading({ type: 'point' });
//           let { data } = await this.requestApi(`verificar_codigo_detraccion?codigo=${this.detraccion.codigo}`);
//           let response = data.data || null;
//           if (response.estado) {
//             this.mensajeExisteCodigo = response.mensaje;
//             this.detraccion.codigo = '';
//             this.$refs.codigo.focusInput();
//             this.tempCodigo = '';
//           } else {
//             this.mensajeExisteCodigo = '';
//             this.tempCodigo =  this.detraccion.codigo;
//           }
//         }else{
//           this.mensajeExisteCodigo = '';
//         }
//       } catch (error) {
//          throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },

//     completaDecimal(lmax, val){
//       if(val.length){
//         let temp = val.indexOf('.');
//         let num = 0;
//         if(temp==-1){
//           if(lmax==2)  this.detraccion.porcentaje = this.detraccion.porcentaje+".00";
//           if(lmax==4)  this.detraccion.montoMinimo = this.detraccion.montoMinimo+".0000";
//         }else{
//           num = val.length - (temp+1);
//           let add = "";
//           while(num!=lmax){
//             add = add+"0"
//             num++
//           }
//           if(lmax==2)  this.detraccion.porcentaje = this.detraccion.porcentaje+add;
//           if(lmax==4)  this.detraccion.montoMinimo = this.detraccion.montoMinimo+add;
//         }
//       }
//     },

//     maskFuncion(numero, token) {
//       return helperFunctions.longitudMaskNumero(numero, token);
//     },

//     showErrors() {
//       let array = this.$validator.errors.items;
//       if(array.length){
//         setTimeout(() => { this.$refs[array[0].field].focusInput(); }, 500);
//         let data = {
//           estado: false,
//           mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'),
//           tipoMEnsaje: 'TMSGADV',
//         }
//         this.responseRequest(data);
//       }
//     },

//     async validar() {
//       this.showErrors();
//       let valid = await this.$validator.validateAll("registrarDetraccion");
//       if (valid) {
//         let mensaje = this.nuevo ? this.$t("¿Desea guardar el registro?") : this.$t("¿Desea actualizar el registro?");
//         let status = await swal.fire({ title: this.$t("Mensaje de Sistema"), text: mensaje, showCancelButton: true, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
//         if (status.value) {
//           let response = this.nuevo ? await this.registrar() : await this.actualizar();
//           if(response.data.estado){
//             this.responseRequest(response.data);
//             this.cancelar();
//           }else{
//             this.sweetAlert(response.data);
//           }
//         }
//       }
//     },

//     async registrar() {
//       try {
//         this.$vs.loading({ type: "point" });
//         let post = this.detraccion;
//         let { data } = await this.requestApi("registrar_detraccion", post, "POST");
//         return data;
//       } catch (error) {
//          throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       } 
//     },

//     async actualizar() {
//       try {
//         this.$vs.loading({ type: "point" });
//         let put = this.detraccion;
//         delete put.codigo;
//         let { data } = await this.requestApi("actualizar_detraccion", put, "PUT");
//         return data;
//       } catch (error) {
//          throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }  
//     },

//     cancelar(estado) {
//       this.$emit("cancelar", estado);
//       this.errors.clear("registrarDetraccion");
//       this.limpiar();
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
//     },
   
//     activarFoco(){
//       if(this.nuevo) setTimeout(() => { this.$refs.codigo.focusInput(); }, 500);
//       if(this.editar) setTimeout(() => { this.$refs.descripcion.focusInput(); }, 500);
//     }

//   },

//   async mounted() {
//     try{
//       this.$vs.loading({ type: "point" });
//       this.validarRuta(this.parametro.pagina);
//       await this.cargarDatos(this.parametro.id);
//       this.activarFoco();
//       this.isMounted=true;
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