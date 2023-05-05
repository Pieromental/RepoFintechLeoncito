<template lang="pug">
    div
      popup-resumen-inversion(:PopupResumenInversionActive="verPopupResumen" @closePopup="closePopup" @cancelar="cancelarHijo" @recibirLista="recibirLista" @eliminarInversiones="eliminarInversiones" :dataResumen="resumen" :esSubasta="esSubasta" :esVelocidad="esVelocidad" :montoInversion="montoInversionEnviar" :idInversion="idInversionEnviar" :gananciaFinal="gananciaFinalEnviar" :listaInversiones="listaInversiones" :idSubasta="idSubastaEnviar")
      vx-popup.width_popup_cuenta_contable_formulario( :title="$t(tituloPopup)" :active="PopupVerInversion" @close="cancelar" :click-not-close="false" classContent="popup-example" )
        div.vx-row.mb-3
          div.vx-col.w-full.text-center
            span.title-header.uppercase.bold {{ $t('Inversionista') }}
            vs-divider.mt-2
        div.vx-row.w-full.mb-3
          div.vx-col(class="sm:w-1/3")
            span.font-label.bold {{ $t("Nombres: ") }} 
          div.vx-col(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.nombres" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Apellidos: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.apellidos" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Tipo de Documento: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.tipo_documento_codigo" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Numero de Documento: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.numero_documento" :disabled="true") 
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ver Inversionista: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            vx-button(@click="verInversionista(dataInversion.inversionista_id)") {{$t('Ver Inverionista')}}    
        vs-divider.my-5
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Monto: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.monto_inversion" :disabled="true")    
        div.vx-row.w-full.mb-3                  
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEA Mínima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.tea_minima" :disabled="true")    
        div.vx-row.w-full.mb-3                  
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEM Mínima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.tem_minima" :disabled="true")    
        div.vx-row.w-full.mb-3                  
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ganancia Mínima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.ganancia_minima" :disabled="true")    
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEA Máxima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.tea_maxima" :disabled="true")    
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("TEM Máxima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.tem_maxima" :disabled="true")    
        div.vx-row.w-full.mb-3      
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ganancia Máxima: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.ganancia_maxima" :disabled="true")    
        div.vx-row.w-full.mb-3           
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ganancia Final: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.ganancia_final" :disabled="true")    
        div.vx-row.w-full.mb-3           
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Fecha de la Inversión: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.fecha_inversion" :disabled="true")    
        div.vx-row.w-full.mb-3           
            div.vx-col.w-full(class="sm:w-1/3")
              span.font-label.bold {{ $t("IR Inversión: ") }} 
            div.vx-col.w-full(class="sm:w-2/3")
              texts-box.w-full(size="small" v-model="dataInversion.ir_inversion" :disabled="true")    
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Es Ganadora: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            vs-checkbox(size="small" v-model="dataInversion.es_ganadora" :disabled="true")   
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Estado: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.descripcion_estado_inversion" :disabled="true")          
        div.vx-row.mb-3
          div.vx-col.w-full.text-center
            vs-divider.mb-2.mt-0
            span.title-header.uppercase.bold {{ $t('Datos de la Subasta') }}
            vs-divider.mt-2
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Subasta: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.subasta_id" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Código: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.subasta_codigo" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Monto Total: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.subasta_monto_total" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Modelo: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            texts-box.w-full(size="small" v-model="dataInversion.subasta_modelo" :disabled="true")
        div.vx-row.w-full.mb-3
          div.vx-col.w-full(class="sm:w-1/3")
            span.font-label.bold {{ $t("Ver Subasta: ") }} 
          div.vx-col.w-full(class="sm:w-2/3")
            vx-button(@click="verSubasta(dataInversion.subasta_id)") {{$t('Ver Subasta')}}        
        div.vx-col.w-full
          footer-data(:items='footer')   
        div.vx-row.vs-justify-center(v-if='verBotones')
          vx-button.mr-3(v-if="tipo=='revisar'" @click="confirmar(dataInversion.inversion_id, dataInversion.subasta_id)") {{$t('CONFIRMAR')}}
          vx-button(v-if="tipo=='revisar'" @click="rechazar(dataInversion.inversion_id)") {{$t('RECHAZAR')}}
        div.vx-row.vs-justify-flex-end.mr-5(v-if='verBotonSiguiente')
          vx-button(@click="siguiente(dataInversion.subasta_id)") {{$t('Siguiente')}}
