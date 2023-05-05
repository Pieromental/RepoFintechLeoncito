<template lang="pug">
  transition(name="popup-t")
    div.vs-component.con-vs-popup(v-show="active" ref="con" :class="[`vs-popup-${color}`,{'fullscreen':fullscreen}]" @click="close($event,true)")
      div.vs-popup--background(:style="styleCon")
      div.vs-popup(ref="popupx" :style="stylePopup")
        header.vs-popup--header(:style="styleHeader")
          .vs-popup--title
            h3.uppercase {{ $t(title) }}
            h5.uppercase.ml-4(v-if="subTitle") {{ $t(subTitle) }}
          vs-icon.vs-popup--close.vs-popup--close--icon(v-if="!buttonCloseHidden" ref="btnclose" :icon-pack="iconPack" :icon="iconClose" :style="stylePopup" @click="close")
        div.vs-popup--content(v-if="active" :style="styleContent" :class="classContent")
          slot
</template>

<script>
import _color from '@/assets/utils/color.js';
export default {
  name: 'VxPopup',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    color: {
      default: 'primary',
      type: String
    },
    active: {
      default: false,
      type: Boolean
    },
    title: {
      default: 'popup',
      type: String
    },
    subTitle: {
      default: '',
      type: String
    },
    buttonCloseHidden: {
      default: false,
      type: Boolean
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    backgroundColor: {
      default: null,
      type: String
    },
    backgroundColorPopup: {
      default: 'rgb(255,255,255)',
      type: String
    },
    styleContent: {
      default: null,
      type: String
    },
    classContent: {
      default: null,
      type: String
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    iconClose: {
      default: 'close',
      type: String
    }
  },
  computed: {
    styleHeader() {
      return {
        color: _color.getColor(this.color, 1)
      };
    },
    styleCon() {
      return {
        background: _color.getColor(this.backgroundColor, 1)
      };
    },
    stylePopup() {
      return {
        background: _color.getColor(this.backgroundColorPopup, 1)
      };
    }
  },
  mounted() {
    this.insertBody();
  },
  methods: {
    close(event, con) {
      if (con && typeof event.target.className == 'string') {
        if (!this.clickNotClose && event.target.className.indexOf('vs-popup--background') != -1) {
          this.$emit('update:active', true);
          this.$emit('close', false);
        } else if (this.$refs.btnclose && event.srcElement == this.$refs.btnclose.$el) {
          this.$emit('update:active', true);
          this.$emit('close', false);
        }
      }
    },
    insertBody() {
      let elx = this.$refs.con;
      document.body.insertBefore(elx, document.body.firstChild);
    }
  }
};
</script>
