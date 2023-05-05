<template>
  <div class="vx-button-table">
    <vs-button :id="name" @click="click" :disabled="disabled" class="font-label py-2 px-3 " size="small" color="primary" :type=" primary ? 'filled':'border'" > 
        <feather-icon v-if="icon" :icon="icon" :class="primary ? 'color-white':'color-primary'" class="style-icon-table mr-2" />
        <slot></slot>
    </vs-button>
  </div>
</template>

<script>

export default {
  name: "VxButtonTable",
  
  props: {
    name:{
      type: String,
      default: '',
    },
    icon:{
      type: String,
      default: '',
    },
    primary: {
      type: Boolean,
      default: true,
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

<style lang="scss">
  .vx-button-table{
    .color-primary{
      color: rgba(var(--vs-primary),1);
    }
    .color-white{
      color: white;
    }
  } 
  .vx-button-table .vs-button {
    border-radius: inherit;
    .vs-button-text{
      display: flex;
    }
  }
</style>