</template>

<script>

import swal from 'sweetalert2';
import request from '@/mixins/mixinRequest';
import funciones from '@/functions';
import VxButton from '@/components/buttons/Button.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import FooterData from '@/components/footer/FooterData';
import PopupResumenInversion from "@/project/views/inversionista/inversion/popup/PopupResumenInversion.vue";

export default {

  name: 'PopupVerInversion',
  mixins: [request],

  components: {
    funciones,
    VxButton,
    TextsBox,
    PopupResumenInversion,
    FooterData
  },

  props: {
    PopupVerInversion: {
      type: Boolean,
      default: false
    },
    tipo: {
      type: String,
      default: false
    },
    dataInversion: {
      type: Object,
      default: () => {}
    },
    footer: {
      type: Array,
      default: () => []
    },
    listaInversiones:{
      type: Array,
      default: () => []
    },
  },

  data() {
    return this.getDefaultData()
  },

  computed: {
    tituloPopup() {
      // return this.tipo=='revisar' ? 'Inversión N° '+ this.dataInversion.inversion_id : 'VER INVERSIONISTA';
      return 'Inversión N° '+ this.dataInversion.inversion_id;
    },
  },
  
  methods:{

    eliminarInversiones(bool){
      this.closePopup();
      if (bool) {
        this.listaInversiones = this.listaInversiones.filter((e)=> e.subasta_id != this.idSubastaEnviar)
        if (this.listaInversiones.length == 0) {
          this.cancelarHijo();
        }else{
          this.verBotones = false;          
          this.verBotonSiguiente = true;
        } 
      }
    },

    recibirLista(bool){
      this.closePopup();
      if (bool) {
        this.listaInversiones.shift();
        if (this.listaInversiones.length == 0) {
          this.cancelarHijo();
        }else{
          this.verBotones = false;          
          this.verBotonSiguiente = true;
        } 
      }
    },

    async funcionVerAvance(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`verificar_avance_financiamiento?id_subasta=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async siguiente(idSubastaAux){
      try {
        let response = await this.funcionVerAvance(idSubastaAux);
        if (response.estado) {
          if (response.avance_financiacion != "100.00") {
            if (this.listaInversiones.length > 0) {
              this.verBotones = true;
              this.verBotonSiguiente = false;
              this.$emit('btnSiguiente', this.listaInversiones);
            }else{
              this.$emit('closePopupVer',false);
            }
          }else{
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: response.mensaje,
              confirmButtonText: this.$t('Aceptar'),
            });
            if (status.value) {
              this.closePopup();
              this.listaInversiones = this.listaInversiones.filter((e)=> e.subasta_id != this.idSubastaEnviar)
              if (this.listaInversiones.length == 0) {
                this.cancelarHijo();
              }else{
                this.verBotones = true;
                this.verBotonSiguiente = false;
                this.$emit('btnSiguiente', this.listaInversiones);
              } 
            }
          }       
        }else{
          this.sweetAlert(response);          
          this.cancelar();
        }        
      } catch (error) {
        throw new Error(error);
      }        
    },

    async funcionValidarResumenInversion(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`validar_confirmar_inversion_bo?id=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async funcionVerResumenInversion(id){
      try {
        this.$vs.loading({ type: "point" });
        let { data } = await this.requestApi(`ver_resumen_inversion_bo?id=${id}`);
        let response = data.data || []; 
        return response
      }catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async confirmar(id, idSubasta){
      let response = await this.funcionValidarResumenInversion(id);
      this.idSubastaEnviar = idSubasta;
      if (response.estado) {
        if (response.mensaje) {
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: response.mensaje,
            showCancelButton: true,
            confirmButtonText: this.$t('SÍ'),
            cancelButtonText: this.$t('NO'),
          });
          if (status.value) {
            let response = await this.funcionVerResumenInversion(id);
            this.resumen = response.data[0];
            this.montoInversionEnviar = response.data[0].codigo_moneda_subasta + " " + response.data[0].monto_inversion;
            this.resumen.tea_minima = response.data[0].tea_minima + "% ";
            this.resumen.tea_maxima = response.data[0].tea_maxima + "% ";
            this.gananciaFinalEnviar = response.data[0].codigo_moneda_subasta + " " + response.data[0].ganancia_final; 
            if(this.dataInversion.subasta_modelo == "Subasta"){
              this.esSubasta = true;
              this.esVelocidad = false;
            }
            if (this.dataInversion.subasta_modelo == "Velocidad") {
              this.esSubasta = false;
              this.esVelocidad = true;
            }
            this.idInversionEnviar = id;
            this.verPopupResumen = true;
          }          
        }else{
          let response = await this.funcionVerResumenInversion(id);
          this.resumen = response.data[0];
          this.montoInversionEnviar = response.data[0].codigo_moneda_subasta + " " + response.data[0].monto_inversion;
          this.resumen.tea_minima = response.data[0].tea_minima + "% ";
          this.resumen.tea_maxima = response.data[0].tea_maxima + "% ";
          this.gananciaFinalEnviar = response.data[0].codigo_moneda_subasta + " " + response.data[0].ganancia_final;          
          if(this.dataInversion.subasta_modelo == "Subasta"){
            this.esSubasta = true;
            this.esVelocidad = false;
          }
          if (this.dataInversion.subasta_modelo == "Velocidad") {
            this.esSubasta = false;
            this.esVelocidad = true;
          }
          this.idInversionEnviar = id;
          this.verPopupResumen = true;
        }
      }else{
        this.listaInversiones.shift();
        if (this.listaInversiones.length == 0) {
          this.cancelarHijo();
        }else{
          this.verBotones = false;          
          this.verBotonSiguiente = true;
        } 
      }
    },

    async rechazarFuncion(id){
      this.$vs.loading({ type: "point" });
      try {    
        let put = {          
          id: id
        }
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi("rechazar_inversion_bo", put, "PUT");
        return data         
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      } 
    },

    async rechazar(id){
      let status = await swal.fire({
        title: this.$t('Mensaje de Sistema'),
        text: this.$t('¿Está seguro de que desea rechazar esta inversión?'),
        showCancelButton: true,
        confirmButtonText: this.$t('SÍ'),
        cancelButtonText: this.$t('NO'),
      });
      if (status.value) {
        let response = await this.rechazarFuncion(id);        
        if(response.data.estado){
          this.responseRequest(response.data);
          this.listaInversiones.shift();
          if (this.listaInversiones.length == 0) {
            this.cancelarHijo();
          }else{
            this.verBotones = false;          
            this.verBotonSiguiente = true;
          }          
        }else{
          this.sweetAlert(response.data);
        } 
      }          
    },

    verInversionista(id){
      this.cancelar();
      setTimeout(() => { this.$router.push(`/inversionista-inversionista-ver/${id}`); }, 100);
    },    

    verSubasta(id){
      this.$router.push(``);
      this.cancelar();
      setTimeout(() => { this.$router.push(`/empresa-subasta/ver/${id}`); }, 100);
    },

    getDefaultData(){
      return {
        titulo:'',
        verPopupResumen: false,
        esSubasta: false,
        esVelocidad: false,
        resumen:{},
        montoInversionEnviar:'',
        gananciaFinalEnviar:'',
        idInversionEnviar:0,
        verBotonSiguiente: false,
        verBotones: true,
        idSubastaEnviar: 0,
      }
    },

    cancelar(){
      this.limpiar();
      this.$emit('closePopupVer',false);
    },

    cancelarHijo(){
      this.limpiar();
      this.$emit('closePopupVer',true);
    },

    closePopup(){
      this.verPopupResumen = false;
    },

    limpiar(){
      Object.assign(this.$data,this.getDefaultData());
    },
  },

}
</script>
