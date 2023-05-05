<template lang="pug">

  vx-sidebar-form( id='ExampleForm' v-model='value' parentx='#parentx-ejemplo')
  
    template(slot="header")
      
      span {{ title }}

    template(slot="body")

      div.vx-col.mb-3
        span.bold.font-label {{$t("Nombre:")}} 
        span.font-label (40)
          span.font-label.bold.text-danger  *
        texts-box( ref="codigo" name="codigo"  v-model="configuracion.codigo" v-mask="{mask:funcionMascara(30,'D'),tokens:{'D': {pattern: /[\\W\\w\\s]+$/, transform: v => v.toLocaleUpperCase()},}}" @blur="validarCodigo" @keyup.enter.prevent="validarCodigo" @input="changeCodigo($event)" :disabled="ver")
        span.font-error.text-danger(v-if="mensajeCodigo") {{ $t(mensajeCodigo) }}

      div.vx-col.mb-3
        span.bold.font-label {{$t('Puesto:')}}
        combo-box( ref="ComboBox1" name='ComboBox1' :clearable="true" :options="opcionMoneda" v-model="monedaSeleccionada" :disabled="ver" :placeholder="`${$t('Seleccione una Moneda')}`")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.codigo}} - {{option.label}}
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}

      div.vx-col.mb-3
        span.bold.font-label {{$t("Telefono:")}}
        groups-box
          template(slot="prepend")
            div(class="prepend-text" :title="`${$t('Código del Perú')}`")
              span.font-label +51
          texts-box( ref='telefono' name='telefono' v-model='configuracion.telefono' v-mask="{mask: funcionMascara(9,'D'),tokens:{'D': {pattern: /[0-9]/}}}" :disabled="ver")
            
      div.vx-col.mb-6
        span.bold.font-label {{$t('Combo Box :')}}
        combo-box( ref="ComboBox2" name='ComboBox2' :clearable="true" :options="opcionMoneda" v-model="monedaSeleccionada" :disabled="ver" :placeholder="`${$t('Seleccione una Moneda')}`")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.codigo}} - {{option.label}}
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}
      //- div.vx-col.mb-3
      //-   span.bold.font-label {{$t('View Download:')}}
      //-   view-download( :src="require('@/assets/images/slider/04.jpg')" :btnDescargar="!ver" )

      //- div.vx-col.mb-5
      //-   check-box( v-model="disabledFields" ) {{$t("Deshabilitar Campos")}}
        
      div.vx-col
        .vs-align-items
          span.bold.font-label.mr-3 {{$t('Radio Button:')}}
          radio-button.ml-3.mr-3( v-model="configuracion.estado" vs-name="configuracion.estado" :vs-value="true" :disabled="ver") {{$t("Activo")}}
          radio-button.ml-3.mr-3( v-model="configuracion.estado" vs-name="configuracion.estado" :vs-value="false" :disabled="ver") {{$t("Inactivo")}}
          
    template(slot="footer")

      Binnacle( v-if="!nuevo" :items='footer')

      Buttons( @confirm='validate' :btnConfirm='!ver' @cancel='cancel(false)' )
      
</template>

<script>

import helperFunctions from "@/functions";
import request from '@/mixins/mixinRequest';

import VxSidebarForm from '@/components/vx-sidebar-form/VxSidebarForm.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';
import Buttons from '@/components/vx-sidebar-form/VxSidebarFormButtons.vue';

import TextsBox from '@/components/fields/input/TextsBox.vue';
import GroupsBox from '@/components/fields/input/GroupsBox.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import ViewDownload from '@/components/fields/view/ViewDownload.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
import VxButton from '@/components/buttons/Button.vue';

export default {

  name: 'FormularioEjemplo',
  mixins: [request],

  components: {
    VxSidebarForm,
    TextsBox,
    GroupsBox,
    ComboBox,
    CheckBox,
    ViewDownload,
    RadioButton,
    VxButton,
    Binnacle,
    Buttons
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    parametro: {
      type: Object,
      default: {}
    }
  },

  data() {
    return this.getDefaultData();
  },
  
  watch: {

    value(val){
      if(val){
        // this.$vs.loading({ type: "point" });
        if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        if(!this.ver) this.cargarMoneda();
        if(this.parametro.hasOwnProperty('data')) this.cargarData();
        // this.$vs.loading.close();
      }
    }
    
  },

  methods: {
    
    getDefaultData(){
      return {
        title: '',

        configuracion: {
          id: '',
          codigo: '',
          telefono: '',
          descripcion: '',
          descripcionIngles: '',
          estado: true
        },
        mensajeCodigo: '',

        opcionMoneda: [],
        monedaSeleccionada: [],
        mensajeMoneda: '',
        disabledMoneda: false,
        
        disabledFields: false,

        nuevo: false,
        editar: false,
        ver: false,

        footer: [],
      }
    },

    validarInterfaz(){
      switch(this.parametro.accion){
        case 'nuevo': 
          this.nuevo = true; 
          this.title = "Nuevo Ejemplo";
          break;
        case 'editar': 
          this.editar = true; 
          this.title = "Editar Ejemplo";
          break;
        case 'ver': 
          this.ver = true; 
          this.title = "Ver Ejemplo";
          break;
      }
    },
    
    async cargarMoneda() {
      try {
        this.opcionMoneda = [
          { id: '01', codigo: 'P01', label: 'PUESTO-UNO', estado: true },
          { id: '02', codigo: 'P02', label: 'PUESTO-DOS', estado: true },
          { id: '03', codigo: 'P03', label: 'PUESTO-TRES', estado: false }
        ];
      } catch (error) {
        throw new Error(error);
      }
    },

    cargarData(){
      if(this.parametro.data){
        this.configuracion.codigo = this.parametro.data.nombre;
        this.configuracion.telefono = this.parametro.data.telefono.substring(3,12);
        this.configuracion.estado = this.parametro.data.estado;
        this.footer = [
          { icon:'ClockIcon', key:'Fecha de Registro', value:'02/07/1996 12:12:12' },
          { icon:'ColumnsIcon', key:'IP de Registro', value:'192.168.122.125' },
          { icon:'UserIcon', key:'Usuario de Registro', value:'MANAGER' }
        ];
        if(this.ver){
          this.footer.push(
            { icon:'ClockIcon', key:'Última Fecha de Modificación', value:'02/07/1996 12:12:12' },
            { icon:'ColumnsIcon', key:'Última IP de Modificación', value:'192.168.122.125' },
            { icon:'UserIcon', key:'Último Usuario de Modificación', value:'MANAGER'}
          );
        }
      }
    },

    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },

    validarCodigo(){
      
    },
    
    changeCodigo(){
      
    },

    async validate(){
      try {
        this.cancel();
      } catch (error) {
        throw new Error(error);
      } finally {
        //this.$vs.loading.close();
      }
    },
    
    cancel(){
      this.$emit('cancel');
      this.limpiar();
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

  },
  
};

</script>