<template lang="pug">
div

  vx-card.vxcard-floating
    vx-card.card_style

      template(slot="title")
        span.title_start PRO
          span.title_start_second GREXA

      template(slot="actions")
        small {{ fechaActual }}

      div(slot="no-body")

        div.information_sub

          span.span_information_children.ml-3 INFORMACIÓN DE PRE-LIQUIDACIÓN

          div.card_style_children

            div.vx-row.mb-3

              div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                
                span.title_span_children {{ `${$t('Plazo N° días')} ${numeroDias}`}}

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
                  div.vx-col.w-full.content-place-self(class="sm:w-1/2")
                    div.vx-row
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
                        p.result_p.text-right {{costoFinanciamiento}}
                        
                template(v-if="codigoSubasta=='COB'||codigoSubasta=='CER'")
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
                        p.result_p.text-right {{igvCostoFinanciamiento}}
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
                        p.result_p.text-right {{fechaMayor}}
                        
              div.vx-col.w-full(class="sm:w-1/2")

                  div.vx-row
                    div.vx-col.w-full(class="sm:w-1/2")
                      span.title_span_children {{$t('Monto de Confirming')}}
                    div.vx-col.w-full(class="sm:w-1/2")
                      div.vx-row
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p.text-right {{`${monedaCodigo}`}}
                        div.vx-col.w-full(class="sm:w-1/2")
                          p.result_p.text-right {{montoConfirming}}

          div.card_style_children.mt-3.mb-5
            div.vx-row.pt-3
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
                        
          div.text-center.mb-2
            vs-button.mx-2.my-1.full( v-if="codigoSubasta=='SUB'||codigoSubasta=='COB'||codigoSubasta=='CER'" @click.stop="descargar" color="dark" size="small" icon-pack="feather" icon="icon-download" type="line") {{ $t("Descargar") }}

</template>

<script>

import request from '@/mixins/mixinRequest';

export default {
  
  name: 'TabInformacionConfirming',
  mixins: [request],

  props:{
    codigoSubasta:{
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      fechaActual: '',
      numeroDias: '',
      codigoRiesgo: '',
      tasaMensual: '',
      monedaCodigo: '',
      comisionMinima: '',
      montoTotal: '',
      garantia: '',
      montoGarantia: '',
      costoFinanciamiento: '',
      igvCostoFinanciamiento: '',
      comisionProgrexa: '',
      igvComisionProgrexa: '',
      fijo: '',
      fechaDesembolso: '',
      fechaMayor: '',
      montoConfirming: '',
      montoPagarClienteProgrexa: '',
      montoPagarProgrexaCliente: '',
      desplegado: true,
      listadoCalculoCostoFinanciamiento: []
    }
  },

  methods: {
    
    async descargar() {
      try {
        let id = this.$route.params.codigo;
        if(!id) return
        this.$vs.loading({ type: 'point' });
        let token = localStorage.getItem('token');
        await this.funcDescargar(`descargar_informacion_confirming?id_subasta=${id}&token=${token}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    
    async cargarCalculoCostoFinanciamiento() {
      try {
        if( !this.codigoSubasta=='COB' && !this.codigoSubasta=='CER') return
        let { data } = await this.requestApi(`listar_calculo_costo_financiamiento?id_subasta=${this.$route.params.codigo}`);
        let response = data.data;
        if (response.estado) {
          this.listadoCalculoCostoFinanciamiento = response.data;
        }else{
          this.listadoCalculoCostoFinanciamiento = [];
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    
    convertirFecha(fechaActual){
      let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      let fecha = fechaActual.split('/');
      return `${fecha[0]} de ${meses[Number(fecha[1])-1]} del ${fecha[2]}` ;
    },
    
    async cargarDetalle() {
      try {
        let id = this.$route.params.codigo;
        if(!id) return
        let { data } = await this.requestApi(`ver_informacion_confirming?id_subasta=${id}`);
        let response = data.data;
        if (response.estado) {
          this.fechaActual = response.data[0].fecha_registro ? this.convertirFecha(response.data[0].fecha_registro):'';
          this.numeroDias = response.data[0].plazo_nro_dias;
          this.codigoRiesgo = response.data[0].riesgo_codigo;
          this.tasaMensual = response.data[0].tasa_rendimiento;
          this.monedaCodigo = response.data[0].moneda_codigo;
          this.comisionMinima = response.data[0].comision_progrexa_xtea_minimo;
          this.montoTotal = response.data[0].monto_total;
          this.garantia = response.data[0].garantia;
          this.montoGarantia = response.data[0].monto_garantia;
          this.costoFinanciamiento = response.data[0].costo_financiamiento;
          this.igvCostoFinanciamiento = response.data[0].igv_costo_financiamiento;
          this.comisionProgrexa = response.data[0].comision_progrexa;
          this.igvComisionProgrexa = response.data[0].igv_comision_progrexa;
          this.fijo = response.data[0].fijo_progrexa_actual;
          this.fechaDesembolso = response.data[0].fecha_desembolso;
          this.fechaMayor = response.data[0].fecha_vencimiento;
          this.montoConfirming = response.data[0].monto_confirming;
          this.montoPagarClienteProgrexa = response.data[0].monto_pagar_cliente_progrexa;
          this.montoPagarProgrexaCliente = response.data[0].monto_pagar_progrexa_cliente;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async mounted() {
      try {
        await this.cargarDetalle();
        await this.cargarCalculoCostoFinanciamiento();
      } catch (error) {
        throw new Error(error);
      }
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