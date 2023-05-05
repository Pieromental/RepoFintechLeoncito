<template>
  <transition name="vs-sidebar-animate">
    <div v-if="staticPosition || value" ref="sidebarbackground" class="vs-content-sidebar style-sidebar-filter">
      <div
        ref="sidebarContainer"
        :class="[
          `vs-sidebar-${color}`,
          'style-vxfilter',
          {
            'vs-sidebar-parent': parent != 'body',
            'vs-sidebar-staticPosition': staticPosition,
            'vs-sidebar-position-right': positionRight
          }
        ]"
        class="vs-sidebar vx-sidebar-filtro vs-middle"
      >
        <div class="vs-sidebar--items">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'VxSidebarFilter',
  props: {
    value: {
      default: false
    },
    color: {
      default: 'primary',
      type: String
    },
    parent: {
      default: null,
      type: [String, Object]
    },
    staticPosition: {
      default: false,
      type: Boolean
    },
    positionRight: {
      default: false,
      type: Boolean
    },
    clickNotClose: {
      default: false,
      type: Boolean
    },
    hiddenBackground: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({}),
  watch: {
    value(val) {
      // instanceof HTMLElement;
      if (!this.clickNotClose) this.addEventClick();

      let parentx = document.querySelector(this.parent);

      if (this.parent && !this.hiddenBackground && parentx instanceof HTMLElement) {
        if (val) {
          let div = document.createElement('div');
          div.setAttribute('id', 'transparencia');
          div.setAttribute('class', 'vs-sidebar--background');
          parentx.insertBefore(div, parentx.firstChild);
        } else {
          parentx.removeChild(parentx.childNodes[0]);
        }
      }
    }
  },
  methods: {
    addEventClick() {
      this.$nextTick(() => {
        let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
        let element = parentx || window;
        if (this.value) {
          setTimeout(() => {
            element.addEventListener('click', this.closeSidebar);
          }, 300);
        }
      });
    },
    insertBody() {
      if (this.parent) {
        let elx = this.$refs.sidebarbackground;

        let parentx = typeof this.parent === 'string' ? document.querySelector(this.parent) : this.parent;

        if (elx) parentx.insertBefore(elx, parentx.firstChild);
      }
    }
  },
  mounted() {
    this.insertBody();
  }
};
</script>
