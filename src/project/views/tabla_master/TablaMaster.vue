<template lang="pug">  
  div#parentx-master
    div
      cabecera(:titulo="$t('TABLAS MASTER')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true" :btnNuevo="true")
      vx-card.card-sticky
        vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" )
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" parent="#parentx-master" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="codigo" min-width="100") {{$t('Código')}}
            vx-th.uppercase(sort-key="descripcion" min-width="200") {{$t('Descripción')}}
            vx-th.uppercase(sort-key="estado" min-width="100") {{$t('Estado')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:class="{'style-danger-vxtable'  :  !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')
                    feather-icon.style-icon.p-0( @click.stop="editar(tr.id)" :title="$t('Modificar')" icon='Edit3Icon')
                vx-td.text-left(:data="tr.codigo") {{tr.codigo}}
                vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
                vx-td.text-center(:data="tr.estado")
                  span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
                  span(v-else class="justify-center") {{$t('INACTIVO')}}
                  
</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';

export default {

  name: 'TablaMaster',
  mixins: [request],

  components: {
    Cabecera
  },

  data() {
    return {
      listarMaster: [],
      activo: false,
      filterActive: false,
      ocultarChip: false,
      isMounted: false,
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
              { id: 'codigo', label: 'CÓDIGO', type: 'numberMultiple', pattern: ["[0-9a-zA-Z,]"] },
              { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'text', pattern: ["[\\w\\s]"] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type: 'radio', // esta key representa al tipo de componente que queremos cargar
          title: 'ESTADO', // este es el título único en el objeto para de la seccion del componente
          alias: 'estado', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable: false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand: false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action: false, // esta key representa si tiene una acción.
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model: 'ACTIVO', //  esta key es la descripcion del radio, representa el valor para mostrarse en los chips y en la descripcion de la seccion del componente.
            value: 'ACTIVO', //  esta key es el value, por lo que si se quiere colocar un radio por defecto se debe de tomar el value de contenido en el count.
            count: [
              {
                value: 'ACTIVO', //  esta key es única, adémas es el value del radio tanto para el mapeo como para saber su estado.
                label: 'ACTIVO' //  esta key representa la cadena a mostrar en el radio.
              },
              {
                value: 'INACTIVO', //  esta key es única, adémas es el value del radio tanto para el mapeo como para saber su estado.
                label: 'INACTIVO' //  esta key representa la cadena a mostrar en el radio.
              }
            ]
          }
        }
      ]
    };
  },

  computed: {
    listado() {
      return this.listarMaster;
    }
  },

  methods: {    

    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros)
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
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

    closeFilter() {
      this.filterActive = false;
    },

    async listar() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let obj = helperFunctions.mapFilters(this.filtros);        
        let { data } = await this.requestApi(`listar_bo?codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&estado=${ obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}`);        
        let response = data.data;   
        if (response.estado) {
          this.listarMaster = response.data;
        } else {
          this.listarMaster = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    
    async exportar(){
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);        
        await this.funcExportar(`exportar_master_bo?codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&estado=${obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}&token=${localStorage.getItem('token')}`)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    nuevo(){
      this.$router.push('/tabla-master/nuevo');
    },

    editar(id){
      this.$router.push(`/tabla-master/editar/${id}`);
    },
    
    ver(id){
      this.$router.push(`/tabla-master/ver/${id}`);
    },
    
  },

  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      this.filtros = helperFunctions.loaderFilters(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
      this.isMounted = true
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  }

};

</script>