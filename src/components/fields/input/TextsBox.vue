<template>
  <div class="texts-box">
    <vs-input v-bind="$attrs" v-on="$listeners" class="w-full" size="small" :id="name" :ref="name" autocomplete="off">
    </vs-input>
  </div>
</template>

<script>

export default {
  name: "TextsBox",
  
  props: {
    name:{
      type: String,
      default: '',
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
    focusInput(){
      this.$refs[this.name].focusInput();
    }
  },

  mounted() {
      
  },

};
</script>

<style>
  /* .texts-box{
    padding-left: 0.3rem;
  } */
</style>