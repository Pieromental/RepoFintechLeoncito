<template>
  <tr
    @dblclick="dblclicktr"
    @click="clicktr"
    ref="tableTr"
    :class="[`tr-table-state-${state}`, { 'is-selected': isSelected, selected: data, 'is-expand': maxHeight != '0px', activeEdit: activeEdit, hoverFlat: $parent.hoverFlat }]"
    class="tr-values vs-table--tr"
  >
    <td v-if="$parent.multiple || $slots.expand" class="td-check row-sticky-tr" :class="[{ 'active-expanded': this.expanded }, { 'row-sticky-background': isSelected }]">
      <vs-checkbox v-if="$parent.multiple" :checked="isSelected" @input="clickCheck" size="small" />

      <vs-icon v-if="$slots.expand">keyboard_arrow_down</vs-icon>
    </td>
    <slot></slot>
  </tr>
</template>
<script>
import Vue from 'vue';
import trExpand from './VxTrExpand.vue';
export default {
  name: 'VxTr',
  props: {
    state: {
      type: String,
      default: null
    },
    data: {
      default: null
    }
  },
  data: () => ({
    colspan: 0,
    expanded: false,
    maxHeight: '0px',
    activeEdit: false,
    counter: 0,
    timer: null
  }),
  watch: {
    '$parent.datax'() {
      this.collapseExpandedData();
    }
  },
  computed: {
    styleExpand() {
      return {
        maxHeight: this.maxHeight
      };
    },
    getColspanExpand() {
      let lengthx = this.$parent.$refs.colgroup.querySelectorAll('th').length;
      return lengthx;
    },
    isSelected() {
      if (this.$parent.multiple && this.$parent.value) {
        return this.data ? this.$parent.value.includes(this.data) : false;
      } else {
        return this.data ? this.$parent.value == this.data : false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.colspan = this.$parent.$refs.thead.querySelectorAll('th').length;
      if (this.$slots.expand) {
        this.colspan++;
      }
    });
  },
  created() {
    if (this.$slots.expand) this.$parent.hasExpadableData = true;
  },
  methods: {
    insertAfter(e, i) {
      if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
      } else {
        e.parentNode.appendChild(i);
      }
    },
    dblclicktr() {
      this.$parent.dblclicktr(this.data, true);
    },
    clicktr(evt) {
      if (this.$parent.multiple && !this.$parent.inline) {
        var self = this;
        this.counter++;
        if (this.counter === 1) {
          this.timer = setTimeout(function() {
            self.$parent.clicktr(self.data, true);
            if (self.$slots.expand) {
              self.clicktd(evt);
            }
            self.counter = 0;
          }, 250);
        } else {
          clearTimeout(this.timer);
          this.$parent.dblclicktr(this.data, true);
          this.counter = 0;
        }
      }
    },
    clickCheck() {
      if (this.$parent.multiple && this.$parent.inline) this.$parent.clicktr(this.data, true);
    },
    clicktd(evt) {
      if (this.$parent.multiple || !this.$slots.expand) return;
      let tr = evt.target.closest('tr');
      if (this.expanded) {
        tr.parentNode.removeChild(tr.nextSibling);
        tr.classList.remove('tr-expandedx');
        this.expanded = false;
      } else {
        tr.classList.add('tr-expandedx');
        let trx = Vue.extend(trExpand);
        let instance = new trx();
        instance.$props.colspan = this.colspan;
        instance.$slots.default = this.$slots.expand;
        instance.vm = instance.$mount();
        var newTR = document.createElement('tr').appendChild(instance.vm.$el);
        this.insertAfter(tr, newTR);
        this.expanded = true;
      }
    },
    collapseExpandedData() {
      if (this.expanded) {
        const tr = this.$refs.tableTr;
        tr.parentNode.removeChild(tr.nextSibling);
        tr.classList.remove('tr-expandedx');
        this.expanded = false;
      }
    }
  }
};
</script>
