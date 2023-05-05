<template lang="pug">

    div(class="h-screen flex w-full")

        div.recuperar-contrasena.p-10

            div.mb-5(style="text-align: center;")

                span.bold-recuperar-contrasena Recuperación de Contraseña

            div.justify-recuperar-contrasena.mt-3.mb-3

                span.bold.font-label Ingrese su correo electrónico, al cual se enviará un enlace de recuperación de contraseña.
                
            div.w-full

                div.vx-row.pt-1.mt-1

                    div.vx-col.w-full
                        span.font-label.bold-recuperar-contrasena Ingrese su correo electrónico:

                div.vx-row.pt-1.mt-1

                    div.vx-col.w-full
                        vs-input.w-full(size="small" autocomplete="off" ref="correo" name="correo"  v-model="correo" v-mask="{ mask:funcionMascara(100,'D'), tokens:{ 'D': {pattern: /[\\w\\S]/}}}" @keypress.enter="enviar" @blur="validarCorreo();" )
                        span.font-error.text-danger(v-if="mensajeCorreo") {{ $t(mensajeCorreo) }}
                    
                div.vx-row.pt-3.mt-3.vs-justify-flex-end
                                                
                    vs-button.font-label.btn-recuperar-contrasena.py-2.px-3.mr-4( @click="enviar" size="small" color="primary") Enviar
                    
</template>

<script>

import funciones from '@/functions';
import request from '@/mixins/mixinRequest';

export default {

    name: 'RecuperarContraseña',
    mixins: [request],
  
    data() {
        return {
            correo: '',
            mensajeCorreo: '',
        };
    },

    methods: {
        
        validarCorreo(){
            if(this.correo){
                this.mensajeCorreo = "";
            }else{
                this.mensajeCorreo = "El Correo electrónico es requerido.";
            }
        },

        showErrors() {
            if(this.correo){
                let test = funciones.validateEmail(this.correo);
                if(test){
                    this.mensajeCorreo = "";
                } else {
                    this.mensajeCorreo = "El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar.";
                    setTimeout(() => { this.$refs['correo'].focusInput(); }, 500);
                }
            }else{
                this.mensajeCorreo = "El correo electrónico es requerido.";
                setTimeout(() => { this.$refs['correo'].focusInput(); }, 500);
            }
            if( this.mensajeCorreo=="" ){
                return false;
            } else {
                return true;
            }
        },

        async enviar() {
            try {
                if(this.showErrors()) return
                let response = await this.recuperar();
                if(response.data.estado){
                    this.responseRequest(response.data);
                }else{
                    await this.sweetAlert(response.data);
                    setTimeout(() => { this.$refs['correo'].focusInput(); }, 500);
                }
            } catch (error) {
                throw new Error(error);
            }
        },

        async recuperar() {
            this.$vs.loading({ type: "point" });
            try {
                let post = {};
                post.correo = this.correo;
                let { data } = await this.requestApi( "recuperar_contrasenia_backoffice", post, "POST");
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

    },

    mounted(){
        setTimeout(() => { this.$refs['correo'].focusInput(); }, 500);
    }
}
</script>

<style>
.recuperar-contrasena{
    background: white;
    border-radius: 1rem;
    max-width: 35rem;
    height: auto;
    margin: auto;
}
.justify-recuperar-contrasena{
    text-align: justify;
}
.bold-recuperar-contrasena{
    font-weight: 600;
}
.btn-recuperar-contrasena{
    width: 5rem;
}
</style>