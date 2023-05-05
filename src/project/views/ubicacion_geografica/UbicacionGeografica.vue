<template lang="pug">  
  div#parentx-ubicacion
    cabecera(:titulo="$t('UBICACIONES GEOGRÁFICAS')" @nuevo='nuevo'  @exportar="exportar"  @listarTodo="listarTodo" :btnListarTodo="true"  @filtrar="abrirFiltro"  :btnFiltrar="true" :btnNuevo="true")
    vx-card.card-sticky
      vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" @remove='removeChip')
      vx-filter(ref="filterUbicacionGeografica" :filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" parent="#parentx-ubicacion" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" @changeNumber='mostrarUbicacionPadre')
      vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
        template(slot="thead")
          vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
          vx-th.uppercase(sort-key="codigo_padre" min-width="100") {{$t('Ubicación  Padre')}}
          vx-th.uppercase(sort-key="codigo" min-width="100") {{$t('Código')}}
          vx-th.uppercase(sort-key="descripcion" min-width="200") {{$t('Descripción')}}
          vx-th.uppercase(sort-key="nivel" min-width="40") {{$t('Nivel')}}
          vx-th.uppercase(sort-key="tiene_detalle" min-width="40") {{$t('Tiene Detalle')}}
          vx-th.uppercase(sort-key="estado" min-width="100") {{$t('Estado')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr(:class="{'style-danger-vxtable'  :  !tr.estado }" :data="tr" :key="indextr" v-for="(tr,indextr) in data")
              vx-td.text-center
                .d-f.vs-justify-center
                  feather-icon.style-icon.p-0( @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')
                  feather-icon.style-icon.p-0( @click.stop="editar(tr.id)" :title="$t('Modificar')" icon='Edit3Icon')
              vx-td.text-left(:data="tr.codigo_padre") {{tr.codigo_padre}}
              vx-td.text-left(:data="tr.codigo") {{tr.codigo}} 
              vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
              vx-td.text-right(:data="tr.nivel") {{tr.nivel}}
              vx-td.text-center(:data="tr.tiene_detalle")
                span(v-if="tr.tiene_detalle" class="justify-center")
                  feather-icon.style-icon.p-0(icon='CheckIcon')
                span(v-else class="justify-center") 
                  feather-icon.style-icon.p-0(icon='XIcon')
              vx-td.text-center(:data="tr.estado")
                span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
                span(v-else class="justify-center") {{$t('INACTIVO')}}
    formulario-ubicacion-geografica( ref="FormularioUbicaciones" v-model="sidebarActivo" @cancelar='cerrarSidebar' :parametro.async="parametro")

</template>

<script>
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import FormularioUbicacionGeografica from "@/project/views/ubicacion_geografica/FormularioUbicacionGeografica.vue";

export default {
  name: 'UbicacionGeografica',
  mixins: [request],
  components: {
    Cabecera,
    FormularioUbicacionGeografica
  },
  data() {
    return {
      listarUbicacion: [],
      activo: false,
      filterActive: false,
      ocultarChip: false,
      parametro: {},
      sidebarActivo: false,
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
              { id: 'descripcion', label: 'DESCRIPCIÓN', type: 'numberMultiple', pattern: ["[\\w\\s]"] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type:  'number', // esta key representa al tipo de componente que queremos cargar
          title:  'NIVEL', // este es el título único en el objeto para de la seccion del componente
          alias:  'nivel', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable:  false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand:  false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action:  true, // esta key representa si tiene una accion
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model:  '', // esta key representa el valor que tiene el input además de mostrarse en los chips y en la descripcion de la seccion del componente.
            disabled:  false, // esta key es el estado de habilitado o deshabilitado que debe de tener el input
            placeholder:  'Ingrese Nivel', // esta key representa el placeholder del input, es personalizable. 
            characters:  0, // esta key representa la longitud del campo. 
            pattern: ["[123]" ] // esta key representa el valor del regex.             
          }
        },
        {
          type: 'radio', // esta key representa al tipo de componente que queremos cargar
          title: 'TIENEN DETALLE', // este es el título único en el objeto para de la seccion del componente
          alias: 'tieneDetalle', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable: false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand: false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action: false, // esta key representa si tiene una acción.
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model: '', //  esta key es la descripcion del radio, representa el valor para mostrarse en los chips y en la descripcion de la seccion del componente.
            value: '', //  esta key es el value, por lo que si se quiere colocar un radio por defecto se debe de tomar el value de contenido en el count.
            count: [
              {
                value: 'SI', //  esta key es única, adémas es el value del radio tanto para el mapeo como para saber su estado.
                label: 'SI' //  esta key representa la cadena a mostrar en el radio.
              },
              {
                value: 'NO', //  esta key es única, adémas es el value del radio tanto para el mapeo como para saber su estado.
                label: 'NO' //  esta key representa la cadena a mostrar en el radio.
              }
            ]
          }
        },
        {
          type: 'tree',
          multiple: true,
          title: 'UBICACIÓN PADRE',
          alias: 'ubicacionPadre',
          closable: false,
          expand: false,
          action: true,
          hidden: true,
          options: {
            model: '',
            value: [],
            aux: [],
            branchDisabled: false,
            flat: true,
            options: [],
            placeholder: 'Seleccione una Ubicación Padre',
            searchable: true
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
      return this.listarUbicacion;
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

    async  removeChip(filter) {
      this.filtros  =  filter
      await this.listar()
    },

    closeFilter() {
      this.filterActive = false;
    },
    
    nuevo(){
      this.parametro = { accion: 'nuevo', data: null };
      this.sidebarActivo = true;     
    },

    async editar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_ubigeo_bo?id=${id}`);
        let response = data.data;
        if(response.estado){
          this.parametro = { accion: 'editar', data: response.data[0] };
          this.sidebarActivo = true; 
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }      
    },

    async ver(id) {
      try {
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_ubigeo_bo?id=${id}`);
        let response = data.data;
        if(response.estado){
          this.parametro = { accion: 'ver', data: response.data[0] };
          this.sidebarActivo = true; 
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }  
    },

    async exportar(){
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        await this.funcExportar(`exportar_ubigeo_bo?id=&id_ubigeo_padre=${obj.ubicacionPadre}&codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&nivel=${obj.nivel}&tiene_detalle_flag=${obj.tieneDetalle == 'SI' ? true : obj.tieneDetalle == 'NO' ? false : ''}&estado=${obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}&token=${localStorage.getItem('token')}`)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    abrirFiltro() {
     this.filterActive = true;
    },

    async listar() {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let obj = helperFunctions.mapFilters(this.filtros);        
        let { data } = await this.requestApi(`listar_ubigeo_bo?id=&id_ubigeo_padre=${obj.ubicacionPadre}&codigo=${obj.criterio0.codigo}&descripcion=${obj.criterio0.descripcion}&nivel=${obj.nivel}&tiene_detalle_flag=${obj.tieneDetalle == 'SI' ? true : obj.tieneDetalle == 'NO' ? false : ''}&estado=${obj.estado == 'ACTIVO' ? true : obj.estado == 'INACTIVO' ? false : ''}`);        
        let response = data.data;   
        if (response.estado) {
          this.listarUbicacion = response.data;
        } else {
          this.listarUbicacion = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    async cerrarSidebar(estado = true) {
      this.parametro = {};
      this.sidebarActivo = false;
      if (estado) {
        await this.listar();
      }
    },

    async mostrarUbicacionPadre(obj){  
      if(!obj) return;
      if(obj.value > 1){
        await this.cargarUbicacionPadre(obj.value);
        this.$refs.filterUbicacionGeografica.reactHidden('tree', 'UBICACIÓN PADRE', false);
      }else{
        this.$refs.filterUbicacionGeografica.reactHidden('tree', 'UBICACIÓN PADRE', true);
      }
    },

    async cargarUbicacionPadre(Aux) {
      try {
        this.$vs.loading({ type: 'point' });  
        let { data } = await this.requestApi(`cargar_arbol_activos_ubigeo_bo?nivel=${ Aux }`);
        let response = data.data || []; 
        if (response.estado) {
          this.$refs.filterUbicacionGeografica.inserDataTree('tree', 'UBICACIÓN PADRE', this.recursividadChildren(response.data));
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    recursividadChildren(data) {
      let recurData = [];
      let contador = 0;
      if (data) {
        data.forEach((element) => {
          if (element.estado) {
            let value = {};
            value.id =  element.id;
            value.codigo =  element.codigo;
            value.label =  `${element.descripcion}`;
            value.nivel = Number(element.nivel);
            value.descripcion =  element.descripcion;
            value.estado =  element.estado;
            value.isDisabled =  false;
            recurData.push(value);
            if (element.hasOwnProperty('children')) {
              recurData[contador].children = this.recursividadChildren(element.children);
            }
            contador++;
          }
        });
        return recurData;
      }
    },

  },

  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });      
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
