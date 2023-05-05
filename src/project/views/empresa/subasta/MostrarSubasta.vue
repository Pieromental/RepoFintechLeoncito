<template lang="pug">
  div#formulario-subasta
  
    popup-informacion-confirming( :popupActive="popupActive" :typeConfirming="typeConfirming" :titleConfirming="titleConfirming" :dataConfirming="dataConfirming" @closePopup="closePopup" )

    cabecera( :titulo="$t(titulo)"
      :btnAprobar="revisar||avanceAprobar" @aprobar="aprobar" :btnDisabledAprobar="activarEdicion" :textAprobar="nameAprobar"
      :btnRechazar="revisar" @rechazar="rechazar"
      :btnConfirmar="avanceConfirmar" @confirmar="confirmarEntregaPrestamo" :btnDisabledConfirmar="false" :textConfirmar="nameConfirmar"
      :btnVer="verInversiones" @ver="accionVer" :textVer="'Ver Inversiones'" 
      :btnExportar="false" :btnCancelar="false" :btnNuevo="false" :btnListarTodo="false" :btnFiltrar="false" )
      
    vx-card.card-sticky.paddingcard
      vx-tabs(alignment="fixed" :value="selectDefault" top="0rem" container="1rem")
        vx-tab(:label="$t('Datos Generales')")
          tab-datos-generales(ref="refDatosGenerales" :dataDatosGeneral="dataDatosGeneral" :footer="footer" )
        vx-tab(:label="$t('Contactos deudor')")
          tab-contactos-deudor(ref="refContactosDeudor" :dataDeudor="dataDeudor")
        vx-tab(:label="$t('Facturas')")
          tab-facturas(ref="refTabFacturas" :dataFacturas="dataFacturas")
        vx-tab(:label="$t('Información de Confirming')" )
          tab-informacion-confirming(ref="refTabInformacionConfirming" :codigoSubasta="codigoSubasta")
        vx-tab( v-if="$route.name=='empresa-subasta-ver'" :label="$t('Carta de Cesión')" )
          tab-carta-cesion(ref="refTabCartaCesion" :codigoSubasta="codigoSubasta")
          
</template>

<script>

import Cabecera from '@/components/header/Header.vue';
import TabDatosGenerales from "@/project/views/empresa/subasta/tab/TabDatosGenerales.vue";
import TabContactosDeudor from "@/project/views/empresa/subasta/tab/TabContactosDeudor.vue";
import TabFacturas from "@/project/views/empresa/subasta/tab/TabFacturas.vue";
import TabInformacionConfirming from "@/project/views/empresa/subasta/tab/TabInformacionConfirming.vue";
import TabCartaCesion from "@/project/views/empresa/subasta/tab/TabCartaCesion.vue";
import PopupInformacionConfirming from "@/project/views/empresa/subasta/popup/PopupInformacionConfirming.vue";
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import swal from 'sweetalert2';

