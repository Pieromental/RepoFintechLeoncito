<template lang="pug">
  div 
    popup-informe-revision(:popupRazonActive="verPopupInforme" @closeInforme="closeInforme" @cancelar="cancelar" :id="id" :listarRepresentantes="listadoRepresentantes" :listarCuentas="listadoCuentas" :observacionRechazoEmpresa="observacionRechazoEmpresa" :riesgo="riesgoSeleccionado" :nombreComercial="nombreComercial" :esAprobadoFlag="esAprobadoFlag" :caso="caso" :mostrarRepresentantes="mostrarRepresentantes" :mostrarCuentas="mostrarCuentas" :flagUsuario="flagUsuario" :garantia="garantia" :teaSoles="tasaPEN" :teaDolares="tasaUSD")    
    vx-popup.width_razon( :title="$t('RATING y FINANCIAMIENTO')" :active="popupRazonActive" @close="cancelar" :click-not-close="false" fullscreen classContent="popup-example" )
      vx-card.card-sticky-floating.styleSticky 
        div.vx-row
          div.vx-col.w-full
            span.bold.font-label {{$t('Riesgo')}} 
              span.font-label.bold.text-danger  *                    
          div.vx-col.w-full
            combo-box.font-label.w-full(name="riesgo" :filterBy="filterByIdLabel" label="label" :clearable="false" :placeholder="`${$t('Seleccione un Riesgo')}`" :options="listarRiesgos" v-model="riesgoSeleccionado" @change="cambiarRiesgo()" :disabled="verCombo")
              template(slot="selected-option" slot-scope="option")
                span {{option.label}}
              template(slot="option" slot-scope="option")
                span {{option.label}} 
              template(slot="no-options")
                small {{ $t("No se encontraron registros.") }}
            span.bold.font-label(v-if="mensajeRiesgo") {{ $t(mensajeRiesgo) }}
          div.vx-col.w-full
            check-box(v-model="valorCheck" @change="ocultarCombo")
            span.bold.font-label {{$t('Usar Riesgo por Defecto')}}
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
        div.vx-row.vs-justify-flex-end.mt-4(v-if='casoRiesgo==1')
          vx-button.mr-3(@click="btnConfirmar") {{$t('CONFIRMAR')}}
        div.vx-row.vs-justify-flex-end.mt-4(v-if='casoRiesgo!=1')          
          vx-button.mr-3(@click="cancelar") {{$t('ATRÁS')}}
          vx-button.mr-3(@click="validarFormulario") {{$t('SIGUIENTE')}}

</template>

<script>
import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import vSelect from 'vue-select';
import FooterOpciones from '@/components/footer/FooterButton.vue';
import PopupInformeRevision from "@/project/views/empresa/empresa/popup/PopupInformeRevision.vue";
import VxButton from '@/components/buttons/Button.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';

