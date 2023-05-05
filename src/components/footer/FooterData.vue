<template lang="pug">
  div(v-if="total")
    vs-divider.mt-2
    div.binnacle.mb-5(id="VxBinnacle" :class="[{'colums-6':colums6 },{'colums-4':colums4 }]" ) 
      template(v-for="item in items")
        div.children-span(style="font-weight: 500;")
          span {{ $t(item.key)}}:
        div.children-span
          span {{ item.icon=='ClockIcon' ?  convertirFecha(item.value):item.value }}

</template>

<script>

import helperFunctions from '@/functions';

export default {

  name: 'VxBinnacle',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data(){
    return{
      colums4: false,
      colums6: false,
    }
  },

  computed: {
    total(){
      this.colums6 = this.items.length>4;
      this.colums4 = this.items.length<=4;
      return this.items.length;
    }
  },

  methods: {
    convertirFecha(date){
      if(date){
        let newDate = new Date(date);
        let fecha =  helperFunctions.completarFecha(newDate.toLocaleDateString());
        let hora =  newDate.toLocaleTimeString();
        return fecha+', '+hora
      }else{
        return ''
      }
    }
  }

};

</script>

<style lang="scss">
  #VxBinnacle.binnacle{
    width: 100%;
    border-radius: 5px; 
    background-color: #f5fcff;
    padding: 1rem;
    display: grid;
    gap: .3rem;
    .children-span {
      overflow-wrap: break-word;
      letter-spacing: normal;
      line-height: normal;
      align-self: center;
      span{
        font-size: 0.8rem !important;
      }
    }
  }
  .colums-4{
    grid-template-columns: 25% 25% 25% 25%;
  }
  .colums-6{
    grid-template-columns: 16% 16% 16% 16% 16% 16%;
  }
  @media only screen and (max-width: 650px) {
    .colums-4{
      grid-template-columns: 50% 50%;
    }
    .colums-6{
      grid-template-columns: 50% 50%;
    }
  }
  @media only screen and (min-width: 651px) {
    #VxBinnacle.binnacle {
      .colums-4{
        grid-template-columns: 25% 25% 25% 25%;
      }
      .colums-6{
        grid-template-columns: 16% 16% 16% 16% 16% 16%;
      }
    }
  }
</style>