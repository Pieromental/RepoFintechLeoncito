<template>

  <transition name="vs-sidebar-animate">

    <div v-if="staticPosition || value" ref="sidebarbackground" class="vs-content-sidebar style-sidebar-personalized" :class="[contentAreaClass]">

      <div v-if="hiddenBackground" class="vs-sidebar--background"></div>

      <div ref="sidebarContainer" class="vs-sidebar vs-sidebar-personalized vs-middle"
        :class="[
          `vs-sidebar-${color}`,
          {
            'vs-sidebar-parent': parent != 'body',
            'vs-sidebar-staticPosition': staticPosition,
            'vs-sidebar-position-right': positionRight,
            'vs-sidebar-reduce': reduce,
            'vs-sidebar-reduceNotRebound': reduceNotRebound,
            'vs-sidebar-reduceNotHoverExpand': reduceNotHoverExpand
          },
          `vs-side-width-${width.toString()}`,
          'index'
        ]"
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

  name: 'VxSidebarPersonalized',

  props: {
    value: {
      default: false
    },
    defaultIndex: {
      default: null,
      type: [String, Number]
    },
    color: {
      default: 'primary',
      type: String
    },
    parent: {
      default: null,
      type: [String, Object]
    },
    spacer: {
      default: false,
      type: Boolean
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
    reduce: {
      default: false,
      type: Boolean
    },
    reduceNotRebound: {
      default: false,
      type: Boolean
    },
    reduceNotHoverExpand: {
      default: false,
      type: Boolean
    },
    hiddenBackground: {
      default: false,
      type: Boolean
    },
    width: {
      default: 50,
      type: Number
    },
    inhabilitarCerrarSidebar: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    currentIndex: 0
  }),

  created() {
    this.currentIndex = this.defaultIndex;
  },

  mounted() {
    this.insertBody();
  },

  computed: {
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    contentAreaClass() {
      if (this.sidebarWidth == 'default') return 'content-area-default';
      else if (this.sidebarWidth == 'reduced') return 'content-area-reduced';
      return 'content-area-full';
    }
  },

  watch: {
    value(val) {
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
    getActive() {
      return this.currentIndex;
    },
    setIndexActive(index) {
      this.currentIndex = index;
    },
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
    closeSidebar(evt) {
      //this.$emit("close", true);
      let parent = evt.target.closest('.vs-sidebar');
      if (parent == null) {
        this.closeSidebarExternOut();
        return;
      }
      if (!parent && !this.inhabilitarCerrarSidebar) {
        this.$emit('input', false);
        let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
        let element = parentx || window;
        element.removeEventListener('click', this.closeSidebar);
        this.$emit('close');
      }
    },
    closeSidebarExtern() {
      this.$emit('input', false);
      let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
      let element = parentx || window;
      element.removeEventListener('click', this.closeSidebar);
      this.$emit('close');
    },
    closeSidebarExternOut() {
      let parentx = typeof this.parent == 'string' ? document.querySelector(this.parent) : this.parent;
      let element = parentx || window;
      element.removeEventListener('click', this.closeSidebar);
      this.$emit('closeExtern');
    },
    insertBody() {
      if (this.parent) {
        let elx = this.$refs.sidebarbackground;

        let parentx = typeof this.parent === 'string' ? document.querySelector(this.parent) : this.parent;

        if (elx) parentx.insertBefore(elx, parentx.firstChild);
      }
    }
  }

};
</script>

<style>
.vs-sidebar-personalized {
  min-width: 24rem !important;
  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
}
.vs-sidebar-personalized.vs-sidebar.vs-sidebar-parent {
  height: calc(100% - 3.8rem) !important;
}

.index {
  z-index: 20000;
}
.vs-side-width-10 {
  max-width: 10%;
}
.vs-side-width-20 {
  max-width: 20%;
}
.vs-side-width-30 {
  max-width: 30%;
}
.vs-side-width-40 {
  max-width: 40%;
}
.vs-side-width-50 {
  max-width: 50%;
}
.vs-side-width-60 {
  max-width: 60%;
}
.vs-side-width-70 {
  max-width: 70%;
}
.vs-side-width-80 {
  max-width: 80%;
}
.vs-side-width-90 {
  max-width: 90%;
}
.vs-side-width-100 {
  max-width: 100%;
}
@media only screen and (max-width: 750px) {
  .vs-middle {
    max-width: 55vw;
  }
}
@media only screen and (max-width: 500px) {
  .vs-middle {
    max-width: 80vw;
  }
}
</style>
