<template lang="pug">
  div#parentx-inversion
    div
      cabecera(:titulo="$t('INVERSIONES')" @nuevo='nuevo' @exportar="exportar" @aceptar="validar" @listarTodo="listarTodo" @filtrar="abrirFiltro" :titleNuevo="'Confirmar Pago'" :titleAceptar="'Revisar'" :btnListarTodo="true" :btnFiltrar="true" :btnNuevo="verBotonConfirmarPagoHeader" :btnAceptar="verBotonRevisarHeader" )      
      popup-filtrar-inversionista(:popupVerFiltroInversionistaActive="popupVerFiltroInversionistaActive" @selectedAccount="selectedAccount" @closePopup="closePopup" )
      popup-ver-inversion(:PopupVerInversion="PopupVerInversion" @closePopupVer="closePopupVer" @btnSiguiente="btnSiguienteRevisar" :tipo="tipoInversion" :dataInversion="inversion" :footer="footer" :listaInversiones="listaInversiones")
      popup-confirmar-pago(:popupConfirmarPagoActive="popupConfirmarPago" @closePopup="closePopup" @btnSiguiente="btnSiguiente" :dataPago="pago" :listaPagos="listaPagos")
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" @remove='removeChip')
        vx-filter(ref="filterInversion" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-inversion" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" @evntPopUp="evntPopup")           
        vx-table.style-vxtable(multiple search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" v-model="seleccionados" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(colspan="1" rowspan="2" center min-width="160") {{$t('Acciones')}}
            vx-th.uppercase(colspan="3" rowspan="1" center min-width="500") {{$t('Subasta')}}
            vx-th.uppercase(colspan="5" rowspan="1" center min-width="500") {{$t('Inversor')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="monto_inversion" min-width="150") {{$t('Monto Inversión')}}
            vx-th.uppercase(colspan="1" rowspan="2" min-width="150") {{$t('Es Ganadora')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="tea_minima" min-width="150") {{$t('TEA Mínima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="tea_maxima" min-width="150") {{$t('TEA Máxima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="tem_minima" min-width="150") {{$t('TEM Mínima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="tem_maxima" min-width="150") {{$t('TEM Máxima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ganancia_minima" min-width="150") {{$t('Ganancia Mínima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ganancia_maxima" min-width="150") {{$t('Ganancia Máxima')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ganancia_final" min-width="150") {{$t('Ganancia Final')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="fecha_inversion" min-width="150") {{$t('Fecha de Inversión')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="descripcion_estado_inversion" min-width="150") {{$t('Estado')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ultima_fecha_modificacion_transaccion" min-width="150") {{$t('Última Fecha de Modificación')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="usuario_backoffice_relacionado_transaccion" min-width="150") {{$t('Usuario Back Office Relacionado')}}
          template(slot="mhead")
            tr               
              vx-th.uppercase( sort-key="subasta_codigo" min-width="150") {{$t('Código')}}
              vx-th.uppercase( sort-key="subasta_empresa" min-width="200") {{$t('Empresa')}}
              vx-th.uppercase( sort-key="subasta_monto_total" min-width="150") {{$t('Monto Total')}}
              vx-th.uppercase( sort-key="inversor_tipo_documento" min-width="150") {{$t('Tipo Documento')}}
              vx-th.uppercase( sort-key="inversor_numero_documento" min-width="150") {{$t('Número Documento')}}
              vx-th.uppercase( sort-key="inversor_nombres" min-width="150") {{$t('Nombres')}}
              vx-th.uppercase( sort-key="inversor_apellido_paterno" min-width="150") {{$t('Apellido Paterno')}}
              vx-th.uppercase( sort-key="inversor_apellido_materno" min-width="150") {{$t('Apellido Materno')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr( :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.inversion_id)"  :title="$t('Ver')" icon='EyeIcon' )
                    feather-icon.style-icon.p-0(v-if='tr.boton_revisar' @click.stop="revisar(tr.inversion_id)"  :title="$t('Revisar')" icon='UserCheckIcon')
                    feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                    feather-icon.style-icon.p-0(v-if='tr.boton_confirmar_pago' @click.stop="confirmarPago(tr.inversion_id)"  :title="$t('Confirmar Pago')" icon='DollarSignIcon')
                    feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                vx-td.text-left(:data="tr.subasta_codigo") {{tr.subasta_codigo}} 
                vx-td.text-left(:data="tr.subasta_empresa") {{tr.subasta_empresa}}
                vx-td.text-right(:data="tr.subasta_monto_total") {{tr.subasta_monto_total}}
                vx-td.text-left(:data="tr.inversor_tipo_documento") {{tr.inversor_tipo_documento}}
                vx-td.text-left(:data="tr.inversor_numero_documento") {{tr.inversor_numero_documento}}
                vx-td.text-left(:data="tr.inversor_nombres") {{tr.inversor_nombres}}
                vx-td.text-left(:data="tr.inversor_apellido_paterno") {{tr.inversor_apellido_paterno}}
                vx-td.text-left(:data="tr.inversor_apellido_materno") {{tr.inversor_apellido_materno}}
                vx-td.text-right(:data="tr.monto_inversion") {{tr.moneda}} {{tr.monto_inversion}}
                vx-td.text-left(:data="tr.es_ganadora") {{tr.es_ganadora}}
                vx-td.text-right(:data="tr.tea_minima") {{tr.tea_minima}}%
                vx-td.text-right(:data="tr.tea_maxima") {{tr.tea_maxima}}%
                vx-td.text-right(:data="tr.tem_minima") {{tr.tem_minima}}%
                vx-td.text-right(:data="tr.tem_maxima") {{tr.tem_maxima}}%
                vx-td.text-right(:data="tr.ganancia_minima") {{tr.moneda}} {{tr.ganancia_minima}}
                vx-td.text-right(:data="tr.ganancia_maxima") {{tr.moneda}} {{tr.ganancia_maxima}}
                vx-td.text-right(:data="tr.ganancia_final") {{tr.moneda}} {{tr.ganancia_final}}
                vx-td.text-center(:data="tr.fecha_inversion") {{convertirDia(tr.fecha_inversion)}}
                vx-td.text-center(:data="tr.descripcion_estado_inversion") {{tr.descripcion_estado_inversion}}
                vx-td.text-center(:data="tr.ultima_fecha_modificacion_transaccion") {{convertirDia(tr.ultima_fecha_modificacion_transaccion)}}
                vx-td.text-left(:data="tr.usuario_backoffice_relacionado_transaccion") {{tr.usuario_backoffice_relacionado_transaccion}}      
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import PopupFiltrarInversionista from "@/project/views/inversionista/inversion/popup/PopupFiltrarInversion.vue";
import PopupVerInversion from "@/project/views/inversionista/inversion/popup/PopupVerInversion.vue";
import PopupConfirmarPago from "@/project/views/inversionista/inversion/popup/PopupConfirmarPago.vue";

export default {
  name: 'Inversion',
  mixins: [request],
  components: {
    Cabecera,
    PopupFiltrarInversionista,
    PopupVerInversion,
    PopupConfirmarPago
  },

  computed: {
    verBotonConfirmarPagoHeader(){
      let mostrar = false;
      if(this.isMounted){
        if(this.seleccionados.length){
          let temp = this.seleccionados.filter((e) => e.boton_confirmar_pago == true);
          if(temp.length) mostrar = true;
        }
      }
      return mostrar
    },
    verBotonRevisarHeader(){
      let mostrar = false;
      if(this.isMounted){
        if(this.seleccionados.length){
          let temp = this.seleccionados.filter((e) => e.boton_revisar == true);
          if(temp.length) mostrar = true;
        }
      }
      return mostrar
    },
    listado() {
      return this.listarInversiones;
    }
  },

  watch: {
    '$route.name'(){
      location.reload()
    },
  },

  data() {
    return {
      isMounted: false,
      esSubasta: '',
      listarInversiones: [],
      filterActive: false,
      ocultarChip: false,
      popupVerFiltroInversionistaActive: false,
      PopupVerInversion: false,
      popupConfirmarPago:false,
      tipoInversion:'',
      inversion:{},
      pago:{},
      seleccionados: [],
      listaPagos:[],
      listaInversiones:[],
      footer:[],
      filtros: [
        {
          type: 'criterio',
          title: 'CRITERIO DE BÚSQUEDA',
          alias: 'criterio',
          closable: false,
          expand: false,
          action: true,
          add: true,
          options: {
            model: '',
            options: [             
              { id: 'codigo', label: 'CÓDIGO (SUBASTA)', type: 'text', pattern: ["[0-9a-zA-Z,]"] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type:  'popUp',
          title:  'INVERSIONISTA',
          alias:  'popupInversionista',
          closable:  false,
          expand:  false,
          action:  false,
          hidden:  false,
          model:  '',
          options: {
            model:  "",
            options: [
              {
                title: "INVERSIONISTA",
                abbr:  "INVERSIONISTA",
                alias: "inversionista",
                model:  '',
                hidden:  false,
                disabled:  true,
                placeholder:  '',
                tipo:'texto',
              }
            ]
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'MONEDA', // este es el título único en el objeto para de la seccion del componente
          alias:  'moneda', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable:  false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand:  false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action:  false, // esta key representa si tiene una accion
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model:  '', // esta key representa el por defecto del select al mostrarse en los chips y en la descripcion de la seccion del componente.
            values:  [], // esta key representa el array de objetos por defecto o que contiene un select por ejemplo la posicion, [{id:  'usuario', label:  'USUARIO' },{ id:  'posicion', label:  'POSICION' }], , pueden ser agignadas desde una consulta a base.
            options: [], // esta key son las opciones del select, pueden ser agignadas desde una consulta a base.
            searchable:  false, // esta key es el estado de busqueda habilitado o deshabilitado que debe de tener el select.
            filterable:  false,// esta key es el estado de filtro habilitado o deshabilitado que debe de tener el select.
            disabled:  false, // esta key es el estado de habilitado o deshabilitado que debe de tener el select.
            placeholder:  "Seleccione una Moneda", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type: 'numberRange',
          title: 'MONTO INVERSIÓN',
          alias: 'montoInversion',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: 0,
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA INVERSIÓN',
          alias: 'fechaInversion',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                value: null,
                disabled: false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder: 'dd/mm/yyyy'
              },  
              {
                title:  "HASTA",
                model:  '',
                value: [],
                disabled:  false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder:  'dd/mm/yyyy'
              }
            ]
          }
        },
        {
          type: 'radio', 
          title: 'GANADORAS', 
          alias: 'ganadoras', 
          closable: false, 
          expand: false, 
          action: false, 
          hidden: false, 
          options: {
            model: '', 
            value: '', 
            count: [
              {
                value: 'siGanador', 
                label: 'SI' 
              },
              {
                value: 'noGanador', 
                label: 'NO' 
              },
              {
                value: 'esperaGanador', 
                label: 'EN ESPERA' 
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'TEA MÍNIMA',
          alias: 'teaMinima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'TEA MÁXIMA',
          alias: 'teaMaxima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'TEM MÍNIMA',
          alias: 'temMinima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'TEM MÁXIMA',
          alias: 'temMaxima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'GANANCIA MÍNIMA',
          alias: 'gananciaMinima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'GANANCIA MÁXIMA',
          alias: 'gananciaMaxima',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'GANANCIA FINAL',
          alias: 'gananciaFinal',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                characters: 12,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 12,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'dateRange',
          title: 'ÚLITMA FECHA DE MODIFICACIÓN',
          alias: 'ultimaFecha',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title:  "DESDE",
                model: '',
                value: null,
                disabled: false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder: 'dd/mm/yyyy'
              },  
              {
                title:  "HASTA",
                model:  '',
                value: [],
                disabled:  false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder:  'dd/mm/yyyy'
              }
            ]
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'ESTADO', // este es el título único en el objeto para de la seccion del componente
          alias:  'estado', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable:  false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand:  false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action:  false, // esta key representa si tiene una accion
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model:  '', // esta key representa el por defecto del select al mostrarse en los chips y en la descripcion de la seccion del componente.
            values:  [], // esta key representa el array de objetos por defecto o que contiene un select por ejemplo la posicion, [{id:  'usuario', label:  'USUARIO' },{ id:  'posicion', label:  'POSICION' }], , pueden ser agignadas desde una consulta a base.
            options: [], // esta key son las opciones del select, pueden ser agignadas desde una consulta a base.
            searchable:  false, // esta key es el estado de busqueda habilitado o deshabilitado que debe de tener el select.
            filterable:  false,// esta key es el estado de filtro habilitado o deshabilitado que debe de tener el select.
            disabled:  false, // esta key es el estado de habilitado o deshabilitado que debe de tener el select.
            placeholder:  "Seleccione una Estado", // esta key representa el placeholder del select, es personalizable. 
          }
        },
      ],

    };
  },

  methods: {

    async btnSiguienteRevisar(listado){
      this.seleccionados = listado;
      if (this.seleccionados.length > 0) {
        await this.validar();
      }else return
    }, 

    async validar(){
      this.seleccionados = this.seleccionados.filter((e) => e.boton_revisar == true);
      this.tipoInversion = '';
      this.PopupVerInversion = false;
      let arrayID = this.seleccionados.map((e) => {
        return {
          inversion_id: e.inversion_id,
          subasta_id: e.subasta_id,
          boton_revisar: e.boton_revisar
        }
      });      
      let response = await this.funcionRevisar(arrayID[0].inversion_id);
      if (response.estado) {          
        this.inversion = response.data[0]; 
        this.inversion.monto_inversion = this.inversion.moneda_subasta + " " + this.inversion.monto_inversion;
        this.inversion.tea_minima = this.inversion.tea_minima + "%";
        this.inversion.tem_minima = this.inversion.tem_minima + "%";
        this.inversion.ganancia_minima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_minima;
        this.inversion.tea_maxima = this.inversion.tea_maxima + "%";
        this.inversion.tem_maxima = this.inversion.tem_maxima + "%";
        this.inversion.ganancia_maxima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_maxima;
        this.inversion.ganancia_final = this.inversion.moneda_subasta + " " + this.inversion.ganancia_final;
        this.inversion.ir_inversion = this.inversion.ir_inversion + "%";
        this.footer = [
          { icon:'ColumnsIcon', key:'IP de Registro', value:this.inversion.direccion_ip_registro },
          { icon:'UserIcon', key:'Último Revisor', value:this.inversion.ultimo_revisor }
        ];
        this.listaInversiones = arrayID;
        this.tipoInversion = 'revisar';
        this.PopupVerInversion = true;
      } else {
        this.inversion = [];
      }
    },

    async btnSiguiente(listado){
      this.seleccionados = listado;
      if (this.seleccionados.length > 0) {
        await this.nuevo();
      }else return
    },    

    async nuevo(){
      this.seleccionados = this.seleccionados.filter((e) => e.boton_confirmar_pago == true);
      this.popupConfirmarPago = false;
      let arrayID = this.seleccionados.map((e) => {
        return {
          inversion_id: e.inversion_id,
          boton_confirmar_pago: e.boton_confirmar_pago
        }
      });
      let response = await this.validacionConfirmarPago(arrayID[0].inversion_id);
      if (!response.estado) {
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: response.mensaje,
          confirmButtonText: this.$t('Aceptar'),
        });
        if (status.value) {
          this.seleccionados.shift();
          if (this.seleccionados.length > 0) {
            this.nuevo();
          }else return
        }
      }else{  
        let response = await this.completarPagoInversor(arrayID[0].inversion_id);
        if (response.estado) {
          this.pago = response.data[0];
          this.pago.mostrarMonto = this.pago.codigo_moneda_subasta + " " + this.pago.monto;
          this.pago.mostrarMoneda = this.pago.moneda_codigo_cuenta_destino + " " + this.pago.moneda_descripcion_cuenta_destino;
          this.listaPagos = arrayID;      
          this.popupConfirmarPago = true;
        }else{
          let tmp = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: response.mensaje,
            confirmButtonText: this.$t('Aceptar'),
          });
          if (tmp.value) {            
            this.seleccionados.shift();
            if (this.seleccionados.length > 0) {
              this.nuevo();
            }else return
          }
        }
      }      
    },

    async ver(id){
      try { 
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_inversion_bo?id=${id}`);   
        let response = data.data;   
        if (response.estado) {          
          this.inversion = response.data[0];
          this.inversion.monto_inversion = this.inversion.moneda_subasta + " " + this.inversion.monto_inversion;
          this.inversion.tea_minima = this.inversion.tea_minima + "%";
          this.inversion.tem_minima = this.inversion.tem_minima + "%";
          this.inversion.ganancia_minima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_minima;
          this.inversion.tea_maxima = this.inversion.tea_maxima + "%";
          this.inversion.tem_maxima = this.inversion.tem_maxima + "%";
          this.inversion.ganancia_maxima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_maxima;
          this.inversion.ganancia_final = this.inversion.moneda_subasta + " " + this.inversion.ganancia_final;
          this.inversion.ir_inversion = this.inversion.ir_inversion + "%";
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.inversion.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.inversion.footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:this.inversion.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:this.inversion.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Usuario Back Office Relacionado', value:this.inversion.footer_usuariobo_actualizacion }
          ];  
          this.PopupVerInversion = true;
        } else {
          this.inversion = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },

    async funcionRevisar(id){
      try {
        this.$vs.loading({ type: 'point' });  
        let { data } = await this.requestApi(`revisar_inversion_bo?id=${id}`);   
        return data.data;
      } catch (error) {
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },

    async revisar(id){
      let response = await this.funcionRevisar(id);
      if (response.estado) {          
        this.inversion = response.data[0]; 
        this.inversion.monto_inversion = this.inversion.moneda_subasta + " " + this.inversion.monto_inversion;
        this.inversion.tea_minima = this.inversion.tea_minima + "%";
        this.inversion.tem_minima = this.inversion.tem_minima + "%";
        this.inversion.ganancia_minima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_minima;
        this.inversion.tea_maxima = this.inversion.tea_maxima + "%";
        this.inversion.tem_maxima = this.inversion.tem_maxima + "%";
        this.inversion.ganancia_maxima = this.inversion.moneda_subasta + " " + this.inversion.ganancia_maxima;
        this.inversion.ganancia_final = this.inversion.moneda_subasta + " " + this.inversion.ganancia_final;
        this.inversion.ir_inversion = this.inversion.ir_inversion + "%";
        this.footer = [
          { icon:'ColumnsIcon', key:'IP de Registro', value:this.inversion.direccion_ip_registro },
          { icon:'UserIcon', key:'Último Revisor', value:this.inversion.ultimo_revisor }
        ];
        this.listaInversiones = [];
        this.tipoInversion = 'revisar';
        this.PopupVerInversion = true;
      } else {
        this.inversion = [];
      }
    },

    async confirmarPago(id){
      let response = await this.validacionConfirmarPago(id);
      if (!response.estado) {
        let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: response.mensaje,
            confirmButtonText: this.$t('Aceptar'),
          });
      }else{  
        let response = await this.completarPagoInversor(id);       
        if (response.estado) {
          this.pago = response.data[0];
          this.pago.mostrarMonto = this.pago.codigo_moneda_subasta + " " + this.pago.monto;
          this.pago.mostrarMoneda = this.pago.moneda_codigo_cuenta_destino + " " + this.pago.moneda_descripcion_cuenta_destino;
          this.listaPagos = [];
          this.popupConfirmarPago = true;          
        }else{
          this.sweetAlert(response);
        }
      }
    },

    async validacionConfirmarPago(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`validar_confirmar_pago?id=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async completarPagoInversor(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`completar_pago_inversor?id=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    //Cargar Filtros
    async cargarMoneda() {
      try {
        let { data } = await this.requestApi('cargar_moneda_inversion_bo');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
            return {
              id: e.id,
              label: e.descripcion+'('+e.codigo+')',
              object: {
                codigo: e.descripcion+'('+e.codigo+')',
                estado: e.estado,
              }
            };            
          }); 
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'moneda', response);
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    async cargarEstado(codigo = null) { 
      try {
        let { data } = await this.requestApi('cargar_estado_inversion_bo');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
            return {
              id: e.id_estadoinversion,
              label: e.descripcion_inversion,
              object: {
                codigo: e.codigo_estadoinversion,
                descripcion: e.descripcion_inversion,
                estado: e.estado_inversion,
              }
            };            
          }); 
          if( codigo == null ){
            this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response);
          }else{
            let filter = response.find( element => element.object.codigo == codigo );
            this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response, filter);
          }
          
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    //Metodos de Filtros

    evntPopup(obj){
      if(!obj) return;
      this.popupVerFiltroInversionistaActive = true;
    },

    returnValPopup(value, type){
      let tmp='';
      value.forEach(element=>{
        if(type=='model') tmp = tmp + (tmp.length>0 ? ', '+element.nombres:element.nombres);
        if(type=='value') tmp = tmp + (tmp.length>0 ? ','+element.id:element.id);
      });
      return tmp
    },

    selectedAccount(listado){
      this.popupVerFiltroInversionistaActive = false;
      this.$refs.filterInversion.reactChangePopup('popUp', 'popupInversionista', 'inversionista', this.returnValPopup(listado,'model'), this.returnValPopup(listado,'value'));
    },

    async closePopup() {
       this.popupVerFiltroInversionistaActive = false;
       this.PopupVerInversion = false;
       this.popupConfirmarPago = false;
       this.pago = {};
       this.seleccionados = [];
       this.listaPagos = [];
       await this.listar();
    },

    async closePopupVer(bandera) {
      this.popupVerFiltroInversionistaActive = false;
      this.PopupVerInversion = false;
      this.popupConfirmarPago = false;
      this.tipoInversion='';
      this.inversion={};
      this.footer=[];
      this.listaInversiones =[];
      if (bandera) {        
        await this.listar();
      }
    },  

    //Metodos de Registro

    async listar() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let { data } = await this.requestApi(`${this.esSubasta?'listar_inversion_subasta_bo':'listar_inversion_bo'}?id_subasta=&codigo_subasta=${this.esSubasta ? this.esSubasta:obj.criterio0.codigo}&id_usuario=${obj.inversionista}&moneda=${obj.moneda.id}&monto_desde=${obj.montoInversion.desde}&monto_hasta=${obj.montoInversion.hasta}&id_master_detalle_estado=${obj.estado.id}&fecha_inversion_desde=${obj.fechaInversion.desde}&fecha_inversion_hasta=${obj.fechaInversion.hasta}&es_ganador_flag=${obj.ganadoras == 'siGanador' ? 'SI' : obj.ganadoras == 'noGanador' ? 'NO' : obj.ganadoras == 'esperaGanador' ? 'ESPERA' : ''}&tasa_retorno_anual_minima_desde=${obj.teaMinima.desde}&tasa_retorno_anual_minima_hasta=${obj.teaMinima.hasta}&tasa_retorno_anual_maxima_desde=${obj.teaMaxima.desde}&tasa_retorno_anual_maxima_hasta=${obj.teaMaxima.hasta}&tasa_retorno_mensual_minima_desde=${obj.temMinima.desde}&tasa_retorno_mensual_minima_hasta=${obj.temMinima.hasta}&tasa_retorno_mensual_maxima_desde=${obj.temMaxima.desde}&tasa_retorno_mensual_maxima_hasta=${obj.temMaxima.hasta}&ganancia_minima_desde=${obj.gananciaMinima.desde}&ganancia_minima_hasta=${obj.gananciaMinima.hasta}&ganancia_maxima_desde=${obj.gananciaMaxima.desde}&ganancia_maxima_hasta=${obj.gananciaMaxima.hasta}&ganancia_final_desde=${obj.gananciaFinal.desde}&ganancia_final_hasta=${obj.gananciaFinal.hasta}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {          
          this.listarInversiones = response.data;
        } else {
          this.listarInversiones = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    calcularMonto(){
      let total = 0;
      this.listarInversiones.map( (element)  => {
        total += element.monto_inversion; 
        let fiticio = 0;

        if( total > 1000 && fiticio == 0 ){
          fiticio = 1;
        }
        let flag = fiticio == 1 ? true : false;
        element.status = total <= 1000 || flag ? true : false;  
      });      
    },
    
    async exportar(){
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);            
        await this.funcExportar(`exportar_inversion_bo?id_subasta=&codigo_subasta=${obj.criterio0.codigo}&id_usuario=${obj.inversionista}&moneda=${obj.moneda.id}&monto_desde=${obj.montoInversion.desde}&monto_hasta=${obj.montoInversion.hasta}&id_master_detalle_estado=${obj.estado.id}&fecha_inversion_desde=${obj.fechaInversion.desde}&fecha_inversion_hasta=${obj.fechaInversion.hasta}&es_ganador_flag=${obj.ganadoras == 'siGanador' ? true : obj.ganadoras == 'noGanador' ? false : obj.ganadoras == 'esperaGanador' ? null : ''}&tasa_retorno_anual_minima_desde=${obj.teaMinima.desde}&tasa_retorno_anual_minima_hasta=${obj.teaMinima.hasta}&tasa_retorno_anual_maxima_desde=${obj.teaMaxima.desde}&tasa_retorno_anual_maxima_hasta=${obj.teaMaxima.hasta}&tasa_retorno_mensual_minima_desde=${obj.temMinima.desde}&tasa_retorno_mensual_minima_hasta=${obj.temMinima.hasta}&tasa_retorno_mensual_maxima_desde=${obj.temMaxima.desde}&tasa_retorno_mensual_maxima_hasta=${obj.temMaxima.hasta}&ganancia_minima_desde=${obj.gananciaMinima.desde}&ganancia_minima_hasta=${obj.gananciaMinima.hasta}&ganancia_maxima_desde=${obj.gananciaMaxima.desde}&ganancia_maxima_hasta=${obj.gananciaMaxima.hasta}&ganancia_final_desde=${obj.gananciaFinal.desde}&ganancia_final_hasta=${obj.gananciaFinal.hasta}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&token=`)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    //Metodos Generales

    convertirDia(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      let dia = fecha.split(", ");
      return dia[0];
    },

    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async confirmFilter(filters) {
      this.filterActive = false
      this.filtros = filters
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async  removeChip(filter) {
      this.filtros  =  filter
      await this.listar()
    },

    closeFilter() {
      this.filterActive = false;
    },        

    abrirFiltro() {
     this.filterActive = true;
    },

    async cargarFiltros(){
      if(this.$route.name=='inversionista-inversion-ver-inversiones' && this.$route.params.id){
        this.$refs.filterInversion.reactChangePopup('popUp', 'popupInversionista', 'inversionista', this.$route.params.nombres, this.$route.params.id, false );
      }
      if(this.$route.name=='inversionista-inversion-ver-subasta' && this.$route.params.id){
        this.esSubasta = this.$route.params.id;
        let defecto = this.filtros[0].options.options.find(element =>{ return (element.id == 'codigo') });
        this.filtros[0].options.criterio_multiple[0].selectChild = defecto ? defecto : '';
        this.filtros.map( e => {
          if ( e.alias == 'criterio' ){
            const { placeholder , options } = e.options;
            const [{ label }] = options;
            const [ selectChild ] = options;
            const model = `${label}: ${this.esSubasta}`;
            e.expand = false;
            e.disabledSection = true;
            e.options.disabled = true;
            e.options.model = model;
            e.options.criterio_multiple = e.options.criterio_multiple.map((e) => {
              e.add = true;
              e.index = 0;
              e.inputChild = this.esSubasta;
              e.modelChild = "";
              e.model = model;
              e.options = options;
              e.placeholder = placeholder;
              e.radio = "and-0";
              e.radio_and = "and-0";
              e.radio_or = "or-0";
              e.selectChild = selectChild;
              e.showInput = false;
              e.visible = true;
              return e;         
            });
          }
        });
      }
      let fecha = new Date();
      this.filtros.map( e => {
        if (e.alias == 'fechaInversion')  {
          e.options.options[1].value = fecha;
          e.options.options[1].model = helperFunctions.convertirFecha(fecha);
          e.options.model = `DESDE --/--/-- - HASTA ${ helperFunctions.convertirFecha(fecha)}`;
        }
        if (e.alias == 'montoInversion' || e.alias == "teaMinima" || e.alias == "teaMaxima" || e.alias == "temMinima" || e.alias == "temMaxima" || e.alias == "gananciaMinima" || e.alias == "gananciaMaxima" || e.alias == "gananciaFinal")  {
          e.options.options[0].model = '0';
          e.options.model = `DESDE 0 - HASTA ...`;
        }
      });
    }
  },
  
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.cargarMoneda(); 
      await this.cargarEstado();
      this.filtros = helperFunctions.loaderFilters(this.filtros);
      await this.cargarFiltros();
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  }
  
};
</script>