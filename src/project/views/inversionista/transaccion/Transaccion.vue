<template lang="pug">
  div#parentx-transaccion-cuenta
    cabecera( :titulo='$t("TRANSACCIONES")' @exportar='exportar' :btnNuevo="false" @listarTodo='listarTodo' @filtrar='abrirFiltro')
    vx-card.card-sticky
      vx-filter-chip.mb-5( title='Filtros' color='#e1dffc' colorBackground='#f5f8ff' :filtersParent='filtros' :hidden='ocultarChip')
      vx-filter( ref='filterTransaccion' :filtersParent='filtros' :positionRight='true' title='FILTRAR POR' parent='#parentx-transaccion-cuenta' color='primary' :active='filterActive' @closeFilter='closeFilter' @confirmFilter='confirmFilter' @evntPopUp="evntPopup")
      vx-table.style-vxtable( search search-sticky pagination rowsPage :arrayRows='[25, 50, 100]' max-tems='5' :data='listado' :no-data-text='$t("No se encontraron registros")')
        template(slot='thead')
          vx-th.uppercase( colspan="1" rowspan="2" min-width='100' center) {{ $t("Acciones") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='tipo_transaccion_descripcion' min-width='180') {{ $t("Tipo de Transacción") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='moneda_descripcion' min-width='180') {{ $t("Moneda") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='transaccion_monto' min-width='140') {{ $t("Monto") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='cuenta_fintech_numerocuenta' min-width='160') {{ $t("Cuenta Progrexa Relacionada") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='cuenta_bancaria_numerocuenta' min-width='160') {{ $t("Cuenta Bancaria Relacionada") }}
          vx-th.uppercase( colspan="5" rowspan="1" min-width='860' center) {{ $t("Inversionista") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='estado_transaccion_descripcion' min-width='150') {{ $t("Estado") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='transaccion_fecharegistro' min-width='150') {{ $t("Fecha de Registro") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='transaccion_fechaactualizacion' min-width='150') {{ $t("Última Fecha de Modificación") }}
          vx-th.uppercase( colspan="1" rowspan="2" sort-key='transaccion_usuarioborelacionado' min-width='180') {{ $t("Usuario Back Office Relacionado") }}
        template(slot="mhead")
          tr
            vx-th.uppercase( sort-key="inversionista_tipo_documento_descripcion" min-width="180") {{$t('Tipo Documento')}}
            vx-th.uppercase( sort-key="inversionista_numerodocumento" min-width="140") {{$t('Número Documento')}}
            vx-th.uppercase( sort-key="inversionista_nombres" min-width="180") {{$t('Nombres ')}}
            vx-th.uppercase( sort-key="inversionista_apellidopaterno" min-width="180") {{$t('Apellido Paterno')}}
            vx-th.uppercase( sort-key="inversionista_apellidomaterno" min-width="180") {{$t('Apellido Materno')}}
        template(slot-scope='{ data }')
          tbody.table-text-sm
            vx-tr(:data='tr', :key='indextr', v-for='(tr, indextr) in data')
              vx-td.text-center
                .d-f.vs-justify-center
                  feather-icon.style-icon.p-0( @click.stop='verTransaccion(tr.transaccion_id)' :title='$t("Ver")' icon='EyeIcon' )
                  feather-icon.style-icon.p-0( v-if="tr.transaccion_revisado" @click.stop='revisarTransaccion(tr.transaccion_id)' :title='$t("Revisar")' icon='UserCheckIcon' )
                  feather-icon.style-icon.p-0( v-else icon='' )
              vx-td.text-left(:data='tr.tipo_transaccion_descripcion' ) {{ tr.tipo_transaccion_descripcion }}
              vx-td.text-left(:data='tr.moneda_descripcion') {{ tr.moneda_descripcion }}
              vx-td.text-right(:data='tr.transaccion_monto') {{ tr.transaccion_monto }}
              vx-td.text-right(:data='tr.cuenta_fintech_numerocuenta') {{ tr.cuenta_fintech_numerocuenta }}
              vx-td.text-right(:data='tr.cuenta_bancaria_numerocuenta') {{ tr.cuenta_bancaria_numerocuenta }}
              vx-td.text-left(:data='tr.inversionista_tipo_documento_descripcion') {{ tr.inversionista_tipo_documento_descripcion }}
              vx-td.text-right(:data='tr.inversionista_numerodocumento') {{ tr.inversionista_numerodocumento }}
              vx-td.text-left(:data='tr.inversionista_nombres') {{ tr.inversionista_nombres }}
              vx-td.text-left(:data='tr.inversionista_apellidopaterno') {{ tr.inversionista_apellidopaterno }}
              vx-td.text-left(:data='tr.inversionista_apellidomaterno') {{ tr.inversionista_apellidomaterno }}
              vx-td.text-center(:data='tr.estado_transaccion_descripcion') {{ tr.estado_transaccion_descripcion }}
              vx-td.text-left(:data='tr.transaccion_fecharegistro') {{ convertirFecha(tr.transaccion_fecharegistro) }}
              vx-td.text-left(:data='tr.transaccion_fechaactualizacion') {{ convertirFecha(tr.transaccion_fechaactualizacion) }}
              vx-td.text-left(:data='tr.transaccion_usuarioborelacionado') {{ tr.transaccion_usuarioborelacionado }}
    popup-filtrar-inversionista( :popupAbrir="mostrarPopInversionista" @closePopup="closePopup" @selectedInvestors="selectedInvestors" )
    popup-filtrar-cuenta-progrexa( :popupAbrir="mostrarPopCuentaProgrexa" @closePopup="closePopup" @selectedAccountProgrexa="selectedAccountProgrexa" )
    popup-filtrar-cuenta-bancaria( :popupAbrir="mostrarPopCuentaBancaria" @closePopup="closePopup" @selectedAccountBank="selectedAccountBank" )

</template>

<script>

import Cabecera from '@/components/header/Header.vue';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopupFiltrarInversionista from '@/project/views/inversionista/transaccion/popup/PopupFiltrarInversionista.vue';
import PopupFiltrarCuentaBancaria from '@/project/views/inversionista/transaccion/popup/PopupFiltrarCuentaBancaria.vue';
import PopupFiltrarCuentaProgrexa from '@/project/views/inversionista/transaccion/popup/PopupFiltrarCuentaProgrexa.vue';

export default {

  mixins: [request],

  components: {
    Cabecera,
    PopupFiltrarInversionista, 
    PopupFiltrarCuentaBancaria,
    PopupFiltrarCuentaProgrexa
  },

  data() {
    return {
      mostrarPopInversionista : false,
      mostrarPopCuentaProgrexa : false,
      mostrarPopCuentaBancaria : false,
      
      listarTransaccion: [],
      filterActive: false,
      ocultarChip: false,
      
      filtros: [
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
                tipo: 'texto',
                abbr:  "INVERSIONISTA",
                alias: "inversionista",
                model:  "",
                values: "",
                hidden:  false,
                disabled:  true,
                placeholder:  ''
              }
            ]
          }
        },
        {
          type:  'popUp',
          title:  'CUENTA PROGREXA (RELACIONADA)',
          alias:  'popupCuentaProgrexa',
          closable:  false,
          expand:  false,
          action:  false,
          hidden:  false,
          model:  '',
          options: {
            model:  "",
            options: [
              {
                title: "CUENTA PROGREXA (RELACIONADA)",
                tipo: 'texto',
                abbr:  "CUENTA PROGREXA (RELACIONADA)",
                alias: "cuentaProgrexa",
                model:  "",
                values: "",
                hidden:  false,
                disabled:  true,
                placeholder:  ''
              }
            ]
          }
        },
        {
          type:  'popUp',
          title:  'CUENTA BANCARIA (RELACIONADA)',
          alias:  'popupCuentaBancaria',
          closable:  false,
          expand:  false,
          action:  false,
          hidden:  false,
          model:  '',
          options: {
            model:  "",
            options: [
              {
                title: "CUENTA BANCARIA (RELACIONADA)",
                tipo: 'texto',
                abbr:  "CUENTA BANCARIA (RELACIONADA)",
                alias: "cuentaBancaria",
                model:  "",
                values: "",
                hidden:  false,
                disabled:  true,
                placeholder:  ''
              }
            ]
          }
        },    
        {
          type:  'select',
          multiple:  true,
          title:  'TIPO DE TRANSACCIÓN',
          alias:  'tipoTransaccion',
          closable:  false,
          expand:  false,
          action:  false,
          hidden: false,
          options: {
            model:  '',
            values:  [],
            options: [],
            searchable:  false,
            filterable:  false,
            disabled:  false,
            placeholder:  "Seleccione un tipo de transacción",
          }
        },
        {
          type:  'select',
          multiple:  true,
          title:  'MONEDA',
          alias:  'moneda',
          closable:  false,
          expand:  false,
          action:  false,
          hidden: false,
          options: {
            model:  '',
            values:  [],
            options: [],
            searchable:  false,
            filterable:  false,
            disabled:  false,
            placeholder:  "Seleccione un moneda",
          }
        },
        {
          type: 'numberRange',
          title: 'MONTO',
          alias: 'monto',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title: "DESDE",
                model: '',
                characters: 10,
                charactersDecimal: 2
              },  
              {
                title: "HASTA",
                model: '',
                characters: 10,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA DE REGISTRO',
          alias: 'fechaRegistro',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options:{
            model: '',
            options: [
              {
                title: "DESDE",
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
                title: "HASTA",
                model: '',
                value: null,
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
          type: 'dateRange',
          title: 'ÚLTIMA FECHA DE MODIFICACIÓN',
          alias: 'fechaModificacion',
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
                value: null,
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
          type:  'select',
          multiple:  true,
          title:  'ESTADO',
          alias:  'estado',
          closable:  false,
          expand:  false,
          action:  false,
          hidden: false,
          options: {
            model:  '',
            values:  [],
            options: [],
            searchable:  false,
            filterable:  false,
            disabled:  false,
            placeholder:  "Seleccione un estado",
          }
        },
        
      ],
      isMounted: false,
    };
  },

  computed: {
    listado() {
      return this.listarTransaccion;
    }
  },

  methods: {
    
    convertirFecha(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      return fecha.split(", ")[0];
    },
    
    selectedInvestors(obj){
      this.mostrarPopInversionista = false;
      this.$refs.filterTransaccion.reactChangePopup('popUp', 'popupInversionista', 'inversionista', obj.label, obj.value );
    },
    
    selectedAccountProgrexa(obj){
      this.mostrarPopCuentaProgrexa = false;
      this.$refs.filterTransaccion.reactChangePopup('popUp', 'popupCuentaProgrexa', 'cuentaProgrexa', obj.label, obj.value );
    },
    
    selectedAccountBank(obj){
      this.mostrarPopCuentaBancaria = false;
      this.$refs.filterTransaccion.reactChangePopup('popUp', 'popupCuentaBancaria', 'cuentaBancaria', obj.label, obj.value );
    },
    
    closePopup() {
      this.mostrarPopInversionista = false;
      this.mostrarPopCuentaProgrexa = false;
      this.mostrarPopCuentaBancaria = false;
    },
    
    abrirFiltro() {
      this.filterActive = true;
    },

    closeFilter() {
      this.filterActive = false;
    },

    async confirmFilter(filters) {
      this.filterActive = false;
      this.filtros = filters;
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    
    evntPopup(obj){
      if(!obj) return;
      switch(obj.alias){
        case 'inversionista':
          this.mostrarPopInversionista = true;
          break;
        case 'cuentaProgrexa':
          this.mostrarPopCuentaProgrexa = true;
          break;
        case 'cuentaBancaria':
          this.mostrarPopCuentaBancaria = true;
          break;
      }
    },
    
    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    
    async listar() {
      try {
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_transaccion?';
        params += `id_inversionista=${obj.inversionista}&`;
        params += `id_cuenta_fintech=${obj.cuentaProgrexa}&`;
        params += `id_cuenta_bancaria=${obj.cuentaBancaria}&`;
        params += `id_tipo_transaccion=${obj.tipoTransaccion.id}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `monto_desde=${obj.monto.desde}&`;
        params += `monto_hasta=${obj.monto.hasta}&`;
        params += `fecha_registro_desde=${obj.fechaRegistro.desde}&`;
        params += `fecha_registro_hasta=${obj.fechaRegistro.hasta}&`;
        params += `ultima_fecha_modificacion_desde=${obj.fechaModificacion.desde}&`;
        params += `ultima_fecha_modificacion_hasta=${obj.fechaModificacion.hasta}&`;
        params += `id_estado=${obj.estado.id}`;
        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          this.listarTransaccion = response.data;
        } else {
          this.listarTransaccion = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    
    async exportar() {
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'exportar_transaccion?';
        params += `id_inversionista=${obj.inversionista}&`;
        params += `id_cuenta_fintech=${obj.cuentaProgrexa}&`;
        params += `id_cuenta_bancaria=${obj.cuentaBancaria}&`;
        params += `id_tipo_transaccion=${obj.tipoTransaccion.id}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `monto_desde=${obj.monto.desde}&`;
        params += `monto_hasta=${obj.monto.hasta}&`;
        params += `fecha_registro_desde=${obj.fechaRegistro.desde}&`;
        params += `fecha_registro_hasta=${obj.fechaRegistro.hasta}&`;
        params += `ultima_fecha_modificacion_desde=${obj.fechaModificacion.desde}&`;
        params += `ultima_fecha_modificacion_hasta=${obj.fechaModificacion.hasta}&`;
        params += `id_estado=${obj.estado.id}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    verTransaccion(id) {
      this.$router.push(`/inversionista-transaccion/ver/${id}`);
    },

    revisarTransaccion(id) {
      this.$router.push(`/inversionista-transaccion/revisar/${id}`);
    },
    
    async cargarTipoTransaccion() {
      try {
        let { data } = await this.requestApi('listar_tipo_transaccion');
        let response = data.data || [];
        if (response.estado) {
           response = response.data.map((e) => {
            return {
              id: e.id,
              label: e.label,
              object: {
                codigo: e.object.codigo,
                descripcion: e.object.descripcion,
                estado: e.object.estado
              }
            };            
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoTransaccion', response );
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    
    async cargarMoneda() {
      try {
        let { data } = await this.requestApi('listar_master_detalle_moneda');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {       
            return {
              id: e.id,
              label: `${e.object.descripcion} (${e.object.codigo})`,
              object: {
                descripcion: `${e.object.descripcion} (${e.object.codigo})`,
                estado: e.object.estado
              }
            };            
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'moneda', response);
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    
    async cargarEstado() {
      try {
        let { data } = await this.requestApi('listar_estado_transaccion');
        let response = data.data || [];       
        if (response.estado) {
           response = response.data.map((e) => {
            return {
              id: e.id,
              label: e.label,
              object: {
                descripcion: e.object.descripcion,
                estado: e.object.estado
              }
            };            
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response );
        }
      }catch (error) {
        throw new Error(error);
      }
    }
    
  },

  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.cargarTipoTransaccion();
      await this.cargarMoneda();
      await this.cargarEstado();
      this.filtros = helperFunctions.insertNumberRangeFilter( this.filtros, 'monto', '0.00' );
      this.filtros = helperFunctions.insertDateRangeFilter( this.filtros, 'fechaRegistro', null, new Date() );
      this.filtros = helperFunctions.insertDateRangeFilter( this.filtros, 'fechaModificacion', null, new Date() );
      this.filtros = helperFunctions.loaderFilters( this.filtros );
      this.ocultarChip = helperFunctions.hiddenChipFilter( this.filtros );
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
