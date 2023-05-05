<template lang="pug">
  div
    form.w-full
      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Rol')}}
        div.vx-col.w-full(class="sm:w-1/2")
          combo-box( ref="monto2" name='monto2' :clearable="true" :options="options" v-model="rol" :placeholder="`${$t('Seleccione un rol')}`" :disabled="accion" :maxHeight="'155px'" )
            template(slot="selected-option" slot-scope="option")
              span {{option.label}}
            template(slot="option" slot-scope="option")
              span {{option.codigo}} - {{option.label}}
            template(slot="no-options")
              small {{ $t("No se encontraron registros.") }}
          
          span.text-danger.font-error(v-if='obligatorio') {{ "El rol es requerido" }}
          span.text-danger.font-error(v-if='flag') {{ "El rol seleccionado ya fue agregado. Debe ingresar un rol diferente." }}

      div.vx-row.mb-3
        div.vx-col.w-full(class="sm:w-1/3")
          span.bold.font-label {{$t('Estado')}}
        div.vx-col.vs-align-items
          radio-button.ml-3.mr-3.font-label( v-model="estado" vs-name="estado" :vs-value="true" ) {{$t("Activo")}}
          radio-button.ml-3.mr-3.font-label( v-model="estado" vs-name="estado" :vs-value="false" ) {{$t("Inactivo")}}
      
      div.vx-col.w-full.mb-5(v-if="!nuevo && accion")              
        footer-datos( :items='footer')  

      footer-button(:sidebar="true"  @aceptar="validar" @cancelar="cancelarDetalle")

</template>

<script>

import { Validator } from "vee-validate";
import helperFunctions from "@/functions";
import swal from "sweetalert2";
import request from "@/mixins/mixinRequest"
import FooterButton from '@/components/footer/FooterButton.vue';
import vSelect from 'vue-select';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
import FooterDatos from '@/components/footer/FooterData.vue';

  const dictEs = {
    custom: {
      mensajeEstado: {
        required: 'El Estado es requerido.'
      },
    }
  };
  const dictEn = {
    custom: {
      mensajeEstado: {
        required: 'The state is required',
      },
    }
  };

export default {

  name: "DetalleFormulario",
  mixins: [request],
  components: {
    vSelect,
    FooterButton,
    ComboBox,
    RadioButton,
    FooterDatos
  },
  props: {
    actualizarRol : {
      type : Boolean,
      default : false
    },
    dataDetalle: {
      type: Object,
      default: () => {}
    },
    listado:{
      type: Array,
      default: () => []
    },
    accion :{
      type: Boolean,
      default: true
    },
    index : {
      type :String,
      default :""
    }
  },

  data() {
    return this.getDefaultData()
  },

  watch: {
    actualizarRol(){
      if( this.actualizarRol ){
        this.limpiar();
        this.$emit("actualizarRolAsignado",true);
      }
    },

    dataDetalle(){
      if( this.index != "" && this.dataDetalle != null){
        let obtenerRol = {
          id_rol : this.dataDetalle.id_rol,
          codigo : this.dataDetalle.codigo,
          label  : this.dataDetalle.descripcion
        };

        this.rol = this.accion ? obtenerRol : "";
        this.nuevo = this.dataDetalle.id_detalle == null ? true : false;
        this.estado = this.accion ? this.dataDetalle.estado : true;
        this.footer = this.accion ? [
          { icon:'ClockIcon', key: 'Fecha de Registro', value: this.dataDetalle.footer_fecha_registro },
          { icon:'ColumnsIcon', key:'IP de Registro', value: this.dataDetalle.footer_ip_registro },
          { icon:'UserIcon', key:'Usuario de Registro', value: this.dataDetalle.footer_usuariobo_registro },
          { icon:'ClockIcon', key:'Última Fecha de Modificación', value: this.dataDetalle.footer_fecha_actualizacion },
          { icon:'ColumnsIcon', key:'Última IP de Modificación', value: this.dataDetalle.footer_ip_actualizacion },
          { icon:'UserIcon', key:'Último Usuario de Modificación', value: this.dataDetalle.footer_usuariobo_actualizacion }
        ] : [];
      }else{
        this.limpiar();
      } 
    },
    rol(){
      if( this.rol != "" ){
        this.flag = false;
        this.obligatorio = false;
      }
    }
  },

  methods:{
    getDefaultData(){
      return {
        options: [],
        rol: '',
        estado : true,
        flag : false,
        obligatorio : false,
        footer : [],
        nuevo : false
      };
    }, 
    validarRuta(nombre){
      switch (nombre){
        case 'nuevo':
          return this.nuevo = true;
        case 'editar':
          return this.editar = true;
      }
      },

    closePopup() {
      this.$emit('closePopup');
    },

    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
      },

    showErrors() {
      let array = this.$validator.errors.items;
      if(array.length){
        setTimeout(() => { this.$refs[array[0].field].focusInput(); }, 500);
        let data = {
          estado: false,
          mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos resaltados en color rojo.'),
          tipoMEnsaje: 'TMSGADV',
        }
        this.responseRequest(data);
      }
    },
    

    async validar() {
      if( this.rol == "" ){
        this.obligatorio = true;
      }else{
        if( this.accion ){
          this.listado[this.index].estado = this.estado;
          this.cancelarDetalle();        
        }else{
          if( this.listado.filter( (e) =>  e.id_rol == this.rol.id_rol ).length == 0 ){
            this.rol.estado = this.estado;
            this.rol.descripcion = this.rol.label;
            this.rol.id_detalle = null;
            this.listado.push(this.rol);          
            this.cancelarDetalle();
          }else{
            this.rol = "";
            this.flag = true;
          }
        } 
      }  
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
      this.cargarRoles();
    },


    cancelarDetalle() {
      this.limpiar();
      this.$emit('cancelarDetalle');
    },

    activarFoco(){
        if(this.nuevo) setTimeout(() => { this.$refs.codigo.focusInput(); }, 500);
        if(this.editar) setTimeout(() => { this.$refs.descripcion.focusInput(); }, 500);
    },

    async cargarRoles() {
      try {
        let { data } = await this.requestApi(`cargar_roles_no_asignados_back_office?id=${this.$route.params.id}`);
        let response = data.data || [];
        if (response.estado) {
          this.options = response.data.map((e) => {
            return {
              id_rol: e.object.id,
              codigo: e.object.codigo,
              label : e.object.descripcion
            };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

  },

  async mounted() {
    try{
      this.$vs.loading({ type: "point" });
      await this.cargarRoles();
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  },  

  updated() {
    if (this.$i18n.locale == 'es')
      Validator.localize(this.$i18n.locale, dictEs);
    else
      Validator.localize(this.$i18n.locale, dictEn);
  }
}
</script>