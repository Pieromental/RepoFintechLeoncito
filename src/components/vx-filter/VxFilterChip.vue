<template lang="pug">
  div.p-2.lista-filtros(v-if="!hidden" :style="`background-color:${colorBackground}`")
    VuePerfectScrollbar(class="scroll-area" :settings="configuration")
      div.chips_min_width
        span.font-label.chips_align_center {{ $t(title)}}
        vs-chip.ml-4.chip-filtro(v-show="element.model != ''" :color="color" @click="remove(element)" v-for="(element, index) in filters" :key="index" :closable="element.closable")
          span.font-label-may.bold.uppercase {{ $t(element.title) }}:
          span.font-label-may.ml-2 {{ element.model }}

</template>

<script>
import helperFunctions from '@/functions';
export default {
  name: 'VxFilterChip',
  components: {
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar')
  },
  props: {
    filtersParent: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Title'
    },
    colorBackground: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: 'primary'
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    count: 0,
    //filters: [],
    configuration: {
      maxScrollbarLength: 90,
      whellSpeed: 0.6
    }
  }),
  watch: {
    filtersParent: async function() {
      //helperFunctions.hiddenChipFilter(this.filtersParent)
      //this.filters = await helperFunctions.filterMapChips(this.filtersParent)
      //console.log('+-+', this.filters)
    }
  },

  computed: {
    filters() {
      return helperFunctions.filterMapChips(this.filtersParent);
    }
  },

  methods: {
    remove(obj) {
      let tmpFilterParent = helperFunctions.filterClean(this.filtersParent, obj);
      this.$emit('remove', tmpFilterParent);
    },
    updateFilters: (filters, index) => filters.splice(index, 1),
    loadSingleCheck() {
      this.filtersParent.forEach((element) => {
        if (element.type == 'check' && !element.multiple) {
          element.options.count.forEach((check) => {
            if (check.model == true) {
              element.options.model = check.label;
              element.options.value = check.value;
              return;
            }
          });
        }
      });
    },
    loadMultipleCheck() {
      let text = '';
      let textValue = '';
      this.filtersParent.forEach((element) => {
        if (element.type == 'check' && element.multiple) {
          element.options.count.forEach((check) => {
            if (check.model) {
              text += `${check.label}, `;
              textValue += `${check.value},`;
            }
          });

          if (text) {
            element.options.model = text.slice(0, -2);
            element.options.value = textValue.slice(0, -1);
          } else {
            element.options.model = '';
            element.options.value = '';
          }
        }
      });
    },
    async loadDate() {
      this.filtersParent.forEach((element) => {
        if (element.type == 'date') {
          element.options.model = helperFunctions.convertirFecha(element.options.value);
        }
      });
    }
  },
  async mounted() {
    await this.loadDate();
    await this.loadSingleCheck();
    await this.loadMultipleCheck();
    this.count = helperFunctions.countFiltersValues(this.filtersParent);
    //this.filters = await helperFunctions.filterMapChips(this.filtersParent)
    //console.log('->*',this.filters)
  }
};
</script>

<style>
.chips_align_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chips_min_width {
  display: flex;
  min-width: max-content;
  /*min-width: 100%*/
}
</style>
