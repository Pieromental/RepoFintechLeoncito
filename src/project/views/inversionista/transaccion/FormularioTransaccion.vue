<template lang="pug">
  div
    cabecera( :titulo="$t(titulo)" :btnRechazar="revisar" @rechazar="rechazar" :btnConfirmar="revisar" @confirmar="confirmar" :btnExportar="false" :btnCancelar="false" :btnNuevo="false" :btnListarTodo="false" :btnFiltrar="false" )
    vx-card.card-sticky-floating
      div.vx-row
        div.vx-col.w-full.mx-auto(class="md:w-5/6")
          div.vx-row.mb-3.mt-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Tipo:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="tipo" name="tipo" v-model="transaccion.tipo" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Estado:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="estado" name="estado" v-model="transaccion.estado" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Moneda:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="moneda" name="moneda" v-model="transaccion.moneda" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Monto:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="monto" name="monto" v-model="transaccion.monto" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Cuenta Bancaria Relacionada:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="cuentaBancaria" name="cuentaBancaria" v-model="transaccion.cuentaBancaria" disabled )
              vs-button.font-label.py-2.px-3.mt-2( v-if="transaccion.botonDetalle" size="small" color="primary" @click.stop="abrirCuentaBancaria") {{$t('Ver Detalle de la Cuenta')}}
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Cuenta Progrexa Relacionada:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="cuentaProgrexa" name="cuentaProgrexa" v-model="transaccion.cuentaProgrexa" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Inversionista Relacionado:") }}
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold.ml-3.pl-5 {{ $t("Tipo Documento:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="tipoDocumento" name="tipoDocumento" v-model="transaccion.tipoDocumento" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold.ml-3.pl-5 {{ $t("Número de Documento:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="numeroDocumento" name="numeroDocumento" v-model="transaccion.numeroDocumento" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold.ml-3.pl-5 {{ $t("Nombres:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="nombres" name="nombres" v-model="transaccion.nombres" disabled )
          div.vx-row.mb-3
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Foto de la Operación:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              view-download( :src="transaccion.fotoOperacion" :titleDescargar="'Guardar'" @descargar="descargar(transaccion.fotoOperacionId)" )
          div.vx-row.mb-3(v-if="ver")
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("Razón Rechazo:") }}
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full( ref="razonRechazo" name="razonRechazo" v-model="transaccion.razonRechazo" disabled )
      footer-data.mt-3( :items.async='footer' )
    popup-ver-cuenta-bancaria( :popupAbrir="mostrarPopupCuenta" @closePopup="closePopup" :parametro.async="parametro" )
    popup-rechazar-subasta( :popupAbrir="mostrarRechazoTransaccion" @closePopup="closePopup" :parametro.async="parametro" )
</template>

<script>

import Cabecera from '@/components/header/Header.vue';
import request from '@/mixins/mixinRequest';
import files from '@/mixins/mixinFiles';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import FooterData from '@/components/footer/FooterData.vue';
import PopupVerCuentaBancaria from "@/project/views/inversionista/transaccion/popup/PopupVerCuentaBancaria.vue";
import PopupRechazarSubasta from '@/project/views/inversionista/transaccion/popup/PopupRechazarTransaccion.vue';
import swal from 'sweetalert2';

export default {

  name: 'FormularioTransaccion',
  mixins: [request, files],

  components: {
    Cabecera,
    TextsBox,
    ViewDownload,
    FooterData,
    PopupVerCuentaBancaria,
    PopupRechazarSubasta
  },

  data(){
    return {
      transaccion: {
        tipo: '',
        estado: '',
        moneda: '',
        monto: '',
        cuentaBancariaId: '',
        cuentaBancaria: '',
        cuentaProgrexa: '',
        botonDetalle:'',
        tipoDocumento: '',
        numeroDocumento: '',
        nombres: '',
        fotoOperacionId: '',
        fotoOperacion: null,
        razonRechazo: '',
      },
      footer: [],

      mostrarPopupCuenta: false,
      mostrarRechazoTransaccion : false,
      parametro: '',

      titulo: '',
      revisar: false,
      ver: false
    }
  },
  
  methods: {
    
    closePopup() {
      this.mostrarPopupCuenta = false;
      this.mostrarRechazoTransaccion = false;
    },

    async abrirCuentaBancaria(){
      this.parametro = String(this.transaccion.cuentaBancariaId);
      this.mostrarPopupCuenta = true;
    },

    async descargar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        await this.funcDescargar(`descargar_foto_operacion_bo?id=${id}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async validarFormulario() {
      try {
        if (valid) {
          let mensaje = !this.revisar ? this.$t("¿Desea guardar el registro?") : this.$t("¿Desea actualizar el registro?");
          let status = await swal.fire({ title: this.$t("Mensaje del Sistema"), text: mensaje, showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
          if (status.value) {
            let response = this.revisar ? await this.actualizar() : await this.registrar();
            if(response.data.estado){
              this.responseRequest(response.data);
              this.cancelar();
            }else{
              this.sweetAlert(response.data);
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async registrar() {
      this.$vs.loading({ type: "point" });
      try {
        let post = {};
        post.compania = this.companiaSeleccionada ? this.companiaSeleccionada.id : "";
        post.idUnidadNegocio = this.unidadNegocioSeleccionada ? this.unidadNegocioSeleccionada.id : "" ;
        post.codigo = this.transaccion.codigo;
        post.descripcion = this.transaccion.descripcion;
        post.descripcionIngles = this.transaccion.descripcionIngles;
        post.idResponsable = this.responsableSeleccionado ? this.responsableSeleccionado.id : "" ;
        post.idTipoProyecto = this.tipoProyectoSeleccionado ? this.tipoProyectoSeleccionado.id : "" ;
        let { data } = await this.requestApi("insertar_proyecto", post, "POST");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async actualizar() {
      this.$vs.loading({ type: "point" });
      try {
        let put = {};
        put.id = this.$route.params.id;
        put.descripcion = this.transaccion.descripcion;
        put.descripcionIngles = this.transaccion.descripcionIngles;
        put.idResponsable = this.responsableSeleccionado ? this.responsableSeleccionado.id : "" ;
        put.idTipoProyecto = this.tipoProyectoSeleccionado ? this.tipoProyectoSeleccionado.id : "" ;
        put.idGrupoProyecto = this.grupoProyectoSeleccionado ? this.grupoProyectoSeleccionado.id : "" ;
        put.idElementoGasto = this.elementoGastoSeleccionado ? this.elementoGastoSeleccionado.id : "" ;
        let { data } = await this.requestApi("actualizar_proyecto", put, "PUT");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async verTransaccion(id) {
      try {
        if(id != null){
          let { data } = await this.requestApi(`ver_transaccion?id=${id}`);
          let response = data.data;
          if (response.estado) {
            if(this.revisar && response.data[0].estado_transaccion_codigo!='PRO') this.cancelar();
            this.titulo = `Transacción N° ${response.data[0].cuenta_bancaria_numerocuenta} ${this.ver ? '[MODO VISTA]':''}`;
            this.transaccion.tipo = response.data[0].tipo_transaccion_descripcion;
            this.transaccion.estado = response.data[0].estado_transaccion_descripcion;
            this.transaccion.moneda = response.data[0].moneda_codigo+' - '+response.data[0].moneda_descripcion;
            this.transaccion.monto = response.data[0].monto;
            this.transaccion.cuentaBancariaId = response.data[0].cuenta_bancaria_id;
            this.transaccion.botonDetalle=response.data[0].mostrar_boton_detalle_cuenta;
            this.transaccion.cuentaBancaria = response.data[0].cuenta_bancaria_numerocuenta;
            this.transaccion.cuentaProgrexa = response.data[0].cuenta_fintech_numerocuenta;
            this.transaccion.tipoDocumento = response.data[0].usuario_tipo_documento_descripcion;
            this.transaccion.numeroDocumento = response.data[0].usuario_numerodocumento;
            this.transaccion.nombres = response.data[0].usuario_nombres;
            this.fotoOperacionId = id;
            this.transaccion.fotoOperacion = response.data[0].transaccion_cuenta_foto_operacion ? await this.convertPath(response.data[0].transaccion_cuenta_foto_operacion):null;
            this.footer = [
              { icon:'ClockIcon', key: 'Fecha de Registro', value: response.data[0].footer_fecha_registro },
              { icon:'ColumnsIcon', key:'Dirección IP de Registro', value: response.data[0].footer_ip_registro },
              { icon:'UserIcon', key:'Usuario de Registro', value: response.data[0].footer_usuariobo_registro },
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value: response.data[0].footer_fecha_actualizacion },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value: response.data[0].footer_ip_actualizacion }
            ];
          } else {
            this.cancelar();
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async confirmar(){
      try{
        let { value } = await swal.fire({ title: this.$t('Mensaje de Sistema'), text: '¿Está seguro que desea confirmar la operación?', showCancelButton: true, confirmButtonText: this.$t('Si'), cancelButtonText: this.$t('No') });
        if (value) {
          this.$vs.loading({ type: 'point' });
          let put={};
          put.id = this.$route.params.id;
          put.id_cuenta_bancaria = this.transaccion.cuentaBancariaId;
          put.ip = await require('public-ip').v4(); 
          let { data } = await this.requestApi('confirmar_transaccion', put,"PUT");
          if(data.data.estado){
            this.responseRequest(data.data); 
            setTimeout( () => {this.$router.push(`/inversionista-transaccion`)},500)                
          }else{
            this.sweetAlert(data.data);
          } 
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },
    
    rechazar(){
      this.parametro = this.$route.params.id;
      this.mostrarRechazoTransaccion = true;

    },

    cancelar() {
      this.$router.push(`/inversionista-transaccion`);
    },

    async validarRuta(nombre) {
      switch (nombre) {
        case "inversionista-transaccion-revisar":
          this.revisar = true;
          return
        case "inversionista-transaccion-ver":
          this.ver = true;
          return
      }
    }
    
  },

  async mounted() {
    try {
      this.$vs.loading({ type: "point" });
      await this.validarRuta(this.$route.name);
      await this.verTransaccion(this.$route.params.id ? this.$route.params.id : null);
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  }

};

</script>