<template lang="pug">

  vx-sidebar-form( id='registroUsuarioSistema' v-model='value' parentx='#parentx-usuario-sistema' )
  
    template(slot="header")
    
      span {{ title }}
      
    template(slot="body")
    
      div.vx-col.mb-3
      
        span.bold.font-label {{$t("Nombre de Usuario:")}} 
        span.font-label (30)
          span.font-label.bold.text-danger  *                                                                                                                   
        texts-box( ref="nombre_usuario" name="nombre_usuario"  v-model="usuarioSistema.nombre_usuario" v-mask="{mask:funcionMascara(30,'D'),tokens:{'D': {pattern: /[0-9a-zA-Z]+$/, transform: v => v.toLocaleUpperCase()},}}" @keyup.enter.prevent="validarNombreUsuario" @blur="validarNombreUsuario" @input="cambiarInput('nombre_usuario')" :disabled='!nuevo')
        span.font-error.text-danger(v-if="errores[0].required") {{ $t( errores[0].error_validar_usuario == '' ? errores[0].error : errores[0].error_validar_usuario) }}
        
      div.vx-col.mb-3
        span.bold.font-label {{$t("Nombre Completo:")}} 
        span.font-label (100)
          span.font-label.bold.text-danger  *
        texts-box( ref="nombres" name="nombres" v-model="usuarioSistema.nombres" v-mask="{mask:funcionMascara(100,'D'),tokens:{'D': {pattern: /[\\W\\w\\s]/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarFocus('nombres')" @input="cambiarInput('nombres')" :disabled="ver" )
        span.font-error.text-danger(v-if="errores[1].required") {{ $t(errores[1].error) }}
        
      div.vx-col.mb-3
        span.bold.font-label {{$t("Apellidos:")}} 
        span.font-label (100)
          span.font-label.bold.text-danger  *
        texts-box( ref="apellidos" name="apellidos" v-model="usuarioSistema.apellidos" v-mask="{mask:funcionMascara(100,'D'),tokens:{'D': {pattern: /[\\W\\w\\s]/, transform: v => v.toLocaleUpperCase()},}}"  @blur="validarFocus('apellidos')" @input="cambiarInput('apellidos')" :disabled="ver")
        span.font-error.text-danger(v-if="errores[2].required") {{ $t(errores[2].error) }}
        
      div.vx-col.mb-3
        span.bold.font-label {{$t("Correo Electrónico:")}} 
        span.font-label (100)
          span.font-label.bold.text-danger  *
        texts-box( ref="correo" name="correo" v-model="usuarioSistema.correo"  v-mask="{mask:funcionMascara(100,'D'),tokens:{'D': {pattern: /[\\w\\S]+$/, transform: v => v.toLowerCase()},}}"  @keyup.enter.prevent="validarEmail" @blur="validarEmail" @input="formatoEmail" :disabled="ver")
        span.font-error.text-danger(v-if="errores[3].required") {{ $t(errores[3].error_validar_correo == '' ? errores[3].error : errores[3].error_validar_correo) }}
        span.font-error.text-danger(v-if="errores[3].formato") {{ $t(errores[3].error_formato_correo) }}
        
      div.vx-col.mb-3(v-if="editar")       
        check-box( v-if="cambio_clave" v-model="usuarioSistema.cambio_pendiente_clave" :disabled="true") {{$t("Cambiar Contraseña")}}
        check-box( v-else v-model="usuarioSistema.cambio_pendiente_clave" @change="eventChange") {{$t("Cambiar Contraseña")}}
        
      div.vx-col
        .vs-align-items
          span.bold.font-label.mr-3 {{$t("Estado:")}}
          radio-button.ml-3.mr-3( v-model="usuarioSistema.estado" vs-name="usuarioSistema.estado" :vs-value="true" :disabled='nuevo || ver') {{$t("Activo")}}
          radio-button.ml-3.mr-3( v-model="usuarioSistema.estado" vs-name="usuarioSistema.estado" :vs-value="false" :disabled='nuevo || ver') {{$t("Inactivo")}}
          
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
        this.inicio();
      }
    },
    
    
  },

  methods: {
    async eventChange(e){
      if( e.target.checked ){
        let mensaje = this.$t('Si marca esta opción, no podrá desmarcarla manualmente. ¿Está seguro de que desea continuar?');
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: mensaje,
          showCancelButton: true,
          confirmButtonText: this.$t('Aceptar'),
          cancelButtonText: this.$t('Cancelar'),
        });
        if (status.value) {
          this.usuarioSistema.cambio_pendiente_clave = true;
          this.cambio_clave = true;
        }
        if ( status.dismiss == 'cancel' || status.dismiss == 'backdrop'){
          this.usuarioSistema.cambio_pendiente_clave = false;
        } 
      }
    },
    getDefaultData(){
      return {
        title: '',
        tmpNombreUsuario: '',
        usuarioSistema: {
          id: '',
          nombre_usuario: '',
          nombres: '',
          apellidos: '',
          correo: '',
          cambio_pendiente_clave : false,
          estado: true,
        },
        cambio_clave : false,
        errores : [
          {
            tmp : '',
            alias : 'nombre_usuario',
            required : false,
            error : 'El nombre de usuario es requerido.',
            error_validar_usuario : '',            
          },
          {
            tmp : '',  
            alias : 'nombres',
            required : false,
            error : 'El nombre completo es requerida.'
          },
          {
            tmp : '',
            alias : 'apellidos',
            required : false,
            error : 'El apellido es requerido.'
          },
          {
            tmp : '',
            alias : 'correo',
            required : false,
            error : 'El correo electrónico es requerido.',
            error_validar_correo : '',
            formato : false,
            error_formato_correo : ''
          }
        ],
        buttonAceptar : false,

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

        tmpClaveBD : '',

        changeForm : false,

        changeClave : false,


      }
    },    
    cambiarInput(name){
      if( this.usuarioSistema[name] != '' ){
        this.changeForm = true;
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = false;
            
            if( name == 'nombre_usuario' ){
              e.error_validar_usuario = '';
            } 

            if( name == 'correo' ){
              e.error_validar_correo = '';
            }
          }
        });
      }
    },
    validarFocus(name){
      if( !this.changeForm ) return;
      if( this.usuarioSistema[name] ){        
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = false;
          }
        });        
      }else{
        this.errores.map( e => {
          if( e.alias == name ){
            e.required = true;
          }
        });        
      }
    },    

    async validarNombreUsuario(){
      try {   
        if( this.usuarioSistema.nombre_usuario){
          if( !this.nuevo ) return;
          if(this.errores[0].tmp == this.usuarioSistema.nombre_usuario) return
          if(this.tmpNombreUsuario == this.usuarioSistema.nombre_usuario) return
          this.$vs.loading({ type: 'point' });
          let { data } = await this.requestApi(`validar_usuario_back_office?nombre_usuario=${this.usuarioSistema.nombre_usuario}`);
          const { estado , mensaje } = data.data;
          if( estado ){
            this.errores.map( e => {
              if( e.alias == 'nombre_usuario' ){
                e.required = true;
                e.error_validar_usuario = mensaje;
                e.tmp = this.usuarioSistema.nombre_usuario;
              }
            }); 
            this.$refs.nombre_usuario.focusInput();           
            //this.activarFoco('nombre_usuario');
            this.tmpNombreUsuario = '';
          }else{
            this.errores.map( e => {
              if( e.alias == 'nombre_usuario' ){
                e.required = false;
                e.error_validar_usuario = '';
                e.tmp = "";
              }
            });
            this.tmpNombreUsuario = this.usuarioSistema.nombre_usuario;
          }
          this.errores[1].required = false;
        }else{
          this.tmpNombreUsuario = '';
          this.validarFocus('nombre_usuario');
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    
    async validarEmail() {
      try {
        
        if( this.usuarioSistema.correo ){
          if( !this.buttonAceptar && !this.nuevo ) return;
          if( this.tmpClaveBD == this.usuarioSistema.correo ) return;
          if(this.errores[3].tmp == this.usuarioSistema.correo ) return;
          this.$vs.loading({ type: 'point' });
          let { data } = await this.requestApi(`validar_correo_back_office?correo=${this.usuarioSistema.correo}&id=${this.usuarioSistema.id}`);
          const { estado , mensaje } = data.data;
          if( estado ){             
            this.errores.map( e => {
              if( e.alias == 'correo' ){
                e.required = true;
                e.error_validar_correo = mensaje;
                e.tmp = this.usuarioSistema.correo;
              }
            });  
            this.$refs.correo.focusInput(); //
            this.tmpClaveBD = '';
            //this.activarFoco('correo'); 
          }else{
            this.errores.map( e => {
              if( e.alias == 'correo' ){
                e.required = false;
                e.error_validar_correo = '';
                e.tmp = "";
              }
            });
            this.tmpClaveBD = this.usuarioSistema.correo;
          }
        }else{
          this.tmpClaveBD = '';
          this.validarFocus('correo');
        }         
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },


    formatoEmail(){      
      if( this.usuarioSistema.correo ){        
        let validar = helperFunctions.validateEmail(this.usuarioSistema.correo);
        if( !validar ){
          this.errores.map( e => {
            if( e.alias == 'correo' ){
              e.formato = true;
              e.error_formato_correo = 'El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar.';
            }
          }); 
        }else{
          this.errores.map( e => {
            if( e.alias == 'correo' ){
              e.formato = false;
              e.error_formato_correo = '';
            }
          }); 
        } 
        //this.cambiarInput('correo')
      }else{
        this.errores.map( e => {
          if( e.alias == 'correo' ){
            e.formato = false;
            e.error_formato_correo = '';
          }
        }); 
      }
    },
    

    validarInterfaz(){
      switch(this.parametro.accion){
        case 'nuevo': 
          this.nuevo = true; 
          this.title = "Nuevo Usuario";
          break;
        case 'editar': 
          this.editar = true; 
          this.title = "Editar Usuario";
          break;
        case 'ver': 
          this.ver = true; 
          this.title = "Ver Usuario [MODO VISTA]";
          break;
      }
    },
    

    async inicio(){
      try{
        this.$vs.loading({ type: 'point' });
        if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();     
        if(this.parametro.hasOwnProperty('data')) await this.cargarData();
        if(this.nuevo ) this.activarFoco('nombre_usuario');
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
        let { data } = await this.requestApi(`ver_usuario_back_office?id=${id}`);
        let response = data.data;
        if (response.estado) {
          const [ informacion ] = response.data;
          this.usuarioSistema.id = id;
          this.cambio_clave = informacion.cambio_pendiente_clave;
          this.tmpClaveBD = informacion.correo;
          Object.assign(this.usuarioSistema, informacion);

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
        let post = this.usuarioSistema;
        //post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('insertar_usuario_back_office', post, 'POST');
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
        let put = this.usuarioSistema;
        //put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('actualizar_usuario_back_office', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    showErrors() { 
      const { nombre_usuario,nombres,apellidos,correo } =  this.usuarioSistema;
      const array = [ nombre_usuario,nombres,apellidos,correo ];      
      if( nombre_usuario.length == 0 || nombres.length == 0 || apellidos.length == 0 || correo.length == 0 ){        
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
        this.buttonAceptar = true;
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
            this.buttonAceptar = false;
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
      input.focus();      
    },

    /* activarFocoRevisar(name) {    
      let input = document.getElementById(name);
      input.focus();      
    }, */

  },

  /* updated() {
    if (this.$i18n.locale == 'es') Validator.localize(this.$i18n.locale, dictEs);
    else Validator.localize(this.$i18n.locale, dictEn);
  }, */
  
};

</script>