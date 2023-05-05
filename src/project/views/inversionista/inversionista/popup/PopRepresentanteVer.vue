<template lang="pug">
    div
      popup-rechazar-por-tipo(:popupRazonActive="mostrarPopupRechazar" @cancelarHijo="cancelarHijo" @cambiarFlagsObjeto="cambiarFlagsObjeto" :id="idEnviar" :tipo="tipoEnviar" :tipoObjeto="tipoObjetoEnviar" :idUsuario="idUsuarioEnviar")
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('VER REPRESENTANTE LEGAL')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
        div.vx-row
          div.vx-col.w-full(class="md:w-1/2")
            div.vx-row.mb-5
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t("DATOS DEL REPRESENTANTE LEGAL") }} 
                vs-divider.mt-2
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Tipo de Documento: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.descripcion_tipo_documento" :disabled="true")
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Numero de Documento: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.numero_documento" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Nombres: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.nombres" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Apellidos: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.apellidos" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("RUC: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.ruc" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Correo Electronico: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.correo_electronico" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Telefono: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.telefono" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Es Instancia del Usuario: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                vs-checkbox(v-model="dataRepresentante.es_instancia_usuario" :disabled="true" size="small") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Frente del ") + dataRepresentante.codigo_tipo_documento }} 
              div.vx-col.w-full(class="sm:w-2/3")
                view-download( :src="dataRepresentante.frente_documento" :titleDescargar="'Guardar'" @descargar="descargarFrente(dataRepresentante.id_representantelegal)" )
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Reverso del ") + dataRepresentante.codigo_tipo_documento }} 
              div.vx-col.w-full(class="sm:w-2/3")
                view-download( :src="dataRepresentante.reverso_documento" :titleDescargar="'Guardar'" @descargar="descargarReverso(dataRepresentante.id_representantelegal)" )
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Estado: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.descripcion_estado" :disabled="true") 
          div.vx-col.w-full(class="md:w-1/2")         
            div.vx-row.mb-5
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t("DATOS DE BACK-OFFICE") }} 
                vs-divider.mt-2
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Observaciones Ultima Revision: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.observaciones_ultima_revision" :disabled="true")
        div.vx-col.w-full.mb-5
          footer-datos(:items='footer')
        div.vx-row.vs-justify-center 
            vx-button.mr-3(v-if="tipo=='revisar'" type="line" @click="aprobar(dataRepresentante.id_representantelegal,dataRepresentante.id_usuario,dataRepresentante.codigo_estado_usuario)") Aprobar
            vx-button(v-if="tipo=='revisar'" type="line" @click="rechazar(dataRepresentante.id_representantelegal,dataRepresentante.id_usuario, dataRepresentante.codigo_estado_usuario)") Rechazar        
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import FooterDatos from '@/components/footer/FooterData';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import VxButton from '@/components/buttons/Button.vue';
import PopupRechazarPorTipo from '@/project/views/inversionista/inversionista/popup/PopUpRechazarPorTipo.vue';

export default {
  name: 'PopupInactivacionUsuario',
  mixins: [request, files],

  components: {
    FooterOpciones,
    ViewDownload,
    TextsBox,
    VxButton,
    FooterDatos,
    PopupRechazarPorTipo
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    dataRepresentante: {
      type: Object,
      default: () => {}
    },
    tipo: {
      type: String,
      default: ''
    },
    footer: {
      type: Array,
      default: () => {}
    }
  },

  data() {
    return this.getDefaultData();
  },

  methods: {
    async cambiarFlagsObjeto(idAux, rechazo) {
      this.limpiar();
      this.$emit('cambiarFlagsRechazo', idAux, rechazo);
    },

    async actualizarEstado(id, idUsuario) {
      try {
        this.$vs.loading({ type: 'point' });
        let put = {};
        put.id_representante_legal = id;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('aprobar_representante_legal_inversionista', put, 'PUT');
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
              text: this.$t('Para que los cambios se guarden, debes terminar la Revisión'),
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

    async rechazar(idAux, idUsuario, estado) {
      try {
        if (estado == 'ACT') {
          this.mostrarPopupRechazar = true;
          this.idEnviar = idAux;
          this.tipoEnviar = 'tipoActivo';
          this.tipoObjetoEnviar = 'representanteLegal';
          this.idUsuarioEnviar = idUsuario;
        }
        if (estado == 'REV') {
          this.mostrarPopupRechazar = true;
          this.idEnviar = idAux;
          this.tipoEnviar = 'tipoRevision';
          this.tipoObjetoEnviar = 'representanteLegal';
          this.idUsuarioEnviar = idUsuario;
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async descargarFrente(ruta) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_anverso_documento_representante_legal?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async descargarReverso(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_reverso_documento_representante_legal?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData() {
      return {
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
