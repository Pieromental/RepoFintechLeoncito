<template lang="pug">
//-   div

//-     vx-dialog(:active="activeDialog" :color="'warning'" :title="$t('Alerta')" :body="$t('El cambio de compañía se replicará también en la compañía mandante. ¿Está seguro de que desea continuar?')" :icon="'AlertCircleIcon'" :confirmText="$t('Aceptar')" :cancelText="$t('Cancelar')" :confirmColor="'primary'" :cancelColor="'warning'" :confirm="true" :cancel="true" @confirm="confirm" @cancel="closeDialog" @closeDialog="closeDialog")
//-     cabecera(:titulo="$t(titulo)" @aceptar="validarFormulario" @cancelar="cancelar" :btnAceptar="!ver" :btnCancelar="true" :btnNuevo="false" :btnExportar="false" :btnListarTodo="false" :btnFiltrar="false")
    
//-     vx-card.card-sticky-floating
//-       div.vx-row
//-         form.w-full( @submit.prevent="validarFormulario" method="post" data-vv-scope="registrarProyecto")

//-           vx-card.card-style-collapse(:title="$t('Información General')" collapse-action)
//-             div.vx-row
//-               div.vx-col.w-full(class="md:w-5/6")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Compañía") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full(name="compania" :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione Compañía')}`" @input="inputCompaniaSeleccionada" :options="optionsCompania"  v-model="companiaSeleccionada" :disabled="editar||ver")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}} 
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Unidad de Negocio") }}
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full.w-full.icon-clear( :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione una Unidad de Negocio')}`" :options="opcionUnidadNegocio"  v-model="unidadNegocioSeleccionada" :disabled="editar||ver||proyectoRelacionado=='COMP'")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}}
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}
//-                     span.font-error.text-danger(v-if="mensajeUnidadNegocio") {{ $t(mensajeUnidadNegocio) }}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Código") }} 
//-                     span.font-label(v-if="!ver") (10)
//-                       span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     vs-input.w-full( size="small" ref="codigo" name="codigo" v-validate="'required|max:10'" data-vv-validate-on="blur|input" v-mask="{ mask:funcionMascara(10,'A'), tokens:{ 'A': {pattern: /[a-zA-Z0-9]/, transform: v => v.toLocaleUpperCase()}}}" v-model="proyecto.codigo" @blur="verificarCodigo" @keyup.enter.prevent="verificarCodigo" autocomplete="off" :disabled="!nuevo")
//-                     span.font-error.text-danger(v-if="mensajeCodigo") {{ $t(mensajeCodigo) }}
//-                     span.font-error.text-danger(v-else) {{errors.first("registrarProyecto.codigo")}}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.bold.font-label {{$t('Descripción')}} 
//-                     span.font-label(v-if="!ver") (40)
//-                       span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     vs-input.w-full(size="small" ref="descripcion" name="descripcion"  v-model="proyecto.descripcion"  v-validate="'required|max:40'"  data-vv-validate-on="blur|input"  v-mask="{ mask:funcionMascara(40,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/, transform: v => v.toLocaleUpperCase()}}}"  autocomplete="off" @blur="trimLabel('descripcion')" :disabled="ver")
//-                     span.text-danger.font-error(v-if="errors.has('registrarProyecto.descripcion')") {{ errors.first("registrarProyecto.descripcion") }}
                    
//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.bold.font-label {{$t('Descripción Inglés')}} 
//-                     span.font-label(v-if="!ver") (40)
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     vs-input.w-full(size="small" ref="descripcionIngles" name="descripcionIngles"  v-model="proyecto.descripcionIngles"  v-validate="'max:40'"  data-vv-validate-on="blur|input"  v-mask="{ mask:funcionMascara(40,'D'), tokens:{ 'D': {pattern: /[\"\\w!<>¡?¿^()*|°¬+{}:,;&%$#=\\[\\\]\\\\/'\\d.-\\s]/, transform: v => v.toLocaleUpperCase()}}}"  autocomplete="off" @blur="trimLabel('descripcionIngles')" :disabled="ver")

//-             //-vx-card.card-style-collapse(:title="$t('Caracteristicas')" collapse-action)
//-             div.vx-row
//-               div.vx-col.w-full(class="md:w-5/6")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Responsable") }}
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full.icon-clear( :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione un Responsable')}`" :options="opcionResponsable"  v-model="responsableSeleccionado" :disabled="ver")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}}
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}
//-                     span.font-error.text-danger(v-if="mensajeResponsable") {{ $t(mensajeResponsable) }}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Tipo de Proyecto") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full( :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione un Tipo de Proyecto')}`" :options="opcionTipoProyecto"  v-model="tipoProyectoSeleccionado" :disabled="ver")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}}
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}
//-                     span.font-error.text-danger(v-if="mensajeTipoProyecto") {{ $t(mensajeTipoProyecto) }}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.bold.font-label {{ $t('Grupo de Proyecto') }}
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-treeselect.font-label(:options='opcionGrupoProyecto' :disable-branch-nodes="false" :clearable="false" :flat="true" :multiple="false" :show-count="true" v-model="grupoProyectoSeleccionado" value-format="object"  :searchable="true" :placeholder="$t('Seleccione un Grupo de Proyecto')" :disabled="ver")
//-                       template(slot="option-label" slot-scope="{ node }")
//-                         span {{ node.raw.codigo }} - {{ node.raw.label }}
//-                       template(slot="value-label" slot-scope="{ node }")
//-                         span {{ node.raw.label }}
//-                     span.font-error.text-danger(v-if="mensajeGrupoProyecto") {{ $t(mensajeGrupoProyecto) }}
                    
//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Elemento de Gasto") }}
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full( :class="[{'icon-clear': !ver}]" :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione un Elemento de Gasto')}`" :options="opcionElementoGasto"  v-model="elementoGastoSeleccionado" :disabled="ver")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}}
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}
//-                     span.font-error.text-danger(v-if="mensajeElementoGasto") {{ $t(mensajeElementoGasto) }}
                    
