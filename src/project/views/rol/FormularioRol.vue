<template lang="pug">

  vx-sidebar-form( id='registroUsuarioSistema' v-model='value' parentx='#parentx-usuario-sistema' )
  
    template(slot="header")
      
      span {{ title }}

    template(slot="body")

      div.vx-col.mb-3
        span.bold.font-label {{$t("Código:")}} 
        span.font-label (6)
          span.font-label.bold.text-danger  *                                                                                                                   
        texts-box( ref="codigo" name="codigo"  v-model="rol.codigo" v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[a-zA-Z0-9]+$/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarFocus('codigo')" @keyup.enter.prevent="validarCodigo" @input="cambiarInput('codigo')" :disabled='!nuevo')
        span.font-error.text-danger(v-if="errores[0].required") {{ $t( errores[0].error_validar_codigo == '' ? errores[0].error : errores[0].error_validar_codigo) }}
      
      div.vx-col.mb-3
        span.bold.font-label {{$t("Descripción:")}} 
        span.font-label (50)
          span.font-label.bold.text-danger  *
        texts-box( ref="descripcion" name="descripcion" v-model="rol.descripcion" v-mask="{mask:funcionMascara(100,'D'),tokens:{'D': {pattern: /[0-9a-zA-Z\\s]/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarFocus('descripcion')" @input="cambiarInput('descripcion')" :disabled="ver" )
        span.font-error.text-danger(v-if="errores[1].required") {{ $t(errores[1].error) }}

      div.vx-col
        .vs-align-items
          span.bold.font-label.mr-3 {{$t("Estado:")}}
          radio-button.ml-3.mr-3( v-model="rol.estado" vs-name="rol.estado" :vs-value="true" :disabled='ver') {{$t("Activo")}}
          radio-button.ml-3.mr-3( v-model="rol.estado" vs-name="rol.estado" :vs-value="false" :disabled='ver') {{$t("Inactivo")}}
          
    template(slot="footer")

      Binnacle( v-if="!nuevo" :items='footer')

      Buttons( @confirm='validate' :btnConfirm='!ver' @cancel='cancel(false)' )
      
</template>

<script>
import helperFunctions from "@/functions";
import request from '@/mixins/mixinRequest';
import swal from 'sweetalert2';

import VxSidebarForm from '@/components/vx-sidebar-form/VxSidebarForm.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';
import Buttons from '@/components/vx-sidebar-form/VxSidebarFormButtons.vue';

import TextsBox from '@/components/fields/input/TextsBox.vue';
import GroupsBox from '@/components/fields/input/GroupsBox.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
import VxButton from '@/components/buttons/Button.vue';
import { defaults } from 'chart.js';

export default {

  name: 'FormularioEjemplo',
  mixins: [request],

  components: {
    VxSidebarForm,
    TextsBox,
    GroupsBox,
    ComboBox,
    CheckBox,
    ViewDownload,
    RadioButton,
    VxButton,
    Binnacle,
    Buttons
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    parametro: {
      type: Object,
      default: {}
    }
  },

  data() {
    return this.getDefaultData();
  },
  
  watch: {

    value(val){
      if(val){
        //this.$vs.loading({ type: "point" });
        /* if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        if(!this.ver) this.cargarMoneda();        
        if(this.parametro.hasOwnProperty('data')) this.cargarData(); */
        //this.$vs.loading.close();
        this.inicio();
      }
    }
    
  },

  methods: {
    
    getDefaultData(){
      return {
        title: '',
        rol: {
          id: '',
          codigo: '',
          descripcion: '',
          estado: true,
        },
        errores : [
          {
            alias : 'codigo',
            required : false,
            error : 'El codigo es requerido.',
            error_validar_codigo : '',            
          },
          {
            alias : 'descripcion',
            required : false,
            error : 'La descripción es requerida.'
          },
        ],

        tmpCodigo: '',
        mensajeCodigo: '',

        opcionMoneda: [],
        monedaSeleccionada: [],
        mensajeMoneda: '',
        disabledMoneda: false,
        
        disabledFields: false,

        nuevo: false,
        editar: false,
        ver: false,

        footer: [],


      }
    },    

    validarFocus(name){
      if( this.rol[name] == '' ){        
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = true;
          }
        });        
      }else{
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = false;
          }
        });
        if( name == 'codigo' ){
          this.validarCodigo();
        } 
        
      }
    },
    cambiarInput(name){
      if( this.rol[name] != '' ){
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = false;
            
            if( name == 'codigo' ){
              e.error_validar_codigo = '';
            } 

          }
        });
      }
    },

    async validarCodigo(){
      try {
        if( this.rol.codigo ) {
          if( this.tmpCodigo == this.rol.codigo ) return
          this.$vs.loading({ type: 'point' });
          let { data } = await this.requestApi(`validar_codigo_rol?codigo=${this.rol.codigo}`);
          const { estado , mensaje } = data.data;
          if( estado ){             
            this.errores.map( e => {
              if( e.alias == 'codigo' ){
                e.required = true;
                e.error_validar_codigo = mensaje;
              }
            });          
            this.activarFoco("codigo");    
            this.tmpCodigo = '';  
          }else{
            this.errores.map( e => {
              if( e.alias == 'codigo' ){
                e.required = false;
                e.error_validar_codigo = '';
              }
            });    
            this.tmpCodigo = this.rol.codigo;    
          }
          this.errores[1].required = false;
        }else{  
          this.tmpCodigo = ''; 
        }  
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    validarInterfaz(){
      switch(this.parametro.accion){
        case 'nuevo': 
          this.nuevo = true; 
          this.title = "Nuevo Rol";
          break;
        case 'editar': 
          this.editar = true; 
          this.title = "Editar Rol";
          break;
        case 'ver': 
          this.ver = true; 
          this.title = "Ver Rol [MODO VISTA]";
          break;
      }
    },
    

    async inicio(){
      try{
        this.$vs.loading({ type: 'point' });
        if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();     
        if(this.parametro.hasOwnProperty('data')) await this.cargarData();
        if(this.nuevo ) this.activarFoco('codigo');
      } catch (error) {
        throw new Error(error);
      }
      finally{
        this.$vs.loading.close();
      }
    },
    
    async cargarData() {
      try{
        if( this.parametro.data == null ) return; 
        this.$vs.loading({ type: 'point' });
        const { id } = this.parametro.data;       
        let { data } = await this.requestApi(`ver_rol?id=${id}`);
        let response = data.data;
        if (response.estado) {
          const [ informacion ] = response.data;
          this.rol.id = id;
          Object.assign(this.rol, informacion);

          console.log(informacion)

          
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:informacion.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:informacion.footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value:informacion.footer_usuariobo_registro },
            
          ];
          if(this.ver){
            this.footer.push(
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value:informacion.footer_fecha_actualizacion },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value:informacion.footer_ip_actualizacion },
              { icon:'UserIcon', key:'Último Usuario de Modificación', value:informacion.footer_usuariobo_actualizacion }
            )
          }

          console.log("FOOTER => ",this.footer);
        }
      } catch (error) {
          throw new Error(error);
      
      } finally {
        this.$vs.loading.close();
      }
    },

    
    

    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },

    async registrar() {
      try {
        this.$vs.loading({ type: 'point' });
        let post = this.rol;
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('insertar_rol', post, 'POST');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async actualizar() {
      try {
        this.$vs.loading({ type: 'point' });
        let put = this.rol;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('editar_rol', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },



    showErrors() { 
      const { codigo,descripcion } =  this.rol;
      const array = [ codigo , descripcion ];      
      if( codigo.length == 0 || descripcion.length == 0 ){        
        array.map( ( element , index ) => {
          if( element == "" ){
            this.errores[index].required = true;
          }
        });
        
        let data = {
          estado: false,
          mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'),
          tipoMensaje: 'MSJADV',
        };
        this.responseRequest(data);
        return true;
      } else {
        return false;
      }
    },

    async validate(){
      try {
        if( this.showErrors() ) return;
        let mensaje = this.nuevo ? this.$t('¿Desea guardar el registro?') : this.$t('¿Desea actualizar el registro?');
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: mensaje,
          showCancelButton: true,
          confirmButtonText: this.$t('Aceptar'),
          cancelButtonText: this.$t('Cancelar'),
        });
        if (status.value) {
          this.$vs.loading({ type: 'point' });
          let response = this.nuevo ? await this.registrar() : await this.actualizar();
          if (response.data.estado) {
            this.responseRequest(response.data);
            this.cancel();
          } else {
            this.sweetAlert(response.data);
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    cancel(){      
      this.limpiar();
      this.$emit('cancel');      
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    activarFoco(name) {      
      let input = document.getElementById(name);
      setTimeout(() => {
        input.focus();
        this.rol.codigo = "";
      },500)
      
    },

  },

  /* updated() {
    if (this.$i18n.locale == 'es') Validator.localize(this.$i18n.locale, dictEs);
    else Validator.localize(this.$i18n.locale, dictEn);
  }, */
  
};

</script>