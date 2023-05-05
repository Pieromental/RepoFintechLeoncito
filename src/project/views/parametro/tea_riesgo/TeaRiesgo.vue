<template lang="pug">  
  div#parentx-tea
    div
      cabecera(:titulo="$t('TEA/RIESGOS')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true" :btnNuevo="true")
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-tea" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" )
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="60") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="descripcion_riesgo" min-width="160") {{$t('Riesgo')}}
            vx-th.uppercase(sort-key="descripcion_moneda" min-width="160") {{$t('Moneda')}}
            vx-th.uppercase(sort-key="tasa_tea" min-width="40") {{$t('Tasa')}}
            vx-th.uppercase(sort-key="usaren_subasta" min-width="40") {{$t('Usar para Empresa')}}
            vx-th.uppercase(sort-key="usaren_velocidad" min-width="40") {{$t('Usar para Inversionista')}}
            vx-th.uppercase(sort-key="usaren_subasta" min-width="40") {{$t('Usar en Subasta')}}
            vx-th.uppercase(sort-key="usaren_velocidad" min-width="40") {{$t('Usar en Velocidad')}}
            vx-th.uppercase(sort-key="vigente_flag" min-width="80") {{$t('Vigente')}}
            vx-th.uppercase(sort-key="fecha_actualizacion" min-width="80") {{$t('Fecha de Actualización')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:class='{"style-danger-vxtable": !tr.vigente_flag}' :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="editar(tr.id_riesgo)" :title="$t('Modificar')" icon='Edit3Icon')
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id_riesgo)"  :title="$t('Ver')" icon='EyeIcon')
                vx-td.text-left(:data="[tr.codigo_riesgo,tr.descripcion_riesgo]") {{tr.codigo_riesgo}} {{$t('-')}} {{tr.descripcion_riesgo}}
                vx-td.text-left(:data="tr.descripcion_moneda") {{tr.descripcion_moneda}}
                vx-td.text-right(:data="tr.tasa_tea") {{tr.tasa_tea}}
                vx-td.text-center(:data="tr.usar_para_empresa")
                  span(v-if="tr.usar_para_empresa" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.usar_para_inversionista")
                  span(v-if="tr.usar_para_inversionista" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.usaren_subasta")
                  span(v-if="tr.usaren_subasta" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.usaren_velocidad")
                  span(v-if="tr.usaren_velocidad" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.vigente_flag")
                  span(v-if="tr.vigente_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.fecha_actualizacion") {{tr.fecha_actualizacion}}
      formulario-tea-riesgo( ref="FormTeaRiesgo" v-model="activeForm" :parametro.async='parametro' @cancel='cancel')
</template>

<script>
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import VxSidebarPersonalized from '@/components/VxSidebarPersonalized';
import FormularioTeaRiesgo from '@/project/views/parametro/tea_riesgo/FormularioTeaRiesgo.vue';

export default {
  name: 'TEA',
  mixins: [request],
  components: {
    Cabecera,
    VxSidebarPersonalized,
    FormularioTeaRiesgo
  },
  data() {
    return {
      listarRiesgos: [],
      activo: false,
      filterActive: false,
      ocultarChip: false,
      parametro: {},
      activeForm: false,
      filtros: [
        {
          type: 'select',
          multiple: true,
          title: 'RIESGO',
          alias: 'riesgo',
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
            placeholder: 'Seleccione un Riesgo'
          }
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
            placeholder: 'Seleccione una Moneda'
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA DE ACTUALIZACIÓN',
          alias: 'fechaActualizacion',
          hora: false,
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            options: [
              {
                title: 'DESDE',
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
                title: 'HASTA',
                model: '',
                value: null,
                disabled: false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder: 'dd/mm/yyyy'
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'USO PARA EMPRESA',
          alias: 'usoempresaflag',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'AFIRMATIVO',
                label: 'SI'
              },
              {
                value: 'NEGATIVO',
                label: 'NO'
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'USO PARA INVERSIONISTA',
          alias: 'usoinversionistaflag',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'CIERTO',
                label: 'SI'
              },
              {
                value: 'MENTIRA',
                label: 'NO'
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'USO EN MODELO SUBASTA',
          alias: 'subastaFlag',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'TRUE',
                label: 'SI'
              },
              {
                value: 'FALSE',
                label: 'NO'
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'USO EN MODELO VELOCIDAD',
          alias: 'velocidadFlag',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'VERDAD',
                label: 'SI'
              },
              {
                value: 'FALSO',
                label: 'NO'
              }
            ]
          }
        },
        {
          type: 'radio',
          title: 'VIGENTE',
          alias: 'vigenteFlag',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: '',
            count: [
              {
                value: 'si',
                label: 'SI'
              },
              {
                value: 'no',
                label: 'NO'
              }
            ]
          }
        }
      ]
    };
  },

  computed: {
    listado() {
      return this.listarRiesgos;
    }
  },

  methods: {
    convertirFechaDia(date) {
      let fecha = helperFunctions.convertirFechaLocal(date).split(',');
      return fecha[0];
    },
    editar(idAux) {
      this.parametro = { accion: 'editar', id: idAux };
      this.activeForm = true;
    },
    ver(idAux) {
      this.parametro = { accion: 'ver', id: idAux };
      this.activeForm = true;
    },
    nuevo() {
      this.parametro = { accion: 'nuevo', id: null };
      this.activeForm = true;
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
    abrirFiltro() {
      this.filterActive = true;
    },
    async cancel(estado = true) {
      this.parametro = {};
      this.activeForm = false;
      if (estado) {
        await this.listar();
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
        let params = 'listar_riesgo_tea?';
        params += `codigo_riesgo=${obj.riesgo.id}&`;
        params += `fecha_actualizacion_desde=${obj.fechaActualizacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaActualizacion.hasta}&`;
        params += `uso_modelo_subasta=${obj.subastaFlag == '' ? '' : obj.subastaFlag == 'TRUE' ? true : false}&`;
        params += `uso_modelo_velocidad=${obj.velocidadFlag == '' ? '' : obj.velocidadFlag == 'VERDAD' ? true : false}&`;
        params += `usar_empresa=${obj.usoempresaflag == '' ? '' : obj.usoempresaflag == 'AFIRMATIVO' ? true : false}&`;
        params += `usar_inversionista=${obj.usoinversionistaflag == '' ? '' : obj.usoinversionistaflag == 'CIERTO' ? true : false}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `vigente_flag=${obj.vigenteFlag == '' ? '' : obj.vigenteFlag == 'si' ? true : false}`;
        let { data } = await this.requestApi(params);
        let response = data.data;

        if (response.estado) {
          this.listarRiesgos = response.data;
        } else {
          this.listarRiesgos = [];
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
        let params = 'exportar_riesgo_tea?';
        params += `codigo_riesgo=${obj.riesgo.id}&`;
        params += `fecha_actualizacion_desde=${obj.fechaActualizacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaActualizacion.hasta}&`;
        params += `uso_modelo_subasta=${obj.subastaFlag == '' ? '' : obj.subastaFlag == 'TRUE' ? true : false}&`;
        params += `uso_modelo_velocidad=${obj.velocidadFlag == '' ? '' : obj.velocidadFlag == 'VERDAD' ? true : false}&`;
        params += `usar_empresa=${obj.usoempresaflag == '' ? '' : obj.usoempresaflag == 'AFIRMATIVO' ? true : false}&`;
        params += `usar_inversionista=${obj.usoinversionistaflag == '' ? '' : obj.usoinversionistaflag == 'CIERTO' ? true : false}&`;
        params += `id_moneda=${obj.moneda.id}&`;
        params += `vigente_flag=${obj.vigenteFlag == '' ? '' : obj.vigenteFlag == 'si' ? true : false}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async cargarRiesgo() {
      try {
        let { data } = await this.requestApi('cargar_riesgo_tea');
        let response = data.data.data || [];
        response = response.map((e) => {
          return {
            id: e.id,
            label: e.descripcion,
            object: {
              codigo: e.codigo,
              descripcion: e.descripcion,
              estado: e.estado
            }
          };
        });
        this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'riesgo', response);
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarMoneda() {
      try {
        let { data } = await this.requestApi('cargar_moneda_cuenta_bancaria');
        let response = data.data.data || [];
        response = response.map((e) => {
          return {
            id: e.id,
            label: e.descripcion,
            object: {
              codigo: e.codigo,
              descripcion: e.descripcion,
              estado: e.estado
            }
          };
        });
        this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'moneda', response);
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.cargarRiesgo();
      await this.cargarMoneda();
      this.filtros = helperFunctions.loaderFilters(this.filtros);
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
