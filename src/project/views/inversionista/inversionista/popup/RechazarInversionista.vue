<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_razon( :title="$t('RECHAZAR INVERSIONISTA')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
        vx-card.card-sticky-floating.styleSticky 
          div.vx-row
            div.vx-col.w-full
              div.vx-row.mb-3
                div.vx-col.w-full
                  span.bold.font-label {{$t('Observaciones de Rechazo')}} 
                    span.font-label.bold.text-danger  *                    
                div.vx-col.w-full
                  vs-input.w-full(size="small" autocomplete="off" id ="rechazo" ref="rechazo" name="rechazo"  v-model="rechazo"  @focus="focus('rechazo')"  v-mask="{ mask:funcionMascara(100,'D'), tokens:{ 'D': {pattern: /[A-Za-z0-9\\W\\w\\s]/}}}" @blur="validarRechazo();blur('rechazo')" )
                  span.font-error.text-danger(v-if="mensajeRechazo") {{ $t(mensajeRechazo) }}
          footer-opciones( @aceptar="validarFormulario" :btnCancelar="true" @cancelar="cancelar")

</template>

<script>
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import VxButton from '@/components/buttons/Button.vue';
export default {
  name: 'PopupRechazar',
  mixins: [request],

  components: {
    VxButton,
    FooterOpciones
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: ''
    }
  },

  data() {
    return this.getDefaultData();
  },

  methods: {
    async validarFormulario() {
      if (this.showErrors()) return;
      this.$emit('enviarRechazo', this.rechazo, true); //Bandera estado True fue Rechazado
      this.cancelar();
    },

    getDefaultData() {
      return {
        rechazo: '',
        mensajeRechazo: ''
      };
    },

    cancelar() {
      this.limpiar();
      this.$emit('closePopup', false);
    },

    limpiar() {
      Object.assign(this.$data, this.getDefaultData());
    },

    validarRechazo() {
      if (this.rechazo) this.mensajeRechazo = '';
      else this.mensajeRechazo = 'La razón de rechazo es requerida.';
    },

    showErrors() {
      if (this.rechazo) this.mensajeRechazo = '';
      else this.mensajeRechazo = 'La razón de rechazo es requerida.';
      if (!this.mensajeRechazo) {
        return false;
      } else return true;
    },

    blur(element) {
      if (this[element] == '') {
        document.getElementById(element).parentNode.parentNode.classList.remove('focus');
      }
    },

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add('focus');
    },

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    }
  }
};
</script>

<style>
.width_razon .vs-popup {
  width: 65% !important;
}
.con-vs-popup.width_razon .vs-popup--content {
  height: auto !important;
}
.con-vs-popup.fullscreen.width_razon .vs-popup {
  height: auto !important;
}
.vx-card.card-sticky-floating.styleSticky .vx-card {
  top: auto !important;
}
.vx-card.card-sticky-floating.styleSticky {
  top: auto !important;
}

.font-label textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}
.font-label .vs-con-textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
</style>
