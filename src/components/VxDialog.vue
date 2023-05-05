<template lang="pug">
  .demo-alignment
    vs-popup.width_dialog(:title='title' :active='active' @close="closeDialog")
      div.vx-row.align_items_center.mb-3
        div.vx-col.justify_content_center.mb-1(class="w-full sm:w-1/3")
          feather-icon(:icon="icon" class="navbar-fuzzy-search ml-1" svgClasses='h-10 w-10')
        div.vx-col(class="w-full sm:w-2/3")
          span {{body}}
      div.vx-row.justify_content_flex_end.mt-1
        div.vx-col.pr-1.pl-1(v-show='confirm')
          vs-button(:color="confirmColor" type="filled" @click="clickConfirm") {{confirmText}}
        div.vx-col.pr-1.pl-1(v-show='cancel')
          vs-button(:color="cancelColor" type="filled" @click="clickCancel") {{cancelText}}

</template>

<script>
import _color from '@/assets/utils/color';
export default {
  name: 'VxDialog',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: 'Title'
    },
    body: {
      type: String,
      default: 'Body'
    },
    icon: {
      type: String,
      default: 'CheckIcon'
    },
    confirmText: {
      type: String,
      default: 'Acept'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmColor: {
      type: String,
      default: 'primary'
    },
    cancelColor: {
      type: String,
      default: 'primary'
    },
    confirm: {
      type: Boolean,
      default: true
    },
    cancel: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    clickConfirm() {
      this.$emit('confirm');
    },
    clickCancel() {
      this.$emit('cancel');
    },
    convertColor(color) {
      switch (color) {
        case 'primary':
          return 'rgb(26,115,232)';
        case 'success':
          return 'rgb(40,199,111)';
        case 'danger':
          return 'rgb(234,84,85)';
        case 'warning':
          return 'rgb(255,159,67)';
        case 'dark':
          return 'rgb(30,30,30)';
      }
    }
  },
  mounted() {
    const value = document.getElementsByClassName('width_dialog');
    const isColor = _color.isColor(this.color);
    const color = isColor ? this.convertColor(this.color) : _color.getColor(this.color);
    value[0].childNodes[1].childNodes[0].style.borderBottomColor = color;
    value[0].childNodes[1].childNodes[0].childNodes[1].id = 'hover-close';
    document.getElementById('hover-close').addEventListener('mouseover', function() {
      this.style.color = color;
    });
    document.getElementById('hover-close').addEventListener('mouseout', function() {
      this.style.color = '';
    });
  }
};
</script>

<style>
.width_dialog .vs-popup {
  max-width: 400px;
}
.width_dialog .vs-popup--header {
  background-color: #ffff;
  border: 2px solid;
  border-top-color: #ffff;
  border-right-color: #ffff;
  border-left-color: #ffff;
  border-bottom-color: #ffff;
  border-radius: 5px 5px 0px 0px;
}

.justify_content_flex_end {
  justify-content: flex-end;
}

.align_items_center {
  align-items: center;
}

.justify_content_center {
  justify-content: center;
  display: flex;
}
</style>
