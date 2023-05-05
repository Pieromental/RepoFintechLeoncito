<template lang="pug">
  div    
    vx-card.vxcard-floating
      div.vx-row.mb-2.mr-2(v-if="flagButton")
        span.bold.font-label(style="color:red") {{ "** " + $t("REVISE LAS CUENTAS BANCARIAS INDIVIDUALMENTE") }}  
      div.vx-row.mt-10.demo-alignment            
        vs-button.mx-2.my-1.full(v-if='!flagButton' @click="exportar" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar") }}
        vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
        vs-button.mx-2.my-1.full( @click="openFilter" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}                
        vx-filter-chip.mb-5( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" )
        vx-filter(:filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" :parent="parentx" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")                  
        vx-table.style-vxtable(idRef="listaCuentaBancaria" ref="listaCuentaBancaria" search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="entidad_bancaria" center min-width="250") {{$t('Entidad Bancaria')}}
            vx-th.uppercase(sort-key="tipo_cuenta" center min-width="250") {{$t('Tipo de Cuenta')}}
            vx-th.uppercase(sort-key="descripcion_moneda" center min-width="150") {{$t('Moneda')}}
            vx-th.uppercase(sort-key="numero_cuenta" center min-width="150") {{$t('Número de Cuenta')}}
            vx-th.uppercase(sort-key="cci" center min-width="150") {{$t('CCI')}}
            vx-th.uppercase(sort-key="revision_pendiente" center min-width="40") {{$t('Revisión Pendiente')}}
            vx-th.uppercase(sort-key="actualizacion_usuario_pendiente" center min-width="40") {{$t('Actualización Usuario Pendiente')}}
            vx-th.uppercase(sort-key="descripcion_estado" center min-width="100") {{$t('Estado')}}
            vx-th.uppercase(sort-key="ultima_fecha_modificacion" center min-width="100") {{$t('Ultima Fecha de Modificación')}}
        
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0( @click.stop="ver(tr.id_cuenta)"  :title="$t('Ver')" icon='EyeIcon' v-if="tr.boton_ver")
                    feather-icon.style-icon.p-0( @click.stop="revisar(tr.id_cuenta)" :title="$t('Revisar')" icon='UserCheckIcon' v-if="tr.boton_revisar")
                vx-td.text-left(:data="tr.descripcion_entidadbancaria") {{tr.descripcion_entidadbancaria}}
                vx-td.text-left(:data="tr.descripcion_tipocuenta") {{tr.descripcion_tipocuenta}}
                vx-td.text-left(:data="tr.descripcion_moneda") {{tr.descripcion_moneda}}
                vx-td.text-left(:data="tr.numero_cuenta") {{tr.numero_cuenta}}
                vx-td.text-left(:data="tr.cci") {{tr.cci}}
                vx-td.text-center(:data="tr.revisionbo_pendienteflag")
                  span(v-if="tr.revisionbo_pendienteflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-center(:data="tr.actualizacion_usuariopendienteflag")
                  span(v-if="tr.actualizacion_usuariopendienteflag" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')
                vx-td.text-left(:data="tr.descripcion_estado") {{tr.descripcion_estado}}
                vx-td.text-left(:data="tr.fecha_actualizacion") {{tr.fecha_actualizacion}}
    pop-ver-cuenta-bancaria(:popupRazonActive="mostrarPopupVer" @closePopup="closePopup" @cambiarFlags="cambiarFlags" @cambiarFlagsRechazo="cambiarFlagsRechazo" :dataCuenta="cuenta" :tipo="tipoEnviar" :footer="footer")
      
</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopVerCuentaBancaria from "@/project/views/inversionista/inversionista/popup/PopVerCuentaBancaria.vue";
import files from '@/mixins/mixinFiles';

export default {
  name: 'TabRepresentantesLegales',
  mixins: [request, files],
  
  components: {
    PopVerCuentaBancaria
  },
  props:{
    flagButton:{
      type:Boolean,
      default:true,
    } 
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
          if (!e.actualizacion_usuariopendienteflag) {            
            e.actualizacion_usuariopendienteflag = true;
          }
          e.revisionbo_pendienteflag = false;
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
          e.actualizacion_usuariopendienteflag = false;
          e.revisionbo_pendienteflag = false;
          e.descripcion_estado = "VERIFICADO";
          e.boton_revisar = false;
          e.observacion_rechazo = null;
        }
        return e;
      });
      this.mostrarPopupVer = false;
      this.tipoEnviar = '';
      this.listado = nuevoListado;
      this.enviarListado();
    },
    async validacionCasos(id,idUsuario){;
      try { 
        this.$vs.loading({ type: 'point' });    
        let { data } = await this.requestApi(`revisar_cuenta_bancaria?id=${idUsuario}&id_cuenta_bancaria=${id}`);
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async revisar(id){  
      this.tipoEnviar = "revisar";
      await this.ver(id)  
    },

    async ver(id){
       try {   
        this.mostrarPopupVer = true;   
        this.$vs.loading({ type: 'point' }); 
        let { data } = await this.requestApi(`ver_cuenta_bancaria_inversionista_bo?id=10&id_cuenta_bancaria=${id}`);
        let response = data.data;
        if (response.estado) {
          this.$vs.loading.close();
          this.cuenta = response.data[0];    
          this.cuenta.estado_cuenta= response.data[0].estado_cuenta ? await this.convertPath(response.data[0].estado_cuenta) : null;           
          this.footer = [
              { icon:'ClockIcon', key: 'Fecha de Registro', value:response.data[0].fecha_registro, },
              { icon:'ColumnsIcon', key:'IP de Registro', value:response.data[0].direccion_ip_registro },
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value:response.data[0].ultima_fecha_modificacion },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value:response.data[0].direccion_ip_ultima_actualizacion },
              { icon:'UserIcon', key:'Último Revisor', value:response.data[0].ultimo_revisor }
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

    btnAprobar(){
      console.log("APROBAR");
    },

    async listarTodo() {
      this.cargarFechaLocal();
      this.filtros = helperFunctions.filterCleanAll(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
    },

    async exportar(){
      try {
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        let obj = helperFunctions.mapFilters(this.filtros);            
        let params=`exportar_cuenta_bancaria?`;
        params+=`id_usuario=${this.id}&`;
        params+=`id_master_detalle_entidad_bancaria=${obj.entidadBancaria.id}&`;
        params+=`id_master_detalle_tipo_cuenta=${obj.tipoCuenta.id}&`;
        params+=`id_master_detalle_moneda=${obj.moneda.id}&`;
        params+=`numero_cuenta=${obj.criterio0.numeroCuenta}&`;
        params+=`cci=${obj.criterio0.cci}&`;
        params+=`fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&`;
        params+=`fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&`;
        params+=`id_master_detalle_estado_cue_ban=${obj.estado.id}`;
        await this.funcExportar(params,false);
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
        let ruta="";
        if(!this.flagButton) ruta="listar_cuenta_bancaria_inversionista_bo?"
        if(this.flagButton) ruta="listar_revision_cuenta_bancaria?"
        let params=`${ruta}`;
        params+=`id_usuario=${this.id}&`;
        params+=`id_master_detalle_entidad_bancaria=${obj.entidadBancaria.id}&`;
        params+=`id_master_detalle_tipo_cuenta=${obj.tipoCuenta.id}&`;
        params+=`id_master_detalle_moneda=${obj.moneda.id}&`;
        params+=`numero_cuenta=${obj.criterio0.numeroCuenta}&`;
        params+=`cci=${obj.criterio0.cci}&`;
        params+=`fecha_actualizacion_usuario_desde=${obj.ultimaFecha.desde}&`;
        params+=`fecha_actualizacion_usuario_hasta=${obj.ultimaFecha.hasta}&`;
        params+=`id_master_detalle_estado_cue_ban=${obj.estado.id}`;
        let { data } = await this.requestApi(params);        
        let response = data.data;   
        if (response.estado) {
          this.listarCuentas = response.data;
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
        parentx: '#parentx-tab-cuentas-bancarias',
        ocultarChip: false,
        filterActive: false,
        listarCuentas:[],
        footer:[],
        id:'',
        isMounted: false,
        mostrarPopupVer: false,
        cuenta:{},
        tipoEnviar: '',
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
                { id: 'numeroCuenta', label: 'NUMERO DE CUENTA', type: 'numberMultiple', pattern: ["[0-9,]"] },
                { id: 'cci', label: 'CCI', type: 'text', pattern: ["[0-9,]"] },
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
              label: e.descripcion,
              object: {
                codigo: e.codigo,
                descripcion: e.descripcion,
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
    enviarBanderaListadoCuentas(){
      if (this.listarCuentas.length == 0) {
        this.$emit("recibirFlagListadoCuentas", false);
      }else{
        this.$emit("recibirFlagListadoCuentas", true);
      }
    },
    async mounted() {
    try {
      this.cargarFechaLocal();
      await this.cargarEntidadBancaria();
      await this.cargarTipoCuenta();
      await this.cargarMoneda();
      await this.cargarEstado();
      this.id = this.$route.params.id ? this.$route.params.id : null;  
      this.filtros = helperFunctions.loaderFilters(this.filtros);
      this.ocultarChip = helperFunctions.hiddenChipFilter(this.filtros);
      await this.listar();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    }
  },
  },
}
</script>
