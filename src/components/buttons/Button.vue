<template>
  <div class="vx-button">
    <vs-button :id="name" @click="click" :disabled="disabled" class="font-label py-2 px-3 " size="small" color="primary" >
        <slot></slot>
    </vs-button>
  </div>
</template>

<script>

export default {
  name: "VxButton",
  
  props: {
    name:{
      type: String,
      default: '',
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },

  data(){
    return {
      
    }
  },
  
  computed: {
    
  },

  watch:  {
    
  },

  methods: {
    click(){
      setTimeout(() => { this.$emit('click') }, 1);
    }
  },

  mounted() {
      
  },

};
</script>

<style>
  /* .vx-button{
    padding-left: 0.3rem;
  } */
</style>