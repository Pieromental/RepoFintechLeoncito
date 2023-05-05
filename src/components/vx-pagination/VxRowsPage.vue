<template lang="pug">
  div.w-full
    span.font-label {{$t('Registros')}} {{ length == 0 ? 0 : min + 1}} -&nbsp;
    span.font-label(v-if='max > length') {{length}}
    span.font-label(v-else) {{max}}
    span.font-label  {{$t('de')}} {{length}}
    span.font-label  | {{$t('Por Página')}}:&nbsp;
    div( style="color:#2699fb;display:inline-block" :data="element" :key="index" v-for="(element, index) in rows")
      span.font-label.text-primary(v-if='index == 0' @click='rowsBoton(element,index)' class="rowStyle")
        span.font-label(:class="(max-min)==element ? 'page-bold' : '' " class="page") {{element}}
      span.font-label.text-primary(v-else class="rowStyle" @click='rowsBoton(element,index)')
        span.font-label ,
        span.font-label(:class="(max-min)==element ? 'page-bold' : '' " class="page") {{element}}

</template>
<script>
export default {
  name: 'VxRowsPage',
  props: {
    rows: {
      type: Array
    },
    length: {
      type: Number
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    }
  },
  methods: {
    rowsBoton(val, index) {
      this.$emit('valMaxItems', val);
    }
  }
};
</script>
<style>
.rowStyle .page:hover {
  cursor: pointer;
  /*font-weight: 900*/
}

.rowStyle .page-bold {
  font-weight: bold;
}
</style>
