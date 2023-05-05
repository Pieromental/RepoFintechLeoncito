<template lang="pug">
  div.vx-header-fixed( :class="[contentAreaClass]" style="background: #fff")
    div.vx-row.vs-justify-space-between(:style="{background: '#f4f4f4'}")
      div.vx-col
        vs-button.btn-atras.btn-personalized.full.font-label.vs-align-items(
          v-if="btnAtras"
          v-shortkey="['alt', ['left']]"
          @shortkey="accion ? atras() : anterior ? antes() : $router.go(-1)"
          icon-pack="feather"
          icon="icon-arrow-left"
          size="small"
          @click="accion ? atras() : anterior ? antes() : $router.go(-1)")

        span(class="border-0 border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light")

        #listaOpciones.dropdown-button-cabecera.btn-personalized.full.vs-align-items
          vs-dropdown(
            v-if="btnOpciones"
            vs-trigger-click
            :vsDropRight="true")
            vs-button.btn-perzonalizado.full.font-label(
              size="small"
              icon="expand_more")
              template(v-if="!opcionActiva")
                span.underline {{ ($t(tituloOpciones)).charAt(0) }}
                span {{ ($t(tituloOpciones)).substring(1, ($t(tituloOpciones)).length) }}
              template(v-else)
                span {{ $t(opcionActiva.label) }}
            vx-dropdown-menu
              template(v-for="(tr, indextr) in listaOpciones")
                vx-dropdown-item.font-label(
                  :active="opcionActiva ? opcionActiva.id === tr.id : false"
                  @click.prevent="actualizarSeleccion(tr)"
                ) {{ $t(tr.label) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnAceptar"
          :disabled="disabledAceptar"
          v-shortkey="['alt', $i18n.locale == 'es' ? 'g' : 's']"
          @shortkey="aceptar"
          icon-pack="feather"
          icon="icon-save"
          size="small"
          @click="aceptar")
          span.underline {{ ($t(titleAceptar)).charAt(0) }}
          span {{ ($t(titleAceptar)).substring(1, ($t(titleAceptar)).length) }}
          
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnFiltrarCriterio"
          v-shortkey="['alt', 'f']"
          @shortkey="filtrarCriterio"
          size="small"
          @click="filtrarCriterio"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Filtrar')).charAt(0) }}
          span.mr-3 {{ ($t('Filtrar')).substring(1, ($t('Filtrar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnSalvar"
          v-auth="`${auth}-salvar`"
          icon-pack="feather"
          icon="icon-cloud"
          size="small"
          @click="salvar")
          span.underline {{ ($t('Salvar')).charAt(0) }}
          span {{ ($t('Salvar')).substring(1, ($t('Salvar')).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnReversar"
          v-auth="`${auth}-reversar`"
          icon-pack="feather"
          icon="icon-cloud"
          size="small"
          @click="reversar")
          span.underline {{ ($t('Reversar')).charAt(0) }}
          span {{ ($t('Reversar')).substring(1, ($t('Reversar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnCancelar"
          v-shortkey="['alt', 'c']"
          @shortkey="cancelar"
          icon-pack="feather"
          icon="icon-x"
          size="small"
          @click="cancelar")
          span.underline {{ ($t('Cancelar')).charAt(0) }}
          span {{ ($t('Cancelar')).substring(1, ($t('Cancelar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnRegresar"
          v-shortkey="['alt', (titleRegresar).charAt(0)]"
          @shortkey="regresar"
          icon-pack="feather"
          icon="icon-x"
          size="small"
          @click="regresar")
          span.underline {{ ($t(titleRegresar)).charAt(0) }}
          span {{ ($t(titleRegresar)).substring(1, ($t(titleRegresar)).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnNuevo && !listaCompanias.length"
          v-shortkey="['alt', 'n']"
          @shortkey="nuevo"
          icon-pack="feather"
          icon="icon-plus" size="small" @click="nuevo")
          span.underline {{ ($t(titleNuevo)).charAt(0) }}
          span {{ ($t(titleNuevo)).substring(1, ($t(titleNuevo)).length) }}

        slot(name="button")

        .dropdown-button-cabecera.dropdown-button-companias.btn-personalized.full.vs-align-items.p-0(v-if="btnNuevo && listaCompanias.length")
          vs-button.btn-personalized.full.btnx.font-label(
            type="filled"
            @click.prevent="nuevo"
            style="height:38px;"
            v-shortkey="['alt', 'n']"
            @shortkey="nuevo"
            icon-pack="feather"
            icon="icon-plus"
            size="small"
            @click="nuevo")
            span.underline {{ ($t(titleNuevo)).charAt(0) }}
            span {{ ($t(titleNuevo)).substring(1, ($t(titleNuevo)).length) }}
          vs-dropdown(
            vs-trigger-click
            :vsDropRight="true"
          )
            vs-button.btn-perzonalizado.btn-personalized.font-label.btn-drop(
              v-auth="`${auth}-agregar`"
              type="filled"
              icon="expand_more")
            vs-dropdown-menu
              template(v-for="(tr, indextr) in listaCompanias")
                vx-dropdown-item.font-label(
                  @click.prevent="seleccionarCompania(tr)"
                ) {{ $t(tr.label) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          ref="exportarBoton"
          class="vs-con-loading__container"
          id="exportar-con-loading"
          v-if="btnExportar"
          :disabled="disabledExportar"
          v-shortkey="['alt', 'e']"
          @shortkey="exportar"
          icon-pack="feather"
          icon="icon-download-cloud"
          size="small"
          @click="exportar")
          span.underline {{ ($t('Exportar')).charAt(0) }}
          span {{ ($t('Exportar')).substring(1, ($t('Exportar')).length) }}

        vs-button.btn-personalized.full.font-label(
          v-if="btnImportar"
          v-auth="`${auth}-importar`"
          icon-pack="feather"
          icon="icon-upload-cloud"
          size="small"
          @click="importar")
          span.underline {{ ($t('Importar')).charAt(0) }}
          span {{ ($t('Importar')).substring(1, ($t('Importar')).length) }}

      div.vx-col
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnListarTodo"
          v-shortkey="['alt', 'l']"
          @shortkey="listarTodo"
          size="small"
          @click="listarTodo"
          icon-pack="feather"
          icon="icon-list")
          span.underline {{ ($t('Listar Todo')).charAt(0) }}
          span {{ ($t('Listar Todo')).substring(1, ($t('Listar Todo')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnFiltrar"
          v-shortkey="['alt', 'f']"
          @shortkey="filtrar"
          size="small"
          @click="filtrar"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Filtrar')).charAt(0) }}
          span.mr-3 {{ ($t('Filtrar')).substring(1, ($t('Filtrar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnDescargarFormato"
          size="small"
          @click="descargar"
          icon-pack="feather"
          icon="icon-download")
          span.underline {{ ($t('Descargar Formato')).charAt(0) }}
          span {{ ($t('Descargar Formato')).substring(1, ($t('Descargar Formato')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnEditar"
          v-shortkey="['alt', 's']"
          size="small"
          @click="editar"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Modificar')).charAt(0) }}
          span {{ ($t('Modificar')).substring(1, ($t('Modificar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnMayorizar"
          :disabled="btnDisabledMayorizar"
          size="small"
          @click="mayorizar"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Mayorizar')).charAt(0) }}
          span {{ ($t('Mayorizar')).substring(1, ($t('Mayorizar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnDesmayorizar"
          :disabled="btnDisabledDesmayorizar"
          size="small"
          @click="desmayorizar"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Desmayorizar')).charAt(0) }}
          span {{ ($t('Desmayorizar')).substring(1, ($t('Desmayorizar')).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnGenerarDestino"
          :disabled="btnDisabledGenerarDestino"
          v-auth="`${auth}-generar-destino`"
          size="small"
          @click="generarDestino"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Generar Destinos')).charAt(0) }}
          span {{ ($t('Generar Destinos')).substring(1, ($t('Generar Destinos')).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnAprobar"
          :disabled="btnDisabledAprobar"
          size="small"
          @click="aprobar"
          icon-pack="feather"
          icon="icon-check-circle")
          span.underline {{ ($t(textAprobar)).charAt(0) }}
          span {{ ($t(textAprobar)).substring(1, ($t(textAprobar)).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnRechazar"
          :disabled="btnDisabledRechazar"
          size="small"
          @click="rechazar"
          icon-pack="feather"
          icon="icon-x-circle")
          span.underline {{ ($t('Rechazar')).charAt(0) }}
          span {{ ($t('Rechazar')).substring(1, ($t('Rechazar')).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnConfirmar"
          :disabled="btnDisabledConfirmar"
          size="small"
          @click="confirmar"
          icon-pack="feather"
          icon="icon-check-square")
          span.underline {{ ($t(textConfirmar)).charAt(0) }}
          span {{ ($t(textConfirmar)).substring(1, ($t(textConfirmar)).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnAnular"
          :disabled="btnDisabledAnular"
          size="small"
          @click="anular"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Anular')).charAt(0) }}
          span {{ ($t('Anular')).substring(1, ($t('Anular')).length) }}
        
        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnRetornar"
          :disabled="btnDisabledRetornar"
          v-auth="`${auth}-retornar`"
          size="small"
          @click="retornar"
          icon-pack="feather"
          icon="icon-filter")
          span.underline {{ ($t('Retornar')).charAt(0) }}
          span {{ ($t('Retornar')).substring(1, ($t('Retornar')).length) }}

        vs-button.btn-personalized.full.font-label.vs-align-items(
          v-if="btnVer"
          :disabled="btnDisabledVer"
          size="small"
          @click="ver"
          icon-pack="feather"
          icon="icon-eye")
          span.underline {{ ($t(textVer)).charAt(0) }}
          span {{ ($t(textVer)).substring(1, ($t(textVer)).length) }}

        //SEGUIR MEJORANDO 
        //- div.dropdown-button-cabecera.btn-personalized.full.vs-align-items
        //-   vs-dropdown.btn-perzonalizado.full.font-label(vs-custom-content vs-trigger-click class="cursor-pointer")
        //-     feather-icon(icon="AlertTriangleIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2")
        //-     vs-dropdown-menu(class="notification-dropdown dropdown-custom")
        //-       div(class="notification-top text-center p-5 bg-primary text-white")
        //-         h3(class="text-white") {{ unreadNotifications.length }} New
        //-         p(class="opacity-75") App Notifications
        //-       VuePerfectScrollbar(ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings")
        //-         ul(class="bordered-items")
        //-           li(v-for="ntf in unreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer")
        //-             div(class="flex items-start")
        //-               feather-icon(:icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']")
        //-               div(class="mx-2")
        //-                 span(class="font-medium block notification-title" :class="[`text-${ntf.category}`]") {{ ntf.title }}
        //-                 small {{ ntf.msg }}
        //-             small(class="mt-1 whitespace-no-wrap") tiempo

    div.my-4.mx-0.vx-row.vs-align-items
      span.vx-col.font-title.uppercase.titulo-interfaz(
        :class="{'pr-4 border-0 md:border-r border-t-0 border-b-0 border-l-0 border-solid border-grey-light, title-header': $route.meta.breadcrumb || perfil }")
        span.uppercase(v-if="!copiar && !ampliar") {{ titulo.indexOf("Tipo de Cambio Diario") !== -1 ? titulo : $t(titulo) }}
        span.uppercase(v-else-if="ampliar") {{ $t(titulo) }} [{{ $t('Ampliar de') }} {{elemento}}]
        span.uppercase(v-else) {{ $t(titulo) }} [{{ $t('Copiar de') }} {{elemento}}]
      vx-breadcrumb.vx-col(class="md:block hidden" v-if="$route.meta.breadcrumb || perfil")
    vs-divider.mb-0
</template>

<script>
import axios from 'axios';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  name: 'Header',
   components: {
    VuePerfectScrollbar
  },
  props: {
    titulo: {
      type: String,
      default: '',
      required: false
    },
    tituloOpciones: {
      type: String,
      default: 'Opciones'
    },
    copiar: {
      type: Boolean,
      default: false,
      required: false
    },
    perfil: {
      type: Boolean,
      default: false,
      required: false
    },
    ampliar: {
      type: Boolean,
      default: false,
      required: false
    },
    elemento: {
      type: String,
      default: '',
      required: false
    },
    btnAtras: {
      type: Boolean,
      default: true
    },
    btnAceptar: {
      type: Boolean,
      default: false
    },
    disabledAceptar: {
      type: Boolean,
      default: false
    },
    titleAceptar: {
      type: String,
      default: 'Guardar'
    },
    titleNuevo: {
      type: String,
      default: 'Nuevo'
    },
    btnFiltrarCriterio:{
      type: Boolean,
      default: false
    },
    btnSalvar: {
      type: Boolean,
      default: false
    },
    btnReversar: {
      type: Boolean,
      default: false
    },
    btnCancelar: {
      type: Boolean,
      default: false
    },
    btnRegresar: {
      type: Boolean,
      default: false
    },
    titleRegresar: {
      type: String,
      default: 'Regresar'
    },
    btnOpciones: {
      type: Boolean,
      default: false
    },
    btnNuevo: {
      type: Boolean,
      default: true
    },
    btnExportar: {
      type: Boolean,
      default: true
    },
    disabledExportar: {
      type: Boolean,
      default: false
    },
    btnListarTodo: {
      type: Boolean,
      default: true
    },
    btnFiltrar: {
      type: Boolean,
      default: true
    },
    btnEditar: {
      type: Boolean,
      default: false,
    },
    btnMayorizar: {
      type: Boolean,
      default: false,
    },
    btnDisabledMayorizar: {
      type: Boolean,
      default: false,
    },
    btnDesmayorizar: {
      type: Boolean,
      default: false,
    },
    btnDisabledDesmayorizar: {
      type: Boolean,
      default: false,
    },
    btnGenerarDestino: {
      type: Boolean,
      default: false,
    },
    btnDisabledGenerarDestino: {
      type: Boolean,
      default: false,
    },
    btnVer: {
      type: Boolean,
      default: false
    },
    btnDisabledVer: {
      type: Boolean,
      default: false
    },
    textVer:{
      type: String,
      default: 'Ver'
    },
    btnConfirmar: {
      type: Boolean,
      default: false
    },
    btnDisabledConfirmar: {
      type: Boolean,
      default: false
    },
    textConfirmar:{
      type: String,
      default: 'Confirmar'
    },
    btnAprobar: {
      type: Boolean,
      default: false
    },
    btnDisabledAprobar: {
      type: Boolean,
      default: false
    },
    textAprobar:{
      type: String,
      default: 'Aprobar'
    },
    btnRechazar: {
      type: Boolean,
      default: false
    },
    btnDisabledRechazar: {
      type: Boolean,
      default: false
    },
    btnAnular: {
      type: Boolean,
      default: false
    },
    btnDisabledAnular: {
      type: Boolean,
      default: false
    },
    btnRetornar: {
      type: Boolean,
      default: false
    },
    btnDisabledRetornar: {
      type: Boolean,
      default: false
    },
    btnImportar: {
      type: Boolean,
      default: false
    },
    btnDescargarFormato: {
      type: Boolean,
      default: false
    },
    listaOpciones: {
      type: Array,
      default: () => []
    },
    opcionActiva: {
      type: Object,
      default: () => {}
    },
    anterior: {
      type: String,
      required: false
    },
    accion: {
      type: Boolean,
      required: false,
      default: false
    },
    auth: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      listaCompanias: [],
      unreadNotifications: [
        {
          index: 0,
          title: 'New Message',
          msg: 'Are your going to meet me tonight?',
          icon: 'MessageSquareIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 1,
          title: 'New Order Recieved',
          msg: 'You got new order of goods.',
          icon: 'PackageIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'success'
        },
        {
          index: 2,
          title: 'Server Limit Reached!',
          msg: 'Server have 99% CPU usage.',
          icon: 'AlertOctagonIcon',
          time: 'Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)',
          category: 'danger'
        },
        {
          index: 3,
          title: 'New Mail From Peter',
          msg: 'Cake sesame snaps cupcake',
          icon: 'MailIcon',
          time: 'Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: 'Chocolate cake oat cake tiramisu',
          icon: 'CalendarIcon',
          time: 'Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)',
          category: 'warning'
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
    };
  },
  computed: {
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    contentAreaClass() {
      if (this.sidebarWidth == 'default') return 'content-area-default';
      else if (this.sidebarWidth == 'reduced') return 'content-area-reduced';
      return 'content-area-full';
    }
  },
  methods: {
    actualizarSeleccion(tr) {
      this.$emit('update:opcionActiva', tr);
    },
    seleccionarCompania(tr) {
      const ruta = this.$router.resolve({ name: `${this.$route.name}-nuevo` });
      localStorage.setItem(`${ruta.route.name}-comp`, tr.id);
      window.open(ruta.href, '_blank');
    },
    antes() {
      this.$router.push(this.anterior);
    },
    atras() {
      this.$emit('atras');
    },
    aceptar() {
      this.$emit('aceptar');
    },
    filtrarCriterio() {
      this.$emit('filtrarCriterio');
    },
    salvar() {
      this.$emit('salvar');
    },
    reversar(){
      this.$emit('reversar');
    },
    cancelar() {
      this.$emit('cancelar');
    },
    regresar() {
      this.$emit('regresar');
    },
    nuevo() {
      const ruta = this.$router.resolve({ name: `${this.$route.name}-nuevo` });

      if (ruta.route.meta.compania) {
        const compania = localStorage.getItem('compania-actual');
        localStorage.setItem(`${ruta.route.name}-comp`, compania);
      }
      this.$emit('nuevo');
    },
    exportar() {
      this.$emit('exportar');
    },
    listarTodo() {
      this.$emit('listarTodo');
    },
    filtrar() {
      this.$emit('filtrar');
    },
    editar(){
      this.$emit('editar');
    },
    mayorizar(){
      this.$emit('mayorizar');
    },
    desmayorizar(){
      this.$emit('desmayorizar');
    },
    generarDestino(){
      this.$emit('generarDestino');
    },
    confirmar(){
      this.$emit('confirmar');
    },
    aprobar(){
      this.$emit('aprobar');
    },
    rechazar(){
      this.$emit('rechazar');
    },
    anular(){
      this.$emit('anular');
    },
    retornar(){
      this.$emit('retornar');
    },
    ver(){
      this.$emit('ver');
    },
    importar() {
      this.$emit('importar');
    },
    descargar() {
      this.$emit('descargar');
    },
    async verificarCompanias() {
      const ruta = this.$router.resolve({ name: `${this.$route.name}-nuevo` });
      let companias = [];

      if (ruta.route.meta.compania) {
        let headers = {};
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        const { data } = await axios(`${process.env.VUE_APP_API}cargar_datos?estado=false&opcion=c_companiasautorizadas&idaplicacion=&idcompania=000&paltaaplicacion=SE`, {
          headers: headers
        });

        const response = data.data;
        const companiaLogueada = localStorage.getItem('compania-actual');

        if (response.estado) {
          companias = response.data.map((e) => {
            return {
              id: e.companiaId,
              label: e.companiaDescripcionCorta
            };
          });

          companias = companias.filter((e) => {
            return e.id !== companiaLogueada;
          });
        } else {
          companias = [];
        }
      } else companias = [];

      this.listaCompanias = companias;
    }
  },
  mounted() {
    let result = document.getElementsByClassName('btn-personalized');
    let result2 = document.getElementsByClassName('btn-perzonalizado');
    for (let index = 0; index < result.length; index++) {
      result[index].classList.remove('vs-button-primary');
    }
    for (let index = 0; index < result2.length; index++) {
      result2[index].classList.remove('vs-button-primary');
    }
    this.verificarCompanias();
  }
};
</script>

<style lang="scss">
.btn-perzonalizado {
  margin: 1px !important;
  padding: 10px !important;
  border: none;
  border-radius: 0;
  background: transparent !important;
  color: inherit;
}

.dropdown-button-cabecera {
  display: contents;
}

.dropdown-button-cabecera .parent-dropdown {
  cursor: pointer;
  background: inherit;
}

.dropdown-button-companias {
  padding: 0.7rem 1.5rem;

  .btnx {
    border-radius: 5px 0px 0px 5px;
  }

  .btn-drop {
    border-radius: 0px 5px 5px 0px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }

  .vs-button {
    padding: 0.72rem 1.5rem;
    height: 33.75px !important;
  }
}

.btn-personalized {
  margin: 1px !important;
  padding: 10px !important;
  border: none;
  border-radius: 0;
  background: rgb(244, 244, 244) !important;
  color: gray;
}

.vs-button-filled:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.btn-personalized i {
  color: rgba(var(--vs-primary), 1) !important;
}

.btn-atras i {
  color: gray !important;
}

.btn-personalized.vs-button-filled {
  background: rgb(244, 244, 244) !important;
}

.btn-personalized.vs-button-filled:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.btn-personalized:hover {
  background: rgb(234, 234, 234) !important;
  color: rgb(36, 48, 64);
}

.btn-personalized:active {
  background: rgb(234, 234, 234) !important;
  color: black;
}

@media (max-width: 650px) {
  .btn-personalized span {
    display: none;
  }
}
@media (max-width: 374px) {
  .vx-row.vs-justify-space-between {
    padding-top: 0.9rem;
  }
}
@media (max-width: 255px) {
  .vs-justify-space-between {
    justify-content: center;
  }
  .full {
    width: 100% !important;
  }
}
</style>
