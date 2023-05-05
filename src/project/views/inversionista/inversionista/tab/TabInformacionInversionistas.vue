<template lang="pug">
  div
    popup-rechazo(:popupRazonActive="mostrarPopupRechazo" @closePopup="closePopup" @enviarRechazo="enviarRechazo" :id="idEnviar" )
    vx-card.vxcard-floating
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Datos Principales')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Nombre Completo") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.nombre_completo" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Apellido Paterno')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.apellido_paterno" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Apellido Materno')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.apellido_materno" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Teléfono") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.telefono" :disabled="true")  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Correo Electrónico") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.correo_electronico" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Estado") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.descripcion_estadousu" :disabled="true")  
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Información Personal')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.descripcion_tipodocumento" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Número de Documento - Dígito Verificador DNI')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="datosDni" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Fecha Nacimiento')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.fecha_nacimiento" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Género") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.genero_descripcion" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Departamento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.departamento" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Provincia") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.provincia" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Distrito") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.distrito" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Frente del Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataInversionista.documento_anverso" :titleDescargar="'Guardar'" @descargar="descargarAnverso(dataInversionista.id_usuario)" )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Reverso del Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataInversionista.documento_reverso" :titleDescargar="'Guardar'" @descargar="descargarReverso(dataInversionista.id_usuario)" )
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Información Laboral')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Responsabilidad") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.tipo_responzabilidad_descripcion" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('RUC')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.ruc" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Razón Social')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.razon_social" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Trabajo") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.descripcion_tipodetrabajo" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Actividad Económica") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.descripcion_actividad_economica" :disabled="true")
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Documentación')" collapse-action v-if="dataInversionista.tipo_responzabilidad_codigo == 'JUR'")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Certificado de Vigencia de Poder") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataInversionista.certificado_vigencia_poder" :titleDescargar="'Guardar'" @descargar="descargarCertificado(dataInversionista.id_usuario)" )  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Ficha RUC')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataInversionista.rutaficharuc" :titleDescargar="'Guardar'" @descargar="descargarFichaRuc(dataInversionista.id_usuario)" )             
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Datos Back-Office')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Bloqueado") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              vs-checkbox(v-model="dataInversionista.bloqueado_flag" :disabled="true" size="small")      
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Observaciones Ultima Revision')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataInversionista.ultima_observacion" :disabled="true")    
      div.vx-col.w-full
        footer-datos(:items='footer')          
      div.vx-row.vs-justify-center(v-if='flagButton && botonValidacion')          
        vx-button.mr-3(@click="btnAprobar()" :disabled="verBotones") {{$t('Aprobar')}}                    
        vx-button(@click="btnRechazar()" :disabled="verBotones") {{$t('Rechazar')}}
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import PopupRechazo from "@/project/views/inversionista/inversionista/popup/RechazarInversionista.vue";
import VxButton from '@/components/buttons/Button.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import FooterDatos from '@/components/footer/FooterData';
export default {
  name: 'TabInformacionInversionista',
  mixins: [request,files],
  
  components: {
    ViewDownload,
    PopupRechazo,
    VxButton,
    TextsBox,
    FooterDatos
  },

  props: {
    dataInversionista: {
      type: Object,
      default: () => {}
    },
    datosDni:{
      type: String,
      default:""
    },
    flagButton:{
      type:Boolean,
      default:false,
    },
    botonValidacion:{
      type:Boolean,
      default:false,
    },
    footer: {
      type: Array,
      default: () => {}
    },
  },

  data() {
    return{
      verBotones: false,
      mostrarPopupRechazo: false,
      idEnviar:0,
      isMounted: false,
    }
  },
  methods: {

    //METODOS DE LA VENTANA

    enviarRechazo(rechazo, bandera){
      if (bandera) {
        this.$emit("recibirRechazo", rechazo, bandera); //Bandera estado True fue Rechazado
        this.verBotones = true;
      }
    },
    async btnAprobar(){
      try {
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: this.$t('¿Estás seguro de aprobar el registro?'),
          showCancelButton: true,
          confirmButtonText: this.$t('Si'),
          cancelButtonText: this.$t('No')
        });
      if(status.value){
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: this.$t('Para que los cambios se guarden, debes Terminar la Revisión.'),
            showCancelButton: false,
            confirmButtonText: this.$t('Aceptar'),
          });
          if (status.value) {            
            this.$emit("recibirRechazo", "", false); //Bandera estado false NO fue Rechazado
          }
          this.verBotones = true;
        }else{
          this.verBotones = false;
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    btnRechazar(){
      this.idEnviar = this.dataInversionista.id_usuario;   
      this.mostrarPopupRechazo = true;    
    },

    //METODOS GENERALES

    async descargarAnverso(id) {
     try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_anverso_documento_empresa?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async descargarReverso(id) {
    try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_reverso_documento_empresa?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async descargarCertificado(id){
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_certificado_vigencia_poder_empresa?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async descargarFichaRuc(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_ficha_ruc_empresa?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async closePopup() {
      this.mostrarPopupRechazo = false;      
    },
    async mounted() {
      try {
        this.isMounted = true;
      } catch (error) {
        throw new Error(error);
      } 
    }
  }

}
</script>


