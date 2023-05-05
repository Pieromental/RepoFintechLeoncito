<template lang="pug">
  
  div.td-div-select
    v-treeselect.font-label.vx-table-select.w-full(:options='options' :disable-branch-nodes="true" :clearable="false" :show-count="true" :disabled="disabled" :value="data" valueFormat="" :searchable="false" :tabindex="parseInt(tabIndex)" :placeholder="placeholder" @click.native.stop @select="$emit('update:data',$event)")
      template(slot="option-label" slot-scope="{ node }")
        span {{ node.raw.codigo }}  - {{ node.raw.label }}
      template(slot="value-label" slot-scope="{ node }")
        span {{ node.raw.descripcion }}

</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'VxTableTreeSelect',
  props: {
    data: null,
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
    vTreeselect: () => import('@riophae/vue-treeselect')
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
