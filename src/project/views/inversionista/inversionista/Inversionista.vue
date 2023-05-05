<template lang="pug">  
  div#parentx-inversionista
    div
      cabecera(:titulo="$t('INVERSIONISTAS')"  @exportar="exportar"  @listarTodo="listarTodo" @filtrar="abrirFiltro" :btnListarTodo="true" :btnFiltrar="true" :btnNuevo="false")      
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-monto" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" )
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="200") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="nombres" min-width="200") {{$t('Nombres Completos')}}
            vx-th.uppercase(sort-key="descripcion_genero" min-width="100") {{$t('Género')}}
            vx-th.uppercase(sort-key="correo_electronico" min-width="200") {{$t('Correo Electrónico')}}
            vx-th.uppercase(sort-key="telefono" min-width="100") {{$t('Teléfono')}}
            vx-th.uppercase(sort-key="descripcion_documento" min-width="200") {{$t('Tipo de Documento')}}
            vx-th.uppercase(sort-key="numero_documento" min-width="100") {{$t('Número de Documento')}}
            vx-th.uppercase(sort-key="fecha_nacimiento" min-width="40") {{$t('Fecha de Nacimiento')}}
            vx-th.uppercase(sort-key="descripcion_responzabilidad" min-width="40") {{$t('Tipo de Responsabilidad')}}
            vx-th.uppercase(sort-key="ruc" min-width="100") {{$t('Ruc')}}
            vx-th.uppercase(sort-key="razon_social" min-width="200") {{$t('Razón Social')}}
            vx-th.uppercase(sort-key="descripcion_tipo_trabajo" min-width="100") {{$t('Tipo de Trabajo')}}
            vx-th.uppercase(sort-key="descripcion_actividad_economica" min-width="200") {{$t('Actividad Económica')}}
            vx-th.uppercase(sort-key="ubigeo_descripcion_departamento" min-width="100") {{$t('Departamento')}}
            vx-th.uppercase(sort-key="ubigeo_descripcion_provincia" min-width="100") {{$t('Provincia')}}
            vx-th.uppercase(sort-key="ubigeo_descripcion_distrito" min-width="100") {{$t('Distrito')}}
            vx-th.uppercase(sort-key="direccion_completa" min-width="200") {{$t('Dirección Completa')}}
            vx-th.uppercase(sort-key="bloqueado_flag" min-width="40") {{$t('Bloqueado')}}
            vx-th.uppercase(sort-key="revisionbo_pendiente_flag" min-width="40") {{$t('Revisión Pendiente')}}
            vx-th.uppercase(sort-key="actualizacionbo_pendiente_flag" min-width="40") {{$t('Actualización Usuario Pendiente')}}    
            vx-th.uppercase(sort-key="estado_flag" min-width="100") {{$t('Estado')}}
            vx-th.uppercase(sort-key="ultimafecha_modificacion_usuario" min-width="100") {{$t('Ultima Fecha de Modificación')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0(@click.stop="ver(tr.id_usuario)"  :title="$t('Ver')" icon='EyeIcon')
                    feather-icon.style-icon.p-0(@click.stop='inactivar(tr.id_usuario,tr.boton_inactivar)', :title='$t("Activar/Inactivar")', icon='UserXIcon')
                    feather-icon.style-icon.p-0(@click.stop='desbloquear(tr.id_usuario,tr.boton_desbloquear)', :title='$t("Desbloquear")', icon='UnlockIcon' )
                    feather-icon.style-icon.p-0(@click.stop="verInversiones(tr.id_usuario,tr.nombres)"  :title="$t('Ver Inversiones')" icon='DollarSignIcon')
                    feather-icon.style-icon.p-0(@click.stop='verHistorial(tr.id_usuario)', :title='$t("Ver Historial de Estados")', icon='LayersIcon')
                vx-td.text-left(:data="tr.nombres") {{tr.nombres}}  {{tr.apellido_paterno}}  {{tr.apellido_materno}}
                vx-td.text-left(:data="tr.descripcion_genero") {{tr.descripcion_genero}}
                vx-td.text-left(:data="tr.correo_electronico") {{tr.correo_electronico}}
                vx-td.text-left(:data="tr.telefono") {{tr.telefono}}
                vx-td.text-left(:data="tr.descripcion_documento") {{tr.descripcion_documento}}
                vx-td.text-left(:data="tr.numero_documento") {{tr.numero_documento}}
                  span(v-if="tr.digito_verficador") {{$t('-')}} {{tr.digito_verficador}}
                vx-td.text-center(:data="tr.fecha_nacimiento") {{tr.fecha_nacimiento}}
                vx-td.text-left(:data="tr.descripcion_responzabilidad") {{tr.descripcion_responzabilidad}}
                vx-td.text-left(:data="tr.ruc") {{tr.ruc}}
                vx-td.text-left(:data="tr.razon_social") {{tr.razon_social}}
                vx-td.text-left(:data="tr.descripcion_tipo_trabajo") {{tr.descripcion_tipo_trabajo}}
                vx-td.text-left(:data="tr.descripcion_actividad_economica") {{tr.descripcion_actividad_economica}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_departamento") {{tr.ubigeo_descripcion_departamento}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_provincia") {{tr.ubigeo_descripcion_provincia}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_distrito") {{tr.ubigeo_descripcion_distrito}}
                vx-td.text-left(:data="tr.direccion_completa") {{tr.direccion_completa}}
                vx-td.text-center(:data="tr.bloqueado_flag")
                  span(v-if="tr.bloqueado_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.revisionbo_pendiente_flag")
                  span(v-if="tr.revisionbo_pendiente_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.actualizacionbo_pendiente_flag")
                  span(v-if="tr.actualizacionbo_pendiente_flag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-left(:data="tr.descripcion_estado_masterdetalle") {{tr.descripcion_estado_masterdetalle}}
                vx-td.text-center(:data="tr.ultimafecha_modificacion_usuario") {{convertirFechaDia(tr.ultimafecha_modificacion_usuario) }} 
      pop-inactivacion(:popupRazonActive="mostrarPopupInactivacion" @closePopup="closePopup" :id="idEnviar")
</template>
<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import PopInactivacion from "@/project/views/inversionista/inversionista/popup/PopInactivarUsuario.vue";
export default {
  name: 'Inversionista',
  mixins: [request],
  components: {
    Cabecera,
    PopInactivacion
  },
  data() {
    return{  
      listarInversionistas:[],
      activo: false,
      filterActive: false,
      ocultarChip: false,
      sidebarActivo: false,
      idEnviar:0,
      inversionista:{
        id:'',
        nombre:'',
      },
      mostrarPopupInactivacion:false,
      filtros: [
        {
          type:  'select', 
          multiple:  true, 
          title:  'TIPO DE DOCUMENTO', 
          alias:  'tipoDocumento', 
          closable:  false, 
          expand:  false, 
          action:  true, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione un Tipo de Documento", 
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
              { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ["[a-zA-ZÀ-ÿ\\s,]"] },
              { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ["[a-zA-ZÀ-ÿ\\s,]"] },
              { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ["[a-zA-ZÀ-ÿ\\s,]"] },             
              { id: 'razonSocial', label: 'RAZON SOCIAL', type: 'numberMultiple', pattern: ["[a-zA-ZÀ-ÿ\\s,]"] },
              { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: ["[0-9,]"] },
              { id: 'correoElecronico', label: 'CORREO ELECTRONICO', type: 'text', pattern: ["[0-9a-zA-Z\\W\\w\\s,]"] },
              { id: 'numeroDocumento', label: 'NUMERO DE DOCUMENTO', type: 'text', pattern: ["[0-9,]"] },
              { id: 'telefono', label: 'TELEFONO', type: 'numberMultiple', pattern: ["[0-9,]"] },
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type:  'select', 
          multiple:  true, 
          title:  'ACTIVIDAD ECONOMICA', 
          alias:  'actividadEconomica', 
          closable:  false, 
          expand:  false, 
          action:  false, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [], 
            options: [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione una Actividad Economica", 
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
          type:  'select',      
          multiple:  true,        
          title:  'GENERO',      
          alias:  'genero',       
          closable:  false,         
          expand:  false, 
          action:  false,        
          hidden: false, 
          options: {
            model:  '', 
            values:  [],
            options: [],
            searchable:  false,
            filterable:  false,
            disabled:  false,      
            placeholder:  "Seleccione un Genero", 
          }
        },
        {
          type:  'select',
          multiple:  true, 
          title:  'TIPO DE RESPONSABILIDAD', 
          alias:  'tipoResponsabilidad',
          closable:  false, 
          expand:  false, 
          action:  false, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [], 
            options: [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione un Tipo de Responsabilidad", 
          }
        },
        {
          type:  'select', 
          multiple:  true,
          title:  'DEPARTAMENTO', 
          alias:  'departamento', 
          closable:  false, 
          expand:  false, 
          action:  false, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [], 
            options: [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione un Departamento", 
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
            placeholder: 'Seleccion un Distrito',
            searchable: true
          }
        },
        {
          type:  'select', 
          multiple:  true,  
          title:  'TIPO DE TRABAJO', 
          alias:  'tipoTrabajo', 
          closable:  false, 
          expand:  false, 
          action:  false, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [],
            options: [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione un Tipo de Trabajo", 
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
          title: 'ULTIMA FECHA DE MODIFICACION',
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
          type:  'select', 
          multiple:  true, 
          title:  'ESTADO', 
          alias:  'estado', 
          closable:  false, 
          expand:  false, 
          action:  false, 
          hidden: false, 
          options: {
            model:  '', 
            values:  [], 
            options: [], 
            searchable:  false, 
            filterable:  false,
            disabled:  false, 
            placeholder:  "Seleccione un Estado", 
          }
        }
      ]
    };
  },

  computed:{
    listado(){
      return this.listarInversionistas;
    }
  },
  methods:{
    abrirFiltro() {
     this.filterActive = true;
    },
    closeFilter() {
      this.filterActive = false;
    },
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
      async cargarTipoDocumento() {
      try {
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
      }
    },
    async cargarActividadEconomica() {
      try {
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
      }
    },
    convertirFechaDia(date) {
      let fecha = helperFunctions.convertirFechaLocal(date).split(',')
      return fecha[0];
    },
    cargarFechaLocal(){
      let fecha = new Date();
      this.filtros.map( e => {
        if (e.alias == 'fechaNacimiento' || e.alias == "ultimaFecha") {
          e.options.options[1].value = fecha;
          e.options.options[1].model = helperFunctions.convertirFecha(fecha);
          e.options.model = `DESDE --/--/-- - HASTA ${ helperFunctions.convertirFecha(fecha)}`;
        }
      });
    },
    async cargarGenero() {
      try {
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
      }
    },
    async cargarTipoResponsabilidad() {
      try {
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
      }
    },
    async cargarDepartamento() {
      try {
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
      }
    },
    async cargarProvincia() {
      try {
        let { data } = await this.requestApi('cargar_provincia_empresa');
        let response = data.data || [];
        if (response.estado) {
          this.filtros.map( e => {
            if (e.alias == 'provincia') {
              if (response.data) {
                e.options.options = this.recursividadChildren(response.data);
              }
              else {
                e.options.options = [];
              }
            }
          });
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    async cargarEstado() {
      try {
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
      }
    },
    async cargarTipoTrabajo() {
      try {
        let { data } = await this.requestApi('cargar_tipo_de_trabajo');
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros,'tipoTrabajo', response);
        }
      }catch (error) {
        throw new Error(error);
      }
    },
    async cargarDistrito() {
      try {
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
    async listar() {
      try {
        if(this.isMounted) this.$vs.loading({ type: "point" });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_inversionista?';
        params += `id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&`;
        params += `id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&`;
        params += `id_ubigeo_departamento=${obj.departamento.id}&`;
        params += `id_ubigeo_provincia=${obj.provincia}&`;
        params += `id_ubigeo_distrito=${obj.distrito}&`;
        params += `id_master_detalle_tipo_trabajo=${obj.tipoTrabajo.id}&`;
        params += `id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&`;
        params += `id_master_detalle_estado_usuario=${obj.estado.id}&`;
        params += `id_master_detalle_genero=${obj.genero.id}&`;
        params += `nombres=${obj.criterio0.nombres}&`;
        params += `apellido_paterno=${obj.criterio0.apPaterno}&`;
        params += `apellido_materno=${obj.criterio0.apMaterno}&`;
        params += `correo=${obj.criterio0.correoElecronico}&`;
        params += `telefono=${obj.criterio0.telefono}&`;
        params += `numero_documento=${obj.criterio0.numeroDocumento}&`;
        params += `dni_flag=&`;
        params += `fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&`;
        params += `fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&`;
        params += `ruc=${obj.criterio0.ruc}&`;
        params += `razon_social=${obj.criterio0.razonSocial}&`;
        params += `bloqueado_flag=${obj.bloqueado == '' ? '' : obj.bloqueado == 'siBloqueado' ? true : false}&`;
        params += `revision_bo_pendiente_flag=&`;
        params += `actualizacion_usuario_pendiente_flag=&`;
        params += `fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&`;
        params += `fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&`;
        params += `inversionista_flag=`;
        let { data } = await this.requestApi(params);
        let response = data.data;
        if (response.estado) {
          this.listarInversionistas = response.data;
        } else {
          this.listarInversionistas = [];
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
        let params = 'exportar_inversionista?';
                params += `id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&`;
        params += `id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&`;
        params += `id_ubigeo_departamento=${obj.departamento.id}&`;
        params += `id_ubigeo_provincia=${obj.provincia}&`;
        params += `id_ubigeo_distrito=${obj.distrito}&`;
        params += `id_master_detalle_tipo_trabajo=${obj.tipoTrabajo.id}&`;
        params += `id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&`;
        params += `id_master_detalle_estado_usuario=${obj.estado.id}&`;
        params += `id_master_detalle_genero=${obj.genero.id}&`;
        params += `nombres=${obj.criterio0.nombres}&`;
        params += `apellido_paterno=${obj.criterio0.apPaterno}&`;
        params += `apellido_materno=${obj.criterio0.apMaterno}&`;
        params += `correo=${obj.criterio0.correoElecronico}&`;
        params += `telefono=${obj.criterio0.telefono}&`;
        params += `numero_documento=${obj.criterio0.numeroDocumento}&`;
        params += `dni_flag=&`;
        params += `fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&`;
        params += `fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&`;
        params += `ruc=${obj.criterio0.ruc}&`;
        params += `razon_social=${obj.criterio0.razonSocial}&`;
        params += `bloqueado_flag=${obj.bloqueado == '' ? '' : obj.bloqueado == 'siBloqueado' ? true : false}&`;
        params += `revision_bo_pendiente_flag=&`;
        params += `actualizacion_usuario_pendiente_flag=&`;
        params += `fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&`;
        params += `fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&`;
        params += `inversionista_flag=`;
        await this.funcExportar(params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async activarFuncion(idTemp){
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let put={};
        put.id = idTemp;
        put.ip= await require('public-ip').v4();
        let { data } = await this.requestApi('activar_registro_usuario_inversionista', put,"PUT");
        return data.data
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },
    async inactivar(idAux,btnInactivar){
      try {
        if(btnInactivar){
          this.$vs.loading({ type: "point" });
          let { data } = await this.requestApi(`validar_estado_master_detalle_inversion?id=${idAux}`);
          let response = data.data || []; 
         if (response.estado) {
            this.$vs.loading.close();
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t(response.data[0].mensaje),
              showCancelButton: true,
              confirmButtonText: this.$t('Si'),
              cancelButtonText: this.$t('No')
            });
            if (status.value) {
              this.mostrarPopupInactivacion = true;
              this.idEnviar = idAux;                  
            }; 
          }else{
            this.$vs.loading.close();
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: response.mensaje,
              showCancelButton: true,
              confirmButtonText: this.$t('Si'),
              cancelButtonText: this.$t('No')
            });
            if (status.value) {
              let response = await this.activarFuncion(idAux);
              if(response.estado){
                this.responseRequest(response);
              }else{
                this.sweetAlert(response);
              }
              this.closePopup();
            }; 
          }
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async verInversiones(idAux,nombres){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`validar_inversionista?id_usuario=${idAux}`);
        let response = data.data || [];
         if (!response.estado) {
           this.$vs.loading.close();
           await swal.fire({
             title: this.$t('Mensaje de Sistema'),
             text: this.$t(response.mensaje),
             confirmButtonText: this.$t('Aceptar')
           });
         }
         else{
            this.inversionista.id=idAux;
            this.inversionista.nombre=nombres;
            this.$router.push(`/inversionista-inversion-ver-inversiones/${idAux}/${nombres}`);
         }
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async desbloquear(idAux,btnDesbloquear){
        try {
          if(btnDesbloquear){
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t('¿Está seguro que desea desbloquear el registro de usuario?'),
              showCancelButton: true,
              confirmButtonText: this.$t('Si'),
              cancelButtonText: this.$t('No')
            });
            if(status.value){
              this.$vs.loading({ type: "point" });
              let put={};
              put.id = idAux;
              put.ip= await require('public-ip').v4();
              let { data } = await this.requestApi('desbloquear_registro_usuario_empresa', put,"PUT");
              let response = data.data || []; 
              if(response.estado){
                this.responseRequest(response);
                await this.listar();
              }else{
                this.sweetAlert(response);
              } 
            }
          }
        }catch (error) {
          throw new Error(error);
        } finally {
          this.$vs.loading.close();
        }
    },
    async funcionRevisar(id){
      try {   
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`revisar_inversionista?id=${id}`);
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async closePopup(){
      this.mostrarPopupInactivacion=false;
      await this.listar();
    },
    //Rutas 
    ver(id){
       this.$router.push(`/inversionista-inversionista-ver/${id}`);
    },
    
    verHistorial(id){
      this.$router.push(`/inversionista-inversionista-ver-historial/${id}`);
    },
    

  },
  async mounted() {
    try {
        this.$vs.loading({ type: 'point' });   
        this.cargarFechaLocal(); 
        await this.cargarTipoDocumento();
        await this.cargarActividadEconomica();             
        await this.cargarGenero();             
        await this.cargarTipoResponsabilidad();             
        await this.cargarDepartamento();             
        await this.cargarProvincia();             
        await this.cargarDistrito(); 
        await this.cargarEstado(); 
        await this.cargarTipoTrabajo(); 
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
}
</script>


