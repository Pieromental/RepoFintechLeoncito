<template lang="pug">
  .py-8(class="sm:w-full")
    div(class="sm:flex-wrap sm:flex md:flex")
      .vs-justify-flex-end(class="w-full")
        vs-button.font-label(
          v-if="btnCancelar"
          :class="sidebar ? 'py-3 px-6 mr-2' : 'ml-2 py-2 mr-3'"
          color="dark"
          type="flat"
          icon-pack="feather"
          icon="icon-chevron-left"
          v-shortkey="['alt', 'c']"
          @shortkey="cancelar"
          @click='cancelar')
          span.underline {{ ($t('Cancelar')).charAt(0) }}
          span {{ ($t('Cancelar')).substring(1, ($t('Cancelar')).length) }}
        vs-button.font-label(
          v-if="btnCerrar"
          :class="sidebar ? 'py-3 px-6 mr-2' : 'ml-2 py-2 mr-3'"
          color="dark"
          type="flat"
          icon-pack="feather"
          icon="icon-chevron-left"
          v-shortkey="['alt', 'c']"
          @shortkey="cancelar"
          @click='cancelar')
          span.underline {{ ($t('Cerrar')).charAt(0) }}
          span {{ ($t('Cerrar')).substring(1, ($t('Cerrar')).length) }}
        vs-button.font-label(
          v-if="btnLimpiar"
          :class="sidebar ? 'py-3 px-6 mr-2' : 'ml-2 py-2 mr-3'"
          color="dark"
          type="flat"
          icon-pack="feather"
          icon="icon-chevron-left"
          @shortkey="limpiar"
          @click='limpiar')
          span.underline {{ ($t('Limpiar')).charAt(0) }}
          span {{ ($t('Limpiar')).substring(1, ($t('Limpiar')).length) }}
        vs-button.font-label(
          v-if="btnAceptar"
          :class="sidebar ? 'py-3 px-6' : 'ml-2 py-2'"
          type="filled"
          color="dark"
          v-shortkey="['alt', 'a']"
          @shortkey="aceptar"
          @click='aceptar')
          span.underline {{ ($t('Aceptar')).charAt(0) }}
          span {{ ($t('Aceptar')).substring(1, ($t('Aceptar')).length) }}
        vs-button.font-label(
          v-if="btnEjecutar"
          :class="sidebar ? 'py-3 px-6' : 'ml-2 py-2'"
          type="filled"
          color="dark"
          v-shortkey="['alt', 'a']"
          @shortkey="ejecutar"
          @click='ejecutar')
          span.underline {{ ($t('Ejecutar')).charAt(0) }}
          span {{ ($t('Ejecutar')).substring(1, ($t('Ejecutar')).length) }}

</template>

<script>

export default {

  name: 'FooterOpciones',

  props: {
    sidebar: {
      type: Boolean,
      default: false
    },
    btnAceptar: {
      type: Boolean,
      default: true
    },
    btnEjecutar: {
      type: Boolean,
      default: false
    },
    btnCancelar: {
      type: Boolean,
      default: true
    },
    btnCerrar: {
      type: Boolean,
      default: false
    },
    btnLimpiar: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    cerrar() {
      setTimeout(() => { this.$emit('cerrar') }, 1);
    },
    cancelar() {
      setTimeout(() => { this.$emit('cancelar') }, 1);
    },
    aceptar() {
      setTimeout(() => { this.$emit('aceptar') }, 1);
    },
    ejecutar() {
      setTimeout(() => { this.$emit('ejecutar') }, 1);
    },
    limpiar() {
      setTimeout(() => { this.$emit('limpiar') }, 1);
    },
  }

};

</script>