<template lang="pug">
  div.mb-2
    div.cabeza
      span {{ titulo }}
    div.cuerpo
      div.grafico.my-auto(id="chart")
        vue-apex-charts( id="responsive-chart" type="radialBar" height="auto" width="100%" :options="chartOptions" :series="series")
      div.texto.my-auto
        div.actual.py-2.mr-2
          span {{ subtituloActual }}
        div.next.py-2.mr-2
          span {{ subtituloSiguiente }}

</template>

<script>

import VueApexCharts from 'vue-apexcharts';

export default {

  name: 'Graphic',

  components: {
    VueApexCharts
  },

  props: {
    titulo: {
      default: 'Completar Registro de Usuario como Inversionista',
      type: String
    },
    subtituloActual: {
      default: '',
      type: String
    },
    subtituloSiguiente: {
      default: '',
      type: String
    },
    series: {
      type: Array
    },
    chartOptions: {
      type: Object
    },
  },

  data(){
    return {
      
    }
  },

  computed:{
    tmpWitdh() {
      let tmp = window.screen.width;
      return tmp;
    },
  },

  watch:{
    tmpWitdh(val){
      console.log("val=>",val);
    }
  },

  methods: {
    
  },

  mounted() {
    
  },
  
};
</script>

<style lang="scss">
.cabeza{
  text-align: center;
}
.cuerpo{
  display: flex;
  align-items: stretch;
}
.grafico{
  width: 45% !important;
}
.texto{
  width: 55% !important;
  text-align: right;
}
.actual{
  text-align: center;
  font-weight: 500;
}
.next{
  font-size: 0.8rem;
}
#chart {
  max-width: 200px;
  max-height: 200px;
  opacity: 0.9;
}
.apexcharts-pie-label, .apexcharts-datalabels, .apexcharts-datalabel, .apexcharts-datalabel-value{
  display: none !important;
}
.apexcharts-pie-label, .apexcharts-datalabels, .apexcharts-datalabel, .apexcharts-datalabel-label{
  font-size: 1rem;
}
</style>