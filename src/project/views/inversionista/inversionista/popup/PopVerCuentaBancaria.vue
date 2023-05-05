<template lang="pug">
    div
      popup-rechazar-por-tipo(:popupRazonActive="mostrarPopupRechazar" @cancelarHijo="cancelarHijo" @cambiarFlagsObjeto="cambiarFlagsObjeto" :id="idEnviar" :tipo="tipoEnviar" :tipoObjeto="tipoObjetoEnviar" :idUsuario="idUsuarioEnviar")
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('VER CUENTA BANCARIA')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
        div.vx-row
          div.vx-col.w-full(class="md:w-1/2")
            div.vx-row.mb-5
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t("DATOS DE LA CUENTA BANCARIA") }} 
                vs-divider.mt-2
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Entidad Bancaria: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.entidad_bancaria" :disabled="true")
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Tipo de Cuenta: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.tipo_cuenta" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Moneda: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.moneda" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Número de Cuenta: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.numero_cuenta" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("CCI: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.cci" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Estado: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataCuenta.descripcion_estado_cuenta_bancaria" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Estado de Cuenta: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                view-download( :src="dataCuenta.estado_cuenta" :titleDescargar="'Guardar'" @descargar="descargar(dataCuenta.id_cuentabancaria)" )
          div.vx-col.w-full(class="md:w-1/2")         
            div.vx-row.mb-5
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t("DATOS DE BACK-OFFICE") }} 
                vs-divider.mt-2
            div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Observaciones Última Revisión: ") }} 
                div.vx-col.w-full(class="sm:w-2/3")
                  texts-box.w-full(size="small" v-model="dataCuenta.observaciones_ultima_revision" :disabled="true") 
        footer-datos(:items='footer')         
        div.vx-row.vs-justify-center(v-if="tipo=='revisar'") 
            vx-button.mr-3(@click="aprobar(dataCuenta.id_cuentabancaria, dataCuenta.id_usuario, dataCuenta.codigo_estado_usuario)") {{ $t("Aprobar") }} 
            vx-button(@click="rechazar(dataCuenta.id_cuentabancaria, dataCuenta.id_usuario, dataCuenta.codigo_estado_usuario)") {{ $t("Rechazar") }}               
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import PopupRechazarPorTipo from '@/project/views/inversionista/inversionista/popup/PopUpRechazarPorTipo.vue';
import FooterDatos from '@/components/footer/FooterData';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import VxButton from '@/components/buttons/Button.vue';
export default {
  name: 'PopupInactivacionUsuario',
  mixins: [request, files],

  components: {
    ViewDownload,
    funciones,
    VxButton,
    PopupRechazarPorTipo,
    FooterDatos,
    TextsBox
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    dataCuenta: {
      type: Object,
      default: () => {}
    },
    footer: {
      type: Array,
      default: () => []
    },
    tipo: {
      type: String,
      default: ''
    }
  },

  data() {
    return this.getDefaultData();
  },

  methods: {
    async descargar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_estado_cuenta_cuenta_bancaria?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async cambiarFlagsObjeto(idAux, rechazo) {
      this.limpiar();
      this.$emit('cambiarFlagsRechazo', idAux, rechazo);
    },

    async actualizarEstado(idAux, idUsuario) {
      try {
        this.$vs.loading({ type: 'point' });
        let put = {};
        put.id = idUsuario;
        put.id_cuenta_bancaria = idAux;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('aprobar_cuenta_bancaria_inversionista', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async aprobar(id, idUsuario, estado) {
      try {
        if (estado == 'ACT') {
          this.flagListar = true;
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: '¿Estás seguro de aprobar el registro?',
            showCancelButton: true,
            confirmButtonText: this.$t('Si'),
            cancelButtonText: this.$t('No')
          });
          if (status.value) {
            let response = await this.actualizarEstado(id, idUsuario);
            if (response.data.estado) {
              this.responseRequest(response.data);
              this.$emit('cambiarFlags', id);
              // this.cancelar();
            } else {
              this.sweetAlert(response.data);
            }
          }
        }
        if (estado == 'REV') {
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: this.$t('¿Estás seguro de aprobar el registro?'),
            showCancelButton: true,
            confirmButtonText: this.$t('Si'),
            cancelButtonText: this.$t('No')
          });
          if (status.value) {
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t('Para que los cambios se guarden, debes terminar la revisión.'),
              showCancelButton: false,
              confirmButtonText: this.$t('Aceptar')
            });
            if (status.value) {
              this.$emit('cambiarFlags', id);
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    rechazar(id, idUsuario, estado) {
      try {
        if (estado == 'ACT') {
          this.mostrarPopupRechazar = true;
          this.idEnviar = id;
          this.tipoEnviar = 'tipoActivo';
          this.tipoObjetoEnviar = 'cuentaBancaria';
          this.idUsuarioEnviar = idUsuario;
        }
        if (estado == 'REV') {
          this.mostrarPopupRechazar = true;
          this.idEnviar = id;
          this.tipoEnviar = 'tipoRevision';
          this.tipoObjetoEnviar = 'cuentaBancaria';
          this.idUsuarioEnviar = idUsuario;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    getDefaultData() {
      return {
        observacion: '',
        mensajeObservacion: '',
        mostrarPopupRechazar: false,
        tipoEnviar: '',
        idEnviar: 0,
        tipoObjetoEnviar: '',
        idUsuarioEnviar: 0,
        flagListar: false
      };
    },

    cancelar() {
      let bandera = false;
      if (this.flagListar) {
        bandera = true;
      }else{
        bandera = false;
      }
      this.limpiar();
      this.$emit('closePopup', bandera);
    },

    cancelarHijo(bandera) {
      this.limpiar();
      if (bandera) {
        this.$emit('closePopup', true);
      }
    },

    limpiar() {
      Object.assign(this.$data, this.getDefaultData());
    }
  }
};
</script>
