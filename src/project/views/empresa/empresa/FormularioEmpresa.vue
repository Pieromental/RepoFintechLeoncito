<template lang="pug">
  div#parentx-revisarempresa
    popup-informe-revision(:popupRazonActive="mostrarPopupInformeRevision" @closeInforme="closeInforme" :id="idEnviar" :listarRepresentantes="listadoRepresentantes" :listarCuentas="listadoCuentas" :observacionRechazoEmpresa="rechazo" :nombreComercial="nombreComercial" :esAprobadoFlag="esAprobadoFlag" :caso="caso" :mostrarRepresentantes="seccionRepresentantes" :mostrarCuentas="seccionCuentas" :flagUsuario="esAprobadoFlag")
    popup-seleccionar-riesgo( :popupRazonActive="mostrarPopupSeleccionarRiesgo" @closePopupRiesgo="closePopupRiesgo" :id="idEnviar" :listadoRepresentantes="listadoRepresentantes" :listadoCuentas="listadoCuentas" :observacionRechazoEmpresa="rechazo" :nombreComercial="nombreComercial" :esAprobadoFlag="esAprobadoFlag" :caso="caso" :casoRiesgo="casoRiesgo" :mostrarRepresentantes="seccionRepresentantes" :mostrarCuentas="seccionCuentas" :flagUsuario="esAprobadoFlag")
    cabecera( :titulo="$t(titulo)" @aceptar="validar" :disabledAceptar="!verBotonGuardar" :titleAceptar="$t('Terminar Revisión')" :btnAceptar="aparecerBotonGuardar" :btnExportar="false" :btnCancelar="false" :btnNuevo="false" :btnListarTodo="false" :btnFiltrar="false"  )
    vx-card.card-sticky.paddingcard
      vx-tabs(alignment="fixed" :value="selectDefault" top="0rem" container="1rem")
        vx-tab(:label="$t('Información de la Empresa')" :disabled="false")
          tab-informacion-empresa(ref="refTabInfomacionEmpresa" @empresaListaMetodo="empresaListaMetodo" @recibirRechazo="recibirRechazo" :dataEmpresa="objEmpresa" :datosDni="datosDni" :footer="footer")        
        vx-tab(v-if='esJuridica' :label="$t('Representate(s) Legale(s)')" :disabled="false")
          tab-representantes-legales(ref="refTabRepresentantesLegales" @recibirListadoRepresentantes="recibirListadoRepresentantes" @recibirFlagListadoRepresentantes="recibirFlagListadoRepresentantes")
        vx-tab(:label="$t('Cuenta(s) Bancaria(s)')" :disabled="false")
          tab-cuentas-bancarias(ref="refTabCuentasBancarias" @recibirListadoCuentas="recibirListadoCuentas" @recibirFlagListadoCuentas="recibirFlagListadoCuentas")      
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import Cabecera from '@/components/header/Header.vue';
import TabInformacionEmpresa from "@/project/views/empresa/empresa/tab/TabInformacionEmpresa.vue";
import TabRepresentantesLegales from "@/project/views/empresa/empresa/tab/TabRepresentantesLegales.vue";
import TabCuentasBancarias from "@/project/views/empresa/empresa/tab/TabCuentasBancarias.vue";
import PopupSeleccionarRiesgo from "@/project/views/empresa/empresa/popup/PopupSeleccionarRiesgo.vue";
import PopupInformeRevision from "@/project/views/empresa/empresa/popup/PopupInformeRevision.vue";
import files from '@/mixins/mixinFiles';

