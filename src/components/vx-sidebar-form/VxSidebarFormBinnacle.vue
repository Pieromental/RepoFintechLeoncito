<template lang="pug">

  div.binnacle.mb-5(id="VxSidebarFormBinnacle")

    template(v-for="item in items")
      div.children-icon
        feather-icon( class="icono" :icon="item.icon" :title="$t(item.key)+': '+title(item)" svgClasses='h-3 w-3')
      div.children-span
        span {{ item.icon=='ClockIcon' ?  convertirFecha(item.value):item.value }}

</template>

<script>

import helperFunctions from '@/functions';

export default {

  name: 'VxSidebarFormBinnacle',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    title(item){
      return item.icon=='ClockIcon' ? this.convertirFecha(item.value):item.value 
    },
    convertirFecha(date){
      return helperFunctions.convertirFechaLocal(date);
    }
  }

};

</script>

<style lang="scss">
  #VxSidebarFormBinnacle.binnacle{
    width: 100%;
    border-radius: 5px; 
    background-color: #f5fcff;
    padding: 5px;
    height: 4rem;
    display: grid;
    grid-template-columns: 3% 28% 3% 28% 3% 28%;
    //grid-template-rows: 33% 33% 33%;
    gap: .3rem;
    .children-span {
      overflow-wrap: break-word;
      letter-spacing: normal;
      line-height: normal;
      span {
        font-size: 0.6rem !important;
      }
    }
  }
</style>