<template lang="pug">
  
  div.td-div-select
    v-select.vx-table-select.w-full(:options="options" :disabled="disabled" :value="data" :tabindex="parseInt(tabIndex)" :placeholder="placeholder" @click.native.stop @input="$emit('update:data',$event)" :searchable="false")
      
      template(slot="selected-option" slot-scope="option" :class="[{'color-danger': !option.object.estado}]")
        | {{option.label}}

      template(slot="option" slot-scope="option")
        span.uppercase(v-if="concat" :class="[{'color-danger': !option.object.estado}]") {{ option.object.codigo }} - {{option.label}}
        span.uppercase(v-else :class="[{'color-danger': !option.object.estado}]") {{option.label}}
      
      template(slot="no-options")
        small {{ $t('No se encontraron resultados') }}

</template>

<script>
export default {
  name: 'VxTableSelect',
  props: {
    data: {},
    options: {
      type: Array,
      default: () => []
    },
    concat: {
      type: Boolean,
      default: true
    },
    tabIndex: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vSelect: () => import('vue-select')
  },
  methods: {
    algo($event) {
      console.log($event);
    }
  }
};
</script>

<style lang="scss">
.td-div-select {
  display: flex;
  align-items: center;
  width: 100%;
}
.vx-table-select .dropdown-menu {
  z-index: 20000 !important;
}
.vx-table-select .dropdown-menu li {
  z-index: 20000 !important;
}
.vx-table-select .dropdown-menu li a {
  z-index: 20000 !important;
}
</style>
