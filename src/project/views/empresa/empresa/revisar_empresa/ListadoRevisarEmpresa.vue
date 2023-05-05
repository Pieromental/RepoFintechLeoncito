<template lang="pug">  
  div#parentx-revisarempresa
    cabecera(:titulo="$t('REVISAR EMPRESAS')"  @exportar="exportar"  @listarTodo="listarTodo" @filtrar="abrirFiltro" :btnListarTodo="true" :btnFiltrar="true" :btnNuevo="false")      
    vx-card.card-sticky
      vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" @remove='removeChip')
      vx-filter(ref="filterEmpresa" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-revisarempresa" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")           
      vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
        template(slot="thead")
          vx-th.uppercase(center min-width="120") {{$t('Acciones')}}
          vx-th.uppercase(center min-width="430") {{$t('Empresa')}}
          vx-th.uppercase(center min-width="430") {{$t('Contacto')}}
          vx-th.uppercase(center min-width="415") {{$t('Revisión')}}
          vx-th.uppercase(sort-key="ultima_fecha_modificacion" min-width="150") {{$t('Última Actualización')}}
        template(slot-scope="{data}")
          tbody(class="table-text-sm")
            vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
              vx-td.text-center
                vx-button-table( :primary="tr.boton_revisar_azul" icon="CheckCircleIcon" @click="revisar(tr.id)") {{$t('Revisar')}}
              vx-td(:data='tr.nombre_comercial')
                div.vx-row
                  div.vx-col.w-full.d-f
                    span.font-label.bold-table {{ tr.nombre_comercial }}
                    vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:'RUC: ',description:tr.ruc}, {subTitle:'Riesgo: ',description: tr.detalle_riesgo}, {subTitle:'Actividad Económica: ',description: tr.detalle_actividad_economica}, {subTitle:'Estado: ',description: tr.descripcion_estado_usuario} ]")
                        feather-icon.style-icon-table.ml-2( icon="BriefcaseIcon" )
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.ruc }}
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.razon_social }}
              vx-td(:data='tr.nombre')
                div.vx-row
                  div.vx-col.w-full.d-f
                    span.font-label.bold-table {{ tr.nombre }}
                    vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:'Sexo: ',description:tr.detalle_genero}, {subTitle:'Actividad Económica: ',description: tr.detalle_actividad_economica}, {subTitle:'Tipo Documento: ',description: tr.detalle_tipo_documento}, {subTitle:'Número Documento: ',description: tr.numero_documento}, {subTitle:'Fecha Nacimiento: ',description: tr.fecha_nacimiento}, {subTitle:'Tipo de Responsabilidad: ',description: tr.detalle_tipo_responsabilidad}, {subTitle:'Departamento: ',description: tr.ubigeo_descripcion_departamento}, {subTitle:'Provincia: ',description: tr.ubigeo_descripcion_provincia}, {subTitle:'Distrito: ',description: tr.ubigeo_descripcion_distrito}, {subTitle:'Dirección: ',description: tr.direccion_completa} ]")
                      feather-icon.style-icon-table.ml-2( :title="`${$t('Usuario')}`" icon="UserIcon" )
                div.vx-row
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.telefono }}
                  div.vx-col(class="sm:w-1/2")
                    span.font-label {{ tr.correo_electronico }}
              vx-td
                vx-chip(v-if='tr.revision_usuario' color="primary" transparent ) {{$t('Información General')}}
                vx-chip(v-if='tr.revision_representante_legal' color="success" transparent ) {{$t('Representante Legal')}}
                vx-chip(v-if='tr.revision_cuenta_bancaria' color="warning" transparent ) {{$t('Cuenta Bancaria')}}
              vx-td(:data='tr.ultima_fecha_modificacion')
                div.vx-row
                  div.vx-col.w-full
                    span.font-label.bold-table {{convertirDia(tr.ultima_fecha_modificacion)}}
                div.vx-row
                  div.vx-col.w-full
                    span.font-label {{convertirHora(tr.ultima_fecha_modificacion)}}                
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import VxButtonTable from '@/components/buttons/ButtonTable.vue';
import VxChip from '@/components/chips/Chip.vue';
import PopupInactivacion from "@/project/views/empresa/empresa/popup/PopupInactivarUsuario.vue";
import PopupCambiarRiesgo from "@/project/views/empresa/empresa/popup/PopupCambiarRiesgo.vue";

