<template lang="pug">
  div#parentx-ejemplo
    vx-header(:titulo="$t('Ejemplo')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="openFilter"  :btnFiltrar="true")
    vx-card.card-sticky
      vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filters" :hidden="hiddenChip")
      vx-filter(ref="filter" :filtersParent="filters" :positionRight="true" title="FILTRAR POR" parent="#parentx-ejemplo" color="primary" :active="activeFilter" @closeFilter='closeFilter' @confirmFilter="confirmFilter")
      vx-table.style-vxtable(idRef="listaEjemplo" ref="containerTable" :title="''" header header-sticky search search-sticky max-content pagination rowsPage :arrayRows='[25,50,100]' :data="listado" :no-data-text="`${$t('No se encontraron registros')}`")
        template(slot="thead")
          vx-th.uppercase( min-width="120" center) {{$t('Acciones')}}
          vx-th.uppercase( min-width="220" sort-key="empresa_nombre") {{$t('Empresa')}}
          vx-th.uppercase( min-width="220" sort-key="contacto_nombre") {{$t('Contacto')}}
          vx-th.uppercase( min-width="300" sort-key="revision") {{$t('Revision')}}
          vx-th.uppercase( min-width="100" sort-key='fecha_dia') {{$t('Fecha')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr( :data="tr" :key="indextr" v-for="(tr,indextr) in data")
              vx-td.text-center
                vx-button-table( :primary="tr.button" icon="CheckCircleIcon" @click="btnRevisar(tr.id)") {{$t('Revisar')}}
              vx-td(:data='tr.empresa_nombre')
                div.vx-row
                  div.vx-col.w-full.d-f
                    span.font-label.bold-table {{ tr.empresa_nombre }}
                    vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:'Empresa: ',description:tr.empresa_nombre}, {subTitle:'Sexo: ',description: 'MASCULINO'}, {subTitle:'Tipo Documento: ',description: 'DNI'} ]")
                        feather-icon.style-icon-table.ml-2( icon="BriefcaseIcon" )
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.empresa_ruc }}
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.empresa_razon_social }}
              vx-td(:data='tr.contacto_nombre')
                div.vx-row
                  div.vx-col.w-full.d-f
                    span.font-label.bold-table {{ tr.contacto_nombre }}
                    feather-icon.style-icon-table.ml-2( :title="`${$t('Usuario')}`" icon="UserIcon" )
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.contacto_telefono }}
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.contacto_correo }}
              vx-td(:data='tr.revision')
                vx-chip( color="primary" transparent ) pruebita 1
                vx-chip( color="success" transparent ) pruebita 2
                vx-chip( color="warning" transparent ) pruebita 3
              vx-td(:data='tr.fecha_dia')
                div.vx-row
                  div.vx-col.w-full
                    span.font-label.bold-table {{ tr.fecha_dia }}
                div.vx-row
                  div.vx-col.w-full
                    span.font-label {{ tr.fecha_hora }}
                    
        //-feather-icon.style-icon( @click.stop="editar(tr)" :title="`${$t('Modificar')}`" icon="Edit3Icon" )

    formulario-ejemplo( ref="FormularioEjemplo" v-model="activeForm" :parametro.async='parametro' @cancel='cancel')

</template>

<script>

import helperFunctions from "@/functions";
import request from '@/mixins/mixinRequest';

import VxHeader from '@/components/header/Header.vue'; 
import VxButtonTable from '@/components/buttons/ButtonTable.vue';
import VxChip from '@/components/chips/Chip.vue';
import FormularioEjemplo from '@/project/views/ejemplo/FormularioEjemplo.vue';

import swal from 'sweetalert2';