export default {

  name: 'PopupSeleccionarRiesgo',
  mixins: [request],

  components: {
    FooterOpciones,
    vSelect,
    PopupInformeRevision,
    VxButton,
    ComboBox,
    CheckBox,
    TextsBox
  },

  props: {
    popupRazonActive: {
      type: Boolean,
      default: false
    },
    casoRiesgo:{
      type: Number,
      default: 0,
    },
    //DATOS PARA ENVIAR AL INFORMA
    id:{
      type: Number,
      default: 0,
    },
    listadoRepresentantes:{
      type: Array,
      default: () => []
    },
    listadoCuentas:{
      type: Array,
      default: () => []
    },
    observacionRechazoEmpresa:{
      type: String,
      default: ''
    },
    nombreComercial:{
      type: String,
      default: ''
    },
    esAprobadoFlag: {
      type: Boolean,
      default: false
    },
    caso:{
      type: Number,
      default: 0,
    },
    mostrarRepresentantes:{
      type: Boolean,
      default: false
    },
    mostrarCuentas:{
      type: Boolean,
      default: false
    },
    flagUsuario: {
      type: Boolean,
      default: false

    },
  },

  data() {
    return this.getDefaultData()
  },

  watch:{
    async popupRazonActive(val){
      if(val){
        await this.cargarRiesgoEmpresa();
        await this.cargarCombo();
        await this.cargarData();
      }
    }
  },
  
  methods:{

    async cargarData(){
      try { 
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`obtener_porcentaje_adelanto`);        
        let response = data.data;                          
        if (response.estado) {
          if (response.data[0].valor_adelanto) this.mensajeGarantia = this.$t('El adelanto por defecto es de ') + response.data[0].valor_adelanto + this.$t('%');
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        this.$vs.loading.close();
      }
    },

    async cargarRiesgoEmpresa(){
      try { 
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`listar_riesgo_empresa_bo?id=${this.id}`);        
        let response = data.data;                          
        if (response.estado) {
          this.riesgoSeleccionado = {
            id: response.data[0].id_riesgo_defecto,
            label: response.data[0].codigo_riesgo_defecto + " - " +response.data[0].descripcion_riesgo_defecto,
          }
          this.idRiesgo = this.riesgoSeleccionado.id
        }else{
          this.riesgoSeleccionado = {};
        }
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
          this.riesgo = this.riesgoSeleccionado;
        }
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    ocultarCombo(){
      if (this.valorCheck) {        
        this.verCombo = true;
        this.riesgoSeleccionado = this.riesgo;
      }else{
        this.verCombo = false;
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

    convertirListados(){
      this.listaRepresentantes = this.listadoRepresentantes.map((e)=>{
        return{
          id_representante_legal: e.id_presentante_legal,
          observaciones_representante_legal: e.observacion_rechazo,
          representante_legal_flag : e.esAprobadoFlag
        }                    
      });
      this.listaCuentas = this.listadoCuentas.map((e)=>{
        return{
          id_cuenta_bancaria: e.id_cuenta,
          observaciones_cuenta_bancaria: e.observacion_rechazo,
          cuenta_bancaria_flag : e.esAprobadoFlag
        }
      });
    },

    async funcionRevisionAprobado(){
      try {
        this.$vs.loading({ type: "point" });
        this.convertirListados();
        let post = {
          id : this.id,
          id_riesgo : this.riesgoSeleccionado.id,
          representante_legal : this.listaRepresentantes,
          cuenta_bancaria : this.listaCuentas,
          tea_soles: parseFloat(this.tasaPEN),
          tea_dolares: parseFloat(this.tasaUSD),
          garantia: parseFloat(this.garantia),
        }
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("revisar_activar_empresa_bo", post, "POST");
        return data
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    async btnConfirmar(){
      if (this.showErrors()) return
      let status = await swal.fire({
        title: this.$t('Mensaje de Sistema'),
        text: this.$t('¿Está seguro que desea activar el registro?'),
        showCancelButton: true,
        confirmButtonText: this.$t('SI'),
        cancelButtonText: this.$t('NO')
      });
      if (status.value) {
        let response = await this.funcionRevisionAprobado();        
        if(response.data.estado){
          this.responseRequest(response.data);
          this.cancelar();
          setTimeout(() => { this.$router.push(`/empresa-empresa-revisar`); }, 100);
        }else{
          this.sweetAlert(response.data);
        } 
      }
    },

    validarFormulario(){
      if (this.showErrors()) return
      this.verPopupInforme = true;
    },

    getDefaultData(){
      return {
        riesgoSeleccionado: {
          id:''
        },
        riesgo: {},
        idRiesgo:0,
        listarRiesgos:[],
        mensajeRiesgo:"",
        verCombo: true,
        valorCheck: true,
        verPopupInforme: false,
        listaRepresentantes:[],
        listaCuentas:[],
        tasaPEN:'',
        tasaUSD:'',
        mensajeTasaPEN:'',
        mensajeTasaUSD:'',
        garantia:'',
        mensajeErrorGarantia:'',
        mensajeGarantia:'',
      }
    }, 

    cancelar(){
      this.limpiar();
      this.$emit('closePopupRiesgo',false);
    },
    
    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },

    closeInforme() {
      this.verPopupInforme = false;
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