<template lang="pug">
  div
    form.w-full
      div.vx-row.mb-3        
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Código')}} 
          span.font-label (15)
            span.font-label.bold.text-danger  *
        div.vx-col.w-full(class="sm:w-1/2")
          texts-box.pt-1.w-full(autocomplete = "off" size="small" id="codigo" ref="codigo" name="codigo" @focus="focus('codigo')" v-model="detalleMaster.codigo" v-mask="{ mask:maskFuncion(15,'D'),tokens:{'D': {pattern: /[0-9a-zA-Z_]/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarCodigo()" :disabled="editar||ver")          
          span.font-error.text-danger(v-if="mensajeCodigo") {{ $t(mensajeCodigo) }}
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Descripción')}} 
          span.font-label (150)
            span.font-label.bold.text-danger  *
        div.vx-col.w-full(class="sm:w-1/2")
          texts-box.pt-1.w-full( autocomplete="off" size="small" id="descripcion" ref="descripcion" name="descripcion" @focus="focus('descripcion')" v-model="detalleMaster.descripcion"  v-mask="{ mask:maskFuncion(150,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}" @blur="validarDescripcion()" :disabled="ver")          
          span.font-error.text-danger(v-if="mensajeDescripcion") {{ $t(mensajeDescripcion) }}
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Estado')}}
            span.font-label.bold.text-danger  *
        div.vx-col.w-full.vs-align-items(class="sm:w-1/2")
          radio-button.mr-3.ml-3(:disabled="ver" v-model="detalleMaster.estado" vs-name="detalleMaster.estado" :vs-value="true") {{$t('Activo')}}
          radio-button.mr-3.ml-3(:disabled="ver" v-model="detalleMaster.estado" vs-name="detalleMaster.estado" :vs-value="false") {{$t('Inactivo')}}
      div.vx-col.w-full.mb-5(v-if="!nuevo")
        footer-datos(:items='footer')
      footer-button(:sidebar="true"  @aceptar="validar" @cancelar="cancelarDetalle" :btnAceptar="!ver")
      
</template>

<script>

import helperFunctions from "@/functions";
import TextsBox from '@/components/fields/input/TextsBox.vue';
import request from "@/mixins/mixinRequest"
import FooterButton from '@/components/footer/FooterButton.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
import FooterDatos from '@/components/footer/FooterData';

export default {

  name: "DetalleFormulario",
  mixins: [request],
  components: {
    FooterButton,
    TextsBox,
    RadioButton,
    FooterDatos
  },
  props: {
    typeDetalle: {
      type: String,
      default: ''
    },
    dataDetalle: {
      type: Object,
      default: () => {}
    },
    listadoDetalle: {
      type: Array,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return this.getDefaultData()
  },
  
  watch: {

    typeDetalle(val){
      switch (val) {
        case "nuevo":
          this.nuevo = true;
          this.editar = false;
          this.ver = false;
          return
        case "editar":
          this.nuevo = false;
          this.editar = true;
          this.ver = false;
          return
        case "ver":
          this.nuevo = false;
          this.editar = false;
          this.ver = true;
          return
      }
    },

    dataDetalle(val){  
      if(val){
        this.detalleMaster.id = val.id;
        this.detalleMaster.codigo = val.codigo;
        this.detalleMaster.descripcion = val.descripcion;
        this.detalleMaster.estado = val.estado;
        if(this.ver){
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:val.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:val.footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value:val.footer_usuariobo_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:val.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:val.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:val.footer_usuariobo_actualizacion }
          ];
        }
        if(this.editar){
          this.footer = [
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:val.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:val.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:val.footer_usuariobo_actualizacion }
          ];
        }        
      }else{
        this.detalleMaster.id = "";
        this.detalleMaster.codigo = "";
        this.detalleMaster.descripcion = "";
        this.detalleMaster.estado = true;
      }      
    },    
  },

  methods:{

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    blur(element) {
      if (this[element] == "") {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },

    getDefaultData(){
      return {
        detalleMaster: {
          id:'',
          codigo: '',
          descripcion: '',
          estado: true,
        },
        mensajeCodigo: '',
        mensajeDescripcion: '',
        nuevo: false,
        editar: false,
        ver: false,
        footer:[]
      }
    }, 

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    validarCodigo(){
      if(this.detalleMaster.codigo){
        this.mensajeCodigo = "";
      }else{
        this.mensajeCodigo = "El código es requerido.";
      }
    },

    validarDescripcion(){
      if(this.detalleMaster.descripcion){
        this.mensajeDescripcion = "";
      }else{
        this.mensajeDescripcion = "La descripción es requerida.";
      }
    },

    showErrors() {
      if (!this.editar) {
        if(this.detalleMaster.codigo){
          if( this.listadoDetalle.filter( (e) =>  e.codigo == this.detalleMaster.codigo ).length == 0 ){
            this.mensajeCodigo = "";
          }else{          
            this.mensajeCodigo = "El código digitado ya existe para la tabla máster. Debe ingresar un código diferente.";
            setTimeout(() => { this.detalleMaster.codigo=""; this.$refs.codigo.focusInput() }, 500);
          }    
        }else{
          this.mensajeCodigo = "El código es requerido.";
        }        
      }else{
        if(this.detalleMaster.codigo){
          this.mensajeCodigo = "";
        }else{
          this.mensajeCodigo = "El código es requerido.";
        }
      }

      if(this.detalleMaster.descripcion){
        this.mensajeDescripcion = "";
      }else{
        this.mensajeDescripcion = "La descripción es requerida.";
      }
      
      if( !this.mensajeCodigo && !this.mensajeDescripcion) return false;
      else return true;
    },

    async validar() {
      if(this.showErrors()) return
      if(this.typeDetalle == "nuevo"){
        let post = {};
        post.id = this.detalleMaster.id;
        post.codigo = this.detalleMaster.codigo;
        post.descripcion = this.detalleMaster.descripcion;
        post.estado = this.detalleMaster.estado;
        this.listadoDetalle.push(post)
        this.cancelarDetalle();
      }else{
        this.listadoDetalle[this.index].descripcion = this.detalleMaster.descripcion;
        this.listadoDetalle[this.index].estado = this.detalleMaster.estado;
        this.cancelarDetalle();
      }
    },

    maskFuncion(numero, token) {
       return helperFunctions.longitudMaskNumero(numero, token);
     },  

    cancelarDetalle() {
      this.limpiar();
      this.$emit('cancelarDetalle');
    },

  },
}
</script>
