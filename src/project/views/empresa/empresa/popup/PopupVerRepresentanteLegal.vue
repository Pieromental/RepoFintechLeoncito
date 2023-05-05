<template lang="pug">
    div
      popup-rechazar-tipo(:popupRazonActive="mostrarPopupRechazar" @cancelarHijo="cancelarHijo" @cambiarFlagsObjeto="cambiarFlagsObjeto" :id="idEnviar" :tipo="tipoEnviar" :tipoObjeto="tipoObjetoEnviar" :idUsuario="idUsuarioEnviar")
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t('VER REPRESENTANTE LEGAL')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
        div.vx-row
          div.vx-col.w-full(class="md:w-1/2")
            div.vx-row.mb-3
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t('Datos del Representante Legal') }}
                vs-divider.mt-2
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Tipo de Documento:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.descripcion_tipo_documento" :disabled="true")
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Número de Documento:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.numero_documento" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Nombres:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.nombres" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Apellidos:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.apellidos" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("RUC:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.ruc" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Correo Electrónico:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.correo_electronico" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Teléfono:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.telefono" :disabled="true") 
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Es Instancia del Usuario:") }} 
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
                span.font-label.bold {{ $t("Estado:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.descripcion_estado" :disabled="true")
          div.vx-col.w-full(class="md:w-1/2")
            div.vx-row.mb-3
              div.vx-col.w-full.text-center
                span.title-header.uppercase.bold {{ $t('Datos Back-Office') }}
                vs-divider.mt-2
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Observaciones Última Revisión:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box.w-full(size="small" v-model="dataRepresentante.observaciones_ultima_revision" :disabled="true")
        div.vx-col.w-full
          footer-data(:items='footer')        
        div.vx-row.vs-justify-center(v-if="tipo=='revisar'")
          vx-button.mr-2(@click="aprobar(dataRepresentante.id_representantelegal, dataRepresentante.codigo_estado_usuario)") {{$t('Aprobar')}}
          vx-button(@click="rechazar(dataRepresentante.id_representantelegal, dataRepresentante.id_usuario, dataRepresentante.codigo_estado_usuario)") {{$t('Rechazar')}}        
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import PopupRechazarTipo from "@/project/views/empresa/empresa/popup/PopupRechazarTipo.vue";
import VxButton from '@/components/buttons/Button.vue';
import FooterData from '@/components/footer/FooterData.vue';

export default {

  name: 'PopupVerRepresentanteLegal',
  mixins: [request,files],

  components: {
    FooterOpciones,
    ViewDownload,
    funciones,
    PopupRechazarTipo,
    TextsBox,
    VxButton,
    FooterData
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
    tipo:{
      type: String,
      default:''
    },
    footer: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return this.getDefaultData()
  },
  
  methods:{

    async cambiarFlagsObjeto(idAux, rechazo){
      this.limpiar();
      this.$emit('cambiarFlagsRechazo',idAux, rechazo);
    },

    async aprobarFuncion(idAux){      
      try {    
        this.$vs.loading({ type: 'point' });   
        let put={};
        put.id = idAux;
        put.ip= await require('public-ip').v4();
        let { data } = await this.requestApi('aprobar_revision_representante_legal_bo', put,"PUT");
        return data;     
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }      
    },

    async aprobar(idAux, estado){
      try {
        if(estado == "ACT"){
          // this.flagListar = true;
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: this.$t('¿Estás seguro de aprobar el registro?'),
            showCancelButton: true,
            confirmButtonText: this.$t('Si'),
            cancelButtonText: this.$t('No')
          });
          if (status.value) {
            let response = await this.aprobarFuncion(idAux);
            if(response.data.estado){
              // this.cancelar();
              this.$emit('cambiarFlags',idAux);
              this.limpiar();
              this.responseRequest(response.data);
            }else{
              this.sweetAlert(response.data);
            } 
          }; 
        }  
        if(estado == "REV"){
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
              confirmButtonText: this.$t('Aceptar'),
            });
            if (status.value) {
              this.$emit('cambiarFlags',idAux);
              this.limpiar();
            }
          }; 
        } 
      } catch (error) {
        throw new Error(error);
      }   
    },

    rechazar(idAux, idUsuario, estado){
      if(estado == "ACT"){
        this.mostrarPopupRechazar = true;
        this.idEnviar = idAux;
        this.tipoEnviar = "tipoActivo";
        this.tipoObjetoEnviar = "representanteLegal"
        this.idUsuarioEnviar = idUsuario;           
      }  
      if(estado == "REV"){
        this.mostrarPopupRechazar = true;
        this.idEnviar = idAux;
        this.tipoEnviar = "tipoRevision"
        this.tipoObjetoEnviar = "representanteLegal"
        this.idUsuarioEnviar = idUsuario;           
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

    async descargarFrente(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_anverso_documento_representante_legal?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        mostrarPopupRechazar:false,
        tipoEnviar:"",
        idEnviar:0,
        tipoObjetoEnviar:"",
        idUsuarioEnviar:0,
        flagListar: false,
      }
    },

    cancelar(){
      let bandera = false;
      if (this.flagListar) {
        bandera = true;
      }else{
        bandera = false;
      }
      this.limpiar();
      this.$emit('closePopup', bandera);
    },

    cancelarHijo(bandera){
      this.limpiar();
      if(bandera){
        this.$emit('closePopup',true);
      }
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },
  
};
</script>