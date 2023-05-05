<template lang="pug">
  .py-8(class="sm:w-full")
    div( id="footerButtons" class="sm:flex-wrap sm:flex md:flex")
      .vs-justify-flex-end(class="w-full")
        vs-button.font-label.footer-buttons-style(
          v-if="btnBack"
          :class="sidebar ? 'py-3 mr-2' : 'py-2 mr-3'"
          color="primary"
          type="border"
          icon-pack="feather"
          icon="icon-chevron-left"
          @shortkey="back"
          @click='back')
          span {{ ($t(backName)) }}
        vs-button.font-label.footer-buttons-style(
          v-if="btnAceptar"
          :class="sidebar ? 'py-3' : 'py-2 ml-2'"
          type="filled"
          color="primary"
          @shortkey="next"
          @click='next')
          span {{ ($t(nextName))}}

</template>

<script>

export default {

  name: 'FooterButtons',

  props: {
    sidebar: {
      type: Boolean,
      default: false
    },
    btnBack: {
      type: Boolean,
      default: true
    },
    backName: {
      type: String,
      default: 'Cancelar',
    },
    btnAceptar: {
      type: Boolean,
      default: true
    },
    nextName: {
      type: String,
      default: 'Aceptar',
    }
  },

  methods: {
    back() {
      setTimeout(() => { this.$emit('back') }, 1);
    },
    next() {
      setTimeout(() => { this.$emit('next') }, 1);
    }
  }

};

</script>
<style lang="scss">
.footer-buttons-style{
  width: 7rem;
}
</style>