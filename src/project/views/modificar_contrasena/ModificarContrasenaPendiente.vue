<template lang="pug">
  
  div(class="h-screen flex")

    header-auxiliar

    div.body-modificar-contrasena
    
      div.modificar-contrasena.p-10.mx-auto.my-auto

        div.mb-5(style="text-align: center;")

          span.bold-modificar-contrasena Actualización de Contraseña de usuario
            
        div.w-full

          div.vx-row.pt-2.mt-2

            div.vx-col.w-full(class="sm:w-1/3")
              span.bold-modificar-contrasena.font-label Contraseña Actual:

            div.vx-col.w-full(class="sm:w-2/3")
              div(style="position:relative;")
                vs-input.input-password.w-full(size="small" autocomplete="off" ref="currentPassword" name="currentPassword" :type="showCurrentPassword ? 'password':''" v-model="currentPassword" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @blur="quitarMensajeCurrentPassword();validarCurrentPassword();" @keydown="mensajeMayusculasCurrentPassword($event)" )
                feather-icon.style-icon.icon-password-modificar.p-0(v-if="showCurrentPassword" @click.stop="verCurrentPassword()" :title="$t('Mostrar')" icon='EyeIcon')
                feather-icon.style-icon.icon-password-modificar.p-0(v-else @click.stop="verCurrentPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
              div
                vs-alert.mt-3.mb-1( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActiveCurrentPassword" ) {{$t("Se activaron las MAYÚSCULAS.")}}
              span.font-error.text-danger.mb-2(v-if="msgCurrentPassword") {{ $t(msgCurrentPassword) }}


          div.vx-row.pt-2.mt-2

            div.vx-col.w-full(class="sm:w-1/3")
              span.bold-modificar-contrasena.font-label Nueva Contraseña:

            div.vx-col.w-full(class="sm:w-2/3")
              div(style="position:relative;")
                vs-input.input-password.w-full(size="small" autocomplete="off" ref="newPassword" name="newPassword" :type="showNewPassword ? 'password':''" v-model="newPassword" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @blur="quitarMensajeNewPassword();validarNewPassword();" @keydown="mensajeMayusculasNewPassword($event)" )
                feather-icon.style-icon.icon-password-modificar.p-0(v-if="showNewPassword" @click.stop="verNewPassword()" :title="$t('Mostrar')" icon='EyeIcon')
                feather-icon.style-icon.icon-password-modificar.p-0(v-else @click.stop="verNewPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
              div
                vs-alert.mt-3.mb-1( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActiveNewPassword" ) {{$t("Se activaron las MAYÚSCULAS.")}}
              span.font-error.text-danger.mb-2(v-if="msgNewPassword") {{ $t(msgNewPassword) }}

            div.vx-col.w-full(class="sm:w-1/3")
            div.vx-col.w-full(class="sm:w-2/3")
              div.vx-col
                span.font-label La contraseña debe contener:
              div.vx-col.ml-2
                span.font-label  • Al menos 8 caracteres.
              div.vx-col.ml-2
                span.font-label • Caracteres alfanuméricos, es decir al menos 1 caracter alfabético y 1 carácter numérico.
              div.vx-col.ml-2
                span.font-label • Al menos 1 carácter especial ($, #, &, etc.)

          div.vx-row.pt-2.mt-2

            div.vx-col.w-full(class="sm:w-1/3")
              span.bold-modificar-contrasena.font-label Repetir Contraseña

            div.vx-col.w-full(class="sm:w-2/3")
              div(style="position:relative;")
                vs-input.input-password.w-full(size="small" autocomplete="off" ref="confirmPassword" name="confirmPassword" :type="showConfirmPassword ? 'password':''" v-model="confirmPassword" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @blur="quitarMensajeConfirmPassword();validarConfirmPassword();" @keydown="mensajeMayusculasConfirmPassword($event)" )
                feather-icon.style-icon.icon-password-modificar.p-0(v-if="showConfirmPassword" @click.stop="verConfirmPassword()" :title="$t('Mostrar')" icon='EyeIcon')
                feather-icon.style-icon.icon-password-modificar.p-0(v-else @click.stop="verConfirmPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
              div
                vs-alert.mt-3.mb-1( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActiveConfirmPassword" ) {{$t("Se activaron las MAYÚSCULAS.")}}
              span.font-error.text-danger.mb-2(v-if="msgConfirmPassword") {{ $t(msgConfirmPassword) }}

          div.vx-row.pt-3.mt-3.vs-justify-flex-end
                                          
            vs-button.font-label.btn-recuperar-contrasena.py-2.px-3.mr-4(@click="enviar" size="small" color="primary") Aceptar

</template>

<script>

import HeaderAuxiliar from '@/components/header/HeaderAuxiliar.vue';
import funciones from '@/functions';
import request from '@/mixins/mixinRequest';
import swal from 'sweetalert2';

export default {

  name: 'ModificarContraseña',
  mixins: [request],

  components: {
    HeaderAuxiliar
  },

  data() {
    return {
      token: '',

      currentPassword: '',
      showCurrentPassword: true,
      msgCurrentPassword: '',
      mayusculasActiveCurrentPassword: false,

      newPassword: '',
      showNewPassword: true,
      msgNewPassword: '',
      mayusculasActiveNewPassword: false,

      confirmPassword: '',
      showConfirmPassword: true,
      msgConfirmPassword: '',
      mayusculasActiveConfirmPassword: false,

      currentUser: false,
    };
  },

  methods: {
      
    //CURRENT PASSWORD
    
    verCurrentPassword(){
      this.showCurrentPassword = !this.showCurrentPassword;
    },
    
    quitarMensajeCurrentPassword(){
      this.mayusculasActiveCurrentPassword = false;
    },
    
    mensajeMayusculasCurrentPassword($event){
      if ($event.getModifierState('CapsLock')) this.mayusculasActiveCurrentPassword = true;
      else this.mayusculasActiveCurrentPassword = false;
    },
    
    validarCurrentPassword(){
      if(this.currentPassword){
        this.msgCurrentPassword = "";
      }else{
        this.msgCurrentPassword = "La Contraseña Actual es requerida.";
      }
    },

    //NEW PASSWORD
    
    verNewPassword(){
      this.showNewPassword = !this.showNewPassword;
    },
    
    quitarMensajeNewPassword(){
      this.mayusculasActiveNewPassword = false;
    },
    
    mensajeMayusculasNewPassword($event){
      if ($event.getModifierState('CapsLock')) this.mayusculasActiveNewPassword = true;
      else this.mayusculasActiveNewPassword = false;
    },
    
    validarNewPassword(){
      if(this.newPassword){
        this.msgNewPassword = "";
      }else{
        this.msgNewPassword = "La Nueva Contraseña es requerida.";
      }
    },
    
    //CONFIRM PASSWORD
    
    verConfirmPassword(){
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    
    quitarMensajeConfirmPassword(){
      this.mayusculasActiveConfirmPassword = false;
    },
    
    mensajeMayusculasConfirmPassword($event){
      if ($event.getModifierState('CapsLock')) this.mayusculasActiveConfirmPassword = true;
      else this.mayusculasActiveConfirmPassword = false;
    },
    
    validarConfirmPassword(){
      if(this.confirmPassword){
        this.msgConfirmPassword = "";
      }else{
        this.msgConfirmPassword = "El Repetir Contraseña es requerido.";
      }
    },
    
    //ENVIAR
    
    showErrors() {

      if(this.confirmPassword){
        this.msgConfirmPassword = "";
      }else{
        this.msgConfirmPassword = "El Repetir Contraseña es requerido.";
        setTimeout(() => { this.$refs['confirmPassword'].focusInput(); }, 500);
      }

      if(this.newPassword){
        let regexNumero = /[0-9]{1,}/;
        let regexLetra = /[a-zA-Z]{1,}/;
        let regexEspecial = /[^a-zA-Z0-9]{1,}/;
        let longitud = this.newPassword.length>=8;
        let test = regexNumero.test(this.newPassword) && regexLetra.test(this.newPassword) && regexEspecial.test(this.newPassword) && longitud;
        if(test) this.msgNewPassword = "";
        else this.msgNewPassword = "La contraseña ingresada no es válida. Ingrese una contraseña válida.";
      }else{
        this.msgNewPassword = "La Nueva Contraseña es requerida.";
        setTimeout(() => { this.$refs['newPassword'].focusInput(); }, 500);
      }

      if(this.currentPassword){
        this.msgCurrentPassword = "";
      }else{
        this.msgCurrentPassword = "El Repetir Contraseña es requerido.";
        setTimeout(() => { this.$refs['currentPassword'].focusInput(); }, 500);
      }

      if( this.msgNewPassword=="" && this.msgConfirmPassword=="" && this.msgCurrentPassword=="" ){
        if(this.newPassword==this.confirmPassword){
          return false;
        }else{
          this.msgConfirmPassword = "Las contraseñas no coinciden. Verifique";
          setTimeout(() => { this.$refs['confirmPassword'].focusInput(); }, 500);
          return true;
        }
      } else {
        return true;
      }
    },

    async enviar() {
      try {
        if(this.showErrors()) return
        let status = await swal.fire({type:'warning', title: this.$t("Mensaje del Sistema"), text: this.$t("Se cerrarán todas sesiones actualmente activas en todos los dispositivos. ¿Desea continuar?"), showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Sí"), cancelButtonText: this.$t("No")});
        if(status.value){
          let response = await this.modificar();
          if(response.data.estado){
            localStorage.setItem('keyEarring', false);
            await swal.fire({type:'success', title: this.$t("Mensaje del Sistema"), text: this.$t(response.data.mensaje), showConfirmButton: true, showCancelButton: false, confirmButtonText: this.$t("Aceptar") });
            this.cancelar();
          }else{
            await this.sweetAlert(response.data);
            if(response.data.mensaje=="La contraseña actual es incorrecta. Verifique") {
              setTimeout(() => { this.$refs['currentPassword'].focusInput(); }, 500);
            }
            if(response.data.mensaje=="La contraseña ingresada es una contraseña antigua. Por favor ingrese una contraseña diferente.") {
              this.newPassword = '';
              setTimeout(() => { this.$refs['newPassword'].focusInput(); }, 500);
            }
          }
        }
      } catch (error) {
          throw new Error(error);
      }
    },

    async modificar() {
      this.$vs.loading({ type: "point" });
      try {
        let put = {};
        if(!this.currentUser) put.token = this.token;
        put.contrasenia_actual = this.currentPassword;
        put.contrasenia_nueva = this.newPassword;
        put.confirmar_contrasenia = this.confirmPassword;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi( this.currentUser ? "modificar_contrasenia_backoffice":"modificar_contrasenia_ext_bo", put, "PUT");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    },

    cancelar(){
      localStorage.clear();
      this.$router.push('/');
    },

    async verificarToken(){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`verificar_token_bo?token=${this.token}`);
        return data.data;
      } catch (error) {
        throw new Error(error);
      } finally{
        this.$vs.loading.close();
      }
    }

  },
  
  async mounted() {
    this.token = this.$route.query.token ? this.$route.query.token:null;
    if(this.token){
      let response = await this.verificarToken();
      if(response.estado){
        await swal.fire({
          type: 'warning',
          title: 'Mensaje de Sistema',
          html: `Tienes un cambio de contraseña pendiente. Actualiza tu contraseña para que puedas acceder a las opciones del Menú.`,
          showConfirmButton: true,
          confirmButtonText: this.$t('Aceptar')
        });
      }else{
        await this.sweetAlert(response);
        this.cancelar();
      }
    } else {
      this.currentUser = localStorage.getItem('token') && localStorage.getItem('userName') && localStorage.getItem('userLastName') ? true : false;
      if(this.currentUser){
        await swal.fire({
          type: 'warning',
          title: 'Mensaje de Sistema',
          html: `Tienes un cambio de contraseña pendiente. Actualiza tu contraseña para que puedas acceder a las opciones del Menú.`,
          showConfirmButton: true,
          confirmButtonText: this.$t('Aceptar')
        });
      }else{
        this.cancelar()
      }
    }
  }

}

</script>

<style lang="scss">
.body-modificar-contrasena{
  display: flex;
  height: calc(100% - 4.41rem);
  width: 100%;
  margin-top: 4.41rem;
}
.modificar-contrasena{
  background: white;
  border-radius: 1rem;
  min-width: 25rem;
  max-width: 35rem;
  height: auto;
}
.bold-modificar-contrasena{
  font-weight: 600;
}
/*.input-password{
    .vs-con-input input{
        background-color: antiquewhite;
    }
}*/
.icon-password-modificar {
  position: absolute !important; 
  right: 0rem;
  top: 0.4rem;
}
.btn-recuperar-contrasena{
  width: 5rem;
}
</style>