<template>
  <div class="radio-button">
    <vs-radio v-bind="$attrs" v-on="$listeners" class="font-label" color="primary" size="small" :id="name" >
      <slot></slot>
    </vs-radio>
  </div>
</template>

<script>

export default {

  name: "RadioButton",
  
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
    
  },

  mounted() {
      
  },

};

</script>

<style lang="scss">
  .radio-button{
    margin-right: .75rem;
  }
</style>