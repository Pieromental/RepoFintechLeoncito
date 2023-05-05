<template lang="pug">
  div    
    vx-card.vxcard-floating
      div.vx-row.mb-2.mr-2(v-if='tipo == "revisar"')
        span.bold.font-label(style="color:red") {{ "** " + $t("REVISE LAS CUENTAS BANCARIAS INDIVIDUALMENTE") }}  
      div.vx-row.mt-10.demo-alignment            
        vs-button.mx-2.my-1.full(v-if='tipo == "ver"' @click="exportar" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar") }}
        vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
        vs-button.mx-2.my-1.full( @click="openFilter" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}
        vx-filter-chip( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" )
        vx-filter(:filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" :parent="parentx" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")                  
        vx-table.style-vxtable( idRef="listaCuentaBancaria" ref="listaCuentaBancaria" search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(colspan="1" rowspan="2" center min-width="80") {{$t('Acciones')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="entidad_bancaria" min-width="250") {{$t('Entidad Bancaria')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="tipo_cuenta" min-width="250") {{$t('Tipo de Cuenta')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="descripcion_moneda" min-width="150") {{$t('Moneda')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="numero_cuenta" min-width="150") {{$t('Número de Cuenta')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="cci" min-width="150") {{$t('CCI')}}
            vx-th.uppercase(colspan="3" rowspan="1" center min-width="500") {{$t('Titular')}}            
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="descripcion_estado" min-width="100") {{$t('Estado')}}
            vx-th.uppercase(colspan="1" rowspan="2" sort-key="ultima_fecha_modificacion" min-width="100") {{$t('Última Fecha de Modificación')}}
          template(slot="mhead")
              tr
                vx-th.uppercase( sort-key="nombre_titular" min-width="150") {{$t('Nombre Titular')}}
                vx-th.uppercase( sort-key="descripcion_tipo_documento_titular" min-width="200") {{$t('Tipo de Documento')}}
                vx-th.uppercase( sort-key="numero_documento_titular" min-width="150") {{$t('Número de Documento')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0(v-if='tr.boton_ver' @click.stop="ver(tr.id_cuenta)"  :title="$t('Ver')" icon='EyeIcon')
                    feather-icon.style-icon.p-0(v-if='tr.boton_revisar' @click.stop="revisar(tr.id_cuenta, tr.id_usuario)" :title="$t('Revisar')" icon='UserCheckIcon')
                vx-td.text-left(:data="tr.entidad_bancaria") {{tr.entidad_bancaria}}
                vx-td.text-left(:data="tr.tipo_cuenta") {{tr.tipo_cuenta}}
                vx-td.text-left(:data="tr.descripcion_moneda") {{tr.descripcion_moneda}}
                vx-td.text-left(:data="tr.numero_cuenta") {{tr.numero_cuenta}}
                vx-td.text-left(:data="tr.cci") {{tr.cci}}
                vx-td.text-left(:data="tr.nombre_titular") {{tr.nombre_titular}}
                vx-td.text-left(:data="tr.descripcion_tipo_documento_titular") {{tr.descripcion_tipo_documento_titular}}
                vx-td.text-left(:data="tr.numero_documento_titular") {{tr.numero_documento_titular}}
                vx-td.text-center(:data="tr.descripcion_estado") {{tr.descripcion_estado}}
                vx-td.text-center(:data="tr.ultima_fecha_modificacion") {{tr.ultima_fecha_modificacion}}        
    popup-ver-cuenta-bancaria(:popupRazonActive="mostrarPopupVer" @closePopup="closePopup" @cambiarFlags="cambiarFlags" @cambiarFlagsRechazo="cambiarFlagsRechazo" :dataCuenta="cuenta" :tipo="tipoEnviar" :footer="footer")
      
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopupVerCuentaBancaria from "@/project/views/empresa/empresa/popup/PopupVerCuentaBancaria.vue";
import files from '@/mixins/mixinFiles';

export default {
  name: 'TabCuentasBancarias',
  mixins: [request, files],
  
  components: {
    PopupVerCuentaBancaria
  },

  data() {
    return this.getDefaultData()
  },

  computed: {
    listado: {
      // getter
      get: function () {
        return this.listarCuentas;
      },
      // setter
      set: function (newValue) {
        this.listarCuentas = newValue;
      }
    },
  },

  methods: {

    //METODOS DE LA VENTANA

    enviarListado(){
      this.$emit("recibirListadoCuentas", this.listarCuentas);
    },
    
    cambiarFlagsRechazo(id, rechazo){
      let nuevoListado = this.listarCuentas.map((e) => {
        if (e.id_cuenta == id) {        
          e.actualizacion_usuario_pendiente = true;
          e.revision_pendiente = false;
          e.boton_revisar = false;
          e.descripcion_estado = "REGISTRADO";
          e.observacion_rechazo = rechazo;
        }
        return e;
      });
      this.mostrarPopupVer = false;
      this.tipoEnviar = '';
      this.listado = nuevoListado;
      this.enviarListado();
    },

    cambiarFlags(id){
      let nuevoListado = this.listarCuentas.map((e) => {
        if (e.id_cuenta == id) {
          e.actualizacion_usuario_pendiente = false;
          e.revision_pendiente = false;
          e.descripcion_estado = "VERIFICADO";
          e.boton_revisar = false;
          e.observacion_rechazo = "";
        }
        return e;
      });
      this.mostrarPopupVer = false;
      this.tipoEnviar = '';
      this.listado = nuevoListado;
      this.enviarListado();
    },

    async revisar(id, idUsuario){
      this.tipoEnviar = "revisar";
      await this.ver(id)   
    },

    async ver(id){
      try {   
        this.mostrarPopupVer = true;       
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`ver_cuenta_bancaria_bo?id=${id}`);
        let response = data.data;
        if (response.estado) {
          this.$vs.loading.close();
          this.cuenta = response.data[0];    
          this.cuenta.estado_cuenta= response.data[0].estado_cuenta ? await this.convertPath(response.data[0].estado_cuenta) : null;
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.cuenta.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.cuenta.footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:this.cuenta.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:this.cuenta.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Revisor', value:this.cuenta.footer_usuariobo_actualizacion }
          ];
        } else {
          this.cuenta = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async closePopup(bool) {
      this.mostrarPopupVer = false;
      this.tipoEnviar = '';
      if (bool) {        
        await this.listar();
      }
    },

    async listarTodo() {
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      this.cargarFechaLocal();
      await this.listar();
    },

    async exportar(){
      try {
        this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        await this.funcExportar(`exportar_cuenta_bancaria_completo_bo?id_usuario=${this.id}&id_master_detalle_entidad_bancaria=${obj.entidadBancaria.id}&id_master_detalle_tipo_cuenta=${obj.tipoCuenta.id}&id_master_detalle_moneda=${obj.moneda.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_cuenta_bancaria=${obj.estado.id}&numero_cuenta=${obj.criterio0.numeroCuenta}&cci=${obj.criterio0.cci}&nombre_titular=${obj.criterio0.nombreTitular}&numero_documento=${obj.criterio0.numeroDocumento}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&token=${localStorage.getItem('token')}`, false)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async listar() {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);
        let { data } = await this.requestApi(`listar_cuenta_bancaria_bo?id_usuario=${this.id}&id_master_detalle_entidad_bancaria=${obj.entidadBancaria.id}&id_master_detalle_tipo_cuenta=${obj.tipoCuenta.id}&id_master_detalle_moneda=${obj.moneda.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_cuenta_bancaria=${obj.estado.id}&numero_cuenta=${obj.criterio0.numeroCuenta}&cci=${obj.criterio0.cci}&nombre_titular=${obj.criterio0.nombreTitular}&numero_documento=${obj.criterio0.numeroDocumento}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {                  
          if (this.tipo == "revisar") {
            let listadoNuevoRevisar = response.data.map((e) =>{              
              e.boton_ver = false;
              return e;
            });
            this.listarCuentas = listadoNuevoRevisar;
          }
        } else {
          this.listarCuentas = [];
        }
        this.enviarBanderaListadoCuentas();
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async listarCompleto() {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);        
        let { data } = await this.requestApi(`listar_cuenta_bancaria_completo_bo?id_usuario=${this.id}&id_master_detalle_entidad_bancaria=${obj.entidadBancaria.id}&id_master_detalle_tipo_cuenta=${obj.tipoCuenta.id}&id_master_detalle_moneda=${obj.moneda.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_cuenta_bancaria=${obj.estado.id}&numero_cuenta=${obj.criterio0.numeroCuenta}&cci=${obj.criterio0.cci}&nombre_titular=${obj.criterio0.nombreTitular}&numero_documento=${obj.criterio0.numeroDocumento}&fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {
          if (this.tipo == "ver") {
            let listadoNuevoVer = response.data.map((e) =>{
              e.boton_revisar = false;
              e.boton_ver = true;
              return e;
            });
            this.listarCuentas = listadoNuevoVer;
          }
        } else {
          this.listarCuentas = [];
        }
        this.enviarBanderaListadoCuentas();
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },      

    //METODOS GENERALES

    getDefaultData(){
      return {
        parentx: '#parentx-revisarempresa',
        ocultarChip: false,
        filterActive: false,
        listarCuentas:[],
        id:'',
        isMounted: false,
        mostrarPopupVer: false,
        cuenta:{},
        tipoEnviar: '',
        tipo:'',
        footer:[],
        banderaListado: false,
        filtros:[
          {
            type:  'select', // esta key representa al tipo de componente que queremos cargar
            multiple:  true, // esta key representa el estado si es multiple o no 
            title:  'ENTIDAD BANCARIA', // este es el título único en el objeto para de la seccion del componente
            alias:  'entidadBancaria', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
              placeholder:  "Seleccione una entidad bancaria", // esta key representa el placeholder del select, es personalizable. 
            }
          },
          {
            type:  'select', // esta key representa al tipo de componente que queremos cargar
            multiple:  true, // esta key representa el estado si es multiple o no 
            title:  'TIPO DE CUENTA', // este es el título único en el objeto para de la seccion del componente
            alias:  'tipoCuenta', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
              placeholder:  "Seleccione un Tipo de Cuenta", // esta key representa el placeholder del select, es personalizable. 
            }
          },
          {
            type:  'select', // esta key representa al tipo de componente que queremos cargar
            multiple:  true, // esta key representa el estado si es multiple o no 
            title:  'MONEDA', // este es el título único en el objeto para de la seccion del componente
            alias:  'moneda', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
              placeholder:  "Seleccione una Moneda", // esta key representa el placeholder del select, es personalizable. 
            }
          },
          {
            type:  'select', // esta key representa al tipo de componente que queremos cargar
            multiple:  true, // esta key representa el estado si es multiple o no 
            title:  'TIPO DE DOCUMENTO', // este es el título único en el objeto para de la seccion del componente
            alias:  'tipoDocumento', // este alias es único en el objeto (sirve posteriormente para el mapeo de todos los filros)
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
                { id: 'numeroCuenta', label: 'NÚMERO DE CUENTA', type: 'numberMultiple', pattern: ["[0-9,]"] },
                { id: 'cci', label: 'CCI', type: 'text', pattern: ["[0-9,]"] },
                { id: 'nombreTitular', label: 'NOMBRE TITULAR', type: 'text', pattern: ["[\\W\\w\\s,]"] },
                { id: 'numeroDocumento', label: 'NÚMERO DE DOCUMENTO', type: 'text', pattern: ["[0-9,]"] },
              ],
              criterio_multiple: [],
              size_criterio_multiple: 1,
              label: 'label',
              placeholder: 'Seleccione un criterio de búsqueda'
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
              placeholder:  "Seleccione un Tipo de Documento", // esta key representa el placeholder del select, es personalizable. 
            }
          }
        ]           
      }      
    },

    //METODOS DE LOS FILTROS
    
    cargarFechaLocal(){
      let fecha = new Date();
      fecha = helperFunctions.convertirFecha(fecha);
      fecha = helperFunctions.obtenerFecha(fecha);
      this.filtros.map( e => {
        if (e.alias == "ultimaFecha") {
          e.options.options[1].value = fecha;
        }
      });
    },

    async cargarEntidadBancaria() {
      try {
        let { data } = await this.requestApi('cargar_entidad_bancaria');
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'entidadBancaria', response);
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    async cargarTipoCuenta() {
      try {
        let { data } = await this.requestApi('cargar_tipo_cuenta_bancaria');
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
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'tipoCuenta', response);
        }
      }catch (error) {
        throw new Error(error);
      }
    },

    async cargarMoneda() {
      try {
        let { data } = await this.requestApi('cargar_moneda_cuenta_bancaria');
        let response = data.data || []; 
        if (response.estado) {
          response = response.data.map((e) => {
            return {
              id: e.id,
              label: e.descripcion+'('+e.codigo+')',
              object: {
                codigo: e.descripcion+'('+e.codigo+')',
                estado: e.estado,
              }
            };             
          }); 
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'moneda', response);
        }
      }catch (error) {
        throw new Error(error);
      }
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

    async cargarEstado() {
      try {
        let { data } = await this.requestApi('cargar_estado_cuenta_bancaria');
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

    closeFilter() {
      this.filterActive = false;
    },

    openFilter() {
      this.filterActive = true;
    },

    async confirmFilter(filters) {
      this.filterActive = false
      this.filtros = filters
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async validarTipo(nombre){
      switch (nombre) {
        case "empresa-empresa-revisar-registro":
          this.tipo = "revisar"
          return
        case "empresa-empresa-ver-registro":
          this.tipo = "ver"
          return
      }
    },

    enviarBanderaListadoCuentas(){
      if (this.listarCuentas.length == 0) {
        this.$emit("recibirFlagListadoCuentas", false);
      }else{
        this.$emit("recibirFlagListadoCuentas", true);
      }
    },

    async mountedCuentas() {
      try {
        await this.validarTipo(this.$route.name);
        this.cargarFechaLocal();
        await this.cargarEntidadBancaria();
        await this.cargarTipoCuenta();
        await this.cargarMoneda();
        await this.cargarTipoDocumento();
        await this.cargarEstado();
        this.filtros = helperFunctions.loaderFilters(this.filtros);
        this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
        this.id = this.$route.params.id ? this.$route.params.id : null;  
        if (this.tipo == "ver") {
          await this.listarCompleto();
        }else{
          await this.listar();
        }    
        this.isMounted = true;
      } catch (error) {
        throw new Error(error);
      }
    },

  },
}
</script>