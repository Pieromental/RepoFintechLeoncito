<template lang="pug">

    div(class="h-screen flex")

        div.reestablecer-contrasena.p-10

            div.mb-5(style="text-align: center;")

                span.bold-reestablecer-contrasena Reestablecer de Contraseña
                
            div.w-full

                div.vx-row.pt-2.mt-2

                    div.vx-col.w-full(class="sm:w-1/3")
                        span.bold-reestablecer-contrasena.font-label Nueva Contraseña:

                    div.vx-col.w-full(class="sm:w-2/3")
                        div(style="position:relative;")
                            vs-input.input-password.w-full(size="small" autocomplete="new-password" ref="newPassword" name="newPassword" :type="showNewPassword ? 'password':''" v-model="newPassword" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @blur="quitarMensajeNewPassword();validarNewPassword();" @keydown="mensajeMayusculasNewPassword($event)" )
                            feather-icon.style-icon.icon-password-reestablecer.p-0(v-if="showNewPassword" @click.stop="verNewPassword()" :title="$t('Mostrar')" icon='EyeIcon')
                            feather-icon.style-icon.icon-password-reestablecer.p-0(v-else @click.stop="verNewPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
                        div
                            vs-alert.mt-3.mb-1( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActiveNewPassword" ) {{$t("Se activaron las MAYÚSCULAS.")}}
                        span.font-error.text-danger-mb-2(v-if="msgNewPassword") {{ $t(msgNewPassword) }}

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
                        span.bold-reestablecer-contrasena.font-label Repetir Contraseña:

                    div.vx-col.w-full(class="sm:w-2/3")
                        div(style="position:relative;")
                            vs-input.input-password.w-full(size="small" autocomplete="confirm-password" ref="confirmPassword" name="confirmPassword" :type="showConfirmPassword ? 'password':''" v-model="confirmPassword" v-mask="{ mask:funcionMascara(255,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @blur="quitarMensajeConfirmPassword();validarConfirmPassword();" @keydown="mensajeMayusculasConfirmPassword($event)" )
                            feather-icon.style-icon.icon-password-reestablecer.p-0(v-if="showConfirmPassword" @click.stop="verConfirmPassword()" :title="$t('Mostrar')" icon='EyeIcon')
                            feather-icon.style-icon.icon-password-reestablecer.p-0(v-else @click.stop="verConfirmPassword()" :title="$t('Ocultar')" icon='EyeOffIcon')
                        div
                            vs-alert.mt-3.mb-1( size="small" color="warning" icon-pack="feather" icon="icon-info" :active="mayusculasActiveConfirmPassword" ) {{$t("Se activaron las MAYÚSCULAS.")}}
                        span.font-error.text-danger-mb-2(v-if="msgConfirmPassword") {{ $t(msgConfirmPassword) }}
                
                
                div.vx-row.pt-3.mt-3.vs-justify-flex-end
                                                
                    vs-button.font-label.btn-recuperar-contrasena.py-2.px-3.mr-4(@click="enviar" size="small" color="primary") Guardar

</template>

<script>

import funciones from '@/functions';
import request from '@/mixins/mixinRequest';
import swal from 'sweetalert2';

export default {

  name: 'RecuperarContraseña',
  mixins: [request],

    data() {
        return {
            token: '',

            newPassword: '',
            showNewPassword: true,
            msgNewPassword: '',
            mayusculasActiveNewPassword: false,

            confirmPassword: '',
            showConfirmPassword: true,
            msgConfirmPassword: '',
            mayusculasActiveConfirmPassword: false,
        };
    },

    methods: {
        
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
            
            if( !this.msgNewPassword && !this.msgConfirmPassword ){
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
                    let response = await this.reestablecer();
                    if(response.data.estado){
                        await swal.fire({type:'success', title: this.$t("Mensaje del Sistema"), text: this.$t(response.data.mensaje), showConfirmButton: true, showCancelButton: false, confirmButtonText: this.$t("Aceptar") });
                        this.cancelar();
                    }else{
                        await this.sweetAlert(response.data);
                    }
                }
            } catch (error) {
                throw new Error(error);
            }
        },

        async reestablecer() {
            this.$vs.loading({ type: "point" });
            try {
                let post = {};
                post.token = this.token;
                post.contrasenia_nueva = this.newPassword;
                post.confirmar_contrasenia = this.confirmPassword;
                post.ip = await require('public-ip').v4();
                let { data } = await this.requestApi( "reestablecer_contrasenia_backoffice", post, "POST");
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
        },

        cancelar(){
            this.$router.push('/');
        },

    },

    async mounted() {
        this.token = this.$route.query.token ? this.$route.query.token:null
        if(this.token){
            let response = await this.verificarToken();
            if(!response.estado){
                await this.sweetAlert(response);
                this.cancelar();
            }
        } else {
            this.cancelar()
        }
    },



}
</script>

<style lang="scss">
.reestablecer-contrasena{
    background: white;
    border-radius: 1rem;
    max-width: 35rem;
    height: auto;
    margin: auto;
}
.bold-reestablecer-contrasena{
    font-weight: 600;
}
/*.input-password{
    .vs-con-input input{
        background-color: antiquewhite;
    }
}*/
.icon-password-reestablecer {
    position: absolute !important; 
    right: 0rem;
    top: 0.4rem;
}
.btn-recuperar-contrasena{
    width: 5rem;
}

</style>