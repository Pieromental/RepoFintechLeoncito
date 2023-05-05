<template lang="pug">
  div
    vx-card.vxcard-floating
      div.vx-row.mb-2.mr-2(v-if='tipo == "revisar"')
        span.bold.font-label(style="color:red") {{ "** " + $t("REVISE LOS REPRESENTANTES LEGALES INDIVIDUALMENTE") }}  
      div.vx-row.mt-10.demo-alignment
        vs-button.mx-2.my-1.full(v-if='tipo == "ver"' @click="exportar" color="dark" size="small" icon-pack="feather" icon="icon-download-cloud" type="line") {{ $t("Exportar") }}
        vs-button.mx-2.my-1.full( @click="listarTodo" color="dark" size="small" icon-pack="feather" icon="icon-list" type="line") {{ $t("Listar Todo") }}
        vs-button.mx-2.my-1.full( @click="openFilter" color="dark" size="small" icon-pack="feather" icon="icon-filter" type="line") {{ $t("Filtrar") }}                
        vx-filter-chip( title="Filtros" color="#e1dffc" colorBackground="#f5f8ff" :filtersParent="filtros" :hidden="ocultarChip" )
        vx-filter(:filtersParent="filtros" :positionRight="true" :title="$t('FILTRAR POR')" :parent="parentx" color="primary" :active="filterActive" @closeFilter='closeFilter' @confirmFilter="confirmFilter")          
        vx-table.style-vxtable( idRef="listaRepresentanteLegal" ref="listaRepresentanteLegal" search search-sticky pagination rowsPage :arrayRows='[25,50,100]' max-tems="5" :data="listado" :no-data-text="$t('No se encontraron registros')")
          template(slot="thead")
            vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
            vx-th.uppercase(sort-key="codigo_tipo_documento" min-width="100") {{$t('Tipo de Documento')}}
            vx-th.uppercase(sort-key="numero_documento" min-width="100") {{$t('Número de Documento')}}
            vx-th.uppercase(sort-key="nombre" min-width="200") {{$t('Nombre')}}
            vx-th.uppercase(sort-key="apellidos" min-width="250") {{$t('Apellidos')}}
            vx-th.uppercase(sort-key="ruc" min-width="100") {{$t('RUC')}}
            vx-th.uppercase(sort-key="correo" min-width="250") {{$t('Correo Electrónico')}}
            vx-th.uppercase(sort-key="telefono" min-width="100") {{$t('Teléfono')}}
            vx-th.uppercase(sort-key="es_instancia_usuario" min-width="40") {{$t('Es Instancia del Usuario')}}
            vx-th.uppercase(sort-key="descripcion_estado" min-width="100") {{$t('Estado')}}
            vx-th.uppercase(sort-key="ultima_fecha_modificacion" min-width="100") {{$t('Última Fecha de Modificación')}}
          template(slot-scope="{data}")
            tbody(class="table-text-sm")
              vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0(v-if='tr.boton_ver' @click.stop="ver(tr.id_presentante_legal)"  :title="$t('Ver')" icon='EyeIcon')
                    feather-icon.style-icon.p-0(v-if='tr.boton_revisar' @click.stop="revisar(tr.id_presentante_legal)" :title="$t('Revisar')" icon='UserCheckIcon')
                vx-td.text-left(:data="tr.codigo_tipo_documento") {{tr.codigo_tipo_documento}}
                vx-td.text-left(:data="tr.numero_documento") {{tr.numero_documento}}
                vx-td.text-left(:data="tr.nombre") {{tr.nombre}}
                vx-td.text-left(:data="tr.apellidos") {{tr.apellidos}}
                vx-td.text-left(:data="tr.ruc") {{tr.ruc}}
                vx-td.text-left(:data="tr.correo") {{tr.correo}}
                vx-td.text-left(:data="tr.telefono") {{tr.telefono}}
                vx-td.text-center(:data="tr.es_instancia_usuario")
                  span(v-if="tr.es_instancia_usuario" class="justify-center")
                    feather-icon.style-icon.p-0(icon='CheckIcon')
                  span(v-else class="justify-center") 
                    feather-icon.style-icon.p-0(icon='XIcon')               
                vx-td.text-center(:data="tr.descripcion_estado") {{tr.descripcion_estado}}
                vx-td.text-center(:data="tr.ultima_fecha_modificacion") {{tr.ultima_fecha_modificacion}}
    popup-ver-representante(:popupRazonActive="mostrarPopupVer" @closePopup="closePopup" @cambiarFlags="cambiarFlags" @cambiarFlagsRechazo="cambiarFlagsRechazo" :dataRepresentante="representanteLegal" :tipo="tipoEnviar" :footer="footer")      
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import PopupVerRepresentante from "@/project/views/empresa/empresa/popup/PopupVerRepresentanteLegal.vue";
import files from '@/mixins/mixinFiles';

