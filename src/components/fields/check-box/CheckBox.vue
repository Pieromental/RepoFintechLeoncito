<template>
  <div class="check-box">
    <vs-checkbox v-bind="$attrs" v-on="$listeners" class="font-label bold" color="primary" size="small" :id="name">
      <slot></slot>
    </vs-checkbox>
  </div>
</template>

<script>

export default {

  name: "CheckBox",
  
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
  .check-box{
    padding-top: 0.3rem;
    .con-vs-checkbox{
      margin: 0;
    }
  }
</style>