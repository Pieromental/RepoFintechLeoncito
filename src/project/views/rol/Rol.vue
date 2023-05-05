<template lang="pug">
#parentx-roles
  div
    cabecera(:auth='nombreAutorizacion', :titulo='$t("ROL")', @nuevo='nuevo', @exportar='exportar', :btnExportar="vizualizar", @listarTodo='listarTodo', @filtrar='abrirFiltro')
    vx-card.card-sticky
      vx-filter-chip.mb-5(title='Filtros', color='#e1dffc', colorBackground='#f5f8ff', :filtersParent='filtros', :hidden='ocultarChip')
      vx-filter(
        ref='filter',
        :filtersParent='filtros',
        :positionRight='true',
        title='FILTRAR POR',
        parent='#parentx-roles',
        color='primary',
        :active='filterActive',
        @closeFilter='closeFilter',
        @confirmFilter='confirmFilter'
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
          vx-th.uppercase(center, min-width='100') {{ $t("Acciones") }}
          vx-th.uppercase(sort-key='nombre_usuario', min-width='80') {{ $t("Código") }}
          vx-th.uppercase(sort-key='nombres', min-width='160') {{ $t("Descripción") }}
          vx-th.uppercase(center,sort-key='estado', min-width='80') {{ $t("Estado") }}
        template(slot-scope='{ data }')
          tbody.table-text-sm
            vx-tr(:class='{ "style-danger-vxtable": !tr.estado }', :data='tr', :key='indextr', v-for='(tr, indextr) in data')
              vx-td.text-center
                .d-f.vs-justify-center 
                  feather-icon.style-icon.p-0(@click.stop='editar(tr)', :title='$t("Modificar")', icon='Edit3Icon')
                  feather-icon.style-icon.p-0(@click.stop='ver(tr)', :title='$t("Ver")', icon='EyeIcon')
                  feather-icon.style-icon.p-0(@click.stop='abrirAsignarUsuario(tr.id)', :title='$t("Asignar Usuario(s)")', icon='UserIcon')
              vx-td.text-left(:data='tr.codigo') {{ tr.codigo }}
              vx-td.text-left(:data='tr.descripcion') {{ tr.descripcion }}
              vx-td.text-center(:data='tr.estado') 
                span.justify-center(v-if='tr.estado') {{ $t("ACTIVO") }}
                span.justify-center(v-else) {{ $t("INACTIVO") }}
  
    formulario-rol( ref="FormularioRol" v-model="sidebarActivo" :parametro.async='parametro' @cancel='cerrarSidebar')
</template>

<script>
import helperFunctions from '@/functions';
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import VxSidebarPersonalized from '@/components/VxSidebarPersonalized';
import Cabecera from '@/components/header/Header.vue';
import FormularioRol from '@/project/views/rol/FormularioRol.vue';

export default {
  mixins: [request],
  components: {
    Cabecera,
    VxSidebarPersonalized,
    FormularioRol,
  },
  data() {
    return {
      value1: '',
      nombreAutorizacion: 'roles',
      listarUsuarioSistema: [],
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
          expand: true,
          action: false,
          add: true,
          options: {
            model: '',
            options: [
              { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern: '[0-9a-zA-Z,]' },
              { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text', pattern: ['[a-zA-Z0-9]'] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda',
          },
        },

        {
          type: 'radio',
          title: 'ESTADO',
          alias: 'estado',
          closable: false,
          expand: true,
          action: false,
          options: {
            model: 'ACTIVO',
            value: 'ACTIVO',
            count: [
              {
                value: 'ACTIVO',
                label: 'ACTIVO',
              },
              {
                value: 'INACTIVO',
                label: 'INACTIVO',
              },
            ],
          },
        },
      ],
      parametro: {},
      sidebarActivo: false,
      isMounted: false,
    };
  },
  computed: {
    listado() {
      return this.listarUsuarioSistema;
    },
    vizualizar(){
      return this.listarUsuarioSistema.length > 0 ? true: false;
    }
  },
  methods: {
    abrirAsignarUsuario(id) {
      this.$router.push(`/rol/asignar/${id}`)
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
    async listar() {
      try {
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_rol?';
        params += `codigo=${obj.criterio0.codigo}&`;
        params += `descripcion=${obj.criterio0.descripcion}&`;
        params += `estado=${obj.estado == '' ? '' : obj.estado == 'ACTIVO' ? true : false}`;

        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          this.listarUsuarioSistema = response.data;
        } else {
          this.listarUsuarioSistema = [];
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
        let params = 'exportar_rol?';
        params += `codigo=${obj.criterio0.codigo}&`;
        params += `descripcion=${obj.criterio0.descripcion}&`;
        params += `estado=${obj.estado == '' ? '' : obj.estado == 'ACTIVO' ? true : false}`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    nuevo() {
      this.parametro = { accion: 'nuevo', data: null };
      this.sidebarActivo = true;
    },
    editar(tr) {
      this.parametro = { accion: 'editar', data: tr };
      this.sidebarActivo = true;
    },
    ver(tr) {
      this.parametro = { accion: 'ver', data: tr };
      this.sidebarActivo = true;
    },    
    async cerrarSidebar(estado = true) {
      this.parametro = {};
      this.sidebarActivo = false;
      if (estado) {
        await this.listar();
      }
    },
    /*async verificarPeruLocal(){
        let { data } = await this.requestApi(`verificar_peru_local`);
        let response = data.data;
        if (response.estado) {
          if(!response.esLocal){
            this.mensajePaisLocal = response.mensaje;
            this.activarAlertaPaisLocal = true;
          }
        }
      },
    aceptarPaisLocal() {
      this.activarAlertaPaisLocal = false;
      setTimeout(() => {
        this.$router.push('/inicio');
      }, 10);
    },*/
    closeDialog() {
      this.activarAlertaPaisLocal = false;
      setTimeout(() => {
        this.$router.push('/inicio');
      }, 10);
    },
  },
  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      //await this.verificarPeruLocal();
      if (this.activarAlertaPaisLocal) return;
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
