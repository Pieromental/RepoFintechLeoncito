<template lang="pug">
  div  
    vx-popup.width_razon( :title="$t('RATING Y FINANCIAMIENTO')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
      vx-card.card-sticky-floating.styleSticky 
        div.vx-row
          div.vx-col.w-full
            span.bold.font-label {{$t('Riesgo')}} 
              span.font-label.bold.text-danger  *                    
          div.vx-col.w-full
            combo-box.font-label.w-fullna(name="riesgo" :filterBy="filterByIdLabel" label="label" :clearable="false" :placeholder="`${$t('Seleccione un Riesgo')}`" :options="listarRiesgos" v-model="riesgoSeleccionado" @change="cambiarRiesgo()")
              template(slot="selected-option" slot-scope="option")
                span {{option.label}}
              template(slot="option" slot-scope="option")
                span {{option.label}} 
              template(slot="no-options")
                small {{ $t("No se encontraron registros.") }}
            span.bold.font-label(v-if="mensajeRiesgo") {{ $t(mensajeRiesgo) }}
          div.vx-col.w-full
            span.bold.font-label {{$t('TEA PEN (%) para Costo Financiamiento')}}
              span.font-label.bold.text-danger  *
          div.vx-col.w-full          
            texts-box.pt-1.w-full(size="small" autocomplete="off" ref="tasaPEN" name="tasaPEN" v-model='tasaPEN' v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra($event,3,2,'tasaPEN')" @blur="completaDecimal(2,tasaPEN,'tasaPEN')" @keyup="tamanioPorcentaje('tasaPEN')" :disabled="false")
            span.text-danger.font-error(v-if="mensajeTasaPEN") {{ $t(mensajeTasaPEN) }}
          div.vx-col.w-full
            span.bold.font-label {{$t('TEA USD (%) para Costo Financiamiento')}}
              span.font-label.bold.text-danger  *
          div.vx-col.w-full          
            texts-box.pt-1.w-full(size="small" autocomplete="off" ref="tasaUSD" name="tasaUSD" v-model='tasaUSD' v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra($event,3,2,'tasaUSD')" @blur="completaDecimal(2,tasaUSD,'tasaUSD')" @keyup="tamanioPorcentaje('tasaUSD')" :disabled="false")
            span.text-danger.font-error(v-if="mensajeTasaUSD") {{ $t(mensajeTasaUSD) }}
          div.vx-col.w-full
            span.bold.font-label {{$t('Garantía (%)')}}
              span.font-label.bold.text-danger  *
          div.vx-col.w-full          
            texts-box.pt-1.w-full(size="small" autocomplete="off" ref="garantia" name="garantia" v-model='garantia' v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra($event,3,2,'garantia')" @blur="completaDecimal(2,garantia,'garantia')" @keyup="tamanioPorcentaje('garantia')" :disabled="false")
            span.text-danger.font-error(v-if="mensajeErrorGarantia") {{ $t(mensajeErrorGarantia) }}
          div.vx-col.w-full  
            span.bold.font-label(v-if="mensajeGarantia") {{ $t(mensajeGarantia) }}
        div.vx-row.vs-justify-flex-end.mt-4         
          vx-button.mr-3(@click="cancelar") {{$t('CANCELAR')}}
          vx-button.mr-3(@click="validarFormulario") {{$t('CONFIRMAR')}}
</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import vSelect from 'vue-select';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import VxButton from '@/components/buttons/Button.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';

export default {

  name: 'PopupCambiarRiesgo',
  mixins: [request],

  components: {
    FooterOpciones,
    vSelect,
    VxButton,
    ComboBox,
    TextsBox
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    id:{
      type: Number,
      default: '',
    },
  },

  data() {
    return this.getDefaultData()
  },
  
  watch:{
    async popupRazonActive(val){
      if(val){
        await this.cargarRiesgoEmpresaDefecto();
        await this.cargarCombo();
      }
    }
  },

  methods:{

    async cargarRiesgoEmpresaDefecto(){
      try { 
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`listar_riesgo_empresa_bo?id=${this.id}`);        
        let response = data.data;                          
        if (response.estado) {                              
          this.riesgoSeleccionado = {
            id: response.data[0].id_riesgo_defecto,
            label: response.data[0].codigo_riesgo_defecto + " - " +response.data[0].descripcion_riesgo_defecto,
          }
          if (response.data[0].adelanto) this.mensajeGarantia = this.$t('El adelanto por defecto es de ') + response.data[0].adelanto + this.$t('%');
          if (response.data[0].garantia) this.garantia = response.data[0].garantia; 
          if (response.data[0].tea_pen_costo_financiamiento) this.tasaPEN = response.data[0].tea_pen_costo_financiamiento;
          if (response.data[0].tea_usd_costo_financiamiento) this.tasaUSD = response.data[0].tea_usd_costo_financiamiento;
        } else {
          this.riesgoSeleccionado = {};
        }
        this.idRiesgo = this.riesgoSeleccionado.id;
      } catch (error) {
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },

    async cargarCombo(){
      try {
        this.$vs.loading({ type: 'point' });   
        let { data } = await this.requestApi('cargar_riesgo_nuevo');
        let response = data.data || []; 
        if (response.estado) {
          this.listarRiesgos = response.data.map((e) => {
            return {
              id: e.id,
              label: e.codigo+" - "+e.descripcion
            }
          });
          let flag = this.listarRiesgos.find(element => {return element.id == this.idRiesgo});
          if (!flag) {            
            this.listarRiesgos.unshift(this.riesgoSeleccionado)
          }
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    cambiarRiesgo(){
      if (this.riesgoSeleccionado.id) {
        if (this.riesgoSeleccionado.id == this.idRiesgo) {
          this.verBoton=false;
          this.mensajeRiesgo="El riesgo que se muestra es el riesgo actual de la empresa."         
        }else{
          this.verBoton=true;
          this.mensajeRiesgo=""
        }
      }
    },

    async validarFormulario(){
      if (this.showErrors()) return
      try {
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: this.$t('¿Está seguro que desea actualizar los datos para la empresa?'),
          showCancelButton: true,
          confirmButtonText: this.$t('Si'),
          cancelButtonText: this.$t('No')
        });
        if(status.value){
          this.$vs.loading({ type: 'point' });  
          let put={};
          put.id = this.id;
          put.id_riesgo = this.riesgoSeleccionado.id;
          put.tea_soles = this.tasaPEN;
          put.tea_dolares = this.tasaUSD;
          put.garantia = this.garantia;
          put.ip = await require('public-ip').v4();
          let {data} = await this.requestApi('actualizar_rating', put,"PUT");
          let response = data.data || []; 
          if(response.estado){
            this.responseRequest(response);
          }else{
            this.sweetAlert(response);
          }                
        }     
        this.cancelar();             
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        riesgoSeleccionado: {
          id:''
        },
        verBoton: false,
        mensajeRiesgo:"El riesgo que se muestra es el riesgo actual de la empresa.",
        listarRiesgos:[],
        idRiesgo: 0,
        tasaPEN:'',
        tasaUSD:'',
        mensajeTasaPEN:'',
        mensajeTasaUSD:'',
        garantia:'',
        mensajeErrorGarantia:'',
        mensajeGarantia:''
      }
    }, 

    cancelar(){
      this.limpiar();
      this.$emit('closePopup',false);
    },
    
    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },

    tamanioPorcentaje(tipo) {
      if (tipo=='tasaPEN') {
        if (parseFloat(this.tasaPEN) > 100) {
          this.mensajeTasaPEN = this.$t('El valor no debe ser mayor a 100.00');
          setTimeout(() => {
            this.tasaPEN = '';
          }, 250);
        }else{
          this.mensajeTasaPEN = '';
        }              
      }
      if (tipo=='tasaUSD') {
        if (parseFloat(this.tasaUSD) > 100) {
          this.mensajeTasaUSD = this.$t('El valor no debe ser mayor a 100.00');
          setTimeout(() => {
            this.tasaUSD = '';
          }, 250);
        }else{
          this.mensajeTasaUSD = '';
        }              
      }
      if (tipo=='garantia') {
        if (parseFloat(this.garantia) > 100) {
          this.mensajeErrorGarantia = this.$t('El valor no debe ser mayor a 100.00');
          setTimeout(() => {
            this.garantia = '';
          }, 250);
        }else{
          this.mensajeErrorGarantia = '';
        }
      }
    },

    completaDecimal(lmax, val,tipo) {
      if (tipo=='tasaPEN') {
        if (this.tasaPEN) {
          this.mensajeTasaPEN = '';
          if (val.length) {
            let temp = val.indexOf('.');
            let num = 0;
            if (temp == -1) {
              if (lmax == 2) this.tasaPEN = this.tasaPEN + '.00';
            } else {
              num = val.length - (temp + 1);
              let add = '';
              while (num != lmax) {
                add = add + '0';
                num++;
              }
              if (lmax == 2) this.tasaPEN = this.tasaPEN + add;
            }
          }
        }else{
          this.mensajeTasaPEN = 'La TEA PEN (%) para Costo Financiamiento es requerida.'
        }              
      }
      if (tipo=='tasaUSD') {
        if (this.tasaUSD) {
          this.mensajeTasaUSD = '';
          if (val.length) {
            let temp = val.indexOf('.');
            let num = 0;
            if (temp == -1) {
              if (lmax == 2) this.tasaUSD = this.tasaUSD + '.00';
            } else {
              num = val.length - (temp + 1);
              let add = '';
              while (num != lmax) {
                add = add + '0';
                num++;
              }
              if (lmax == 2) this.tasaUSD = this.tasaUSD + add;
            }
          }
        }else{
          this.mensajeTasaUSD = 'La TEA USD (%) para Costo Financiamiento es requerida.'
        }              
      }
      if (tipo=='garantia') {
        if (this.garantia) {
          this.mensajeErrorGarantia = '';
          if (val.length) {
            let temp = val.indexOf('.');
            let num = 0;
            if (temp == -1) {
              if (lmax == 2) this.garantia = this.garantia + '.00';
            } else {
              num = val.length - (temp + 1);
              let add = '';
              while (num != lmax) {
                add = add + '0';
                num++;
              }
              if (lmax == 2) this.garantia = this.garantia + add;
            }
          }
        }else{
          this.mensajeErrorGarantia = 'La Garantía es requerida.'
        }              
      }
    },
    
    formatoLetra(val, lEnt, lDec,tipo) {
      if (val.length) {
        if (tipo=='tasaPEN') {
          this.tasaPEN = val.length == 1 && val == '.' ? '0.' : val;   
          let split = val.split('.');
          switch (split.length) {
            case 1:
              if (split[0].length > lEnt) {
                this.tasaPEN = this.tasaPEN.substring(0, lEnt);
              }
              break;
            case 2:
              if (split[1].length > lDec) {
                split[1] = split[1].substring(0, lDec);
                this.tasaPEN = split.join('.');
              }
              break;
            default:
              split.pop();
              this.tasaPEN = split.join('.');
              break;
          }
        }
        if (tipo=='tasaUSD') {
          this.tasaUSD = val.length == 1 && val == '.' ? '0.' : val;   
          let split = val.split('.');
          switch (split.length) {
            case 1:
              if (split[0].length > lEnt) {
                this.tasaUSD = this.tasaUSD.substring(0, lEnt);
              }
              break;
            case 2:
              if (split[1].length > lDec) {
                split[1] = split[1].substring(0, lDec);
                this.tasaUSD = split.join('.');
              }
              break;
            default:
              split.pop();
              this.tasaUSD = split.join('.');
              break;
          }
        }
        if (tipo=='garantia') {
          this.garantia = val.length == 1 && val == '.' ? '0.' : val;
          let split = val.split('.');
          switch (split.length) {
            case 1:
              if (split[0].length > lEnt) {
                this.garantia = this.garantia.substring(0, lEnt);
              }
              break;
            case 2:
              if (split[1].length > lDec) {
                split[1] = split[1].substring(0, lDec);
                this.garantia = split.join('.');
              }
              break;
            default:
              split.pop();
              this.garantia = split.join('.');
              break;
          }
        }        
      }
    },

    showErrors() {      
      if(this.tasaPEN) this.mensajeTasaPEN = "";
      else  this.mensajeTasaPEN = "La TEA PEN (%) para Costo Financiamiento es requerida.";      
      if(this.tasaUSD) this.mensajeTasaUSD = "";
      else  this.mensajeTasaUSD = "La TEA USD (%) para Costo Financiamiento es requerida.";      
      if(this.garantia) this.mensajeErrorGarantia = "";
      else  this.mensajeErrorGarantia = "La Garantía es requerida.";            
      if(!this.mensajeTasaPEN && !this.mensajeTasaUSD && !this.mensajeErrorGarantia){
        return false;        
      } 
      else return true;
    },
  },
  
};
</script>

<style>
.width_razon .vs-popup {
  width: 65% !important;
}
.con-vs-popup.width_razon .vs-popup--content{
  height: auto !important;
}
.con-vs-popup.fullscreen.width_razon .vs-popup{
  height: auto !important;
}
.vx-card.card-sticky-floating.styleSticky .vx-card{
  top: auto !important;
}
.vx-card.card-sticky-floating.styleSticky {
  top: auto !important;
}

.font-label textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
}
.font-label .vs-con-textarea {
  padding: 0.4rem;
  font-size: 11px !important;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
</style>
