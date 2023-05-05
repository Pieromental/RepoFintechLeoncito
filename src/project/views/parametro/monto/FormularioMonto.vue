<template lang="pug">
  vx-sidebar-form( id='registrarMonto' v-model='value' parentx='#parentx-monto')
    template(slot="header")
      span {{ $t(title) }}
    template(slot="body")
      div.vx-col.mb-6
        span.bold.font-label {{$t('Monto')}}
        span.font-label(v-if="nuevo")
          span.bold.font-label(style='color:#F74F51') *
        combo-box(ref ="monto" name="monto" :clearable="true" :placeholder="`${$t('Seleccione Monto')}`" :options="optionsMonto" v-model="montoSeleccionado" :disabled="editar||ver" @change="vigente()")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.codigo}} - {{option.label}} 
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}
        span.text-danger.font-error(v-if="mensajeExisteMonto") {{ $t(mensajeExisteMonto) }}
      div.vx-col.mb-3
        span.bold.font-label {{$t('Monto Mínimo')}}
        span.font-label(v-if="nuevo") (12)
        texts-box.pt-1.w-full(size="small" id="minimo" ref="monto_minimo" name="monto_minimo" v-model='monto.monto_minimo' data-vv-validate-on="blur|input" v-mask="{mask:funcionMascara(13,'D'), tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra('monto_minimo',$event,10,2)" @blur="completaDecimal(2,monto.monto_minimo,'monto_minimo')" @keyup="tamanioPorcentaje('monto_minimo')" autocomplete="off" :disabled="editar||ver")
        span.text-danger.font-error(v-if="mensajeMontoMinimo") {{ $t(mensajeMontoMinimo) }}
      div.vx-col.mb-3
        span.bold.font-label {{$t('Monto Máximo')}}
        span.font-label(v-if="nuevo") (12)
        texts-box.pt-1.w-full(size="small" ref="monto_maximo" name="monto_maximo" v-model='monto.monto_maximo' data-vv-validate-on="blur|input" v-mask="{mask:funcionMascara(13,'D') ,tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra('monto_maximo',$event,10,2)" @blur="completaDecimal(2,monto.monto_maximo,'monto_maximo')" @keyup="tamanioPorcentaje('monto_maximo')" autocomplete="off" :disabled="editar||ver")
        span.text-danger.font-error(v-if="mensajeMontoMaximo") {{ $t(mensajeMontoMaximo) }}
      div.vx-col.mb-5
        span.bold.font-label {{$t('Vigente')}}
        check-box(v-model="monto.vigente_flag" @change="mostrarValidacion" :disabled="ver||flagEditar" size="small")     
    template(slot="footer")

      Binnacle( v-if="!nuevo" :items='footer')

      Buttons( @confirm='validate' :btnConfirm='!ver' @cancel='cancel(false)' )
      
</template>

<script>

import helperFunctions from "@/functions";
import request from '@/mixins/mixinRequest';
import swal from 'sweetalert2';
import VxSidebarForm from '@/components/vx-sidebar-form/VxSidebarForm.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';
import Buttons from '@/components/vx-sidebar-form/VxSidebarFormButtons.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import VxButton from '@/components/buttons/Button.vue';

