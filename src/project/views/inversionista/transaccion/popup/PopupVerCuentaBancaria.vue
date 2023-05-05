<template lang="pug">
  div.demo-alignment
    vx-popup.width-popup-90( :title="$t('VER CUENTA BANCARIA')" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
      div.vx-row.mb-3
        div.vx-col.w-full(class="md:w-1/2")
          div.vx-row.mb-5
            div.vx-col.w-full.text-center
              span.title-header.uppercase.bold {{ $t("DATOS DE LA CUENTA BANCARIA") }} 
              vs-divider.mt-2
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Entidad Bancaria: ") }} 
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_entidadBancaria" disabled)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo de Cuenta: ") }} 
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_tipoCuenta" disabled) 
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Moneda: ") }} 
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_moneda" disabled) 
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Número de Cuenta: ") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_numeroCuenta" disabled)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("CCI: ") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_cci" disabled)
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Estado: ") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.cuentaBancaria_estado" disabled) 
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Estado de Cuenta: ") }} 
            div.vx-col.w-full(class="sm:w-2/3")
              view-download( :src="dataCuenta.titular_estadoCuenta" :titleDescargar="'Guardar'" @descargar="descargar(dataCuenta.cuentaBancaria_id)" )
        div.vx-col.w-full(class="md:w-1/2") 
          div.vx-row.mb-5
            div.vx-col.w-full.text-center
              span.title-header.uppercase.bold {{ $t("DATOS DE BACK-OFFICE") }} 
              vs-divider.mt-2
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Observaciones Última Revisión: ") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( v-model="dataCuenta.backOffice_observaciones" disabled)
      div.vx-col.w-full
          footer-data(:items='footer')
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
import FooterData from '@/components/footer/FooterData';
import VxButton from '@/components/buttons/Button.vue';

export default {

  name: 'PopupVerCuentaBancaria',
  mixins: [request,files],

  components: {
    FooterOpciones,
    ViewDownload,
    funciones,
    TextsBox,
    PopupRechazarTipo,
    FooterData,
    VxButton
  },

  props: {
    popupAbrir: {
      type: Boolean,
      default: false
    },
    parametro : {
      type: String,
      default: ''
    },
  },

  data() {
    return this.getDefaultData()
  },

  watch:{
    popupAbrir(val){
      if(val){
        this.cargarCuentaBancaria();
      }
    }
  },
  
  methods:{

    getDefaultData(){
      return {
        dataCuenta : {
          cuentaBancaria_id: '',
          cuentaBancaria_entidadBancaria: '',
          cuentaBancaria_tipoCuenta: '',
          cuentaBancaria_moneda: '',
          cuentaBancaria_numeroCuenta: '',
          cuentaBancaria_cci: '',
          cuentaBancaria_estado: '',
          titular_nombre: '',
          titular_tipoDocumento: '',
          titular_numeroDocumento: '',
          titular_estadoCuenta: '',
          backOffice_observaciones: ''
        },
        footer : []
      }
    },

    async cargarCuentaBancaria(){
      try {
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_cuenta_bancaria_bo?id=${this.parametro}`);
        //let { data } = await this.requestApi(`ver_cuenta_bancaria_fintech_bo?id=${this.parametro}`);
        let response = data.data;
        if (response.estado) {
          this.dataCuenta.cuentaBancaria_id = response.data[0].id_cuentabancaria;
          this.dataCuenta.cuentaBancaria_entidadBancaria = response.data[0].entidad_bancaria;
          this.dataCuenta.cuentaBancaria_tipoCuenta = response.data[0].tipo_cuenta;
          this.dataCuenta.cuentaBancaria_moneda = response.data[0].moneda;
          this.dataCuenta.cuentaBancaria_numeroCuenta = response.data[0].numero_cuenta;
          this.dataCuenta.cuentaBancaria_cci = response.data[0].cci;
          this.dataCuenta.cuentaBancaria_estado = response.data[0].descripcion_estado_cuenta_bancaria;
          this.dataCuenta.titular_nombre = response.data[0].nombre;
          this.dataCuenta.titular_tipoDocumento = response.data[0].tipo_documento;
          this.dataCuenta.titular_numeroDocumento = response.data[0].numero_documento;
          this.dataCuenta.titular_estadoCuenta = response.data[0].estado_cuenta ? await this.convertPath(response.data[0].estado_cuenta) : null;
          this.dataCuenta.backOffice_observaciones = response.data[0].observaciones_ultima_revision;

          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value: response.data[0].footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value: response.data[0].footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value: response.data[0].footer_usuariobo_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value: response.data[0].footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value: response.data[0].footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value: response.data[0].footer_usuariobo_actualizacion }
          ];    
        } else {
          //this.sweetAlert(response);
          this.limpiar();
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

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

    cancelar(){
      this.limpiar();
      this.$emit('closePopup');
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    }

  },
  
};
</script>