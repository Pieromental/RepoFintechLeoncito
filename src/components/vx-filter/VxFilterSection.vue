<template lang="pug">
  div(v-show="!hidden" class="filter-section")
    div(v-if="sectionSingle")
      div(:class="['header-filter']" )
        div(class="flex justify-between items-center")
          span.font-label.uppercase.color-title-newSection {{ $t(title) }}
    div(v-else)
      div(v-if="single")
        div(:class="[(seleccionados) ? 'header-filter filter-not-empty' : 'header-filter']" )
            div(class="flex justify-between items-center")
              span.font-label.uppercase.color-title-section {{ $t(title) }}
              div(class="flex items-center")
                vs-checkbox(v-model="singleObject.options.value" @input="emitCheck(singleObject)")

      div(v-else)
        div(:class="[(seleccionados) ? 'header-filter filter-not-empty' : 'header-filter']" @click="expand()" )
          div(class="flex justify-between items-center")
            span.font-label.uppercase.color-title-section {{ $t(title) }}
            div(:style="{display:'flex', 'align-items': 'center'}")
              //- span(v-if="cleanIconCriterio" :style="{display:'flex', 'align-items': 'center'}")
              //-   feather-icon.style-icon-section(icon='RotateCcwIcon' @click.stop="clean()")
              span(:style="{display:'flex', 'align-items': 'center'}")
                feather-icon.style-icon-section(v-show=" disabledSection ? false : cleanIcon  != ''" icon='RotateCcwIcon' @click.stop="clean()")
              feather-icon.style-icon-section(:icon="!expandir ? 'ChevronDownIcon' : 'ChevronUpIcon' ")
          div.font-label-may(v-show="!expandir") {{ $t(seleccionados) }}
        div(class="body-filter-section" v-show="expandir" )
          slot
</template>

<script>
export default {
  name: 'VxFilterSection',
  props: {
    sectionSingle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    seleccionados: {
      type: String,
      default: ''
    },
    expandir: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    cleanIcon: {
      type: String,
      default: ''
    },
    cleanIconCriterio: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    singleObject: {
      type: Object,
      default: () => {}
    },
    hidden: {
      type: Boolean,
      default: false
    },
    disabledSection: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      expandirLocal: false
    };
  },
  watch: {
    expandir(newVal) {
      this.expandirLocal = newVal;
    }
  },
  methods: {
    clean() {
      this.$emit('clean', { type: this.type, title: this.title, multiple: this.multiple, clear: this.clear });
    },
    expand() {
      // let expandir = !this.expandir
      this.$emit('expand', { type: this.type, title: this.title, expand: !this.expandir });
    },
    emitCheck(singleObject) {
      this.$emit('evntSingleCheck', singleObject);
    }
  }
};
</script>
<style>
.color-title-section {
  color: black;
}
.color-title-newSection {
  margin-left: -13px;
  color: black;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
