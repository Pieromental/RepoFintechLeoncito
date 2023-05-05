<template lang="pug">  
  div#parentx-monto
    div
      cabecera(:titulo="$t('MONTOS')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true" :btnNuevo="true")
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-monto" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" )
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="60") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="descripcion_monto" min-width="150") {{$t('Monto')}}
            vx-th.uppercase(sort-key="monto_minimo" min-width="100") {{$t('Monto Mínimo')}}
            vx-th.uppercase(sort-key="monto_maximo" min-width="100") {{$t('Monto Máximo')}}
            vx-th.uppercase(sort-key="vigente_flag" min-width="100") {{$t('Vigente')}}
            vx-th.uppercase(sort-key="fecha_actualizacion" min-width="30") {{$t('Fecha de Actualización')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:class='{"style-danger-vxtable": !tr.vigente_flag}' :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="editar(tr.id_monto)" :title="$t('Modificar')" icon='Edit3Icon')
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id_monto)"  :title="$t('Ver')" icon='EyeIcon')
                vx-td.text-left(:data="[tr.codigo_monto,tr.descripcion_monto]") {{tr.codigo_monto}} {{$t('-')}} {{tr.descripcion_monto}}
                vx-td.text-right(:data="tr.monto_minimo") {{tr.monto_minimo}}
                vx-td.text-right(:data="tr.monto_maximo") {{tr.monto_maximo}}
                vx-td.text-center(:data="tr.vigente_flag")
                  span(v-if="tr.vigente_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.fecha_actualizacion") {{tr.fecha_actualizacion}}
      formulario-monto( ref="FormularioMonto" v-model="activeForm" :parametro.async='parametro' @cancel='cancel')
</template>

<script>
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import FormularioMonto from "@/project/views/parametro/monto/FormularioMonto.vue";

export default {
  name: 'Montos',
  mixins: [request],
  components: {
    Cabecera,
    FormularioMonto,
  },
  data() {
    return {
      listarMontos: [],
      activeForm:false,
      activo: false,
      filterActive: false,
      ocultarChip: false,
      parametro: {},
      filtros: [
       {
        type: 'select',
        multiple: false,
        title: 'MONTO',
        alias: 'monto',
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
            placeholder: 'Seleccione un Monto'
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA DE APROBACIÓN',
          alias: 'fechaAprobacion',
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
          title: 'ES VIGENTE', 
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
      return this.listarMontos;
    }
  },

  methods: {
    convertirFechaDia(date) {
      let fecha = helperFunctions.convertirFechaLocal(date).split(',')
      return fecha[0];
    },
    editar(idAux) {
      this.parametro = { accion: 'editar', id: idAux };
      this.activeForm = true;
    },
    ver(idAux){
      this.parametro = { accion: 'ver', id: idAux };
      this.activeForm = true;
    },
    nuevo(){
      this.parametro = { accion: 'nuevo', id: null };
      this.activeForm = true;
    },
    closeFilter() {
      this.filterActive = false;
    },
    async confirmFilter(filters) {
      this.filterActive = false
      this.filtros = filters
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    abrirFiltro() {
     this.filterActive = true;
    },
    async listarTodo() {
       this.filtros = helperFunctions.filterCleanAll(this.filtros)
       this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
       await this.listar();
    },

    async listar() {
      try {
        if(this.isMounted) this.$vs.loading({ type: "point" });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_monto?';
        params += `codigo_monto=${obj.monto}&`;
        params += `fecha_actualizacion_desde=${obj.fechaAprobacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaAprobacion.hasta}&`;
        params += `vigente_flag=${obj.vigenteFlag == '' ? '' : obj.vigenteFlag == 'si' ? true : false}`;
        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          this.listarMontos = response.data;
        } else {
          this.listarMontos = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    async exportar() {
      try {
        if(this.isMounted) this.$vs.loading({ type: "point" });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'exportar_monto?';
         params += `codigo_monto=${obj.monto}&`;
        params += `fecha_actualizacion_desde=${obj.fechaAprobacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaAprobacion.hasta}&`;
        params += `vigente_flag=${obj.vigenteFlag == '' ? '' : obj.vigenteFlag == 'si' ? true : false}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async cancel(estado = true) {
      this.parametro = {};
      this.activeForm = false;
      if (estado) {
        await this.listar();
      }
    },
    async cargarMonto() {
    try {
      let { data } = await this.requestApi('cargar_monto');
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
      this.filtros = helperFunctions.insertDataSelectFilter(this.filtros,'monto', response);
    } catch (error) {
      throw new Error(error);
    }
  },
  },
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.cargarMonto();
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
