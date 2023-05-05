<template lang="pug">  
  div#parentx-empresa
    div
      cabecera(:titulo="$t('LISTA DE EMPRESAS')"  @exportar="exportar"  @listarTodo="listarTodo" @filtrar="abrirFiltro" :btnListarTodo="true" :btnFiltrar="true" :btnNuevo="false")      
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" @remove='removeChip')
        vx-filter(ref="filterEmpresa" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-empresa" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" @changeSelect="changeSelect")           
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(colspan="1" rowspan="2" center min-width="250") {{$t('Acciones')}}
            vx-th.uppercase(colspan="5" rowspan="1" center min-width="1150") {{$t('Empresa')}}
            vx-th.uppercase(colspan="12" rowspan="1" center min-width="1200") {{$t('Contacto')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="bloqueadoflag" min-width="40") {{$t('Bloqueado')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="estado" min-width="150") {{$t('Estado')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ultima_fecha_modificacion" min-width="70") {{$t('Última Actualización')}}
          template(slot="mhead")
            tr                 
              vx-th.uppercase( sort-key="razon_social" min-width="250") {{$t('Razón Social')}}
              vx-th.uppercase( sort-key="detalle_riesgo" min-width="200") {{$t('Riesgo')}}
              vx-th.uppercase( sort-key="nombre_comercial" min-width="250") {{$t('Nombre Comercial')}}
              vx-th.uppercase( sort-key="ruc" min-width="100") {{$t('Ruc')}}
              vx-th.uppercase( sort-key="detalle_actividad_economica" min-width="350") {{$t('Actividad Económica')}}
              vx-th.uppercase( sort-key="nombres_completos" min-width="300") {{$t('Nombres Completos')}}
              vx-th.uppercase( sort-key="detalle_genero" min-width="100") {{$t('Género')}}
              vx-th.uppercase( sort-key="correo_electronico" min-width="250") {{$t('Correo Electrónico')}}
              vx-th.uppercase( sort-key="detalle_tipo_documento" min-width="250") {{$t('Tipo Documento')}}
              vx-th.uppercase( sort-key="numero_documento" min-width="150") {{$t('Número Documento')}}
              vx-th.uppercase( sort-key="telefono" min-width="150") {{$t('Teléfono')}}
              vx-th.uppercase( sort-key="fecha_nacimiento" min-width="100") {{$t('Fecha de Nacimiento')}}
              vx-th.uppercase( sort-key="detalle_tipo_responsabilidad" min-width="100") {{$t('Tipo de Responsabilidad')}}
              vx-th.uppercase( sort-key="ubigeo_descripcion_departamento" min-width="150") {{$t('Departamento')}}
              vx-th.uppercase( sort-key="ubigeo_descripcion_provincia" min-width="150") {{$t('Provincia')}}
              vx-th.uppercase( sort-key="ubigeo_descripcion_distrito" min-width="200") {{$t('Distrito')}}
              vx-th.uppercase( sort-key="direccion_completa" min-width="250") {{$t('Dirección Completa')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id)"  :title="$t('Ver')" icon='EyeIcon')                    
                    feather-icon.style-icon.p-0(v-if='tr.boton_inactivar' @click.stop="validarEstadoSubasta(tr.id,tr.boton_inactivar)"  :title="$t('Activar/Inactivar')" icon='UserXIcon')
                    feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                    feather-icon.style-icon.p-0(v-if='tr.boton_desbloquear' @click.stop="desbloquearRegistroUsuario(tr.id, tr.boton_desbloquear)"  :title="$t('Desbloquear')" icon='UnlockIcon')
                    feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                    feather-icon.style-icon.p-0(v-if='tr.id_riesgo' @click.stop="ratingFinanciamiento(tr.id,tr.id_riesgo)"  :title="$t('Rating/Financiamiento')" icon='RefreshCcwIcon')
                    feather-icon.style-icon.p-0(v-else :title="$t('')" icon='')
                    feather-icon.style-icon.p-0( @click.stop="verSubastas(tr.id, tr.nombres_completos)"  :title="$t('Ver Subastas')" icon='InboxIcon')
                    feather-icon.style-icon.p-0( @click.stop="verHistorial(tr.id)"  :title="$t('Ver Historial')" icon=icon='LayersIcon')
                vx-td.text-left(:data="tr.razon_social") {{tr.razon_social}} 
                vx-td.text-left(:data="tr.detalle_riesgo") {{tr.detalle_riesgo}}
                vx-td.text-left(:data="tr.nombre_comercial") {{tr.nombre_comercial}}
                vx-td.text-left(:data="tr.ruc") {{tr.ruc}}
                vx-td.text-left(:data="tr.detalle_actividad_economica") {{tr.detalle_actividad_economica}}
                vx-td.text-left(:data="tr.nombres_completos") {{tr.nombres_completos}}
                vx-td.text-left(:data="tr.detalle_genero") {{tr.detalle_genero}}
                vx-td.text-left(:data="tr.correo_electronico") {{tr.correo_electronico}}
                vx-td.text-left(:data="tr.detalle_tipo_documento") {{tr.detalle_tipo_documento}}
                vx-td.text-left(:data="tr.numero_documento") {{tr.numero_documento}}
                vx-td.text-left(:data="tr.telefono") {{tr.telefono}}
                vx-td.text-center(:data="tr.fecha_nacimiento") {{tr.fecha_nacimiento}}
                vx-td.text-left(:data="tr.detalle_tipo_responsabilidad") {{tr.detalle_tipo_responsabilidad}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_departamento") {{tr.ubigeo_descripcion_departamento}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_provincia") {{tr.ubigeo_descripcion_provincia}}
                vx-td.text-left(:data="tr.ubigeo_descripcion_distrito") {{tr.ubigeo_descripcion_distrito}}
                vx-td.text-left(:data="tr.direccion_completa") {{tr.direccion_completa}}
                vx-td.text-center(:data="tr.bloqueadoflag")
                  span(v-if="tr.bloqueadoflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.estado") {{tr.estado}}
                vx-td.text-center(:data="tr.ultima_fecha_modificacion") {{convertirDia(tr.ultima_fecha_modificacion)}}
      popup-inactivacion(:popupRazonActive="mostrarPopupInactivacion" @closePopup="closePopup" :id="idEnviar")
      popup-cambiar-riesgo(:popupRazonActive="mostrarPopupCambiarRiesgo" @closePopup="closePopup" :id="idEnviar")
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import PopupInactivacion from "@/project/views/empresa/empresa/popup/PopupInactivarUsuario.vue";
import PopupCambiarRiesgo from "@/project/views/empresa/empresa/popup/PopupCambiarRiesgo.vue";

export default {
  name: 'Empresa',
  mixins: [request],
  components: {
    Cabecera,
    PopupInactivacion,
    PopupCambiarRiesgo
  },
  data() {
    return {
      isMounted: false,
      listarEmpresa: [],
      filterActive: false,
      ocultarChip: false,
      mostrarPopupInactivacion: false,
      mostrarPopupCambiarRiesgo: false,
      idEnviar:0,
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
              { id: 'razonSocial', label: 'RAZÓN SOCIAL', type: 'text', pattern: ["[\\W\\w\\s,]"] },
              { id: 'nombreComercial', label: 'NOMBRE COMERCIAL', type: 'text', pattern: ["[\\W\\w\\s,]"] },
              { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: ["[0-9,]"] },
              { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ["[\\W\\w\\s,]"] },
              { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ["[\\W\\w,]"] },
              { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ["[\\W\\w,]"] },
              { id: 'correoElectronico', label: 'CORREO ELECTRÓNICO', type: 'text', pattern: ["[\\W\\w,]"] },
              { id: 'numeroDocumento', label: 'NÚMERO DE DOCUMENTO', type: 'text', pattern: ["[0-9,]"], multiple: true, options: [] },
              { id: 'telefono', label: 'TELÉFONO', type: 'numberMultiple', pattern: ["[0-9+,]"] },
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
            placeholder: 'Seleccione una Provincia',
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
            placeholder: 'Seleccione un Distrito',
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

    changeSelect(obj){
      return
      if (obj.alias === 'tipoDocumento') {
        let array  = [];
        if(obj.value) array = obj.value.map( element => { return { key: element.object.codigo, value: '' } });
        this.$refs.filterEmpresa.reactChangeCriterio('criterio', 'criterio', 'numeroDocumento', array);
        console.log("filtros?=>", this.filtros[2].options.options[7].options);
      }
    },

    //Metodos de Registro

    async validarSubasta(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`validar_subasta_empresa_bo?id=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async verSubastas(id,nombres){
      let response = await this.validarSubasta(id);
      if (response.estado) {
        this.$router.push(`/empresa-subasta-ver-subasta/${id}/${nombres}`);
      }else{  
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: this.$t(response.mensaje),
          confirmButtonText: this.$t('Aceptar'),
        });        
      }
    },

    ver(id){
      this.$router.push(`/empresa-empresa-ver-registro/${id}`);
    },   
    
    verHistorial(id){
      this.$router.push(`/empresa-empresa-ver-historial/${id}`);
    },

    async ratingFinanciamiento(idAux,idRiesgo){
      if (idRiesgo) {
        this.idEnviar = idAux;
        this.mostrarPopupCambiarRiesgo = true;
      }
        
    },

    async desbloquearRegistroUsuario(idAux, btnDesbloquear){
      try {
        if (btnDesbloquear) {          
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: '¿Está seguro que desea desbloquear el registro de usuario?',
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

    async activarFuncion(idTemp){
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let put={};
        put.id = idTemp;
        put.ip= await require('public-ip').v4();
        let { data } = await this.requestApi('activar_registro_usuario_empresa', put,"PUT");
        return data.data
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async validarEstadoSubastaFuncion(idTemp){
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let put={};
        put.id = idTemp;
        let { data } = await this.requestApi('validar_estado_subasta_empresa', put,"PUT");
        return data.data
      }catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async validarEstadoSubasta(idAux, btnInactivar){
      try {
        if(btnInactivar) {
          let response = await this.validarEstadoSubastaFuncion(idAux);
          if (response.estado) {
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
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t(response.mensaje),
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
        let { data } = await this.requestApi(`listar_empresa?id_master_detalle_estado_usuario=${obj.estado.id}&id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&id_ubigeo_departamento=${obj.departamento.id}&id_ubigeo_provincia=${obj.provincia}&id_ubigeo_distrito=${obj.distrito}&id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_genero=${obj.genero.id}&id_master_detalle_riesgo=${obj.riesgo.id}&correo=${obj.criterio0.correoElectronico}&nombres=${obj.criterio0.nombres}&apellido_paterno=${obj.criterio0.apPaterno}&apellido_materno=${obj.criterio0.apMaterno}&numero_documento=${obj.criterio0.numeroDocumento}&dni_flag=&telefono=${obj.criterio0.telefono}&razon_social=${obj.criterio0.razonSocial}&nombre_comercial=${obj.criterio0.nombreComercial}&fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&ruc=${obj.criterio0.ruc}&es_empresa_flag=&bloqueado_flag=${obj.bloqueado == 'siBloqueado' ? true : obj.bloqueado == 'noBloqueado' ? false : ''}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}`);
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
        await this.funcExportar(`exportar_empresa?id_master_detalle_estado_usuario=${obj.estado.id}&id_master_detalle_actividad_economica=${obj.actividadEconomica.id}&id_ubigeo_departamento=${obj.departamento.id}&id_ubigeo_provincia=${obj.provincia}&id_ubigeo_distrito=${obj.distrito}&id_master_detalle_responsabilidad=${obj.tipoResponsabilidad.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_genero=${obj.genero.id}&id_master_detalle_riesgo=${obj.riesgo.id}&correo=${obj.criterio0.correoElectronico}&nombres=${obj.criterio0.nombres}&apellido_paterno=${obj.criterio0.apPaterno}&apellido_materno=${obj.criterio0.apMaterno}&numero_documento=${obj.criterio0.numeroDocumento}&dni_flag&telefono=${obj.criterio0.telefono}&razon_social=${obj.criterio0.razonSocial}&nombre_comercial=${obj.criterio0.nombreComercial}&fecha_nacimiento_desde=${obj.fechaNacimiento.desde}&fecha_nacimiento_hasta=${obj.fechaNacimiento.hasta}&ruc=${obj.criterio0.ruc}&es_empresa_flag&bloqueado_flag=${obj.bloqueado == 'siBloqueado' ? true : obj.bloqueado == 'noBloqueado' ? false : ''}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&token=${localStorage.getItem('token')}`)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    //Metodos Generales

    convertirDia(date){
      let fecha = helperFunctions.convertirFechaLocal(date);
      let dia = fecha.split(", ");
      return dia[0];
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