export default {
  name: 'Empresa',
  mixins: [request],
  components: {
    Cabecera,
    PopupInactivacion,
    PopupCambiarRiesgo,
    VxButtonTable,
    VxChip
  },
  data() {
    return {
      isMounted: false,
      listarEmpresa: [],
      filterActive: false,
      ocultarChip: false,
      listarRiesgos:[],
      mostrarPopupInactivacion: false,
      mostrarPopupCambiarRiesgo: false,
      idEnviar:0,
      riesgo:{},  
      filtros: [
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'RIESGO', // este es el título único en el objeto para de la seccion del componente
          alias:  'riesgo', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
            placeholder:  "Seleccione un Riesgo", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'TIPO DE DOCUMENTO', // este es el título único en el objeto para de la seccion del componente
          alias:  'tipoDocumento', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
          closable:  false, // esta key representa el estado de visibilidad de la "x" en los chips
          expand:  false, // esta key representa el estado de inicio de la seccion (si está expandida o contraida)
          action:  true, // esta key representa si tiene una accion
          hidden: false, // esta key representa el estado de visibilidad de la sección
          options: {
            model:  '', // esta key representa el por defecto del select al mostrarse en los chips y en la descripcion de la seccion del componente.
            values:  [], // esta key representa el array de objetos por defecto o que contiene un select por ejemplo la posicion, [{id:  'usuario', label:  'USUARIO' },{ id:  'posicion', label:  'POSICION' }], , pueden ser agignadas desde una consulta a base.
            options: [], // esta key son las opciones del select, pueden ser agignadas desde una consulta a base.
            searchable:  false, // esta key es el estado de busqueda habilitado o deshabilitado que debe de tener el select.
            filterable:  false,// esta key es el estado de filtro habilitado o deshabilitado que debe de tener el select.
            disabled:  false, // esta key es el estado de habilitado o deshabilitado que debe de tener el select.
            placeholder:  "Seleccione un Tipo de Documento", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type: 'criterio',
          title: 'CRITERIO DE BÚSQUEDA',
          alias: 'criterio',
          closable: false,
          expand: false,
          action: true,
          add: true,
          options: {
            model: '',
            options: [             
              { id: 'razonSocial', label: 'RAZÓN SOCIAL', type: 'text', pattern: ["[a-zA-Z\\W\\w\\s,]"] },
              { id: 'nombreComercial', label: 'NOMBRE COMERCIAL', type: 'text', pattern: ["[a-zA-Z\\W\\w\\s,]"] },
              { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: ["[0-9,]"] },
              { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ["[a-zA-Z\\W\\w\\s,]"] },
              { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ["[a-zA-Z,]"] },
              { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ["[a-zA-Z,]"] },
              { id: 'correoElectronico', label: 'CORREO ELECTRÓNICO', type: 'text', pattern: ["[0-9a-zA-Z,]"] },
              { id: 'numeroDocumento', label: 'NÚMERO DE DOCUMENTO', type: 'text', pattern: ["[0-9,]"] },
              { id: 'telefono', label: 'TELÉFONO', type: 'numberMultiple', pattern: ["[0-9,]"] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'ACTIVIDAD ECONÓMICA', // este es el título único en el objeto para de la seccion del componente
          alias:  'actividadEconomica', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
            placeholder:  "Seleccione una Actividad Económica", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type: 'dateRange',
          title: 'FECHA DE NACIMIENTO',
          alias: 'fechaNacimiento',
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
                value: [],
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
          title:  'GÉNERO', // este es el título único en el objeto para de la seccion del componente
          alias:  'genero', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
            placeholder:  "Seleccione un Género", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'TIPO DE RESPONSABILIDAD', // este es el título único en el objeto para de la seccion del componente
          alias:  'tipoResponsabilidad', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
            placeholder:  "Seleccione un Tipo de Responsabilidad", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type:  'select', // esta key representa al tipo de componente que queremos cargar
          multiple:  true, // esta key representa el estado si es multiple o no 
          title:  'DEPARTAMENTO', // este es el título único en el objeto para de la seccion del componente
          alias:  'departamento', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
            placeholder:  "Seleccione un Departamento", // esta key representa el placeholder del select, es personalizable. 
          }
        },
        {
          type: 'tree',
          multiple: true,
          title: 'PROVINCIA',
          alias: 'provincia',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: [],
            aux: [],
            branchDisabled: false,
            flat: true,
            options: [],
            placeholder: 'Seleccion un Departamento',
            searchable: true
          }
        },
        {
          type: 'tree',
          multiple: true,
          title: 'DISTRITO',
          alias: 'distrito',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            value: [],
            aux: [],
            branchDisabled: false,
            flat: true,
            options: [],
            placeholder: 'Seleccion un Departamento',
            searchable: true
          }
        },
        {
          type: 'radio', 
          title: 'BLOQUEADO', 
          alias: 'bloqueado', 
          closable: false, 
          expand: false, 
          action: false, 
          hidden: false, 
          options: {
            model: '', 
            value: '', 
            count: [
              {
                value: 'siBloqueado', 
                label: 'SI' 
              },
              {
                value: 'noBloqueado', 
                label: 'NO' 
              }
            ]
          }
        },
        {
          type: 'dateRange',
          title: 'ÚLTIMA ACTUALIZACIÓN',
          alias: 'ultimaFecha',
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
                value: [],
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
      ]
    };
  },

  computed: {
    listado() {
      return this.listarEmpresa;
    }
  },

  methods: {  

    //Metodos de Registro

    async funcionRevisar(id){
      try {   
        this.$vs.loading({ type: 'point' });
        let ip_actualizacion = await require('public-ip').v4();
        let { data } = await this.requestApi(`validar_revision_usuario?id=${id}&ip=${ip_actualizacion}`);
        let response = data.data;
        return response
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async revisar(id){
      let response = await this.funcionRevisar(id);
      if(response.estado){        
        if(response.data[0].mostrar_interfaz) this.$router.push(`/empresa-empresa-revisar-registro/${id}`);
      }else{
        this.sweetAlert(response);
        await this.listar();
      }
    },

    //METODOS POPUP

    async closePopup() {
      this.mostrarPopupInactivacion = false;
      this.mostrarPopupCambiarRiesgo = false;
      await this.listar();
    },

    //Cargar Filtros
    async cargarRiesgo() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let { data } = await this.requestApi('cargar_riesgo_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'riesgo', response);
          this.listarRiesgos = response;
          this.listarRiesgos = this.listarRiesgos.map((e)=>{
            return {
              id: e.id,
              label: e.object.codigo+" - "+e.object.descripcion
            }
          })
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarTipoDocumento() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_tipo_documento_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoDocumento', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarActividadEconomica() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_actividad_economica_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'actividadEconomica', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    cargarFechaLocal(){
      let fecha = new Date();
      fecha = helperFunctions.convertirFecha(fecha);
      fecha = helperFunctions.obtenerFecha(fecha);
      this.filtros.map( e => {
        if (e.alias == 'fechaNacimiento' || e.alias == "ultimaFecha") {
          e.options.options[1].value = fecha;
        }
      });
    },
    
    async cargarGenero() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_genero_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'genero', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarTipoResponsabilidad() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_tipo_responsabilidad_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoResponsabilidad', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarDepartamento() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_departamento_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'departamento', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarProvincia() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_provincia_empresa');
        let response = data.data || []; 
        if (response.estado) {
          this.filtros.map( e => {
            if (e.alias == 'provincia') {
              if (response.data) e.options.options = this.recursividadChildren(response.data)
              else e.options.options = [];
            }
          });
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarDistrito() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_distrito_empresa');
        let response = data.data || []; 
        if (response.estado) {
          this.filtros.map( e => {
            if (e.alias == 'distrito') {
              if (response.data) e.options.options = this.recursividadChildren(response.data)
              else e.options.options = [];
            }
          });
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarEstado() {
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi('cargar_estado_usuario_empresa');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response);
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },    

    async listar() {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);                
        let { data } = await this.requestApi(`revisar_listar_empresa_bo?id_master_detalle_estado_usuario=${obj.estado.id}&id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&id_ubigeo_departamento=${obj.departamento.id}&id_ubigeo_provincia=${obj.provincia}&id_ubigeo_distrito=${obj.distrito}&id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_genero=${obj.genero.id}&id_master_detalle_riesgo=${obj.riesgo.id}&correo=${obj.criterio0.correoElectronico}&nombres=${obj.criterio0.nombres}&apellido_paterno=${obj.criterio0.apPaterno}&apellido_materno=${obj.criterio0.apMaterno}&numero_documento=${obj.criterio0.numeroDocumento}&dni_flag=&telefono=${obj.criterio0.telefono}&razon_social=${obj.criterio0.razonSocial}&nombre_comercial=${obj.criterio0.nombreComercial}&fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&ruc=${obj.criterio0.ruc}&es_empresa_flag=&bloqueado_flag=${obj.bloqueado == 'siBloqueado' ? true : obj.bloqueado == 'noBloqueado' ? false : ''}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {          
          this.listarEmpresa = response.data;          
        } else {
          this.listarEmpresa = [];
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async exportar(){
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        await this.funcExportar(`exportar_revision_usuario?id_master_detalle_estado_usuario=${obj.estado.id}&id_ubigeo_departamento=${obj.departamento.id}&id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&id_ubigeo_provincia=${obj.provincia}&id_ubigeo_distrito=${obj.distrito}&id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_genero=${obj.genero.id}&id_master_detalle_riesgo=${obj.riesgo.id}&correo=${obj.criterio0.correoElectronico}&nombres=${obj.criterio0.nombres}&apellido_paterno=${obj.criterio0.apPaterno}&apellido_materno=${obj.criterio0.apMaterno}&numero_documento=${obj.criterio0.numeroDocumento}&dni_flag=&telefono=${obj.criterio0.telefono}&razon_social=${obj.criterio0.razonSocial}&nombre_comercial=${obj.criterio0.nombreComercial}&fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&ruc=${obj.criterio0.ruc}&es_empresa_flag=&bloqueado_flag=${obj.bloqueado == 'siBloqueado' ? true : obj.bloqueado == 'noBloqueado' ? false : ''}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&token=${localStorage.getItem('token')}`)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    //Metodos Generales

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

    convertirDia(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      let dia = fecha.split(", ");
      return dia[0];
    },

    convertirHora(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      let hora = fecha.split(", ");
      return hora[1];
    },

    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      this.cargarFechaLocal();
      await this.listar();
    },

    async confirmFilter(filters) {
      this.filterActive = false;
      this.filtros = filters;
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async  removeChip(filter) {
      this.filtros  =  filter;
      await this.listar();
    },

    closeFilter() {
      this.filterActive = false;
    },        

    abrirFiltro() {
     this.filterActive = true;
    },

  },

  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });    
      this.cargarFechaLocal(); 
      await this.cargarRiesgo();
      await this.cargarTipoDocumento();
      await this.cargarActividadEconomica();             
      await this.cargarGenero();             
      await this.cargarTipoResponsabilidad();             
      await this.cargarDepartamento();             
      await this.cargarProvincia();             
      await this.cargarDistrito(); 
      await this.cargarEstado(); 
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
