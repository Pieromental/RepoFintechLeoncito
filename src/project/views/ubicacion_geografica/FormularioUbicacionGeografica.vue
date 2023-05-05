<template lang="pug">
  vx-sidebar-form( id='UbicacionesForm' v-model='value' parentx='#parentx-ubicacion')
  
    template(slot="header")
      
      span {{ $t(title) }}

    template(slot="body")

      div.vx-col.mb-3
        span.bold.font-label {{$t('Nivel')}}
        span.font-label(v-if="nuevo") (1)
          span.bold.font-label(style='color:#F74F51') *
        texts-box.pt-1.w-full(size="small" ref="nivel" id="nivel" name="nivel" v-model='ubicacion.nivel' @focus="focus('nivel')" v-mask="{mask:maskFuncion(1,'D'),tokens:{'D': {pattern: /[123]/}}}"  @blur="validarNivel();blur('nivel')" autocomplete="off" :disabled="editar||ver")
        span.font-error.text-danger(v-if="mensajeNivel") {{ $t(mensajeNivel) }}
      div.vx-col.mb-3(v-if="ubicacion.nivel > 1")
        span.bold.font-label {{ $t('Ubicación Padre') }}
        span.bold.font-label(v-if="ubicacion.nivel>1" style='color:#F74F51') *
        v-treeselect.font-label(size="small" :options='opcionUbicacionPadre' :disable-branch-nodes="true" :clearable="false" :multiple="false" :show-count="true" v-model="ubicacionPadre" value-format="object"  :searchable="true" :placeholder="$t('Seleccione una Ubicación Padre')" @input="validarUbicacion" :disabled="editar||ver")
          template(slot="option-label" slot-scope="{ node }")
            span {{ node.raw.codigo }} - {{ node.raw.descripcion }}
          template(slot="value-label" slot-scope="{ node }")
            span {{ node.raw.descripcion }}
        span.font-error.text-danger(v-if="mensajeUbicacionPadre") {{ $t(mensajeUbicacionPadre) }}
      div.vx-col.mb-3
        span.bold.font-label(v-if="editar||ver") {{$t('Código')}}
        texts-box.pt-1.w-full(v-if="editar||ver" size="small" ref="codigo" name="codigo" v-model='ubicacion.codigo' autocomplete="off" :disabled="editar||ver")
      div.vx-col.mb-3
        span.bold.font-label {{$t('Descripción')}}
        span.font-label(v-if="nuevo||editar") (70)
          span.bold.font-label(style='color:#F74F51') *
        texts-box.pt-1.w-full(size="small" ref="descripcion" id="descripcion" name="descripcion" v-model='ubicacion.descripcion' @focus="focus('descripcion')"  v-mask="{mask:maskFuncion(70,'D'),tokens:{'D': {pattern: /[\\W\\w\\s]/}}}" @blur="validarDescripcion();blur('descripcion')" autocomplete="off" :disabled="ver")
        span.font-error.text-danger(v-if="mensajeDescripcion") {{ $t(mensajeDescripcion) }}
      div.vx-col.mb-3
        span.bold.font-label {{$t('Tiene Detalle')}}
        vs-checkbox(v-model="ubicacion.tiene_detalle" @change="verificarHijos" :disabled="verCheck")
        span.font-error.text-danger(v-if="mensajeCheck") {{ $t(mensajeCheck) }}
      div.vx-col.vs-align-items
          span.font-label.bold {{ $t("Estado") }}
          radio-button.mr-3.ml-3(:disabled="ver" v-model="ubicacion.estado" vs-name="ubicacion.estado" :vs-value="true") {{$t('Activo')}}
          radio-button.mr-3.ml-3(:disabled="ver" @change="inactivarUbicacion" v-model="ubicacion.estado" vs-name="ubicacion.estado" :vs-value="false") {{$t('Inactivo')}}
          
    template(slot="footer")

      Binnacle(v-if="!nuevo" :items='footer')

      Buttons( @confirm='validar' :btnConfirm='!ver' @cancel='cancelar(false)' )
</template>

<script>
import swal from 'sweetalert2';
import helperFunctions from '@/functions';
import request from '@/mixins/mixinRequest';
import VxSidebarForm from '@/components/vx-sidebar-form/VxSidebarForm.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';
import Buttons from '@/components/vx-sidebar-form/VxSidebarFormButtons.vue';
import vSelect from 'vue-select';
import vTreeselect from '@riophae/vue-treeselect';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';

