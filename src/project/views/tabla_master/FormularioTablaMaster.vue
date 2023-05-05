<template lang="pug">
  div
    cabecera(:titulo="$t(titulo)" @aceptar="validar" @cancelar="cancelar" :btnAceptar="!ver" :btnCancelar="true" :btnNuevo="false" :btnExportar="false" :btnListarTodo="false" :btnFiltrar="false")    
    vx-card.card-sticky-floating
      div.vx-row
      form.w-full(style="height:100%;" )          
        vx-card.card-style-collapse(:title="$t('Datos Generales')" collapse-action)
          div.vx-row
            div.vx-col.w-full(class="md:w-5/6")
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Código") }}
                  span.font-label(v-if="!ver") (10)
                    span.font-label.bold.text-danger  *
                div.vx-col.w-full(class="sm:w-1/2")
                  texts-box.pt-1.w-full(size="small" id="codigo" ref="codigo" name="codigo"  v-model="tablaMaster.codigo" @focus="focus('codigo')" @keyup.enter.prevent="validarCodigo" v-mask="{mask:maskFuncion(10,'D'),tokens:{'D': {pattern: /[0-9a-zA-Z]/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarCodigo()" autocomplete="off" :disabled="ver || editar")
                  span.font-error.text-danger(v-if="mensajeCodigo") {{ $t(mensajeCodigo) }}
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Descripción") }}
                  span.font-label(v-if="!ver") (60)
                    span.font-label.bold.text-danger  *
                div.vx-col.w-full(class="sm:w-1/2")
                  texts-box.pt-1.w-full(size="small" id ="descripcion" ref="descripcion" name="descripcion"  v-model="tablaMaster.descripcion"  @focus="focus('descripcion')"  v-mask="{ mask:maskFuncion(60,'D'), tokens:{ 'D': {pattern: /[\\W\\w\\s]/}}}" @blur="validarDescripcion();blur('descripcion')" autocomplete="off" :disabled="ver")
                  span.font-error.text-danger(v-if="mensajeDescripcion") {{ $t(mensajeDescripcion) }}
              div.vx-row.mb-3
                div.vx-col.w-full(class="sm:w-1/3")
                  span.font-label.bold {{ $t("Estado") }}
                    span.font-label.bold.text-danger  *
                div.vx-col.w-full.vs-align-items(class="sm:w-1/2")
                  radio-button.mr-3.ml-3(:disabled="ver" v-model="tablaMaster.estado" vs-name="tablaMaster.estado" :vs-value="true") {{$t('Activo')}}
                  radio-button.mr-3.ml-3(:disabled="ver" v-model="tablaMaster.estado" vs-name="tablaMaster.estado" :vs-value="false") {{$t('Inactivo')}}        
        vx-card.card-style-collapse(:title="$t('Detalle')" collapse-action)
          div.vx-row
            vx-table.style-vxtable(idRef="listaDetalleTablaMaster" ref="containerTable" :title-container="$t(tituloDetalle)" :title="$t('Detalle')" v-model="seleccionados" :data="listado" @toggleAgregar="agregarDetalle" @removeRows="eliminarLote" :btnOption="false" :btnAgregar="verBotones" :btnEliminar="verBotones" header-sticky multiple header-table search pagination rowsPage @closeContent="limpiarDetalle" @swapToggle="swapDetalle" :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")              
              template(slot="container")
                detalle-formulario( ref="refDetalleFormulario" :dataDetalle='dataDetalle' :typeDetalle='typeDetalle' :index='index' @cancelarDetalle="cancelarDetalle" :listadoDetalle="listado")
              template(slot="thead")
                vx-th.uppercase(center min-width="80") {{$t('Acciones')}}
                vx-th.uppercase(sort-key="codigo" min-width="100") {{$t('Código')}}
                vx-th.uppercase(sort-key="descripcion" min-width="200") {{$t('Descripción')}}
                vx-th.uppercase(sort-key="estado" min-width="100") {{$t('Estado')}}              
              template(slot-scope="{data}")
                tbody(class="table-text-sm")
                  vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                    vx-td.text-center
                      .d-f.vs-justify-center
                        feather-icon.style-icon.p-0( @click.stop="verDetalle(tr, indextr)" :title="$t('Ver')" icon='EyeIcon')
                        feather-icon.style-icon.p-0(v-if="!ver" @click.stop="editarDetalle(tr, indextr)" :title="$t('Modificar')" icon='Edit3Icon')
                        feather-icon.style-icon(v-if="!tr.id" v-on:click.stop="eliminarDetalle(indextr)" :title="$t('Eliminar')" icon='Trash2Icon')
                    vx-td.text-left(:data="tr.codigo") {{tr.codigo}}
                    vx-td.text-left(:data="tr.descripcion") {{tr.descripcion}}
                    vx-td.text-center(:data="tr.estado")
                      span(v-if="tr.estado" class="justify-center") {{$t('ACTIVO')}}
                      span(v-else class="justify-center") {{$t('INACTIVO')}}
        footer-data(v-if='editar||ver' :items='footer' )
</template>

<script>

import Cabecera from '@/components/header/Header.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import helperFunctions from "@/functions";
import swal from "sweetalert2";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import request from "@/mixins/mixinRequest"
import FooterData from '@/components/footer/FooterData.vue';
import DetalleFormulario from "@/project/views/tabla_master/DetalleFormulario.vue";
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';

export default {
  
  name: "FormularioTablaMaster",
  
  mixins: [request],
  
  components: {
    Cabecera,
    VuePerfectScrollbar,
    FooterData,
    DetalleFormulario,
    TextsBox,
    RadioButton
  },
  
  data() {
    return {
      tablaMaster: {
        id:'',
        codigo:'',
        descripcion:'',
        estado:true,
      },
      tempCodigo: '',
      mensajeCodigo: '',
      mensajeDescripcion: '',
      footer:[],
      listarDetalleMaster: [],
      seleccionados: [],
      dataDetalle: {},
      typeDetalle: '',
      titulo: '',
      nuevo: false,
      editar: false,
      ver: false,
      index: 0,
      isMounted: false,
      verBotones: true,
    };
  },

  watch: {
    seleccionados(listado){  
      if (this.ver) {
        this.verBotones = false
      }
    }
  },

  
  computed: {
    tituloDetalle() {
      return this.typeDetalle=='nuevo' ? 'Agregar Detalle' : this.typeDetalle=='editar' ? 'Modificar Detalle' : this.typeDetalle=='ver' ? 'Detalle [Modo Vista]' : '';
    },
    listado() {
      return this.listarDetalleMaster;
    }
  },
  
  methods:{

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    blur(element) {
      if (this[element] == "") {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },
    
    agregarDetalle() {
      this.limpiarDetalle();
      this.typeDetalle = 'nuevo';
    },

    async verDetalle(tr,posicion) {
      this.typeDetalle = 'ver';
      this.dataDetalle = tr;
      this.index = posicion;
      this.$refs.containerTable.toggleContent();
    },
    
    
    async editarDetalle(tr,posicion) {
      this.typeDetalle = 'editar';
      this.dataDetalle = tr;
      this.index = posicion;
      this.$refs.containerTable.toggleContent();
    },
    
    eliminarDetalle(posicion){
      let array = this.listarDetalleMaster.filter( (e, index) =>  index != posicion )
      this.listarDetalleMaster = array;
    },

    eliminarDetallexCodigo(codigo){
      let array = this.listarDetalleMaster.filter( (e) =>  e.codigo != codigo )
      this.listarDetalleMaster = array;
    },
    
    eliminarLote(){      
      let array = this.seleccionados.filter( (e) =>  e.id == "" )
      for (let i = 0; i < array.length; i++) {
        this.eliminarDetallexCodigo(array[i].codigo)
      }
    },

    cancelarDetalle() {
      this.limpiarDetalle();
      this.$refs.containerTable.toggleContent();
    },

    limpiarDetalle(){
      this.typeDetalle = null;
      this.dataDetalle = null;
      this.index = 0;
      if (this.ver) {
        this.verBotones = false;
      }else{
        this.verBotones = true;
      }
    },

    swapDetalle(){
      if(this.$refs.containerTable.isContentCollapsed) this.limpiarDetalle()
    },

    async registrar() {
      this.$vs.loading({ type: "point" });
      try {
        let post = {
          codigo : this.tablaMaster.codigo,
          descripcion : this.tablaMaster.descripcion,
          estado : this.tablaMaster.estado,
          detalle: this.listarDetalleMaster
        }
        post.ip_registro = await require('public-ip').v4();
        let { data } = await this.requestApi("insertar_bo", post, "POST");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    async actualizar(){
      this.$vs.loading({ type: "point" });
      try {
        let put = {
          id : this.tablaMaster.id,
          descripcion : this.tablaMaster.descripcion,
          estado : this.tablaMaster.estado,
          detalle: this.listarDetalleMaster
        }
        put.ip_actualizacion = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_bo", put, "PUT");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },
    
    async listar(id) {
      try {
        if(!id || this.nuevo) return
        if(this.isMounted) this.$vs.loading({ type: 'point' });   
        let { data } = await this.requestApi(`listar_master_detalle_bo?id=${id}`);
        let response = data.data;
        if (response.estado) {
          this.listarDetalleMaster = response.data;
        } else {
          this.listarDetalleMaster = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if(this.isMounted) this.$vs.loading.close();
      }
    },

    async cargarDatos(id) {
      if(id!=null && !this.nuevo){
        try {
          if(this.isMounted) this.$vs.loading({ type: 'point' });   
          let { data } = await this.requestApi(`ver_bo?id=${id}`);
          let response = data.data;
          if(response.estado){
            Object.assign(this.tablaMaster,response.data[0]);
            await this.listar(this.tablaMaster.id);
            this.footer = [
              { icon:'ClockIcon', key: 'Fecha de Registro', value:response.data[0].footer_fecha_registro },
              { icon:'ColumnsIcon', key:'IP de Registro', value:response.data[0].footer_ip_registro },
              { icon:'UserIcon', key:'Usuario de Registro', value:response.data[0].footer_usuariobo_registro },
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value:response.data[0].footer_fecha_actualizacion },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value:response.data[0].footer_ip_actualizacion },
              { icon:'UserIcon', key:'Último Usuario de Modificación', value:response.data[0].footer_usuariobo_actualizacion }
            ];
          }
        } catch (error) {
          throw new Error(error);
        } finally {
          if(this.isMounted) this.$vs.loading.close();
        }
      }
    },

    async validarCodigo(){
      try {
        if(!this.nuevo) return
        if(this.tablaMaster.codigo){
          if(this.tempCodigo == `${this.tablaMaster.codigo}`) return
          this.$vs.loading({ type: 'point' });
          let { data } = await this.requestApi(`validar_codigo_bo?codigo=${this.tablaMaster.codigo}`);
          let response = data.data || null;
          if (!response.estado) {          
            this.mensajeCodigo = response.mensaje;
            setTimeout(() => { this.tablaMaster.codigo=""; this.$refs.codigo.focusInput() }, 500);
          } else {
            this.tempCodigo = this.tablaMaster.codigo;
            this.mensajeCodigo = '';
          }
        }else{
          this.mensajeCodigo="El código es requerido."
        }     
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    validarDescripcion(){
      if(this.tablaMaster.descripcion){
        this.mensajeDescripcion = "";
      }else{
        this.mensajeDescripcion = "La descripción es requerida.";
      }
    },

    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },

    showErrors() {
      if(this.tablaMaster.codigo) this.mensajeCodigo = "";
      else  this.mensajeCodigo = "El código es requerido.";

      if(this.tablaMaster.descripcion) this.mensajeDescripcion = "";
      else this.mensajeDescripcion = "La descripción es requerida.";
      
      if( !this.mensajeCodigo && !this.mensajeDescripcion) return false;
      else return true;
    },

    async validar() {
      if(this.showErrors()) return
      let mensaje = this.nuevo ? this.$t("¿Desea guardar el registro?") : this.$t("¿Desea actualizar el registro?");
      let status = await swal.fire({ title: this.$t("Mensaje de Sistema"), text: mensaje, showCancelButton: true, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
      if (status.value) {
        let response = this.nuevo ? await this.registrar() : await this.actualizar();
        if(response.data.estado){
          this.responseRequest(response.data);
          this.cancelar();
        }else{
          this.sweetAlert(response.data);
        }        
      }
    },
    
    async validarRuta(nombre) {
      switch (nombre) {
        case "tabla-master-agregar":
          this.titulo = 'Nueva Tabla Master';
          this.nuevo = true;
          this.verBotones = true;
          return
        case "tabla-master-modificar":
          this.titulo = 'Modificar Tabla Master';
          this.editar = true;
          this.verBotones = true;
          return
        case "tabla-master-ver":
          this.titulo = 'Tabla Master [Modo Vista]';
          this.ver = true;
          this.verBotones = false;
          return
      }
    },

    cancelar() {
      this.$router.push(`/tabla-master`);
    },

    activarFoco(){
      if(this.nuevo) setTimeout(() => { this.$refs.codigo.focusInput(); }, 500);
      if(this.editar) setTimeout(() => { this.$refs.descripcion.focusInput(); }, 500);
    },

  },

  async mounted() {
    try{
      this.$vs.loading({ type: "point" });
      await this.validarRuta(this.$route.name);      
      await this.cargarDatos(this.$route.params.id ? this.$route.params.id : null);
      this.activarFoco();
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  },  
}
</script>