export default {
  name: 'TabRepresentantesLegales',
  mixins: [request, files],
  
  components: {
    PopupVerRepresentante
  },

  data() {
    return this.getDefaultData()
  },

  computed: {
    listado: {
      // getter
      get: function () {
        return this.listarRepresentantes;
      },
      // setter
      set: function (newValue) {
        this.listarRepresentantes = newValue;
      }
    },
  },

  methods: {

    //METODOS DE LA VENTANA

    enviarListado(){
      this.$emit("recibirListadoRepresentantes", this.listarRepresentantes);
    },

    cambiarFlags(id){
      let nuevoListado = this.listarRepresentantes.map((e) => {
        if (e.id_presentante_legal == id) {
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

    cambiarFlagsRechazo(id, rechazo){
      let nuevoListado = this.listarRepresentantes.map((e) => {
        if (e.id_presentante_legal == id) {        
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

    async revisar(idAux){
      this.tipoEnviar = "revisar";
      await this.ver(idAux);
    },    

    async ver(id){
      try {   
        this.$vs.loading({ type: 'point' });    
        this.mostrarPopupVer = true;       
        let { data } = await this.requestApi(`ver_representante_legal_bo?id=${id}`);
        let response = data.data;
        if (response.estado) {
          this.representanteLegal = response.data[0];    
          this.representanteLegal.frente_documento = response.data[0].frente_documento ? await this.convertPath(response.data[0].frente_documento) : null;      
          this.representanteLegal.reverso_documento = response.data[0].reverso_documento ? await this.convertPath(response.data[0].reverso_documento) : null;      
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.representanteLegal.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.representanteLegal.footer_ip_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:this.representanteLegal.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:this.representanteLegal.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Revisor', value:this.representanteLegal.footer_usuariobo_actualizacion }
          ];
        } else {
          this.representanteLegal = [];
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
        await this.funcExportar(`exportar_representante_legal_completo_bo?id_usuario=${this.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_representante_legal=${obj.estado.id}&ruc=${obj.criterio0.ruc}&nombre=${obj.criterio0.nombres}&apellido=${obj.criterio0.apellidos}&correo=${obj.criterio0.correoElectronico}&numero_documento=${obj.criterio0.numeroDocumento}&telefono=${obj.criterio0.telefono}&es_usuario_flag=${obj.instanciaUsuario == 'siInstancia' ? true : obj.instanciaUsuario == 'noInstancia' ? false : ''}&ultima_fecha_modificacion_desde=${obj.ultimaFecha.desde}&ultima_fecha_modificacion_hasta=${obj.ultimaFecha.hasta}&token=${localStorage.getItem('token')}`, false) 
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
        let { data } = await this.requestApi(`listar_representante_legal_bo?id_usuario=${this.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_representante_legal=${obj.estado.id}&ruc=${obj.criterio0.ruc}&nombre=${obj.criterio0.nombres}&apellido=${obj.criterio0.apellidos}&correo=${obj.criterio0.correoElectronico}&numero_documento=${obj.criterio0.numeroDocumento}&telefono=${obj.criterio0.telefono}&instancia_usuario=${obj.instanciaUsuario == 'siInstancia' ? true : obj.instanciaUsuario == 'noInstancia' ? false : ''}&ultima_fecha_modificacion_desde=${obj.ultimaFecha.desde}&ultima_fecha_modificacion_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {
          if(this.tipo == "revisar"){
            let listadoNuevoRevisar = response.data.map((e) =>{
              e.boton_ver = false;              
              return e;
            });
            this.listarRepresentantes = listadoNuevoRevisar;
          }
        } else {
          this.listarRepresentantes = [];
        }     
        this.enviarBanderaListadoRepresentantes();   
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
        let { data } = await this.requestApi(`listar_representante_legal_completo_bo?id_usuario=${this.id}&id_master_detalle_tipo_documento=${obj.tipoDocumento.id}&id_master_detalle_estado_representante_legal=${obj.estado.id}&ruc=${obj.criterio0.ruc}&nombre=${obj.criterio0.nombres}&apellido=${obj.criterio0.apellidos}&correo=${obj.criterio0.correoElectronico}&numero_documento=${obj.criterio0.numeroDocumento}&telefono=${obj.criterio0.telefono}&es_usuario_flag=${obj.instanciaUsuario == 'siInstancia' ? true : obj.instanciaUsuario == 'noInstancia' ? false : ''}&ultima_fecha_modificacion_desde=${obj.ultimaFecha.desde}&ultima_fecha_modificacion_hasta=${obj.ultimaFecha.hasta}`);
        let response = data.data;   
        if (response.estado) {
          if (this.tipo == "ver") {
            let listadoNuevoVer = response.data.map((e) =>{
              e.boton_ver = true;
              e.boton_revisar = false;
              return e;
            });
            this.listarRepresentantes = listadoNuevoVer;
          }
        } else {
          this.listarRepresentantes = [];
        }     
        this.enviarBanderaListadoRepresentantes();   
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
        listarRepresentantes:[],
        id:'',
        isMounted: false,
        mostrarPopupVer: false,
        representanteLegal:{},
        tipoEnviar: '',
        tipo:'',
        footer:[],
        banderaListado: false,
        filtros:[
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
                { id: 'ruc', label: 'RUC', type: 'numberMultiple', pattern: ["[0-9,]"] },
                { id: 'nombres', label: 'NOMBRES', type: 'text', pattern: ["[\\W\\w\\s,]"] },
                { id: 'apellidos', label: 'APELLIDOS', type: 'text', pattern: ["[\\W\\w\\s,]"] },
                { id: 'correoElectronico', label: 'CORREO ELECTRONICO', type: 'text', pattern: ["[\\W\\w,]"] },
                { id: 'numeroDocumento', label: 'NUMERO DE DOCUMENTO', type: 'text', pattern: ["[0-9,]"] },
                { id: 'telefono', label: 'TELEFONO', type: 'numberMultiple', pattern: ["[0-9+,]"] },
              ],
              criterio_multiple: [],
              size_criterio_multiple: 1,
              label: 'label',
              placeholder: 'Seleccione un criterio de búsqueda'
            }
          },
          {
            type: 'radio', 
            title: 'ES INSTACIA DEL USUARIO', 
            alias: 'instanciaUsuario', 
            closable: false, 
            expand: false, 
            action: false, 
            hidden: false, 
            options: {
              model: '', 
              value: '', 
              count: [
                {
                  value: 'siInstancia', 
                  label: 'SI' 
                },
                {
                  value: 'noInstancia', 
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

    async cargarEstado() {
      try {
        let { data } = await this.requestApi('cargar_estado_representante_legal_bo');
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
          // let filter = response.find(element =>{return element.object.codigo == "REGCOM"});
          this.filtros = helperFunctions.insertDataSelectFilter(this.filtros, 'estado', response);
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

    enviarBanderaListadoRepresentantes(){
      if (this.listarRepresentantes.length == 0) {
        this.$emit("recibirFlagListadoRepresentantes", false);
      }else{
        this.$emit("recibirFlagListadoRepresentantes", true);
      }
    },

    async mountedRepresentantes() {
      try {
        await this.validarTipo(this.$route.name);
        this.cargarFechaLocal();
        await this.cargarEstado();
        await this.cargarTipoDocumento();
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