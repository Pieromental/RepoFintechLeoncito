<template lang="pug">
  div
    div.demo-alignment
      vx-popup.width_popup_cuenta_contable_formulario(:title="$t('Búsqueda de Usuarios')" :active='popupActive' @close="closePopup" :click-not-close="false" fullscreen classContent="popup-example")
        div.mb-5.mx-4.vx-row.vs-justify-flex-end
          div.vx-row
            vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
            vs-button.mx-2.my-1.full( @click="openFilter" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
    
        vx-filter-chip.mb-5(title="Filtros"  :hidden="hiddenChip" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros")
        vx-filter(:filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" :parent="parentx" color="primary" :active="activo" @closeFilter='closeFilter' @confirmFilter="confirmFilter")
    
        div.mx-3
          strong
            small.text-danger {{ "** " + $t("Haga doble click para seleccionar un usuario") }}
    
        vx-table.style-vxtable(search tab pagination max-items="5" :data="listado" rowsPage :arrayRows='[25,50,100]' @dblClick="selectedAccount" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase( min-width="120" sort-key="nombre_usuario") {{$t('Usuario')}}
            vx-th.uppercase( min-width="150" sort-key="nombres") {{$t('Nombres')}}
            vx-th.uppercase( min-width="90" sort-key="apellidos") {{$t('Apellidos')}}
            vx-th.uppercase( min-width="90" sort-key="correo") {{$t('Correo')}}
            vx-th.uppercase( min-width="90" sort-key="estado" center ) {{$t('Estado')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:class="{'style-danger-vxtable' : !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-left(:data="tr.nombre_usuario") {{tr.nombre_usuario}}
                vx-td.text-left(:data="tr.nombres") {{tr.nombres}}
                vx-td.text-center(:data="tr.apellidos") {{tr.apellidos}}
                vx-td.text-left(:data="tr.correo") {{tr.correo}}
                vx-td.text-center(:data="tr.estado")
                  span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
                  span(v-else class="justify-center") {{$t('INACTIVO')}}

</template>

<script>

import helperFunctions from '@/functions';
import request from '@/mixins/mixinRequest';
export default {
  name: 'PopupCuentaContableFormulario',
  mixins: [request],
  components: {},
  props: {
    popupActive: {
      type: Boolean,
      default: false
    },
    company: {
      type: String,
      default: ''
    },
    lengthRestriction: {
      type: Number,
      default:0,
    }
  },
  data() {
    return {
      parentx: '#parentx-popup-cuenta-contable-formulario',
      activo: false,
      hiddenChip: true,
      listadoUsuarios: [],
      filtros: [
        {
          type: 'criterio',
          title: 'CRITERIO DE BÚSQUEDA',
          alias: 'criterio',
          closable: false,
          expand: true,
          action: false,
          options: {
            model: '',
            options: [
                { id: 'usuario', label: 'USUARIO', type: 'numberMultiple', pattern:['[0-9,]'] },
                { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ['[\\W\\w\\s]']  },
                { id: 'apellidos', label: 'APELLIDOS', type: 'text', pattern: ['["\\w!<>¡?¿^()*|°¬+{}:,;&%$#=\\[\\]\\\\/\'\\d.-\\s]']  },
                { id: 'correo', label: 'CORREO', type: 'text', pattern: ['[\\W\\w\\s]']  }
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type: 'singleCheck',
          title: 'BÚSQUEDA EXACTA',
          alias: 'busquedaExacta',
          single: true,
          action: false,
          options: {
            model: '',
            value: false
          }
        },
      ],
    };
  },
  computed: {
    listado() {
      return this.listadoUsuarios;
    }
  },
  watch: {
    async popupActive(val){
      this.activo = false;
      if(val){
        await this.listarTodo();
      }
    }
  },
  methods: {
    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listarUsuarios();
    },
    openFilter() {
      this.activo = true;
    },
    async confirmFilter(filtros) {
      this.activo = false;
      this.filtros = filtros;
      this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listarUsuarios();
    },
 
    closeFilter() {
      this.activo = false;
    },
    async listarUsuarios() {
      try {
        
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        console.log(obj)
        let params = "listar_usuarios_no_asignados?";
        params += `id=${this.$route.params.id}&`;
        params += `nombre_usuario=${obj.criterio0.usuario}&`;
        params += `nombres=${obj.criterio0.nombres}&`;
        params += `apellidos=${obj.criterio0.apellidos}&`;
        params += `correo=${obj.criterio0.correo}&`;
        params += `busqueda_exacta=${obj.busquedaExacta == "SI" ? true : false}`;
        
        let { data } = await this.requestApi(params);

        
        let response = data.data;
        if (response.estado) {
          this.listadoUsuarios = response.data;
        } else {
          this.listadoUsuarios = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    selectedAccount(tr) {
      if(!tr.estado) return this.notification(this.$t('Advertencia'), this.$t('No se pueden seleccionar registros en estado inactivo.'), 'warning',5000,'icon-alert-circle');
      //if(tr.idCuentaContable.length>this.lengthRestriction) return this.notification(this.$t('Advertencia'), this.$t('La información seleccionada no cumple con las restricciones de campo.'), 'warning',5000,'icon-alert-circle');
      
      
      this.$emit('selectedAccount',tr);
      this.listadoUsuarios = [];
    },
    async closePopup() {
      this.listadoUsuarios = [];
      this.$emit('closePopup');
    },
  },
  async mounted() {
    try {
      this.filtros = helperFunctions.loaderFilters(this.filtros);
      this.hiddenChip = helperFunctions.hiddenChipFilter(this.filtros);
      //this.listarUsuarios();
    } catch (error) {
      throw new Error(error);
    }
  }
};
</script>
