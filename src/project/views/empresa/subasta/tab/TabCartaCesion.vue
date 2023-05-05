<template lang="pug">
div

  vx-card.vxcard-floating
  
    vx-card.card_style

      div(slot="no-body")
        div.information_carta

          div.mb-5.text-right
            small  {{ `${$t('Chiclayo,')} ${fechaActual}` }}

          div.mb-5
            small.bold {{ $t('Señores,') }} 
            br
            small {{ razonSocial }}  
            br
            small {{ `${$t('RUC N°')} ${ruc}` }} 
            br
            small {{ `${$t('DOMICILIO: ')} ${domicilio}` }} 
            br
            small {{ $t('Presente.') }} 

          div.mb-5.text-right
            small {{ $t('Referencia: Cesión derechos de facturas negociables') }}
            
          div.mb-3.carta_presentacion_justify
            small {{ $t('Por el presente tengo el agrado de poner en su conocimiento que, con la fecha indicada en el encabezado, nuestra sociedad:') }} 
           
          div.mb-5.carta_presentacion_justify
            small {{ `${razonSocialProveedor} ${$t('RUC N°')} ${rucProveedor} ${$t('ha cedido a favor de PROGREXA SOCIEDAD ANONIMA CERRADA, con RUC: 20601097711, los créditos de su titularidad y/o a su representada originados en los documentos que detallo a continuación.')}` }} 

          div.mb-5( style="overflow: hidden; overflow-x: scroll;" )
          
            table.style_table_carta_cesion

              tr.table_header
                th.p-1.text-center
                  small {{ `${$t('Tipo de Factura')}`}}
                th.p-1.text-center
                  small {{ `${$t('Moneda')}`}}
                th.p-1.text-center
                  small {{ `${$t('No. de Factura')}`}}
                th.p-1.text-center
                  small {{ `${$t('Fecha de Emisión')}`}}
                th.p-1.text-center
                  small {{ `${$t('Fecha de Pago')}`}}
                th.p-1.text-center
                  small {{ `${$t('Importe Total de la Factura')}`}}
                th.p-1.text-center
                  small {{ `${$t('Monto Neto de Pago')}`}}

              tr.table_body( :data="listado" :key="indextr" v-for="(tr,indextr) in listado")
                td.p-2.text-left
                  small {{ tr.tipo_factura_descripcion }}
                td.p-2.text-left
                  small {{ tr.moneda_codigo }}
                td.p-2.text-left
                  small {{ tr.nrocomprobante }}
                td.p-2.text-right
                  small {{ tr.fecha_emision }}
                td.p-2.text-right
                  small {{ tr.fecha_pago }}
                td.p-2.text-right
                  small {{ tr.monto_total }}
                td.p-2.text-right
                  small {{ tr.monto_neto_pago }}
                
          div.mb-3
            small {{ $t('Relación de facturas') }} 
            
          div.mb-3.carta_presentacion_justify
            small {{ $t('Los mencionados derechos de crédito y/o los documentos de créditos en los que se hubiesen originado o se encontraran representados según corresponda fueron cedidos basándose en los artículos 1206° y siguientes del Código Civil y Ley de Títulos, Ley N°27287, la Ley que promueve el financiamiento a través de la factura comercial, Ley N°29623 y su Reglamento aprobado mediante Resolución SBS N°4358-2015 y en general cualquier otra que resulte aplicable.') }} 

          div.mb-3.carta_presentacion_justify
            small {{ $t('De acuerdo a la presente comunicación informo a usted que el pago correspondiente al crédito aquí señalado deberá de realizarse en su vencimiento a favor PROGREXA SOCIEDAD ANONIMA CERRADA, para lo que usa la intermediación de las cuentas recaudadoras de CAVALI S.A I.C.L.V con RUC: 20346669625, dichas cuentas se notificarán formalmente por parte de la Institución indicada a los medios de contacto registrado en su sistema FACTRACK.') }} 

          div.mb-5
            small {{ $t('Muy atentamente.') }} 
            
          div.text-center
            vs-button.mx-2.my-1.full( v-if="codigoSubasta=='SUB'||codigoSubasta=='COB'||codigoSubasta=='CER'" @click.stop="descargar" color="dark" size="small" icon-pack="feather" icon="icon-download" type="line") {{ $t("Descargar") }}

</template>

<script>

import request from '@/mixins/mixinRequest';

export default {
  
  name: 'TabCartaCesion',
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
      razonSocial: '',
      ruc: '',
      razonSocialProveedor: '',
      rucProveedor: '',
      domicilio: '',
      listarFacturas: [],
    }
  },

  computed: {
    listado() {
      return this.listarFacturas;
    }
  },

  methods: {
    
    convertirFecha(fechaActual){
      let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      let fecha = fechaActual.split('/');
      return `${fecha[0]} de ${meses[Number(fecha[1])-1]} del ${fecha[2]}` ;
    },
    
    async cargarDetalle() {
      try {
        let id = this.$route.params.codigo;
        if(!id) return
        let { data } = await this.requestApi(`ver_carta_cesion?id_subasta=${id}`);
        let response = data.data;
        if (response.estado) {
          this.fechaActual = response.data[0].fecha_registro ? this.convertirFecha(response.data[0].fecha_registro):'';
          this.razonSocial = response.data[0].razon_social;
          this.ruc = response.data[0].ruc;
          this.razonSocialProveedor = response.data[0].nombre_proveedor;
          this.rucProveedor = response.data[0].ruc_proveedor;
          this.domicilio = response.data[0].direccion_completa;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async cargarTabla() {
      try {
        let id = this.$route.params.codigo;
        if(!id) return
        let { data } = await this.requestApi(`ver_detalle_carta_cesion?id_subasta=${id}`);
        let response = data.data;
        if (response.estado) {
          this.listarFacturas = response.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    
    async descargar() {
      try {
        let id = this.$route.params.codigo;
        if(!id) return
        this.$vs.loading({ type: 'point' });
        let token = localStorage.getItem('token');
        await this.funcDescargar(`descargar_carta_cesion?id_subasta=${id}&token=${token}`);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async mounted() {
      try { 
        if(this.$route.name != "empresa-subasta-ver") return
        await this.cargarDetalle();
        await this.cargarTabla();
      } catch (error) {
        throw new Error(error);
      }
    }
    
  }
  
};
</script>

<style lang="scss">
.information_carta {
  padding-top: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 4rem;
}
.information_carta .vs-divider {
  margin-top: 0rem;
}
.card_style {
  border: 1px solid rgba(0, 0, 0,.2);
}
.card_style .vx-card__header {
  border-bottom: 1px solid rgba(0, 0, 0,.2);
}
.style_table_carta_cesion { 
  width: 100%;
  min-width: max-content;
  .table_header{
    line-height: 2rem;
    color: white;
    background: rgb(20, 65, 175);
  }
  .table_body{
    line-height: 1rem;
  }
  th, td {
    border: 0.5px solid rgba(0, 0, 0, .2);
  }
}
.carta_presentacion_justify{
    text-align: justify;
}
</style>