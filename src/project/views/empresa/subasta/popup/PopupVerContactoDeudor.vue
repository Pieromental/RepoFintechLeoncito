<template lang="pug">
  div
    vx-popup.width-popup-60(:title="$t('VER CONTACTO [MODO VISTA]')" :active="popupAbrir" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )

      vx-card.card-style-collapse(:title="$t('Datos del Deudor')" )
        div.vx-row.mt-3
          div.vx-col.w-full.mx-auto(class="md:w-4/5")

            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Nombres: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="nombres" name="nombres" v-model="data.deudor_contacto_nombres" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Apellidos:") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="apellidos" name="apellidos" v-model="data.deudor_contacto_apellidos" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Cargo: ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="cargo" name="cargo" v-model="data.deudor_contacto_descripcion_cargo" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Correo:  ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="correo" name="correo" v-model="data.deudor_contacto_correo" :disabled="true")
                
            div.vx-row.mb-3
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Teléfono:  ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="telefono" name="telefono" v-model="data.deudor_contacto_telefono" :disabled="true")
                
            div.vx-row.mb-6
              div.vx-col.w-full(class="sm:w-1/3")
                span.font-label.bold {{ $t("Estado:  ") }} 
              div.vx-col.w-full(class="sm:w-2/3")
                texts-box( ref="estado" name="estado" v-model="data.deudor_contacto_estado ? 'ACTIVO' : 'INACTIVO'" :disabled="true")
                
      div.vx-row.mb-3
        div.vx-col.w-full
          footer-datos( :items='footer' )
        
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import FooterDatos from '@/components/footer/FooterData';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';

import parametros from '@/mixins/mixinParametros';

export default {

  name: 'PopupInactivacionUsuario',
  mixins: [request,files],

  components: {
    FooterOpciones,
    FooterDatos,
    CheckBox,
    TextsBox,
    ViewDownload
  },

  props: {
    popupAbrir: {
      type: Boolean,
      default: false
    },
    parametro:{
      type : Object,
      default: () => {}
    }
  },
  
  data() {
    return this.getDefaultData()
  },
  watch:{
    popupAbrir(){
      if( this.popupAbrir ){
        this.cargarContactoDeudor(this.parametro.id);
        
      }
    }
  },
  
  methods:{
    async cargarContactoDeudor(id){
       try {        
        if(!id) return
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`ver_revision_deudor?id=${id}`);
        let response = data.data;
        if (response.estado) {
          const [ informacion ] = response.data;
          this.data = informacion;
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value: informacion.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value: informacion.footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value: informacion.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value: informacion.footer_ip_actualizacion },
          ];
        }else{
          this.data = {};
          this.footer = {};
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async descargar(id) {
      alert("LERO LERO")
      /* try {
        this.$vs.loading({ type: 'point' });
        //await this.funcDescargar(`descargar_estado_cuenta?idCuentaBancaria=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } */
    },

    getDefaultData(){
      return {
        data : {},
        footer : [],
        observacion: "",
        mensajeObservacion: "",
      }
    }, 

    cancelar(){
      this.limpiar();
      this.$emit('closePopup',false);
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },
  
};
</script>