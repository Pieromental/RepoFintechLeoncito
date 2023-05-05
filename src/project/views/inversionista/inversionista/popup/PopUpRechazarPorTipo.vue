<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_razon( :title="$t('RECHAZAR')" :active="popupRazonActive" @close="cancelarRechazo" :click-not-close="false" fullscreen classContent="popup-example" )
        
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

          footer-opciones( @aceptar="validarFormulario" :btnCancelar="true" @cancelar="cancelarRechazo")

</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import FooterOpciones from '@/components/footer/FooterButton.vue';

export default {
  name: 'PopupRechazarPorTipo',
  mixins: [request],

  components: {
    FooterOpciones
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    tipo: {
      type: String,
      default: ''
    },
    tipoObjeto: {
      type: String,
      default: ''
    },
    idUsuario: {
      type: Number,
      default: 0
    }
  },

  data() {
    return this.getDefaultData();
  },

  methods: {
    async rechazarRepresentante() {
      try {
        this.$vs.loading({ type: 'point' });
        let put = {};
        put.id_usuario = this.idUsuario;
        put.id_representante_legal = this.id;
        put.ip = await require('public-ip').v4();
        put.observacion_rechazo = this.rechazo;

        let { data } = await this.requestApi('rechazar_representante_legal_inversionista', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async rechazarCuenta() {
      try {
        this.$vs.loading({ type: 'point' });
        let put = {};
        put.id = this.idUsuario;
        put.id_cuenta_bancaria = this.id;
        put.ip = await require('public-ip').v4();
        put.observacion_rechazo = this.rechazo;
        let { data } = await this.requestApi('rechazar_cuenta_bancaria_inversionista', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async validarFormulario() {
      try {
        if (this.showErrors()) return;
        this.banderaCierre = true;
        if (this.tipoObjeto == 'representanteLegal') {
          if (this.tipo == 'tipoActivo') {
            let response = await this.rechazarRepresentante();
            if (response.data.estado) {
              this.responseRequest(response.data);
              this.$emit('cambiarFlagsObjeto', this.id, this.rechazo);
              this.limpiar();
              // this.cancelarRechazo();
            } else {
              this.sweetAlert(response.data);
            }
          }
          if (this.tipo == 'tipoRevision') {
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: 'Para que los cambios se guarden, debes terminar la revisión.',
              showCancelButton: true,
              confirmButtonText: this.$t('Aceptar'),
              cancelButtonText: this.$t('No')
            });
            if (status.value) {
              this.$emit('cambiarFlagsObjeto', this.id, this.rechazo);
              this.limpiar();
            }
          }
        }
        if (this.tipoObjeto == 'cuentaBancaria') {
          if (this.tipo == 'tipoActivo') {
            let response = await this.rechazarCuenta();
            if (response.data.estado) {
              this.responseRequest(response.data);
              // this.cancelarRechazo();
              this.$emit('cambiarFlagsObjeto', this.id, this.rechazo);
              this.limpiar();
            } else {
              this.sweetAlert(response.data);
            }
          }
          if (this.tipo == 'tipoRevision') {
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: 'Para que los cambios se guarden, debes terminar la revisión.',
              showCancelButton: true,
              confirmButtonText: this.$t('Aceptar'),
              cancelButtonText: this.$t('No')
            });
            if (status.value) {
              this.$emit('cambiarFlagsObjeto', this.id, this.rechazo);
              this.limpiar();
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    getDefaultData() {
      return {
        rechazo: '',
        mensajeRechazo: '',
        banderaCierre: false
      };
    },

    cancelarRechazo() {
      let bandera = this.banderaCierre ? true : false;
      this.limpiar();
      this.$emit('cancelarHijo',bandera);
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
