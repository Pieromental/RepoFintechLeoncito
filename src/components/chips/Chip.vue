<template>
  <div class="vx-chip">
    <vs-chip :transparent="transparent" :color="color" >
        <slot></slot> 
    </vs-chip>
  </div>
</template>

<script>

export default {
  name: "VxChip",
  
  props: {
    color:{
      type: String,
      default: '',
    },
    transparent:{
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
    
  },

  mounted() {
      
  },

};
</script>

<style>
  /* .vx-chip{
    padding-left: 0.3rem;
  } */
</style>