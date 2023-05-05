<template lang="pug">
  div
    popup-rechazo(:popupRazonActive="mostrarPopupRechazo" @closePopup="closePopup" @enviarRechazo="enviarRechazo" :id="idEnviar")
    vx-card.vxcard-floating    
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Información Comercial')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Responsabilidad") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.tipo_responsabilidad" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('RUC')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.ruc" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Razón Social')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.razon_social" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Nombre Comercial") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.nombrecomercial" :disabled="true")  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Actividad Económica") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.actividad_economica" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Departamento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.departamento" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Provincia") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.provincia" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Distrito") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.distrito" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Dirección") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.direccion" :disabled="true")
      
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Datos del Contacto')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Nombre") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.nombres" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Apellido Paterno')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.apellido_paterno" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Apellido Materno')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.apellido_materno" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Teléfono") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.telefono" :disabled="true")  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Correo Electrónico") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.correo_electronico" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.descripcion_tipo_documento" :disabled="true")       
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Número de Documento - Dígito Verificador DNI')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="datosDni" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Fecha Nacimiento')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.fecha_nacimiento" :disabled="true")
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Género") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.genero" :disabled="true")  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Frente del Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataEmpresa.frente_documento" :titleDescargar="'Guardar'" @descargar="descargarFrente(dataEmpresa.idusuario)" )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Reverso del Documento") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataEmpresa.reverso_documento" :titleDescargar="'Guardar'" @descargar="descargarReverso(dataEmpresa.idusuario)" )
              
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Documentación')" collapse-action)
          div.vx-row.mb-3(v-if="dataEmpresa.codigo_tipo_responsabilidad == 'JUR'")
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Certificado de Vigencia de Poder") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataEmpresa.certificado_vigencia_poder" :titleDescargar="'Guardar'" @descargar="descargarCertificado(dataEmpresa.idusuario)" )  
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Ficha RUC')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              view-download( :src="dataEmpresa.ficha_ruc" :titleDescargar="'Guardar'" @descargar="descargarFichaRuc(dataEmpresa.idusuario)" )   
      div.vx-row        
        vx-card.card-style-collapse(:title="$t('Datos Back-Office')" collapse-action)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Bloqueado") }} 
            div.vx-col.w-full(class="sm:w-1/2")
              vs-checkbox(v-model="dataEmpresa.bloqueado" :disabled="true" size="small")      
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.bold.font-label {{$t('Observaciones Última Revisión')}} 
            div.vx-col.w-full(class="sm:w-1/2")
              texts-box.w-full(size="small" v-model="dataEmpresa.observaciones_ultima_revision" :disabled="true")
      footer-data(:items='footer')
      div.vx-row.mb-2.vs-justify-center(v-if='verBotonesFuncion')
        vx-button.mr-2(@click="btnAprobar()" :disabled="verBotones") {{$t('Aprobar')}}
        vx-button(@click="btnRechazar()" :disabled="verBotones") {{$t('Rechazar')}}
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import FooterData from '@/components/footer/FooterData.vue';
import VxButton from '@/components/buttons/Button.vue';
import PopupRechazo from "@/project/views/empresa/empresa/popup/PopupRechazar.vue";


export default {
  name: 'TabInformacionEmpresa',
  mixins: [request,files],
  
  components: {
    ViewDownload,
    PopupRechazo,
    TextsBox,
    FooterData,
    VxButton
  },

  props: {
    dataEmpresa: {
      type: Object,
      default: () => {}
    },
    datosDni:{
      type: String,
      default:""
    },
    footer:{
      type: Array,
      default: () => []
    }
  },

  data() {
    return{
      id:'',
      verBotones: false,
      mostrarPopupRechazo: false,
      idEnviar:0,
      isMounted: false,
      verBotonesFuncion: false,
      tipo:''
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

    async funcionVerBotones(){
      try {   
        if(this.isMounted) this.$vs.loading({ type: 'point' });     
        let { data } = await this.requestApi(`validar_botones_aprobar_empresa_bo?id=${this.id}`);
        let response = data.data;
        if (response.estado) {
          if(response.data[0].mostrar_boton_aprobar) this.verBotonesFuncion = true;
        }else{
          this.$emit("empresaListaMetodo", true);
          this.verBotonesFuncion = false;
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
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
            text: this.$t('Para que los cambios se guarden, debes terminar la revisión.'),
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
      this.idEnviar = this.dataEmpresa.idusuario;   
      this.mostrarPopupRechazo = true;    
    },

    //METODOS GENERALES

    async descargarFrente(id){
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_anverso_documento_empresa?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async descargarReverso(id){
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

    closePopup() {
      this.mostrarPopupRechazo = false;      
    },

    async validarTipo(nombre){
      switch (nombre) {
        case "empresa-empresa-revisar-registro":
          this.tipo = "registrar"
          return
        case "empresa-empresa-ver-registro":
          this.tipo = "ver"
          return
      }
    },

    async mountedEmpresa() {
      try {     
        await this.validarTipo(this.$route.name)      
        this.id = this.$route.params.id ? this.$route.params.id : null; 
        if (this.tipo == "ver") {
          this.verBotonesFuncion = false;
        }else{
          this.funcionVerBotones();
        }      
        this.isMounted = true;
      } catch (error) {
        throw new Error(error);
      }
    },
        
  },

}
</script>