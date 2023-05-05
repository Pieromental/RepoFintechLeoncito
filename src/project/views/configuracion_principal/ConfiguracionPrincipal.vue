<template lang="pug">
  div.styleConfig
    vx-card.card-sticky-floating
      div.vx-row
        form.w-full
          vx-card.card-style-collapse(:title="$t('Datos Principales')" collapse-action)
            div.vx-row
              div.vx-col.w-full(class="md:w-5/6")
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    span.font-label.bold {{ $t("Nombre") }} 
                  div.vx-col.w-full(class="sm:w-1/2")
                    texts-box.w-full(size="small" v-model="fintech.nombre" :disabled="true")          
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    span.bold.font-label {{$t('Dirección')}} 
                    span.font-label (150)
                  div.vx-col.w-full(class="sm:w-1/2")
                    texts-box.w-full(size="small" autocomplete="off" ref="direccion" name="direccion"  v-model="fintech.direccion" v-mask="{ mask:funcionMascara(150,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}" :disabled="!checkBox1")
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    span.bold.font-label {{$t('Teléfono')}} 
                    span.font-label (9)
                      span.font-label.bold.text-danger  *
                  div.vx-col.w-full(class="sm:w-1/2")
                    groups-box
                      template(v-if="checkBox1" slot="prepend")
                        div(class="prepend-text" :title="`${$t('Código del Perú')}`")
                          span.font-label +51
                      texts-box(size="small" autocomplete="off" id ="telefono" ref="telefono" name="telefono"  v-model="fintech.telefono"  @focus="focus('telefono')"  v-mask="{ mask:funcionMascara(9,'D'), tokens:{ 'D': {pattern: /[0-9]/}}}" @blur="validarTelefono();blur('telefono')" :disabled="!checkBox1")
                    span.font-error.text-danger(v-if="mensajeTelefono") {{ $t(mensajeTelefono) }}
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    span.bold.font-label {{$t('Correo Electrónico')}} 
                    span.font-label (70)
                      span.font-label.bold.text-danger  *
                  div.vx-col.w-full(class="sm:w-1/2")
                    texts-box.w-full(size="small" autocomplete="off" id ="correoElectronico" ref="correoElectronico" name="correoElectronico"  v-model="fintech.correo_electronico" @focus="focus('correoElectronico')" v-mask="{ mask:funcionMascara(70,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}"  @blur="validarCorreoElectronico(fintech.correo_electronico);blur('correoElectronico')" :disabled="!checkBox1")
                    span.font-error.text-danger(v-if="mensajeCorreoElectronico") {{ $t(mensajeCorreoElectronico) }}
                    span.font-error.text-danger(v-if="mensajeFormatoCorreoElectronico") {{ $t(mensajeFormatoCorreoElectronico) }}
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    span.bold.font-label {{$t('Correo de Contacto')}} 
                    span.font-label (70)
                      span.font-label.bold.text-danger  *
                  div.vx-col.w-full(class="sm:w-1/2")
                    texts-box.w-full(size="small" autocomplete="off" id="CorreoContacto" ref="correoContacto" name="correoContacto"  v-model="fintech.correo_contacto" @focus="focus('correoContacto')" v-mask="{ mask:funcionMascara(70,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}"  @blur="validarCorreoContacto(fintech.correo_contacto);blur('correoContacto')"  :disabled="!checkBox1")
                    span.font-error.text-danger(v-if="mensajeCorreoContacto") {{ $t(mensajeCorreoContacto) }}
                    span.font-error.text-danger(v-if="mensajeFormatoCorreoContacto") {{ $t(mensajeFormatoCorreoContacto) }}
                div.vx-row.mb-3
                  div.vx-col.w-full(class="sm:w-1/3")
                    vx-button(v-if="!checkBox1" @click="checkBox1 = !checkBox1") {{$t('Modificar')}}                    
                  div.vx-col.w-full(class="sm:w-1/3")
                    vx-button(v-if="checkBox1" @click="btnGuardar()") {{$t('Guardar')}}                    
                  div.vx-col.w-full(class="sm:w-1/3")
                    vx-button(v-if="checkBox1" @click="btnDescartar()") {{$t('Descartar')}}                    
    vx-card.card-sticky-floating
      div.vx-row         
        vx-card.card-style-collapse(:title="$t('Cuentas Bancarias')" collapse-action)  
          vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
            template(slot="thead")
              vx-th.uppercase( colspan="1" rowspan="2" center min-width="80") {{$t('Acciones')}}
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="detalle_entidad_bancaria"  min-width="250") {{$t('Entidad Bancaria')}}
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="detalle_tipo_cuenta"  min-width="200") {{$t('Tipo de Cuenta')}}
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="detalle_moneda"  min-width="100") {{$t('Moneda')}}
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="numero_cuenta"  min-width="150") {{$t('Número de Cuenta')}}
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="cci"  min-width="150") {{$t('CCI')}}
              vx-th.uppercase( colspan="3" rowspan="1" center min-width="450") {{$t('Titular')}} 
              vx-th.uppercase( colspan="1" rowspan="2" sort-key="detalle_estado" min-width="100") {{$t('Estado')}}       
            template(slot="mhead")
              tr                 
                vx-th.uppercase( sort-key="titular" min-width="150") {{$t('Nombre Titular')}}
                vx-th.uppercase( sort-key="detalle_tipo_documento" min-width="150") {{$t('Tipo de Documento')}}
                vx-th.uppercase( sort-key="numero_documento" min-width="150") {{$t('Número de Documento')}}
            template(slot-scope="{data}")
              tbody(class="table-text-sm")
                vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                  vx-td.text-center
                    .d-f.vs-justify-center
                      feather-icon.style-icon.p-0( @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')
                  vx-popup.width_nro_cuenta(:title="$t('Cuenta Nro.')+ cuentaBancaria.numero_cuenta" :active="openPopup" @close="closePopup" :click-not-close="false" classContent="popup-example")
                    div.vx-row
                      div.vx-col.w-full(class="md:w-1/2")
                        div.vx-row.mb-3
                          div.vx-col.w-full.text-center
                            span.title-header.uppercase.bold {{ $t('Datos de la Cuenta Bancaria') }}
                            vs-divider.mt-2
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Entidad Bancaria:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.detalle_entidad_bancaria" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Tipo de Cuenta:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.detalle_tipo_cuenta" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Moneda:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.detalle_moneda" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Número de Cuenta:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.numero_cuenta" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("CCI:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.cci" :disabled="true") 
                      div.vx-col.w-full(class="md:w-1/2")            
                        div.vx-row.mb-3
                          div.vx-col.w-full.text-center
                            span.title-header.uppercase.bold {{ $t('Datos del Titular') }}
                            vs-divider.mt-2
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Nombre:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.titular" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Tipo de Documento:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.detalle_tipo_documento" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Número de Documento:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.numero_documento" :disabled="true") 
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Estado de Cuenta:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            view-download( :src="estadoCuenta" :titleDescargar="'Guardar'" @descargar="descargar(cuentaBancaria.id_cuenta_bancaria)" )
                        div.vx-row.mb-3
                          div.vx-col.w-full(class="sm:w-1/3")
                            span.font-label.bold {{ $t("Estado:") }} 
                          div.vx-col.w-full(class="sm:w-2/3")
                            texts-box.w-full(size="small" v-model="cuentaBancaria.detalle_estado" :disabled="true") 
                      div.vx-col.w-full
                        footer-datos(:items='footer')
                  vx-td.text-left(:data="tr.detalle_entidad_bancaria") {{tr.detalle_entidad_bancaria}}
                  vx-td.text-left(:data="tr.detalle_tipo_cuenta") {{tr.detalle_tipo_cuenta}}
                  vx-td.text-left(:data="tr.detalle_moneda") {{tr.detalle_moneda}}
                  vx-td.text-left(:data="tr.numero_cuenta") {{tr.numero_cuenta}}
                  vx-td.text-left(:data="tr.cci") {{tr.cci}}                  
                  vx-td.text-left(:data="tr.titular") {{tr.titular}}
                  vx-td.text-left(:data="tr.detalle_tipo_documento") {{tr.detalle_tipo_documento}}
                  vx-td.text-left(:data="tr.numero_documento") {{tr.numero_documento}}
                  vx-td.text-center(:data="tr.detalle_estado") {{tr.detalle_estado}}
</template>

<script>

import funciones from '@/functions';
import request from '@/mixins/mixinRequest';
import helperFunctions from "@/functions";
import files from '@/mixins/mixinFiles';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import VxButton from '@/components/buttons/Button.vue';
import GroupsBox from '@/components/fields/input/GroupsBox.vue';
import FooterDatos from '@/components/footer/FooterData';

export default {

  name: 'ConfiguracionPrincipal',
  mixins: [request, files],
  
  components: {
    ViewDownload,
    TextsBox,
    GroupsBox,
    VxButton,
    FooterDatos
  },

  data(){
    return {
      listarCuentas: [],

      fintech: {
        id:'',
        direccion: '',
        telefono: '',
        correo_electronico: '',
        correo_contacto: '',
      },
      cuentaBancaria: {},
      footer:[],
      checkBox1:false,
      openPopup: false,
      mensajeTelefono:'',
      mensajeCorreoElectronico:'',
      mensajeFormatoCorreoElectronico:'',
      mensajeCorreoContacto:'',
      mensajeFormatoCorreoContacto:'',
      isMounted:'',
      estadoCuenta:'',

    }
  },

  computed: {
    listado(){
      return this.listarCuentas;
    }
  },

  methods: {

    async descargar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_estado_cuenta?idCuentaBancaria=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async listar() {
      try {   
        if(this.isMounted) this.$vs.loading({ type: 'point' });     
        let { data } = await this.requestApi(`listar_cuenta_bancaria_fintech_bo`);
        let response = data.data;
        if (response.estado) {
          this.listarCuentas = response.data;
        } else {
          this.listarCuentas = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async btnDescartar(){      
      try {
        this.checkBox1 = !this.checkBox1;
        this.mensajeTelefono = '';
        this.mensajeCorreoElectronico = '';
        this.mensajeFormatoCorreoElectronico = '';
        this.mensajeCorreoContacto = '';
        this.mensajeFormatoCorreoContacto = '';
        await this.cargarDatos();
      } catch (error) {
        throw new Error(error);
      }
    },

    validarTelefono(){
      if(this.fintech.telefono){
        this.mensajeTelefono = "";
      }else{
        this.mensajeTelefono = "El Teléfono es requerido.";
      }
    },

    validarCorreoElectronico(correo){
      if(correo){
        let variable = helperFunctions.validateEmail(correo);
        if(variable){
          this.mensajeFormatoCorreoElectronico ="";
          this.mensajeCorreoElectronico = "";
        }else{         
          this.mensajeFormatoCorreoElectronico="El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar." 
          this.mensajeCorreoElectronico = "";
        }        
      }else{
        this.mensajeCorreoElectronico = "El Correo Electrónico es requerido.";
      }
    },

    validarCorreoContacto(correo){
      if(correo){
        let variable = helperFunctions.validateEmail(correo);
        if(variable){
          this.mensajeFormatoCorreoContacto ="";
          this.mensajeCorreoContacto = "";
        }else{         
          this.mensajeFormatoCorreoContacto="El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar." 
          this.mensajeCorreoContacto = "";
        }        
      }else{
        this.mensajeCorreoContacto = "El Correo de Contacto es requerido.";
      }
    },

    showErrors() {

      if(this.fintech.telefono) this.mensajeTelefono = "";
      else  this.mensajeTelefono = "El Teléfono es requerido.";      
      if(this.fintech.correo_electronico){
        let variable = helperFunctions.validateEmail(this.fintech.correo_electronico);
        if(variable){
          this.mensajeFormatoCorreoElectronico ="";
          this.mensajeCorreoElectronico = "";
        }else{         
          this.mensajeFormatoCorreoElectronico="El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar." 
          this.mensajeCorreoElectronico = "";
        }        
      }else{
        this.mensajeCorreoElectronico = "El Correo Electrónico es requerido.";
      }

      if(this.fintech.correo_contacto){
        let variable = helperFunctions.validateEmail(this.fintech.correo_contacto);
        if(variable){
          this.mensajeFormatoCorreoContacto ="";
          this.mensajeCorreoContacto = "";
        }else{         
          this.mensajeFormatoCorreoContacto="El texto ingresado no corresponde a un correo electrónico. Debe ingresar un correo electrónico para continuar." 
          this.mensajeCorreoContacto = "";
        }        
      }else{
        this.mensajeCorreoContacto = "El Correo de Contacto es requerido.";
      }
      
      if( !this.mensajeTelefono && !this.mensajeCorreoElectronico && !this.mensajeFormatoCorreoElectronico && !this.mensajeCorreoContacto && !this.mensajeFormatoCorreoContacto ){
        return false;        
      } 
      else return true;
    },

    async btnGuardar(){      
      try {
        if (this.showErrors()) return
        let response = await this.actualizar();
        if (response.data.estado) {
          this.responseRequest(response.data);
          await this.cargarDatos();
          this.checkBox1 = !this.checkBox1;
        }else{
          this.sweetAlert(response);
        }        
      } catch (error) {
         throw new Error(error);
      }
    },

    async actualizar(){
      this.$vs.loading({ type: "point" });
      try {
        let put = this.fintech;
        put.id = this.fintech.id;
        put.direccion = this.fintech.direccion;
        put.telefono = this.fintech.telefono;
        put.correo_electronico = this.fintech.correo_electronico;
        put.correo_contacto = this.fintech.correo_contacto;
        put.ip_actualizacion = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_fintech", put, "PUT");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async ver(id){    
      try {       
        this.openPopup = true;
        this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi(`ver_cuenta_bancaria_fintech_bo?id=${id}`);
        let response = data.data;
        if (response.estado) {
          this.cuentaBancaria = response.data[0];
          this.estadoCuenta = response.data[0].ruta_estado_cuenta ? await this.convertPath(response.data[0].ruta_estado_cuenta) : null;
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.cuentaBancaria.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.cuentaBancaria.footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value:this.cuentaBancaria.footer_usuariobo_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:this.cuentaBancaria.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:this.cuentaBancaria.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:this.cuentaBancaria.footer_usuariobo_actualizacion }
          ];    
        } else {
          this.cuentaBancaria = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    closePopup() {
      this.openPopup = false;
    },

    blur(element) {
      if (this[element] == "") {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    async cargarDatos() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let { data } = await this.requestApi(`ver_fintech`);
        let response = data.data;
        if(response.estado){
          this.fintech.id = response.datos[0].id;
          this.fintech.telefono = response.datos[0].telefono;
          this.fintech.direccion = response.datos[0].direccion;
          this.fintech.correo_electronico = response.datos[0].correo_electronico;
          this.fintech.correo_contacto = response.datos[0].correo_contacto;
          this.fintech.nombre = response.datos[0].nombre;
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    },

  },

  async mounted() {
    try {
      this.$vs.loading({ type: "point" });
      await this.cargarDatos();
      await this.listar();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  },

};

</script>

<style lang="scss">
.styleConfig{
  .vx-card.card-sticky-floating{
    top: 3rem !important;
  }
}
.width_nro_cuenta .vs-popup {
  width: 70% !important;
}
</style>