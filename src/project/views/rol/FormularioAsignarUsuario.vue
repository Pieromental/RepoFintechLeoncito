<template lang="pug">
  div
    form.w-full
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Usuario')}}
        div.vx-col.w-full(class="sm:w-1/3")   
          texts-box( ref="nombreUsuario" name="nombreUsuario"  v-model="dataUsuario.nombre_usuario" disabled="true")       
          
          span.text-danger.font-error(v-if='obligatorio') {{ "El usuario es requerido" }}
          span.text-danger.font-error(v-if='flag') {{ "El usuario seleccionado ya fue agregado. Debe ingresar un usuario diferente." }}
        div.vx-col.w-full(class="sm:w-1/3") 
          vs-button(v-if="!accion" size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" @click="openPopupCuentaContable()")
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Nombres')}}
        div.vx-col.w-full(class="sm:w-1/3")
          texts-box( ref="nombres" name="nombres"  v-model="dataUsuario.nombres" disabled="true")       
          
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Apellidos')}}
        div.vx-col.w-full(class="sm:w-1/3")
          texts-box( ref="apellidos" name="apellidos"  v-model="dataUsuario.apellidos" disabled="true") 
          

      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Correo')}}
        div.vx-col.w-full(class="sm:w-1/3")
          texts-box( ref="correo" name="correo"  v-model="dataUsuario.correo" disabled="true")
          
      
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Estado')}}
        div.vx-col.vs-align-items
          radio-button.ml-3.mr-3.font-label( v-model="estado" vs-name="estado" :vs-value="true" ) {{$t("Activo")}}
          radio-button.ml-3.mr-3.font-label( v-model="estado" vs-name="estado" :vs-value="false" ) {{$t("Inactivo")}}
          
      div.vx-col.w-full.mb-5(v-if="!nuevo && accion")
        footer-datos( :items='footer')

      footer-button(:sidebar="true"  @aceptar="validar" @cancelar="cancelarDetalle")
    
    popup-cuenta-contable-formulario(:popupActive="popupActiveCuentaContable" :company="company" :lengthRestriction="digitosCuenta" @selectedAccount="selectedAccount" @closePopup="closePopup" )
</template>

<script>

import { Validator } from "vee-validate";
import helperFunctions from "@/functions";

import swal from "sweetalert2";
import request from "@/mixins/mixinRequest"
import FooterButton from '@/components/footer/FooterButton.vue';
import vSelect from 'vue-select';

import TextsBox from '@/components/fields/input/TextsBox.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
import FooterDatos from '@/components/footer/FooterData.vue';

import PopupCuentaContableFormulario from "@/project/views/rol/BusquedaUsuario.vue";

  const dictEs = {
    custom: {
      mensajeEstado: {
        required: 'El Estado es requerido.'
      },
    }
  };
  const dictEn = {
    custom: {
      mensajeEstado: {
        required: 'The state is required',
      },
    }
  };

export default {

  name: "DetalleFormulario",
  mixins: [request],
  components: {
    vSelect,
    FooterButton,
    PopupCuentaContableFormulario,
    TextsBox,
    RadioButton,
    FooterDatos
  },
  props: {
    dataDetalle: {
      type: Object,
      default: () => {}
    },
    listado:{
      type: Array,
      default: () => []
    },
    accion :{
      type: Boolean,
      default: true
    },
    index : {
      type :String,
      default :""
    }
  },

  data() {
    return this.getDefaultData()
  },

  watch: {
    dataDetalle(){
      if( this.index != "" && this.dataDetalle != null){
        this.dataUsuario.nombre_usuario = this.accion ? this.dataDetalle.nombre_usuario : "";
        this.dataUsuario.nombres = this.accion ? this.dataDetalle.nombres : "";
        this.dataUsuario.apellidos = this.accion ? this.dataDetalle.apellidos : "";
        this.dataUsuario.correo = this.accion ? this.dataDetalle.correo : "";
        this.estado = this.accion ? this.dataDetalle.estado : true;
        this.nuevo = this.dataDetalle.id_detalle == null ? true : false;

        this.footer = this.accion ? [
          { icon:'ClockIcon', key: 'Fecha de Registro', value: this.dataDetalle.footer_fecha_registro },
          { icon:'ColumnsIcon', key:'IP de Registro', value: this.dataDetalle.footer_ip_registro },
          { icon:'UserIcon', key:'Usuario de Registro', value: this.dataDetalle.footer_usuariobo_registro },
          { icon:'ClockIcon', key:'Última Fecha de Modificación', value: this.dataDetalle.footer_fecha_actualizacion },
          { icon:'ColumnsIcon', key:'Última IP de Modificación', value: this.dataDetalle.footer_ip_actualizacion },
          { icon:'UserIcon', key:'Último Usuario de Modificación', value: this.dataDetalle.footer_usuariobo_actualizacion }
        ] : [];
      }else{
        this.limpiar()
      }
    },
    "dataUsuario.nombre_usuario"(){
      if( this.dataUsuario.nombre_usuario != "" ){
        this.flag = false;
        this.obligatorio = false;
      }
    }
  },

  methods:{
    /* METODO DEL MODAL */
    openPopupCuentaContable(val){
             //this.company = this.companiaSeleccionada.id;
      this.popupActiveCuentaContable = true;

    },
    selectedAccount(value){
      this.dataUsuario.id_usuario = value.id_usuario;
      this.dataUsuario.nombre_usuario = value.nombre_usuario;
      this.dataUsuario.nombres = value.nombres;
      this.dataUsuario.apellidos = value.apellidos;
      this.dataUsuario.correo = value.correo;
      this.popupActiveCuentaContable = false;
    },    

    closePopup() {
      this.popupActiveCentroCosto = false;
      this.popupActiveCuentaContable = false;
    },
    /* METODO DEL MODAL */

    getDefaultData(){
      return {        
        options: [],
        rol: '',
        usuario : '',
        nombres : '',
        apellidos : '',
        correo : '',
        estado : true,
        flag : false,
        obligatorio : false,
        /* MODAL */
        popupActiveCuentaContable: false,
        company: '',
        digitosCuenta: 0,
        dataUsuario : {
          id_usuario : "",
          nombre_usuario : "",
          nombres : "",
          apellidos : "",
          correo : ""
        },
        footer:[],
        nuevo : false
      };
    }, 
    validarRuta(nombre){
      switch (nombre){
        case 'nuevo':
          return this.nuevo = true;
        case 'editar':
          return this.editar = true;
      }
    },

    

    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
      },

    showErrors() {
      let array = this.$validator.errors.items;
      if(array.length){
        setTimeout(() => { this.$refs[array[0].field].focusInput(); }, 500);
        let data = {
          estado: false,
          mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'),
          tipoMEnsaje: 'TMSGADV',
        }
        this.responseRequest(data);
      }
    },
    

    async validar() {
      if( this.dataUsuario.nombre_usuario == "" && this.dataUsuario.nombres == "" && this.dataUsuario.apellidos == "" && this.dataUsuario.correo == "" ){
        this.obligatorio = true;
      }else{
        if( this.accion ){
          this.listado[this.index].estado = this.estado;
          this.cancelarDetalle();      
        }else{
          if( this.listado.filter( (e) =>  e.nombre_usuario == this.dataUsuario.nombre_usuario ).length == 0 ){
            /* ACA DEBE INGRESAR NUEVOS */ 
            this.dataUsuario.estado = this.estado;
            this.dataUsuario.id_detalle = null;
            this.listado.push(this.dataUsuario);          
            this.cancelarDetalle();
          }else{
            this.obligatorio = "";
            this.flag = true;
          }
        } 
      }
    },


    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
      //this.cargarRoles();
    },


    cancelarDetalle() {
      this.limpiar();
      this.$emit('cancelarDetalle');
    },

    activarFoco(){
        if(this.nuevo) setTimeout(() => { this.$refs.codigo.focusInput(); }, 500);
        if(this.editar) setTimeout(() => { this.$refs.descripcion.focusInput(); }, 500);
    },

    async cargarRoles() {
      try {
        let { data } = await this.requestApi(`cargar_roles_no_asignados_back_office?id=${this.$route.params.id}`);
        let response = data.data || [];
        if (response.estado) {
          this.options = response.data.map((e) => {
            return {
              id_rol: e.object.id,
              codigo: e.object.codigo,
              descripcion : e.object.descripcion
            };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

  },

  

  updated() {
    if (this.$i18n.locale == 'es')
      Validator.localize(this.$i18n.locale, dictEs);
    else
      Validator.localize(this.$i18n.locale, dictEn);
  }
}
</script>
