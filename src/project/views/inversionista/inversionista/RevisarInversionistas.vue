<template lang="pug">
  div
    popup-informe-revision-inversionista(:popupRazonActive="mostrarPopupInformeRevision" @closeInforme="closeInforme" :id="idEnviar" :listarRepresentantes="listadoRepresentantes" :listarCuentas="listadoCuentas" :observacionRechazoInversionista="rechazo" :nombre="nombre" :esAprobadoFlag="esAprobadoFlag" :caso="caso" :mostrarRepresentantes="seccionRepresentantes" :mostrarCuentas="seccionCuentas")
    cabecera( :titulo="$t(`USUARIO [INVERSIONISTA]: `) + objInversionista.nombre_inversionista " :titleAceptar="$t(`Terminar Revisión`)" @aceptar="validar"  :btnAceptar="verBotonGuardar" :btnExportar="false" :btnCancelar="false" :btnNuevo="false" :btnListarTodo="false" :btnFiltrar="false"  )
    vx-card.card-sticky.paddingcard
      vx-tabs(alignment="fixed" :value="selectDefault" top="0rem" container="1rem")
        vx-tab(:label="$t('Información del Inversor')" :disabled="false")
          tab-info-inversionista(ref="refTabInformacionInversionistas" :dataInversionista="objInversionista" @recibirRechazo="recibirRechazo" :datosDni="datosDni" :flagButton="flagButton" :footer="footer" :botonValidacion="botonValidacion" )        
        vx-tab(v-if="esJuridica" :label="$t('Representate(s) Legale(s)')" :disabled="false" )
          tab-representantes-legales(ref="refTabRepresentantesLegales" :flagButton="flagButton" @recibirListadoRepresentantes="recibirListadoRepresentantes" @recibirFlagListadoRepresentantes="recibirFlagListadoRepresentantes")
        vx-tab(:label="$t('Cuenta(s) Bancaria(s)')" :disabled="false" )
          tab-cuentas-bancarias(ref="refTabCuentasBancarias" @recibirListadoCuentas="recibirListadoCuentas" @recibirFlagListadoCuentas="recibirFlagListadoCuentas" :flagButton="flagButton" )       
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import Cabecera from '@/components/header/Header.vue';
import TabInfoInversionista from "@/project/views/inversionista/inversionista/tab/TabInformacionInversionistas.vue";
import TabRepresentantesLegales from "@/project/views/inversionista/inversionista/tab/TabRepresentantesLegales.vue";
import TabCuentasBancarias from "@/project/views/inversionista/inversionista/tab/TabCuentasBancarias.vue";
import files from '@/mixins/mixinFiles';
import PopupInformeRevisionInversionista from "@/project/views/inversionista/inversionista/popup/PopUpInformeRevisionInversionista.vue";
export default {

  name: 'RevisarInversionista',
  mixins: [request, files],

  components: {
    Cabecera,
    TabInfoInversionista,
    TabRepresentantesLegales,
    TabCuentasBancarias,
    PopupInformeRevisionInversionista
  },

  data() {
    return this.getDefaultData()
  },
  methods:{
    //METODOS DE LA VENTANA
    verBotonHeader(){
      if (this.esJuridica) {
        if (this.cuentasListas && this.respresentantesListos && this.inversionistaListo) {
          this.verBotonGuardar = true;
        }else{
          this.verBotonGuardar = false;
        }        
      }else{
        if (this.cuentasListas && this.inversionistaListo) {
          this.verBotonGuardar = true;
        }else{
          this.verBotonGuardar = false;
        }        
      }
    },
    inversionistaListaMetodo(){
      this.esAprobadoFlag = true;
      this.inversionistaListo = true;
      this.verBotonHeader();
    },
    convertirListados(){
      this.listadoRepresentantes = this.listadoRepresentantes.map((e)=>{
        return{
          id_representante_legal: e.id_presentante_legal,
          observaciones_representante_legal: e.esAprobadoFlag?"":e.observacion_rechazo,
          representante_legal_flag: e.esAprobadoFlag
        }
      });
      this.listadoCuentas = this.listadoCuentas.map((e)=>{
        return{
          id_cuenta_bancaria: e.id_cuenta,
          observaciones_cuenta_bancaria: e.esAprobadoFlag?"":e.observacion_rechazo,
          cuenta_bancaria_flag: e.esAprobadoFlag
        }
      });
    },
    convertirListadosAprobacion(){
      this.listaRepresentantes = this.listadoRepresentantes.map((e)=>{
        return{
          id_representante_legal: e.id_presentante_legal,
          observaciones_representante_legal: e.observacion_rechazo,
          representante_legal_flag : e.esAprobadoFlag
        }                    
      });
      this.listaCuentas = this.listadoCuentas.map((e)=>{
        return{
          id_cuenta_bancaria: e.id_cuenta,
          observaciones_cuenta_bancaria: e.observacion_rechazo,
          cuenta_bancaria_flag : e.esAprobadoFlag
        }
      });
    },
    FlagEsJuridica(){
      if (this.esJuridica) {
        this.respresentantesListos = false;
        this.banderaRepresentanteAprobado = false;
      }else{
        this.respresentantesListos = true;
        this.banderaRepresentanteAprobado = true;
      }
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
    recibirRechazo(rechazoAux, bandera){
    if (bandera) {
      this.esAprobadoFlag = false;
    }else{
      this.esAprobadoFlag = true;
    }
    this.rechazo = rechazoAux;
    this.inversionistaListo = true;
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
      this.$vs.loading({ type: "point" });
      try {
        let put = {
          id : this.idEnviar,
        }
        let { data } = await this.requestApi("limpiar_inversionista", put, "PUT");
        return data;        
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },
    async funcionRevisionAprobado(){
      this.$vs.loading({ type: "point" });
      try {
        this.convertirListadosAprobacion();
        let post = {
          id : this.$route.params.id,
          representante_legal: this.listaRepresentantes,
          cuenta_bancaria: this.listaCuentas,
        }
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("revisar_activar_inversionista_bo", post, "POST");
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },
     async funcionVerRepresentantesVerificados(){
      try {   
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`validar_revision_rl_Inversionista?id=${this.idEnviar}`);
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async funcionVerCuentasVerificadas(){
      try {   
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`validar_revision_cb_Inversionista?id=${this.idEnviar}`);
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
              this.mostrarPopupInformeRevision = true;
            }else{  //Boton solo enviar Informe
              this.caso = 2;
              this.mostrarPopupInformeRevision = true;
            }
          }else{
            if (!this.banderaRepresentanteRechazado && !this.banderaCuentaRechazada) {
              let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t('“¿Está seguro que desea activar el registro?'),
              showCancelButton: true,
              confirmButtonText: this.$t('Si'),
              cancelButtonText: this.$t('No')
              }); 
              if (status.value) {
                let response = await this.funcionRevisionAprobado();        
                if(response.data.estado){
                  this.responseRequest(response.data);
                  setTimeout(() => { this.$router.push(`/inversionista-inversionista-revisar`); }, 100);
                }else{
                  this.sweetAlert(response.data);
                } 
              }             
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
          setTimeout(() => { this.$router.push(`/inversionista-inversionista-revisar`); }, 100);
        }else{
          this.sweetAlert(response.data);
        }
      }
    },
    //METODO DE CARGA
    async cargarInformacionInversionista(id) {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        if(!id) return        
        let { data } = await this.requestApi(`ver_inversionista?id=${id}`);        
        let response = data.data;   
        if (response.estado) {
          let [ informacion ] = response.data;
          this.footer = [
              { icon:'ClockIcon', key: 'Fecha de Registro', value:informacion.fecha_registro },
              { icon:'ColumnsIcon', key:'IP de Registro', value:informacion.ip_registro },
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value:informacion.ultima_revision },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value:informacion.ultima_revision_ip },
              { icon:'UserIcon', key:'Último Revisor', value:informacion.ultimo_revisor }
          ];
          informacion.certificado_vigencia_poder= informacion.certificado_vigencia_poder ? await this.convertPath(informacion.certificado_vigencia_poder) : null;
          informacion.rutaficharuc= informacion.rutaficharuc ? await this.convertPath(informacion.rutaficharuc) : null;
          informacion.documento_anverso= informacion.documento_anverso ? await this.convertPath(informacion.documento_anverso) : null;
          informacion.documento_reverso= informacion.documento_reverso ? await this.convertPath(informacion.documento_reverso) : null;
          if (informacion.tipo_responzabilidad_codigo == "JUR") {
            this.esJuridica = true;
          }
          this.codigoEstadoUsuario = informacion.codigo_estadousu;
          this.nombre=informacion.nombre_completo
          Object.assign(this.objInversionista,informacion); 
        } else {
          this.objInversionista = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    cargarDatosDni() {
      if(this.objInversionista.codigo_tipodocumento == "DNI"){
        if(this.objInversionista.digito_verificador){
          this.datosDni = this.objInversionista.numero_documento + " - "+ this.objInversionista.digito_verificador;
        }else{ 
          this.datosDni = this.objInversionista.numero_documento 
        }
      }else{
        this.datosDni = this.objInversionista.numero_documento;
      }
    },
    //METODOS GENERALES
    getDefaultData(){
      return {
        titulo:'',
        selectDefault:0,
        isMounted: false,
        datosDni:'',
        rechazo:"",
        codigoEstadoUsuario:"",
        botonValidacion:true,
        flagButton:true,
        footer:[],
        objInversionista:{}, 
        listadoRepresentantes:[],
        listadoCuentas:[],
        listaRepresentantes:[],
        listaCuentas:[],
        idEnviar:0,
        caso:0,
        respresentantesListos : false,
        banderaCuentaAprobada: false,
        banderaCuentaRechazada: false,
        nombre: '',
        banderaRepresentanteAprobado: false,
        banderaRepresentanteRechazado: false,
        mostrarPopupInformeRevision: false,
        seccionCuentas: false,
        seccionRepresentantes: false,
        esJuridica: false,
        inversionistaListo: false,
        esAprobadoFlag:false,
        verBotonGuardar: false,
        cuentasListas: false                    
      }
    }, 
    async funcionVerBotones(){
      try {   
        if(this.isMounted) this.$vs.loading({ type: 'point' });     
        let { data } = await this.requestApi(`validar_botones_aprobar_empresa_bo?id=${this.objInversionista.id_usuario}`);
        let response = data.data;
        if (response.estado) {
          if(response.data[0].mostrar_botones) this.botonValidacion = true;
        }else{
          this.inversionistaListaMetodo();
          this.botonValidacion = false;                    
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    async validarRuta(nombre) {
      switch (nombre) {
        case "inversionista-inversionista-revisar-registro":
          this.titulo = 'Revisar Inversioninista';
          this.flagButton=true;
          return
        case "inversionista-inversionista-ver":
          this.titulo = 'Ver Inversioninista';
          this.flagButton=false;
          return
      }
    },
    closeInforme() {
      this.mostrarPopupInformeRevision = false;
    },
    async funcionRevisar(id){
      try {   
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let put={};
        put.id=id;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('validar_revision_usuario_inversionista',put,"PUT");
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
  },
  async mounted() {
    try{
      this.$vs.loading({ type: 'point' });
      if(this.$route.name == "inversionista-inversionista-revisar-registro"){
        let response = await this.funcionRevisar(this.$route.params.id ? this.$route.params.id : null);
        if(!response.estado){        
          this.sweetAlert(response);
          this.$router.push(`/inicio`);
          return
        }
      }
      await this.cargarInformacionInversionista(this.$route.params.id ? this.$route.params.id : null);
      await this.validarRuta(this.$route.name);
      await this.funcionVerBotones();
      this.cargarDatosDni();
      this.idEnviar = Number(this.$route.params.id ? this.$route.params.id : null);
      this.FlagEsJuridica();
      await this.$refs.refTabCuentasBancarias.mounted();
      if(this.esJuridica) await this.$refs.refTabRepresentantesLegales.mounted();
      await this.$refs.refTabInformacionInversionistas.mounted();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  },  
}
</script>