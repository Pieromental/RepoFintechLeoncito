<template lang="html">
  <li
    :class="{ divider: divider }"
    :style="{
      color: active ? giveColor() : hoverx ? 'white' + ' !important' : null,
      background: active ? '#f3f5f7' : hoverx ? giveColor() + ' !important' : null,
      'border-left': active ? '4px solid ' + giveColor(0.75) : null,
      'overflow-wrap': 'unset',
      'border-radius': '0',
      transition: 'none'
    }"
    class="vs-component vs-dropdown--item"
    @click="closeParent"
    @mouseover="hoverx = true"
    @mouseout="hoverx = false"
  >
    <router-link v-if="to" :to="to" v-bind="$attrs" :class="{ disabled: disabled }" class="vs-dropdown--item-link" v-on="$listeners">
      {{ $attrs.disabled }}
      <slot />
    </router-link>

    <a v-else v-bind="$attrs" :class="{ disabled: disabled }" class="vs-dropdown--item-link" v-on="$listeners">
      <slot />
    </a>
  </li>
</template>

<script>
import _color from '@/assets/utils/color.js';
export default {
  name: 'VxDropdownItem',
  inheritAttrs: false,
  props: {
    to: {},
    disabled: {
      default: false,
      type: Boolean
    },
    divider: {
      default: false,
      type: Boolean
    },
    active: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    hoverx: false,
    vsDropDownItem: true,
    color: null
  }),
  mounted() {
    this.changeColor();
  },
  updated() {
    this.changeColor();
  },
  methods: {
    closeParent() {
      if (this.disabled) {
        return;
      }
      searchParent(this);
      function searchParent(_this) {
        let parent = _this.$parent;
        if (!parent.$el.className) {
          return;
        }
        if (parent.$el.className.indexOf('parent-dropdown') == -1) {
          searchParent(parent);
        } else {
          let [dropdownMenu] = parent.$children.filter((item) => {
            return item.hasOwnProperty('dropdownVisible');
          });
          dropdownMenu.dropdownVisible = parent.vsDropdownVisible = false;
        }
      }
    },
    changeColor() {
      let _self = this;
      searchParent(this);
      function searchParent(_this) {
        let parent = _this.$parent;
        if (!parent.$el.className) {
          return;
        }
        if (parent.$el.className.indexOf('parent-dropdown') == -1) {
          searchParent(parent);
        } else {
          _self.color = parent.color;
        }
      }
    },
    giveColor(opacity = 1) {
      return `rgba(var(--vs-${this.color}),${opacity})`;
    }
  }
};
</script>
