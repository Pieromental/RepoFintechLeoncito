<template lang="pug">
  strong(v-if="detener && (tiempoRestante != '0' && tiempoRestante != null) ")
    strong.mr-2
      slot(name="textoAnterior")
    strong(v-text="minutos")
    strong(v-if="tiempoRestante != '0' && tiempoRestante != null") :
    strong(v-text="segundos")
    strong.ml-2
      slot(name="textoPosterior")
</template>

<script>
export default {
  props: ['date', 'hour', 'detener'],
  name: 'CountDown',
  data() {
    return {
      fechaTope: null,
      ahora: null,
      tiempoRestante: null,
      fechaContador: null,
      horasContador: null
    };
  },
  mounted() {
    this.getFechaTope();
    this.listo();
  },
  methods: {
    getFechaTope() {
      this.fechaContador = this.date;
      this.horasContador = this.hour;
      this.fechaTope = new Date(`${this.fechaContador}T${this.horasContador}`);
    },
    listo() {
      const timepoActualizado = setInterval(() => {
        this.ahora = new Date();
        this.tiempoRestante = (new Date(this.fechaTope) - this.ahora + 1000) / 1000;
        if (this.tiempoRestante <= 1) {
          this.tiempoRestante = 0;
          this.$emit('cambioContador', false);
          clearInterval(timepoActualizado);
          this.segundos = null;
          this.minutos = null;
        }
      }, 1000);
    }
  },
  computed: {
    segundos: {
      get() {
        if (this.tiempoRestante == '0' || this.tiempoRestante == null) {
          return ' ';
        } else {
          return ('0' + Math.floor(this.tiempoRestante % 60)).slice(-2);
        }
      }
    },
    minutos: {
      get() {
        if (this.tiempoRestante == '0' || this.tiempoRestante == null) {
          return ' ';
        } else {
          return ('0' + Math.floor((this.tiempoRestante / 60) % 60)).slice(-2);
        }
      }
    }
  },
  watch: {
    detener(val) {
      if (val) {
        this.getFechaTope();
        this.listo();
      }
    }
  }
};
</script>