export default {
  name: 'FormularioUbicacion',
  mixins: [request],
  components: {
    VxSidebarForm,
    vSelect,
    vTreeselect,
    TextsBox,
    Binnacle,
    Buttons,
    RadioButton
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    parametro: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return this.getDefaultData();
  },

  watch:{
    value(val){
      if(val){
        if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        if(this.parametro.hasOwnProperty('data')) this.cargarData();
        this.validarNivelInicial();
        this.activarFoco();
        this.banderaInicio = true;
      }
    }
  },

  methods: {

    async inactivarUbicacionFuncion(){
      try {
        this.$vs.loading({ type: "point" });
        let {data} = await this.requestApi(`validar_inactivacion_hijos?id=${this.ubicacion.id}&nivel=${this.ubicacion.nivel}`);
        return data.data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async inactivarUbicacion(){
      if(this.editar){
        if(!this.parametro.data.estado) return
        let response = await this.inactivarUbicacionFuncion();
        if(response.estado){
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: this.$t(response.mensaje),
            showCancelButton: true,
            confirmButtonText: this.$t('Sí'),
            cancelButtonText: this.$t("No")
          });
          if(status.value){
            this.ubicacion.estado = !this.parametro.data.estado;
          }else{
            this.ubicacion.estado = this.parametro.data.estado;
          }
        }
      }
    },

    getDefaultData() {
      return {
        title:'',
        ubicacion: {
          id:'',
          nivel:'',
          descripcion: '',
          codigo:'',
          tiene_detalle: true,
          estado: true
        },
        verCheck: false,
        ubicacionPadre: null,
        nuevo: false,
        editar: false,
        ver: false,
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.6
        },
        footer:[],
        //      tempCodigo: '',
        opcionUbicacionPadre: [],
        mensajeNivel:'',
        mensajeDescripcion:'',
        mensajeUbicacionPadre:'',
        mensajeCheck: '',
        banderaInicio: false,
      };
    },

    focus(element) {
      document.getElementById(element).parentNode.parentNode.classList.add("focus");
    },

    blur(element) {
      if (this[element] == "") {
        document.getElementById(element).parentNode.parentNode.classList.remove("focus");
      }
    },

    async validarNivelMaximo(){
      if(this.ubicacion.nivel){
        if(this.ubicacion.nivel == 3){
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: this.$t("El nivel máximo es 3. Este registro no puede tener registros hijos"),
            confirmButtonText: this.$t('Aceptar')
          });
          this.ubicacion.tiene_detalle=false;            
        }
      }
    },

    async verificarHijosFuncion(){
      try {
        this.$vs.loading({ type: "point" });
        let {data} = await this.requestApi(`verificar_hijos_asociados_ubigeo_bo?id=${this.ubicacion.id}`);
        return data.data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async verificarHijos(){
      if(this.editar){
        let response = await this.verificarHijosFuncion();
        if(response.estado){
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: response.mensaje,
            confirmButtonText: this.$t('Aceptar')
          });
          this.ubicacion.tiene_detalle=true;            
        }
        await this.validarNivelMaximo();
      }else{
        await this.validarNivelMaximo();        
      }
    },

    validarNivelInicial(){
      if(this.nuevo && this.banderaInicio){
        this.mensajeNivel = "El nivel es requerido.";
      }else{
        this.mensajeNivel = "";
      }
    },

    async validarNivel(){
      if(this.ubicacion.nivel){
        this.ubicacionPadre = null;
        if(this.ubicacion.nivel > 1) await this.cargarUbicacionPadre(this.ubicacion.nivel);
        if(this.ubicacion.nivel == 3){
          this.verCheck = false;
          this.ubicacion.tiene_detalle = false;
        }else{
          this.verCheck = true;
          this.ubicacion.tiene_detalle = true;
        }
        this.mensajeNivel = "";
      }else{
        this.validarNivelInicial();
      }
    },

    validarDescripcion(){
      if(this.ubicacion.descripcion){
        this.mensajeDescripcion = "";
      }else{
        this.mensajeDescripcion = "La descripción es requerida.";
      }
    },

    validarUbicacion(){
      if(this.ubicacionPadre){
        this.mensajeUbicacionPadre = "";
      }else{
        this.mensajeUbicacionPadre = "La ubicación padre es requerida.";
      }
    },

    cancelar(estado) {
      this.$emit('cancelar', estado);
      this.limpiar();
    },

    async cargarUbicacionPadre(nivel){
      try {
        this.$vs.loading({ type: "point" });
        this.opcionUbicacionPadre = [];
        let {data} = await this.requestApi(`cargar_arbol_activos_ubigeo_bo?nivel=${nivel}`);
        let response = data.data;
        if(response.estado){
          this.opcionUbicacionPadre = this.recursividadChildren(response.data);
        }
      } catch (error) {
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
            value.label =  element.label;
            value.nivel = Number(element.nivel);
            value.descripcion =  element.descripcion;
            value.estado =  element.estado;
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

    cargarData() { 
      if(this.parametro.data){
        Object.assign(this.ubicacion,this.parametro.data);      
        this.ubicacionPadre = this.parametro.data.ubicacion_padre ? {
          id: this.parametro.data.ubicacion_padre,
          label: this.parametro.data.descripcion_padre,
          codigo: this.parametro.data.codigo_padre,
          descripcion: this.parametro.data.descripcion_padre,
        } : '';
        if (this.ver) {
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.parametro.data.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.parametro.data.footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value:this.parametro.data.footer_usuariobo_registro },
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:this.parametro.data.footer_fecha_actualizacion },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:this.parametro.data.footer_ip_actualizacion },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:this.parametro.data.footer_usuariobo_actualizacion }
          ];          
        }
        if (this.editar) {
          this.footer = [
            { icon:'ClockIcon', key: 'Fecha de Registro', value:this.parametro.data.footer_fecha_registro },
            { icon:'ColumnsIcon', key:'IP de Registro', value:this.parametro.data.footer_ip_registro },
            { icon:'UserIcon', key:'Usuario de Registro', value:this.parametro.data.footer_usuariobo_registro },
          ];
        }
      }         
    },

    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },

    async registrar(){
      this.$vs.loading({ type: "point" });
      try {    
        let post = {          
          id: this.ubicacionPadre ? this.ubicacionPadre.id : "",
          descripcion : this.ubicacion.descripcion,
          nivel : this.ubicacion.nivel,        
          estado:this.ubicacion.estado
        }
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("insertar_ubigeo_bo", post, "POST");
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
          id : this.ubicacion.id,
          nivel : this.ubicacion.nivel,
          ubicacion_padre : this.ubicacionPadre,
          descripcion : this.ubicacion.descripcion,
          tiene_detalle_flag: this.ubicacion.tiene_detalle,
          codigo:this.ubicacion.codigo,
          estado:this.ubicacion.estado
        }
        put.ip_actualizacion = await require('public-ip').v4();
        let { data } = await this.requestApi("actualizar_ubigeo_bo", put, "PUT");
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
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

    showErrors() {

      if(this.ubicacion.nivel) this.mensajeNivel = "";
      else  this.mensajeNivel = "El nivel es requerido.";

      if(this.ubicacion.descripcion) this.mensajeDescripcion = "";
      else this.mensajeDescripcion = "La descripción es requerida.";

      if(this.ubicacionPadre || this.ubicacion.nivel == 1 ) this.mensajeUbicacionPadre = "";
      else this.mensajeUbicacionPadre = "La ubicación padre es requerida.";  
      
      if( !this.mensajeNivel && !this.mensajeDescripcion && !this.mensajeUbicacionPadre) return false;
      else return true;
    },

    validarInterfaz(){
      switch(this.parametro.accion){
        case 'nuevo': 
          this.nuevo = true;
          this.verCheck = false;
          this.title = "NUEVA UBICACIÓN";
          break;
        case 'editar': 
          this.editar = true;
          this.verCheck = true;
          this.title = "MODIFICAR UBICACIÓN";
          break;
        case 'ver': 
          this.ver = true;
          this.verCheck = true;
          this.title = "UBICACIÓN [MODO VISTA]";
          break;
      }
    },

    limpiar() {
      Object.assign(this.$data, this.getDefaultData());
    },

    activarFoco() {
      if (this.nuevo)
        setTimeout(() => {
          this.$refs.nivel.focusInput();
        }, 500);
      if (this.editar)
        setTimeout(() => {
          this.$refs.descripcion.focusInput();
        }, 500);
    }
  },
};
</script>
