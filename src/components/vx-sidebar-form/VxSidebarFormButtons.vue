<template lang="pug">

  div.style-form-footer.py-5.w-full

    vs-button.font-label.style-form-footer-buttons.py-2(
      v-if="btnCancel" 
      color="primary" 
      type="border" 
      icon-pack="feather"
      icon="icon-chevron-left"
      @shortkey="cancel"
      @click='cancel')
      span {{ ($t(cancelName)) }}
      
    vs-button.font-label.style-form-footer-buttons.py-2(
      v-if="btnConfirm"
      type="filled"
      color="primary"
      @shortkey="confirm"
      @click='confirm')
      span {{ ($t(confirmName))}}

</template>

<script>

export default {

  name: 'VxFormFooter',

  props: {
    btnCancel: {
      type: Boolean,
      default: true
    },
    cancelName: {
      type: String,
      default: 'Cancelar',
    },
    btnConfirm: {
      type: Boolean,
      default: true
    },
    confirmName: {
      type: String,
      default: 'Aceptar',
    }
  },

  methods: {
    cancel() {
      setTimeout(() => { this.$emit('cancel') }, 1);
    },
    confirm() {
      setTimeout(() => { this.$emit('confirm') }, 1);
    }
  }

};

</script>

<style lang="scss">
  .style-form-footer{
    display: flex;
    justify-content: space-between;
  }
  .style-form-footer-buttons{
    width: 7rem;
  }
</style>