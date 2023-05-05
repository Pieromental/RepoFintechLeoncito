<template lang="pug">
#parentx-usuario-sistema
  div
    cabecera(:auth='nombreAutorizacion', :titulo='$t("USUARIOS DEL SISTEMA")', @nuevo='nuevo', @exportar='exportar', :btnExportar="vizualizar", @listarTodo='listarTodo', @filtrar='abrirFiltro')
    vx-card.card-sticky
      vx-filter-chip.mb-5(title='Filtros', color='#e1dffc', colorBackground='#f5f8ff', :filtersParent='filtros', :hidden='ocultarChip')
      vx-filter(
        ref='filter',
        :filtersParent='filtros',
        :positionRight='true',
        title='FILTRAR POR',
        parent='#parentx-usuario-sistema',
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
          vx-th.uppercase(sort-key='nombre_usuario', min-width='130') {{ $t("Nombre de Usuario") }}
          vx-th.uppercase(sort-key='nombres', min-width='130') {{ $t("Nombres") }}
          vx-th.uppercase(sort-key='apellidos', min-width='160') {{ $t("Apellidos") }}
          vx-th.uppercase(sort-key='correo', min-width='160') {{ $t("Correo Electrónico") }}
          vx-th.uppercase(sort-key='bloqueado', min-width='40') {{ $t("Bloqueado") }}
          vx-th.uppercase(sort-key='cambio_pendiente_clave', min-width='40') {{ $t("Cambio de Clave Pendiente") }}
          vx-th.uppercase(sort-key='ultimo_login', min-width='150') {{ $t("Último Login") }}
          vx-th.uppercase(center,sort-key='estado', min-width='80') {{ $t("Estado") }}
        template(slot-scope='{ data }')
          tbody.table-text-sm
            vx-tr(:class='{ "style-danger-vxtable": !tr.estado }', :data='tr', :key='indextr', v-for='(tr, indextr) in data')
              vx-td.text-center
                .d-f.vs-justify-center 
                  feather-icon.style-icon.p-0(@click.stop='editar(tr)', :title='$t("Modificar")', icon='Edit3Icon')
                  feather-icon.style-icon.p-0(@click.stop='ver(tr)', :title='$t("Ver")', icon='EyeIcon')
                  feather-icon.style-icon.p-0(v-if="tr.bloqueado" @click.stop='desbloquear(tr.id)', :title='$t("Desbloquear")', icon='ThumbsUpIcon')
                  feather-icon.style-icon.p-0(@click.stop='abrirAsignarRol(tr.id)', :title='$t("Asignar Rol(es)")', icon='UserIcon')
              vx-td.text-left(:data='tr.nombre_usuario' ) {{ tr.nombre_usuario }}
              vx-td.text-left(:data='tr.nombres') {{ tr.nombres }}
              vx-td.text-left(:data='tr.apellidos') {{ tr.apellidos }}
              vx-td.text-left(:data='tr.correo') {{ tr.correo }}
              vx-td.text-center(:data='tr.bloqueado')
                span(v-if="tr.bloqueado" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')                
              vx-td.text-center(:data='tr.cambio_pendiente_clave')
                span(v-if="tr.cambio_pendiente_clave" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon') 
              vx-td.text-left(:data='tr.ultimo_login') {{ convertirFecha(tr.ultimo_login) }}
              vx-td.text-center(:data='tr.estado') 
                span.justify-center(v-if='tr.estado') {{ $t("ACTIVO") }}
                span.justify-center(v-else) {{ $t("INACTIVO") }}
    
    
    formulario-usuario-sistema( ref="FormularioUsuarioSistema" v-model="sidebarActivo" :parametro.async='parametro' @cancel='cerrarSidebar')
</template>

<script>
import helperFunctions from '@/functions';
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import VxSidebarPersonalized from '@/components/VxSidebarPersonalized';
import Cabecera from '@/components/header/Header.vue';
import FormularioUsuarioSistema from '@/project/views/usuario_sistema/FormularioUsuarioSistema.vue';

export default {
  mixins: [request],
  components: {
    Cabecera,
    VxSidebarPersonalized,
    //FormularioUsuarioSistema,

    FormularioUsuarioSistema
  },
  data() {
    return {
      value1: '',
      nombreAutorizacion: 'usuario-sistema',
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
              //onst EXPREG_CORREO = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/"; //EXPRESION REGULAR PARA VALIDAR CORREO.
              { id: 'nombreUsuario', label: 'NOMBRE DE USUARIO', type: 'numberMultiple', pattern: '[0-9a-zA-Z,]' },
              { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ['[a-zA-Z0-9]'] },
              { id: 'apellidos', label: 'APELLIDOS', type: 'text', pattern: ['[a-zA-Z0-9]'] },
              { id: 'correo', label: 'CORREO ELECTRÓNICO', type: 'text', pattern: ['[\\S]']},
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda',
          },
        },
        {
          type: 'radio',
          title: 'PENDIENTE DE CAMBIO DE CLAVE',
          alias: 'pendiente',
          closable: false,
          expand: true,
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
          title: 'BLOQUEADO',
          alias: 'bloqueado',
          closable: false,
          expand: true,
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
          title: 'ESTADO',
          alias: 'estado',
          closable: false,
          expand: true,
          action: false,
          hidden: false,
          options: {
            model: 'ACTIVO',
            value: 'ACTIVO',
            count: [
              {
                value: 'ACTIVO',
                label: 'ACTIVO'
              },
              {
                value: 'INACTIVO',
                label: 'INACTIVO'
              }
            ]
          }
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
    convertirFecha(date){
      return helperFunctions.convertirFechaLocal(date);
    },
    abrirAsignarRol(id) {
      this.$router.push(`/usuario-sistema/asignar/${id}`)
    },
    async listarTodo() {
      try {
        this.$vs.loading({ type: 'point' });
        this.filtros = helperFunctions.filterCleanAll(this.filtros);
        this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
        await this.listar();
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
      
      
    },
    abrirFiltro() {
      this.filterActive = true;
    },
    async confirmFilter(filters) {
      try {
        this.$vs.loading({ type: 'point' });
        this.filterActive = false;
        this.filtros = filters;
        this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
        await this.listar();
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
      
    },
    closeFilter() {
      this.filterActive = false;
    },
    async listar() {
      try {
        //console.log(this.isMounted)
        //if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_usuario_back_office?';
        params += `nombre_usuario=${obj.criterio0.nombreUsuario}&`;
        params += `nombres=${obj.criterio0.nombres}&`;
        params += `apellidos=${obj.criterio0.apellidos}&`;
        params += `correo=${obj.criterio0.correo}&`;
        params += `bloqueado_flag=${obj.bloqueado == '' ? '' : obj.bloqueado == 'VERDAD' ? true : false}&`;
        params += `cambio_pendiente_clave_flag=${obj.pendiente == '' ? '' : obj.pendiente == 'TRUE' ? true : false}&`;
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
      } /* finally {
        if (this.isMounted) this.$vs.loading.close();
      } */
    },
    async exportar() {
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'exportar_listar_usuario_back_office?';
        params += `nombre_usuario=${obj.criterio0.nombreUsuario}&`;
        params += `nombres=${obj.criterio0.nombres}&`;
        params += `apellidos=${obj.criterio0.apellidos}&`;
        params += `correo=${obj.criterio0.correo}&`;
        params += `bloqueado_flag=${obj.bloqueado == '' ? '' : obj.bloqueado == 'VERDAD' ? true : false}&`;
        params += `cambio_pendiente_clave_flag=${obj.pendiente == '' ? '' : obj.pendiente == 'TRUE' ? true : false}&`;
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
    async desbloquear(id) {
      try {        
        const { value } = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: '¿Está seguro que desea desbloquear el registro de usuario?',
          showCancelButton: true,
          confirmButtonText: this.$t('Aceptar'),
          cancelButtonText: this.$t('Cancelar'),
        });
        if (value) {
          this.$vs.loading({ type: 'point' });
          let put = { id: id };
          put.ip = await require('public-ip').v4();
          let { data } = await this.requestApi('desbloquear_usuario_back_office', put, 'PUT');
          const response = data.data;
          if (response.estado) {
            this.responseRequest(response);
            await this.listar();
          } else {
            this.sweetAlert(response);
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
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