export default {

  name: 'FormularioMonto',
  mixins: [request],

  components: {
    VxSidebarForm,
    TextsBox,
    ComboBox,
    CheckBox,
    VxButton,
    Binnacle,
    Buttons,
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
        this.inicio();
      }
    },
    mensajeMontoMinimo() {
      setTimeout(() => {
        this.mensajeMontoMinimo = '';
      }, 2000);
    },
    mensajeMontoMaximo() {
      setTimeout(() => {
        this.mensajeMontoMaximo = '';
      }, 2000);
    },
    mensajeExisteMonto() {
      setTimeout(() => {
        this.mensajeExisteMonto = '';
      }, 2000);
    }
    
  },

  methods: {
    
    getDefaultData(){
      return {
        title: '',
        nuevo: false,
        editar: false,
        ver: false,
        monto: {
          id: '',
          codigo_monto: '',
          monto_minimo: '',
          monto_maximo: '',
          vigente_flag: false,
          ip: ''
        },
        nuevo: false,
        editar: false,
        ver: false,
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.6
        },
        isMounted: false,
        footer: [],
        optionsMonto: [],
        montoSeleccionado: '',
        mensajeMontoMinimo: '',
        mensajeMontoMaximo: '',
        mensajeExisteMonto: '',
        validacionDatos: '',
        flagEditar: false,
      }
    },

    validarInterfaz(){
      switch(this.parametro.accion){
        case 'nuevo': 
          this.nuevo = true; 
          this.title = "NUEVO MONTO";
          break;
        case 'editar': 
          this.editar = true; 
          this.title = "MODIFICAR MONTO";
          break;
        case 'ver': 
          this.ver = true; 
          this.title = "MONTO [MODO VISTA]";
          break;
      }
    },
    async inicio(){
      try{
        this.$vs.loading({ type: "point" });
        if(this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        await this.cargarMonto();
        if(this.ver || this.editar) await this.cargarDatos(this.parametro.id);
        if(this.nuevo) this.activarFoco();
        this.isMounted=true;
      }catch(error){
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },
    tamanioPorcentaje(type) {
      switch (type){    
        case "monto_minimo":                       
        if (parseFloat(this.monto.monto_minimo) > 9999999999.99) {
          this.monto.monto_minimo = '';
          this.mensajeMontoMinimo= this.$t("El valor no debe ser mayor a 9999999999.99")
        }
        break;
        case "monto_maximo":
          if (parseFloat(this.monto.monto_maximo) > 9999999999.99) {
          this.monto.monto_maximo = '';
          this.mensajeMontoMaximo= this.$t("El valor no debe ser mayor a 9999999999.99")
        }
        break;
      }
     },
    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },
    completaDecimal(lmax, val,type){
      if(val.length){
      switch (type) {
        case "monto_minimo":
        let tempo = val.indexOf('.');
        let nume = 0;
        if(tempo==-1){
          if(lmax==2)  this.monto.monto_minimo = this.monto.monto_minimo+".00";
        }else{
          nume = val.length - (tempo+1);
          let addo = "";
          while(nume!=lmax){
            addo = addo+"0"
            nume++
          }
          if(lmax==2)  this.monto.monto_minimo = this.monto.monto_minimo+addo;
        } 
        break;
        case "monto_maximo":
        let temp = val.indexOf('.');
        let num = 0;
        if(temp==-1){
          if(lmax==2)  this.monto.monto_maximo = this.monto.monto_maximo+".00";
        }else{
          num = val.length - (temp+1);
          let add = "";
          while(num!=lmax){
            add = add+"0"
            num++
          }
          if(lmax==2)  this.monto.monto_maximo = this.monto.monto_maximo+add;
        }
        break;
      }
      }
      this.formatoNumero(type);
     },
    formatoNumero(type) {
      if (this.monto[type].length > 0) {
        let maximo = this.monto.monto_maximo;
        let minimo = this.monto.monto_minimo;
        switch (type) {
          case 'monto_minimo':
            if (parseFloat(minimo) > parseFloat(maximo)) {
              if (this.monto.monto_maximo.length > 0) {
                if (this.monto.monto_maximo == '0.') {
                  this.monto.monto_maximo = '0.01';
                  this.monto.monto_minimo = '0.';
                } else {
                  this.monto.monto_minimo = '';
                }
                this.mensajeMontoMinimo = 'El monto mínimo no debe ser mayor al máximo';
              }
            }
            break;
          case 'monto_maximo':
            if (parseFloat(minimo) > parseFloat(maximo)) {
              if (this.monto.monto_minimo.length > 0) {
                this.monto.monto_maximo = '';
                this.mensajeMontoMaximo = 'El monto máximo debe ser igual o diferente al minimo';
              }
            }
            break;
        }
      }
    },
    formatoLetra(type, val, lEnt, lDec) {
      if (val.length) {
        this.monto[type] = val.length == 1 && val == '.' ? '0.' : val;
        let split = val.split('.');
        switch (split.length) {
          case 1:
            if (split[0].length > lEnt) {
              this.monto[type] = this.monto[type].substring(0, lEnt);
            }
            break;
          case 2:
            if (split[1].length > lDec) {
              split[1] = split[1].substring(0, lDec);
              this.monto[type] = split.join('.');
            }
            break;
          default:
            split.pop();
            this.monto[type] = split.join('.');
            break;
        }
      }
    },
    async cargarMonto() {
      try {
        let { data } = await this.requestApi(`cargar_monto_activo`);
        let response = data.data || [];
        if (response.estado) {
          this.optionsMonto = response.data.map((e) => {
            return {
              id: e.id,
              label: e.descripcion,
              codigo: e.codigo
            };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarDatos(id) {
      if (id != null) {
        try {
          let { data } = await this.requestApi(`ver_monto?id=${id}`);
          let response = data.data;
          if (response.estado) {
            this.monto.id = response.data[0].id;
            this.monto.vigente_flag = response.data[0].vigente_flag;
            this.monto.monto_minimo = response.data[0].monto_minimo;
            this.monto.monto_maximo = response.data[0].monto_maximo;
            this.footer = [
              { icon:'ClockIcon', key: 'Fecha de Registro', value:response.data[0].fecha_registro },
              { icon:'ColumnsIcon', key:'IP de Registro', value:response.data[0].ip_registro},
              { icon:'UserIcon', key:'Usuario de Registro', value:response.data[0].usuariobo_registro }
              
            ];
            if(this.ver){
              this.footer.push(
              { icon:'ClockIcon', key:'Última Fecha de Modificación', value:response.data[0].ultimafecha_modificacion },
              { icon:'ColumnsIcon', key:'Última IP de Modificación', value:response.data[0].ultimaip_modificacion},
              { icon:'UserIcon', key:'Último Usuario de Modificación', value:response.data[0].ultimousuario_modificacion })
            }
            this.montoSeleccionado = this.optionsMonto.find((element) => {
              return element.id == response.data[0].id_master_detallemonto;
            });
            if (this.editar) {
              if (response.data[0].vigente_flag) {
                this.flagEditar = true;
              }
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async mostrarValidacion() {
      if (this.montoSeleccionado != '') {
        let flagMensaje = this.validacionDatos.editable_flag;
        let mensaje = this.$t(this.validacionDatos.mensaje);
        if (flagMensaje) {
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: mensaje,
            showCancelButton: true,
            confirmButtonText: this.$t('Aceptar'),
            cancelButtonText: this.$t('Cancelar')
          });
          if (status.value) {
            this.monto.vigente_flag = true;
          }
        } else {
          await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: mensaje,
            confirmButtonText: this.$t('Aceptar')
          });
          this.monto.vigente_flag = this.validacionDatos.marcar_flag;
        }
      }
    },
    async validate() {
      if (this.montoSeleccionado !== '') {
          let minimo = this.monto.monto_minimo == '' ? false : parseFloat(this.monto.monto_minimo) == 0 ? false : true;
          let maximo = this.monto.monto_maximo == '' ? false : parseFloat(this.monto.monto_maximo) == 0 ? false : true;
          if (minimo || maximo) {
            let mensaje = this.nuevo ? this.$t('¿Desea guardar el registro?') : this.$t('¿Desea actualizar el registro?');
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: mensaje,
              showCancelButton: true,
              confirmButtonText: this.$t('Aceptar'),
              cancelButtonText: this.$t('Cancelar')
            });
            if (status.value) {
              let response = this.nuevo ? await this.registrar() : await this.actualizar();
              if (response.data.estado) {
                this.responseRequest(response.data);
                this.cancel();
              } else {
                this.sweetAlert(response.data);
              }
            }
          } else {
            swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: this.$t('Se debe indicar por lo menos un Monto Mínimo o un Monto Máximo para el parámetro'),
              confirmButtonText: this.$t('Aceptar')
            });
          }
      } else {
        this.mensajeExisteMonto = 'Debe seleccionar un tipo de monto';
      }
    },
    async vigente() {
      try {
        if (this.isMounted) this.$vs.loading({ type: 'point' });
        if (this.montoSeleccionado != '') {
          let { data } = await this.requestApi(`validar_vigente_monto?id=${this.montoSeleccionado.id}`);
          let response = data.data;
          if (response.estado) {
            if (this.nuevo) {
              this.monto.vigente_flag = response.data[0].marcar_flag;
            }
            this.validacionDatos = response.data[0];
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    async registrar() {
      try {
        this.monto.codigo_monto = this.montoSeleccionado.id;
        this.$vs.loading({ type: 'point' });
        let post = this.monto;
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('insertar_monto', post, 'POST');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async actualizar() {
      try {
        this.$vs.loading({ type: 'point' });
        this.monto.codigo_monto = this.montoSeleccionado.id;
        let put = this.monto;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('actualizar_monto', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    cancel() {
      this.$emit('cancel');
      this.errors.clear('registrarMonto');
      this.limpiar();
    },
    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
    activarFoco() {
      if (this.nuevo){
        let input = document.getElementById("monto_minimo");
         setTimeout(() => {
          input.focus();
        }, 500);
      }
       
    },


  },
  
};
</script>