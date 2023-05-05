<template lang="pug">  
  div#parentx-inversionista
    div
      cabecera(:titulo="$t('REVISAR INVERSIONISTAS')"  @exportar="exportar"  @listarTodo="listarTodo" @filtrar="abrirFiltro" :btnListarTodo="true" :btnFiltrar="true" :btnNuevo="false")      
      vx-card.card-sticky
        vx-filter-chip.mb-5(title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip")
        vx-filter(ref="filter" :filtersParent="filtros" :positionRight="true" title="FILTRAR POR" parent="#parentx-monto" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter" )
        vx-table.style-vxtable(search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(colspan="1" rowspan="2" center min-width="120") {{$t('Acciones')}}
            vx-th.uppercase(colspan="2" rowspan="1"  center min-width="860") {{$t('Inversionista')}}
            vx-th.uppercase(colspan="1" rowspan="2" center min-width="400") {{$t('Revisión')}}
            vx-th.uppercase(colspan="1" rowspan="2"  sort-key="p_fechaactualizacionusuario" min-width="150" ) {{$t('Última Modificación')}}
          template(slot="mhead")
            tr                 
              vx-th.uppercase(center min-width="430" sort-key="p_razonsocial") {{$t('Información Jurídica')}}
              vx-th.uppercase(center min-width="430" sort-key="p_persona_natural_nombrecompletos") {{$t('Persona Natural')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  vx-button-table( :primary="tr.boton_revisar_azul" icon="CheckCircleIcon" @click="revisar(tr.id)") {{$t('Revisar')}}
                vx-td
                  div.vx-row
                    div.vx-col.w-full.d-f
                      span.font-label.bold-table {{ tr.razon_social }}
                      vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:`${$t('RUC: ')}`,description:tr.ruc}, {subTitle:`${$t('Razon Social: ')}`,description:tr.razon_social}, {subTitle:`${$t('Actividad Económica: ')}`,description: tr.detalle_actividad_economica} ]" v-if="tr.razon_social")
                        feather-icon.style-icon-table.ml-2( icon="BriefcaseIcon")
                  div.vx-row
                    div.vx-col(class="sm:w-1/2")
                      span.font-label {{ tr.ruc }}
                    div.vx-col(class="sm:w-1/2")
                      span.font-label {{ tr.detalle_actividad_economica }}
                vx-td
                  div.vx-row
                    div.vx-col.w-full.d-f
                      span.font-label.bold-table {{ tr.nombre }}
                      vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:`${$t('Sexo: ')}`,description:tr.detalle_genero}, {subTitle:`${$t('Actividad Económica: ')}`,description:tr.detalle_actividad_economica}, {subTitle:`${$t('Tipo de Documento: ')}`,description: tr.detalle_tipo_documento}, {subTitle:`${$t('Número de Documento: ')}`,description: tr.numero_documento}, {subTitle:`${$t('Fecha de Nacimiento: ')}`,description: tr.fecha_nacimiento} , {subTitle:`${$t('Tipo de Responsabilidad: ')}`,description: tr.detalle_tipo_responsabilidad}, {subTitle:`${$t('Departamento: ')}`,description: tr.ubigeo_descripcion_departamento}, {subTitle:`${$t('Provincia: ')}`,description: tr.ubigeo_descripcion_provincia}, {subTitle:`${$t('Distrito: ')}`,description: tr.ubigeo_descripcion_distrito}, {subTitle:`${$t('Dirección: ')}`,description: tr.direccion_completa}, {subTitle:`${$t('Estado: ')}`,description: tr.descripcion_estado_usuario}]")
                        feather-icon.style-icon-table.ml-2( icon="UserIcon")
                      vx-tooltip( :title="`${$t('Información')}`"  position="right"  color="primary" 
                      :dataMessage="[{subTitle:`${$t('NUEVO USUARIO')}`}]" v-if="tr.boton_nuevo")
                        feather-icon.style-icon-table.ml-2(icon="ShieldIcon")
                  div.vx-row
                    div.vx-col(class="sm:w-1/2")
                      span.font-label {{ tr.telefono }}
                    div.vx-col(class="sm:w-1/2")
                      span.font-label {{ tr.correo_electronico }}
                vx-td
                  vx-chip( color="primary" transparent v-if="tr.revision_usuario") {{$t('Información General')}}
                  vx-chip( color="success" transparent v-if="tr.revision_representante_legal" ) {{$t('Representante Legal')}}
                  vx-chip( color="warning" transparent v-if="tr.revision_cuenta_bancaria") {{$t('Cuenta Bancaria')}}
                vx-td.text-center
                  div.vx-row
                    div.vx-col.w-full
                      span.font-label.bold-table {{convertirFechaDia(tr.ultima_fecha_modificacion) }}
                  div.vx-row
                    div.vx-col.w-full
                      span.font-label {{convertirFechaHora(tr.ultima_fecha_modificacion) }}
      pop-inactivacion(:popupRazonActive="mostrarPopupInactivacion" @closePopup="closePopup" :id="idEnviar")
</template>
<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import Cabecera from '@/components/header/Header.vue';
import VxButtonTable from '@/components/buttons/ButtonTable.vue';
import PopInactivacion from '@/project/views/inversionista/inversionista/popup/PopInactivarUsuario.vue';
import VxChip from '@/components/chips/Chip.vue';
export default {
  name: 'Inversionista',
  mixins: [request],
  components: {
    Cabecera,
    PopInactivacion,
    VxButtonTable,
    VxChip
  },
  data() {
    return {
      listarInversionistas: [],
      activo: false,
      filterActive: false,
      ocultarChip: false,
      sidebarActivo: false,
      idEnviar: 0,
      inversionista: {
        id: '',
        nombre: ''
      },
      mostrarPopupInactivacion: false,
      filtros: [
        {
          type: 'select',
          multiple: true,
          title: 'TIPO DE DOCUMENTO',
          alias: 'tipoDocumento',
          closable: false,
          expand: false,
          action: true,
          hidden: false,
          options: {
            model: '',
            values: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Tipo de Documento'
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
              { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ['[a-zA-ZÀ-ÿ\\s,]'] },
              { id: 'apPaterno', label: 'APELLIDO PATERNO', type: 'text', pattern: ['[a-zA-ZÀ-ÿ\\s,]'] },
              { id: 'apMaterno', label: 'APELLIDO MATERNO', type: 'text', pattern: ['[a-zA-ZÀ-ÿ\\s,]'] },
              { id: 'razonSocial', label: 'RAZON SOCIAL', type: 'numberMultiple', pattern: ['[a-zA-ZÀ-ÿ\\s,]'] },
              { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: ['[0-9,]'] },
              { id: 'correoElecronico', label: 'CORREO ELECTRONICO', type: 'text', pattern: ['[0-9a-zA-Z\\W\\w\\s,]'] },
              { id: 'numeroDocumento', label: 'NUMERO DE DOCUMENTO', type: 'text', pattern: ['[0-9,]'] },
              { id: 'telefono', label: 'TELEFONO', type: 'numberMultiple', pattern: ['[0-9,]'] }
            ],
            criterio_multiple: [],
            size_criterio_multiple: 1,
            label: 'label',
            placeholder: 'Seleccione un criterio de búsqueda'
          }
        },
        {
          type: 'select',
          multiple: true,
          title: 'ACTIVIDAD ECONOMICA',
          alias: 'actividadEconomica',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione una Actividad Economica'
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
          options: {
            model: '',
            options: [
              {
                title: 'DESDE',
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
                title: 'HASTA',
                model: '',
                value: [],
                disabled: false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder: 'dd/mm/yyyy'
              }
            ]
          }
        },
        {
          type: 'select',
          multiple: true,
          title: 'GENERO',
          alias: 'genero',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Genero'
          }
        },
        {
          type: 'select',
          multiple: true,
          title: 'TIPO DE RESPONSABILIDAD',
          alias: 'tipoResponsabilidad',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Tipo de Responsabilidad'
          }
        },
        {
          type: 'select',
          multiple: true,
          title: 'DEPARTAMENTO',
          alias: 'departamento',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Departamento'
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
          type: 'select',
          multiple: true,
          title: 'TIPO DE TRABAJO',
          alias: 'tipoTrabajo',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Tipo de Trabajo'
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
          options: {
            model: '',
            options: [
              {
                title: 'DESDE',
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
                title: 'HASTA',
                model: '',
                value: [],
                disabled: false,
                disabledDate: {
                  to: '',
                  from: ''
                },
                placeholder: 'dd/mm/yyyy'
              }
            ]
          }
        },
        {
          type: 'select',
          multiple: true,
          title: 'ESTADO',
          alias: 'estado',
          closable: false,
          expand: false,
          action: false,
          hidden: false,
          options: {
            model: '',
            values: [],
            options: [],
            searchable: false,
            filterable: false,
            disabled: false,
            placeholder: 'Seleccione un Estado'
          }
        }
      ]
    };
  },

  computed: {
    listado() {
      return this.listarInversionistas;
    }
  },
  methods: {
    convertirFechaDia(date) {
      let fecha = helperFunctions.convertirFechaLocal(date).split(',')
      return fecha[0];
    },
     convertirFechaHora(date) {
      let fecha = helperFunctions.convertirFechaLocal(date).split(',')
      return fecha[1];
    },
    abrirFiltro() {
      this.filterActive = true;
    },
    closeFilter() {
      this.filterActive = false;
    },
    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },
    async confirmFilter(filters) {
      this.filterActive = false;
      this.filtros = filters;
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoDocumento', response);
        }
      } catch (error) {
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'actividadEconomica', response);
        }
      } catch (error) {
        throw new Error(error);
      }
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'genero', response);
        }
      } catch (error) {
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoResponsabilidad', response);
        }
      } catch (error) {
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'departamento', response);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarProvincia() {
      try {
        let { data } = await this.requestApi('cargar_provincia_empresa');
        let response = data.data || [];
        if (response.estado) {
          this.filtros.map((e) => {
            if (e.alias == 'provincia') {
              if (response.data) {
                e.options.options = this.recursividadChildren(response.data);
              } else {
                e.options.options = [];
              }
            }
          });
        }
      } catch (error) {
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
                estado: e.estado
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response);
        }
      } catch (error) {
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
                estado: e.estado_flag
              }
            };
          });
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoTrabajo', response);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarDistrito() {
      try {
        let { data } = await this.requestApi('cargar_distrito_empresa');
        let response = data.data || [];
        if (response.estado) {
          this.filtros.map((e) => {
            if (e.alias == 'distrito') {
              if (response.data) e.options.options = this.recursividadChildren(response.data);
              else e.options.options = [];
            }
          });
        }
      } catch (error) {
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
            value.id = element.id;
            value.codigo = element.codigo;
            value.label = `${element.descripcion}`;
            value.nivel = Number(element.nivel);
            value.descripcion = element.descripcion;
            value.estado = element.estado;
            value.isDisabled = false;
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
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'listar_revision_inversionista?';
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
        params += `inversionista_flag=&`;
        params += `bloqueado_flag=${obj.bloqueado == '' ? '' : obj.bloqueado == 'siBloqueado' ? true : false}&`;
        params += `revision_bo_pendiente_flag=&`;
        params += `actualizacion_usuario_pendiente_flag=&`;
        params += `fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&`;
        params += `fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&`;
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
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    async exportar() {
      try {
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let params = 'exportar_listar_revision_inversionista?';
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
    async funcionRevisar(id) {
      try {
        this.$vs.loading({ type: 'point' });
        let put={};
        put.id=id;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('validar_revision_usuario_inversionista',put,"PUT");
        let response = data.data;
        return response;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async revisar(id) {
      let response = await this.funcionRevisar(id);
      if(response.estado){
        if(response.data[0].mostrar_interfaz) this.$router.push(`/inversionista-inversionista-revisar-registro/${id}`);
       this.$router.push(`/inversionista-inversionista-revisar-registro/${id}`);
      }else{
        this.sweetAlert(response);
        await this.listar();
      }
    },
    async closePopup() {
      this.mostrarPopupInactivacion = false;
      await this.listar();
    }
    //Rutas
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
};
</script>