export default {

  name: 'FormularioSubasta',
  mixins: [request],

  components: {
    Cabecera,
    TabDatosGenerales,
    TabContactosDeudor,
    TabFacturas,
    TabInformacionConfirming,
    TabCartaCesion,
    PopupInformacionConfirming
  },

  computed:{
    avanceAprobar(){
      return this.avance && this.dataDatosGeneral.estado_subasta_codigo == 'COB' && this.dataDatosGeneral.subasta_prestamopagadoflag && !this.dataDatosGeneral.subasta_confirmacionprestamopagadoflag
    },
    avanceConfirmar(){
      return this.avance && this.dataDatosGeneral.estado_subasta_codigo == 'COB' && !this.dataDatosGeneral.subasta_prestamoentregadoflag
    },
    nameConfirmar(){
      return this.avance ? 'Confirmar Entrega de Préstamo':'Confirmar';
    },
    nameAprobar(){
      return this.avance ? 'Validar Pago del Préstamo':'Aprobar';
    },
    verInversiones(){
      return this.ver && (this.dataDatosGeneral.estado_subasta_codigo == 'SUB' || this.dataDatosGeneral.estado_subasta_codigo == 'COB' || this.dataDatosGeneral.estado_subasta_codigo == 'CER')
    }
  },

  data() {
    return {
      dataDatosGeneral : {},
      footer : [],
      dataDeudor : [],
      dataFacturas : [],
      codigoSubasta : '',
      
      activarEdicion: false,
      
      titulo:'',
      selectDefault:0,
      isMounted: false,
      datosDni:'',
      verBotonGuardar: false,
      
      typeConfirming: '',
      titleConfirming: '',
      dataConfirming: {},
      popupActive: false,

      revisar: false,
      ver: false,
      avance: false,
    }
  },

  methods:{
    
    closePopup() {
      this.typeConfirming = '';
      this.titleConfirming = '';
      this.dataConfirming = {};
      this.popupActive = false;
    },

    aprobar(){
      if(this.revisar){
        if(this.$refs.refDatosGenerales.showErrors()) return
        this.typeConfirming = 'revisar';
        this.titleConfirming = this.$refs.refDatosGenerales.obtenertituloConfirming(),
        this.dataConfirming = {
          diasCredito: this.$refs.refDatosGenerales._data.diasCredito,
          fechaCierre: this.$refs.refDatosGenerales._data.fechaCierre ? helperFunctions.convertirFecha(this.$refs.refDatosGenerales._data.fechaCierre):'',
          fechaPagoPactada: this.$refs.refDatosGenerales.fechaPagoPactada,
        };
        this.popupActive = true;
      }
      if(this.avance){
        this.validarPagoPrestamo();
      }
    },
    
    confirmar(){
      if(this.$refs.refDatosGenerales.showErrors()) return
      this.typeConfirming = 'avance';
      this.titleConfirming = 'Pre-Liquidación Final',
      this.dataConfirming = {
        diasCredito: this.$refs.refDatosGenerales._data.diasCredito,
        fechaCierre: this.$refs.refDatosGenerales._data.fechaCierre ? helperFunctions.convertirFecha(this.$refs.refDatosGenerales._data.fechaCierre):'',
        fechaPagoPactada: this.$refs.refDatosGenerales.fechaPagoPactada,
      };
      this.popupActive = true;
    },
    
    rechazar(){
      this.$refs.refDatosGenerales.rechazar();
    },
    
    async confirmarEntregaPrestamo(){
      try{
        let { value } = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: 'Verifica si se requiere que el Cliente asuma la Garantía por el financiamiento de la operación y si se han aprobado las inversiones suficientes para financiar al 100% la subasta. Si todo es conforme, continúa con la confirmación del desembolso.',
          showCancelButton: true,
          confirmButtonText: this.$t('Continuar'),
          cancelButtonText: this.$t('Cancelar'),
        });
        if (value) this.confirmar();
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async validarPagoPrestamo(){
      try {        
        let status = await swal.fire({ title: this.$t('Mensaje del sistema'), text: `Validar pago por la subasta ${this.dataDatosGeneral.subasta_codigo}`, showCancelButton: true, confirmButtonText: this.$t('Confirmar'), cancelButtonText: this.$t('Rechazar') });
        if( status.value ){
          let status = await swal.fire({ title: this.$t('Mensaje del sistema'), text: '¿Desea confirmar el pago del préstamo por la subasta?', showCancelButton: true, confirmButtonText: this.$t('Aceptar'), cancelButtonText: this.$t('Cancelar') });
          if( status.value ){
            let response = await this.confirmarValidarPagoPrestamo();
            if(response.data.estado){
              this.responseRequest(response.data);
              this.dataDatosGeneral.subasta_prestamopagadoflag = false;
              //setTimeout( () => { this.$router.push(`/empresa-subasta`) }, 500 );
            }else{
              this.sweetAlert(response.data);
            } 
          }
        } else {
          let status_rechazar = await swal.fire({ title: this.$t('Mensaje del sistema'), text: '¿Desea rechazar el pago del préstamo por la subasta?', showCancelButton: true, confirmButtonText: this.$t('Aceptar'), cancelButtonText: this.$t('Cancelar'), });
          if( status_rechazar.value ){
            this.$refs.refDatosGenerales.rechazarPagoPrestamo();
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async confirmarValidarPagoPrestamo(){
      try {
        this.$vs.loading({ type: 'point' });
        let put = {}
        put.id = this.$route.params.codigo;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("validar_confirmar_pago_prestamo", put, "PUT");
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    accionVer(){
      if(this.dataDatosGeneral.subasta_codigo) this.$router.push(`/inversionista-inversion-ver-subasta/${this.dataDatosGeneral.subasta_codigo}`);
    },
    
    convertirFecha(date){
      let [ fecha_formateada ] = helperFunctions.convertirFechaLocal(date).split(",");
      return fecha_formateada.replaceAll("/", "-");
    },

    formatearFecha(date){
      let [ DAY , MONTH , YEAR ] = date.split("-");
      return [ YEAR, MONTH, DAY ].join("-"); 
    },

    async cargarData() {
      try {        
        let { data } = await this.requestApi(`ver_revision_subasta?id=${this.$route.params.codigo}`);
        let response = data.data || []; 
        if (response.estado) {
          let [ informacion ] = response.data;   
          this.codigoSubasta = informacion.estado_subasta_codigo;
          await this.validarRuta(this.$route.name, informacion.subasta_codigo);
          this.dataDatosGeneral = informacion;
          this.$refs.refDatosGenerales.diasCredito = informacion.subasta_diacredito;
          if(informacion.subasta_fechacierre){
            let array = informacion.subasta_fechacierre.split('/');
            this.$refs.refDatosGenerales.fechaCierre = informacion.subasta_fechacierre ? new Date( `${array[1]}/${array[0]}/${array[2]}`):'';
            this.$refs.refDatosGenerales.tmpFechaCierre = informacion.subasta_fechacierre ? new Date( `${array[1]}/${array[0]}/${array[2]}`):'';
          }
          this.dataDatosGeneral.subasta_costototal = this.dataDatosGeneral.subasta_costototal == null ? '' : this.dataDatosGeneral.subasta_costototal;
          this.dataDatosGeneral.subasta_fechapagoainversionistapactada_edicion = informacion.subasta_fechapagoainversionistapactada ? this.formatearFecha(informacion.subasta_fechapagoainversionistapactada):'';
          this.dataDatosGeneral.subasta_fechaentregaprestamo_formateada = informacion.subasta_fechaentregaprestamo ? this.convertirFecha(informacion.subasta_fechaentregaprestamo):'';
          this.dataDatosGeneral.subasta_fechapublicacion_formateada = informacion.subasta_fechapublicacion ? this.convertirFecha(informacion.subasta_fechapublicacion):'';  
          this.dataDatosGeneral.subasta_fechafinanciamientofin_formateada = informacion.subasta_fechafinanciamientofin ? this.convertirFecha(informacion.subasta_fechafinanciamientofin):'';
          this.dataDatosGeneral.subasta_fechapagoprestamo_formateada = informacion.subasta_fechapagoprestamo ? this.convertirFecha(informacion.subasta_fechapagoprestamo):'';
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value: informacion.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value: informacion.footer_ip_registro },
            { icon:'UserIcon', key:'Último Revisor', value: informacion.footer_usuariobo_actualizacion },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value: informacion.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value: informacion.footer_ip_actualizacion }
          ];
        }else{
          this.dataDatosGeneral = {};
          this.cancelar();
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    cancelar() {
      this.$router.push(`/empresa-subasta`);
    },

    async cargarDeudor() {
      try {
        let { data } = await this.requestApi(`listar_revision_deudor?id=${this.$route.params.codigo}`);
        let response = data.data || []; 
        if (response.estado) {          
          this.dataDeudor = response.data;
        }else{
          this.dataDeudor = [];
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    
    async cargarFacturas() {
      try {
        let { data } = await this.requestApi(`listar_detalle_comprobante?id=${this.$route.params.codigo}`);
        let response = data.data || []; 
        if (response.estado) {
          this.dataFacturas = response.data;
        }else{
          this.dataFacturas = [];
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    
    async validarRuta(nombre,codigo) {
      switch (nombre) {
        case "empresa-subasta-revisar":
          this.titulo = `Subasta [${codigo}]`;
          this.revisar = true;
          return
        case "empresa-subasta-ver":
          this.titulo = 'Ver Registro';
          this.ver = true;
          return
        case "empresa-subasta-avance":
          this.titulo = 'Avance Registro';
          this.avance = true;
          return
      }
    },

    async verificarRevisar(){
      try{
        if(this.$route.name != "empresa-subasta-revisar") return
        let put = { id: this.$route.params.codigo };
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('actualizar_estado_revisado_subasta', put, 'PUT');
        let response = data.data;
        if(!response.estado){
          this.$vs.loading.close();
          await this.sweetAlert(response);
          this.$router.push(`/empresa-subasta`);
        }
      } catch (error) {
        throw new Error(error);
      } 
    }
    
  },
  
  async mounted() {
    try{
      this.$vs.loading({ type: 'point' }); 
      await this.verificarRevisar();
      await this.cargarData();
      await this.cargarDeudor();
      await this.cargarFacturas();
      await this.$refs.refTabInformacionConfirming.mounted();
      await this.$refs.refTabCartaCesion.mounted();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  }

}

</script>

<style lang="scss">
#formulario-subasta{
  .vs-tabs-primary .button-personalized button:not(:disabled):hover {
    color: white;
  }
}
</style>