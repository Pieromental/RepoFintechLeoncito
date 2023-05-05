<template lang="pug">  
  div#parentx-tasa
    div
      cabecera(:titulo="$t('TASAS')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true" :btnNuevo="true")
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-tasa" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" )
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="100") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="descripcion_tasa" min-width="160") {{$t('Tasa')}}
            vx-th.uppercase(sort-key="valor_tasa" min-width="100") {{$t('Valor')}}
            vx-th.uppercase(sort-key="vigente_flag" min-width="100") {{$t('Vigente')}}
            vx-th.uppercase(sort-key="fecha_actualizacion" min-width="100") {{$t('Fecha de Actualización')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:class='{"style-danger-vxtable": !tr.vigente_flag}' :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="editar(tr.id_tasa)" :title="$t('Modificar')" icon='Edit3Icon')
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id_tasa)"  :title="$t('Ver')" icon='EyeIcon')
                vx-td.text-left(:data="[tr.codigo_tasa,tr.descripcion_tasa]") {{tr.codigo_tasa}} {{$t('-')}} {{tr.descripcion_tasa}}
                vx-td.text-right(:data="tr.valor_tasa") {{tr.valor_tasa}}
                vx-td.text-center(:data="tr.vigente_flag")
                  span(v-if="tr.vigente_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.fecha_actualizacion") {{convertirFechaDia(tr.fecha_actualizacion) }}
      formulario-tasa( ref="FormularioTasa" v-model="activeForm" :parametro.async='parametro' @cancel='cancel')
</template>

<script>
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import FormularioTasa from "@/project/views/parametro/tasa/FormularioTasa.vue";
export default {
  name: 'TEA',
  mixins: [request],
  components: {
    Cabecera,
    FormularioTasa
  },
  data() {
    return {
      listarRiesgos: [],
      activeForm:false,
      activo: false,
      filterActive: false,
      ocultarChip: false,
      parametro: {},
      filtros: [
       {
        type: 'select',
        multiple: true,
        title: 'TASA',
        alias: 'tasa',
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
            placeholder: 'Seleccione una Tasa'
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
    async cancel(estado = true) {
      this.parametro = {};
      this.activeForm = false;
      if (estado) {
        await this.listar();
      }
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
        let params = 'listar_tasa?';
        params += `codigo_tasa=${obj.tasa.id}&`;
        params += `fecha_actualizacion_desde=${obj.fechaActualizacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaActualizacion.hasta}&`;
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
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    async exportar() {
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'exportar_tasa?';
        params += `codigo_tasa=${obj.tasa.id}&`;
        params += `fecha_actualizacion_desde=${obj.fechaActualizacion.desde}&`;
        params += `fecha_actualizacion_hasta=${obj.fechaActualizacion.hasta}&`;
        params += `vigente_flag=${obj.vigenteFlag == '' ? '' : obj.vigenteFlag == 'si' ? true : false}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async cargarTasa() {
    try {
      let { data } = await this.requestApi('cargar_tasa');
      let response = data.data.data || [];
      response = response.map((e) => {
        return {
          id: e.id,
          label: e.descripcion,
          object: {
            codigo: e.codigo,
            descripcion: e.descripcion,
            estado: e.estado,
          }
        };
      });
      this.filtros = helperFunctions.insertDataSelectFilter(this.filtros,'tasa', response);
    } catch (error) {
      throw new Error(error);
    }
  },
  },
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.cargarTasa();
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
