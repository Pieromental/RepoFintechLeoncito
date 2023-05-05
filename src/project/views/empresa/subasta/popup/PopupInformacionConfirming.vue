<template lang="pug">
div.demo-alignment
  vx-popup.width_popup_detalle-confirming(class-content="popup-example" :title="$t('')" :active='popupActive' @close="closePopup" click-not-close)
    
    vx-card.card_style

      template(slot="title")
        span.title_start PRO
          span.title_start_second GREXA

      template(slot="actions")
        small {{ fechaActual }}

      div(slot="no-body")

        div.information_sub

          span.span_information_children.ml-3 {{`${$t(titleConfirming)}`}}

          div.card_style_children

            div.vx-row.mb-3

              div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                
                span.title_span_children {{ `${$t('Plazo N° días:')} ${numeroDias} ${$t('días')}`}}

              div.vx-col.w-full(class="sm:w-1/2")
                div.card_style_sub_children
                  div.vx-row
                    div.vx-col.w-full.content-place-self(class="sm:w-1/3")
                      p.result_p_aux {{$t('COMISIÓN PROGREXA:')}}  
                      p.result_p_aux {{$t( `RATING ${codigoRiesgo}`)}}
                    div.vx-col.w-full(class="sm:w-2/3")
                      div.vx-row
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p_sub_children.text-center {{ `${tasaMensual}%` }}
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p_sub_children.text-center {{ 'Mensual' }}
                      div.vx-row
                        div.vx-col.w-full(class="sm:w-1/2")
                        div.vx-col.w-full(class="sm:w-1/2")
                              p.result_p_sub_children.text-center {{ 'o' }}
                      div.vx-row
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p_sub_children.text-center {{  `${monedaCodigo} ${comisionMinima}` }}
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p_sub_children.text-center {{ 'Comisión Minima' }}

            div.vx-row

              div.vx-col.w-full(class="sm:w-1/2")

                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('Monto Total Factura(s) (Neto a Pagar)')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{montoTotal}}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('Garantía (%)')}}
                      span.font-label.bold.text-danger  *
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                     template(v-if="typeConfirming == 'avance'")
                      div.vx-col.w-full(class="sm:w-1/3")
                      div.vx-col.w-full(class="sm:w-2/3")
                        groups-box
                          template(slot="append")
                            div(class="append-text")
                              span.font-label %
                          texts-box(size="small" autocomplete="off" ref="garantia" name="garantia" v-model='garantia' v-mask="{mask:maskFuncion(6,'D'),tokens:{'D': {pattern: /[\\d.]/}}}" @blur="completaDecimal(2,garantia)" @keyup.enter.prevent="completaDecimal(2,garantia)" @input="formato('porcentaje',$event,3,2)" @keyup="tamanioPorcentaje" :disabled="false")
                        span.text-danger.font-error(v-if="mensajeGarantia") {{ $t(mensajeGarantia) }}
                     template(v-else )
                      div.vx-col.w-full(class="sm:w-1/2")
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{ `${garantia}%`}}

                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('Monto Garantía')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{ `${monedaCodigo}` }}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{montoGarantia}}
                        
              div.vx-col.w-full(class="sm:w-1/2")

                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{ `${$t('Costo de Financiamiento')}`}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{ typeConfirming == 'avance' ? costoFinanciamientoAvance : costoFinanciamiento }}

                template(v-if="typeConfirming == 'avance'")
                  div.seccion_icon
                    feather-icon.style-icon.color-icono-image.seccion_icon_feather( v-if="desplegado" icon="ArrowUpIcon" color="primary" title="Cerrar" @click="desplegado=false")
                    feather-icon.style-icon.color-icono-image.seccion_icon_feather( v-else icon="ArrowDownIcon" color="primary" title="Abrir" @click="desplegado=true")
                  div.seccion_tasas(v-if="desplegado")
                    table.w-full
                      tr.w-full
                        th.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{ `${$t('Tasa')}`}}
                        th.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{ `${$t('Monto')}`}}
                        th.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{ `${$t('Costo')}`}}
                      tr.w-full(:data="tr" :key="indextr" v-for="(tr,indextr) in listadoCalculoCostoFinanciamiento")
                        td.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{`${$t('Financiamiento Tasa')} (${tr.tasa}%)`}}
                        td.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{ `${tr.monto}`}}
                        td.w-full(class="sm:w-1/3")
                          p.seccion_tasas_span {{ `${tr.costo}`}}

                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('IGV Costo Financiamiento')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{  typeConfirming == 'avance' ? igvCostoFinanciamientoAvance : igvCostoFinanciamiento }}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('Comisión Progrexa')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{comisionProgrexa}}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('IGV Comisión Progrexa')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{igvComisionProgrexa}}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span {{$t('Fijo')}}
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{fijo}}
                        
            div.vx-row
            
              div.vx-col.w-full(class="sm:w-1/2")

                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span_children {{$t('Fecha de Desembolso')}}
                  div.vx-col.w-full(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full
                        p.result_p.text-right {{fechaDesembolso}}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span_children {{$t('Fecha de Vencimiento')}}
                  div.vx-col.w-full(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full
                        p.result_p.text-right {{fechaVencimiento}}
                        
              div.vx-col.w-full(class="sm:w-1/2")

                  div.vx-row
                    div.vx-col.w-full(class="sm:w-1/2")
                      span.title_span_children {{$t('Monto de Confirming')}}
                    div.vx-col.w-full(class="sm:w-1/2")
                      div.vx-row
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p.text-right {{`${monedaCodigo}`}}
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p.text-right {{  typeConfirming == 'avance' ? montoConfirmingAvance : montoConfirming }}

          div.card_style_children.mt-3
            div.vx-row
              div.vx-col.w-full(class="sm:w-1/2")
              div.vx-col.w-full(class="sm:w-1/2")
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span_children {{$t('Monto a Pagar Cliente a Progrexa')}}
                  div.vx-col.w-full(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{montoPagarClienteProgrexa}}
                div.vx-row
                  div.vx-col.w-full(class="sm:w-1/2")
                    span.title_span_children {{$t('Monto a Pagar Progrexa a Cliente')}}
                  div.vx-col.w-full(class="sm:w-1/2")
                    div.vx-row
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{`${monedaCodigo}`}}
                      div.vx-col.w-full(class="sm:w-1/2")
                        p.result_p.text-right {{montoPagarProgrexaCliente}}
                        
        div.vs-justify-center.mb-3(class="w-full")

          vs-button.font-label.footer-buttons-style.py-2.mr-5(
            type="filled"
            color="primary"
            @click='aceptar')
            span {{ ($t('Confirmar'))}}
          vs-button.font-label.footer-buttons-style.py-2.ml-5(
            color="primary"
            type="border"
            @click='cancelar')
            span {{ ($t('Cancelar')) }}


</template>

<script>

import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import swal from 'sweetalert2';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import GroupsBox from '@/components/fields/input/GroupsBox.vue';

export default {

  name: 'PopupInformacionConfirming',
  mixins: [request],

  components: {
    TextsBox,
    GroupsBox
  },

  props: {
    typeConfirming: {
      type: String,
      default: ''
    },
    titleConfirming:{
      type: String,
      default: ''
    },
    dataConfirming: {
      type: Object,
      default: {}
    },
    popupActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      listadoCalculoCostoFinanciamiento: [],

      fechaActual: '',
      garantia: '',
      mensajeGarantia: '',
      codigoRiesgo: '',
      numeroTEA: '',
      numeroTEAEmpresa: '',
      comisionMinima: '',
      fijo: '-',
      numeroDias: '',
      montoTotal: '',
      monedaCodigo: '',
      fechaVencimiento: '',
      fechaDesembolso: '',
      tasaMensual: '',

      costoFinanciamientoAvance: '',
      igvCostoFinanciamientoAvance: '',
      montoConfirmingAvance: '',
      desplegado: true,
    }
  },

  computed: {
    
    //OBTENER MONTO GARANTIA
    montoGarantia(){
      if( this.validarNumero(this.montoTotal) && this.validarNumero(this.garantia) ){
        let temp = ( this.montoTotal * this.garantia ) / 100
        return this.obtenerCentesimo(temp)
      }else{
        return '-'
      }
    },

    //OBTENER COSTO DE FINANCIAMIENTO
    TEDEmpresa(){
      let tmpNumeroTEAEmpresa = Number(this.numeroTEAEmpresa)
      if( typeof tmpNumeroTEAEmpresa == 'number' ){
        let temp = [Math.pow(1+(tmpNumeroTEAEmpresa/100),1/360)-1] * 100
        return this.obtener8decimales(temp);
      }else{
        return '-'
      }
    },
    interes(){
      if( this.TEDEmpresa != '-' && this.numeroDias != '-' ){
        let temp = [Math.pow(1+(this.TEDEmpresa/100),this.numeroDias)-1] * 100
        return this.obtenerCentesimo(temp);
      }else{
        return '-'
      }
    },
    costoFinanciamiento(){
      if( this.interes != '-' &&  this.montoTotal != '-' ){
        let temp =  (this.interes/100)*this.montoTotal
        return this.obtenerCentesimo(temp);
      }else{
        return '-'
      }
    },
    
    //OBTENER IGV COSTO DE FINANCIAMIENTO
    igvCostoFinanciamiento(){
      if( this.costoFinanciamiento != '-' ){
        let temp = this.costoFinanciamiento * 0.18
        return this.obtenerCentesimo(temp);
      }else{
        return ''
      }
    },

    //OBTENER COMISIÓN PROGREXA
    TED(){
      let tmpNumeroTEA = Number(this.numeroTEA);
      if( typeof tmpNumeroTEA == 'number' ){
        let temp = [Math.pow(1+(tmpNumeroTEA/100),1/360)-1] * 100
        return this.obtener8decimales(temp);
      }else{
        return '-'
      }
    },
    monto(){
      if( this.TED != '-' && this.numeroDias != '-' && this.montoTotal != '-' ){
        let temp = this.montoTotal * [Math.pow(1+(this.TED/100),this.numeroDias)];
        return this.obtenerCentesimo(temp);
      }else{
        return '-'
      }
    },
    comisionProgrexa(){
      if( this.validarNumero(this.monto) && this.validarNumero(this.montoTotal)){
        let temp = (this.montoTotal-this.monto)*-1
        if(temp>this.comisionMinima) return this.obtenerCentesimo(temp);
        else return this.comisionMinima ? this.obtenerCentesimo(this.comisionMinima):'-';
      }else{
        return this.comisionMinima ? this.obtenerCentesimo(this.comisionMinima):'-'
      }
    },
    
    //OBTENER IGV COMISIÓN PROGREXA
    igvComisionProgrexa(){
      if( this.validarNumero(this.comisionProgrexa) ){
        let temp = Number(this.comisionProgrexa) * 0.18
        return this.obtenerCentesimo(temp);;
      }else{
        return '-'
      }
    },

    //OBTENER MONTO CONFIRMING
    montoConfirming(){
      let acumulado = 0;
      if( this.validarNumero(this.costoFinanciamiento) ) acumulado = Number(this.costoFinanciamiento);
      if( this.validarNumero(this.igvCostoFinanciamiento) ) acumulado = Number(this.igvCostoFinanciamiento) + acumulado;
      if( this.validarNumero(this.comisionProgrexa) ) acumulado = Number(this.comisionProgrexa) + acumulado;
      if( this.validarNumero(this.igvComisionProgrexa) ) acumulado = Number(this.igvComisionProgrexa) + acumulado;
      if( this.validarNumero(this.fijo) ) acumulado = Number(this.fijo) + acumulado;
      if(acumulado==0) return "-"
      else return this.obtenerCentesimo(acumulado);
    },
    
    //OBTENER MONTO PAGAR CLIENTE A PROGREXA
    montoPagarClienteProgrexa(){
      let monto = this.typeConfirming == 'avance' ? this.montoConfirmingAvance:this.montoConfirming;
      if( this.validarNumero(monto) ){
        if( this.validarNumero(this.montoGarantia)){
          if(Number(this.montoGarantia)-Number(monto)<0){
            let acumulado = Number(monto)-Number(this.montoGarantia);
            if( this.montoTotal != '-' ) acumulado = Number(this.montoTotal)+acumulado;
            return this.obtenerCentesimo(acumulado)
          }else{
            return this.validarNumero(this.montoTotal) ? this.obtenerCentesimo(Number(this.montoTotal)):'-'
          }
        }else{
          let acumulado = Number(monto);
          if( this.montoTotal != '-' ) acumulado = Number(this.montoTotal)+acumulado;
          return this.obtenerCentesimo(acumulado)
        }
      }else{
        return '-'
      }
    },

    //OBTENER MONTO PAGAR CLIENTE A PROGREXA
    montoPagarProgrexaCliente(){
      let monto = this.typeConfirming == 'avance' ? this.montoConfirmingAvance:this.montoConfirming;
      if( monto != '-' ){
        if(this.montoGarantia != '-'){
          if(Number(this.montoGarantia)-Number(monto)<0){
            return '0.00'
          }else{
            return this.obtenerCentesimo(Number(this.montoGarantia)-Number(monto));
          }
        }else{
          return '0.00'
        }
      }else{
        return '-'
      }
    }

  },

  watch: {
    async popupActive(val){
      if(JSON.stringify(this.dataConfirming) != '{}') {
        this.numeroDias = this.dataConfirming.diasCredito ? this.dataConfirming.diasCredito:'';
        this.fechaPagoPactada = this.dataConfirming.fechaPagoPactada ? this.dataConfirming.fechaPagoPactada:'';
        this.fechaDesembolso = this.dataConfirming.fechaCierre ? this.dataConfirming.fechaCierre:'';
        this.fechaVencimiento = this.dataConfirming.fechaPagoPactada ? this.dataConfirming.fechaPagoPactada:'';
        if(this.$route.params.codigo)  this.typeConfirming=='revisar' ? await this.cargarDetalleRevisar() : await this.cargarDetalleAvance();
        if(this.$route.params.codigo) await this.cargarCalculoCostoFinanciamiento();
      } else {
        this.limpiar();
      }
    }
  },
  
  methods: {
    
    validarNumero(num){
      if(num){
        if(num!='-'&&num!='.') return true
        else return false
      }else{
        if(num===0) return true
        else return false
      }
    },

    completaDecimal(lmax, val){
      if(val.length){
        let temp = val.indexOf('.');
        let num = 0;
        if(temp==-1){
          if(lmax==2)  this.garantia = this.garantia+".00";
        }else{
          num = val.length - (temp+1);
          let add = "";
          while(num!=lmax){
            add = add+"0"
            num++
          }
          if(lmax==2)  this.garantia = this.garantia+add;
        }
      }
    },

    tamanioPorcentaje() {
      if (parseFloat(this.garantia) > 100) {
        this.garantia = '';
      }
    },

    formato(type, val, lEnt, lDec) {
      if (val.length) {
        let split = val.split('.');
        if (split.length == 1) {
          if (split[0].length > lEnt) {
            if(type=="porcentaje") this.garantia = this.garantia.substring(0, lEnt);
          }
          return;
        }
        if (split.length == 2) {
          if (split[1].length > lDec) {
            split[1] = split[1].substring(0, lDec);
            if(type=="porcentaje") this.garantia = split.join('.');
          }
          return;
        }
        if (split.length > 2) {
          split.pop();
          if(type=="porcentaje") this.garantia = split.join('.');
          return;
        }
      }
    },

    maskFuncion(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },
    
    obtenerCentesimo(val){
      if(val || val==0){
        let value = Number(val)
        if( typeof value == 'number') {
          value = helperFunctions.decimalAdjust('round', value, -2)
          return value.toFixed(2)
        } else return '-'
      }else{
        return '-'
      }
    },

    obtener8decimales(val){
      if(val || val==0){
        let value = Number(val)
        if( typeof value == 'number') {
          value = helperFunctions.decimalAdjust('round', value, -8)
          return value.toFixed(8)
        } else return '-'
      }else{
        return '-'
      }
    },
    
    fechaActualConvert(){
      let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      let fecha = new Date();
      return `${fecha.getDate()} de ${meses[fecha.getMonth()]} del ${fecha.getFullYear()}` ;
    },

    convertirFecha(fechaActual){
      let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      let fecha = fechaActual.split('/');
      return `${fecha[0]} de ${meses[Number(fecha[1])-1]} del ${fecha[2]}` ;
    },
    
    async cargarDetalleRevisar() {
      try {
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_informacion_confirming?id_subasta=${this.$route.params.codigo}`);
        let response = data.data;
        if (response.estado) {

          this.fechaActual = response.data[0].fecha_registro ? this.convertirFecha(response.data[0].fecha_registro):'';

          this.comisionMinima = response.data[0].comision_progrexa_xtea_minimo ? Number(response.data[0].comision_progrexa_xtea_minimo):'';
          this.codigoRiesgo = response.data[0].riesgo_codigo;
          this.monedaCodigo = response.data[0].moneda_codigo;
          this.tasaMensual = response.data[0].tasa_rendimiento ? Number(response.data[0].tasa_rendimiento):'';
          this.montoTotal = response.data[0].monto_total ? Number(response.data[0].monto_total):'';
          this.garantia = response.data[0].garantia ? Number(response.data[0].garantia):'';
          this.fijo = response.data[0].fijo_progrexa_actual ? Number(response.data[0].fijo_progrexa_actual):'';
          this.numeroTEA = response.data[0].tea_progrexa ? Number(response.data[0].tea_progrexa):'';
          this.numeroTEAEmpresa = response.data[0].tea_empresa ? Number(response.data[0].tea_empresa):'';

          //this.montoConfirming = response.data[0].monto_confirming;

          /* 
          
          this.costoFinanciamiento = response.data[0].costo_financiamiento;
          this.igvCostoFinanciamiento = response.data[0].igv_costo_financiamiento;
          this.comisionProgrexa = response.data[0].comision_progrexa;
          this.igvComisionProgrexa = response.data[0].igv_comision_progrexa; */
          
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async cargarDetalleAvance() {
      try {
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`ver_recalculo_preliquidacion?id_subasta=${this.$route.params.codigo}`);
        let response = data.data;
        if (response.estado) {
          this.fechaActual = this.fechaActualConvert();
          this.numeroTEA = response.data[0].tea_progrexa;
          this.comisionMinima = response.data[0].comision_progrexa_xtea_minimo;
          this.codigoRiesgo = response.data[0].riesgo_codigo;
          this.tasaMensual = response.data[0].tasa_rendimiento;
          this.monedaCodigo = response.data[0].moneda_codigo;
          this.montoTotal = response.data[0].monto_total;
          this.garantia = response.data[0].garantia;
          this.fijo = response.data[0].fijo_progrexa_actual;
          this.numeroTEAEmpresa = response.data[0].tea_empresa;
          this.costoFinanciamientoAvance = response.data[0].costo_financiamiento;
          this.igvCostoFinanciamientoAvance = response.data[0].igv_costo_financiamiento;
          this.montoConfirmingAvance = response.data[0].monto_confirming;
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async cargarCalculoCostoFinanciamiento() {
      try {
        if(this.typeConfirming=='revisar') return
        this.$vs.loading({ type: 'point' });
        let { data } = await this.requestApi(`listar_calculo_costo_financiamiento?id_subasta=${this.$route.params.codigo}`);
        let response = data.data;
        if (response.estado) {
          this.listadoCalculoCostoFinanciamiento = response.data;
        }else{
          this.listadoCalculoCostoFinanciamiento = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    cancelar(){
      setTimeout( () => { 
        this.limpiar();
        this.$emit('closePopup'); 
      } ,10);
    },

    async aceptar(){
      try {
        if(!this.$route.params.codigo) return
        let mensaje = this.$t("¿Está seguro que desea aprobar la subasta para su publicación?");
        let status = await swal.fire({ title: this.$t("Mensaje del Sistema"), text: mensaje, showConfirmButton: true, showCancelButton: true, confirmButtonText: this.$t("Sí"), cancelButtonText: this.$t("No") });
        if (status.value) {
          let response = this.typeConfirming == 'revisar' ? await this.revisar() : await this.avance();
          if(response.data.estado){
            this.responseRequest(response.data);
            this.cancelar();
            setTimeout( () => { this.$router.push(`/empresa-subasta`) },500);
          }else{
            if(!response.data.hasOwnProperty('codigoError')){
              this.sweetAlert(response.data);
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async revisar() {
      this.$vs.loading({ type: "point" });
      try {
        let put = {};
        put.id_subasta = this.$route.params.codigo;
        put.plazo = this.numeroDias;
        put.fecha_cierre = this.fechaDesembolso+' 23:59:59';
        put.fecha_pago_pactada = this.fechaPagoPactada;
        put.fecha_pago_inversionista = this.fechaPagoPactada;
        put.fecha_desembolso = this.fechaDesembolso;
        put.fecha_vencimiento = this.fechaVencimiento;
        put.interes = this.interes;
        put.costo_financiamiento = this.costoFinanciamiento;
        put.igvCostoFinanciamiento = this.igvCostoFinanciamiento;
        put.comision = this.comisionProgrexa;
        put.igv_comision = this.igvComisionProgrexa;
        put.monto_confirming = this.montoConfirming;
        put.pago_a_progrexa = this.montoPagarClienteProgrexa;
        put.pago_a_cliente = this.montoPagarProgrexaCliente;
        let { data } = await this.requestApi("aprobar_revision_subasta", put, "PUT");
        return data;
      } catch (error) {
        return error;
      } finally {
        this.$vs.loading.close();
      }
    },

    
    async avance() {
      this.$vs.loading({ type: "point" });
      try {
        let put = {};
        put.id_subasta = this.$route.params.codigo;
        put.fecha_desembolso = this.fechaDesembolso;
        put.garantia = this.garantia;
        put.monto_garantia = this.montoGarantia;
        put.costo_financiamiento = this.costoFinanciamientoAvance;
        put.igv = this.igvCostoFinanciamientoAvance;
        put.monto_confirming = this.montoConfirmingAvance;
        put.pago_a_progrexa = this.montoPagarClienteProgrexa;
        put.pago_a_cliente = this.montoPagarProgrexaCliente;
        let { data } = await this.requestApi("confirmar_entrega_avance", put, "PUT");
        return data;
      } catch (error) {
        return error;
      } finally {
        this.$vs.loading.close();
      }
    },
    
    limpiar(){
      this.fechaActual = '';
      this.garantia = '';
      this.codigoRiesgo = '';
      this.numeroTEA = '';
      this.numeroTEAEmpresa = '';
      this.comisionMinima = '';
      this.fijo = '-';
      this.numeroDias = '';
      this.montoTotal = '';
      this.monedaCodigo = '';
      this.fechaVencimiento = '';
      this.fechaDesembolso = '';
      this.tasaMensual = '';
    },
    
    async closePopup() {
      this.limpiar();
      this.$emit('closePopup');
    }

  }

};
</script>

<style>
.seccion_icon{
  text-align: right;
}
.seccion_icon_feather{
  cursor: pointer;
  border: 1px solid;
  border-radius: 20%;
  padding: 0.1rem;
}
.seccion_tasas{
  background: rgba(var(--vs-primary), .05);
  border-radius: 5px;
  padding: 0.5rem;
  text-align: center;
}
.footer-buttons-style{
  width: 7rem;
}
.width_popup_detalle-confirming .vs-popup {
  width: 80% !important
}
@media only screen and (max-width: 1000px) {
  .width_popup_detalle-confirming .vs-popup {
    width: 90% !important
  }
}
.title_start {
  color: #1441AF; 
  font-size: 2.5rem; 
  font-weight: bold; 
  letter-spacing: 0.06px;
}
.title_start_second {
  color: #a1bf23;
}
.information_sub{
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
}
.information_sub .vs-divider{
  margin-top: 0rem;
}
.card_style {
  border: 1px solid rgba(0, 0, 0,.2);
}
.card_style .vx-card__header{
  border-bottom: 1px solid rgba(0, 0, 0,.2);
}
.card_style_children{
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 15px;
  padding: 1rem;
}
.card_style_sub_children{
  border: 1px solid rgba(0, 0, 0, .2);
  padding: 1rem;
}
.span_information_children{
  font-weight: 600;
}
.title_span{
  color: #7e8299;
  font-size: 0.8rem;
  line-height: 9px;
  letter-spacing: 0.12px;
}
.seccion_tasas_span{
  color: #7e8299;
  font-size: 0.6rem;
  line-height: 12px;
  letter-spacing: 0.12px;
  text-align: center;
}
.title_span_interes{
  color: #7e8299;
  font-size: 0.7rem;
  letter-spacing: 0.12px;
  align-self: center;
}
.title_span_children{
  color: rgba(0, 0, 0,0.75);
  font-size: 0.8rem;
  line-height: 9px;
  letter-spacing: 0.12px;
  font-weight: 600;
}
.result_p_interes{
  color: #7e8299;
  font-size: 0.7rem;
  line-height: 2rem;
  letter-spacing: 0.14px;
}
.result_p_aux {
  color: #7e8299;
  font-size: 0.8rem;
  line-height: 1.5rem;
  letter-spacing: 0.14px;
}
.result_p {
  color: #7e8299;
  font-size: 0.96rem;
  line-height: 2rem;
  letter-spacing: 0.14px;
}
.result_p_children{
  color: rgba(0, 0, 0,0.75);
  font-size: 0.96rem;
  line-height: 2rem;
  letter-spacing: 0.14px;
  font-weight: 600;
}
.result_p_sub_children {
  color: #000000;
  font-size: 0.96rem;
}
.style_subtotal{
  text-align: end;
}
.sub_information{
  padding-bottom: 1rem;
}
.content-place-self{
  place-self: center;
}
@media screen and (max-width: 502px) {
  .title_start { 
    font-size: 1.8rem; 
  }
}
</style>