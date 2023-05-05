<template lang="pug">
#parentx-subasta
  div
    cabecera(:titulo='$t("SUBASTAS")', @nuevo='nuevo', :btnNuevo="false" @exportar='exportar', :btnExportar="vizualizar", @listarTodo='listarTodo', @filtrar='abrirFiltro')
    vx-card.card-sticky
      
      vx-filter-chip.mb-5(title='Filtros', color='#e1dffc', colorBackground='#f5f8ff', :filtersParent='filtros', :hidden='ocultarChip')
      vx-filter(
        ref='filter',
        :filtersParent='filtros',
        :positionRight='true',
        title='FILTRAR POR',
        parent='#parentx-subasta',
        color='primary',
        :active='filterActive',
        @closeFilter='closeFilter',
        @confirmFilter='confirmFilter'
        @evntPopUp="evntPopup"
      )
      vx-table.style-vxtable(
        search,
        search-sticky,
        pagination,
        rowsPage,
        :arrayRows='[25, 50, 100]',
        max-tems='5',
        :data='listado',
        :no-data-text='$t("No se encontraron registros")'
      )
        template(slot='thead')
          vx-th.uppercase(center, colspan="1", rowspan="2", min-width='160') {{ $t("Acciones") }}
          vx-th.uppercase(colspan="1", rowspan="2", sort-key='codigo', min-width='130') {{ $t("Código") }}
          vx-th.uppercase(colspan="3", rowspan="1", center, min-width='460') {{ $t("Empresa") }}
          vx-th.uppercase(colspan="1", rowspan="2", sort-key='estado_descripcion', min-width='160') {{ $t("Estado") }}
          vx-th.uppercase(colspan="3", rowspan="1", center, min-width='560') {{ $t("Deudor") }}
          vx-th.uppercase(colspan="2", rowspan="1", center, min-width='200') {{ $t("Modelo") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='moneda_descripcion', min-width='200') {{ $t("Moneda") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='substa_montototal', min-width='200') {{ $t("Monto") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='substa_costototal', min-width='200') {{ $t("Costo Total") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='substa_montoaprestamo', min-width='200') {{ $t("Monto Préstamo") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_teaactual', min-width='200') {{ $t("TEA") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_diasretorno', min-width='200') {{ $t("Días de Retorno") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_tasarendimiento', min-width='200') {{ $t("Tasa de Rendimiento Mensual") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechapublicacion', min-width='200') {{ $t("Fecha de Publicación") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechapago', min-width='200') {{ $t("Fecha de Pago Pactada") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechacierrefinanciamiento', min-width='200') {{ $t("Fecha de Cierre de Financiamiento") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechapagoainversionistapactada', min-width='200') {{ $t("Fecha de Pago a Inversionistas Pactada") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechacierre', min-width='200') {{ $t("Fecha de Cierre") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_prestamoentregadoflag', min-width='200') {{ $t("Préstamo Entregado") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_prestamopagadoflag', min-width='200') {{ $t("Préstamo Pagado") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_confirmacionprestamopagadoflag', min-width='200') {{ $t("Confirmación de Pago") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechaentregaprestamo', min-width='200') {{ $t("Fecha de Entrega del Préstamo") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechapagoprestamo', min-width='200') {{ $t("Fecha de Pago del Préstamo") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fecharegistrousuario', min-width='200') {{ $t("Fecha de Registro") }}
          vx-th.uppercase(colspan="1", rowspan="2",sort-key='subasta_fechaactualizacionusuario', min-width='200') {{ $t("Última Fecha de Modificación") }}
        template(slot="mhead")
          tr
            vx-th.uppercase( sort-key="empresa_razonsocial" min-width="220") {{$t('Razón social')}}
            vx-th.uppercase( sort-key="empresa_ruc" min-width="120") {{$t('RUC')}}
            vx-th.uppercase( sort-key="riesgo_descripcion" min-width="120") {{$t('Riesgo')}}          
            vx-th.uppercase( sort-key="deudor_razonsocial" min-width="220") {{$t('Razón social')}}
            vx-th.uppercase( sort-key="deudor_ruc" min-width="120") {{$t('RUC')}}
            vx-th.uppercase( sort-key="deudor_nombrecomercial" min-width="220") {{$t('Nombre Comercial')}}
            vx-th.uppercase( sort-key="subasta_esvelocidad" min-width="100") {{$t('Velocidad')}}
            vx-th.uppercase( sort-key="subasta_essubasta" min-width="100") {{$t('Subasta')}}
        template(slot-scope='{ data }')
          tbody.table-text-sm
            vx-tr(:data='tr', :key='indextr', v-for='(tr, indextr) in data')
              vx-td.text-center
                .d-f.vs-justify-center
                  feather-icon.style-icon.p-0(@click.stop='verSubasta(tr.id)', :title='$t("Ver Subasta")', icon='EyeIcon')
                  feather-icon.style-icon.p-0(v-if="tr.revisarflag", @click.stop='revisarSubasta(tr.id,tr.estado_codigo)', :title='$t("Revisar Subasta")', icon='UserCheckIcon')
                  feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                  feather-icon.style-icon.p-0(v-if="tr.avanceflag",@click.stop='avanceSubasta(tr.id)', :title='$t("Avance Subasta")', icon='LayersIcon')
                  feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                  vx-tooltip( v-if="verInformacionSubasta(tr.id).length" :title="`${$t('Ícono de aviso')}`"  position="right"  color="primary" 
                      :dataMessage="verInformacionSubasta(tr.id)")
                        feather-icon.style-icon.p-0( icon="InfoIcon" )
                  feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                  
              vx-td.text-left(:data='tr.codigo' ) {{ tr.codigo }}
              vx-td.text-left(:data='tr.empresa_razonsocial') {{ tr.empresa_razonsocial }}
              vx-td.text-left(:data='tr.empresa_ruc') {{ tr.empresa_ruc }}
              vx-td.text-left(:data='tr.riesgo_descripcion') {{ tr.riesgo_descripcion }}
              vx-td.text-left(:data='tr.estado_descripcion') {{ tr.estado_descripcion }}
              vx-td.text-left(:data='tr.deudor_razonsocial') {{ tr.deudor_razonsocial }}
              vx-td.text-left(:data='tr.deudor_ruc') {{ tr.deudor_ruc }}
              vx-td.text-left(:data='tr.deudor_nombrecomercial') {{ tr.deudor_nombrecomercial }}
              vx-td.text-center(:data='tr.subasta_esvelocidad')
                span(v-if="tr.subasta_esvelocidad" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')    
              vx-td.text-center(:data='tr.subasta_essubasta')
                span(v-if="tr.subasta_essubasta" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')  
              vx-td.text-left(:data='tr.moneda_descripcion') {{ tr.moneda_descripcion }} 
              vx-td.text-right(:data='tr.substa_montototal') {{ tr.substa_montototal }} 
              vx-td.text-right(:data='tr.substa_costototal') {{ tr.substa_costototal }}
              vx-td.text-right(:data='tr.substa_montoaprestamo') {{ tr.substa_montoaprestamo }}
              vx-td.text-right(:data='tr.subasta_teaactual') {{ tr.subasta_teaactual }}
              vx-td.text-right(:data='tr.subasta_diasretorno') {{ tr.subasta_diasretorno }}
              vx-td.text-right(:data='tr.subasta_tasarendimiento') {{ tr.subasta_tasarendimiento }}
              vx-td.text-left(:data='tr.subasta_fechapublicacion') {{ convertirFechaDia(tr.subasta_fechapublicacion) }}
              vx-td.text-left(:data='tr.subasta_fechapago') {{ tr.subasta_fechapago }}
              vx-td.text-left(:data='tr.subasta_fechacierrefinanciamiento') {{ convertirFechaDia(tr.subasta_fechacierrefinanciamiento) }}
              vx-td.text-left(:data='tr.subasta_fechapagoainversionistapactada') {{ tr.subasta_fechapagoainversionistapactada }}
              vx-td.text-left(:data='tr.subasta_fechacierre') {{ convertirFechaDia(tr.subasta_fechacierre) }}
              vx-td.text-center(:data='tr.subasta_prestamoentregadoflag')
                span(v-if="tr.subasta_prestamoentregadoflag" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')  
              vx-td.text-center(:data='tr.subasta_prestamopagadoflag')
                span(v-if="tr.subasta_prestamopagadoflag" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')
              vx-td.text-center(:data='tr.subasta_confirmacionprestamopagadoflag')
                span(v-if="tr.subasta_confirmacionprestamopagadoflag" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')
              vx-td.text-right(:data='tr.subasta_fechaentregaprestamo') {{ convertirFechaDia(tr.subasta_fechaentregaprestamo) }}
              vx-td.text-left(:data='tr.subasta_fechapagoprestamo') {{ convertirFechaDia(tr.subasta_fechapagoprestamo) }}
              vx-td.text-left(:data='tr.subasta_fecharegistrousuario') {{ convertirFechaDia(tr.subasta_fecharegistrousuario) }}
              vx-td.text-left(:data='tr.subasta_fechaactualizacionusuario') {{ convertirFechaDia(tr.subasta_fechaactualizacionusuario) }}
    
    popup-filtrar-empresa(:popupAbrir="popupFiltrarEmpresa" @selectedAccount="selectedAccount" @closePopup="closePopup" )
    popup-filtrar-deudor(:popupAbrir="popupFiltrarDeudor" @selectedAccount="selectedAccount" @closePopup="closePopup" )
</template>

<script>
import helperFunctions from '@/functions';
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import VxSidebarPersonalized from '@/components/VxSidebarPersonalized';
import Cabecera from '@/components/header/Header.vue';
import PopupFiltrarEmpresa from "@/project/views/empresa/subasta/popup/PopupFiltrarEmpresa.vue";
import PopupFiltrarDeudor from "@/project/views/empresa/subasta/popup/PopupFiltrarDeudor.vue";

export default {
  mixins: [request],
  components: {
    Cabecera,
    VxSidebarPersonalized,
    PopupFiltrarEmpresa,
    PopupFiltrarDeudor
  },
  data() {
    return {
      value1: '',
      nombreAutorizacion: 'subasta',
      listarSubasta: [],
      filterActive: false,
      ocultarChip: false,
      mensajePaisLocal: '',
      activarAlertaPaisLocal: false,
      filtros: [        
        {
          type: 'criterio',
          title: 'CRITERIO DE BÚSQUEDA',
          alias: 'criterio',
          closable: false,
          expand: false,
          action: false,
          add: true,
          options: {
            model: '',
            options: [
              { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern: '[0-9a-zA-Z,]' }
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda',
          },
        },
        {
          type:  'popUp',
          title:  'EMPRESA',
          alias:  'popupEmpresa',
          closable:  false,
          expand:  false,
          action:  false,
          hidden:  false,
          model:  '',
          options: {
            model:  "",
            options: [
              {
                title: "EMPRESA",
                abbr:  "EMPRESA",
                alias: "empresa",
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
          type:  'popUp',
          title:  'DEUDOR',
          alias:  'popupDeudor',
          closable:  false,
          expand:  false,
          action:  false,
          hidden:  false,
          model:  '',
          options: {
            model:  "",
            options: [
              {
                title: "DEUDOR",
                abbr:  "DEUDOR",
                alias: "deudor",
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
          type: 'radio',
          title: 'ES DE MODELO VELOCIDAD',
          alias: 'esVelocidad',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'SI',
                label: 'SI',
              },
              {
                value: 'NO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'radio',
          title: 'ES DE MODELO SUBASTA',
          alias: 'esSubasta',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'VERDAD',
                label: 'SI',
              },
              {
                value: 'FALSO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'select',
          multiple: true,
          title: 'MONEDA',
          alias: 'moneda',
          closable: false,
          expand: false,
          action: true,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: true,
            filterable: true,
            disabled: false,
            clearable: true,
            label: 'label',
            placeholder: 'Seleccione una moneda'
          }
        },
        {
          type: 'numberRange',
          title: 'MONTO',
          alias: 'monto',
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
                characters: 10,
                charactersDecimal: 2
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 10,
                charactersDecimal: 2
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'COSTO TOTAL',
          alias: 'costoTotal',
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
                characters: 15,
                charactersDecimal: 4
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 15,
                charactersDecimal: 4
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'MONTO PRÉSTAMO',
          alias: 'montoPrestamo',
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
                characters: 15,
                charactersDecimal: 4
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 15,
                charactersDecimal: 4
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'TIENE RETRASO DE PAGO',
          alias: 'retrasoPago',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'RSI',
                label: 'SI',
              },
              {
                value: 'RNO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'numberRange',
          title: 'TEA',
          alias: 'tea',
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
                characters: 15,
                charactersDecimal: 4
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 15,
                charactersDecimal: 4
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'DÍAS DE RETORNO',
          alias: 'diaRetorno',
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
                characters: 15,
                charactersDecimal: 4
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 15,
                charactersDecimal: 4
              }
            ]
          }
        },
        {
          type: 'numberRange',
          title: 'TASA DE RENDIMIENTO MENSUAL',
          alias: 'tasaRendimientoMensual',
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
                characters: 15,
                charactersDecimal: 4
              },  
              {
                title:  "HASTA",
                model:  '',
                characters: 15,
                charactersDecimal: 4
              }
            ]
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA DE PUBLICACIÓN',
          alias: 'fechaPublicacion',
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
          type: 'dateRange',
          title: 'FECHA DE PAGO PACTADA',
          alias: 'fechaPagoPactada',
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
          type: 'dateRange',
          title: 'FECHA DE CIERRE DE FINANCIMIENTO',
          alias: 'fechaCierreFinancimiento',
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
          type: 'dateRange',
          title: 'FECHA DE PAGO A LOS INVERSIONISTA PACTADA',
          alias: 'fechaPagoInversionistaPactada',
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
          type: 'dateRange',
          title: 'FECHA DE CIERRE',
          alias: 'fechaCierre',
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
          type: 'radio',
          title: 'PRÉSTAMO ENTREGADO',
          alias: 'prestamoEntregado',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'PESI',
                label: 'SI',
              },
              {
                value: 'PENO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'radio',
          title: 'PRESTAMO PAGADO',
          alias: 'prestamoPagado',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'PPSI',
                label: 'SI',
              },
              {
                value: 'PPNO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'radio',
          title: 'CONFIRMACIÓN DE PAGO (PRÉSTAMO)',
          alias: 'confirmacionPago',
          closable: false,
          expand: false,
          action: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'CPSI',
                label: 'SI',
              },
              {
                value: 'CPNO',
                label: 'NO',
              },
            ],
          },
        },
        {
          type: 'dateRange',
          title: 'FECHA DE ENTREGA DEL PRÉSTAMO',
          alias: 'fechaEntregaPrestamo',
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
          type: 'dateRange',
          title: 'FECHA DE PAGO DEL PRÉSTAMO',
          alias: 'fechaPagoPrestamo',
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
            placeholder:  "Seleccione un Estado", // esta key representa el placeholder del select, es personalizable. 
          }
        }
      ],
      parametro: {},
      sidebarActivo: false,
      isMounted: false,

      popupFiltrarDeudor: false,
      popupFiltrarEmpresa: false,

      popupRevisionSubasta : false,
    };
  },
  computed: {    
    listado() {      
      return this.listarSubasta;
    },
    vizualizar(){
      return this.listarSubasta.length > 0 ? true: false;
    },
    iconosInformacion(){      
      let array = [];
      this.listado.map( e => {
        let informacion = [];
        if( e.subasta_fechapagopactadocobranza ){
          let obj = {
            subTitle : '- ',
            description : e.subasta_fechapagopactadocobranza
          }
          informacion.push(obj);
        }

        if( e.subasta_cobranzaprestamonoentregado ){
          let obj = {
            subTitle : '- ',
            description : e.subasta_cobranzaprestamonoentregado
          }
          informacion.push(obj);
        }

        if( e.subasta_prestamopagadonoconfirmacion ){
          let obj = {
            subTitle : '- ',
            description : e.subasta_prestamopagadonoconfirmacion
          }
          informacion.push(obj);
        }

        if( e.subasta_estadosubastafechacierre ){
          let obj = {
            subTitle : '- ',
            description : e.subasta_estadosubastafechacierre
          }
          informacion.push(obj);
        }

        let obj = {
          id : e.id,
          informacion : informacion
        };

        array.push(obj);
      });

      return array;
    }
  },
  methods: {
     convertirFechaDia(date){
      let fecha=helperFunctions.convertirFechaLocal(date).split(',');
      return fecha[0];
    },
    convertirFecha(date){
      helperFunctions.convertirFechaLocal(date);
      return fecha;
    },
    verInformacionSubasta(id){
      const { informacion } = this.iconosInformacion.find( e => e.id == id)
      return informacion;
    },
    evntPopup(obj){
      if(!obj) return;
      switch(obj.alias){
        case 'empresa':
          this.popupFiltrarEmpresa = true;
          break;
        case 'deudor':
          this.popupFiltrarDeudor = true;
          break;
      }
    },
    selectedAccount(obj){
      this.popupFiltrarDeudor = false;
      this.popupFiltrarEmpresa = false;
      if(!obj) return;
      switch( obj.alias ){
        case 'empresa':
          this.$refs.filter.reactChangePopup('popUp', obj.popup, obj.alias , this.returnValPopupEmpresa(obj.listado,'model'), this.returnValPopupEmpresa(obj.listado,'value'));
          break;
        case 'deudor':          
          this.$refs.filter.reactChangePopup('popUp', obj.popup, obj.alias , this.returnValPopupDeudor(obj.listado,'model'), this.returnValPopupDeudor(obj.listado,'value'));
          break;
      }
    },
    returnValPopupEmpresa(value, type ){
      let tmp='';
      value.forEach( element=>{
        let label = `${element.empresa_razonsocial} | ${element.empresa_ruc} | ${element.riesgo_descripcion}`;
        let id = element.empresa_id;
        if(type=='model') tmp = tmp + (tmp.length>0 ? `, ${label}`: `${label}`);
        if(type=='value') tmp = tmp + (tmp.length>0 ? `,${id}` : `${id}`);
      });
      return tmp
    },
    returnValPopupDeudor(value, type ){
      let tmp='';
      value.forEach( element=>{
        let label = `${element.deudor_ruc} | ${element.deudor_razonsocial} | ${element.deudor_nombrecomercial}`;
        let id = element.deudor_id;
        if(type=='model') tmp = tmp + (tmp.length>0 ? ', '+label:label);
        if(type=='value') tmp = tmp + (tmp.length>0 ? ','+id:id);
      });
      return tmp
    },
    closePopup() {
       this.popupFiltrarDeudor = false;
       this.popupFiltrarEmpresa = false;
       this.popupRevisionSubasta = false;
    },
    abrirAsignarRol(id) {
      this.$router.push(`/usuario-sistema/asignar/${id}`)
    },
    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    abrirFiltro() {
      this.filterActive = true;
    },
    async confirmFilter(filters) {
      this.filterActive = false;
      this.filtros = filters;
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    closeFilter() {
      this.filterActive = false;
    },
    async listar() {/* <= ACA id=null */
      try {
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);   
        let params = "listar_subasta?";        
        params += `codigo=${obj.criterio0.codigo}&`;
        params += `id_empresa=${obj.empresa}&`; /*  */
        params += `id_deudor=${obj.deudor}&`;
        params += `es_velocidad_flag=${obj.esVelocidad == '' ? '' : obj.esVelocidad == 'SI' ? true : false}&`;
        params += `es_subasta_flag=${obj.esSubasta == '' ? '' : obj.esSubasta == 'VERDAD' ? true : false}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `monto_desde=${obj.monto.desde}&`;
        params += `monto_hasta=${obj.monto.hasta}&`;
        params += `costo_desde=${obj.costoTotal.desde}&`;
        params += `costo_hasta=${obj.costoTotal.hasta}&`;
        params += `monto_prestamo_desde=${obj.montoPrestamo.desde}&`;
        params += `monto_prestamo_hasta=${obj.montoPrestamo.hasta}&`;
        params += `retraso_pago=${obj.retrasoPago == '' ? '' : obj.retrasoPago == 'RSI' ? true : false}&`;
        params += `tea_desde=${obj.tea.desde}&`;
        params += `tea_hasta=${obj.tea.hasta}&`;
        params += `dia_retorno_desde=${obj.diaRetorno.desde}&`;
        params += `dia_retorno_hasta=${obj.diaRetorno.hasta}&`;
        params += `tasa_rendimiento_mensual_desde=${obj.tasaRendimientoMensual.desde}&`;
        params += `tasa_rendimiento_mensual_hasta=${obj.tasaRendimientoMensual.hasta}&`;
        params += `fecha_publicacion_desde=${obj.fechaPublicacion.desde}&`;
        params += `fecha_publicacion_hasta=${obj.fechaPublicacion.hasta}&`;
        params += `fecha_pago_pactada_desde=${obj.fechaPagoPactada.desde}&`;
        params += `fecha_pago_pactada_hasta=${obj.fechaPagoPactada.hasta}&`;
        params += `fecha_cierre_financiamiento_desde=${obj.fechaCierreFinancimiento.desde}&`;
        params += `fecha_cierre_financiamiento_hasta=${obj.fechaCierreFinancimiento.hasta}&`;
        params += `fecha_pago_inversionista_pactada_desde=${obj.fechaPagoInversionistaPactada.desde}&`;
        params += `fecha_pago_inversionista_pactada_hasta=${obj.fechaPagoInversionistaPactada.hasta}&`;
        params += `fecha_cierre_desde=${obj.fechaCierre.desde}&`;
        params += `fecha_cierre_hasta=${obj.fechaCierre.hasta}&`;
        params += `prestamo_entregado_flag=${obj.prestamoEntregado == '' ? '' : obj.prestamoEntregado == 'PESI' ? true : false}&`;
        params += `prestamo_pagado_flag=${obj.prestamoPagado == '' ? '' : obj.prestamoPagado == 'PPSI' ? true : false}&`;        
        params += `confirmacion_prestamo_pagado_flag=${obj.confirmacionPago == '' ? '' : obj.confirmacionPago == 'CPSI' ? true : false}&`;
        params += `fecha_entrega_prestamo_desde=${obj.fechaEntregaPrestamo.desde}&`;
        params += `fecha_entrega_prestamo_hasta=${obj.fechaEntregaPrestamo.hasta}&`;
        params += `fecha_pago_prestamo_desde=${obj.fechaPagoPrestamo.desde}&`;
        params += `fecha_pago_prestamo_hasta=${obj.fechaPagoPrestamo.hasta}&`;
        params += `fecha_registro_desde=${obj.fechaRegistro.desde}&`;
        params += `fecha_registro_hasta=${obj.fechaRegistro.hasta}&`;
        params += `id_estado=${obj.estado.id}`;

        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          this.listarSubasta = response.data;
        } else {
          this.listarSubasta = [];
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
        let params = "exportar_subasta?";        
        params += `codigo=${obj.criterio0.codigo}&`;
        params += `id_empresa=${obj.empresa}&`;
        params += `id_deudor=${obj.deudor}&`;
        params += `es_velocidad_flag=${obj.esVelocidad == '' ? '' : obj.esVelocidad == 'SI' ? true : false}&`;
        params += `es_subasta_flag=${obj.esSubasta == '' ? '' : obj.esSubasta == 'VERDAD' ? true : false}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `monto_desde=${obj.monto.desde}&`;
        params += `monto_hasta=${obj.monto.hasta}&`;
        params += `costo_desde=${obj.costoTotal.desde}&`;
        params += `costo_hasta=${obj.costoTotal.hasta}&`;
        params += `monto_prestamo_desde=${obj.montoPrestamo.desde}&`;
        params += `monto_prestamo_hasta=${obj.montoPrestamo.hasta}&`;
        params += `retraso_pago=${obj.retrasoPago == '' ? '' : obj.retrasoPago == 'RSI' ? true : false}&`;
        params += `tea_desde=${obj.tea.desde}&`;
        params += `tea_hasta=${obj.tea.hasta}&`;
        params += `dia_retorno_desde=${obj.diaRetorno.desde}&`;
        params += `dia_retorno_hasta=${obj.diaRetorno.hasta}&`;
        params += `tasa_rendimiento_mensual_desde=${obj.tasaRendimientoMensual.desde}&`;
        params += `tasa_rendimiento_mensual_hasta=${obj.tasaRendimientoMensual.hasta}&`;
        params += `fecha_publicacion_desde=${obj.fechaPublicacion.desde}&`;
        params += `fecha_publicacion_hasta=${obj.fechaPublicacion.hasta}&`;
        params += `fecha_pago_pactada_desde=${obj.fechaPagoPactada.desde}&`;
        params += `fecha_pago_pactada_hasta=${obj.fechaPagoPactada.hasta}&`;
        params += `fecha_cierre_financiamiento_desde=${obj.fechaCierreFinancimiento.desde}&`;
        params += `fecha_cierre_financiamiento_hasta=${obj.fechaCierreFinancimiento.hasta}&`;
        params += `fecha_pago_inversionista_pactada_desde=${obj.fechaPagoInversionistaPactada.desde}&`;
        params += `fecha_pago_inversionista_pactada_hasta=${obj.fechaPagoInversionistaPactada.hasta}&`;
        params += `fecha_cierre_desde=${obj.fechaCierre.desde}&`;
        params += `fecha_cierre_hasta=${obj.fechaCierre.hasta}&`;
        params += `prestamo_entregado_flag=${obj.prestamoEntregado == '' ? '' : obj.prestamoEntregado == 'PESI' ? true : false}&`;
        params += `prestamo_pagado_flag=${obj.prestamoPagado == '' ? '' : obj.prestamoPagado == 'PPSI' ? true : false}&`;        
        params += `confirmacion_prestamo_pagado_flag=${obj.confirmacionPago == '' ? '' : obj.confirmacionPago == 'CPSI' ? true : false}&`;
        params += `fecha_entrega_prestamo_desde=${obj.fechaEntregaPrestamo.desde}&`;
        params += `fecha_entrega_prestamo_hasta=${obj.fechaEntregaPrestamo.hasta}&`;
        params += `fecha_pago_prestamo_desde=${obj.fechaPagoPrestamo.desde}&`;
        params += `fecha_pago_prestamo_hasta=${obj.fechaPagoPrestamo.hasta}&`;
        params += `fecha_registro_desde=${obj.fechaRegistro.desde}&`;
        params += `fecha_registro_hasta=${obj.fechaRegistro.hasta}&`;
        params += `id_estado=${obj.estado.id}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    nuevo() {
      this.parametro = {
        pagina: 'nuevo',
        id: null,
      };
      this.sidebarActivo = true;
    },
    verSubasta(id) {
      this.$router.push(`/empresa-subasta/ver/${id}`);
    },
    avanceSubasta(id){
      this.$router.push(`/empresa-subasta/avance/${id}`);
    },
    cargarFechaLocal(){
      let fecha = new Date();
      this.filtros.map( e => {
        if( 
          e.alias == 'fechaPublicacion' ||
          e.alias == 'fechaCierreFinancimiento' ||
          e.alias == 'fechaCierre' ||
          e.alias == 'fechaEntregaPrestamo'
        ){
          e.options.options[1].value = fecha;
          e.options.options[1].model = helperFunctions.convertirFecha(fecha);
          e.options.model = `DESDE --/--/-- - HASTA ${ helperFunctions.convertirFecha(fecha)}`;
        }
        if( e.alias == 'fechaRegistro' ){
          e.options.options[0].value = fecha;
          e.options.options[0].model = helperFunctions.convertirFecha(fecha);
          e.options.options[1].value = fecha;
          e.options.options[1].model = helperFunctions.convertirFecha(fecha);
          e.options.model = `DESDE ${ helperFunctions.convertirFecha(fecha)} - HASTA ${ helperFunctions.convertirFecha(fecha)}`;
        }
      });
    },
    cargarMontoDefault(){
      this.filtros.map( e => {
        if( 
          e.alias == 'monto' ||
          e.alias == 'costoTotal' ||
          e.alias == 'montoPrestamo' ||
          e.alias == 'tea' ||
          e.alias == 'diaRetorno' ||
          e.alias == 'tasaRendimientoMensual' ||
          e.alias == 'tir' 
        ){
          e.options.options[0].model = '0';
          e.options.model = 'DESDE 0 - HASTA ...';
        }
      });
    },

    async revisarSubasta(id, revision ) {
      try{
        let { value } = await swal.fire({ title: this.$t('Mensaje de Sistema'), text: '¿Desea empezar con la revisión de esta subasta?', showCancelButton: true, confirmButtonText: this.$t('Aceptar'), cancelButtonText: this.$t('Cancelar') });
        if (value) {        
          this.$vs.loading({ type: 'point' });
          if( revision == "REV" ){
            this.$router.push(`/empresa-subasta/revisar/${id}`);
          }else{
            let put = { id: id };
            put.ip = await require('public-ip').v4();
            let { data } = await this.requestApi('actualizar_estado_revisado_subasta', put, 'PUT');
            let response = data.data;
            if (response.estado) {
              this.responseRequest(response);
              setTimeout( () => { this.$router.push(`/empresa-subasta/revisar/${id}`) }, 100)
            } else {
              this.sweetAlert(response);
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    ver(id) {
      this.parametro = {
        pagina: 'ver',
        id: id,
      };
      this.sidebarActivo = true;
    },
    
    async cerrarSidebar(estado = true) {
      this.$refs.VxSidebarPersonalized.closeSidebarExtern();
      this.parametro = {};
      this.sidebarActivo = false;
      if (estado) {
        await this.listar();
      }
    },
    closeDialog() {
      this.activarAlertaPaisLocal = false;
      setTimeout(() => {
        this.$router.push('/inicio');
      }, 10);
    },

    async cargarEstado() {
      try {
        let { data } = await this.requestApi('cargar_estado_subasta');
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
          let filter = response.find( element => element.object.codigo == "REG" );
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response, filter);
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
            let { codigo , descripcion } = e.object;
            let formato = `${descripcion} (${codigo})`;
            return {
              id: e.id,
              label: formato,
              object: {
                codigo: formato,
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

    async validarRuta(){
      if(this.$route.params.id){
        this.$refs.filter.reactChangePopup('popUp', 'popupEmpresa', 'empresa', this.$route.params.nombres, this.$route.params.id, false );
      }
    }
  },
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      this.cargarFechaLocal();
      this.cargarMontoDefault()
      await this.cargarEstado();
      await this.cargarMoneda();
      // if (!this.$route.params.id) {}
      await this.validarRuta(); 
      this.filtros = helperFunctions.loaderFilters(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);      
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