export default {

  name: 'FormularioEmpresa',
  mixins: [request, files],

  components: {
    Cabecera,
    TabInformacionEmpresa,
    TabRepresentantesLegales,
    TabCuentasBancarias,
    PopupSeleccionarRiesgo,
    PopupInformeRevision
  },

  data() {
    return this.getDefaultData()
  },

  methods:{    

    //Metodos de la Ventana

    empresaListaMetodo(){
      this.esAprobadoFlag = true;
      this.empresaLista = true;
      this.verBotonHeader();
    },

    convertirListados(){
      this.listadoRepresentantes = this.listadoRepresentantes.map((e)=>{
        return{
          id_representante_legal: e.id_presentante_legal,
          observaciones_representante_legal: e.observacion_rechazo,
          representante_legal_flag: e.esAprobadoFlag
        }
      });
      this.listadoCuentas = this.listadoCuentas.map((e)=>{
        return{
          id_cuenta_bancaria: e.id_cuenta,
          observaciones_cuenta_bancaria: e.observacion_rechazo,
          cuenta_bancaria_flag: e.esAprobadoFlag
        }
      });
    },    

    recibirFlagListadoRepresentantes(bool){
      if (bool) {
        this.respresentantesListos = false;
        this.banderaRepresentanteAprobado = false;
      }else{
        this.respresentantesListos = true;
        this.banderaRepresentanteAprobado = true;
      }
      this.verBotonHeader();    
    },

    recibirFlagListadoCuentas(bool){
      if (bool) {
        this.cuentasListas = false;
        this.banderaCuentaAprobada = false;
      }else{
        this.cuentasListas = true;
        this.banderaCuentaAprobada = true;
      }
      this.verBotonHeader();
    },

    verBotonHeader(){
      if (this.esJuridica) {
        if (this.cuentasListas && this.respresentantesListos && this.empresaLista) {
          this.verBotonGuardar = true;
        }else{
          this.verBotonGuardar = false;
        }        
      }else{
        if (this.cuentasListas && this.empresaLista) {
          this.verBotonGuardar = true;
        }else{
          this.verBotonGuardar = false;
        }        
      }
    },

    recibirRechazo(rechazoAux, bandera){
      if (bandera) {
        this.esAprobadoFlag = false;
      }else{
        this.esAprobadoFlag = true;
      }
      this.rechazo = rechazoAux;
      this.empresaLista = true;
      this.verBotonHeader();
    },    

    recibirListadoRepresentantes(listado){
      this.listadoRepresentantes = listado;
      this.listadoRepresentantes.forEach((e) =>{
        if (e.descripcion_estado == "VERIFICADO") {
          e.esAprobadoFlag = true;
        }else{
          e.esAprobadoFlag = false;
        }
      });
      let aux = this.listadoRepresentantes.filter((e)=> e.descripcion_estado == "VERIFICADO")
      if(aux.length > 0){
        this.banderaRepresentanteAprobado = true;
      }else{          
        this.banderaRepresentanteAprobado = false;
      }      
      let constante = this.listadoRepresentantes.filter((e)=> e.descripcion_estado == "REGISTRADO")
      if(constante.length > 0){
        this.banderaRepresentanteRechazado = true;
      }else{          
        this.banderaRepresentanteRechazado = false;
      }
      let temp = this.listadoRepresentantes.filter((e) => e.descripcion_estado == "EN REVISIÓN");
      if(temp.length > 0){
        this.respresentantesListos = false;
      }else{          
        this.respresentantesListos = true;
      }
      this.verBotonHeader();      
    },    

    recibirListadoCuentas(listado){
      this.listadoCuentas = listado;
      this.listadoCuentas.forEach((e)=>{
        if (e.descripcion_estado == "VERIFICADO") {
          e.esAprobadoFlag = true;
        }else{
          this.banderaCuentaRechazada = true;
          e.esAprobadoFlag = false;
        }
      });
      let aux = this.listadoCuentas.filter((e)=> e.descripcion_estado == "VERIFICADO")
      if(aux.length > 0){
        this.banderaCuentaAprobada = true;
      }else{          
        this.banderaCuentaAprobada = false;
      }      
      let constante = this.listadoCuentas.filter((e)=> e.descripcion_estado == "REGISTRADO")
      if(constante.length > 0){
        this.banderaCuentaRechazada = true;
      }else{          
        this.banderaCuentaRechazada = false;
      }
      let temp = this.listadoCuentas.filter((e) => e.descripcion_estado == "EN PROCESO");
      if(temp.length > 0){
        this.cuentasListas = false;
      }else{          
        this.cuentasListas = true;
      }
      this.verBotonHeader();
    },

    mostrarSeccionesInforme(){
      if (this.listadoRepresentantes.length > 0 && this.esJuridica) {     
        if (this.banderaRepresentanteRechazado) {          
          this.seccionRepresentantes = true;
        }else{
          this.seccionRepresentantes = false;
        }
      } else{
        this.seccionRepresentantes = false;
      }
      if (this.listadoCuentas.length > 0) {  
        if (this.banderaCuentaRechazada) {          
          this.seccionCuentas = true;
        }else{
          this.seccionCuentas = false;
        }
      }else{
        this.seccionCuentas = false;
      }
    },

    async funcionActivo(){
      try {
        this.$vs.loading({ type: 'point' });
        this.convertirListados();
        let put = {
          id : this.idEnviar,
        }
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("limpiar_empresa", put, "PUT");
        return data;        
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    async funcionVerCuentasVerificadas(id){
      try {   
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`validar_revision_rl_empresa?id=${this.idEnviar}`);
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async verificarCuentasBase(){
      if (!this.banderaCuentaAprobada) {
        let response = await this.funcionVerCuentasVerificadas();
        if (response.estado) {
          this.banderaCuentaAprobada = true;
        }
      }
    },

    async funcionVerRepresentantesVerificados(){
      try {   
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`validar_revision_rl_empresa?id=${this.idEnviar}`);
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async verificarRepresentantesBase(){
      if (!this.banderaRepresentanteAprobado) {
        let response = await this.funcionVerRepresentantesVerificados();
        if (response.estado) {
          this.banderaRepresentanteAprobado = true;
        }
      }
    },

    async validar(){
      if (this.codigoEstadoUsuario == "REV") {
        this.mostrarSeccionesInforme();        
        await this.verificarRepresentantesBase();
        await this.verificarCuentasBase();
        if (this.esAprobadoFlag && this.banderaRepresentanteAprobado && this.banderaCuentaAprobada) {
          if (this.banderaRepresentanteRechazado || this.banderaCuentaRechazada) {
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t('El registro puede ser activado. ¿Desea continuar con la activación o solo informar al usuario las observaciones encontradas?'),
              showCancelButton: true,
              confirmButtonText: this.$t('Continuar con la Activación'),
              cancelButtonText: this.$t('Solo enviar Informe')
            });
            if (status.value) { //Boton continua con la activacion
              this.caso = 1;
              this.mostrarPopupSeleccionarRiesgo = true;
            }else{  //Boton solo enviar Informe
              if (status.dismiss == 'cancel') {                
                this.caso = 2;
                this.mostrarPopupInformeRevision = true;
              }
            }
          }else{
            if (!this.banderaRepresentanteRechazado && !this.banderaCuentaRechazada) {
              this.casoRiesgo = 1;
              this.mostrarPopupSeleccionarRiesgo = true;              
            }
          }
        }else{
          this.caso = 2;
          this.mostrarPopupInformeRevision = true;
        }
      } 
      if (this.codigoEstadoUsuario == "ACT") {
        let response = await this.funcionActivo();
        if(response.data.estado){
          this.responseRequest(response.data);
          this.$router.push(`/empresa-empresa-revisar`);
        }else{
          this.sweetAlert(response.data);
        }
      }
    },

    //METODO DE CARGA

    FlagEsJuridica(){
      if (this.esJuridica) {
        this.respresentantesListos = false;
        this.banderaRepresentanteAprobado = false;
      }else{
        this.respresentantesListos = true;
        this.banderaRepresentanteAprobado = true;
      }
      this.verBotonHeader();  
    },

    async funcionRevisar(id){
      try {   
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let ip_actualizacion = await require('public-ip').v4();
        let { data } = await this.requestApi(`validar_revision_usuario?id=${id}&ip=${ip_actualizacion}`);
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarInformacionEmpresa(id) {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        if(!id) return        
        let { data } = await this.requestApi(`ver_empresa?id=${id}`);        
        let response = data.data;   
        if (response.estado) {
          this.objEmpresa.codigo_tipo_responsabilidad = response.data[0].codigo_tipo_responsabilidad;
          if (response.data[0].codigo_tipo_responsabilidad == "JUR") {
            this.esJuridica = true;
          }
          this.objEmpresa.tipo_responsabilidad = response.data[0].tipo_responsabilidad;
          this.objEmpresa.ruc = response.data[0].ruc;
          this.objEmpresa.razon_social = response.data[0].razon_social;
          this.objEmpresa.nombrecomercial = response.data[0].nombrecomercial;
          this.nombreComercialTitulo = response.data[0].nombrecomercial;
          this.objEmpresa.actividad_economica = response.data[0].actividad_economica;
          this.objEmpresa.departamento = response.data[0].departamento;
          this.objEmpresa.provincia = response.data[0].provincia;
          this.objEmpresa.distrito = response.data[0].distrito;
          this.objEmpresa.direccion = response.data[0].direccion;
          this.objEmpresa.nombres = response.data[0].nombres;
          this.objEmpresa.apellido_paterno = response.data[0].apellido_paterno;
          this.objEmpresa.apellido_materno = response.data[0].apellido_materno;
          this.objEmpresa.telefono = response.data[0].telefono;
          this.objEmpresa.correo_electronico = response.data[0].correo_electronico;
          this.objEmpresa.descripcion_tipo_documento = response.data[0].descripcion_tipo_documento;
          this.objEmpresa.codigo_tipo_documento = response.data[0].codigo_tipo_documento;
          this.objEmpresa.numero_documento = response.data[0].numero_documento;
          this.objEmpresa.digito_verificador = response.data[0].digito_verificador;
          this.objEmpresa.fecha_nacimiento = response.data[0].fecha_nacimiento;
          this.objEmpresa.genero = response.data[0].genero;
          this.objEmpresa.frente_documento = response.data[0].frente_documento ? await this.convertPath(response.data[0].frente_documento) : null;
          this.objEmpresa.reverso_documento = response.data[0].reverso_documento ? await this.convertPath(response.data[0].reverso_documento) : null;
          this.objEmpresa.certificado_vigencia_poder = response.data[0].certificado_vigencia_poder ? await this.convertPath(response.data[0].certificado_vigencia_poder) : null;
          this.objEmpresa.ficha_ruc = response.data[0].ficha_ruc ? await this.convertPath(response.data[0].ficha_ruc) : null;
          this.objEmpresa.bloqueado = response.data[0].bloqueado;
          this.objEmpresa.observaciones_ultima_revision = response.data[0].observaciones_ultima_revision;
          this.objEmpresa.fecha_registro = response.data[0].fecha_registro;
          this.objEmpresa.fecha_ultima_revision = response.data[0].fecha_ultima_revision;
          this.objEmpresa.idusuario = response.data[0].idusuario;
          this.codigoEstadoUsuario = response.data[0].codigo_estado;
          this.nombreComercial = response.data[0].nombrecomercial;
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:response.data[0].footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:response.data[0].footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:response.data[0].footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:response.data[0].footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:response.data[0].footer_usuariobo_actualizacion }
          ];
        } else {
          this.objEmpresa = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },    

    //METODOS GENERALES

    getDefaultData(){
      return {
        flagListadoRepresentante: false,        
        flagListadoCuenta: false,
        nombreComercialTitulo:'',
        titulo:'',
        selectDefault:0,
        isMounted: false,
        datosDni:'',
        verBotonGuardar: false,
        mostrarPopupSeleccionarRiesgo: false,
        mostrarPopupInformeRevision: false,
        listadoRepresentantes:[],
        listadoCuentas:[],
        idEnviar:0,
        footer:[],
        rechazo:"",
        codigoEstadoUsuario:"",
        esAprobadoFlag:false,
        banderaRepresentanteAprobado: false,
        banderaRepresentanteRechazado: false,
        banderaCuentaAprobada: false,
        banderaCuentaRechazada: false,
        nombreComercial: '',
        cuentasListas: false,
        respresentantesListos : false,
        empresaLista: false,
        esJuridica: false,
        caso:0,
        casoRiesgo:0,
        seccionRepresentantes: false,
        seccionCuentas: false,
        aparecerBotonGuardar: false,
        objEmpresa:{
          codigo_tipo_responsabilidad: "",
          tipo_responsabilidad: "",
          ruc: "",
          razon_social: "",
          nombrecomercial: "",
          actividad_economica: "",
          departamento: "",
          provincia: "",          
          distrito: "",
          direccion: "",
          nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          telefono: "",
          correo_electronico: "",
          descripcion_tipo_documento: "",
          numero_documento: "",
          digito_verificador: "",          
          fecha_nacimiento: "",
          genero: "",
          frente_documento: "",
          reverso_documento: "",
          certificado_vigencia_poder: "",
          ficha_ruc: "",
          bloqueado: "",
          observaciones_ultima_revision: "",
          fecha_registro: "",
          fecha_ultima_revision: "",
          idusuario: ""
        },                       
      }
    }, 

    cargarDatosDni() {
      if(this.objEmpresa.codigo_tipo_documento == "DNI"){
        this.datosDni = this.objEmpresa.numero_documento + " - "+ this.objEmpresa.digito_verificador;
      }else{
        this.datosDni = this.objEmpresa.numero_documento;
      }
    },

    async validarRuta(nombre) {
      switch (nombre) {
        case "empresa-empresa-revisar-registro":
          this.titulo = this.$t('Usuario [Empresa]: ') + this.nombreComercialTitulo;
          this.aparecerBotonGuardar = true;
          return
        case "empresa-empresa-ver-registro":
          this.titulo = this.$t('Usuario [Empresa]: ') + this.nombreComercialTitulo;
          this.aparecerBotonGuardar = false;
          return
      }
    },

    closeInforme() {
      this.mostrarPopupInformeRevision = false;
    },

    closePopupRiesgo(){
      this.mostrarPopupSeleccionarRiesgo = false;
    }

  },

  async mounted() {
    try{
      this.$vs.loading({ type: 'point' });
      if(this.$route.name == "empresa-empresa-revisar-registro"){
        let response = await this.funcionRevisar(this.$route.params.id ? this.$route.params.id : null);
        if(!response.estado){        
          this.sweetAlert(response);
          this.$router.push(`/inicio`);
          return
        }
      }
      await this.cargarInformacionEmpresa(this.$route.params.id ? this.$route.params.id : null);
      await this.validarRuta(this.$route.name);
      this.cargarDatosDni();
      this.idEnviar = Number(this.$route.params.id ? this.$route.params.id : null);
      this.FlagEsJuridica();
      await this.$refs.refTabInfomacionEmpresa.mountedEmpresa();
      if (this.esJuridica) {
        await this.$refs.refTabRepresentantesLegales.mountedRepresentantes();
      }      
      await this.$refs.refTabCuentasBancarias.mountedCuentas();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  },  
}
</script>