<template lang="html">
  <transition :name="invert ? (vertical ? 'fade-tab-vertical-invert' : 'fade-tab-invert') : vertical ? 'fade-tab-vertical' : 'fade-tab'">
    <div v-show="active" class="con-tab vs-tabs--content">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VxTab',
  inheritAttrs: false,
  props: {
    label: {
      default: 'Label',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    icon: {
      default: '',
      type: String
    },
    tag: {
      default: '',
      type: String
    },
    iconPack: {
      type: String,
      default: 'material-icons'
    }
  },
  data: () => ({
    vertical: false,
    active: false,
    id: null,
    invert: false
  }),
  watch: {
    label(val) {
      this.$parent.children[this.id].label = val;
    },
    disabled(val) {
      this.$parent.children[this.id].disabled = val;
    }
  },
  mounted() {
    this.id = this.$parent.children.length;
    this.$parent.children.push({
      label: this.label,
      disabled: this.disabled,
      icon: this.icon,
      iconPack: this.iconPack,
      tag: this.tag,
      id: this.$parent.children.length,
      listeners: this.$listeners,
      attrs: this.$attrs
    });
  }
};
</script>
