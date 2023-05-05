<template>
  <transition name="tr-expand">
    <tr class="tr-expand" v-if="active">
      <td :colspan="colspan" class="row-sticky-trexpand" :style="{ background: '#fff' }">
        <div class="content-tr-expand" :style="{ width: `${resize}px` }">
          <slot></slot>
          <button class="tr-expand--close mx-3" @click="$emit('click', $event)" v-if="close">
            <i class="material-icons">
              clear
            </i>
          </button>
        </div>
      </td>
    </tr>
  </transition>
</template>

<script>
export default {
  name: 'VxTrExpand',
  props: {
    close: {
      type: Boolean,
      default: false
    },
    colspan: {
      default: 1,
      type: Number
    }
  },
  data: () => ({
    active: false,
    resize: 0,
    sWidth: 'default'
  }),
  methods: {
    getResize($event, sidebarWidth) {
      console.log($event.currentTarget.innerWidth);
      switch (sidebarWidth) {
        case 'default':
          this.resize = $event.currentTarget.innerWidth - 300;

          break;
        case 'reduced':
          this.resize = $event.currentTarget.innerWidth - 120;
          break;
        case 'no-sidebar':
          this.resize = $event.currentTarget.innerWidth - 50;
          break;

        default:
          this.resize = $event.currentTarget.innerWidth - 50;
          break;
      }
    }
  },
  mounted() {
    this.active = true;
    //console.log('->', this.sWidth);
    window.addEventListener('resize', this.getResize);
    let $event = { currentTarget: { innerWidth: window.innerWidth } };
    this.getResize($event, this.sWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.getResize);
  }
};
</script>
