<template>
  <td ref="td" :class="[{ 'td-edit': $slots.edit }, { ellipsis: ellipsis }, { 'vxtable-border-danger': error }]" class="td vs-table--td">
    <vx-tooltip ref="vxtooltip" v-if="tooltip" :wait="wait" :title="title" :color="color" :text="text">
      <span @click="clicktd">
        <vs-icon v-if="$slots.edit" class="icon-edit" icon="edit"></vs-icon>
        <slot></slot>
        <span v-if="$slots.edit" class="empty">{{ data ? '' : 'Empty' }}</span>
      </span>
    </vx-tooltip>

    <span v-else @click="clicktd">
      <vs-icon v-if="$slots.edit" class="icon-edit" icon="edit"></vs-icon>
      <slot></slot>
      <span v-if="$slots.edit" class="empty">{{ data ? '' : 'Empty' }}</span>
    </span>

    <!-- <transition name="td">
      <vx-tooltip
    title="Are you sure?"
    color="warning"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque non neque sed aliquet.">

    <vs-button color="warning" type="flat">Title Tooltip</vs-button>
  </vx-tooltip>
      <div
        v-if="activeEdit"
        class="con-edit-td">
        <slot name="edit"></slot>
        <vs-button
          icon="clear"
          size="small"
          color="primary"
          type="flat"
          @click="close"></vs-button>
      </div>
    </transition>-->
  </td>
</template>
<script>
import Vue from 'vue';
import trExpand from './VxTrExpand.vue';
export default {
  name: 'VxTd',
  props: {
    data: {
      default: null
    },
    wait: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    activeEdit: false
  }),
  computed: {
    sidebarWidth() {
      //console.log(this.$store.state.sidebarWidth)
      return this.$store.state.sidebarWidth;
    }
  },
  watch: {
    activeEdit() {
      this.$parent.activeEdit = this.activeEdit;
    }
  },
  methods: {
    insertAfter(e, i) {
      if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
      } else {
        e.parentNode.appendChild(i);
      }
    },
    clicktd(evt) {
      if (this.$slots.edit) {
        let tr = evt.target.closest('tr');
        if (!this.activeEdit) {
          let trx = Vue.extend(trExpand);
          let instance = new trx();
          instance.$props.colspan = 5;
          instance.$props.close = true;
          instance.$slots.default = this.$slots.edit;
          instance.sWidth = this.sidebarWidth;
          instance.vm = instance.$mount();
          instance.$on('click', this.close);
          var nuevo_parrafo = document.createElement('tr').appendChild(instance.vm.$el);
          this.insertAfter(tr, nuevo_parrafo);
          this.activeEdit = true;
          setTimeout(() => {
            window.addEventListener('click', this.closeEdit);
          }, 20);
        }
      }
    },
    closeEdit(evt) {
      if (!evt.target.closest('.tr-expand') && !evt.target.closest('.vs-select--options')) {
        this.close();
      }
    },
    close() {
      let tr = this.$refs.td.closest('tr');
      this.activeEdit = false;
      tr.parentNode.removeChild(tr.nextSibling);
      window.removeEventListener('click', this.closeEdit);
    },
    saveEdit() {
      this.activeEdit = false;
    },
    focusInputTd() {
      //this.$slots.default.focusInput()
      //console.log(this.$slots.default[0].componentInstance.$refs.tableInput.focusInput())
      //console.log(this.$slots.default[0].componentInstance)
      //let datax = this.tooltip ? this.$parent.$parent.structRows : this.$parent.structRows

      let el = this.$slots.default[0].componentInstance;
      if (el.focus) {
        el.focusOption();
      }
    }
  }
};
</script>