//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Moneda") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     v-select.font-label.w-full( :filterBy="filterByIdLabel" label="codigo" :clearable="false" :placeholder="`${$t('Seleccione una Moneda')}`" :options="opcionMoneda"  v-model="monedaSeleccionada" :disabled="ver || disabledMoneda")
//-                       template(slot="selected-option" slot-scope="option")
//-                         span {{option.label}}
//-                       template(slot="option" slot-scope="option")
//-                         span {{option.codigo}} - {{option.label}}
//-                       template(slot="no-options")
//-                         small {{ $t("No se encontraron registros.") }}
//-                     span.font-error.text-danger(v-if="mensajeMoneda") {{ $t(mensajeMoneda) }}

//-             //-vx-card.card-style-collapse(:title="$t('Información Contable')" collapse-action)
//-             div.vx-row
//-               div.vx-col.w-full(class="md:w-5/6")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full( class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Centro de Responsabilidad") }}
//-                   div.vx-col.w-full( class="sm:w-1/2")
//-                     .vs-align-items
//-                       vs-input.mr-3( size="small" name="centroCosto" ref="centroCosto"  v-model="proyecto.centroCosto" :disabled="ver" :placeholder="$t('Código')" autocomplete="off" v-mask="{ mask:funcionMascara(10,'#'), tokens:{ '#': {pattern: /[\\d]/}}}" @blur="verificarCentroCosto(proyecto.centroCosto)" @keyup.enter.prevent="verificarCentroCosto(proyecto.centroCosto)")
//-                       vs-input.mr-3( size="small" autocomplete="off" :placeholder="`${$t('Descripción')}`" :value="proyecto.centroCostoDescripcion" :disabled="true")
//-                       vs-button( v-if="!ver" size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" @click="openPopupCentroCosto()")
//-                     span.font-error.text-danger(v-if="mensajeCentroCosto") {{ $t(mensajeCentroCosto) }}

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full( class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Cuenta Contable") }}
//-                   div.vx-col.w-full( class="sm:w-1/2")
//-                     .vs-align-items
//-                       vs-input.mr-3( size="small" name="cuentaContable" ref="cuentaContable"  v-model="proyecto.cuentaContable" :disabled="ver" :placeholder="$t('Código')" autocomplete="off" v-mask="{ mask:funcionMascara(digitosCuenta,'#'), tokens:{ '#': {pattern: /[\\d.-]/}}}" @blur="verificarCuentaContable(proyecto.cuentaContable)" @keyup.enter.prevent="verificarCuentaContable(proyecto.cuentaContable)")
//-                       vs-input.mr-3( size="small" autocomplete="off" :placeholder="`${$t('Descripción')}`" :value="proyecto.cuentaContableDescripcion" :disabled="true")
//-                       vs-button( v-if="!ver" size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" @click="openPopupCuentaContable()")
//-                     span.font-error.text-danger(v-if="mensajeCuentaContable") {{ $t(mensajeCuentaContable) }}

//-             //-vx-card.card-style-collapse(:title="$t('Información')" collapse-action)
//-             div.vx-row
//-               div.vx-col.w-full(class="md:w-5/6")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Fecha de Inicio") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     div.vx-col.vs-align-items
//-                       template(v-if="!ver")
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" ref="fechaIn" :language="languages['es']" v-model="proyecto.fechaInicio" format="dd/MM/yyyy" :disabledDates="disabledFechaInicio" placeholder="Fecha de Inicio" @input="inputFechaInicio(proyecto.fechaInicio)")
//-                       template(v-else)
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" disabled ref="fechaIn" :language="languages['es']" v-model="proyecto.fechaInicio" format="dd/MM/yyyy" :disabledDates="disabledFechaInicio" placeholder="Fecha de Inicio")
//-                       //-feather-icon.style-icon.color-icono-image.ml-5(v-if="!ver" class="sm:w-1/5 sm:block hidden" style="cursor:pointer;padding-bottom: 1.9rem;" icon="CalendarIcon" color="primary" @click="$refs.fechaIn.showCalendar()")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Fecha Fin") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     div.vx-col.vs-align-items
//-                       template(v-if="!ver")
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" ref="fechaFn" :language="languages['es']" v-model="proyecto.fechaFin" format="dd/MM/yyyy" :disabledDates="disabledFechaFin" placeholder="Fecha Fin" @input="inputFechaFin(proyecto.fechaFin)" )
//-                       template(v-else)
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" disabled ref="fechaFn" :language="languages['es']" v-model="proyecto.fechaFin" format="dd/MM/yyyy" :disabledDates="disabledFechaFin" placeholder="Fecha Fin")
//-                       //-feather-icon.style-icon.color-icono-image.ml-5(v-if="!ver" class="sm:w-1/5 sm:block hidden" style="cursor:pointer;padding-bottom: 1.9rem;" icon="CalendarIcon" color="primary" @click="$refs.fechaFn.showCalendar()")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Fecha de Aprobación") }}
//-                     span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     div.vx-col.vs-align-items
//-                       template(v-if="!ver")
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" ref="fechaAp" :language="languages['es']" v-model="proyecto.fechaAprobacion" format="dd/MM/yyyy" placeholder="Fecha de Aprobación")
//-                       template(v-else)
//-                         datepicker.w-full.font-label.datapicker_input(class="sm:w-full" disabled ref="fechaAp" :language="languages['es']" v-model="proyecto.fechaAprobacion" format="dd/MM/yyyy" placeholder="Fecha de Aprobación")
//-                       //-feather-icon.style-icon.color-icono-image.ml-5(v-if="!ver" class="sm:w-1/5 sm:block hidden" style="cursor:pointer;padding-bottom: 1.9rem;" icon="CalendarIcon" color="primary" @click="$refs.fechaAp.showCalendar()")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{ $t("Monto Autorizado") }} 
//-                     span.font-label(v-if="!ver") (19)
//-                       span.font-label.bold.text-danger(v-if="!ver")  *
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                     vs-input.pt-1.w-full(size="small" ref="montoAutorizado" name="montoAutorizado"  v-model="proyecto.montoAutorizado" v-validate="'required|max:20'" data-vv-validate-on="blur|input" v-mask="{mask:funcionMascara(20,'D'),tokens:{'D': {pattern: /[\\d.]/, transform: v => v.toLocaleUpperCase()},}}" @input="formato($event,15,4)" autocomplete="off" :disabled="ver")
//-                     span.text-danger.font-error(v-if="errors.has('registrarProyecto.montoAutorizado')") {{ errors.first("registrarProyecto.montoAutorizado") }}
                    
//-           vx-card.card-style-collapse(:title="$t('Estado')" collapse-action)
//-             div.vx-row
//-               div.vx-col.w-full(class="md:w-5/6")

//-                 div.vx-row.mb-3
//-                   div.vx-col.w-full(class="sm:w-1/3")
//-                     span.font-label.bold {{$t('Estado')}}
//-                   div.vx-col.w-full(class="sm:w-1/2")
//-                       .vs-align-items.font-label
//-                         vs-radio.mr-3(v-model="proyecto.estado" vs-name="proyecto.estado" :vs-value="true" :disabled="ver") {{$t("Activo")}}
//-                         vs-radio.mr-3(v-model="proyecto.estado" vs-name="proyecto.estado" :vs-value="false" :disabled="ver") {{$t("Inactivo")}}

//-       footer-datos(v-if='editar||ver' :datosAlta="editar" :propDatos='footer' )

//-     popup-cuenta-contable-formulario(:popupActive="popupActiveCuentaContable" :company="company" :lengthRestriction="digitosCuenta" @selectedAccount="selectedAccount" @closePopup="closePopup" )
//-     popup-centro-costo-formulario(:popupActive="popupActiveCentroCosto" :company="company" @selectedCenter="selectedCenter" @closePopup="closePopup" )
      
</template>

<script>

// import Cabecera from '@/proyecto/vistas/header.vue';
// import request from '@/mixins/mixinRequest';
// import parametros from '@/mixins/mixinParametros';
// import swal from 'sweetalert2';
// import funciones from '@/functions';
// import { Validator } from 'vee-validate';
// import vSelect from 'vue-select';
// import vTreeselect from '@riophae/vue-treeselect';
// import Datepicker from "vuejs-datepicker";
// import * as lang from 'vuejs-datepicker/src/locale';
// import FooterDatos from '@/proyecto/componentes/extras/componentes/FooterDatos';
// import PopupCuentaContableFormulario from "@/proyecto/componentes/maestro/contabilidad/proyecto/popup/PopupCuentaContableFormulario.vue";
// import PopupCentroCostoFormulario from "@/proyecto/componentes/maestro/contabilidad/proyecto/popup/PopupCentroCostoFormulario.vue";

// const dictEs = {
//   custom: {
//     codigo: {
//       required: 'El Código es requerido.',
//       max: 'Longitud máxima de 10 caracteres.',
//     },
//     descripcion: {
//       required: 'La Descripción es requerida.',
//       max: 'Longitud máxima de 50 caracteres.',
//     },
//     descripcionIngles: {
//       max: 'Longitud máxima de 50 caracteres.',
//     },
//     montoAutorizado: {
//       required: 'El Monto Autorizado es requerido.',
//       max: 'Longitud máxima de 19 digitos.',
//     },
//   }
// };

// const dictEn = {
//   custom: {
//     codigo: {
//       required: 'The Code is required.',
//       max: 'Maximum length of 10 characters.',
//     },
//     descripcion: {
//       required: 'The Description is required.',
//       max: 'Maximum length of 50 characters.',
//     },
//     descripcionIngles: {
//       max: 'Maximum length of 50 characters.',
//     },
//     montoAutorizado: {
//       required: 'The Authorized Amount is required.',
//       max: 'Maximum length of 19 digits.',
//     },
//   }
// };

// export default {

//   name: 'FormularioProyecto',
//   mixins: [request, parametros],

//   components: {
//     Cabecera,
//     vSelect,
//     vTreeselect,
//     Datepicker,
//     FooterDatos,
//     PopupCuentaContableFormulario,
//     PopupCentroCostoFormulario
//   },

//   data(){
//     return {
      
//       proyecto: {
//         id: '',
//         codigo: '',
//         descripcion: '',
//         descripcionIngles: '',
//         centroCosto: '',
//         centroCostoDescripcion: '',
//         centroCostoEstado: true,
//         cuentaContable:'',
//         cuentaContableDescripcion:'',
//         cuentaContableEstado: true,
//         fechaInicio: new Date(Date.now()),
//         fechaFin: new Date(Date.now()),
//         fechaAprobacion: new Date(Date.now()),
//         montoAutorizado: '',
//         estado: true
//       },

//       optionsCompania: [],
//       companiaSeleccionada: '',

//       opcionUnidadNegocio: [],
//       unidadNegocioSeleccionada: '',
//       mensajeUnidadNegocio: '',

//       tempCodigo: '',
//       mensajeCodigo: '',

//       opcionResponsable: [],
//       responsableSeleccionado: '',
//       mensajeResponsable: '',

//       opcionTipoProyecto: [],
//       tipoProyectoSeleccionado: '',
//       mensajeTipoProyecto: '',

//       opcionGrupoProyecto: [],
//       grupoProyectoSeleccionado: null,
//       mensajeGrupoProyecto: '',
      
//       opcionElementoGasto: [],
//       elementoGastoSeleccionado: '',
//       mensajeElementoGasto: '',

//       opcionMoneda: [],
//       monedaSeleccionada: '',
//       mensajeMoneda: '',
//       disabledMoneda: false,

//       languages: lang,
//       disabledFechaInicio: {
//         from:new Date(new Date().getTime())
//       },
//       disabledFechaFin: {
//         to:new Date(new Date().getTime()-24*60*60*1000)
//       },

//       tmpCentro: '',
//       mensajeCentroCosto: '',

//       tmpCuenta: '',
//       mensajeCuentaContable: '',
//       digitosCuenta: 0,

//       popupActiveCuentaContable: false,
//       company: '',

//       popupActiveCentroCosto: false,
//       dataPopupCosto: {},

//       activeDialog: false,
//       companiaTemp: '',

//       titulo: '',
//       nuevo: false,
//       editar: false,
//       ver: false,

//       proyectoRelacionado: '',
//       isMounted: false,
//       footer: {},
//     }
//   },

//   computed: {
    
//   },

//   watch: {
//     async unidadNegocioSeleccionada(val){
//       if(this.ver) return
//       if(this.isMounted) this.responsableSeleccionado = '';
//       await this.cargarResponsable();
//       if(val){
//         if(val.estado){
//           this.mensajeUnidadNegocio = '';
//         }else{
//           this.mensajeUnidadNegocio = 'La Unidad de Negocio no se encuentra activa.';
//         }
//         if(this.isMounted){
//           await this.verificarCodigo();
//         }
//       }
//     },
//     responsableSeleccionado(val){
//       if(this.ver) return
//       if(val){
//         if(val.estado){
//           this.mensajeResponsable = '';
//         }else{
//           this.mensajeResponsable = 'El Responsable no se encuentra activo.';
//         }
//       }else{
//         this.mensajeResponsable = '';
//       }
//     },
//     tipoProyectoSeleccionado(val){
//       if(this.ver) return
//       if(val){
//         if(val.estado){
//           this.mensajeTipoProyecto = '';
//         }else{
//           this.mensajeTipoProyecto = 'El Tipo de Proyecto no se encuentra activo.';
//         }
//       }
//     },
//     grupoProyectoSeleccionado(val){
//       if(this.ver) return
//       if(val){
//         if(val.estado){
//           if(val.isDisabled) this.mensajeGrupoProyecto = 'El Grupo de Proyecto no se encuentra seleccionable.';
//           else this.mensajeGrupoProyecto = '';
//           //this.mensajeGrupoProyecto = '';
//         }else{
//           this.mensajeGrupoProyecto = 'El Grupo de Proyecto no se encuentra activo.';
//         }
//       }
//     },
//     elementoGastoSeleccionado(val){
//       if(this.ver) return
//       if(val){
//         if(val.estado){
//           this.mensajeElementoGasto = '';
//         }else{
//           this.mensajeElementoGasto = 'El Elemento de Gasto no se encuentra activo.';
//         }
//       }else{
//         this.mensajeElementoGasto = '';
//       }
//     },
//     monedaSeleccionada(val){
//       if(this.ver) return
//       if(val){
//         if(val.estado){
//           this.mensajeMoneda = '';
//         }else{
//           this.mensajeMoneda = 'La Moneda no se encuentra activa.';
//         }
//       }
//     }
//   },

//   methods: {
    
//     // VALIDACION: COMPANIA LOGUEADA - COMPANIA SELECCIONADA
    
//     async inputCompaniaSeleccionada(){
//       if(this.companiaSeleccionada.id != localStorage.getItem(`compania-actual`)){
//         this.companiaTemp = localStorage.getItem(`compania-actual`);
//         this.activeDialog = true;
//       }
//     },

//     async confirm() {
//       this.activeDialog = false;
//       localStorage.setItem('compania-actual', this.companiaSeleccionada.id);
//       this.$store.dispatch('cambiarCompaniaSeleccionada', this.companiaSeleccionada.id);
//       location.reload();
//     },

//     closeDialog() {
//       this.companiaSeleccionada = this.optionsCompania.find( element =>{ return element.id == this.companiaTemp} );
//       this.activeDialog = false;
//     },

//     // CONSUMIR APIS DE CARGARES Y VERIFICACION

//     async cargarCompania(){
//       try {
//         let {data} = await this.requestApi(`cargar_compania_usuario`)
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter((element) => ((element.object.estado == true) && (element.usuarioDetalleValorCodigoTipoCompania == 'P')));
//           this.optionsCompania = filter.map(element =>{
//             return {
//               id: element.companiaId,
//               label: element.companiaDescripcionCorta,
//               codigo: element.companiaId
//             }
//           })
//           this.companiaSeleccionada =  this.optionsCompania.find(element =>{return element.id == localStorage.getItem('compania-actual') });
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarUnidadNegocio(){
//       try {
//         if(this.ver) return
//         this.opcionUnidadNegocio = [];
//         if(!this.companiaSeleccionada) return
//         let {data} = await this.requestApi(`cargar_unidad_negocio_proyecto?compania=${this.companiaSeleccionada.id}`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element => {return element.object.estado == true});
//           this.opcionUnidadNegocio = filter.map(element =>{
//             return{
//               id: element.id,
//               label: element.label,
//               codigo: element.object.id,
//               preferida: element.object.preferida,
//               estado: element.object.estado
//             }
//           });
//           if(this.nuevo){
//             let preferida = this.opcionUnidadNegocio.find(element =>{return element.preferida});
//             this.unidadNegocioSeleccionada = preferida ? preferida:this.opcionUnidadNegocio[0];
//           }
//         }
//         if(this.editar){
//           if(this.unidadNegocioSeleccionada){
//             if(this.unidadNegocioSeleccionada.estado){
//               let busqueda = this.busquedaOpcion(this.opcionUnidadNegocio,this.unidadNegocioSeleccionada);
//               if(busqueda) {
//                 this.unidadNegocioSeleccionada = busqueda;
//                 this.mensajeUnidadNegocio = '';
//               }else{
//                 this.unidadNegocioSeleccionada = '';
//                 this.mensajeUnidadNegocio = 'La Unidad de Negocio no se encuentra activa.';
//               }
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async verificarCodigo() {
//       if(!this.nuevo) return
//       if (this.proyecto.codigo) {
//         try {
//           if(!this.companiaSeleccionada && this.proyectoRelacionado=='COMP') return
//           if(!this.unidadNegocioSeleccionada && this.proyectoRelacionado=='UNIN') return
//           if(this.tempCodigo == `${this.proyecto.codigo} ${this.unidadNegocioSeleccionada ? this.unidadNegocioSeleccionada.id:''}`) return
//           this.$vs.loading({ type: 'point' });
//           let { data } = await this.requestApi(`verificar_codigo_proyecto?codigo=${this.proyecto.codigo}&compania=${this.proyectoRelacionado=='COMP' ? this.companiaSeleccionada.id:''}&idUnidadNegocio=${this.proyectoRelacionado=='UNIN' ? this.unidadNegocioSeleccionada.id:''}`);
//           let response = data.data;
//           if (response.estado) {
//             this.mensajeCodigo = response.mensaje;
//             this.proyecto.codigo = '';
//             this.tempCodigo = '';
//             this.$validator.reset();
//             this.$refs.codigo.focusInput();
//           } else {
//             this.mensajeCodigo = '';
//             this.tempCodigo =  `${this.proyecto.codigo} ${this.unidadNegocioSeleccionada ? this.unidadNegocioSeleccionada.id:''}`;
//           }
//         } catch (error) {
//           throw new Error(error);
//         } finally{
//           this.$vs.loading.close();
//         }
//       }else{
//         this.mensajeCodigo = '';
//         this.tempCodigo = '';
//       }
//     },

//     async cargarResponsable(){
//       try {
//         if(this.ver) return
//         this.opcionResponsable = [];
//         let statusCarga = true;
//         let statusCargaByComp = true;
//         if(this.nuevo){
//           if(this.proyectoRelacionado=='COMP'){
//             statusCargaByComp = true;
//           }else{
//             statusCargaByComp = false;
//           }
//           if(statusCargaByComp && !this.companiaSeleccionada) statusCarga = false;
//           if(!statusCargaByComp && !this.unidadNegocioSeleccionada) statusCarga = false;
//         }else{
//           if(this.proyectoRelacionado=='COMP'){
//             statusCargaByComp = true;
//           }else{
//             statusCargaByComp = false;
//           }
//         }
//         if(!statusCarga) return

//         if(this.isMounted) this.$vs.loading({ type: 'point' });
//         let {data} = await this.requestApi(`cargar_responsable_proyecto?compania=${statusCargaByComp ? this.companiaSeleccionada.id:''}&idUnidadNegocio=${!statusCargaByComp ? this.unidadNegocioSeleccionada.id:''}`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element => {return element.object.estado == true});
//           this.opcionResponsable = filter.map(element =>{
//             return{
//               id: element.id,
//               label: element.label,
//               codigo: element.object.id,
//               estado: element.object.estado
//             }
//           });
//         }
//         if(this.editar){
//           if(this.responsableSeleccionado){
//             if(this.responsableSeleccionado.estado){
//               let busqueda = this.busquedaOpcion(this.opcionResponsable,this.responsableSeleccionado);
//               if(busqueda) {
//                 this.responsableSeleccionado = busqueda;
//                 this.mensajeResponsable = '';
//               }else{
//                 this.responsableSeleccionado = '';
//                 this.mensajeResponsable = 'El Responsable no se encuentra activo.';
//               }
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       } finally{
//         if(this.isMounted) this.$vs.loading.close();
//       }
//     },

//     async cargarTipoProyecto(){
//       try {
//         if(this.ver) return
//         this.opcionTipoProyecto = [];
//         if(!this.companiaSeleccionada) return
//         let {data} = await this.requestApi(`cargar_tipo_proyecto?compania=${this.companiaSeleccionada.id}`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element => {return element.object.estado == true});
//           this.opcionTipoProyecto = filter.map(element =>{
//             return{
//               id: element.id,
//               label: element.label,
//               codigo: element.object.codigo,
//               estado: element.object.estado
//             }
//           });
//         }
//         if(this.editar){
//           if(this.tipoProyectoSeleccionado){
//             if(this.tipoProyectoSeleccionado.estado){
//               let busqueda = this.busquedaOpcion(this.opcionTipoProyecto,this.tipoProyectoSeleccionado);
//               if(busqueda) {
//                 this.tipoProyectoSeleccionado = busqueda;
//                 this.mensajeTipoProyecto = '';
//               }else{
//                 this.tipoProyectoSeleccionado = '';
//                 this.mensajeTipoProyecto = 'El Tipo de Proyecto no se encuentra activo.';
//               }
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },
    
//     async cargarGrupoProyecto(){
//       try {
//         this.opcionGrupoProyecto = [];
//         if(!this.companiaSeleccionada) return
//         let {data} = await this.requestApi(`cargar_grupo_proyecto?compania=${this.companiaSeleccionada.id}`);
//         let response = data.data;
//         if(response.estado){
//           this.opcionGrupoProyecto = this.recursividadChildren(response.data);
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     cargarGrupoProyectoAux(){
//       if(this.editar){
//         if(this.grupoProyectoSeleccionado){
//           if(this.grupoProyectoSeleccionado.estado){
//             let busqueda = this.busquedaChildren(this.opcionGrupoProyecto,this.grupoProyectoSeleccionado,this.grupoProyectoSeleccionado.nivel);
//             if(busqueda){
//               if(busqueda.children) delete busqueda.children
//               this.grupoProyectoSeleccionado = busqueda;
//             }else{
//               this.mensajeGrupoProyecto = 'El Grupo de Proyecto no se encuentra activo.';
//             }
//           }
//         }
//       }
//     },

//     async cargarElementoGasto(){
//       try {
//         if(this.ver) return
//         this.opcionElementoGasto = [];
//         if(!this.companiaSeleccionada) return
//         let {data} = await this.requestApi(`cargar_elemento_gasto_compania?compania=${this.companiaSeleccionada.id}`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element => {return element.object.estado == true});
//           this.opcionElementoGasto = filter.map(element =>{
//             return{
//               id: element.id,
//               label: element.label,
//               codigo: element.object.codigo,
//               estado: element.object.estado
//             }
//           });
//         }
//         if(this.editar){
//           if(this.elementoGastoSeleccionado){
//             if(this.elementoGastoSeleccionado.estado){
//               let busqueda = this.busquedaOpcion(this.opcionElementoGasto,this.elementoGastoSeleccionado);
//               if(busqueda) {
//                 this.elementoGastoSeleccionado = busqueda;
//                 this.mensajeElementoGasto = '';
//               }else{
//                 this.elementoGastoSeleccionado = '';
//                 this.mensajeElementoGasto = 'El Elemento de Gasto no se encuentra activo.';
//               }
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async cargarMoneda(){
//       try {
//         if(this.ver) return
//         let {data} = await this.requestApi(`cargar_moneda_defecto`);
//         let response = data.data;
//         if(response.estado){
//           let filter = response.data.filter(element => {return element.object.estado == true});
//           this.opcionMoneda = filter.map(element =>{
//             return{
//               id: element.id,
//               label: element.label,
//               codigo: element.id,
//               defecto: element.object.porDefecto,
//               estado: element.object.estado
//             }
//           });
//           if(this.nuevo){
//             this.monedaSeleccionada = this.opcionMoneda.find(element =>{return element.defecto});
//           }
//         }
//         if(this.editar){
//           if(this.monedaSeleccionada){
//             if(this.monedaSeleccionada.estado){
//               let busqueda = this.busquedaOpcion(this.opcionMoneda,this.monedaSeleccionada);
//               if(busqueda) {
//                 this.monedaSeleccionada = busqueda;
//                 this.mensajeMoneda = '';
//               }else{
//                 this.monedaSeleccionada = '';
//                 this.mensajeMoneda = 'La Moneda no se encuentra activa.';
//               }
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async verificarCentroCosto(value) {
//       if (value) {
//         try {
//           if(!this.companiaSeleccionada) return
//           if(this.tmpCentro == value) return
//           if(this.isMounted) this.$vs.loading({ type: 'point' });
//           let {data} = await this.requestApi(`buscar_centro_costo_defecto?idCentroCostoDefecto=${value}&companiaSeleccionada=${this.companiaSeleccionada.id}`);
//           let response = data.data;
//           if (!response.estado) {
//             if(this.isMounted){
//               this.proyecto.centroCosto = '';
//               this.proyecto.centroCostoDescripcion = '';
//               this.mensajeCentroCosto = response.mensaje;
//               this.tmpCentro = '';
//               this.$refs.centroCosto.focusInput();
//             }else{
//               this.tmpCentro = value;
//               this.mensajeCentroCosto = 'El Centro de Responsabilidad no se encuentra activo.';
//             }
//           } else {
//             this.proyecto.centroCosto = response.data[0].id;
//             this.proyecto.centroCostoDescripcion = response.data[0].descripcion;
//             this.mensajeCentroCosto = '';
//             this.tmpCentro = value;
//           }
//         } catch (error) {
//           throw new Error(error);
//         } finally{
//           if(this.isMounted) this.$vs.loading.close();
//         }
//       }else{
//         this.tmpCentro = '';
//         this.proyecto.centroCosto = '';
//         this.proyecto.centroCostoDescripcion = '';
//         this.mensajeCentroCosto = '';
//       }
//     },

//     async verificarCuentaContable(value) {
//       if (value) {
//         try {
//           if(!this.companiaSeleccionada) return
//           if(this.tmpCuenta == value) return
//           if(this.isMounted) this.$vs.loading({ type: 'point' });
//           let {data} = await this.requestApi(`buscar_cuenta_contable_codigo_familia?id=${value}&compania=${this.companiaSeleccionada.id}`);
//           let response = data.data;
//           if (!response.estado) {
//             if(this.isMounted){
//               this.proyecto.cuentaContable = '';
//               this.proyecto.cuentaContableDescripcion = '';
//               this.mensajeCuentaContable = response.mensaje;
//               this.tmpCuenta = '';
//               this.$refs.cuentaContable.focusInput();
//             }else{
//               this.tmpCuenta = value;
//               this.mensajeCuentaContable = 'La Cuenta Contable no se encuentra activa.';
//             }
//           } else {
//             this.proyecto.cuentaContable = response.data[0].id;
//             this.proyecto.cuentaContableDescripcion = response.data[0].descripcion;
//             this.mensajeCuentaContable = '';
//             this.tmpCuenta = value;
//           }
//         } catch (error) {
//           throw new Error(error);
//         } finally{
//           if(this.isMounted) this.$vs.loading.close();
//         }
//       }else{
//         this.tmpCuenta = '';
//         this.proyecto.cuentaContable = '';
//         this.proyecto.cuentaContableDescripcion = '';
//         this.mensajeCuentaContable = '';
//       }
//     },

//     //FUNCIONES AUXILIARES PARA LA DATA DE LOS COMBOS

//     busquedaOpcion(data, opcion){
//       let encuentra = '';
//       data.find( element=>{
//         if( element.codigo == opcion.codigo ) encuentra = element;
//       });
//       return encuentra;
//     },

//     busquedaChildren(data, children, nivel){
//       let encuentra = null;
//       data.find( element => {
//         if(element.nivel === nivel){
//           if(element.codigo == children.codigo) encuentra = element; 
//         } else if(element.children) {
//           if(!encuentra) encuentra = this.busquedaChildren(element.children, children, nivel);
//         }
//       });
//       return encuentra;
//     },

//     recursividadChildren(data) {
//       let recurData = [];
//       let contador = 0;
//       if (data) {
//         data.forEach((element) => {
//           if (element.estado) {
//             let value = {};
//             value.id =  element.id;
//             value.codigo =  element.codigo;
//             value.label =  element.label;
//             value.isNew =  element.isNew;
//             value.nivel = Number(element.nivel);
//             value.descripcion =  element.descripcion;
//             value.estado =  element.estado;
//             value.isDisabled =  !element.esSeleccionable;
//             if(element.hasOwnProperty('padre')){
//               value.padre = element.padre;
//             }
//             recurData.push(value);
//             if (element.hasOwnProperty('children')) {
//               recurData[contador].children = this.recursividadChildren(element.children);
//             }
//             contador++;
//           }
//         });
//         return recurData;
//       }
//     },

//     // VALIDACIONES PARA LOS CAMPOS DEL FORMULARIO

//     trimLabel(name) {
//       this.proyecto[name] = this.proyecto[name].trim();
//     },

//     sumarDias(fecha, dias){
//       fecha.setDate(fecha.getDate() + dias);
//       return fecha;
//     },

//     inputFechaInicio(value) {
//       this.disabledFechaFin = {to: this.sumarDias(value, -1)};
//       this.proyecto.fechaInicio = this.sumarDias(value, 1)
//     },

//     inputFechaFin(value) {
//       this.disabledFechaInicio = {from: this.sumarDias(value, 1)};
//       this.proyecto.fechaFin = this.sumarDias(value, -1)
//     },

//     openPopupCentroCosto(){
//       this.company = this.companiaSeleccionada.id;
//       this.popupActiveCentroCosto = true;
//     },

//     openPopupCuentaContable(val){
//       this.company = this.companiaSeleccionada.id;
//       this.popupActiveCuentaContable = true;
//     },

//     selectedCenter(value){
//       this.proyecto.centroCosto = value.id;
//       this.proyecto.centroCostoDescripcion = value.descripcion;
//       this.tmpCentro = value.id;
//       this.mensajeCentroCosto = '';
//       this.popupActiveCentroCosto = false;
//     },

//     selectedAccount(value){
//       this.proyecto.cuentaContable = value.idCuentaContable;
//       this.proyecto.cuentaContableDescripcion = value.cuentaContable;
//       this.tmpCuenta = value.idCuentaContable;
//       this.mensajeCuentaContable = '';
//       this.popupActiveCuentaContable = false;
//     },

//     closePopup() {
//       this.popupActiveCentroCosto = false;
//       this.popupActiveCuentaContable = false;
//     },

//     formato(val, lEnt, lDec) {
//       if (val.length) {
//         let split = val.split('.');
//         if (split.length == 1) {
//           if (split[0].length > lEnt) {
//             this.proyecto.montoAutorizado = this.proyecto.montoAutorizado.substring(0, lEnt);
//           }
//           return;
//         }
//         if (split.length == 2) {
//           if (split[1].length > lDec) {
//             split[1] = split[1].substring(0, lDec);
//             this.proyecto.montoAutorizado = split.join('.');
//           }
//           return;
//         }
//         if (split.length > 2) {
//           split.pop();
//           this.proyecto.montoAutorizado = split.join('.');
//           return;
//         }
//       }
//     },

//     // VALIDACIONES PARA HACER REGISTROS

//     showErrors() {

//       let array = this.$validator.errors.items;
//       if(array.length){
//         let primero = array[0];
//         array.forEach( element => {
//           if( Number(primero.id)>Number(element.id)){
//             primero = element;
//           }
//         });
//         setTimeout(() => { this.$refs[primero.field].focusInput(); }, 500);
//       }

//       let statusRequerido = true;
//       if(!this.tipoProyectoSeleccionado){
//         this.mensajeTipoProyecto = 'El Tipo Proyecto es requerido.';
//         statusRequerido = false;
//       }

//       if( array.length || !statusRequerido ){
//         this.notification(this.$t('Advertencia'), this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'), 'warning',5000,'icon-alert-circle');
//         return true;
//       } else {
//         return false;
//       }

//     },

//     async validarFormulario() {
//       try {
//         let valid = await this.$validator.validateAll("registrarProyecto");
//         if(this.showErrors()) return
//         if (valid) {
//           let mensaje = !this.editar ? this.$t("¿Desea guardar el registro?") : this.$t("¿Desea actualizar el registro?");
//           let status = await swal.fire({ title: this.$t("Mensaje del Sistema"), text: mensaje, showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
//           if (status.value) {
//             let response = this.editar ? await this.actualizar() : await this.registrar();
//             if(response.data.estado){
//               this.responseRequest(response.data);
//               this.cancelar();
//             }else{
//               this.sweetAlert(response.data);
//             }
//           }
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     async registrar() {
//       this.$vs.loading({ type: "point" });
//       try {
//         let post = {};
//         post.compania = this.companiaSeleccionada ? this.companiaSeleccionada.id : "";
//         post.idUnidadNegocio = this.unidadNegocioSeleccionada ? this.unidadNegocioSeleccionada.id : "" ;
//         post.codigo = this.proyecto.codigo;
//         post.descripcion = this.proyecto.descripcion;
//         post.descripcionIngles = this.proyecto.descripcionIngles;
//         post.idResponsable = this.responsableSeleccionado ? this.responsableSeleccionado.id : "" ;
//         post.idTipoProyecto = this.tipoProyectoSeleccionado ? this.tipoProyectoSeleccionado.id : "" ;
//         post.idGrupoProyecto = this.grupoProyectoSeleccionado ? this.grupoProyectoSeleccionado.id : "" ;
//         post.idElementoGasto = this.elementoGastoSeleccionado ? this.elementoGastoSeleccionado.id : "" ;
//         post.idMoneda = this.monedaSeleccionada ? this.monedaSeleccionada.id : "" ;
//         post.idCentroResponsabilidad = this.proyecto.centroCosto;
//         post.idCuentaContable = this.proyecto.cuentaContable;
//         post.fechaInicio = this.proyecto.fechaInicio ? funciones.convertirFecha(this.proyecto.fechaInicio):'';
//         post.fechaFin = this.proyecto.fechaFin ? funciones.convertirFecha(this.proyecto.fechaFin):'';
//         post.fechaAprobacion = this.proyecto.fechaAprobacion ? funciones.convertirFecha(this.proyecto.fechaAprobacion):'';
//         post.montoAutorizado = this.proyecto.montoAutorizado;
//         post.estado = this.proyecto.estado;
//         let { data } = await this.requestApi("insertar_proyecto", post, "POST");
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },
    
//     async actualizar() {
//       this.$vs.loading({ type: "point" });
//       try {
//         let put = {};
//         put.id = this.$route.params.id;
//         put.descripcion = this.proyecto.descripcion;
//         put.descripcionIngles = this.proyecto.descripcionIngles;
//         put.idResponsable = this.responsableSeleccionado ? this.responsableSeleccionado.id : "" ;
//         put.idTipoProyecto = this.tipoProyectoSeleccionado ? this.tipoProyectoSeleccionado.id : "" ;
//         put.idGrupoProyecto = this.grupoProyectoSeleccionado ? this.grupoProyectoSeleccionado.id : "" ;
//         put.idElementoGasto = this.elementoGastoSeleccionado ? this.elementoGastoSeleccionado.id : "" ;
//         put.idMoneda = this.monedaSeleccionada ? this.monedaSeleccionada.id : "" ;
//         put.idCentroResponsabilidad = this.proyecto.centroCosto;
//         put.idCuentaContable = this.proyecto.cuentaContable;
//         put.fechaInicio = this.proyecto.fechaInicio ? funciones.convertirFecha(this.proyecto.fechaInicio):'';
//         put.fechaFin = this.proyecto.fechaFin ? funciones.convertirFecha(this.proyecto.fechaFin):'';
//         put.fechaAprobacion = this.proyecto.fechaAprobacion ? funciones.convertirFecha(this.proyecto.fechaAprobacion):'';
//         put.montoAutorizado = this.proyecto.montoAutorizado;
//         put.estado = this.proyecto.estado;
//         let { data } = await this.requestApi("actualizar_proyecto", put, "PUT");
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       } finally {
//         this.$vs.loading.close();
//       }
//     },
    
//     async verProyecto(id) {
//       try {
//         if(id != null && !this.nuevo){
//           let { data } = await this.requestApi(`ver_proyecto?id=${id}`);
//           let response = data.data;
//           if (response.estado) {
//             if(this.editar || this.ver){
//               this.companiaSeleccionada = response.data[0].idCompania ? {
//                 id: response.data[0].idCompania,
//                 label: response.data[0].companiaDescripcion,
//                 codigo: response.data[0].idCompania,
//                 estado: response.data[0].companiaEstado,
//               } : '';
//             }
//             if(this.editar){
//               if(response.data[0].idCompania != localStorage.getItem('compania-actual')) this.cancelar();
//             }
//             this.unidadNegocioSeleccionada = response.data[0].unidadNegocioId ? {
//               id: response.data[0].unidadNegocioId,
//               label: response.data[0].unidadNegocioDescripcion,
//               codigo: response.data[0].unidadNegocioId,
//               estado: response.data[0].unidadNegocioEstado,
//             } : '';
//             this.responsableSeleccionado = response.data[0].responsableId ? {
//               id: response.data[0].responsableId,
//               label: response.data[0].responsableDescripcion,
//               codigo: response.data[0].responsableId,
//               estado: response.data[0].responsableEstado,
//             } : '';
//             this.tipoProyectoSeleccionado = response.data[0].tipoProyectoId ? {
//               id: response.data[0].tipoProyectoId,
//               label: response.data[0].tipoProyectoDescripcion,
//               codigo: response.data[0].tipoProyectoCodigo,
//               estado: response.data[0].tipoProyectoEstado,
//             } : '';
//             this.grupoProyectoSeleccionado = response.data[0].grupoProyecto.id ? response.data[0].grupoProyecto : null ;
//             this.elementoGastoSeleccionado = response.data[0].elementoGastoId ? {
//               id: response.data[0].elementoGastoId,
//               label: response.data[0].elementoGastoDescripcion,
//               codigo: response.data[0].elementoGastoCodigo,
//               estado: response.data[0].elementoGastoEstado,
//             } : '';
//             this.monedaSeleccionada = response.data[0].monedaId ? {
//               id: response.data[0].monedaId,
//               label: response.data[0].monedaDescripcion,
//               codigo: response.data[0].monedaId,
//               estado: response.data[0].monedaEstado,
//             } : '';
//             this.disabledMoneda = response.data[0].tienePresupuesto;
//             this.proyecto.id = response.data[0].id;
//             this.proyecto.codigo = response.data[0].codigo;
//             this.proyecto.descripcion = response.data[0].descripcion;
//             this.proyecto.descripcionIngles = response.data[0].descripcionIngles;
//             this.proyecto.centroCosto = response.data[0].centroResponsabilidadId;
//             this.proyecto.centroCostoDescripcion = response.data[0].centroResponsabilidadDescripcion;
//             this.proyecto.centroCostoEstado = response.data[0].centroResponsabilidadEstado;
//             this.proyecto.cuentaContable = response.data[0].cuentaContableId;
//             this.proyecto.cuentaContableDescripcion = response.data[0].cuentaContableDescripcion;
//             this.proyecto.cuentaContableEstado = response.data[0].cuentaContableEstado;
//             this.proyecto.fechaInicio = response.data[0].fechaInicio ? funciones.obtenerFecha(response.data[0].fechaInicio):'';
//             this.inputFechaInicio(this.proyecto.fechaInicio);
//             this.proyecto.fechaFin = response.data[0].fechaFin ? funciones.obtenerFecha(response.data[0].fechaFin):'';
//             this.inputFechaFin(this.proyecto.fechaFin);
//             this.proyecto.fechaAprobacion = response.data[0].fechaAprobacion ? funciones.obtenerFecha(response.data[0].fechaAprobacion):'';
//             this.proyecto.montoAutorizado = response.data[0].montoAutorizado;
//             this.proyecto.estado = response.data[0].estado;
//             this.footer = response.data[0].footer;
//             if(!this.ver){
//               await this.verificarCentroCosto(this.proyecto.centroCosto);
//               await this.verificarCuentaContable(this.proyecto.cuentaContable);
//               this.cargarGrupoProyectoAux();
//             }
//           } else this.cancelar();
//         }
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     funcionMascara(numero, token) {
//       return funciones.longitudMaskNumero(numero, token);
//     },

//     cancelar() {
//       this.$router.push(`/proyecto`);
//     },

//     async validarRuta(nombre) {
//       switch (nombre) {
//         case "proyecto-agregar":
//           this.titulo = 'Nuevo Proyecto';
//           this.nuevo = true;
//           return
//         case "proyecto-modificar":
//           this.titulo = 'Modificar Proyecto';
//           this.editar = true;
//           return
//         case "proyecto-ver":
//           this.titulo = 'Proyecto [Modo Vista]';
//           this.ver = true;
//           return
//       }
//     },

//     async validarParametro(){
//       try {
//         let {CTPROYECTOREL,SUPCECO,SUPCTACTB,DIGULNIVPC} = await this.obtenerParametros(['CTPROYECTOREL','SUPCECO','SUPCTACTB','DIGULNIVPC']);
//         this.proyectoRelacionado = CTPROYECTOREL ? CTPROYECTOREL.parametroTexto : '';
//         this.digitosCuenta = parseFloat(DIGULNIVPC ? DIGULNIVPC.parametroNumero : 0);
//       } catch (error) {
//         throw new Error(error);
//       }
//     },

//     activarFoco(){
//       if(this.nuevo) setTimeout(() => { this.$refs.codigo.focusInput(); }, 500);
//       if(this.editar) setTimeout(() => { this.$refs.descripcion.focusInput(); }, 500);
//     },

//   },

//   async mounted() {
//     try {
//       this.$vs.loading({ type: "point" });
//       await this.validarRuta(this.$route.name);
//       await this.formularioParametros(['OB-CTPROYECTOREL','OP-SUPCECO','OP-SUPCTACTB','OB-DIGULNIVPC']);
//       await this.validarParametro();
//       await this.cargarCompania();
//       await this.cargarUnidadNegocio();
//       await this.cargarGrupoProyecto();
//       await this.verProyecto(this.$route.params.id ? this.$route.params.id : null);
//       await this.cargarResponsable();
//       await this.cargarTipoProyecto();
//       await this.cargarElementoGasto();
//       await this.cargarMoneda();
//       this.activarFoco();
//       this.isMounted = true;
//     } catch (error) {
//       throw new Error(error);
//     } finally {
//       this.$vs.loading.close();
//     }
//   },

//   updated() {
//     if (this.$i18n.locale == 'es') Validator.localize(this.$i18n.locale, dictEs);
//     else Validator.localize(this.$i18n.locale, dictEn);
//   },

// };

</script>

<style>
/* .datapicker_input input {
  width: 100%;
} */
</style>