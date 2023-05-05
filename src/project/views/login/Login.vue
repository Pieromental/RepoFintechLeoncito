<template lang="pug">
  div
    img(class="login-wave" src="@/assets/proyect/img/login/wave.png")
    div(class="login-container")
      div(class="login-img")
        img(src="@/assets/proyect/img/login/bg.svg")
      div(class="login-content")
        div(class="login-form")
          img(src="@/assets/proyect/img/login/avatar.svg")
          h2(class="title login-lyrics")  Bienvenidos
          div(class="input-div one")
            div(class="i")
              i(class="bx bxs-user bx-sm")
            div(class="div")
              h5(class="login-lyrics") Nombre de Usuario
              input( ref="usuario" name="usuario" id="usuario" class="input" type="text" v-model="usuario" @focus="focus('usuario')" v-mask="{ mask:funcionMascara(30,'D'), tokens:{ 'D': {pattern: /[a-zA-Z0-9]/, transform: v => v.toLocaleUpperCase() }}}" @blur="validarUsuario();blur('usuario')" )
          div.style-right
            span.font-error.text-danger(v-if="mensajeUsuario") {{ $t(mensajeUsuario) }}
          div(class="input-div pass" :class="[{'margin-separator-none': mensajeUsuario}, {'margin-separator-full': !mensajeUsuario}]")
            div(class="i")
              i(class="bx bxs-lock-alt bx-sm")
            div(class="div")
              h5(class="login-lyrics") Contraseña
              input( ref="password" name="password" id="password" class="input" :type="showPassword ? 'password':''" v-model="password" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @focus="focus('password')"  @blur="quitarMensaje();validarPassword();blur('password')" @keypress.enter="ingresar()" @keydown="mensajeMayusculas($event)" autocomplete="off" )             
              feather-icon.style-icon.icon-password-login.p-0(v-if="showPassword" @click.stop="verPassword()" :title="$t('Mostrar')" icon='EyeIcon')
              feather-icon.style-icon.icon-password-login.p-0(v-else @click.stop="verPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
          div.my-3
            vs-alert( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActive" ) {{$t("Se activaron las MAYÚSCULAS.")}}
          div.style-right
            span.font-error.text-danger(v-if="mensajePassword") {{ $t(mensajePassword) }}
          a( id="olvideContrasena" @click="olvideContrasena" ) Olvidé mi contraseña
          button(class="login-btn" @click="ingresar") Ingresar

</template>

<script>

import funciones from '@/functions';
import request from '@/mixins/mixinRequest';

export default {

  name: 'Login',
  mixins: [request],

  data() {
    return {
      usuario: '',
      mensajeUsuario: '',
      password: '',
      showPassword: true,
      mayusculasActive: false,
      mensajePassword: ''
    };
  },

  methods: {

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    blur(element) {
      if(!this[element]) {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },

    validarUsuario(){
      if(this.usuario){
        this.mensajeUsuario = "";
      }else{
        this.mensajeUsuario = "El Nombre de Usuario es requerido.";
      }
    },

    verPassword(){
      this.showPassword = !this.showPassword;
    },

    quitarMensaje(){
      this.mayusculasActive = false;
    },
    
    mensajeMayusculas($event){
      if ($event.getModifierState('CapsLock')) this.mayusculasActive = true;
      else this.mayusculasActive = false;
    },
    
    validarPassword(){
      if(this.password){
        this.mensajePassword = "";
      }else{
        this.mensajePassword = "La contraseña es requerida.";
      }
    },

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    },
    
    showErrors() {
      if(this.usuario) this.mensajeUsuario = "";
      else this.mensajeUsuario = "El Nombre del Usuario es requerido.";
      if(this.password) this.mensajePassword = "";
      else this.mensajePassword = "La contraseña es requerida.";
      if(!this.mensajeUsuario && !this.mensajePassword) return false;
      else return true;
    },

    async ingresar() {
      try {
        if(this.showErrors()) return
        let response = await this.registrar();
        if(response.data.estado){
          this.responseRequest(response.data);
          this.acceso(response.data);
        }else{
          await this.sweetAlert(response.data);
          if(response.data.mensaje=="El nombre de usuario ingresado no se encuentra registrado. Ingrese nuevamente su nombre de usuario.") {
            this.password = '';
            document.getElementById('password').focus();
            setTimeout(() => { document.getElementById('usuario').focus(); }, 500);
          }
          if(response.data.mensaje=="La contraseña es incorrecta.") {
            this.password = '';
            setTimeout(() => { document.getElementById('password').focus(); }, 500);
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async registrar() {
      this.$vs.loading({ type: "point" });
      try {
        let post = {};
        post.nombre_usuario = this.usuario;
        post.contrasenia = this.password;
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi( "iniciar_sesion_backoffice", post, "POST");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    acceso(data){
      localStorage.setItem('avatar', data.avatar);
      localStorage.setItem('keyEarring', data.cambio_pendiente_clave);
      localStorage.setItem('userName', data.nombres);
      localStorage.setItem('userLastName', data.apellidos);
      localStorage.setItem('token', data.token);
      if(data.cambio_pendiente_clave) this.$router.push(`/modificar-contrasena`);
      else this.$router.push(`/inicio`);
    },
    
    olvideContrasena(){
      let routeData = this.$router.resolve({name: 'recuperar-contrasena'});
      window.open(routeData.href, '_blank');
    }
    
  },

};
</script>

<style lang="scss">
@import '@/assets/proyect/scss/login/Login.scss';
</style>