export default {

  name: 'ListadoEjemplo',

  mixins: [request],
  components: {
    VxHeader,
    VxButtonTable,
    VxChip,
    FormularioEjemplo
  },

  data(){
    return {

      listarEjemplo: [],
      
      parametro: {},
      activeForm: false,

      html: '',
      
      activeFilter: false,
      hiddenChip: false,
      filters: [
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
              { id: 'nombre', label: 'NOMBRE', type: 'text', pattern: ["[\\W\\w\\s]"] },
              { id: 'telefono', label: 'TELEFONO', type: 'numberMultiple', pattern: "[0-9+,]" }
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type: 'radio',
          title: 'ESTADO',
          alias: 'estado',
          closable: false,
          expand: false,
          action: false,
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
        }
      ],
    }
  },

  computed: {
    listado() {
      return this.listarEjemplo;
    }
  },

  watch: {

  },

  methods: {

    clickEmpresa(id){
      console.log("clickEmpresa=>",id);
    },

    btnRevisar(id){
      console.log("btnRevisar=>",id);
    },

    async listarTodo() {
      this.filters = helperFunctions.filterCleanAll(this.filters)
      this.hiddenChip = helperFunctions.hiddenChipFilter(this.filters);
      await this.listar();
    },
    
    openFilter() {
      this.activeFilter = true;
    },

    closeFilter() {
      this.activeFilter = false;
    },
    
    async confirmFilter(filters) {
      this.activeFilter = false
      this.filters = filters
      this.hiddenChip = helperFunctions.hiddenChipFilter(this.filters);
      await this.listar();
    },

    async listar(obj = null) {
      try {
        if(!this.isMounted){
          this.listarEjemplo = [
            { id: 1, button: true, empresa_nombre: 'GLORIA', empresa_ruc: '121987654001', empresa_razon_social: 'GRUPO GLORIA', contacto_nombre: 'JUAN QUISPE MAMANI', contacto_telefono: '+51987654001', contacto_correo: 'juan_q@gmaill.com', fecha_dia: '08/06/2022', fecha_hora: '12:12:12' },
            { id: 2, button: false, empresa_nombre: 'GLORIA', empresa_ruc: '121987654002', empresa_razon_social: 'GRUPO GLORIA', contacto_nombre: 'MARIA CESPEDES CRESPO', contacto_telefono: '+51987654002', contacto_correo: 'maria_c@gmaill.com', fecha_dia: '08/06/2022', fecha_hora: '12:12:12' },
            { id: 3, button: false, empresa_nombre: 'GLORIA', empresa_ruc: '121987654003', empresa_razon_social: 'GRUPO GLORIA', contacto_nombre: 'ROSA DEL ROSARIO', contacto_telefono: '+51987654003', contacto_correo: 'rosa_r@gmaill.com', fecha_dia: '08/06/2022', fecha_hora: '12:12:12' },
            { id: 4, button: false, empresa_nombre: 'GLORIA', empresa_ruc: '121987654001', empresa_razon_social: 'GRUPO GLORIA', contacto_nombre: 'JUAN QUISPE MAMANI', contacto_telefono: '+51987654001', contacto_correo: 'juan_q@gmaill.com', fecha_dia: '08/06/2022', fecha_hora: '12:12:12' }
          ];
        }else{
          if(obj) this.listarEjemplo.push(obj);
        }
        this.isMounted = true;
      } catch (error) {
        throw new Error(error);
      }
    },

    exportar(){

    },

    nuevo(){
      this.parametro = { accion: 'nuevo', data: null };
      this.activeForm = true;
    },

    editar(tr) {
      this.parametro = { accion: 'editar', data: tr };
      this.activeForm = true;
    },

    ver(tr){
      this.parametro = { accion: 'ver', data: tr };
      this.activeForm = true;
    },
    
    async cancel(estado = true) {
      this.parametro = {};
      this.activeForm = false;
      if (estado) {
        //await this.listar();
      }
    },

    async deshabilitar(indextr) {
      this.listarEjemplo.forEach( (element,index) => {
        if( indextr==index ){
          element.estado = !element.estado;
        }
      });
    },

    // async eliminar(indextr) {
    //   let status = await swal.fire({ title: "Mensaje del Sistema", text: "¿Está seguro de que desea eliminar el presupuesto?", showConfirmButton: true, showCancelButton: true, confirmButtonText: "Sí", cancelButtonText: "No" });
    //   if(!status.value) return
    //   console.log("ELIMINAR");
    // },
    
  },

  async mounted() {
    try {
      // this.$vs.loading({ type: "point" });
      this.html = `Comuniquese <br> Código: `;
      await this.listar();
    } catch (error) {
      throw new Error(error);
    } finally {
      // this.$vs.loading.close();
    }
  },
  
};

</script>